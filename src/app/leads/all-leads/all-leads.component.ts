import { Component, OnInit } from '@angular/core';
import { LeadsService } from '../../services/leads.service';

@Component({
  selector: 'app-all-leads',
  templateUrl: './all-leads.component.html',
  styleUrls: ['./all-leads.component.css'],
  providers: [LeadsService]
})
export class AllLeadsComponent implements OnInit {

  allLeads:any = [];
  loadedAllLeads:any = 0;
  moreLeadsLeft:Boolean = false;

  constructor(private leadsService : LeadsService) { }

  ngOnInit() {
    this.loadMoreAllLeads();
  }

  loadMoreAllLeads(){
    //console.log(this.loadedAllLeads);
    this.leadsService.getAllLeads(this.loadedAllLeads)
    .subscribe((result: any) => {
        if (result.success && result.data != []) {
            console.log(result.data);
            if(result.data.length < 10){
                this.moreLeadsLeft = true;
            }
            console.log(this.moreLeadsLeft);
            result.data.forEach(element => {
                this.allLeads.push(element);
            })
            this.loadedAllLeads = this.loadedAllLeads + 10;
            //console.log(this.myLeads);
            for(var j=this.loadedAllLeads-9; j < this.allLeads.length; j++){
                this.allLeads[j].project_platforms = this.allLeads[j].project_platforms.replace(/-*,/gm,'').split("").sort();
            }
            //console.log(this.allLeads);
        }
    }, (err: any) => {
        // this.errorHandle(err);
    }, () => console.log());
}
  getAllLeads(){
    this.leadsService.getAllLeads(this.loadedAllLeads)
      .subscribe((results: any) => {
        if(results.success){
          console.log(results.data);
          this.allLeads = results.data;
        }else{
          //console.log(results);
        }
      }, (err: any) => {
        //console.log(err);
      })
  }
}
