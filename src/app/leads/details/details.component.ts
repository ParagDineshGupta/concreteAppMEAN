import { Component, OnInit } from '@angular/core';
import { LeadsService } from '../../services/leads.service';
import { ActivatedRoute, Params } from '@angular/router'
import { AddleadService } from '../../services/addlead.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [LeadsService, AddleadService] 
})
export class DetailsComponent implements OnInit {

  
  toggle:boolean = true;

  public editPermission:boolean = false;
  private leadId: number;
  projectStatus:any = [];
  projectSources:any = [];
  leadManagers:any = [];
  platforms:any = [];
  currency:any = [];
  countries:any = [];
  private checkedPlatforms:any = [];
  private currentEditingCallLog;
  private editCallLogValues:any;

  leadsDetails:any = Object;
  callLogs:any = [];
  project_id:any;
  constructor(private leadsService: LeadsService, private router: ActivatedRoute, private addLeadService: AddleadService) { }
  
  updateStatusForm = new FormGroup({
    currentStatus : new FormControl()
  })

  progressForm = new FormGroup({
    callDesc: new FormControl()
  })

  upfrontForm = new FormGroup({
    currency: new FormControl(),
    amount: new FormControl(),
    date: new FormControl()
  });

  editCallLogForm = new FormGroup({
    callDesc: new FormControl()
  })

  editLeadForm = new FormGroup({
    projectName: new FormControl(),
    clientName: new FormControl(),
    email:new FormControl(),
    clientContact: new FormControl(),
    source: new FormControl(),
    leadManager: new FormControl(),
    platform: new FormControl(),
    budget: new FormControl(),
    currency: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    description: new FormControl()
  });

  ngOnInit() {
    this.router.params.forEach((params: Params) => {
      this.project_id =  params['id'];
      //console.log(this.project_id);
   })
    this.getLeadsDetails();
    this.getAddLeadPageDetails();
    this.getStatusList();
    this.getCallLogsForCurrentProject();
  }

  toggleView(){
    if(this.toggle){
      this.toggle = false;
    }else{
      this.toggle = true;
    }
  }

  getStatusList(){
    this.addLeadService.getAllStatus()
      .subscribe((results:any) => {
        if(results.success){
          this.projectStatus = results.data;
          ////console.log(this.projectStatus);
        }
      }, (err: any) => {
        //console.log(err);
      })
  }

  updateLeadsStatus(){
    let statusObject = {
      projectCurrentStatus: this.updateStatusForm.value.currentStatus,
      userId:this.leadsDetails.user_id,
      projectId: this.leadId
    }
    //console.log("this is called");
    this.addLeadService.updateLeadStatus(statusObject)
      .subscribe((results:any) => {
        if(results.success){
          ////console.log(" update status successful");
          this.getLeadsDetails();
        }else{
          //console.log("update status failed");
          //console.log(results);
        }
      })
  }
  
  upfrontFormSubmit(){
    let paymentDetails = {
      project_payment_amount:this.upfrontForm.value.amount,
      project_payment_recieved_date:this.upfrontForm.value.date,
      project_budget_unit:this.upfrontForm.value.currency,
      userId: this.leadsDetails.user_id,
      projectId: this.project_id
    }
    //console.log(paymentDetails);
    this.addLeadService.updatePaymentDetails(paymentDetails)
      .subscribe((results:any) => {
        if(results.success){
          ////console.log("payment status updated");
          document.getElementById('updateUpfrontModal').style.display = "none";
          this.getLeadsDetails();
        }else{
          //console.log("some error occured");
          //console.log(results);          
        }
      })
  }

  getCallLogsForCurrentProject(){
    this.leadsService.getCallLogsByProjectId(this.project_id)
      .subscribe((results:any) => {
        if(results.success){
          ////console.log(results.data);
          this.callLogs = results.data;
        }else{
          //console.log(results);
        }
      }, (err:any) => {
        ////console.log(err);
      })
  }

  editingButton(){
    if(this.leadsDetails.editing){
      this.editPermission = false;
    }else{
      this.editPermission = true;
    }
  }

