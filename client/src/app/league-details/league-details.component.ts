import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

import { League } from '../models/League';
import { LeagueService } from '../services/league.service';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css']
})
export class LeagueDetailsComponent implements OnInit {

  leagueObject: League;
  router: Router;
  activatedRoute: ActivatedRouteSnapshot;

  constructor(private _router: Router, private leagueService: LeagueService, private _activatedRoute: ActivatedRoute) { 
    this.router = _router;
    this.activatedRoute = _activatedRoute.snapshot;
  }

  ngOnInit(): void {
    // this.leagueService.getLeagues();
    this.leagueService.getLeagues().subscribe((data: any) => {
      this.leagueObject = data.find(league => league.leagueRoute === this.activatedRoute.params.leagueName)
      if(this.leagueObject === undefined) {
        this.router.navigateByUrl('/')
      }
    })
  }

}
