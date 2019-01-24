import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-resourcetest',
  templateUrl: './resourcetest.component.html',
  styleUrls: ['./resourcetest.component.css']
})
export class ResourcetestComponent implements OnInit {

  unrestrictedResourceResultSuccess : boolean;
  restrictedResourceGETResultSuccess : boolean;
  restrictedResourcePOSTResultSuccess : boolean;

  //logged = false; // TODO: Change to session storage.
  unrestrictedResourceResult : string;
  restrictedResourceGETResult : string;
  restrictedResourcePOSTResult : string;

  constructor(private http : HttpClient, public loginService : LoginService) {
  }


  ngOnInit() {    
  }  

  // login(username : string, password : string) {
  //   console.log(username);
  //   console.log(password);
  // }

  // logout() {
  //   console.log('logout');
  // }

  testUnrestrictedResourceResult() {
    const url = 'http://localhost:8080/api/firstbean';
    let httpOptions = { headers : new HttpHeaders({ 'content-type': 'application/json', observe: 'response' }) };
    this.http.get<any>(url, httpOptions)
      .subscribe( response => { 
        this.unrestrictedResourceResult = JSON.stringify(response);
        this.unrestrictedResourceResultSuccess = true },
      err => { 
        this.unrestrictedResourceResult = 'Error ' + JSON.stringify(err); 
        console.log(err);
        this.unrestrictedResourceResultSuccess = false })
    console.log('test1')
  }

  testRestrictedResourceGETResult() {
    const url = 'http://localhost:8080/api/goldenbean';

    // Authentication header:
    let authHeader = 'Basic ' + window.btoa(this.loginService.username + ':' + this.loginService.password);
    let options = { headers : new HttpHeaders( { Authorization: authHeader, observe: 'response' }) }

    console.log( url );
    this.http.get<any>(url, options)
      .subscribe( response => {
        this.restrictedResourceGETResult = JSON.stringify(response)
        this.restrictedResourceGETResultSuccess = true;
      },
      err => { 
        this.restrictedResourceGETResult = 'Error ' + JSON.stringify(err); console.log(err);
        this.restrictedResourceGETResultSuccess = false;
      })
  }

  testRestrictedResourcePOSTResult() {
    const url = "http://localhost:8080/api/postbean";

    let authHeader = 'Basic ' + window.btoa(this.loginService.username + ':' + this.loginService.password);
    let options = { headers : new HttpHeaders ( { Authorization: authHeader, observe: 'response', abc : "posted-from-angular" })}
    //this.http.post<any>(url, { abc : "posted-from-angular", observe: 'response' })
    // this.http.post<any>(url, "", options)
    //   .subscribe( x => this.restrictedResourcePOSTResult = JSON.stringify(x),
    //   err => { this.restrictedResourcePOSTResult = 'Error ' + JSON.stringify(err); console.log(err); })

    this.http.post<any>(url, "", options)
      .subscribe( response => {
        this.restrictedResourcePOSTResult = JSON.stringify(response)
        this.restrictedResourcePOSTResultSuccess = true;
      },
      err => { 
        this.restrictedResourcePOSTResult = 'Error: ' + JSON.stringify(err); 
        this.restrictedResourcePOSTResultSuccess = false;
      })

  }  

}
