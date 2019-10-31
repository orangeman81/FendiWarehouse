import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError, finalize } from 'rxjs/operators';
import { StateService } from '../state.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private store: StateService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this.store.loading = true
    return this.store.$token
      .pipe(
        mergeMap(token => {
          const tokenReq = req.clone({
            setHeaders: {
              'Authorization': `Bearer ${token}`
            }
          });
          return next.handle(tokenReq);
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            this.store.state = {
              ...this.store.state,
              message: err.statusText
            };
            this.router.navigate(['error']);
            return throwError(err)
          }
        }),
        finalize(() => this.store.loading = false)
      );
  }

}