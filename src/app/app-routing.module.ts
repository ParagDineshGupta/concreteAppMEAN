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
import { DetailsComponent } from './leads/details/details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth-guard';


const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
	  path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
	  path:'user',
    component:UserComponent,
    canActivate: [AuthGuard]
  },
  {
	  path: 'leads',
    component:LeadsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'addleads',
    component: AddLeadsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'allleads',
    component:AllLeadsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'archiveleads',
    component:ArchiveLeadsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'addinvoice',
    component:AddInvoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'allinvoice',
    component:AllInvoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'allusers',
    component:AllUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'leads/details/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'addleads/:id/:email',
    component: AddLeadsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
