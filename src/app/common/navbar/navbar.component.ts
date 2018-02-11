import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
//import { ROUTES } from '../sidebar/sidebar.component';
import {  FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AddleadService } from '../../services/addlead.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    providers: [AddleadService, CookieService]
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    leadForm = new FormGroup({
        email : new FormControl()
    });
    
    

    @ViewChild("navbar-cmp") button;

    constructor(location:Location, private cookieservice: CookieService ,private renderer : Renderer, private element : ElementRef, private addlead: AddleadService, private router: Router) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
        
    }
    getTitle(){}

    logout(){
        this.cookieservice.delete('User');
        this.router.navigate(['/login']);
    }

    createNewLead(){
        //console.log(this.leadForm.value);
        this.addlead.createNewLead(this.leadForm.value.email)
            .subscribe((results:any) => {
                if(results.success){
                    //console.log(results);
                    this.router.navigate(['/addleads/' +  results.result.insertId + '/' +  this.leadForm.value.email]);
                }else{
                    //console.log(results);
                    return false;
                }
            }, (err:any) => {
                //console.log(err);
            })
    }


    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
}
