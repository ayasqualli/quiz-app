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

<style scoped>
.user-profile {
  max-width: 500px;
  margin: 40px auto;
  background-color: #fff8f0;
  border: 1px solid #e0cbb3;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(102, 51, 0, 0.15);
  font-family: 'Segoe UI', sans-serif;
}

.user-profile h2 {
  text-align: center;
  color: #7c3e0c;
  margin-bottom: 20px;
}

.user-profile label {
  display: block;
  margin: 12px 0 6px;
  color: #8b5e3c;
  font-weight: bold;
}

.user-profile input,
.user-profile textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d6b18e;
  border-radius: 6px;
  background-color: #fffdfb;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.user-profile input:focus,
.user-profile textarea:focus {
  border-color: #c77932;
  outline: none;
}

.user-profile button {
  margin-top: 20px;
  background-color: #d2691e;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.user-profile button:hover {
  background-color: #b55e15;
}
</style>
  