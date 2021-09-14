import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { LocationComponent } from './location/location.component';
import { AboutComponent } from './about/about.component';
import { AllTeamsComponent } from './all-teams/all-teams.component';
import { TeamComponent } from './team/team.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddTeamComponent } from './add-team/add-team.component';

const fallbackRoute: Route = {
  path: '**', component: HomeComponent
}

const routes: Routes = [{
  path: '',
  children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'location', component: LocationComponent },
      { path: 'location/:leagueName', component: LocationDetailsComponent },
      { path: 'location/:leagueName/add-team', component: AddTeamComponent },
      // may need to move specific route higher than general route
      { path: 'teams', component: AllTeamsComponent },
      { path: 'teams/:teamName', component: TeamComponent },
      // { path: 'teams/:team', component: TeamComponent },
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
