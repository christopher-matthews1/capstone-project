import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
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

  locationRoute: String;
  locationDescription: String;
  allLeagues: League[];
  router: Router;
  activatedRoute: ActivatedRouteSnapshot;

  constructor(private _router: Router, private routeService: RouteService, private leagueService: LeagueService, private _activatedRoute: ActivatedRoute) { 
    this.router = _router;
    this.activatedRoute = _activatedRoute.snapshot;
  }

  ngOnInit(): void {
    this.leagueService.getLeagues().subscribe((response: any) => {
      this.allLeagues = response;
    });
    this.locationRoute = this.routeService.getRoute();
  }

  test() {
    console.log(this.locationRoute);
  }

  getLeagueData(property) {
    let leagueObject = this.allLeagues.find(league => league.leagueRoute === this.activatedRoute.params.leagueName);
    console.log(leagueObject[property])
    return leagueObject[property];
  }

}
