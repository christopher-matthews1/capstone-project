import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AllTeamsComponent } from './all-teams/all-teams.component';

const fallbackRoute: Route = {
  path: '**', component: HomeComponent
}

const routes: Routes = [{
  path: '',
  children: [
      {path: '', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'teams', component: AllTeamsComponent},
      fallbackRoute
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
