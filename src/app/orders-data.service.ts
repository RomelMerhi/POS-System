import { Injectable } from '@angular/core';
import { getDatabase, ref, onValue, child, get, set, remove } from 'firebase/database';
import { Observable, Subject } from 'rxjs';
import "firebase/compat/database";



@Injectable({
  providedIn: 'root'
})
export class OrdersDataService {

  public ordersSubject: Subject<any[]> = new Subject<any[]>();
  public allOrdersSubject: Subject<any[]> = new Subject<any[]>();
  public ordersDineInSubject: Subject<any[]> = new Subject<any[]>();
  public ordersDeliverySubject: Subject<any[]> = new Subject<any[]>();
  orders$: Observable<any[]> = this.ordersSubject.asObservable();
  public userSubject: Subject<any[]> = new Subject<any[]>();
  public ordersTKWSubject: Subject<any[]> = new Subject<any[]>();
  public ordersByDateSubject: Subject<any[]> = new Subject<any[]>();
  public dailyTotalSubject: Subject<any> = new Subject<any>();
  public UserSubject: Subject<any> = new Subject<any>();
  public UserNameSubject: Subject<any> = new Subject<any>();
  public receiptSubject: Subject<any> = new Subject<any>();

  cashierSelectedOrderSubject: Subject<any> = new Subject<any>();

  keyboardSubject: Subject<string> = new Subject<string>();
  selectedOrder: any;

  username: string = "";

  constructor() { }

  ngOnInit() {


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
    this.readOrders();


  }

  updateSelectedCashierOrderID(orderID: number): void {
    this.getOrder(orderID);
  }


  UpdateOrder(orderID: number, items: any, Total: number) {
    const db = getDatabase();
    const reference = ref(db, '/users/Orders/' + orderID + '/Items');
    const reference2 = ref(db, '/users/Orders/' + orderID + '/Total');

    const itemData: any =   items;
    set(reference, itemData);
    set(reference2, Total);
  }

