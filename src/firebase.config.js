import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyB0of69KG8zPMX4xyUUzxNZOED7kyg_FfU",
  authDomain: "restaurantapp-ffbfd.firebaseapp.com",
  databaseURL: "https://restaurantapp-ffbfd-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-ffbfd",
  storageBucket: "restaurantapp-ffbfd.appspot.com",
  messagingSenderId: "1027048519006",
  appId: "1:1027048519006:web:ecf0d5146fafce8682cbcf",
};


const app = getApps.length>0 ? getApp() :initializeApp(firebaseConfig);
const fireStore = getFirestore(app)
const storage = getStorage(app);

export { app, fireStore, storage}