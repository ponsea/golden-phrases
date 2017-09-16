import { Injectable, Injector } from '@angular/core';
import { HttpEvent,
         HttpInterceptor,
         HttpHandler,
         HttpRequest,
         HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.withCredentials) return next.handle(request);

    let authService = this.injector.get(AuthService);
    let authHeaders = authService.getAuthHeadersObject();
    let authReqest = request.clone({setHeaders: authHeaders, withCredentials: false});
    return next.handle(authReqest)
      .do(event => {
        if (event instanceof HttpResponse) {
          authService.updateAuthData(event.headers);
        }
      });
  }
}
