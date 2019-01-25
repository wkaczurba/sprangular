import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private loginService : LoginService) { }

  getAuthHeader() : string {
    let username = this.loginService.auth.username;
    let password = this.loginService.auth.password;

    return 'Basic ' + window.btoa(username + ':' + password)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.has('Authorization') && !(req.headers.get('no-auth') === 'true')) {
      // if no authorization in place - add one:
      req = req.clone({ headers : new HttpHeaders({ Authorization: this.getAuthHeader()})});
    } else {
      req = req.clone();
    }

    return next.handle(req)
  }
  
}
