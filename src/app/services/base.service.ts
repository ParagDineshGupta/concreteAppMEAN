import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class BaseService {
  

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  get(url){
    let token = this.cookieService.get('User');
    let headers = {
      headers : new HttpHeaders().set('Authorization',  token)
    }
    //url = 'https://leads.engineerbabu.com/api/' + url;
    url = 'http://localhost:3000/api/' + url;
    return this.http.get(url, headers);
  }

  post(url, data){
    let token = this.cookieService.get('User');
    let headers = {
      headers : new HttpHeaders().set('Authorization',  token)
    }
    //url = 'https://leads.engineerbabu.com/api/' + url;
    url = "http://localhost:3000/api/" + url;
    return this.http.post(url, data, headers);
  }

}
