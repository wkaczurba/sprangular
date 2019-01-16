import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const url = 'http://localhost:8080/api/firstbean';
    this.http.get<any>(url)
      .subscribe( x => this.unrestrictedResourceResult = JSON.stringify(x),
      err => { this.unrestrictedResourceResult = 'Error ' + JSON.stringify(err); console.log(err); })
    console.log('test1')
  }

  testRestrictedResourceGETResult() {
    const url = 'http://localhost:8080/api/goldenbean';
    const username = "user"
    const password = "123"

    // Authentication header:
    let authHeader = 'Basic ' + window.btoa(username + ':' + password);
    let options = { headers : new HttpHeaders( { Authorization: authHeader }) }

    console.log( url );
    this.http.get<any>(url, options)
      .subscribe( x => this.restrictedResourceGETResult = JSON.stringify(x),
      err => { this.restrictedResourceGETResult = 'Error ' + JSON.stringify(err); console.log(err); })
  }

  testRestrictedResourcePOSTResult() {
    const url = "http://localhost:8080/api/postbean";
    this.http.post<any>(url, { abc : "posted-from-angular" })
      .subscribe( x => this.restrictedResourcePOSTResult = JSON.stringify(x),
      err => { this.restrictedResourcePOSTResult = 'Error ' + JSON.stringify(err); console.log(err); })
  }
}

