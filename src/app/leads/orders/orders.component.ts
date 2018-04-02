import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-archive-leads',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrdersService]
})
export class OrdersComponent implements OnInit {

  todaysOrders : any =[];
  todayaOrders : any =[];
  tomorrowsOrders : any =[];
  tomorrowaOrders : any =[];
  upcomingOrders : any =[];

  td: any = new Date();
  tomdate: any = new Date(new Date().getTime() + 24*60*60*1000);
  y : any = this.td.getFullYear();
  m : any = this.td.getMonth();
  d : any = this.td.getDate();
  year : any = this.tomdate.getFullYear();
  month : any = this.tomdate.getMonth();
  date : any = this.tomdate.getDate();

  constructor(private ordersServive: OrdersService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
      this.ordersServive.getOrders()
          .subscribe((results: any) => {
              if (results.success) {
                  // console.log('!!!');
                  // console.log(results);
                  this.todaysOrders = [];
                  this.todayaOrders = [];
                  this.tomorrowsOrders = [];
                  this.tomorrowaOrders = [];
                  this.upcomingOrders = [];
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
                    // this.odDate = new Date(order.requiredByDate.getFullYear(),order.requiredByDate.getMonth(),order.requiredByDate.getDate()); 
                    // // console.log(this.odDate);
                    if(year == this.y && month == this.m && date == this.d && order.status == "submitted") {
                      this.todaysOrders.push(order);
                      // // console.log(this.todaysOrders);
                    }else  if(year == this.y && month == this.m && date == this.d && order.status == "approved") {
                      this.todayaOrders.push(order);
                      // // console.log(this.todayaOrders);
                    }else if(year == this.year && month == this.month && date == this.date && order.status == "submitted") {
                      this.tomorrowsOrders.push(order);
                      // // console.log(this.tomorrowsOrders);
                    } else if (year == this.year && month == this.month && date == this.date && order.status == "approved") {
                      this.tomorrowaOrders.push(order);
                      // // console.log(this.tomorrowaOrders);
                    } else {
                      this.upcomingOrders.push(order);
                    }
                   return;
                  });
              }
          });
  }

  onPlaceOrder(id: any) {
    const data = {
        orderId : id
    }
     // console.log(data);
     this.ordersServive.placeOrder(data)
       .subscribe((results:any) => {
         if (results.success) {
           // console.log(results);
           this.getAllOrders();
         } else {
           // console.log(data);
         }
       });
    }

  // getArchiveLeads(){
  //   this.archiveleadsservice.getArchiveLeads()
  //     .subscribe((results:any) => {
  //       if(results.success){
  //         //// console.log(results.data);
  //         this.archiveLeads = results.data;
  //       }
  //     }, (err:any) => {})
  // }

}