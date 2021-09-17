import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Player } from '../models/Player';
import { Team } from '../models/Team';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamsUrl = 'http://localhost:8082/api/teams';
  teamsByLeagueUrl = 'localhost:8082/api/teams/byleague'

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  // Add a team to a league

  addTeam(team: Team) {
    const results: Observable<Team> = this.http.post<Team>(`${this.teamsUrl}`, team, this.jsonContentTypeHeaders);
    return results;
  }

  // Edit a team

  editTeam(team: Team) {
    const results: Observable<Team> = this.http.put<Team>(`${this.teamsUrl}`, team, this.jsonContentTypeHeaders);
    return results;
  }

  // Delete a team

  deleteTeamById(teamId: number) {
    const results: Observable<Team> = this.http.delete<Team>(`${this.teamsUrl}/${teamId}`);
    return results;
  }

  // Add a player to a team

  addPlayerById(player: Player, teamId: number) {
    const results: Observable<Team> = this.http.post<Team>(`${this.teamsUrl}/${teamId}/players`, player, this.jsonContentTypeHeaders);
    return results;
  }

  // Edit a player

  editPlayerById(player: Player, teamId: number) {
    const results: Observable<Team> = this.http.put<Team>(`${this.teamsUrl}/${teamId}/players`, player, this.jsonContentTypeHeaders);
    return results;
  }

  // Delete a player

  deletePlayerById(teamId: number, playerId: number) {
    const results: Observable<Team> = this.http.delete<Team>(`${this.teamsUrl}/${teamId}/players/${playerId}`);
    return results;
  }

  // Get all teams

  getTeams():Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(this.teamsUrl);
    return results
  }

  // Get a team by team ID

  getTeamById(teamId: string):Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(`${this.teamsUrl}/${teamId}`);
    return results;
  }

  // Get all teams in a league by  league ID

  getTeamByLeague(leagueId: string):Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(`${this.teamsByLeagueUrl}/${leagueId}`);
    return results;
  }

  constructor(private http: HttpClient) { }
  
}