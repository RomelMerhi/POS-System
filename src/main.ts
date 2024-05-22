import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

