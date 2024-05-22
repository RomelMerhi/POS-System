import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';

@Component({
  selector: 'app-order-pannel-admin',
  templateUrl: './order-pannel-admin.component.html',
  styleUrls: ['./order-pannel-admin.component.scss'],
})
export class OrderPannelAdminComponent  implements OnInit {
  selectedOrder: any;
  itemsOfselectedOrder: any;


  constructor(private ordersData: OrdersDataService) { }

  ngOnInit() {
    this.ordersData.cashierSelectedOrderSubject.subscribe(selected => {
      this.selectedOrder = selected;
      this.itemsOfselectedOrder = this.selectedOrder[2];
      this.Total = this.selectedOrder[11];
    });

    this.ordersData.keyboardSubject.subscribe(selected => {
      this.keyboardValue = selected;
    });

    this.ordersData.dailyTotalSubject.subscribe(selected => {
      this.dailyTotal = selected;
    });

  }


  dailyTotal:number=0;
  concat:string="";
  input: boolean = false;
  keyboardValue: string = "";
  Total: number = 0;
  TotalHanded: number = 0;
  handedLBP: number = 0;
  handedUSD: number = 0;
  TotalAmountUSD: boolean = false;
  ReturnAmountUSD: boolean = false;

  changeInput(val: boolean) {
   this.input=val;
   console.log(this.input)
  }

 
  DeleteItem(itemName: any) {
    // console.log(this.itemsOfselectedOrder)
    let i = 0;
    while (itemName != this.itemsOfselectedOrder[i].ItemName) {
      i += 1;
    }
    this.itemsOfselectedOrder.splice(i, 1);
    this.Total=this.Total-this.itemsOfselectedOrder[i].Price;
  }
  
  updateOrder(){
   this.ordersData.UpdateOrder(this.selectedOrder[1],this.itemsOfselectedOrder,this.Total);
   console.log("here!",this.selectedOrder[1],this.itemsOfselectedOrder)
   
  }
  
}