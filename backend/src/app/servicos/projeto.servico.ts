import { Request, Response } from 'express';
import { RepositorioProjeto } from '../repositorios';
import { Aplicacao } from '../index';
import { Projeto } from '../entidades';
import { AUTENTICAR_USUARIO } from '../base';
import {
    REQUISICAO_ERRADA,
    API_PROJETOS_ID,
    API_PROJETOS,
    NAO_ENCONTRADO,
    TAMANHO_PAGINA
} from '../../../../config/config.comum';
import { DeleteResult } from 'typeorm';

export class ProjetoServico {

    static registrar(aplicacao: Aplicacao) {

        const repositorioProjeto: RepositorioProjeto = aplicacao.criarRepositorio(RepositorioProjeto);

        aplicacao.servidorHTTP.route(API_PROJETOS_ID)
            .get((req: Request, res: Response) => {
                /** Localizar projeto pelo ID */
                let id = Number(req.params.id);
                repositorioProjeto.findOne(id)
                    .then((projeto: Projeto) => {
                        if (projeto) {
                            aplicacao.resposta(res, 1, projeto);
                        } else {
                            aplicacao.erro(res, NAO_ENCONTRADO, 'Erro', `Projeto não encontrado ${id}`);
                        }
                    })
                    .catch((erro) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', `Erro ao localizar projeto ${id}`);
                    });
            }).put(AUTENTICAR_USUARIO, (req: Request, res: Response) => {
                /** Atualizar projeto pelo ID. Precisa estar autenticado. */
                let id = Number(req.params.id);
                repositorioProjeto.save(req.body)
                    .then((retorno) => {
                        aplicacao.resposta(res, 1, retorno);
                    })
                    .catch((erro) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, { code: erro.message }, `Erro ao atualizar projeto ${id}`);
                    });
            }).delete(AUTENTICAR_USUARIO, (req: Request, res: Response) => {
                /** Apagar projeto pelo ID. Precisa estar autenticado. */
                console.log(req.user);
                let id = Number(req.params.id);
                repositorioProjeto.delete(id)
                    .then((retorno: DeleteResult) => {
                        aplicacao.resposta(res, 1, retorno);
                    })
                    .catch((erro) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, { code: erro.message }, `Erro ao apagar projeto ${id}`);
                    });
            });

        aplicacao.servidorHTTP.route(API_PROJETOS)
            .get((req: Request, res: Response) => {
                /** Localizar todas as projetos */
                let pagina = Number(req.query.pagina || 0);
                repositorioProjeto.count().then((total_registros) => {
                    repositorioProjeto.localizarTodos(pagina, TAMANHO_PAGINA)
                        .then((projetos: Projeto[]) => {
                            aplicacao.resposta(res, total_registros, projetos)
                        })
                        .catch((erro) => {
                            aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', 'Erro ao localizar projetos');
                        });
                }).catch((erro) => {
                    aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', 'Erro ao localizar projetos');
                });
            }).post(AUTENTICAR_USUARIO, (req: Request, res: Response) => {
                /** Novo projeto. Precisa estar autenticado */
                repositorioProjeto.save(req.body)
                    .then((projeto: Projeto) => {
                        aplicacao.resposta(res, 0, projeto)
                    })
                    .catch((erro) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', 'Erro ao criar projeto');
                    });
            });;
    }
}
