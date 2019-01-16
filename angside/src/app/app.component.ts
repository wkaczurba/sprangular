import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angside';

  logged = false; // TODO: Change to session storage.
  unrestrictedResourceResult : string;
  restrictedResourceGETResult : string;
  restrictedResourcePOSTResult : string;

  constructor(private http : HttpClient) {

  }

  login(username : string, password : string) {
    console.log(username);
    console.log(password);

    
  }

  logout() {
    console.log('logout');
  }

  testUnrestrictedResourceResult() {
    console.log('test1')
  }

  testRestrictedResourceGETResult() {
    console.log('test2')
  }

  testRestrictedResourcePOSTResult() {
    console.log('test3')
  }
}

