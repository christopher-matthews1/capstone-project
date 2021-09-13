import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private scrollService: ScrollService, private router: Router) {}

  ngOnInit() {
  }

  // getRoute(): String {
  //   return this.router.url;
  // }

  scrollToContent() {
      this.scrollService.scrollToContent();
  }

}
