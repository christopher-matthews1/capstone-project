import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private router: Router) { }

  getRoute(): String {
    return this.router.url;
  }

  scrollToContent() {
    setTimeout(() => {
      let route: string = this.getRoute().substring(1);
      console.log(route)
        document.getElementById(route).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
    }, 500);
  }
}
