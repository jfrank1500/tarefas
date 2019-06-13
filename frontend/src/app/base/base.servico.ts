import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface RespostaUnica {
  status: number;
  data: any;
}

export interface RespostaMultipla {
  status: number;
  data: any[];
}

@Injectable()
export abstract class BaseServico {
  protected headers = new HttpHeaders({ 'Accept': 'application/json' });
  protected get URL_API(): string { return '/api'; }
  protected abstract get path(): string;

  constructor(protected http: HttpClient) { }

  protected serialize(sufixo: string, parametros: any = {}): string {
    parametros.time = Math.round((new Date()).getTime() / 1000);
    let queryString = [];
    for (let parametro in parametros) {
      if (parametros.hasOwnProperty(parametro)) {
        queryString.push(
          encodeURIComponent(parametro) + '=' +
          encodeURIComponent(parametros[parametro]));
      }
    }
    let retorno = this.URL_API + '/' + this.path + sufixo + '?' + queryString.join('&');
    return retorno;
  }
}
