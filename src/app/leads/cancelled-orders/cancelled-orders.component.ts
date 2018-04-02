import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-cancelled-orders',
  templateUrl: './cancelled-orders.component.html',
  styleUrls: ['./cancelled-orders.component.css'],
  providers: [OrdersService]
})
export class CancelledOrdersComponent implements OnInit {

  todaycOrders : any =[];
 
  tomorrowcOrders : any =[];
  
  upcomingcOrders : any =[];

  td : any = new Date();
  tomdate : any = new Date(new Date().getTime() + 24*60*60*1000);
  y : any = this.td.getFullYear();
  m : any = this.td.getMonth();
  d : any = this.td.getDate();
  year : any = this.tomdate.getFullYear();
  month : any = this.tomdate.getMonth();
  date : any = this.tomdate.getDate();

  constructor(private ordersServive: OrdersService) { }

  ngOnInit() {
    this.getCOrders();
  }

  getCOrders() {
      this.ordersServive.getCancelledOrders()
          .subscribe((results:any) => {
              if(results.success) {
                  // console.log("!!!");
                  // console.log(results);
                  this.todaycOrders = [];
                  this.tomorrowcOrders = [];
                  this.upcomingcOrders = [];
                  results.results.forEach( (order) => {
                    order.requiredByDate = new Date(order.requiredByDate * 1);
                    order.requiredByDate = order.requiredByDate.toString().substring(0, 24);
                    order.generationDate = new Date(order.generationDate * 1);
                    order.generationDate = order.generationDate.toString().substring(0, 24);
                    order.statusDate = new Date(order.statusDate * 1);
                    order.statusDate = order.statusDate.toString().substring(0, 24);
                    order.requiredByDate = new Date(order.requiredByDate);
                    let year = order.requiredByDate.getFullYear();
                    let month = order.requiredByDate.getMonth();
                    let date = order.requiredByDate.getDate();
                    
                    //this.odDate = new Date(order.requiredByDate.getFullYear(),order.requiredByDate.getMonth(),order.requiredByDate.getDate()); 
                    //// console.log(this.odDate);
                    if(year == this.y && month == this.m && date == this.d) {
                      this.todaycOrders.push(order);
                      //// console.log(this.todaycOrders);
                    }else if(year == this.year && month == this.month && date == this.date) {
                      this.tomorrowcOrders.push(order);
                      //// console.log(this.tomorrowcOrders);
                    }  
                    else {
                      this.upcomingcOrders.push(order);
                    }     
                   return;
                  })
              }
          });
  }

  /*onPlaceOrder(id : any) {
    let data = {
        orderId : id
    }
     // console.log(data);
     this.ordersServive.placeOrder(data)
       .subscribe((results:any) => {
         if(results.success) {
           // console.log(results);
           this.getAllOrders();
         } else {
           // console.log(data);
         }
       })
    }*/
 

}
