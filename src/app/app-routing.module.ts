import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { PurchaseOrderComponent } from './leads/purchase-order/purchase-order.component';
import { OrdersComponent } from './leads/orders/orders.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth-guard';
import { CancelledOrdersComponent } from './leads/cancelled-orders/cancelled-orders.component';
import { HistoryComponent } from './leads/history/history.component';


const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
	  path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
	  path: 'user',
    component:UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'cancelled',
    component: CancelledOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'history',
    component: HistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'purchase',
    component:PurchaseOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'orders',
    component:OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'cancelorder',
    component:CancelledOrdersComponent,
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
