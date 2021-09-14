import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../services/league.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private leagueService: LeagueService) { }

  ngOnInit(): void {
    this.leagueService.getLeagues();
  }

}
