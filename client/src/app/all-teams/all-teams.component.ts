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

  constructor(private leagueService: LeagueService, private teamService: TeamService, private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.leagueService.getLeagues().subscribe((response: any) => {
      this.allLeagues = response;
    });
    this.teamService.getTeams().subscribe((response: any) => {
      this.allTeams = response;
    });
  }

  scrollToContent() {
    this.scrollService.scrollToContent();
}

  getTeamNameDashed(teamName): String {
    return teamName.toLowerCase().split(' ').join('-');
  }

  getTeamByLeague(leagueName): Team[] {
    //Saying property undenfied but still works.....
    return this.allTeams.filter(teams => leagueName === teams.leagueName)
  }
}
