import { Injectable } from '@angular/core';

export const TOKEN_TIMEOUT = 30 * 60; /* 30 minutos */
@Injectable()
export class TimeoutServico {
    private contador = TOKEN_TIMEOUT;

    public reiniciar() {
        this.contador = TOKEN_TIMEOUT + 1;
    }

    public contar(): number {
        if (this.contador > 0) {
            this.contador--;
        }
        return this.contador;
    }
}