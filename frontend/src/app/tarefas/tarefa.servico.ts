import { CRUDServico } from '../base';
import { Injectable } from '@angular/core';
import { ITarefa } from '../../../../dominio';

@Injectable()
export class TarefaServico extends CRUDServico<ITarefa> {
  get path(): string { return 'tarefas'; }

}