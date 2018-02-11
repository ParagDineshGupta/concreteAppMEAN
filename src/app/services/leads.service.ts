import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class LeadsService {

  private allLeadsUrl = 'leads/';
  //private allLeadsUrl = 'custom/allleads';
  private detailUrl:any;
  private callLogsUrl:any;

  constructor(private http:BaseService) { }

  getAllLeads(count:any){
    return this.http.post(this.allLeadsUrl, {count:count});
  }
  getLeadsDetails(id){
    this.detailUrl = 'leads/details/' + id;
    //console.log('requesting on ' + this.detailUrl);
    return this.http.get(this.detailUrl);
  }
  getCallLogsByProjectId(projectId:any){
    this.callLogsUrl = "leads/getcalllogs/" + projectId;
    //console.log(this.callLogsUrl);
    return this.http.get(this.callLogsUrl);
  }
}