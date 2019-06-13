import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabela',
  template: `<p-panel header="{{titulo}}">
  <div class="ui-g">
    <div class="ui-g-4">
      <button type="button" pButton icon="fa fa-plus" (click)="novo()" label="Novo"></button> ::
      <button type="button" pButton icon="fa fa-sync" (click)="atualizar()" label="Atualizar" class="ui-button-success"></button> ::
      <button type="button" pButton icon="fa fa-table" (click)="exportar()" label="Exportar" class="ui-button-secondary"></button>
    </div> 
    <div class="ui-g-8">
      <p-paginator (onPageChange)="ao_paginar($event)" [rows]="registrosPorPagina" [totalRecords]="totalRegistros" pageLinkSize="10">
      </p-paginator>
    </div>   
  </div>
  <p-table [columns]="colunas" [value]="lista" [(selection)]="selecao" (onRowSelect)="editar()" selectionMode="single"
    emptyMessage="Sem registros">
    <ng-template pTemplate="header" let-colunas>
      <tr>
        <th *ngFor="let coluna of colunas">{{coluna.cabecalho}}</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-linha let-colunas="columns">
      <tr [pSelectableRow]="linha">
        <td *ngFor="let coluna of colunas">{{f(linha[coluna.campo], coluna.formato)}}</td>
      </tr>
    </ng-template>
  </p-table>
</p-panel>`
})
export class TabelaComponente implements OnInit {

  selecao;

  @Input() titulo = 'Título'
  @Input() lista = [
    { "id": 1, "nome": "alfa" },
    { "id": 2, "nome": "bravo" },
    { "id": 3, "nome": "charlie" }
  ]
  @Input() colunas: any[] = [
    { campo: 'id', cabecalho: 'ID', tipo: "number" },
    { campo: 'nome', cabecalho: 'Nome', tipo: "string" }
  ];
  @Input() registrosPorPagina = 10;
  @Input() totalRegistros = 2;

  @Output() novo_click = new EventEmitter();
  @Output() atualizar_click = new EventEmitter();
  @Output() exportar_click = new EventEmitter();
  @Output() editar_click = new EventEmitter();
  @Output() ao_paginar_evento = new EventEmitter();

  f(valor, formato){
    if(formato){
      return formato(valor);
    } else {
      return valor;
    }
  }

  novo() {
    this.novo_click.emit();
  }
  atualizar() {
    this.atualizar_click.emit();
  }
  exportar() {
    this.exportar_click.emit();
  }
  editar() {
    this.editar_click.emit(this.selecao);
  }
  ao_paginar(event) {
    this.ao_paginar_evento.emit(event);
  }

  ngOnInit(): void {
  }

}
