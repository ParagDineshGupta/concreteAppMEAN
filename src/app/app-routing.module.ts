import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { LeadsComponent } from './leads/leads.component';
import { AddLeadsComponent } from './leads/add-leads/add-leads.component';
import { PurchaseOrderComponent } from './leads/purchase-order/purchase-order.component';
import { OrdersComponent } from './leads/orders/orders.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth-guard';
import { CancelledOrdersComponent } from './leads/cancelled-orders/cancelled-orders.component';


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
    path:'archiveleads',
    component: CancelledOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'allleads',
    component:PurchaseOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'archive',
    component:OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'cancelorder',
    component:CancelledOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'allusers',
    component:AllUsersComponent,
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
