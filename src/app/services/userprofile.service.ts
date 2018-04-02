import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';

@Injectable()
export class UserprofileService {

  private allUserProfileUrl = 'users/';
  private userProfileUrl = 'profile'
  private updatePasswordUrl = 'changepass';
  private fileUploadUrl = 'changeprofilepic';
  private updateProfileUrl = 'profile';
  private authCode = 'authcode';

  constructor(private http: BaseService ) { }

  getAllUserProfiles() {
    return this.http.get(this.allUserProfileUrl);
  }
  getUserProfile() {
    return this.http.get(this.userProfileUrl);
  }
  submitAuthCode(payload: any) {
    return this.http.post(this.authCode, payload);
  }
  updateUserPassword(payload: any) {
    return this.http.post(this.updatePasswordUrl, payload);
  }
  fileUploadOthers(file) {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.fileUploadUrl, formData);
  }
  updateUserProfile(payload:any){
    return this.http.post(this.updateProfileUrl, payload);
  }
}
