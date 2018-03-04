import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserprofileService } from '../services/userprofile.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserprofileService]
})
export class UserComponent implements OnInit {

  userDetails:any = Object;
  gmailAuthLink:any = "";
  constructor(private userProfileService: UserprofileService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.getUserDetails();
  }

  updatePasswordForm = new FormGroup({
    oldpass:new FormControl(),
    newpass:new FormControl(),
    newpass2: new FormControl()
  });

  updateUserDetailsForm = new FormGroup({
    name:new FormControl(),
    email:new FormControl(),
    mobile:new FormControl()
  })




  getUserDetails(){
    this.userProfileService.getUserProfile()
      .subscribe((results:any) => {
        console.log(results)
        if(results.success){
          this.userDetails = results.results;
        }else{
          //console.log("error receiving user profile details");
          //console.log(results);
        }
      })
  }

  logout(){
    this.cookieService.delete('User');
    this.router.navigate(['/login']);
  }
  updatePassword(){
    let payload = {
      oldpass: this.updatePasswordForm.value.oldpass,
      newpass: this.updatePasswordForm.value.newpass,
      newpass2: this.updatePasswordForm.value.newpass2,
    }
    //console.log(payload);
    this.userProfileService.updateUserPassword(payload)
      .subscribe((results:any) => {
        if(results.success){
          //console.log("update password successful");
          this.logout();
        }else{
          console.log("update password failed");
          console.log(results);
        }
      }, (err:any) => {
        console.log(err);
      })
  }

  updateUserDetails(){
    var payload = {
      name:this.updateUserDetailsForm.value.name,
      email:this.updateUserDetailsForm.value.email,
      mobile:this.updateUserDetailsForm.value.mobile,
    }
    //console.log(payload);
    this.userProfileService.updateUserProfile(payload)
      .subscribe((results:any) => {
        if(results.success){
          //console.log("update user profile successful");
          this.getUserDetails();
        }else{
          console.log(results);
        }
      }, (err:any) => {
        console.log(err);
      })
  }

  
}
