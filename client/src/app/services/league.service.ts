import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { League } from '../models/League';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  leagueUrl = 'http://localhost:8082/api/leagues';

  // Get all the leagues

  getLeagues():Observable<League> {
    const results: Observable<League> = this.http.get<League>(this.leagueUrl);
    return results
  }

  constructor(private http: HttpClient) { }
  
}
