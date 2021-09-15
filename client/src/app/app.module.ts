import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { LocationComponent } from './location/location.component';
import { AboutComponent } from './about/about.component';
import { TeamsByLeagueComponent } from './teams-by-league/teams-by-league.component';
import { AllTeamsComponent } from './all-teams/all-teams.component';
import { TeamDetailsShortComponent } from './team-details-short/team-details-short.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { AddTeamComponent } from './add-team/add-team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinTeamComponent } from './join-team/join-team.component';

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
    TeamDetailsShortComponent,
    TeamComponent,
    PlayerComponent,
    LocationComponent,
    LocationDetailsComponent,
    SignUpComponent,
    AddTeamComponent,
    JoinTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
