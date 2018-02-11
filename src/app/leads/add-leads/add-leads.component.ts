import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AddleadService } from '../../services/addlead.service';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrls:['./add-leads.component.css'],
  providers:[AddleadService]
})
export class AddLeadsComponent implements OnInit {

  leadId:any;
  leadEmail:any;
  projectSources:any = [];
  leadManagers:any = [];
  platforms:any = [];
  currency:any = [];
  countries:any = [];

  private checkedPlatforms:any = [];

  constructor(private activatedrouter:ActivatedRoute, private router: Router, private addLeadsService: AddleadService) { }

  addLeadForm = new FormGroup({
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
    this.activatedrouter.params.forEach((params: Params) => {
      this.leadId =  params['id'];
      this.leadEmail =  params['email'];
      //console.log(this.leadEmail);
      //console.log(this.leadId);
    });
    this.getAddLeadPageDetails();
  }

  getAddLeadPageDetails(){
    this.addLeadsService.getDetailsForAddLeads()
      .subscribe((results:any) => {
        if(results.success){
          //console.log(results);
          this.countries = results.results.countries[0];
          this.currency = results.results.currency[0];
          this.platforms = results.results.platforms[0];
          this.leadManagers = results.results.leadManagers[0];
          this.projectSources = results.results.sources[0];    
        }else{
          //console.log(results);
        }
      }, (err:any) =>{
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

  //update usedId to take it from session
  updateLeadDetails(){
    let leadObject = {
      projectId: this.leadId,
      email: this.addLeadForm.value.email,
      clientName: this.addLeadForm.value.clientName,
      projectName: this.addLeadForm.value.projectName,
      description: this.addLeadForm.value.description,
      contact: this.addLeadForm.value.clientContact,
      country: this.addLeadForm.value.country,
      city: this.addLeadForm.value.city,
      source: this.addLeadForm.value.source,
      platform: this.checkedPlatforms.toString(),
      budget: this.addLeadForm.value.budget,
      currency: this.addLeadForm.value.currency,
      manager: this.addLeadForm.value.leadManager,
      userId: this.addLeadForm.value.leadManager
    }
    this.addLeadsService.updateLeadDetails(leadObject)
      .subscribe((results:any) => {
        if(results.success){
          //console.log("lead details updated successfully");
          this.router.navigate(['/allleads']);
        }else{
          //console.log(results);
        }
      }, (err:any) => {
        //console.log(err);
      })
  }

}
