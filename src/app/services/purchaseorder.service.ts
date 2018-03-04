import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class PurchaseOrderService {
    private poUrl = 'pendingpo';
    private coOrder = 'confirmpendingpo';

    constructor(private http: BaseService) {}

    getAllOrders() {
        return this.http.get(this.poUrl);
    }

    confirmOrders(data : any) {
        return this.http.post(this.coOrder,data);
    }
}