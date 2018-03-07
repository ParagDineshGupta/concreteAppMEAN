import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  
  private logInUrl = 'http://concrete.equipshare.in/api/users/login';
  //private logInUrl = 'https://leads.engineerbabu.com/api/index/login';
  private signupUrl = 'http://concrete.equipshare.in/api/users/signup'
  
  constructor(private http: HttpClient) { }

  logInUser(data:any){
    //console.log(data);
    return this.http.post(this.logInUrl, data);
  } 

  signupUser(data:any){
    console.log(data)
    return this.http.post(this.signupUrl, data)
  }

}
