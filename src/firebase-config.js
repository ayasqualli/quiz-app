// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile , setPersistence, browserLocalPersistence, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";

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
const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to Local");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in:", user);
      // You can fetch additional user data from Firestore here
    } else {
      console.log("No user is signed in");
    }
  });

const registerWithEmailAndPassword = async (email, password,username) => {
  if (!email || !password) {
    console.error("Email and password must be provided.");
    throw new Error("Email and password are required.");
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
    const user = result.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      // If the user doesn't exist in Firestore, create a new document
      await setDoc(userDocRef, {
        name: user.displayName,
        email: user.email,
        username: user.email.split('@')[0],  // You can set the username to the part before '@' if needed
        createdAt: new Date(),
      });
      console.log("User profile created in Firestore");
    } else {
      console.log("User profile already exists in Firestore");
    }

    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
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
sendPasswordResetEmail ,
verifyResetCode,
confirmReset
};