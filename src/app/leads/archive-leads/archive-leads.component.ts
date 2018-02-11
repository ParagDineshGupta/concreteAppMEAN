import { Component, OnInit } from '@angular/core';

import { ArchiveleadsService } from '../../services/archiveleads.service';

@Component({
  selector: 'app-archive-leads',
  templateUrl: './archive-leads.component.html',
  styleUrls: ['./archive-leads.component.css'],
  providers: [ArchiveleadsService]
})
export class ArchiveLeadsComponent implements OnInit {

  archiveLeads:any = [];
  loadedArchiveLeads:any = 0;
  moreArchiveLeadsLeft:Boolean = false;


  constructor(private archiveleadsservice: ArchiveleadsService) { }

  ngOnInit() {
    this.loadMoreArchiveLeads();
  }

  loadMoreArchiveLeads(){
    //console.log(this.loadedAllLeads);
    this.archiveleadsservice.getArchiveLeads(this.loadedArchiveLeads)
    .subscribe((result: any) => {
        if (result.success && result.data != []) {
            console.log(result.data);
            if(result.data.length < 10){
                this.moreArchiveLeadsLeft = true;
            }
            console.log(this.moreArchiveLeadsLeft);
            result.data.forEach(element => {
                this.archiveLeads.push(element);
            })
            this.loadedArchiveLeads = this.loadedArchiveLeads + 10;
            //console.log(this.myLeads);
            for(var j=this.loadedArchiveLeads-9; j < this.archiveLeads.length; j++){
                this.archiveLeads[j].project_platforms = this.archiveLeads[j].project_platforms.replace(/-*,/gm,'').split("").sort();
            }
            //console.log(this.archiveLeads);
        }
    }, (err: any) => {
        // this.errorHandle(err);
    }, () => console.log());
}

  // getArchiveLeads(){
  //   this.archiveleadsservice.getArchiveLeads()
  //     .subscribe((results:any) => {
  //       if(results.success){
  //         //console.log(results.data);
  //         this.archiveLeads = results.data;
  //       }
  //     }, (err:any) => {})
  // }

}
