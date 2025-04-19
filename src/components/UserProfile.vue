<template>
    <div class="user-profile">
      <h2>My Profile</h2>
      <form @submit.prevent="updateProfile">
        <label>Name:</label>
        <input v-model="userData.name" />
  
        <label>Email:</label>
        <input v-model="userData.email" disabled />
  
        <label>Bio:</label>
        <textarea v-model="userData.bio" />
  
        <button type="submit">Update</button>
      </form>
    </div>
  </template>
  
  <script>
  import { db, auth } from "../firebase-config";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        userData: {
          name: "",
          email: "",
          bio: ""
        }
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.userData = docSnap.data();
          }
        }
      },
      async updateProfile() {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          await updateDoc(docRef, this.userData);
          alert("Updated Profile");
          this.$router.push("/Home");
        }
      }
    }
  };
  </script>
  