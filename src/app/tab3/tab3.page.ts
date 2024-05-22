import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  orders: any;

  constructor(private ordersData: OrdersDataService) {

  
}
}