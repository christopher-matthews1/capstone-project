import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamsUrl = 'http://localhost:8082/api/teams';
  teamsByLeague = 'localhost:8082/api/teams/byleague'

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  errorMessage: string;

  getTeams():Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(this.teamsUrl);
    console.log(`getTeams() returned ${results}`);
    return results
  }

  getTeamById(teamId: string):Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(`${this.teamsUrl}/${teamId}`);
    console.log(`getTeamsById(${teamId}) returned ${results}`);
    return results;
  }

  getTeamByLeague(leagueId: string):Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(`${this.teamsByLeague}/${leagueId}`);
    console.log(`getTeamsById(${leagueId}) returned ${results}`);
    return results;
  }

  constructor(private http: HttpClient) { }
  
}