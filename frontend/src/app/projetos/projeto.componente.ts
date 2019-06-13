import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import { Crud, Validador } from '../base';
import { IProjeto, USUARIO_VAZIO, ProjetoValidador } from '../../../../dominio';
import { ProjetoServico } from './projeto.servico';
import { Router } from '@angular/router';
import { INICIO_URL } from '../../../../config/config.comum';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.componente.html'
})

export class ProjetoComponente extends Crud<IProjeto> implements OnInit {

  colunas: any[] = [
    { campo: 'id', cabecalho: 'ID' },
    { campo: 'nome', cabecalho: 'Nome' }
  ];

  validador: ProjetoValidador = new ProjetoValidador();

  constructor(
    protected servico: ProjetoServico,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
    protected roteador: Router) {
    super(servico, confirmationService, messageService);
    this.arquivoCSV = 'projetos';
  }

  ngOnInit() {
    this.atualizar();
  }

  voltar() {
    this.roteador.navigate([INICIO_URL]);
  }

  protected getModeloVazio(): IProjeto {
    return USUARIO_VAZIO();
  }

  public getEntidade(): IProjeto {
    return {
      id: this.modelo.id,
      nome: this.modelo.nome || '',
      tarefas: undefined
    };
  }

  protected validarModelo() {
    return this.validador.validar(this.modelo, new Validador());
  }

  protected getResumoModelo() { return this.modelo.nome; }

}
