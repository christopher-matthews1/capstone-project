import { Component, OnInit } from '@angular/core';
import { League } from '../models/League';
import { Team } from '../models/Team';
import { LeagueService } from '../services/league.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-teams-by-league',
  templateUrl: './teams-by-league.component.html',
  styleUrls: ['./teams-by-league.component.css']
})
export class TeamsByLeagueComponent {
  allLeagues: League[];
  allTeams: Team[];

  constructor(private leagueService: LeagueService, private teamService: TeamService) { }

  // ngOnInit(): void {
  //   this.leagueService.getLeagues().subscribe((response: any) => {
  //     this.allLeagues = response;
  //     console.log(this.allLeagues);
  //   });
  //   for(let league of this.allLeagues) {
  //     this.teamService.getTeamById(league.leagueId).subscribe((response: any) => {
  //       this.allLeagues = response;
  //       console.log(this.allLeagues);
  //     });
  //   }
  // }

}
