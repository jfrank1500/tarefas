import { RespostaMultipla, RespostaUnica, BaseServico } from './base.servico';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class CRUDServico<T> extends BaseServico {

    public localizarTodos(query: any = {}): Observable<RespostaMultipla> {
        let url = this.serialize('', query);
        return this.http.get<RespostaMultipla>(url, { withCredentials: true, headers: this.headers })
    }

    public localizar(id: number, query: any = {}): Observable<RespostaUnica> {
        let url = this.serialize('/' + id, query);
        return this.http.get<RespostaUnica>(url, { withCredentials: true, headers: this.headers });
    }

    public criar(data: T, query: any = {}): Observable<RespostaUnica> {
        let url = this.serialize('', query);
        return this.http.post<RespostaUnica>(url, data, { withCredentials: true, headers: this.headers });
    }

    public atualizar(id: number, data: T, query: any = {}): Observable<RespostaUnica> {
        let url = this.serialize('/' + id, query);
        return this.http.put<RespostaUnica>(url, data, { withCredentials: true, headers: this.headers });
    }

    public apagar(id: number, query: any = {}): Observable<RespostaUnica> {
        let url = this.serialize('/' + id, query);
        return this.http.delete<RespostaUnica>(url, { withCredentials: true, headers: this.headers });
    }
}