import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, get, child, set, onValue } from 'firebase/database';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrdersDataService } from '../orders-data.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [DatePipe]
})
export class Tab1Page implements OnInit {

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private ordersData: OrdersDataService) {

    this.Data = [];
  }



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


this.username=this.ordersData.user; 


    this.readOrders();
    this.read(); //fits menu into array
    this.readCategories(20); //output the categories in the segment
    this.updateTime();//keeps time updated
    
    // this.filterOrdersByUser();
  }
  username: any = "";

  Categories: any;
  menu: any;

  //menu display
  Data: any[];
  storedValue: string = "Drink";

  StackedOrder = [];

  Orders: any;
  employeeOrders: any[] = [];
  displaySideBar = 'Menus';

  //order info
  orderID: number = 0;
  CurrentOrder: any[] = [];
  currentDate: any = "";
  selectedOrder: any = "";
  customerName: String = "";
  orderTime: number = 0;
  orderType: string = "Take Away";
  note: string = "";
  CurrentOrderTotal: number = 0;
  TVA: number = 0;
  status: string = "Processing";

  //Location info

  Location = {
    region: "",
    street: "",
    building: "",
    floor: 0
  };

  Table: string = "";

  updateTime() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  readCategories(MenuID: number) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/Categories/All-Categories')).then((snapshot) => {
      if (snapshot.exists()) {
        // Convert the response to an array of objects
        this.Categories = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  getcategoryItems(category: string) {
    const dbRef = ref(getDatabase());
    const path = child(dbRef, 'users/Categories' + category);
    onValue(path, (snapshot) => {
      this.menu = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
    });
  }


  //read the order branch and stores it in array "Orders" Actively updated
  readOrders() {
    const dbRef = ref(getDatabase());

    const path = child(dbRef, 'users/Orders');
    onValue(path, (snapshot) => {
      this.Orders = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
      this.ordersSorted()
    });


  }

  ordersSorted() {
    const dbRef = ref(getDatabase());
    const path = child(dbRef, 'users/Orders');

    onValue(path, (snapshot) => {
      if (snapshot.exists()) {
        const ordersObj = snapshot.val();
        // Convert orders object to array
        const ordersArray = Object.keys(ordersObj).map(key => ordersObj[key]);
        // Filter orders based on username
        const todayTimestamp = new Date().setHours(0, 0, 0, 0); // Get today's timestamp at midnight
        this.Orders = ordersArray.filter(order => {
          const orderTimestamp = new Date(order.Time).setHours(0, 0, 0, 0);
          return order.By == this.username && order.Paid==false && orderTimestamp==todayTimestamp});
      } else {
        console.log("No data available");
        this.Orders = [];
      }
    }, (error) => {
      console.error(error);
    });
  
   }


  sidebarChange(button: string) {
    this.displaySideBar = button;
    // this.ResetCurrentOrder();
  }

  selectCategory(category: string) {
    this.storedValue = category;
    this.read();
  }

  ResetCurrentOrder() {
    this.CurrentOrder = [];
    this.CurrentOrderTotal = 0;
    this.itemCount=this.countItems();
  }

  getOrder(ID: number) {
    this.ResetCurrentOrder()
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/Orders/' + ID)).then((snapshot) => {
      if (snapshot.exists()) {
        // Convert the response to an array of objects
        this.selectedOrder = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
        this.CurrentOrder = this.selectedOrder[2];
        this.sidebarChange("selectedOrder");
        this.orderID = ID;
        this.itemCount=this.countItems();
        this.GetTotal();
      }

    }).catch((error) => {
      console.error(error);
    });

  }

itemCount:any;

countItems(): {}[] {
  // Create an array to store item objects
  const itemObjects: { itemName: string, quantity: number, price: number }[] = [];

  // Create a map to keep track of item counts and prices
  const itemDetails: Map<string, { quantity: number, price: number }> = new Map();

  // Loop through the current order array
  this.CurrentOrder.forEach(item => {
    // Extract the item details
    const itemName = item.ItemName;
    const itemPrice = item.Price;

    // If the item name exists in the itemDetails map, update its quantity and price
    // Otherwise, initialize its quantity to 1 and set its price
    if (itemDetails.has(itemName)) {
      const currentDetails = itemDetails.get(itemName)!;
      itemDetails.set(itemName, { quantity: currentDetails.quantity + 1, price: currentDetails.price  });
    } else {
      itemDetails.set(itemName, { quantity: 1, price: itemPrice });
    }
  });

  // Convert the map to an array of objects
  itemDetails.forEach(({ quantity, price }, itemName) => {
    itemObjects.push({ itemName, quantity, price });
  });

  // Return the array of item objects
  return itemObjects;
}

  //get menu from database and store it in array Always actively Updated
  read() {
    const dbRef = ref(getDatabase());
    const path = child(dbRef, 'users/Categories/' + this.storedValue);
    onValue(path, (snapshot) => {
      this.Data = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
    });
  }

  setOrderType(Type: string) {
    this.orderType = Type;
  }

  generateID() {
    this.sidebarChange('New');
    this.orderID = new Date().getTime();
    this.ResetCurrentOrder()
    this.orderTime = new Date().getTime();
this.ResetCurrentOrder()
  }

  CreateOrder() {
    const db = getDatabase();
    const reference = ref(db, '/users/Orders/' + this.orderID);
    const itemData: any = {
      ID: this.orderID,
      Name: this.customerName,
      OrderType: this.orderType,
      Table: this.Table,
      Items: this.CurrentOrder ? this.CurrentOrder : false,
      Total: this.CurrentOrderTotal,
      TVA: this.TVA,
      Time: this.orderTime,
      Location: this.Location,
      Note: this.note,
      By: this.username,
      Paid:false
    }

    set(reference, itemData)
  }
  
  GetTotal() {
    this.CurrentOrderTotal = 0;
    let iteration = this.CurrentOrder.length;
    for (let i = 0; i < iteration; i++) {
      // Parse the Price to a number before adding it to the total
      this.CurrentOrderTotal += parseFloat(this.CurrentOrder[i].Price);
    }
  }

  AddToOrder(ItemName: string, Price: number) {
    if (!this.CurrentOrder) { this.CurrentOrder = [] }
    this.CurrentOrder.push({ ItemName, Price });
    this.GetTotal();
    this.itemCount=this.countItems();
    console.log(this.itemCount)
  }


  UpdateOrder() {
    const db = getDatabase();
    const reference = ref(db, '/users/Orders/' + this.orderID +'/Items');

    const itemData: any = 
      this.CurrentOrder;

    set(reference, itemData)
  }

  StackItems() {
    this.CurrentOrder.forEach((item) => {

    })
  }

  DeleteItem(itemName: any) {
    let i = 0;
    while (itemName != this.CurrentOrder[i].ItemName) {
      i += 1;
    }
    this.CurrentOrder.splice(i, 1);

    this.itemCount=this.countItems();
    this.GetTotal();
  }
  

}
