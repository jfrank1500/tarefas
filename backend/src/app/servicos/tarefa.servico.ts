import { Request, Response } from 'express';
import { RepositorioTarefa, RepositorioUsuario, RepositorioProjeto } from '../repositorios';
import { Aplicacao } from '../index';
import { Tarefa } from '../entidades';
import { AUTENTICAR_USUARIO, LOG } from '../base';
import {
    REQUISICAO_ERRADA,
    API_TAREFAS_ID,
    API_TAREFAS,
    NAO_ENCONTRADO,
    TAMANHO_PAGINA
} from '../../../../config/config.comum';
import { DeleteResult } from 'typeorm';

export class TarefaServico {

    static registrar(aplicacao: Aplicacao) {

        const repositorioTarefa: RepositorioTarefa = aplicacao.criarRepositorio(RepositorioTarefa);
        const repositorioUsuario: RepositorioUsuario = aplicacao.criarRepositorio(RepositorioUsuario);
        const repositorioProjeto: RepositorioProjeto = aplicacao.criarRepositorio(RepositorioProjeto);

        aplicacao.servidorHTTP.route(API_TAREFAS_ID)
            .get((req: Request, res: Response) => {
                /** Localizar tarefa pelo ID */
                let id = Number(req.params.id);
                repositorioTarefa.findOne(id)
                    .then((tarefa: Tarefa) => {
                        if (tarefa) {
                            aplicacao.resposta(res, 1, tarefa);
                        } else {
                            aplicacao.erro(res, NAO_ENCONTRADO, 'Erro', `Tarefa não encontrada ${id}`);
                        }
                    })
                    .catch((erro) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', `Erro ao localizar tarefa ${id}`);
                    });
            }).put(AUTENTICAR_USUARIO, (req: Request, res: Response) => {
                /** Atualizar tarefa pelo ID. Precisa estar autenticado. */
                let id = Number(req.params.id);
                repositorioTarefa.save(req.body)
                    .then((retorno) => {
                        aplicacao.resposta(res, 1, retorno);
                    })
                    .catch((erro) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, { code: erro.message }, `Erro ao atualizar tarefa ${id}`);
                    });
            }).delete(AUTENTICAR_USUARIO, (req: Request, res: Response) => {
                /** Apagar tarefa pelo ID. Precisa estar autenticado. */
                console.log(req.user);
                let id = Number(req.params.id);
                repositorioTarefa.delete(id)
                    .then((retorno: DeleteResult) => {
                        aplicacao.resposta(res, 1, retorno);
                    })
                    .catch((erro) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, { code: erro.message }, `Erro ao apagar tarefa ${id}`);
                    });
            });

        aplicacao.servidorHTTP.route(API_TAREFAS)
            .get((req: Request, res: Response) => {
                /** Localizar todas as tarefas */
                let pagina = Number(req.query.pagina || 0);
                repositorioTarefa.count().then(async (total_registros) => {
                    let projetos = await repositorioProjeto
                        .createQueryBuilder("projeto")
                        .select("projeto.id")
                        .addSelect("projeto.nome")
                        .orderBy("nome")
                        .getMany();
                    let usuarios = await repositorioUsuario
                        .createQueryBuilder("usuario")
                        .select("usuario.id")
                        .addSelect("usuario.nome")
                        .orderBy("nome")
                        .getMany();
                    repositorioTarefa.localizarTodos(pagina, TAMANHO_PAGINA)
                        .then((tarefas: Tarefa[]) => {
                            aplicacao.resposta(res, total_registros, {
                                tarefas: tarefas,
                                projetos: projetos,
                                usuarios: usuarios
                            })
                        })
                        .catch((erro) => {
                            aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', 'Erro ao localizar tarefas');
                        });
                }).catch((erro) => {
                    aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', 'Erro ao localizar tarefas');
                });
            }).post(AUTENTICAR_USUARIO, (req: Request, res: Response) => {
                /** Nova tarefa. Precisa estar autenticado */
                repositorioTarefa.save(req.body)
                    .then((tarefa: Tarefa) => {
                        aplicacao.resposta(res, 0, tarefa)
                    })
                    .catch((erro) => {
                        aplicacao.erro(res, REQUISICAO_ERRADA, 'Erro', 'Erro ao criar tarefa');
                    });
            });;
    }
}
