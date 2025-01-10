// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_poIsTTq8MU0NANwqcnK5Tdjh1RDG8Y4",
    authDomain: "anonymous-vows-727d7.firebaseapp.com",
    databaseURL: "https://anonymous-vows-727d7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "anonymous-vows-727d7",
    storageBucket: "anonymous-vows-727d7.firebasestorage.app",
    messagingSenderId: "537414693429",
    appId: "1:537414693429:web:add0f207df29f3aa4ef77c"
  };;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

export { db };