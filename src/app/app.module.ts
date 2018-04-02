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
import { PurchaseOrderComponent } from './leads/purchase-order/purchase-order.component';
import { OrdersComponent } from './leads/orders/orders.component';
import { LoginComponent } from './login/login.component';
import { CancelledOrdersComponent } from './leads/cancelled-orders/cancelled-orders.component';
import { HistoryComponent } from './leads/history/history.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    LeadsComponent,
    PurchaseOrderComponent,
    OrdersComponent,
    LoginComponent,
    CancelledOrdersComponent,
    HistoryComponent
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
