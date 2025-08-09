// src/Firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVXIFnMit0alyQlVTDzgFegPQshq1Coy0",
  authDomain: "otp-e6177.firebaseapp.com",
  projectId: "otp-e6177",
  storageBucket: "otp-e6177.firebasestorage.app",
  messagingSenderId: "612964557134",
  appId: "1:612964557134:web:501e69f05a1ec5ba94fe1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
