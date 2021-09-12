import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { LocationComponent } from './location/location.component';
import { AboutComponent } from './about/about.component';
import { AllTeamsComponent } from './all-teams/all-teams.component';
import { TeamComponent } from './team/team.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { HomeComponent } from './home/home.component';

const fallbackRoute: Route = {
  path: '**', component: HomeComponent
}

const routes: Routes = [{
  path: '',
  children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'location', component: LocationComponent },
      { path: 'location/location-name', component: LocationDetailsComponent },
      { path: 'teams', component: AllTeamsComponent },
      { path: 'teams/team', component: TeamComponent },
      fallbackRoute
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
