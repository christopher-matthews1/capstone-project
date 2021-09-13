import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  TeamUrl = 'http://localhost:8082/api/teams';

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  errorMessage: string;

  getTeams():Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(this.TeamUrl);
    console.log(`getTeams() returned ${results}`);
    return results
  }

  getTeamById(TeamId: string):Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(`${this.TeamUrl}/${TeamId}`);
    console.log(`getTeamsById(${TeamId}) returned ${results}`);
    return results;
  }

  constructor(private http: HttpClient) { }
  
}