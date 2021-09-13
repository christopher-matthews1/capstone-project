import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  locationName: String;
  locationRoute: String;
  test = 7;
  router: Router;

  constructor(private _router: Router, private locationService: LocationService, private routeService: RouteService) { 
    this.router = _router;
  }

  ngOnInit(): void {
    this.locationRoute = this.routeService.getRoute();
    this.locationName = this.locationService.getLocationName();
    
  }

}
