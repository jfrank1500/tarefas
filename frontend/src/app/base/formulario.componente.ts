import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import * as config from '../../../../config/config.comum';
import { CRUDServico } from './crud.servico';
import { IEntidade } from '../../../../dominio';
import { CALENDARIO_PT } from '../../../../config/config.comum';
import { RespostaMultipla } from './base.servico';

export abstract class Formulario<T extends IEntidade> {
  public visivel = false;
  public apagavel = false;
  public titulo = '';
  public arquivoCSV = 'exportacao';
  public modelo: T;
  public selecao: T;
  public lista: T[] = [];
  public pagina = 0;
  public registrosPorPagina = config.TAMANHO_PAGINA;
  public totalRegistros = 100;
  protected mensagensErro: string[];

  public pt = CALENDARIO_PT;
  public ajudaVisivel = false;

  constructor(
    protected servico: CRUDServico<T>,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService) {
  }

  protected abstract getEntidade(): T;

  protected getRegistro() {
    let entidade: any = this.getEntidade();
    for (let atributo in entidade) {
      if (entidade.hasOwnProperty(atributo)) {
        let valor: any = entidade[atributo];
        if (valor instanceof Date) {
          entidade[atributo] = moment(entidade[atributo]).format('YYYY-MM-DD');
        }
      }
    }
    return entidade;
  }

  protected abstract validarModelo(): string[];

  get filtro() { return { 'pagina': this.pagina }; }

  aoPaginar(evento: any) {
    this.pagina = evento.page;
    this.atualizar();
  }

  protected criarCampoFiltro(): FormControl {
    let campo = new FormControl();
    campo.valueChanges.debounceTime(500).distinctUntilChanged().subscribe(
      () => this.atualizar(), () => {
      });
    return campo;
  }

  protected exibirAlerta(titulo: string, detalhe: string) {
    this.messageService.clear();
    this.messageService.add({ severity: 'info', summary: titulo, detail: detalhe, life: 5000 });
  }

  protected exibirErro(titulo: string, detalhe: string) {
    this.messageService.clear();
    this.messageService.add({ severity: 'error', summary: titulo, detail: detalhe, life: 5000 });
  }

  public atualizar() {
    let filtro: any = this.filtro;
    filtro.pagina = this.pagina;
    filtro.tamanho = config.TAMANHO_PAGINA;
    this.servico.localizarTodos(filtro).subscribe(retorno => {
      this.lista = this.extrairListaDoRetorno(retorno);
      this.totalRegistros = this.extrairStatusDoRetorno(retorno);
    }, (erro) => { console.log(erro) });
  }

  public editar(modelo: T) {
    this.titulo = 'Editar';
    this.modelo = modelo;
    this.apagavel = true;
    this.visivel = true;
  }

  public exibirAjuda() {
    this.ajudaVisivel = true;
  }

  protected converterParaCSV(elementos) {
    let vetor = typeof elementos != 'object' ? JSON.parse(elementos) : elementos;
    let resultado = '';

    let cabecalho = "";
    for (let index in elementos[0]) {
      cabecalho += index + ';';
    }
    cabecalho = cabecalho.slice(0, -1);
    resultado += cabecalho + '\r\n';

    for (let i = 0; i < vetor.length; i++) {
      var linha = '';
      for (let index in vetor[i]) {
        if (linha != '') linha += ';';
        let conteudo = vetor[i][index] !== null ? vetor[i][index] + '' : '';
        if (conteudo.match(/^\d{4}[./-]\d{2}[./-]\d{2}/)) {
          conteudo = moment(conteudo.substring(0, 10)).format("DD/MM/YYYY");
        }
        conteudo.replace(/(['"])/g, "\\$1");
        linha += '"' + conteudo + '"';
      }
      resultado += linha + '\r\n';
    }
    return resultado;
  }

  public extrairListaDoRetorno(retorno: RespostaMultipla): T[] {
    return retorno.data;
  }

  public extrairStatusDoRetorno(retorno: RespostaMultipla): number {
    return retorno.status;
  }

  public exportar() {
    // http://vteams.com/blog/using-angular2-to-convert-json-to-csv/
    let filtro: any = this.filtro;
    filtro.pagina = 0;
    filtro.tamanho = 1000;
    this.servico.localizarTodos(filtro).subscribe(retorno => {
      let lista = this.extrairListaDoRetorno(retorno);
      let dados = lista.map(this.projecaoExportacao);
      let dadosCSV = this.converterParaCSV(dados);
      let a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      let blob = new Blob([dadosCSV], { type: 'text/csv' });
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = this.arquivoCSV + '.csv';
      a.click();
    }, () => {
    });
  }

  public projecaoExportacao(valor: any) {
    return valor;
  }

}