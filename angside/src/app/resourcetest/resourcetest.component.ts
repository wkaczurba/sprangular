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

  getAuthHeader() : string {
    return 'Basic ' + window.btoa(this.loginService.auth.username + ':' + this.loginService.auth.password);
  }

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
    let options = { headers : new HttpHeaders( { Authorization: this.getAuthHeader(), observe: 'response' }) }

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

    let options = { headers : new HttpHeaders ( { Authorization: this.getAuthHeader(), observe: 'response', abc : "posted-from-angular" })}

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
