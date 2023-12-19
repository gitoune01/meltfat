
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"



const firebaseConfig = {
  apiKey: "AIzaSyA7GBV-7ucp1-sayQWOvmAXwJW-Yl0VZBc",
  authDomain: "meltfat-app.firebaseapp.com",
  projectId: "meltfat-app",
  storageBucket: "meltfat-app.appspot.com",
  messagingSenderId: "785890974446",
  appId: "1:785890974446:web:4299878e374ac5de0cf1ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)