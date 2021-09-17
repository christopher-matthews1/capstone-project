import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { League } from '../models/League';
import { LeagueService } from '../services/league.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {
  allLeagues: League[];

  router: Router;

  constructor(private _router: Router, private leagueService: LeagueService) {
    this.router = _router;
   }

  ngOnInit(): void {
    this.leagueService.getLeagues().subscribe((data: any) => {
      this.allLeagues = data;
    });
  }

}
