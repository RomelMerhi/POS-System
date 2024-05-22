import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';

@Component({
  selector: 'app-orders-admin2',
  templateUrl: './orders-admin2.component.html',
  styleUrls: ['./orders-admin2.component.scss'],
})
export class OrdersAdmin2Component  implements OnInit {

  constructor(private ordersData: OrdersDataService) { }

  ngOnInit() {
    this.fetchOrders();
    this.ordersData.readOrders();

    this.ordersData.getOrder(20);

    this.ordersData.cashierSelectedOrderSubject.subscribe(selected => {
      this.selectedOrder = selected;
    });

    this.ordersData.allOrdersSubject.subscribe(selected => {
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
  selectedDate:Date=new Date();

  fetchOrders() {
    this.ordersData.allOrdersSubject.subscribe(ordersdata => {
      // Perform actions with fetched orders
      this.ordershere = ordersdata;
      console.log('Orders fetched:', this.ordershere);
    })

  }


  deleteOrder(id:any){
    this.ordersData.deleteOrder(id)
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
