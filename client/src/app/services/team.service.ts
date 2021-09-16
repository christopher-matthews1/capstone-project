import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/Player';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamsUrl = 'http://localhost:8082/api/teams';
  teamsByLeagueUrl = 'localhost:8082/api/teams/byleague'

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  addTeam(team: Team) {
    const results: Observable<Team> = this.http.post<Team>(`${this.teamsUrl}`, team, this.jsonContentTypeHeaders);
    return results;
  }

  editTeam(team: Team) {
    const results: Observable<Team> = this.http.put<Team>(`${this.teamsUrl}`, team, this.jsonContentTypeHeaders);
    return results;
  }

  deleteTeamById(teamId: number) {
    const results: Observable<Team> = this.http.delete<Team>(`${this.teamsUrl}/${teamId}`);
    return results;
  }

  addPlayerById(player: Player, teamId: number) {
    const results: Observable<Team> = this.http.post<Team>(`${this.teamsUrl}/${teamId}/players`, player, this.jsonContentTypeHeaders);
    return results;
  }

  editPlayerById(player: Player, teamId: number) {
    const results: Observable<Team> = this.http.put<Team>(`${this.teamsUrl}/${teamId}/players`, player, this.jsonContentTypeHeaders);
    return results;
  }

  deletePlayerById(teamId: number, playerId: number) {
    const results: Observable<Team> = this.http.delete<Team>(`${this.teamsUrl}/${teamId}/players/${playerId}`);
    return results;
  }

  getTeams():Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(this.teamsUrl);
    return results
  }

  getTeamById(teamId: string):Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(`${this.teamsUrl}/${teamId}`);
    return results;
  }

  getTeamByLeague(leagueId: string):Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(`${this.teamsByLeagueUrl}/${leagueId}`);
    return results;
  }

  constructor(private http: HttpClient) { }
  
}