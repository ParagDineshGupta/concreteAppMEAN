import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FooterModule } from './common/footer/footer.module';
import { SidebarModule } from './common/sidebar/sidebar.module';
import { NavbarModule } from './common/navbar/navbar.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './common/footer/footer.component';
import { LeadsComponent } from './leads/leads.component';
import { AddLeadsComponent } from './leads/add-leads/add-leads.component';
import { AllLeadsComponent } from './leads/all-leads/all-leads.component';
import { ArchiveLeadsComponent } from './leads/archive-leads/archive-leads.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AllInvoiceComponent } from './invoice/all-invoice/all-invoice.component';
import { AllUsersComponent } from './all-users/all-users.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    LeadsComponent,
    AddLeadsComponent,
    AllLeadsComponent,
    ArchiveLeadsComponent,
    InvoiceComponent,
    AddInvoiceComponent,
    AllInvoiceComponent,
    AllUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterModule,
    NavbarModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
