import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { FormGroup, FormControl } from '@angular/forms';
// import { FooterModule } from '../common/footer/footer.module';
// import { SidebarModule } from '../common/sidebar/sidebar.module';
// import { NavbarModule } from '../common/navbar/navbar.module';


declare var $:any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [DashboardService]
})

export class DashboardComponent implements OnInit{
    allLeads:any = [];
    myLeads:any = [];
    gtep:any = [];
    twep:any = [];
    callLogs:any = [];
    platforms:any = [];
    loadedMyLeads:any = 0;
    moreMyLeadsAvailable:Boolean  = false;
    loadedAllLeads:any = 0;
    moreAllLeadsAvailable:Boolean  = false;

    constructor(private dashboardService: DashboardService){}

    ngOnInit(){
        this.getLeads();
    }

    loadMoreMyLeads(){
        console.log(this.loadedMyLeads);
        this.dashboardService.getMyLeads(this.loadedMyLeads)
        .subscribe((result: any) => {
            if (result.success && result.data != []) {
                console.log(result.data);
                if(result.data.length < 10){
                    this.moreMyLeadsAvailable = true;
                }
                console.log(this.moreMyLeadsAvailable);
                result.data.forEach(element => {
                    this.myLeads.push(element);
                })
                this.loadedMyLeads = this.loadedMyLeads + 10;
                //console.log(this.myLeads);
                for(var j=this.loadedMyLeads-9; j < this.myLeads.length; j++){
                    this.myLeads[j].project_platforms = this.myLeads[j].project_platforms.replace(/-*,/gm,'').split("").sort();
                }
                //console.log(this.myLeads);
            }
        }, (err: any) => {
            // this.errorHandle(err);
        }, () => console.log());
    }
    loadMoreAllLeads(){
        console.log(this.loadedAllLeads);
        this.dashboardService.getAllLeads(this.loadedAllLeads)
        .subscribe((result: any) => {
            if (result.success && result.data != []) {
                console.log(result.data);
                if(result.data.length < 10){
                    this.moreAllLeadsAvailable = true;
                }
                console.log(this.moreAllLeadsAvailable);
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


    getLeads(){
        //this.leads = this.dashboardService.getLeads();
        this.dashboardService.getAllLeads(this.loadedAllLeads)
        .subscribe((result: any) => {
            if (result.success) {
                this.allLeads = result.data;
                this.loadedAllLeads = this.loadedAllLeads + 10;
                this.allLeads.forEach(element => {
                    element.project_platforms = element.project_platforms.replace(/-*,/gm,'').split("").sort();
                    //console.log(element.project_platforms);
                });
                //console.log(this.allLeads);
            }
          }, (err: any) => {
           // this.errorHandle(err);
          }, () => console.log());

        this.dashboardService.getMyLeads(this.loadedMyLeads)
        .subscribe((result: any) => {
            if (result.success) {
                this.myLeads = result.data;
                this.loadedMyLeads = this.loadedMyLeads + 10;
                this.myLeads.forEach(element => {
                    element.project_platforms = element.project_platforms.replace(/-*,/gm,'').split("").sort();
                    //console.log(element.project_platforms);
                });
                //console.log(this.myLeads);
            }
        }, (err: any) => {
            // this.errorHandle(err);
        }, () => console.log());

        this.dashboardService.getTodaysExpectedPayments()
        .subscribe((result: any) => {
            if (result.success) {
                this.gtep = result.data;
                //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
                //console.log(this.gtep);
            }
        }, (err: any) => {
            // this.errorHandle(err);
        }, () => console.log());

        this.dashboardService.thisWeekExpectedPayments()
        .subscribe((result: any) => {
            if (result.success) {
                this.twep = result.data;
                //console.log(this.twep);
            }
        }, (err: any) => {
            // this.errorHandle(err);
            console.log(err);
        }, () => console.log());

        this.dashboardService.getNotifications()
            .subscribe((results:any) => {
                if(results.success){
                    //console.log(results);
                    this.callLogs = results.data;
                    return;
                }
            }, (err:any) => {
                //console.log("error retrieving call logs");
                console.log(err);
            })
        this.dashboardService.getAllPlatforms()
            .subscribe((results:any) => {
                if(results.success){
                    //console.log(results.data);
                    this.platforms = results.data;
                    this.myLeads.forEach(function(lead){
                        //console.log(lead);
                        lead.project_platform_classes = [];
                        lead.project_platforms.forEach(function(platform){
                            this.platforms.forEach(function(platformList){
                                //console.log(platform);
                                //console.log(platformList);
                                if(platformList.platform_id == platform){
                                    lead.project_platform_classes.push(platformList.icon_class);
                                }
                            }, this);
                        }, this);
                        //console.log(lead.project_platform_classes);
                    }, this)
                    this.allLeads.forEach(function(lead){
                        //console.log(lead);
                        lead.project_platform_classes = [];
                        lead.project_platforms.forEach(function(platform){
                            this.platforms.forEach(function(platformList){
                                //console.log(platform);
                                //console.log(platformList);
                                if(platformList.platform_id == platform){
                                    lead.project_platform_classes.push(platformList.icon_class);
                                }
                            }, this);
                        }, this);
                        //console.log(lead.project_platform_classes);
                    }, this)
                }else{
                    //console.log(results);
                }
            }, (err:any) => {
                //console.log(err);
            });
    }
}