  getLeadsDetails(){
    this.leadsService.getLeadsDetails(this.project_id)
      .subscribe((results:any) => {
        if(results.success){
          ////console.log(results.data);
          this.leadsDetails = results.data;
          this.leadId = this.leadsDetails.project_id;
          this.leadsDetails.project_description = this.leadsDetails.project_description.replace(/<(?:.|\n)*?>/gm, ''); 
          this.leadsDetails.project_description = this.leadsDetails.project_description.replace(/&nbsp;/gm, ', '); 
          this.leadsDetails.project_platforms = this.leadsDetails.project_platforms.replace(/-*,/gm,'').split("").sort();
          //this.leadsDetails.project_platforms = ["1", "2"];
          this.checkedPlatforms = this.leadsDetails.project_platforms;
          //console.log(this.leadsDetails.project_platforms);
          //console.log(this.checkedPlatforms);
          //console.log(this.leadsDetails.editing);
          this.editingButton();
          //console.log(this.editPermission);
          setTimeout(() => {
            if (this.leadsDetails.project_platforms.length > 0) {
              for (const amn of this.checkedPlatforms) {
                for (const amnt of this.platforms) {
                  if (amnt.platform_id == amn) {
                    amnt.isChecked = true;
                  }
                }
              }
            }
          }, 2000);
          //console.log(this.platforms);
        }
      }, (err:any) => {
        //console.log(err);
      })
  }


  getAddLeadPageDetails(){
    this.addLeadService.getDetailsForAddLeads()
      .subscribe((results:any) => {
        if(results.success){
          //console.log(results);
          this.countries = results.results.countries[0];
          this.currency = results.results.currency[0];
          this.platforms = results.results.platforms[0];
          this.leadManagers = results.results.leadManagers[0];
          this.projectSources = results.results.sources[0];
          ////console.log("####################");
          //console.log(this.platforms);
          for (const k of this.platforms) {
            k.isChecked = false;
          }
        }else{
          //console.log(results);
        }
      }, (err:any) =>{
        //console.log(err);
      })
  }

  setEditCallLogId(id:any, desc:any){
    //console.log(id);
    this.currentEditingCallLog = id;
    this.editCallLogForm.controls.callDesc.setValue(desc);
    //console.log(desc);
  }

  editCalllog(){
    this.editCallLogValues = {
      id:this.currentEditingCallLog,
      description:this.editCallLogForm.value.callDesc,
      projectId: this.leadsDetails.project_id
    }
    //console.log(this.editCallLogValues);
    this.addLeadService.editCallLog(this.editCallLogValues)
      .subscribe((results:any) => {
        if(results.success){
          //console.log("update call log successful");
          this.getCallLogsForCurrentProject();
          document.getElementById("editProgressModal").style.display = "none";
        }else{
          //console.log(results);
        }
      })
  }

  deleteCallLog(id:any){
    //console.log(id);
    this.addLeadService.deleteCallLog(id)
      .subscribe((results:any) => {
        if(results.success){
          //console.log("call log delete successful");
          this.getCallLogsForCurrentProject();
        }else{
          //console.log(results);
        }
      }, (err: any) =>{
        //console.log(err);
      })
  }

  progressFormSubmit(){
    let progress = {
      callDesc: this.progressForm.value.callDesc,
      projectId: this.leadsDetails.project_id,
      userId: this.leadsDetails.user_id
    }
    this.addLeadService.addProgress(progress)
      .subscribe((results:any) => {
        if(results.success){
          //console.log("progress update successful");
          document.getElementById("myProgressModal").style.display = "none";
          this.getCallLogsForCurrentProject();
        }else{
          //console.log(results);
        }
      }, (err: any) =>{
        //console.log(err);
      })
  }
  onChange(event:any) {
    ////console.log(event);
    if(event.target.checked) {
      this.checkedPlatforms.push(event.target.value);
    } else {
      let index:number = this.checkedPlatforms.indexOf( event.target.value)
      ////console.log(index);
      this.checkedPlatforms.splice(index, 1);
    }
    //console.log(this.checkedPlatforms);
  }

  updateLeadDetails(){
    let leadObject = {
      projectId: this.leadId,
      email: this.editLeadForm.value.email,
      clientName: this.editLeadForm.value.clientName,
      projectName: this.editLeadForm.value.projectName,
      description: this.editLeadForm.value.description,
      contact: this.editLeadForm.value.clientContact,
      country: this.editLeadForm.value.country,
      city: this.editLeadForm.value.city,
      source: this.editLeadForm.value.source,
      platform: this.checkedPlatforms.toString(),
      budget: this.editLeadForm.value.budget,
      currency: this.editLeadForm.value.currency,
      manager: this.editLeadForm.value.leadManager,
      userId: this.editLeadForm.value.leadManager
    }
    //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
    //console.log(leadObject);
    this.addLeadService.updateEditedLeadDetails(leadObject)
      .subscribe((results:any) => {
        if(results.success){
          //console.log("lead details updated successfully");
          this.toggleView();
          this.getLeadsDetails();
          this.getAddLeadPageDetails();
        }else{
          //console.log(results);
        }
      }, (err:any) => {
        //console.log(err);
      })
  }
}
