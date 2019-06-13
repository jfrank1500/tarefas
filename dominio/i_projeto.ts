import { ITarefa } from "./i_tarefa";
import { IEntidade } from "./i_entidade";
import { IValidador } from './i_validador';

export interface IProjeto extends IEntidade {
    id: number;
    nome: string;
    tarefas: ITarefa[];
}

export function PROJETO_VAZIO(): IProjeto {
    return {
        id: null,
        nome: '',
        tarefas: []
    };
}

export class ProjetoValidador {

    public validar(m: IProjeto, validador: IValidador): string[] {
        validador.textoRequerido(m.nome, 'Nome do projeto não pode ser vazio');
        return validador.getMensagensErro();
    }
}