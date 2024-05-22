import { Component, OnInit} from '@angular/core';
import { getDatabase, ref, set } from 'firebase/database';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrdersDataService } from '../orders-data.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [DatePipe]
})
export class Tab2Page {

  ngOnInit() {
    // Firebase configuration

    const firebaseConfig = {
      apiKey: "AIzaSyCcuxInGoGAg4-zA7qhFfxlP9plg7Kc9kI",
      authDomain: "pos-system-romel.firebaseapp.com",
      databaseURL: "https://pos-system-romel-default-rtdb.firebaseio.com",
      projectId: "pos-system-romel",
      storageBucket: "pos-system-romel.appspot.com",
      messagingSenderId: "487246398557",
      appId: "1:487246398557:web:c4a865229d40b36fea79b4",
      measurementId: "G-QB2NFBVR70"
    };

    this.show=false;

    // this.ordersData.userSubject.subscribe(selected => {
    //   this.user = selected;
      
    // });

    this.updateTime();//keeps time updated
    
this.user=this.ordersData.user;

  }

user:any;
show:boolean=false;
MenuID:number=21;
Name:string="romel";
Category:string="e";
Description:string="e";

  constructor(private datePipe: DatePipe,private route: ActivatedRoute, public ordersData:OrdersDataService) {
  }

  currentDate: any = "";
  
  // user:any=this.ordersData.user;

  updateTime() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

setAdminRights(){
  this.show=!this.show;
}

uploadMenuItem(MenuID:number, Name: string, Category: string, Description: string): void {
    const db = getDatabase();
    const reference = ref(db, '/users/Categories/Burger/'+Name);

    const itemData: any = {
      Name: Name,
      Ingredient:"eww",
      Description: Description
    };

    set(reference, itemData)

  }




}  



