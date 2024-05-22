import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';
import { getDatabase, ref, child, update } from 'firebase/database';


@Component({
  selector: 'app-pay-change-admin',
  templateUrl: './pay-change-admin.component.html',
  styleUrls: ['./pay-change-admin.component.scss'],
})
export class PayChangeAdminComponent  implements OnInit {

    constructor(private ordersData: OrdersDataService) { }

    ngOnInit() {
  
  this.users=this.ordersData.users
  console.log("testtttttt",this.users)
  
  this.ordersData.UserSubject.subscribe(selected => {
    this.users = selected;
  });
    }
  
  userNb:number=0;
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

  deleteUser(user:string){
    this.ordersData.deleteUser(user)
  }
  
  updateUserNb(point:number){
    if(point<0&&this.userNb==0){}else
    this.userNb=this.userNb+point;
  }
  
  }
  