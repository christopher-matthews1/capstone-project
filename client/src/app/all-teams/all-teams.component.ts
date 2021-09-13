import { Component, OnInit } from '@angular/core';
import { League } from '../models/League';
import { Team } from '../models/Team';
import { LeagueService } from '../services/league.service';

@Component({
  selector: 'app-all-teams',
  templateUrl: './all-teams.component.html',
  styleUrls: ['./all-teams.component.css']
})
export class AllTeamsComponent implements OnInit {
  allLeagues: League[];

  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.leagueService.getLeagues().subscribe((response: any) => {
      this.allLeagues = response;
      console.log(this.allLeagues);
    });
  }

}
