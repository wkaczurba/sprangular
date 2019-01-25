import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, 
    private loginService : LoginService) { }

  ngOnInit() {
    if (this.loginService.isLogged()) {
      console.log('login.component: logged');
      this.router.navigate(['/dashboard/'])
    } else {
      console.log('login.component: not logged');
    }
  }

  username = 'user';
  password = '123'; // 123

  handleLogin() {

    console.log(`Attempting logging of user: ${this.username}`)
    // if (this.username == 'user' && this.password == '123') {
    //   // TODO: router navigate  ...
    //   this.router.navigate(['/welcome', this.username])      
    // }

    this.loginService.handleLogin(this.username, this.password).subscribe(
      res => { if (res) {
          this.router.navigate(['/welcome', this.username])      
        } else {
          // HANDLE.
        }
      }
    )
    // if (this.loginService.handleLogin(this.username, this.password)) {
    //   this.router.navigate(['/welcome', this.username])
    // } else {

    // }    
  }

  handleLogout() {
      this.router.navigate(['/logout']);
  }

}
