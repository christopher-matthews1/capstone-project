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
    this.playerForm = formBuilder.group({
      'playerId' : null,
      'playerName' : [null, [Validators.required]],
      'playerPhone' : [null, [Validators.required]],
      'playerEmail' : [null, [Validators.required]]
    });
    this.activatedRoute = _activatedRoute.snapshot
   }

   playerObject: Player;
   teamObject: Team;
   leagueObject: League;
   playerForm: FormGroup;

   activatedRoute: ActivatedRouteSnapshot;
   
  ngOnInit(): void {
    // Filter for teams that match the location and are not full
    let routeParams = this.activatedRoute.params;
    this.teamService.getTeams().subscribe((data: any) => {
      this.teamObject = data.find(team => team.teamRoute === routeParams.teamName);
      if(this.teamObject === undefined) {
        this.router.navigateByUrl('/')
      } else {
        this.playerObject = this.teamObject.players.find((player: Player) => player.playerName.toLowerCase() === this.getPlayer(routeParams.playerName))
      }
      if(this.playerObject === undefined) {
        this.router.navigateByUrl('/')
      } else {
        // Finds the league that matches the path
        this.leagueService.getLeagues().subscribe((data: any) => {
          this.leagueObject = data.find(league => league.leagueName === this.teamObject.leagueName)
        })
        this.playerForm.patchValue(this.playerObject);
      }
    });
  }

  onSubmit(player): void {
    if(this.playerForm.valid) {
      this.playerForm.value.playerId = this.playerObject.playerId;
      let teamId = this.teamObject.teamId;
      // TODO Route to team after joining
      if(confirm(`Edit the player ${this.playerObject.playerName}?`)) {
        alert(`Successfully edited: ${this.playerForm.value.playerName}`)
        this.teamService.editPlayerById(player, teamId).subscribe(data => this.router.navigateByUrl('/teams'));
      }
    } else {
      alert("Please complete all fields.")
    }
  }

  deletePlayer() {
    let playerId = this.playerObject.playerId;
    let teamId = this.teamObject.teamId;
    if(confirm(`Delete the player ${this.playerObject.playerName}?`)) {
      alert(`Successfully deleted: ${this.playerObject.playerName}`)
      this.teamService.deletePlayerById(teamId, playerId).subscribe(data => this.router.navigateByUrl('/teams'));
    }
  }

  getPlayer(playerRoute: string): string {
    return playerRoute
    .toLowerCase()
      .split('-')
      .join(' ');
  }

}