import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';


@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.scss'],
  
})
export class OrdersAdminComponent implements OnInit {

  constructor(private ordersData: OrdersDataService) { }

  ngOnInit() {

this.users=this.ordersData.users
console.log("testtttttt",this.users)

this.ordersData.userSubject.subscribe(selected => {
  this.users = selected;
});
  }


  username:string="";
  cashier:boolean=false
  waiter:boolean=false
  admin:boolean=false
  password:string=""
  
  users:any;
sendUser(){
  this.ordersData.sendUsers(this.username,this.password,this.cashier,this.admin,this.waiter)
} 


usernameS:string="";
  cashierS:boolean=false
  waiterS:boolean=false
  adminS:boolean=false
sendUsersaved(){
  this.ordersData.sendUsersSaved(this.username,this.cashier,this.admin,this.waiter)
}



}
