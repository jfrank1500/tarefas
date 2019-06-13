import * as moment from 'moment';
import { IValidador } from '../../../../dominio';

export class Validador implements IValidador {

    private mensagensErro: string[];

    constructor() {
        this.mensagensErro = [];
    }

    public getMensagensErro(): string[] {
        return this.mensagensErro;
    }

    public textoRequerido(texto: string, mensagem: string) {
        if ((texto || '') === '') {
            this.mensagensErro.push(mensagem);
        }
    }

    public numeroRequerido(numero: number, mensagem: string) {
        if (numero === null) {
            this.mensagensErro.push(mensagem);
        }
    }

    public dataValida(data: string, mensagem: string) {
        if (!moment(data).isValid()) {
            this.mensagensErro.push(mensagem);
        }
    }

}