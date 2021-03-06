import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

import { League } from '../models/League';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { LeagueService } from '../services/league.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamObject: Team;
  leagueObject: League;

  activatedRoute: ActivatedRouteSnapshot;
  router: Router;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private teamService: TeamService, private leagueService: LeagueService) { 
    this.activatedRoute = _activatedRoute.snapshot;
    this.router = _router;
  }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((response: any) => {
      this.teamObject = response.find(team => team.teamRoute === this.activatedRoute.params.teamName)
      if(this.teamObject === undefined) {
        this.router.navigateByUrl('/')
      } else {
        this.teamObject.players.forEach((player: Player) => {
          player.playerRoute = this.getPlayerRoute(player)
        })
        this.leagueService.getLeagues().subscribe((response: any) => {
          this.leagueObject = response.find(league => league.leagueName === this.teamObject.leagueName);
        });
      }
    });
  }

  getPlayerRoute(player: Player): string {
    return player.playerName.toLowerCase().split(' ').join('-');
  }
}
