import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private loginService : LoginService) { }

  getAuthHeaders() {
    if (sessionStorage.getItem('authorizationHeader')) {
      return { headers : new HttpHeaders({ Authorization: sessionStorage.getItem('authorizationHeader') })}
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.has('Authorization') && !(req.headers.get('no-auth') === 'true')) {
      // if no authorization in place - add one:
      req = req.clone( this.getAuthHeaders() );
    } else {
      req = req.clone();
    }

    return next.handle(req)
  }
  
}
