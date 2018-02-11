import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, CookieService]
})

export class LoginComponent implements OnInit {

  loginform = new FormGroup({
    email:new FormControl(),
    pwd: new FormControl()
  });


  constructor(private cookieService: CookieService, private loginservice:LoginService, private router: Router) { }

  ngOnInit() {
  }

  logInUser(){
    let data = {
      username: this.loginform.value.email,
      password: this.loginform.value.pwd
    }
    //console.log(data);
    this.loginservice.logInUser(data)
      .subscribe((results:any) => {
        //console.log(results);
        if(results.success){
          //console.log("login successful");
          //console.log(results);
          this.cookieService.set('User', results.token);
          //console.log(this.cookieService.get('User'));
          this.router.navigate(['/']);
        }else{
          console.log(results);
        }
      }, (err:any) => {
        //console.log(err);
      })
  }
}
