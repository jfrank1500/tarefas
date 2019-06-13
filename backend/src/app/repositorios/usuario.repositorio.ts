import {
    Repository, EntityRepository
} from "typeorm";

import { Usuario } from "../entidades/usuario";

@EntityRepository(Usuario)
export class RepositorioUsuario extends Repository<Usuario>{

    public localizarPorLoginSenha(login: string, senha: string): Promise<Usuario> {
        return this.createQueryBuilder('usuario')
            .where("usuario.login = :login", { login: login })
            .andWhere('usuario.senha = :senha', { senha: senha })
            .getOne();
    }

    public localizarTodos(pagina: number, tamanhoPagina: number, filtro?: any): Promise<Usuario[]> {
        return this.createQueryBuilder("usuario")
            .skip(pagina * tamanhoPagina)
            .take(tamanhoPagina)
            .getMany();
    }

}