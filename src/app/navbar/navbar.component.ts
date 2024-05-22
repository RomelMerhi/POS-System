import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';
import { Router } from '@angular/router';
import { Tab2Page } from '../tab2/tab2.page';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {

  constructor(private ordersData: OrdersDataService, private router: Router, public tab2:Tab2Page) {}

  ngOnInit() {

    // this.ordersData.keyboardSubject.subscribe(selected => {
    //   this.Username = selected;
    // });

// this.redirect();

  }

  Username: string = "";



adminRights(){
 this.tab2.setAdminRights()
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
