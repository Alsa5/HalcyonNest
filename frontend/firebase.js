import { initializeApp } from  "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuIfx6tF8f5-IkJFQEt5hp2AFPjuQFK_o",
  authDomain: "halcyonnest-282c2.firebaseapp.com",
  projectId: "halcyonnest-282c2",
  storageBucket: "halcyonnest-282c2.firebasestorage.app",
  messagingSenderId: "841730946976",
  appId: "1:841730946976:web:a9867d4854fb59b5acd6c5",
  measurementId: "G-QPCYXQQLES"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db  };