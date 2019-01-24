import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isLoggedOut : boolean

  constructor(private loginService : LoginService) { }

  ngOnInit() {
    this.loginService.handleLogout().subscribe(success => this.isLoggedOut = success);
  }

}
