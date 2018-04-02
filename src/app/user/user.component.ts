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

  userDetails: any = Object;
  gmailAuthLink:  any = '';
  errMsgContent: any = '';
  successMsg: any = '';

  updatePasswordForm = new FormGroup({
    oldpass: new FormControl(),
    newpass: new FormControl(),
    newpass2: new FormControl()
  });

  updateUserDetailsForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    mobile: new FormControl(),
    pan: new FormControl(),
    gstin: new FormControl(),
  });


  constructor(private userProfileService: UserprofileService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.getUserDetails();
  }
  getUserDetails() {
    this.userProfileService.getUserProfile()
      .subscribe((results: any) => {
        console.log(results)
        if (results.success) {
          this.userDetails = results.results;
        } else {
          // console.log("error receiving user profile details");
          // console.log(results);
        }
      });
  }

  logout() {
    this.cookieService.delete('User');
    this.router.navigate(['/login']);
  }
  updatePassword() {
    const payload = {
      oldpass: this.updatePasswordForm.value.oldpass,
      newpass: this.updatePasswordForm.value.newpass,
      newpass2: this.updatePasswordForm.value.newpass2,
    };
    // console.log(payload);
    this.userProfileService.updateUserPassword(payload)
      .subscribe((results: any) => {
        if (results.success) {
          // console.log("update password successful");
          this.successMsg = 'password successfully updated';
          this.logout();
        } else {
          this.errMsgContent = results.msg;
          setTimeout(() => {
            this.errMsgContent = '';
          }, 5000);
        }
      }, (err: any) => {
        console.log(err);
      });
  }

  updateUserDetails() {
    const payload = {
      name: this.updateUserDetailsForm.value.name,
      email: this.updateUserDetailsForm.value.email,
      contact: this.updateUserDetailsForm.value.mobile,
      pan: this.updateUserDetailsForm.value.pan,
      gstin: this.updateUserDetailsForm.value.gstin,
    };
    console.log(payload);
    this.userProfileService.updateUserProfile(payload)
      .subscribe((results: any) => {
        if (results.success) {
          // console.log("update user profile successful");
          this.getUserDetails();
        } else {
          console.log(results);
        }
      }, (err: any) => {
        console.log(err);
      });
  }

  
}
