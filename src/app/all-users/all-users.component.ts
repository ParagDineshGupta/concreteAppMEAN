import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../services/userprofile.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  providers: [UserprofileService]
})
export class AllUsersComponent implements OnInit {

  allUserProfiles: any = [];
  constructor(private alluserprofile: UserprofileService) { }

  ngOnInit() {
    this.getAllUserProfiles();
  }

  getAllUserProfiles() {
    this.alluserprofile.getAllUserProfiles()
      .subscribe((results: any) => {
        if (results.success) {
          //console.log(results.data);
          this.allUserProfiles = results.data;
          //console.log(this.allUserProfiles);
        }
      }, (err: any) => { })
  }
}
