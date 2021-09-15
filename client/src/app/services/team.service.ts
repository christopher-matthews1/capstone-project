import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../models/Player';
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

  //--------------TESTING-----------------

  // data = new BehaviorSubject<Team[]>({} as any);
  // currentData = this.data.asObservable();

  // sendSelectedTeam(data): void {
  //   this.data.next(data);
  // }

  addTeam(team: Team) {
    const results: Observable<Team> = this.http.post<Team>(`${this.teamsUrl}`, team, this.jsonContentTypeHeaders);
    return results;
  }

  addPlayerById(player: Player, teamId: number) {
    const results: Observable<Team> = this.http.post<Team>(`${this.teamsUrl}/${teamId}/players`, player, this.jsonContentTypeHeaders);
    return results;
  }

  // getTeams() {
  //   this.http.get<Team[]>(this.teamsUrl).subscribe(results => {
  //     this.data.next(results);
  //   })
  // }

  //--------------TESTING-----------------

  getTeams():Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(this.teamsUrl);
    return results
  }

  getTeamById(teamId: string):Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(`${this.teamsUrl}/${teamId}`);
    return results;
  }

  getTeamByLeague(leagueId: string):Observable<Team> {
    const results: Observable<Team> = this.http.get<Team>(`${this.teamsByLeague}/${leagueId}`);
    return results;
  }

  constructor(private http: HttpClient) { }
  
}