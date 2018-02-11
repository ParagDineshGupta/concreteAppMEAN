import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  
  private logInUrl = 'http://localhost:3000/index/login';
  //private logInUrl = 'https://leads.engineerbabu.com/index/login';
  
  constructor(private http: HttpClient) { }

  logInUser(data:any){
    //console.log(data);
    return this.http.post(this.logInUrl, data)
  } 
}