import { Component, OnInit } from '@angular/core';
import { League } from '../models/League';
import { Team } from '../models/Team';
import { LeagueService } from '../services/league.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-all-teams',
  templateUrl: './all-teams.component.html',
  styleUrls: ['./all-teams.component.css']
})
export class AllTeamsComponent implements OnInit {
  allLeagues: League[];
  allTeams: Team[];
  teamNameDashed: String;

  constructor(private leagueService: LeagueService, private teamService: TeamService) {}

  ngOnInit(): void {
    this.leagueService.getLeagues().subscribe((data: any) => {
      this.allLeagues = data;
    });
    this.teamService.getTeams().subscribe((data: any) => {
      this.allTeams = data;
    });
  }

  getTeamNameDashed(teamName): String {
    return teamName.toLowerCase().split(' ').join('-');
  }

  getTeamByLeague(leagueName): Team[] {
    //Saying property undenfied but still works.....
    if (typeof this.allTeams !== 'undefined') {
      return this.allTeams.filter(teams => leagueName === teams.leagueName)
    }
  }
}
