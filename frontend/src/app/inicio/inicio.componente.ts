import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/primeng';
import { UsuarioServico } from '../usuarios';
import { USUARIO_URL, TAREFA_URL, RAIZ_URL, PROJETO_URL } from '../../../../config/config.comum';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.componente.html',
  providers: [UsuarioServico]
})
export class InicioComponente implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    public roteador: Router,
    public usuarioServico: UsuarioServico,
    public messageService: MessageService,
    public confirmationService: ConfirmationService
  ) {
  }

  gerenciarUsuarios() {
    this.roteador.navigate([USUARIO_URL]);
  }

  gerenciarProjetos() {
    this.roteador.navigate([PROJETO_URL]);
  }

  gerenciarTarefas() {
    this.roteador.navigate([TAREFA_URL]);
  }

  sair() {
    this.usuarioServico.sair().subscribe(() => {
      this.roteador.navigate([RAIZ_URL]);
    });

  }

}
