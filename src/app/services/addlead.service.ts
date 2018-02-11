import { Injectable } from '@angular/core';
import { BaseService } from './base.service';


@Injectable()
export class AddleadService {

  private createLeadUrl = "leads/createnewlead";
  private addLeadsPageDetailsUrl = "custom/addleadspage";
  private updateLeadUrl = "leads/updateleaddetails"
  private updateEditLeadUrl = "leads/updateleaddetails";
  private statusListUrl = "leads/getstatuslist";
  private updateStatusUrl = "leads/updatestatus";
  private addProgressUrl = "leads/addcalllog";
  private upfrontUpdateUrl = "leads/updatepaymentdate"
  private editCallLogUrl = "leads/updatecalllog";
  private deleteCallLogsUrl;


  constructor(private http: BaseService) { }

  createNewLead(email){
    return this.http.post(this.createLeadUrl, {email:email})
  }
  updateLeadDetails(leadDetails: Object){
    return this.http.post(this.updateLeadUrl, leadDetails);
  }
  updateEditedLeadDetails(leadDetails:Object){
    return this.http.post(this.updateEditLeadUrl, leadDetails);
  }
  updateLeadStatus(statusObject:any){
    return this.http.post(this.updateStatusUrl, statusObject);
  }
  deleteCallLog(id:any){
    this.deleteCallLogsUrl = "leads/deletecalllog/" + id;
    return this.http.get(this.deleteCallLogsUrl)
  }
  editCallLog(updateObj:any){
    return this.http.post(this.editCallLogUrl, updateObj);
  }
  updatePaymentDetails(upfrontObj:any){
    return this.http.post(this.upfrontUpdateUrl, upfrontObj);
  }
  addProgress(progress:any){
    return this.http.post(this.addProgressUrl, progress);
  }
  getAllStatus(){
    return this.http.get(this.statusListUrl);
  }
  getDetailsForAddLeads(){
    return this.http.get(this.addLeadsPageDetailsUrl)
  }
}
