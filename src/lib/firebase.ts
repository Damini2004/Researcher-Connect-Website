// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAojn8bWZM_s19xhK9kn8F0CpB0JcW2bjA",
  authDomain: "journellisting.firebaseapp.com",
  projectId: "journellisting",
  storageBucket: "journellisting.firebasestorage.app",
  messagingSenderId: "96866013897",
  appId: "1:96866013897:web:5d3d2ad16b83610b907318",
  measurementId: "G-30NMKYLKQG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
