import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from "@angular/router";
import { League } from "../models/League";
import { Player } from "../models/Player";
import { Team } from "../models/Team";
import { LeagueService } from "../services/league.service";
import { TeamService } from "../services/team.service";

@Component({
  selector: "app-edit-delete-team",
  templateUrl: "./edit-delete-team.component.html",
  styleUrls: ["./edit-delete-team.component.css"],
})
export class EditDeleteTeamComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private leagueService: LeagueService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.teamForm = formBuilder.group({
      teamId: null,
      teamName: [null, [Validators.required]],
      leagueName: null,
      coachName: [null, [Validators.required]],
      coachPhone: [null, [Validators.required]],
      coachEmail: [null, [Validators.required]],
    });
    this.activatedRoute = _activatedRoute.snapshot;
  }

  teamObject: Team;
  leagueObject: League;
  teamForm: FormGroup;

  activatedRoute: ActivatedRouteSnapshot;

  ngOnInit(): void {
    // Filter for teams that match the location and are not full
    let routeParams = this.activatedRoute.params;
    this.teamService.getTeams().subscribe((data: any) => {
      this.teamObject = data.find(
        (team) => team.teamRoute === routeParams.teamName
      );
      // Finds the league that matches the path
      this.leagueService.getLeagues().subscribe((data: any) => {
        this.leagueObject = data.find(
          (league) => league.leagueName === this.teamObject.leagueName
        );
      });
      this.teamForm.patchValue(this.teamObject);
    });
  }

  onSubmit(team: Team): void {
    if (this.teamForm.valid) {
      team.teamId = this.teamObject.teamId;
      team.leagueName = this.leagueObject.leagueName;
      // TODO Route to team after joining
      alert(`Successfully edited: ${this.teamForm.value.teamName}`);
      this.teamService
        .editTeam(team)
        .subscribe((data) => this.router.navigateByUrl("/teams"));
    } else {
      alert("Please complete all fields.");
    }
  }

  deleteTeam() {
    let teamId = this.teamObject.teamId;
    this.teamService
      .deleteTeamById(teamId)
      .subscribe((data) => this.router.navigateByUrl("/teams"));
  }
}
