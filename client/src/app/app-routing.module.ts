import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { LeaguesComponent } from './leagues/leagues.component';
import { AboutComponent } from './about/about.component';
import { AllTeamsComponent } from './all-teams/all-teams.component';
import { TeamComponent } from './team/team.component';
import { LeagueDetailsComponent } from './league-details/league-details.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { EditDeletePlayerComponent } from './edit-delete-player/edit-delete-player.component';
import { EditDeleteTeamComponent } from './edit-delete-team/edit-delete-team.component';

const fallbackRoute: Route = {
  path: '**', component: HomeComponent,
  redirectTo: '', 
  pathMatch: 'full'
}

const routes: Routes = [{
  path: '',
  children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'leagues', component: LeaguesComponent },
      { path: 'leagues/:leagueName', component: LeagueDetailsComponent },
      { path: 'leagues/:leagueName/add-team', component: AddTeamComponent },
      { path: 'leagues/:leagueName/join-team', component: JoinTeamComponent },
      { path: 'teams', component: AllTeamsComponent },
      { path: 'teams/:teamName', component: TeamComponent },
      { path: 'teams/:teamName/edit-delete-team', component: EditDeleteTeamComponent },
      { path: 'teams/:teamName/:playerName', component: EditDeletePlayerComponent },
      { path: 'sign-up', component: SignUpComponent },
      fallbackRoute
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
