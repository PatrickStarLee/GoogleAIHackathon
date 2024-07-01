//import firebase from "firebase/compat/app";
// import firebase from 'firebase/app';
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from  "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9RjIHR2DXTK3LzarFnTuUEZXE3Qygud0",
  authDomain: "foodmanager-e9df0.firebaseapp.com",
  projectId: "foodmanager-e9df0",
  storageBucket: "foodmanager-e9df0.appspot.com",
  messagingSenderId: "267538504762",
  appId: "1:267538504762:web:a1bd89521ac5a48b68a903",
  measurementId: "G-EMLMT2M42L",
};

//initialize firebase
const app = initializeApp(firebaseConfig);

//initialize firestore
export const db = getFirestore(app);

//initialize authentication
export const auth = getAuth(app);