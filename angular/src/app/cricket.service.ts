import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CookieService } from 'ngx-cookie-service';
import { Urls } from './urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CricketService {

  constructor(
    private http: HttpService,
    private cookieService: CookieService,
  ) { }



  

}
