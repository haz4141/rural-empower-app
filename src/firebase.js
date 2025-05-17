// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore added

const firebaseConfig = {
  apiKey: "AIzaSyCa5lMK92WxpgFKxE9gcu-J0220yknWkfI",
  authDomain: "ruralempowerapp.firebaseapp.com",
  projectId: "ruralempowerapp",
  storageBucket: "ruralempowerapp.firebasestorage.app",
  messagingSenderId: "591816725706",
  appId: "1:591816725706:web:c0ecfe406cb7a5abfcd033",
  measurementId: "G-JQVWYMEME2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
