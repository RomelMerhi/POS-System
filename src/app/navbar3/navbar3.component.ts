import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar3',
  templateUrl: './navbar3.component.html',
  styleUrls: ['./navbar3.component.scss'],
})

export class Navbar3Component implements OnInit {

  constructor(private ordersData: OrdersDataService, private router: Router) {}

  ngOnInit() {


    //  this.ordersData.userSubject.subscribe(selected => {
    //      this.user = selected;
        
    //    });
  }

  Username: string = this.ordersData.user;
user:any;

adminRights(){
 this.ordersData.setAdminRights()
 console.log("i work")
}


    redirect() {
      try {
        
    
     
          // this.router.navigate(['/waiter']);
          this.router.navigate(['/waiter',{data:this.Username}])
         
        }
       catch (error:any) {
        console.error("Error during login:", error);
      }
    }
      
}
