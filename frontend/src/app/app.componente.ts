import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IUsuario } from '../../../dominio';

@Component({
    selector: 'app-root',
    templateUrl: './app.componente.html',
    providers: [MessageService]
})
export class AppComponent {
    usuarioAtual: IUsuario;

    constructor(private messageService: MessageService) {
    }

    autenticado() {
        return !!this.usuarioAtual;
    }

}


