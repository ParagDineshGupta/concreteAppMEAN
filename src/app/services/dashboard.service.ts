import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class DashboardService {
  private myLeadsUrl = 'dashboard/myleads';
  private allLeadsUrl = 'dashboard/allleads';
  private gtep = 'dashboard/gtep';
  private twep = 'dashboard/twep';
  private notifications = "dashboard/calllogs";
  private platforms = "dashboard/getallplatforms"

  constructor(private http: BaseService  ) { }

  getAllLeads(count:any){
    return this.http.post(this.allLeadsUrl, {count:count});
    //return 
  }
  getMyLeads(count:any){
    return this.http.post(this.myLeadsUrl, {count:count} );
    //return 
  }
  getTodaysExpectedPayments(){
    return this.http.get(this.gtep)
  }
  thisWeekExpectedPayments(){
    return this.http.get(this.twep)
  }
  getNotifications(){
    return this.http.get(this.notifications);
  }
  getAllPlatforms(){
    return this.http.get(this.platforms);
  }
}
