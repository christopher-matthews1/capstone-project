import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../models/League';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  LeagueUrl = 'http://localhost:8082/api/leagues';

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  errorMessage: string;

  getLeagues():Observable<League> {
    const results: Observable<League> = this.http.get<League>(this.LeagueUrl);
    console.log(`getLeagues() returned ${results}`);
    return results
  }

  getLeagueById(LeagueId: string):Observable<League> {
    const results: Observable<League> = this.http.get<League>(`${this.LeagueUrl}/${LeagueId}`);
    console.log(`getLeaguesById(${LeagueId}) returned ${results}`);
    return results;
  }

  constructor(private http: HttpClient) { }
  
}
