import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicAuth } from './BasicAuth';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl : string = 'http://localhost:8080/api/basicAuth'

  errorMessage = 'invalid credentials';
  invalidLogin : string;
  //isLogged = false;

  constructor(private http :  HttpClient) { }  

  getAuthHeader(username : string, password : string) : string {
    console.log('username: ' + username);
    console.log('password: ' + password);
    return 'Basic ' + window.btoa(username + ':' + password);  
  }

  handleLogin(username : string, password : string) : Observable<boolean> {
    let authorizationHeader = this.getAuthHeader(username, password)
    return this.http.get<BasicAuth>(this.loginUrl, { headers : new HttpHeaders({ Authorization: authorizationHeader }) })
      .pipe(
        map( basicAuth => { 
          // success:
          console.log('x=' + JSON.stringify(basicAuth));
          sessionStorage.setItem('authenticatedUser', basicAuth.username);
          sessionStorage.setItem('authorizationHeader', authorizationHeader);

          //this.auth.password = password;
          this.invalidLogin = null;
          return true;
        }),
        catchError( (err : any) => {
          this.logout();
          this.invalidLogin = 'Invalid login or other exception.';
          return of(false);
          }
        )
      )
  }

  isLogged() : boolean {
    return sessionStorage.getItem('authenticatedUser') != null;
  }

  private logout() {
    sessionStorage.removeItem('authorizationHeader');
    sessionStorage.removeItem('authenticatedUser');    
    this.invalidLogin = null;
  }

  handleLogout() : Observable<boolean> {    
    this.logout();
    return of(true);
  }

}
