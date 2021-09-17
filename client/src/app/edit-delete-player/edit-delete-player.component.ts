import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

import { League } from '../models/League';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { LeagueService } from '../services/league.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-edit-delete-player',
  templateUrl: './edit-delete-player.component.html',
  styleUrls: ['./edit-delete-player.component.css']
})
export class EditDeletePlayerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private teamService: TeamService, private leagueService: LeagueService, private _activatedRoute: ActivatedRoute, private router: Router) {
    // Form Builder
    this.playerForm = formBuilder.group({
      'playerId' : null,
      'playerName' : [null, [Validators.required]],
      'playerPhone' : [null, [Validators.required]],
      'playerEmail' : [null, [Validators.required]]
    });
    this.activatedRoute = _activatedRoute.snapshot
   }

   // Properties
   playerObject: Player;
   teamObject: Team;
   leagueObject: League;
   playerForm: FormGroup;
   activatedRoute: ActivatedRouteSnapshot;
   
  ngOnInit(): void {
    // Get path params
    let routeParams = this.activatedRoute.params;
    // Get ALL teams
    this.teamService.getTeams().subscribe((data: any) => {
      // Find team that matches ActivatedRoute team
      this.teamObject = data.find(team => team.teamRoute === routeParams.teamName);
      // If no match is found, navigate to home
      if(this.teamObject === undefined) {
        this.router.navigateByUrl('/')
      } else {
        // Find player that matches ActivateRoute name
        this.playerObject = this.teamObject.players.find((player: Player) => player.playerName.toLowerCase() === this.getPlayer(routeParams.playerName))
      }
      // If no match is found, navigate to home
      if(this.playerObject === undefined) {
        this.router.navigateByUrl('/')
      } else {
        // Find league that matches the league of the team
        this.leagueService.getLeagues().subscribe((data: any) => {
          this.leagueObject = data.find(league => league.leagueName === this.teamObject.leagueName)
        })
        // Prefill-in form
        this.playerForm.patchValue(this.playerObject);
      }
    });
  }

  // When Edit is Clicked
  editPlayer(player): void {
    // If form passes validation
    if(this.playerForm.valid) {
      // Set player ID in form
      this.playerForm.value.playerId = this.playerObject.playerId;
      // Get team ID
      let teamId = this.teamObject.teamId;
      // If user selects OK at the "Confirm" prompt
      if(confirm(`Edit the player: ${this.playerObject.playerName}?`)) {
        alert(`Successfully edited: ${this.playerForm.value.playerName}`)
        // Calls the "Edit Player" endpoint
        this.teamService.editPlayerById(player, teamId).subscribe(data => this.router.navigateByUrl('/teams'));
      }
      // If form does not pass validation
    } else {
      alert("Please complete all fields.")
    }
  }

  // When Delete in Clicked
  deletePlayer() {
    // Gets player and team ID
    let playerId = this.playerObject.playerId;
    let teamId = this.teamObject.teamId;
    // If user selects OK at the "Confirm" prompt
    if(confirm(`Delete the player: ${this.playerObject.playerName}?`)) {
      alert(`Successfully deleted: ${this.playerObject.playerName}`)
      // Calls the "Delete Player" endpoint
      this.teamService.deletePlayerById(teamId, playerId).subscribe(data => this.router.navigateByUrl('/teams'));
    }
  }

  // Takes ActivatedRoute and creates the name
  getPlayer(playerRoute: string): string {
    return playerRoute
    .toLowerCase()
      .split('-')
      .join(' ');
  }

}