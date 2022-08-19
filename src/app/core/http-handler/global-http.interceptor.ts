import {
    HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
    .handle(req)
    .pipe(
        catchError((error: HttpErrorResponse) => {
            console.log('ERROR: ', error);
            throw error;
        }),
        finalize(() => {
            console.log('Interceptor: ', req)
        })
    )
  }
}
