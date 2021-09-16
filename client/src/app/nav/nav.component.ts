import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  display: string;

  constructor() {}

  ngOnInit() {
    this.displayNone();
  }

  displayBlock() {
    this.display = 'display-block';
  }

  displayNone() {
    this.display = 'display-none';
  }

  displayToggle() {
    if(this.display === 'display-none') {
      this.display = 'display-block';
    } else {
      this.display = 'display-none';
    }
  }

}
