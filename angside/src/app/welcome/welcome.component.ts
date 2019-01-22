import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  user : string;

  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.paramMap.get('name')
  }

}
