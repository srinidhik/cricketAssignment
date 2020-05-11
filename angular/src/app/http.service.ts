import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Urls } from './urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  public post<Observable>(url: string, body: any): any {
    const self = this;

    return this.http.post(url, body, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRFToken': this.cookieService.get('csrftoken')
        }),
        withCredentials: true
    });
}

public get<T>(url: string, params?: any) {
    return this.http.get<T>(url, {
        params,
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRFToken': this.cookieService.get('csrftoken')
        }),
        withCredentials: true
    });
}

public getTeams(): Observable<any> {
  const url = `${Urls.TEAMS}`;
  return this.get<any>(url);
}

public getPlayers(id:number): Observable<any> {
  const url = `${Urls.PLAYERS}?team_id=${id}`;
  return this.get<any>(url);
}

public getMatches(): Observable<any> {
  const url = `${Urls.MATCHES}`;
  return this.get<any>(url);
}

public getPoints(): Observable<any> {
  const url = `${Urls.POINTS}`;
  return this.get<any>(url);
}

public postTeams(data): Observable<any> {
  const url = `${Urls.TEAMS}`;
  return this.post<any>(url, data);
}

public postPlayers(data): Observable<any> {
  const url = `${Urls.PLAYERS}`;
  return this.post<any>(url, data);
}

public postWinner(data): Observable<any> {
  const url = `${Urls.MATCHES}`;
  return this.post<any>(url, data);
}

}
