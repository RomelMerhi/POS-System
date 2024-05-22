import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';

@Component({
  selector: 'app-cashier-orders',
  templateUrl: './cashier-orders.component.html',
  styleUrls: ['./cashier-orders.component.scss'],
})
export class CashierOrdersComponent implements OnInit {

  constructor(private ordersData: OrdersDataService) { }

  ngOnInit() {
    this.fetchOrders();
    this.ordersData.readOrders();

    this.ordersData.getOrder(20);

    this.ordersData.cashierSelectedOrderSubject.subscribe(selected => {
      this.selectedOrder = selected;
    });

    this.ordersData.ordersSubject.subscribe(selected => {
      this.allOrders = selected;
    });

    this.ordersData.ordersDineInSubject.subscribe(selected => {
      this.ordersDineIn = selected;
    });

    this.ordersData.ordersDeliverySubject.subscribe(selected => {
      this.ordersDelivery = selected;
    });

    this.ordersData.ordersTKWSubject.subscribe(selected => {
      this.ordersTKW = selected;
    });

    this.ordersData.getUsers();

  }

  ordersTKW:any;
  allOrders:any;
  ordershere: any;
  selectedOrder: any;
  segment: string = "All";
  ordersDineIn: any;
  ordersDelivery: any;

  fetchOrders() {
    this.ordersData.ordersSubject.subscribe(ordersdata => {
      // Perform actions with fetched orders
      this.ordershere = ordersdata;
      console.log('Orders fetched:', this.ordershere);
    })

  }


  selectOrder(orderID: number) {
    this.ordersData.updateSelectedCashierOrderID(orderID);
  }

  segmentChange(option: string) {
    if (option == "All") {
      this.ordershere =this.allOrders;
      console.log("done");
    } else if (option == "Dine In") {
      this.ordershere = this.ordersDineIn;
    } else if (option == "Delivery") {
      this.ordershere = this.ordersDelivery;
    } else if (option == "Take Away") {
      this.ordershere = this.ordersTKW;
    }
  }

}