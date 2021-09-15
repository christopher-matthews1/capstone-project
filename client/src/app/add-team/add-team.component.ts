import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from "@angular/router";
import { League } from "../models/League";
import { Team } from "../models/Team";
import { LeagueService } from "../services/league.service";
import { TeamService } from "../services/team.service";

@Component({
  selector: "app-add-team",
  templateUrl: "./add-team.component.html",
  styleUrls: ["./add-team.component.css"],
})
export class AddTeamComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private leagueService: LeagueService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute = _activatedRoute.snapshot;
    this.teamForm = formBuilder.group({
      teamName: [null, [Validators.required]],
      coachName: [null, [Validators.required]],
      coachPhone: [null, [Validators.required]],
      coachEmail: [null, [Validators.required]],
    });
  }

  activatedRoute: ActivatedRouteSnapshot;
  teamForm: FormGroup;
  leagueObject: League;

  ngOnInit(): void {
    this.leagueService.getLeagues().subscribe((data: any) => {
      this.leagueObject = data.find(
        (league) => league.leagueRoute === this.activatedRoute.params.leagueName
      );
      if (this.leagueObject === undefined) {
        this.router.navigateByUrl("/");
      }
    });
  }

  getTeamRoute(team: Team) {
    // TODO Fix regex spaces issue
    let teamName = team.teamName
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(" ")
      .join("-");
    return teamName;
  }

  onSubmit(team: Team): void {
    if (this.teamForm.valid) {
      team.teamRoute = this.getTeamRoute(team);
      team.leagueName = this.leagueObject.leagueName;
      alert(`Successfully added the team: ${this.teamForm.value.teamName}`);
      this.teamService
        .addTeam(team)
        .subscribe((league) => this.router.navigateByUrl("/teams"));
    } else {
      alert("Please complete all fields.");
    }
  }
}
