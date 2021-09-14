import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { Player } from '../models/Player';
import { LeagueService } from '../services/league.service';
import { RouteService } from '../services/route.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamName;
  allTeams;
  allLeagues;
  activatedRoute: ActivatedRouteSnapshot;
  teamPlayers: Player[];  
  anchorRoute: String;

  constructor(private routeService: RouteService, private _activatedRoute: ActivatedRoute, private teamService: TeamService, private leagueService: LeagueService) { 
    this.activatedRoute = _activatedRoute.snapshot;
  }

  test() {
    console.log(this.activatedRoute.params.teamName);
  }

  ngOnInit(): void {
    this.leagueService.getLeagues().subscribe((response: any) => {
      this.allLeagues = response;
    });
    this.teamService.getTeams().subscribe((response: any) => {
      this.allTeams = response;
    });

    this.anchorRoute = this.routeService.getRoute();
    console.log(this.anchorRoute)
  }

  // Perfect world: Find the team that matches the route, then find the league the matches the teams league.

  // getLeagueData(property) {
  //   let leagueObject = this.allLeagues.find(league => league.leagueName === this.allTeams.leagueName);
  //   console.log(leagueObject[property])
  //   return leagueObject[property];
  // }

  getTeamData(property) {
    let teamObject = this.allTeams.find(team => team.teamRoute === this.activatedRoute.params.teamName);
    console.log(teamObject[property])
    return teamObject[property];
  }


  getPlayersByTeam(teamName): Player[] {
    //Saying property undenfied but still works.....
    return this.allTeams.filter(teams => teamName === teams.teamName);
  }

  getLeagueNameDashed(leagueName): String {
    return leagueName.toLowerCase().split(' ').join('-');
  }

}
