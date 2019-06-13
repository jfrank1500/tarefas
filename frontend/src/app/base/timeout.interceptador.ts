import { InjectionToken, Inject, Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import 'rxjs/add/operator/timeout';
import { TimeoutServico } from './timeout.servico';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
export const defaultTimeout = 10000;

/**
 * Aborta conexao HTTP que se estende por mais de 10 segundos.
 */
@Injectable()
export class TimeoutInterceptador implements HttpInterceptor {
  constructor( @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
    protected timeoutService: TimeoutServico
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeout = Number(req.headers.get('timeout')) || this.defaultTimeout;
    this.timeoutService.reiniciar();
    return next.handle(req).timeout(timeout);
  }
}

export const InterceptadorTimeoutProvedor = {
  provide: HTTP_INTERCEPTORS,
  useClass: TimeoutInterceptador,
  multi: true
};

export const TimeoutPadraoProvedor = {
  provide: DEFAULT_TIMEOUT,
  useValue: defaultTimeout
};
