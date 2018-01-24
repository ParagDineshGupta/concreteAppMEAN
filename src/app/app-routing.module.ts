import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { LeadsComponent } from './leads/leads.component';
import { AddLeadsComponent } from './leads/add-leads/add-leads.component';
import { AllLeadsComponent } from './leads/all-leads/all-leads.component';
import { ArchiveLeadsComponent } from './leads/archive-leads/archive-leads.component';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AllInvoiceComponent } from './invoice/all-invoice/all-invoice.component';
import { AllUsersComponent } from './all-users/all-users.component';


const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
	  path:'dashboard',
	  component: DashboardComponent
  },
  {
	  path:'user',
	  component:UserComponent
  },
  {
	  path: 'leads',
	  component:LeadsComponent
  },
  {
    path:'addleads',
    component: AddLeadsComponent
  },
  {
    path:'allleads',
    component:AllLeadsComponent
  },
  {
    path:'archiveleads',
    component:ArchiveLeadsComponent
  },
  {
    path:'addinvoice',
    component:AddInvoiceComponent
  },
  {
    path:'allinvoice',
    component:AllInvoiceComponent
  },
  {
    path:'allusers',
    component:AllUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
