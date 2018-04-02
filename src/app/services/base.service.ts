import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class BaseService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  get(url) {
    const token = this.cookieService.get('User');
    const headers = {
      headers : new HttpHeaders().set('authorization',  token)
    };
    url = 'http://concrete.equipshare.in/api/users/' + url;
    //url = 'http://localhost:8080/api/users/' + url;
    return this.http.get(url, headers);
  }

  post(url, data) {
    const token = this.cookieService.get('User');
    const headers = {
      headers : new HttpHeaders().set('Authorization',  token)
    };
    url = "http://concrete.equipshare.in/api/users/" + url;
    // url = 'http://localhost:8080/api/users/' + url;
    return this.http.post(url, data, headers);
  }

}
