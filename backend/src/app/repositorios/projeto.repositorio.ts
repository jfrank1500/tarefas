import {
    Repository, EntityRepository
} from "typeorm";

import { Projeto } from "../entidades";

@EntityRepository(Projeto)
export class RepositorioProjeto extends Repository<Projeto>{

    public localizarTodos(pagina: number, tamanhoPagina: number, filtro?: any): Promise<Projeto[]> {
        return this.createQueryBuilder("projeto")
            .skip(pagina * tamanhoPagina)
            .take(tamanhoPagina)
            .getMany();
    }
}