import * as body_parser from 'body-parser';
import * as compression from 'compression';
import * as cookie_parser from 'cookie-parser';
import * as express_js from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as helmet from 'helmet';
import * as jwt from 'jsonwebtoken';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as passport_jwt from 'passport-jwt';
import * as path from 'path';
import * as typeorm from 'typeorm';
import * as swagger_ui from 'swagger-ui-express';
import * as winston from 'winston';
import * as yaml from 'yamljs';

import { Request, Response, Router, Application } from 'express';
import { Connection, ObjectType } from 'typeorm';

import {
  CABECALHO_AUTENTICACAO,
  SEMENTE_JWT,
  FORMATO_LOG_ACESSO,
  FORMATO_LOG_ERRO,
  BANCO_TIPO
} from '../../../../config/config.backend';

import {
  TIMEOUT, NAO_AUTORIZADO, REQUISICAO_ERRADA,
  ADMINISTRADOR, USUARIO, PORTA
} from '../../../../config/config.comum';
import { JWTPayload } from '../../../../dominio';

export const AUTENTICAR_ADMINISTRADOR = passport.authenticate(ADMINISTRADOR, { session: false });
export const AUTENTICAR_USUARIO = passport.authenticate(USUARIO, { session: false });

export const LOG = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { aplicacao: 'tarefas' },
  transports: [
    new winston.transports.File({ filename: '../logs/erro.log', level: 'error' }),
    new winston.transports.File({ filename: '../logs/tudo.log' })
  ]
});
if (process.env.NODE_ENV !== 'production') {
  LOG.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export abstract class AplicacaoBase {

  private _conexao: Connection;
  private _servidorHTTP: Application;

  /** Retorna instância do servidor ExpressJS */
  public get servidorHTTP() { return this._servidorHTTP; }

  public criarRepositorio<T>(customRepository: ObjectType<T>): T {
    return this._conexao.getCustomRepository(customRepository);
  }

  /** Inicia backend da aplicação */
  public async iniciar(diretorio_raiz: string, porta, chavePrivada = null) {

    try {
      /* Criar conexão ao banco de dados e servidor HTTP/HTTPS */
      await typeorm.createConnection(BANCO_TIPO).then((conexao) => {
        this._conexao = conexao;
        this.configurarExpress(diretorio_raiz);
        this.configurarPassport();

        this.registrarServicos();

        this.servidorHTTP.use((req: Request, res: Response) => {
          /* URL inválida redireciona para a página inicial */
          res.redirect('/');
        });

        if (chavePrivada) {
          /* Iniciar servidor HTTPS */
          https.createServer({
            key: fs.readFileSync('../ssl/chave_privada.pem'),
            cert: fs.readFileSync('../ssl/chave_publica.pem'),
            passphrase: chavePrivada
          }, this.servidorHTTP).listen(porta).on('listening', () => {
            LOG.info(`Servidor HTTPS [${process.pid}] escutando na porta ${porta}`);
          });
        } else {
          /* Iniciar servidor HTTP */
          this.servidorHTTP.listen(porta).on('listening', () => {
            LOG.info(`Servidor HTTP [${process.pid}] escutando na porta ${porta}`);
          });
        }
      });
    } catch (erro) {
      console.log(erro);
      LOG.error('Conexão falhou. O banco de dados está funcionando?')
    }

  }

  /** Retorna a resposta da aplicação no formato JSON para o cliente */
  public resposta(res: Response, status: number, data: any) {
    res.json({
      status: status,
      data: data
    });
  }

  /** Retorna erro da aplicação em formato JSON para o cliente */
  public erro(res: Response, codigo: number, err: any, mensagem?: string) {
    if (typeof err === 'string') {
      err = { 'code': err, 'message': mensagem || '' };
    }
    err.code = err.code || 'Erro nao mapeado';
    if (!mensagem) {
      mensagem = err.code;
    } else {
      mensagem = `${err.code} - ${mensagem}`;
    }
    res.setHeader('Erro', mensagem);
    res.status(codigo).json({ status: -1, data: [], err: err });
    LOG.error(err);
  }

  protected abstract registrarServicos(): void;

  private regerarToken(req: Request, res: Response, next) {
    /* Gera novo token a cada chamada da API ou página web e atualiza cookie */
    let usuario: any = {};
    if (req && req.cookies && req.cookies[CABECALHO_AUTENTICACAO]) {
      let token = req.cookies[CABECALHO_AUTENTICACAO];
      usuario = jwt.verify(token, SEMENTE_JWT);
      if (usuario) {
        res.setHeader('Login', usuario.sub);
        usuario['iat'] = Math.floor(Date.now() / 1000) + TIMEOUT;
        token = jwt.sign(usuario, SEMENTE_JWT);
        res.cookie(
          CABECALHO_AUTENTICACAO, token,
          { maxAge: TIMEOUT * 1000, httpOnly: true });
      }
    }
    next();
  }

  private configurarExpress(diretorio_raiz: string): void {
    const swaggerDocument = yaml.load(path.resolve(__dirname, '../../../swagger.yaml'));

    this._servidorHTTP = express_js();
    this._servidorHTTP
      .use(helmet()) /* Ajustes de segurança no header */
      .use(compression({})) /* Use dados comprimidos */
      .use(body_parser.json()) /* Processe corpo da mensagem HTTP como JSON */
      .use(body_parser.urlencoded({ extended: true }))
      .use(cookie_parser()) /* Processe cookies recebidos */
      .use('/api-docs', swagger_ui.serve, swagger_ui.setup(swaggerDocument))
      .use(this.regerarToken)
      .use(morgan('dev', {
        skip: (req: Request, res: Response) => {
          return res.statusCode <= NAO_AUTORIZADO
        }
      }))
      .use(morgan(morgan.compile(FORMATO_LOG_ACESSO), {
        skip: (req: Request, res: Response) => {
          return res.statusCode >= REQUISICAO_ERRADA
        }
      }))
      .use(morgan(morgan.compile(FORMATO_LOG_ERRO), {
        skip: (req: Request, res: Response) => {
          return res.statusCode < REQUISICAO_ERRADA
        }
      }))
      .use(express_js.static(path.join(diretorio_raiz, '../../../www'))) /* Páginas estáticas, imagens e outros recursos */
      .use('/', Router())
      .set('port', PORTA);
  }

  private configurarPassport() {

    const OPCOES_JWT = {
      'jwtFromRequest': (req: Request) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies[CABECALHO_AUTENTICACAO];
        }
        return token;
      },
      'secretOrKey': SEMENTE_JWT
    };

    passport.use(USUARIO, new passport_jwt.Strategy(OPCOES_JWT,
      (jwt_payload: JWTPayload, next) => {
        if (jwt_payload && (jwt_payload.role == ADMINISTRADOR || jwt_payload.role == USUARIO)) {
          next(null, jwt_payload);
        } else {
          next(null, false);
        }
      }));

    passport.use(ADMINISTRADOR, new passport_jwt.Strategy(OPCOES_JWT,
      (jwt_payload: JWTPayload, next) => {
        if (jwt_payload && jwt_payload.role == ADMINISTRADOR) {
          next(null, jwt_payload);
        } else {
          next(null, false);
        }
      }));

    this._servidorHTTP.use(passport.initialize());
  }

}