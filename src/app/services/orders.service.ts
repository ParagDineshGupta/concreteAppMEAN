import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class OrdersService {

  private orderUrl = 'pendingorders';
  
  constructor(private http: BaseService) { }

  getOrders() {
    return this.http.get(this.orderUrl);
  }

  placeOrder(data : any) {
    return this.http.post(this.orderUrl, data);
  }
}
