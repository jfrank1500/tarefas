import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import { Crud, Validador, RespostaMultipla } from '../base';
import { ITarefa, TAREFA_VAZIA, TarefaValidador, IUsuario, IProjeto } from '../../../../dominio';
import { TarefaServico } from './tarefa.servico';
import { Router } from '@angular/router';
import { INICIO_URL, TAMANHO_PAGINA } from '../../../../config/config.comum';
import { UsuarioServico } from '../usuarios';
import * as moment from 'moment';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.componente.html'
})

export class TarefaComponente extends Crud<ITarefa> implements OnInit {

  colunas: any[] = [
    { campo: 'id', cabecalho: 'ID' },
    { campo: 'projeto', cabecalho: 'Projeto', formato: (projeto: IProjeto) => { return projeto.nome; } },
    { campo: 'descricao', cabecalho: 'Tarefa' },
    { campo: 'usuario', cabecalho: 'Responsável', formato: (responsavel: IUsuario) => { return responsavel.nome; } },
    { campo: 'previsao', cabecalho: 'Prazo', formato: (prazo: Date) => { return moment(prazo).format("DD/MM/YYYY"); } },
  ];

  usuarios: SelectItem[] = [];
  projetos: SelectItem[] = [];

  validador: TarefaValidador = new TarefaValidador();

  constructor(
    protected servico: TarefaServico,
    protected servicoUsuario: UsuarioServico,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
    protected roteador: Router) {
    super(servico, confirmationService, messageService);
    this.arquivoCSV = 'tarefas';
  }

  ngOnInit() {
    this.atualizar();
  }

  usuario_id = -1;
  previsao_tmp: Date;

  editar(e) {
    super.editar(e);
    this.usuario_id = this.modelo.id;
    if (this.modelo.previsao) {
      this.previsao_tmp = moment(this.modelo.previsao).toDate();
    } else {
      this.previsao_tmp = moment().toDate();
      this.modelo.previsao = '';
    }
  }

  public getEntidade(): ITarefa {
    this.modelo.previsao = moment(this.previsao_tmp).format("YYYY-MM-DD");
    return {
      id: this.modelo.id,
      descricao: this.modelo.descricao || '',
      previsao: this.modelo.previsao,
      usuario_id: this.modelo.usuario_id,
      usuario: undefined,
      projeto_id: this.modelo.projeto_id,
      projeto: undefined
    };
  }

  public extrairListaDoRetorno(retorno: RespostaMultipla): ITarefa[] {
    let data: any = retorno.data;
    return data.tarefas;
  }

  public atualizar() {
    let filtro: any = this.filtro;
    filtro.pagina = this.pagina;
    filtro.tamanho = TAMANHO_PAGINA;
    this.servico.localizarTodos(filtro).subscribe(retorno => {
      this.lista = this.extrairListaDoRetorno(retorno);
      this.totalRegistros = this.extrairStatusDoRetorno(retorno);
      let data: any = retorno.data;
      this.usuarios = [{
        label: 'Selecione um usuário...',
        value: -1
      }];
      data.usuarios.forEach((usuario: IUsuario) => {
        this.usuarios.push({
          label: usuario.nome,
          value: usuario.id
        })
      });
      this.projetos = [{
        label: 'Selecione um projeto...',
        value: -1
      }];
      data.projetos.forEach((projeto: IProjeto) => {
        this.projetos.push({
          label: projeto.nome,
          value: projeto.id
        })
      });
    }, (erro) => { console.log(erro) });
  }

  voltar() {
    this.roteador.navigate([INICIO_URL]);
  }

  protected getModeloVazio(): ITarefa {
    this.previsao_tmp = null;
    return TAREFA_VAZIA();
  }

  protected validarModelo() {
    return this.validador.validar(this.modelo, new Validador());
  }

  protected getResumoModelo() {
    return this.modelo.descricao;
  }
}
