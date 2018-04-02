import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../../services/purchaseorder.service';

@Component({
  selector: 'app-all-leads',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
  providers: [PurchaseOrderService]
})
export class PurchaseOrderComponent implements OnInit {

  aQuotes:any = [];//answered quotes
  uQuotes:any = [];//unanswered quotes
  i : number;

  constructor(private poService : PurchaseOrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.poService.getAllOrders()
      .subscribe((results:any) => {
        if(results.success) {
          this.aQuotes = [];
          this.uQuotes = [];
         // console.log("@@@"); 
         // console.log(results);
         results.resuts.forEach( (porder) => {
            if(porder.confirmedBySupplier){
              // var t = new Date( porder.generationDate * 1 );
              // porder.generationDate = t.toString().substr(0, 25);
              // var t = new Date( porder.validTill * 1 );
              // porder.validTill = t.toString().substr(0, 25);                                                                                     
              this.aQuotes.push(porder)
            }else{
              // var t = new Date( porder.generationDate * 1 );
              // porder.generationDate = t.toString().substr(0, 25);
              // // console.log(porder.validTill)
              // var t = new Date( porder.validTill * 1 );
              // // console.log(t)
              // porder.validTill = t.toString().substr(0, 25);
              this.uQuotes.push(porder);
            }
         })
         return;
        }
        // console.log(results);
      });
  }
  

  onConfirm(id : any) {
     let data = {
       POId : id
     }
     // console.log(data);
     this.poService.confirmOrders(data)
         .subscribe((results:any) => {
            if(results.success) {
              // console.log(results);
              this.getOrders();
            } else {
              // console.log(data);
            }
         })
  }
    
}
