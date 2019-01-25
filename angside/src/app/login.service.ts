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

  //username = 'user';
  //password = ''; // 123
  auth : BasicAuth = { username: '', password: ''}
  errorMessage = 'invalid credentials';
  invalidLogin : string;
  isLogged = false;

  constructor(private http :  HttpClient) { }  

  getAuthHeader(username : string, password : string) : string {
    console.log('username: ' + username);
    console.log('password: ' + password);
    return 'Basic ' + window.btoa(username + ':' + password);  
  }

  handleLogin(username : string, password : string) : Observable<boolean> {
    //console.log(`Attempting logging of user: ${this.username}`);

    return this.http.get<BasicAuth>(this.loginUrl, { headers : new HttpHeaders({ Authorization: this.getAuthHeader(username, password)}) })
      .pipe(
        map( basicAuth => { 
          // success:
          console.log('x=' + JSON.stringify(basicAuth));
          this.auth = basicAuth
          this.auth.password = password;
          this.isLogged = true;
          this.invalidLogin = null;
          return true;
        }),
        catchError( (err : any) => {
          this.auth = { username:'', password:''};
          this.isLogged = false;
          this.invalidLogin = 'Invalid login or other exception.';
          return of(false);
          }
        )
      )

  }

  handleLogout() : Observable<boolean> {
    this.isLogged = false;
    this.auth = { username: '', password: '' };
    this.invalidLogin = null;
    return of(true);
  }


}
