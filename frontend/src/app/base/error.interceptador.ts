import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

/**
 * Intercepta as resposta HTTP, e em caso de ser um erro ou exceção, trata-o e
 * extrai a informacao relevante sobre ele.
 */
@Injectable()
export class ErroInterceptador implements HttpInterceptor {
  public constructor(private roteador: Router, protected servicoNotificacao: MessageService) { }

  /**
   * Intercepta um requisicao HTTP, executa-o e manipula qualquer erro que
   * poderia ser disparado em execucao.
   * @see HttpInterceptor
   * @param req a requisicao HTTP
   * @param next um manipulador de requisicao HTTP
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch(resposta => {
      let mensagem: string;
      if (resposta instanceof HttpErrorResponse) {
        const errJson = JSON.stringify(resposta.error);
        if (resposta.error && resposta.error.err && resposta.error.err.code) {
          let texto = '';
          switch (resposta.error.err.code) {
            case 'ECONNREFUSED': texto = 'Erro ao conectar banco de dados'; break;
            default: texto = errJson;
          }
          mensagem = `${resposta.error.err.code}: ${texto}`;
        } else {
          mensagem = `${resposta.statusText || 'sem status'} : ${errJson}`;
        }
        if (resposta.status == 400) {
          this.servicoNotificacao.clear();
          this.servicoNotificacao.add({
            severity: 'error',
            summary: 'Erro',
            detail: mensagem
          });
          this.roteador.navigate(['/']);
        };
      } else {
        mensagem = resposta.message ? resposta.message : resposta.toString();
      }
      console.log(mensagem);
      return _throw(mensagem);
    });
  }
}

/**
 * POJO para o interceptador
 */
export const ErroProviderInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErroInterceptador,
  multi: true,
};