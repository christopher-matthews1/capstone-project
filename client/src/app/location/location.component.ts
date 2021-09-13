import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  router: Router;

  constructor(private _router: Router, private scrollService: ScrollService) {
    this.router = _router;
   }

  ngOnInit(): void {
  }

  scrollToContent() {
    this.scrollService.scrollToContent();
}

}
