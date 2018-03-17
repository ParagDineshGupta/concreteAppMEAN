import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  
  private logInUrl = 'http://concrete.equipshare.in/api/users/login';
  private signupUrl = 'http://concrete.equipshare.in/api/users/signup';
  private cityUrl = 'http://concrete.equipshare.in/api/getcities';                 

  // private logInUrl = 'http://localhost:3000/api/users/login';
  // private signupUrl = 'http://localhost:3000/api/users/signup'
  
  constructor(private http: HttpClient) { }

  logInUser(data:any){
    //console.log(data);
    return this.http.post(this.logInUrl, data);
  } 

  signupUser(data:any){
    console.log(data)
    return this.http.post(this.signupUrl, data);
  }

  getAllCities() {
    return this.http.get(this.cityUrl);
  }

}
