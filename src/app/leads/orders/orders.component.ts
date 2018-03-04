import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-archive-leads',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrdersService]
})
export class OrdersComponent implements OnInit {

  aOrders : any = [];
  uOrders : any = [];
  cOrders: any = [];

  constructor(private ordersServive: OrdersService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
      this.ordersServive.getOrders()
          .subscribe((results:any) => {
              if(results.success) {
                  console.log("!!!");
                  console.log(results);
                  this.aOrders  = [];
                  this.uOrders  = [];
                  this.cOrders = [];
                  results.results.forEach( (order) => {
                    order.requiredByDate = new Date(order.requiredByDate * 1)
                    order.requiredByDate = order.requiredByDate.toString().substring(0, 24)
                    order.generationDate = new Date(order.generationDate * 1)
                    order.generationDate = order.generationDate.toString().substring(0, 24)
                    order.statusDate = new Date(order.statusDate * 1)
                    order.statusDate = order.statusDate.toString().substring(0, 24)
                    if(order.status == 'submitted'){
                      this.uOrders.push(order);
                    }else if(order.status == 'cancelled'){
                        this.cOrders.push(order);
                    }else{
                      this.aOrders.push(order);
                    }
                  });
                  console.log(this.uOrders);
                  console.log(this.aOrders);
                  return;
              }
              console.log(results);
          })
  }

  onPlaceOrder(id : any) {
    let data = {
        orderId : id
    }
     console.log(data);
     this.ordersServive.placeOrder(data)
       .subscribe((results:any) => {
         if(results.success) {
           console.log(results);
           this.getAllOrders();
         } else {
           console.log(data);
         }
       })
    }
 

  // getArchiveLeads(){
  //   this.archiveleadsservice.getArchiveLeads()
  //     .subscribe((results:any) => {
  //       if(results.success){
  //         //console.log(results.data);
  //         this.archiveLeads = results.data;
  //       }
  //     }, (err:any) => {})
  // }

}
