import { ITarefa } from "./i_tarefa";
import { IEntidade } from "./i_entidade";
import { IValidador } from './i_validador';

export interface IUsuario extends IEntidade {
    id: number;
    login: string;
    nome: string;
    senha: string;
    perfil: string;
    tarefas: ITarefa[];
}

export function USUARIO_VAZIO(): IUsuario {
    return {
        id: null,
        login: '',
        nome: '',
        senha: '',
        perfil: '',
        tarefas: []
    };
}

export class UsuarioValidador {

    public validar(m: IUsuario, validador: IValidador): string[] {
        validador.textoRequerido(m.login, 'Login do usuário não pode ser vazio');
        validador.textoRequerido(m.senha, 'Senha do usuário não pode ser vazia');
        validador.textoRequerido(m.perfil, 'Perfil do usuário não pode ser vazio');
        return validador.getMensagensErro();
    }

}