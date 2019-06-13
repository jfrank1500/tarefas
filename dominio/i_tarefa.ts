import { IUsuario } from "./i_usuario";
import { IEntidade } from "./i_entidade";
import { IValidador } from "./i_validador";
import { IProjeto } from './i_projeto';

export interface ITarefa extends IEntidade {
    id: number;
    descricao: string;
    previsao: string;
    usuario_id: number;
    projeto_id: number;
    usuario: IUsuario;
    projeto: IProjeto;
}

export function TAREFA_VAZIA(): ITarefa {
    return {
        id: null,
        descricao: '',
        previsao: null,
        usuario_id: 0,
        usuario: null,
        projeto_id: 0,
        projeto: null
    };
}

export class TarefaValidador {

    public validar(m: ITarefa, validador: IValidador): string[] {
        validador.textoRequerido(m.descricao, 'Descrição da tarefa não pode ser vazia');
        validador.dataValida(m.previsao, 'Data da previsão tem que ser válida');
        return validador.getMensagensErro();
    }

}