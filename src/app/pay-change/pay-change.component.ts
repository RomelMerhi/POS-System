import { Component, OnInit } from '@angular/core';
import { OrdersDataService } from '../orders-data.service';
import { getDatabase, ref, child, update } from 'firebase/database';

@Component({
  selector: 'app-pay-change',
  templateUrl: './pay-change.component.html',
  styleUrls: ['./pay-change.component.scss'],
})
export class PayChangeComponent implements OnInit {
  inputValue: string = "";

  constructor(private ordersData: OrdersDataService) { }

  ngOnInit() {
    // Subscribe to changes in inputValue
    this.ordersData.keyboardSubject.next(this.inputValue);

    this.ordersData.cashierSelectedOrderSubject.subscribe(selected => {
      this.selectedOrder=selected;
      console.log("try:" + this.selectedOrder)
        });

  }

selectedOrder:any;

  onKeyPress(button: string) {
    this.inputValue = button;
    // Update the subject with the new inputValue
    this.ordersData.keyboardSubject.next(this.inputValue);
  }

  updatePaidStatus() {
    const dbRef = ref(getDatabase());
    const path = child(dbRef, 'users/Orders/' + this.selectedOrder[1]);

    // Update the 'Paid' status to true
    update(path, { Paid: true })
      .then(() => {
        console.log("Paid status updated successfully for order with ID:", this.selectedOrder[1]);
      })
      .catch((error) => {
        console.error("Error updating paid status for order with ID:", this.selectedOrder[1], "Error:", error);
      });
  }
}
