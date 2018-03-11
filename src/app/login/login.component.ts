import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

declare var $:any;

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

  signupform = new FormGroup({
    name: new FormControl(),
    email:new FormControl(),
    contact: new FormControl(),
    company: new FormControl(),
    pwd: new FormControl(),
    pwd2: new FormControl()
  });
  
  displayLogin(){
    if(!this.isloginForm){
      this.isloginForm = true;
    }
  }

  displaySignup(){
    if(this.isloginForm){
      this.isloginForm = false;
    }
  }


  isloginForm = true;

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
          if(results.confirmedAccount){
            this.cookieService.set('User', results.token);
            //console.log(this.cookieService.get('User'));
            this.router.navigate(['/']);
          }else{
            this.showNotification('top', 'right', 'Your Account hasn\'t been verified by Admin yet. Please contact at customercare@equipshare.in or give a call at +91-879797790.')
          }
        }else{
          console.log(results);
        }
      }, (err:any) => {
        //console.log(err);
      })
  }


  signupUser(){
    var data = {
      name : this.signupform.value.name,
      email : this.signupform.value.email,
      contact : this.signupform.value.contact,
      company : this.signupform.value.company,
      password : this.signupform.value.pwd,
      password2 : this.signupform.value.pwd2,
    }

    this.loginservice.signupUser(data)
      .subscribe((results:any) => {
        console.log(results);
        if(results.success){
          this.showNotification('top','right', 'Your account has been created. Please wait atleast 24 hours before your account is verified by a Equipshare Admin. After that you can login and enjoy our services.')
          this.displayLogin();
        }
      })
  }


  showNotification(from, align, message){
    var type = ['','info','success','warning','danger'];

    var color = Math.floor((Math.random() * 4) + 1);

  $.notify({
      icon: "ti-gift",
      message: message
    },{
        type: type[color],
        timer: 400000,
        placement: {
            from: from,
            align: align
        }
    });
  }



}
