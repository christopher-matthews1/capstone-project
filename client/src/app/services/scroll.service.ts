import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from './route.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private router: Router, private routeService: RouteService) { }

  scrollToContent() {
    setTimeout(() => {
      // Ask about this next line. Seems questionable.
      let route: string = this.routeService.getRoute() as string;
      //remove this console log at some point.
      console.log(route)
        document.getElementById(route).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
    }, 500);
  }
}
