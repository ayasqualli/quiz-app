// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile , setPersistence, browserSessionPersistence  } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv6LDNrYO63P3cp0MbK89JDt5A_o7D-oY",
  authDomain: "forum-app-f6240.firebaseapp.com",
  projectId: "forum-app-f6240",
  storageBucket: "forum-app-f6240.firebasestorage.app",
  messagingSenderId: "215047096908",
  appId: "1:215047096908:web:1a35a6332e1a1855acc2e9",
  measurementId: "G-W7DBFQXLRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// Function for email/password registration
const registerWithEmailAndPassword = async (email, password, username) => {
    if (!email || !password ||!username) {
      console.error("Email, password and username must be provided.");
      throw new Error("All fields are required.");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });
      console.log("User registered with display name:", user.displayName);
      return user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
};

// Function for email/password login
const loginWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
      console.error("Email and password must be provided.");
      throw new Error("Email and password are required.");
    }
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
};
  
// Function for Google sign-in
const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent. Please check your inbox.");
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    throw error;
  }
};
  
// Verifies the token in reset email
const verifyResetCode = async (oobCode) => {
  return await verifyPasswordResetCode(auth, oobCode);
};

// Updates the password
const confirmReset = async (oobCode, newPassword) => {
  return await confirmPasswordReset(auth, oobCode, newPassword);
};
export {
  db,
  auth,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  signInWithGoogle,
  sendPasswordReset,
  verifyResetCode,
  confirmReset
};