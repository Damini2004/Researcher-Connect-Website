// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC8LgKniTvYPWzjNWJzANugcjeXaotA8K0",
  authDomain: "researcher-connect-9546c.firebaseapp.com",
  projectId: "researcher-connect-9546c",
  storageBucket: "researcher-connect-9546c.firebasestorage.app",
  messagingSenderId: "442468417201",
  appId: "1:442468417201:web:305d714f100979f5cf6c90",
  measurementId: "G-XP0KPYLZJ4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics if supported
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, db, storage, analytics };
