import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { League } from '../models/League';
import { Team } from '../models/Team';
import { LeagueService } from '../services/league.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private teamService: TeamService, private leagueService: LeagueService, private router: Router) {
    this.teamForm = formBuilder.group({
      'teamName' : [null, [Validators.required]],
      // 'teamRoute' : null,
      'leagueName' : [null, [Validators.required]],
      'captainName' : [null, [Validators.required]],
      'captainPhone' : [null, [Validators.required]],
      'captainEmail' : [null, [Validators.required]]
    });
   }

  teamForm: FormGroup;
  // selectedLeague: League;

  // I just! DOn?t 19K`']=$  
  

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  getTeamRoute(team: Team) {
    // TODO Fix regex spaces issue
    let teamName = team.teamName.toLowerCase().replace(/[^a-z0-9 ]/g,"").split(' ').join('-');
    return teamName;
  }

  onSubmit(team: Team): void {
    team.teamRoute = this.getTeamRoute(team);
    this.teamService.addTeam(team).subscribe(league => this.router.navigateByUrl('/teams'));
  }

}
