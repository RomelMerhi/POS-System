import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersDataService } from '../orders-data.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private ordersData: OrdersDataService, private router: Router) {}



}