  getOrder(ID: number): void {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/Orders/' + ID)).then((snapshot) => {
      if (snapshot.exists()) {
        const selectedOrder = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
        this.cashierSelectedOrderSubject.next(selectedOrder);
      }
    }).catch((error) => {
      console.error(error);
      // Handle error
    });
  }

  userRights:any;
  getUserRights(User:any){
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/Users/' + User)).then((snapshot) => {
      if (snapshot.exists()) {
        this.userRights = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
        console.log(this.userRights)
      }
    }).catch((error) => {
      console.error(error);
      // Handle error
    });
  }
  
  getReceiptItem(ID: number): void {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/Orders/' + ID)).then((snapshot) => {
      if (snapshot.exists()) {
        const selectedOrder = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
        this.receiptSubject.next(selectedOrder);
      }
    }).catch((error) => {
      console.error(error);
      // Handle error
    });
  }


  readOrdersByDate(date: any): void {
    const DateTimestamp = new Date(date).setHours(0, 0, 0, 0); // Get the provided date's timestamp at midnight
    const dbRef = ref(getDatabase());
    const path = child(dbRef, 'users/Orders');

    onValue(path, (snapshot) => {
      const orders = snapshot.val() ? Object.keys(snapshot.val()).map(key => snapshot.val()[key]) : [];

      // Filter orders to get only orders of the specified date
      const ordersOfDate = orders.filter(order => {
        const orderTimestamp = new Date(order.Time).setHours(0, 0, 0, 0); // Get order's timestamp at midnight
        return orderTimestamp === DateTimestamp && order.Paid === false;
      });

      this.ordersByDateSubject.next(ordersOfDate);
    });
  }

  dailyTotal: number = 0;



  readOrders(): void {
    const todayTimestamp = new Date().setHours(0, 0, 0, 0); // Get today's timestamp at midnight
    const dbRef = ref(getDatabase());
    const path = child(dbRef, 'users/Orders');
    onValue(path, (snapshot) => {
      const orders = snapshot.val() ? Object.keys(snapshot.val()).map(key => snapshot.val()[key]) : [];


      // Filter orders to get only orders of today
      const ordersOfToday = orders.filter(order => {
        const orderTimestamp = new Date(order.Time).setHours(0, 0, 0, 0); // Get order's timestamp at midnight
        return orderTimestamp == todayTimestamp && order.Paid == false;
      });
      this.ordersSubject.next(ordersOfToday);

      

      // Filter orders to get only orders of today
      // const allOrders = snapshot.val() ? Object.keys(snapshot.val()).map(key => snapshot.val()[key]) : [];
      const allOrders2 = orders.filter(order => {
        const orderTimestamp = new Date(order.Time).setHours(0, 0, 0, 0); // Get order's timestamp at midnight
        return orderTimestamp == todayTimestamp;

      });
      this.allOrdersSubject.next(allOrders2);

      // ordersOfToday.forEach(element => { this.dailyTotal = this.dailyTotal + element.Total });
      // // console.log("Dailyyy",this.dailyTotal);
      // this.dailyTotalSubject.next(this.dailyTotal);

      // Filter orders to get only orders Dine In
      const ordersDineIn = orders.filter(order => {
        const orderTimestamp = new Date(order.Time).setHours(0, 0, 0, 0); // Get order's timestamp at midnight
        return orderTimestamp == todayTimestamp && order.OrderType == "Dine In" && order.Paid == false;
      });
      this.ordersDineInSubject.next(ordersDineIn);
      console.log("Dine in:", ordersDineIn)


      // Filter orders to get only orders Dine In
      const ordersDelivery = orders.filter(order => {
        const orderTimestamp = new Date(order.Time).setHours(0, 0, 0, 0); // Get order's timestamp at midnight
        return orderTimestamp == todayTimestamp && order.OrderType == "Delivery" && order.Paid == false;
      });
      this.ordersDeliverySubject.next(ordersDelivery);


      const ordersTKW = orders.filter(order => {
        const orderTimestamp = new Date(order.Time).setHours(0, 0, 0, 0); // Get order's timestamp at midnight
        return orderTimestamp == todayTimestamp && order.OrderType == "Take Away" && order.Paid == false;
      });
      this.ordersTKWSubject.next(ordersTKW);

    });
  }



  sendItem(name: string, description: string, price: string, ingredients: string, category: string, image: string) {
    const db = getDatabase();
    const reference = ref(db, '/users/Categories/' + category + "/" + name);
    const itemData: any = {
      Category: category,
      Description: description,
      Ingredient: ingredients,
      Name: name,
      Price: price,
      Image: image
    }
    set(reference, itemData)

  }

  userData: any;
  user: any = "";
  async checkLogin(Username: any, Password: string): Promise<string> {
    const dbRef = ref(getDatabase());
    const path = child(dbRef, 'users/Users/' + Username);

    try {
      const snapshot = await get(path);
      if (snapshot.exists() && snapshot.val()) {
        this.userData = snapshot.val();
        if (this.userData.Username == Username && this.userData.Password == Password) {
          this.UserNameSubject.next(this.userData.Username);
          this.user = this.userData.Username;
          this.getUserRights(this.user);
          console.log(Username, this.userData.Username)
          return "right user right pass";
        } else if (this.userData.Username == Username && this.userData.Password != Password) {
          return "right user wrong pass";
        } else {
          return "wrong user wrong pass";
        }
      } else {
        return "error";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  Categories: any;
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

  sendUsers(Username: string, Password: string, cashier: boolean, admin: boolean, waiter: boolean) {
    const db = getDatabase();
    const reference = ref(db, '/users/Users/' + Username);
    const itemData: any = {
      Username: Username,
      Password: Password,
      cashier: cashier,
      admin: admin,
      waiter: waiter
    }
    set(reference, itemData)
  }

  deleteOrder(orderID: string): void {
    const db = getDatabase();
    const orderRef = ref(db, `users/Orders/${orderID}`);
    
    remove(orderRef)
      .then(() => {
        // console.log(`Order with ID ${orderID} deleted successfully.`);
        // You can add additional logic here, such as updating the UI or notifying the user
      })
      .catch((error) => {
        console.error(`Error deleting order with ID ${orderID}:`, error);
      });
  }


  deleteUser(user: string): void {
    const db = getDatabase();
    const orderRef = ref(db, 'users/Users/' + user);

    remove(orderRef)
      .then(() => {
        console.log(`Order with ID ${user} has been deleted successfully.`);
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
      });
  }


  sendUsersSaved(Username: string, cashier: boolean, admin: boolean, waiter: boolean) {
    const db = getDatabase();
    const reference = ref(db, '/users/Users/' + Username);
    const itemData: any = {
      Username: Username,
      cashier: cashier,
      admin: admin,
      waiter: waiter
    }
    set(reference, itemData)
  }

  showAdmin: boolean = false;
  setAdminRights() {
    this.showAdmin = !this.showAdmin;
  }

  menu: any;
  getcategoryItems(category: string) {
    const dbRef = ref(getDatabase());
    const path = child(dbRef, 'users/Categories' + category);
    onValue(path, (snapshot) => {
      this.menu = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
    });
  }

  users: any[] = [];

  getUsers() {
    const dbRef = ref(getDatabase());
    const path = child(dbRef, 'users/Users');

    onValue(path, (snapshot) => {
      if (snapshot.exists()) {
        // Data exists, parse and store it
        this.users = Object.values(snapshot.val());
        this.UserSubject.next(this.users);
        console.log('Users:', this.users);
      } else {
        // Data does not exist or is null
        console.log('No users found.');
      }
    }, (error) => {
      // Handle errors
      console.error('Error fetching users:', error);
    });
  }

}




