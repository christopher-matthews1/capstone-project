import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  locationName: String;
  locationRoute: String;
  router: Router;

  constructor(private _router: Router) { 
    this.router = _router;
  }

  getRoute(): String {
    //Gets route without leading forward-slash
    return this.router.url.substring(1);
  }

  getLocationName(): String {
    //Gets dashed name, removes dash and caps the first letter of each word
    return this.locationRoute
                  .substring(9)
                  .split('-')
                  .map((firstLetter) => firstLetter.charAt(0).toUpperCase() + firstLetter.substring(1))
                  .join(' ');
  }

  ngOnInit(): void {
    this.locationRoute = this.getRoute();
    this.locationName = this.getLocationName();
    
  }

}
