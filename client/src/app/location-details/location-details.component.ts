import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { League } from '../models/League';
import { LeagueService } from '../services/league.service';
import { LocationService } from '../services/location.service';
import { RouteService } from '../services/route.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  selectedLeague: League;
  locationRoute: String;
  locationDescription: String;
  allLeagues: League[];
  router: Router;
  activatedRoute: ActivatedRouteSnapshot;

  constructor(private _router: Router, private routeService: RouteService, private leagueService: LeagueService, private _activatedRoute: ActivatedRoute, private teamService: TeamService) { 
    this.router = _router;
    this.activatedRoute = _activatedRoute.snapshot;
  }

  ngOnInit(): void {
    this.leagueService.getLeagues();
    this.leagueService.data.subscribe(data => {
      this.allLeagues = data;
    })
  }

  getLeague() {
    return this.selectedLeague = this.allLeagues.find(league => league.leagueRoute === this.activatedRoute.params.leagueName);
  }

  getLeagueData(property) {
    let leagueObject = this.allLeagues.find(league => league.leagueRoute === this.activatedRoute.params.leagueName);
    console.log(leagueObject[property])
    return leagueObject[property];
  }

  addTeam(league: League) {
    this.teamService.sendSelectedTeam(league);
  }

}
