import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { League } from '../models/League';
import { LeagueService } from '../services/league.service';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  allLeagues: League[];

  router: Router;

  constructor(private _router: Router, private scrollService: ScrollService, private leagueService: LeagueService) {
    this.router = _router;
   }

  ngOnInit(): void {
    // this.leagueService.getLeagues().subscribe((response: any) => {
    //   this.allLeagues = response;
    // });
    this.leagueService.data.subscribe(data => {
      this.allLeagues = data;
      console.log(data);
    })
  }

  scrollToContent() {
    this.scrollService.scrollToContent();
  }

}
