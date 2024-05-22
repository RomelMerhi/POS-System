import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';

@Component({
  selector: 'app-order-pannel',
  templateUrl: './order-pannel.component.html',
  styleUrls: ['./order-pannel.component.scss'],
})
export class OrderPannelComponent implements OnInit {
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
      this.handleKeyboardInput();
    });
  }

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

  calculateReturn(): number {
    // Convert handed LBP to USD using the conversion rate
    const handedLBPInUSD = this.handedLBP / 89000;
  
    // Calculate the total handed amount in USD
    this.TotalHanded = Number(this.handedUSD) + handedLBPInUSD;
  
    // Convert the Total to a number, in case it's a string
    const Total = Number(this.Total);
  
    // Calculate the return amount in USD
    const returnAmountUSD = this.TotalHanded - Total;
  
    // If ReturnAmountUSD is true, return the amount in LBP; otherwise, return it in USD
    return this.ReturnAmountUSD ? returnAmountUSD * 89000 : returnAmountUSD;
  }
  
  

  private handleKeyboardInput() {
    if (this.input) {
      if(this.keyboardValue=="del"){
        this.handedLBP>9?this.handedLBP = parseInt(this.handedLBP.toString().slice(0, -1), 10):this.handedLBP=0;
     }
        else {
          this.handedLBP = parseInt(this.handedLBP.toString() + this.keyboardValue, 10);}
    } else {
      if(this.keyboardValue=="del"){
        this.handedUSD>9?this.handedUSD = parseInt(this.handedUSD.toString().slice(0, -1), 10):this.handedUSD=0;
     }
        else {
          this.handedUSD = parseInt(this.handedUSD.toString() + this.keyboardValue, 10);}
    }
    this.keyboardValue = ""; // Resetting keyboardValue
    this.ordersData.keyboardSubject.next("")
  }




}

