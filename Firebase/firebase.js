// src/Firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwFZod1tdUdm3yrAYehL0dA2J3zVRgpbI",
  authDomain: "papapetotp.firebaseapp.com",
  projectId: "papapetotp",
  storageBucket: "papapetotp.firebasestorage.app",
  messagingSenderId: "835956404482",
  appId: "1:835956404482:web:53cead71acb0a2e175921b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
