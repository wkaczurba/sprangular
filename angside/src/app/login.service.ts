import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicAuth } from './BasicAuth';
import { API_URL, TOKEN, AUTHENTICATED_USER, JWT_AUTH_URL } from './constants';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl : string = `${API_URL}/basicAuth`

  errorMessage = 'invalid credentials';
  invalidLogin : string;

  constructor(private http :  HttpClient) { }  

  getAuthHeader(username : string, password : string) : string {
    console.log('username: ' + username);
    console.log('password: ' + password);
    return 'Basic ' + window.btoa(username + ':' + password);  
  }

  handleBasicAuthLogin(username : string, password : string) : Observable<boolean> {
    let authorizationHeader = this.getAuthHeader(username, password)
    return this.http.get<BasicAuth>(this.loginUrl, { headers : new HttpHeaders({ Authorization: authorizationHeader }) })
      .pipe(
        map( basicAuth => { 
          // success:
          console.log('x=' + JSON.stringify(basicAuth));
          sessionStorage.setItem(AUTHENTICATED_USER, basicAuth.username);
          sessionStorage.setItem(TOKEN, authorizationHeader);

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

  handleJwtAuthLogin(username : string, password : string) : Observable<boolean> {

    return this.http.post<any>(`${JWT_AUTH_URL}`, { username, password })
      .pipe(
        map(data => {
          console.log('x=' + JSON.stringify(data))
          sessionStorage.setItem(AUTHENTICATED_USER, username)
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`)
          return true
        }),
        catchError( (err : any) => {
          this.logout()
          this.invalidLogin = 'Invalid login or other excepiton';
          return of(false)
        })
      )
  }

  getUsername() {
    return this.isLogged() ? sessionStorage.getItem(AUTHENTICATED_USER) : null;
  }

  isLogged() : boolean {
    return sessionStorage.getItem(AUTHENTICATED_USER) != null;
  }

  private logout() {
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(AUTHENTICATED_USER);    
    this.invalidLogin = null;
  }

  handleLogout() : Observable<boolean> {
    this.logout();
    return of(true);
  }

}
