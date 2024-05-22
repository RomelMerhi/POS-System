import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersDataService } from '../orders-data.service';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  constructor(private route: ActivatedRoute, public ordersData: OrdersDataService) { }

  ngOnInit() {
    // Extract query parameters
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      console.log('Query Params:', params);
    });

    // Extract route parameters (if any)
    this.route.params.subscribe(params => {
      // For example, if you had a route like /receipt/:id
      this.orderId = params;
      console.log('Route Params:', params);
    });

    this.orderId = this.orderId.ID
    console.log("test", this.orderId)

    this.ordersData.getReceiptItem(this.orderId)

    this.ordersData.receiptSubject.subscribe(selected => {
      this.items = selected;
      console.log("eeee", this.items)
      this.name = this.items[0]
      this.Time= this.items[10];
      this.products=this.items[2];
      this.Total=this.items[11];
      this.orderType=this.items[6];
      

    });




  }

Time:any;
  products: any;
  Total: any;
  orderType: any;
  name: any;
  orderId: any;
  items: any;
}
