import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { League } from '../models/League';
import { LeagueService } from '../services/league.service';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {
  allLeagues: League[];

  router: Router;

  constructor(private _router: Router, private scrollService: ScrollService, private leagueService: LeagueService) {
    this.router = _router;
   }

  ngOnInit(): void {
    // this.leagueService.getLeagues().subscribe((response: any) => {
    //   this.allLeagues = response;
    // });
    this.leagueService.getLeagues().subscribe((data: any) => {
      this.allLeagues = data;
    });
  }

  // scrollToContent() {
  //   this.scrollService.scrollToContent();
  // }

}
