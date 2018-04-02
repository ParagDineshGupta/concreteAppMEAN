import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [OrdersService]
})
export class HistoryComponent implements OnInit {
  orders: any = [] ;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
  }


  getOrders() {
    this.orderService.getHistoryOrders()
      .subscribe((results: any) => {
          // console.log(results);
          if (results.success) {
            results.results.sort(function(a, b) {
              return (a.generationDate > b.generationDate) ? 1 : ((b.generationDate > a.generationDate) ? -1 : 0);
            });
            results.results.forEach( (order) => {
              order.requiredByDate = new Date(order.requiredByDate * 1);
              order.requiredByDate = order.requiredByDate.toString().substring(0, 24);
              order.generationDate = new Date(order.generationDate * 1);
              order.generationDate = order.generationDate.toString().substring(0, 24);
              order.statusDate = new Date(order.statusDate * 1);
              order.statusDate = order.statusDate.toString().substring(0, 24);
              this.orders.push(order);
            });
          }
      });
    }
  }
