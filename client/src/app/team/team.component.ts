import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { Player } from '../models/Player';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamName;
  route: ActivatedRouteSnapshot;
  teamPlayers: Player[];  
  anchorRoute: String;

  constructor(private routeService: RouteService, private activatedRoute: ActivatedRoute) { 
    this.route = activatedRoute.snapshot;
  }

  test() {
    console.log(this.route.params.teamName);
  }

  ngOnInit(): void {
    this.anchorRoute = this.routeService.getRoute();
    console.log(this.anchorRoute)
  }

}
