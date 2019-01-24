import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username = 'user';
  password = ''; // 123
  errorMessage = 'invalid credentials';
  invalidLogin : string;
  logged = false;

  handleLogin(username : string, password : string) : boolean {
    console.log(`Attempting logging of user: ${this.username}`)
    if (username == 'user' && password == '123') {
      this.username = username;
      this.password = password;
      console.log('Login succeeded.')
      this.invalidLogin = null;
      this.logged = true;
      return true;
    } else {
      console.log('Login failed.')
      this.invalidLogin = 'Login failed';
      this.logged = false;
      return false;
    }
  }

  handleLogout() {
    this.logged = false;
    this.invalidLogin = null;
  }

  constructor() { }
}
