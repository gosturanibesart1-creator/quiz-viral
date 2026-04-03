import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7YkCHo1z28AA2Kl03DimTIEu1Xfqvbo4",
  authDomain: "quiz-viral.firebaseapp.com",
  projectId: "quiz-viral",
  storageBucket: "quiz-viral.firebasestorage.app",
  messagingSenderId: "1024014858833",
  appId: "1:1024014858833:web:17f00a72ac8e22e56bd670",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);