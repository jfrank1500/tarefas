import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';
import { Aplicacao } from '../index';
import { Usuario } from '../entidades';
import { RepositorioUsuario } from '../repositorios';
import { AUTENTICAR_USUARIO, AUTENTICAR_ADMINISTRADOR } from '../base';
import {
    REQUISICAO_ERRADA,
    API_ENTRAR,
    API_SAIR,
    API_TOKEN_ATUALIZAR,
    NAO_AUTORIZADO,
    API_USUARIOS_ID,
    API_USUARIOS,
    TIMEOUT,
    NAO_ENCONTRADO,
    API_QUEM,
    TAMANHO_PAGINA
} from '../../../../config/config.comum';
import {
    CABECALHO_AUTENTICACAO, SEMENTE_JWT, APLICACAO
} from '../../../../config/config.backend';
import { JWTPayload } from '../../../../dominio';

export class UsuarioServico {

    static registrar(aplicacao: Aplicacao) {

        const repositorioUsuario: RepositorioUsuario = aplicacao.criarRepositorio(RepositorioUsuario);

        aplicacao.servidorHTTP.post(API_ENTRAR, (req: Request, res: Response) => {
            repositorioUsuario
                .localizarPorLoginSenha(req.body.login, req.body.senha)
                .then((usuario: Usuario) => {
                    let payload: JWTPayload = {
                        iss: APLICACAO,
                        sub: `${usuario.id}`,
                        name: usuario.login,
                        role: usuario.perfil
                    };
                    let token = jwt.sign(payload, SEMENTE_JWT);
                    res.cookie(CABECALHO_AUTENTICACAO, token, {
                        maxAge: TIMEOUT * 1000,
                        httpOnly: true
                    });
                    aplicacao.resposta(res, 0, payload);
                }).catch(() => {
                    aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', 'Erro ao autenticar-se');
                });
        });

        aplicacao.servidorHTTP.post(API_SAIR, (req: Request, res: Response) => {
            res.clearCookie(CABECALHO_AUTENTICACAO);
            aplicacao.resposta(res, 0, 'logout');
        });

        aplicacao.servidorHTTP.get(API_QUEM, AUTENTICAR_USUARIO, (req: Request, res: Response) => {
            aplicacao.resposta(res, 0, req.user);
        });

        aplicacao.servidorHTTP.get(API_TOKEN_ATUALIZAR, AUTENTICAR_USUARIO, (req: Request, res: Response) => {
            let usuario = {};
            if (req && req.cookies && req.cookies[CABECALHO_AUTENTICACAO]) {
                let token = req.cookies[CABECALHO_AUTENTICACAO];
                usuario = jwt.verify(token, SEMENTE_JWT);
                aplicacao.resposta(res, 0, usuario);
            } else {
                aplicacao.erro(res, NAO_AUTORIZADO, {}, 'Usuário não autorizado');
            }
        });

        aplicacao.servidorHTTP.route(API_USUARIOS_ID)
            .get(AUTENTICAR_ADMINISTRADOR, (req: Request, res: Response) => {
                /** Localizar usuario pelo ID */
                let id = Number(req.params.id);
                repositorioUsuario.findOne(id)
                    .then((usuario: Usuario) => {
                        if (usuario) {
                            aplicacao.resposta(res, 1, usuario);
                        } else {
                            aplicacao.erro(res, NAO_ENCONTRADO, 'Erro', `Usuário não encontrado ${id}`);
                        }
                    })
                    .catch(() => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', `Erro ao localizar usuário  ${id}`);
                    });
            }).put(AUTENTICAR_ADMINISTRADOR, (req: Request, res: Response) => {
                /** Atualizar usuario pelo ID. Precisa estar autenticado. */
                let id = Number(req.params.id);
                repositorioUsuario.save(req.body)
                    .then((retorno) => {
                        aplicacao.resposta(res, 1, retorno);
                    })
                    .catch((err) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, { code: err.message }, `Erro ao atualizar usuário ${id}`);
                    });
            }).delete(AUTENTICAR_ADMINISTRADOR, (req: Request, res: Response) => {
                /** Apagar usuario pelo ID. Precisa estar autenticado. */
                let id = Number(req.params.id);
                repositorioUsuario.delete(id)
                    .then((retorno: DeleteResult) => {
                        aplicacao.resposta(res, 1, retorno);
                    })
                    .catch((err) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, { code: err.message }, `Erro ao apagar usuário ${id}`);
                    });
            });

        aplicacao.servidorHTTP.route(API_USUARIOS)
            .get(AUTENTICAR_ADMINISTRADOR, (req: Request, res: Response) => {
                /** Localizar todos os usuários */
                let pagina = Number(req.query.pagina || 0);
                repositorioUsuario.count()
                    .then((total_registros) => {
                        repositorioUsuario.localizarTodos(pagina, TAMANHO_PAGINA)
                            .then((usuarios: Usuario[]) => {
                                aplicacao.resposta(res, total_registros, usuarios);
                            })
                            .catch(() => {
                                aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', 'Erro ao localizar usuários');
                            });
                    }).catch((erro) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', 'Erro ao contar usuários');
                    });
            }).post(AUTENTICAR_ADMINISTRADOR, (req: Request, res: Response) => {
                /** Novo usuário */
                repositorioUsuario.save(req.body)
                    .then((usuario: Usuario) => {
                        aplicacao.resposta(res, 0, usuario);
                    })
                    .catch((erro) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', 'Erro ao criar usuário');
                    });
            });
    }
}
