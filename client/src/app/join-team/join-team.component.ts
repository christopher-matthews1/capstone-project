import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css']
})
export class JoinTeamComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private teamService: TeamService,  private router: Router) {
    this.playerForm = formBuilder.group({
      'playerName' : [null, [Validators.required]],
      'playerPhone' : [null, [Validators.required]],
      'playerEmail' : [null, [Validators.required]],
      'teamId' : [null, [Validators.required]]
    });
   }

  allTeams: Team[];
  playerForm: FormGroup;

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data: any) => {
      this.allTeams = data;
    });
  }

  onSubmit(player): void {
    let teamId = player.teamId;
    let playerInfo = {
      playerName: player.playerName,
      playerPhone: player.playerPhone,
      playerEmail: player.playerEmail
    }

    // TODO Route to team after joining
    this.teamService.addPlayerById(playerInfo, teamId).subscribe(team => this.router.navigateByUrl('/teams'));
  }

}
