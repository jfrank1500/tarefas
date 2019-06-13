import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/primeng';
import { Router } from '@angular/router';
import { IUsuario } from '../../../../dominio';
import { MessageService } from 'primeng/components/common/messageservice';
import { timer } from 'rxjs/observable/timer';
import { TimeoutServico } from '../base';
import { UsuarioServico } from '../usuarios';
import { INICIO_URL, RAIZ_URL } from '../../../../config/config.comum';

@Component({
    selector: 'app-login',
    templateUrl: './login.componente.html'
})
export class LoginComponente implements OnInit {
    usuarioAtual: IUsuario;
    usuario: string;
    senha: string;
    temporizador;
    contador = '';

    constructor(
        private servicoUsuario: UsuarioServico,
        protected timeoutService: TimeoutServico,
        private roteador: Router,
        private servicoNotificacao: MessageService
    ) {
        this.temporizador = timer(0, 1000).subscribe((n) => {
            if (this.autenticado()) {
                let c = timeoutService.contar();
                if (c <= 0) {
                    this.sair();
                } else {
                    let minutos = Math.floor(c / 60) + '';
                    let segundos = (c % 60) + '';
                    if (minutos.length < 2) {
                        minutos = '0' + minutos;
                    }
                    if (segundos.length < 2) {
                        segundos = '0' + segundos;
                    }
                    this.contador = minutos + ':' + segundos;
                }
            }
        });
    }

    ngOnInit() {
        this.servicoUsuario.atualizarToken().subscribe(resposta => {
            let usuario: IUsuario = resposta.data;
            this.usuarioAtual = usuario;
        });
    }

    entrar() {
        this.servicoUsuario.entrar({
            login: this.usuario,
            senha: this.senha
        }).subscribe(resposta => {
            let usuario: IUsuario = resposta.data;
            this.senha = '';
            this.usuarioAtual = usuario;
            this.roteador.navigate([INICIO_URL]);
        }, erro => {
            this.senha = '';
            this.servicoNotificacao.add({
                severity: 'error',
                summary: 'Erro de autenticação',
                detail: erro.toString()
            });
        });
    }

    sair() {
        this.servicoUsuario.sair().subscribe(resposta => {
            this.usuarioAtual = undefined;
            this.roteador.navigate([RAIZ_URL]);
        });
    }

    autenticado() {
        return !!this.usuarioAtual;
    }

    nomeUsuario() {
        const usuario = this.usuarioAtual;
        return usuario.login + ' (' + usuario.perfil + ')';
    }
}
