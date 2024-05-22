import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrdersDataService } from '../orders-data.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  providers: [DatePipe]
})
export class AdminPage implements OnInit {

  constructor(private datePipe: DatePipe, public ordersData:OrdersDataService) {

   }

  ngOnInit() {

    this.updateTime();//keeps time updated
this.user=this.ordersData.user
  }

  user:any;
usersItems=true;

setUsersItems(option:boolean){
this.usersItems=option;
}

currentDate:any;

updateTime() {
  setInterval(() => {
    this.currentDate = new Date();
  }, 1000);
}

}
