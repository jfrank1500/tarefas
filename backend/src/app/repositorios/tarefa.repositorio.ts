import {
    Repository, EntityRepository
} from "typeorm";

import { Tarefa } from "../entidades";

@EntityRepository(Tarefa)
export class RepositorioTarefa extends Repository<Tarefa>{

    localizarTodos(pagina: number, tamanhoPagina: number, filtro?: any): Promise<Tarefa[]> {
        return this.createQueryBuilder("tarefa")
            .leftJoinAndSelect("tarefa.usuario", "usuario")
            .leftJoinAndSelect("tarefa.projeto", "projeto")
            .select("tarefa.id")
            .addSelect("tarefa.descricao")
            .addSelect("tarefa.previsao")
            .addSelect("tarefa.usuario_id")
            .addSelect("tarefa.projeto_id")
            .addSelect("usuario.id")
            .addSelect("usuario.nome")
            .addSelect("projeto.id")
            .addSelect("projeto.nome")
            .orderBy("tarefa.descricao")
            .skip(pagina * tamanhoPagina)
            .take(tamanhoPagina)
            .getMany();
    }

}