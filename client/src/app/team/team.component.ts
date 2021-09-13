import { Component, OnInit } from '@angular/core';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamRoute: String;

  constructor(private routeService: RouteService) { }

  ngOnInit(): void {
    this.teamRoute = this.routeService.getRoute();
  }

}
