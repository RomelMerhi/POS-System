import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';

@Component({
  selector: 'app-add-items3',
  templateUrl: './add-items3.component.html',
  styleUrls: ['./add-items3.component.scss'],
})
export class AddItems3Component  implements OnInit {

  constructor(public ordersData:OrdersDataService) { }

  ngOnInit() {}


name:string="";
description:string="";
price:string="";
ingredients:string="";
category:string="";
image:string="";

sendItem(){
this.ordersData.sendItem(this.name,this.description,this.price,this.ingredients, this.category, this.image)
} 

}


