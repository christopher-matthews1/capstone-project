import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../models/League';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  leagueUrl = 'http://localhost:8082/api/leagues';

  getLeagues():Observable<League> {
    const results: Observable<League> = this.http.get<League>(this.leagueUrl);
    return results
  }

  constructor(private http: HttpClient) { }
  
}
