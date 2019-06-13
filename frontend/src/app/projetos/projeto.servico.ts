import { CRUDServico } from '../base';
import { Injectable } from '@angular/core';
import { IProjeto } from '../../../../dominio';

@Injectable()
export class ProjetoServico extends CRUDServico<IProjeto> {
  get path(): string { return 'projetos'; }
}