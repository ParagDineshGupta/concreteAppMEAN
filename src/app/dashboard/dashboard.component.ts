import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { FormGroup, FormControl, Validators,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    
    aQuotes:any = [];//answered quotes
    uQuotes:any = [];//unanswered quotes
    quoteId : any;
    @ViewChild('f') delresponseForm: NgForm;
    


    constructor(private dashboardService: DashboardService, private router: Router
    ){}

    responseForm : FormGroup;
    enableRes  = false;
    
    ngOnInit(){
        this.getAllQuotations();
        this.responseForm = new FormGroup ({
            'price': new FormControl(null, Validators.required),
            'validTill' : new FormControl(null, Validators.required),
            'quoteId' : new FormControl(null, Validators.required)
        });
    
    }

    getAllQuotations(){
        this.dashboardService.getAllQuotes()
            .subscribe((results:any) => {
                if(results.success){
                    // console.log(results);
                    this.aQuotes = results.aQuotes;
                    this.uQuotes = results.uQuotes;
                    this.aQuotes.forEach(element => {
                        element.requiredDate = new Date(element.requiredDate * 1)
                        element.requiredDate = element.requiredDate.toString().substring(0, 24)
                        element.generationDate = new Date(element.generationDate * 1)
                        element.generationDate = element.generationDate.toString().substring(0, 24)
                        
                    });
                    this.uQuotes.forEach(element => {

                        element.requiredDate = new Date(element.requiredDate * 1)
                        element.requiredDate = element.requiredDate.toString().substring(0, 24)
                        element.generationDate = new Date(element.generationDate * 1)
                        element.generationDate = element.generationDate.toString().substring(0, 24)
                        
                    });
                    
                    return;
                }
            // console.log(results);

        })
    }
 
    onResponse(id : any) {
        if(!this.quoteId){
            this.quoteId = id;
        }else{
            this.quoteId = null;
        }
    }

    onSubmit() {
        //// console.log(this.responseForm);
        let data = {
            price: this.responseForm.value.price,
            validTill: this.responseForm.value.validTill,
            quoteId: this.responseForm.value.quoteId
        }
        // console.log(data);
        this.dashboardService.answerQuote(data)
            .subscribe((results:any) => {
                if(results.success){
                   // // console.log("@@@@@@@@@");
                    // console.log(results);
                    this.getAllQuotations();

                } else {
                    // console.log(data);
                    // console.log(results);
                }

            })
             
    }

    onDelete() {
        let data = {
            quoteId: this.delresponseForm.value.quoteId,
            responseId: this.delresponseForm.value.responseId
  
        }
        // console.log(data);
        this.dashboardService.deleteQuote(data)
            .subscribe((results:any) => {
                if(results.success){
                   // // console.log("@@@@");
                    // console.log(results);
                    
                } else {
                    //// console.log(data);
                    // console.log(results);
                }

            })
             
        
    }

}