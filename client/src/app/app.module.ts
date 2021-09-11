import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TeamsByLeagueComponent } from './teams-by-league/teams-by-league.component';
import { AllTeamsComponent } from './all-teams/all-teams.component';
import { AllTeamsTeamComponent } from './all-teams-team/all-teams-team.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    TeamsByLeagueComponent,
    AllTeamsComponent,
    AllTeamsTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
