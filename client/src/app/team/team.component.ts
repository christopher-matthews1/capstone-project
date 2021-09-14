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

  teamObject;
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
    // OLD WAY
    // this.leagueService.getLeagues().subscribe((response: any) => {
    //   this.allLeagues = response;
    // });

    // NEW WAY
    this.leagueService.getLeagues();
    this.leagueService.data.subscribe(data => {
      this.allLeagues = data;
    })

    this.teamService.getTeams().subscribe((response: any) => {
      this.allTeams = response;
      this.teamObject = response.find(team => team.teamRoute === this.activatedRoute.params.teamName)
    });
  }

  // Perfect world: Find the team that matches the route, then find the league the matches the teams league.

  // getLeagueData(property) {
  //   let leagueObject = this.allLeagues.find(league => league.leagueName === this.allTeams.leagueName);
  //   console.log(leagueObject[property])
  //   return leagueObject[property];
  // }

  getTeamData(property) {
    console.log(this.teamObject)
    return this.teamObject[property];
  }

  getTeamName() {
    return this.teamObject.teamName;
  }


  getPlayersByTeam(teamName): Player[] {
    //Saying property undenfied but still works.....
    return this.allTeams.filter(teams => teamName === teams.teamName);
  }

  getLeagueNameDashed(leagueName): String {
    return leagueName.toLowerCase().split(' ').join('-');
  }

}
