import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username = 'user';
  password = ''; // 123
  errorMessage = 'invalid credentials';
  invalidLogin = false;
  logged = false;

  handleLogin(username : string, password : string) : boolean {
    console.log(`Attempting logging of user: ${this.username}`)
    if (username == 'user' && password == '123') {
      this.username = username;
      this.password = password;
      console.log('Login succeeded.')
      this.logged = true;
      return true;
    } else {
      console.log('Login failed.')
      this.invalidLogin = true;
      this.logged = false;
      return false;
    }
  }

  handleLogout() {
    this.logged = false;
  }

  constructor() { }
}
