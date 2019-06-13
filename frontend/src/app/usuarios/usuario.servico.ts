import { CRUDServico, RespostaUnica, RespostaMultipla } from '../base';
import { Injectable } from '@angular/core';
import { IUsuario } from '../../../../dominio';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioServico extends CRUDServico<IUsuario> {
  get path(): string { return 'usuarios'; }

  public atualizarToken(): Observable<RespostaUnica> {
    let url = this.serialize('/token/atualizar');
    return this.http.get<RespostaUnica>(url, { withCredentials: true, headers: this.headers });
  }

  public entrar(usuario: any): Observable<RespostaUnica> {
    let url = this.serialize('/entrar');
    return this.http.post<RespostaUnica>(url, usuario, { withCredentials: true, headers: this.headers });
  }

  public sair(): Observable<RespostaUnica> {
    let url = this.serialize('/sair');
    return this.http.post<RespostaUnica>(url, { withCredentials: true, headers: this.headers });
  }

  public listar(): Observable<RespostaMultipla> {
    let url = this.serialize('/listar');
    return this.http.get<RespostaMultipla>(url, { withCredentials: true, headers: this.headers });
  }

}