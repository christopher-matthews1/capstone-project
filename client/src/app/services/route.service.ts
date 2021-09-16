import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router: Router) { }

  getRoute(): String {
    //Gets route without leading forward-slash for id/anchor purposes
    return this.router.url.substring(1);
  }
  
}