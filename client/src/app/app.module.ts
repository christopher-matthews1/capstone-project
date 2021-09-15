import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { LocationComponent } from './location/location.component';
import { AboutComponent } from './about/about.component';
import { AllTeamsComponent } from './all-teams/all-teams.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { EditDeletePlayerComponent } from './edit-delete-player/edit-delete-player.component';
import { EditDeleteTeamComponent } from './edit-delete-team/edit-delete-team.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    AllTeamsComponent,
    TeamComponent,
    PlayerComponent,
    LocationComponent,
    LocationDetailsComponent,
    SignUpComponent,
    AddTeamComponent,
    JoinTeamComponent,
    EditDeletePlayerComponent,
    EditDeleteTeamComponent
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
