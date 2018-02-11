import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BaseService } from './services/base.service';
import { AuthGuard } from './auth/auth-guard';

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
import { DetailsComponent } from './leads/details/details.component';
import { LoginComponent } from './login/login.component';



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
    AllUsersComponent,
    DetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterModule,
    NavbarModule,
    SidebarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService, BaseService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
