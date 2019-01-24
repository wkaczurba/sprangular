import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username = 'user';
  password = ''; // 123
  errorMessage = 'invalid credentials';
  invalidLogin : string;
  logged = false;

  handleLogin(username : string, password : string) : Observable<boolean> {
    console.log(`Attempting logging of user: ${this.username}`)
    if (username == 'user' && password == '123') {
      this.username = username;
      this.password = password;
      console.log('Login succeeded.')
      this.invalidLogin = null;
      this.logged = true;
      return of(true);
    } else {
      console.log('Login failed.')
      this.invalidLogin = 'Login failed';
      this.logged = false;
      return of(false);
    }
  }

  handleLogout() : Observable<boolean> {
    this.logged = false;
    this.username = '';
    this.password = '';
    this.invalidLogin = null;
    return of(true);
  }

  constructor() { }
}
