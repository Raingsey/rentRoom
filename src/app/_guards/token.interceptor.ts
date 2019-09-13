import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const started = Date.now();
    const clone_request = request.clone({
      setHeaders: {
     //   Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    // console.log('Token in interceptor: ' + this.auth.getToken());
    // console.log('Header in interceptor: ' + clone_request.headers.getAll('Authorization'));
    return next.handle(clone_request);
      // .do(event => {
      // if (event instanceof HttpResponse) {
      //   const elapsed = Date.now() - started;
      //   console.log(`Request for ${clone_request.urlWithParams} took ${elapsed} ms.`);
      // }
      // });
  }
}
