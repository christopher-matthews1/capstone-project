import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private router: Router) { }

  getLocationName(): String {
    //Gets dashed name, removes dash and caps the first letter of each word
    let route = this.router.url
                  .substring(10)
                  .split('-')
                  .map((firstLetter) => firstLetter.charAt(0).toUpperCase() + firstLetter.substring(1))
                  .join(' ');
    console.log(route);
    return route;
  }

}
