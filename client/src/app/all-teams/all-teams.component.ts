import { Component, OnInit } from '@angular/core';
import { League } from '../models/League';
import { Team } from '../models/Team';
import { LeagueService } from '../services/league.service';
import { ScrollService } from '../services/scroll.service';
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

    // OLD WAY
    this.leagueService.getLeagues().subscribe((data: any) => {
      this.allLeagues = data;
    });

    // NEW WAY
    // this.leagueService.getLeagues();
    // this.leagueService.data.subscribe(data => {
    //   this.allLeagues = data;
    // })

    // OLD WAY
    this.teamService.getTeams().subscribe((data: any) => {
      this.allTeams = data;
    });

    // NEW WAY
    // this.teamService.getTeams();
    // this.teamService.data.subscribe(data => {
    //   this.allTeams = data;
    // });
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
