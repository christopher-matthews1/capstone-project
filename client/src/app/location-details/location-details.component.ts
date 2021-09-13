import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { League } from '../models/League';
import { LeagueService } from '../services/league.service';
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
  locationDescription: String;
  allLeagues: League[];
  errorMessage;
  router: Router;

  constructor(private _router: Router, private locationService: LocationService, private routeService: RouteService, private leagueService: LeagueService) { 
    this.router = _router;
  }

  // getLeagueDescription(): String {
  //   return this.locationDescription = this.allLeagues.find(location => {
  //     console.log(location.leagueName);
  //     console.log(this.locationName);
  //     location.leagueName == this.locationName;
  //   }).description;
  // }

  ngOnInit(): void {
    this.locationRoute = this.routeService.getRoute();
    this.locationName = this.locationService.getLocationName();
    this.leagueService.getLeagues().subscribe((response: any) => {
      this.allLeagues = response;
      console.log(this.allLeagues);
    });
    console.log(this.allLeagues);
  }

}
