import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import { Crud, Validador } from '../base';
import { IUsuario, USUARIO_VAZIO, UsuarioValidador } from '../../../../dominio';
import { UsuarioServico } from './usuario.servico';
import { Router } from '@angular/router';
import { INICIO_URL } from '../../../../config/config.comum';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.componente.html'
})

export class UsuarioComponente extends Crud<IUsuario> implements OnInit {

  public filtroLogin: FormControl;
  novasenha: string;

  colunas: any[] = [
    { campo: 'id', cabecalho: 'ID' },
    { campo: 'login', cabecalho: 'Login' },
    { campo: 'nome', cabecalho: 'Nome' },
    { campo: 'perfil', cabecalho: 'Perfil' }
  ];

  perfis: SelectItem[] = [
    { label: 'Selecione perfil...', value: null },
    { label: 'Administrador', value: 'ADMINISTRADOR' },
    { label: 'Usuário', value: 'USUARIO' }
  ];

  validador: UsuarioValidador = new UsuarioValidador();

  constructor(
    protected servico: UsuarioServico,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
    protected roteador: Router) {
    super(servico, confirmationService, messageService);
    this.arquivoCSV = 'usuarios';
  }

  ngOnInit() {
    this.filtroLogin = this.criarCampoFiltro();
    this.atualizar();
  }

  voltar() {
    this.roteador.navigate([INICIO_URL]);
  }

  protected getModeloVazio(): IUsuario {
    this.novasenha = '';
    return USUARIO_VAZIO();
  }

  public getEntidade(): IUsuario {
    this.modelo.senha = this.novasenha;
    return {
      id: this.modelo.id,
      login: this.modelo.login || '',
      nome: this.modelo.nome || '',
      perfil: this.modelo.perfil || '',
      senha: this.novasenha,
      tarefas: undefined
    };
  }

  protected validarModelo() {
    return this.validador.validar(this.modelo, new Validador());
  }

  protected getResumoModelo() { return this.modelo.login; }

  get filtro() {
    return { 'u': this.filtroLogin.value || '', 'pagina': this.pagina };
  }


}
