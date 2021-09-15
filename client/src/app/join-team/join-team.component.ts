import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { League } from '../models/League';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { LeagueService } from '../services/league.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css']
})
export class JoinTeamComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private teamService: TeamService, private leagueService: LeagueService, private _activatedRoute: ActivatedRoute, private router: Router) {
    this.playerForm = formBuilder.group({
      'playerName' : [null, [Validators.required]],
      'playerPhone' : [null, [Validators.required]],
      'playerEmail' : [null, [Validators.required]],
      'teamId' : [null, [Validators.required]]
    });
    this.activatedRoute = _activatedRoute.snapshot
   }

  activatedRoute: ActivatedRouteSnapshot;
  leagueTeams: Team[];
  playerForm: FormGroup;
  leagueObject: League;

  ngOnInit(): void {
    // Finds the league that matches the path
    this.leagueService.getLeagues().subscribe((data: any) => {
      this.leagueObject = data.find(league => league.leagueRoute === this.activatedRoute.params.leagueName)
      if(this.leagueObject === undefined) {
        this.router.navigateByUrl('/')
      }
    })
    // Filter for teams that match the location and are not full
    this.teamService.getTeams().subscribe((data: any) => {
      this.leagueTeams = data.filter(teams => teams.leagueName === this.getLocationName() && teams.players.length != 10);
    });
  }

  getLocationName(): String {
    //Gets dashed name, removes dash and caps the first letter of each word
    let teams = this.activatedRoute.params.leagueName
                  .split('-')
                  .map((firstLetter) => firstLetter.charAt(0).toUpperCase() + firstLetter.substring(1))
                  .join(' ');
    return teams;
  }

  onSubmit(player): void {
    if(this.playerForm.valid) {
      let teamId = player.teamId;
      // TODO Route to team after joining
      this.teamService.addPlayerById(player, teamId).subscribe(team => this.router.navigateByUrl('/teams'));
    } else {
      alert("Please complete all fields.")
    }
  } 

}
