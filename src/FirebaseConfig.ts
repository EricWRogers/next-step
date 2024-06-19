import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { Database, getDatabase, ref, onValue, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDzZy7TXQXD372sHs_mq5xljnZbuxWzZcg",
  authDomain: "next-step-prototype.firebaseapp.com",
  databaseURL: "https://next-step-prototype-default-rtdb.firebaseio.com",
  projectId: "next-step-prototype",
  storageBucket: "next-step-prototype.appspot.com",
  messagingSenderId: "743716419681",
  appId: "1:743716419681:web:38dd969d585161b1c1d220",
  measurementId: "G-9VZECREW5B"
};

var userData = {
    firstName: "",
    lastName: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database : Database = getDatabase(app);

export { auth, database, ref, onValue, set, userData };