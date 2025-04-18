// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { sendPasswordResetEmail, verifyPasswordReserCode, verifyPassworReset, getAuth, createUserWithEmailAndPassword, signInWithmailAndPassword, GoogleAuthProvider, signIWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUoOm7Eu2tWkK2UzpuoPnXZX3wFHfhQiY",
  authDomain: "quizzmania-app.firebaseapp.com",
  projectId: "quizzmania-app",
  storageBucket: "quizzmania-app.firebasestorage.app",
  messagingSenderId: "380966396645",
  appId: "1:380966396645:web:7e8e4dd85915ce0ad9aa0c",
  measurementId: "G-X7HCZSVB3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvier = new GoogleAuthProvider();