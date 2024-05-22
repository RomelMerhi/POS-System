import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'App-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private ordersData: OrdersDataService, private router: Router) { }

  ngOnInit() { }

  Username: string = ""
  Password: string = ""
  loginMessage: string = "";

  async loginValid() {
    try {
      const loginStatus = await this.ordersData.checkLogin(this.Username, this.Password);
  
      if (loginStatus === "right user right pass") {
        // this.router.navigate(['/waiter']);
        this.router.navigate(['/waiter',{data:this.Username}])
      } else {
        this.loginMessage = "Incorrect Username or Password";
      }
    } catch (error) {
      console.error("Error during login:", error);
      this.loginMessage = "Error during login. Please try again later.";
    }
  }
  }
