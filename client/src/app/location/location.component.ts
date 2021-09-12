import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  router: Router;

  constructor(private _router: Router) {
    this.router = _router;
   }

  ngOnInit(): void {
  }

}
