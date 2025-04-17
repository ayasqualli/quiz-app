<template>
    <div class="bigbro">
      <div class="page-container"></div>
      <div class="flexy">
        <div class="form-container">
          <form @submit.prevent="loginUser" class="form">
            <div class="title">
              <h1>Log-in</h1>
            </div>
            <div class="form-group">
              <label>EMAIL</label>
              <input type="email" v-model="email" required />
            </div>
            <div class="form-group">
              <label>PASSWORD</label>
              <input type="password" v-model="password" required />
            </div>
            <button type="submit">SIGN IN</button>
            <div class="signup-prompt">
              <p class="signup-text">
                Create an account
                <router-link to="/signup" class="signup-link">Sign up</router-link>
              </p>
            </div>
            <router-link to="/Forgot" class="forgot-password">Forgot Password?</router-link>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { loginWithEmailAndPassword } from "../firebase-config";
  
  export default {
    name: 'Signin',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      async loginUser() {
        try {
          console.log('Attempting to login with email:', this.email);
          await loginWithEmailAndPassword(this.email, this.password);
          console.log('Login successful, redirecting to profile');
          this.$router.push("/Profile");
        } catch (error) {
          console.error('Login error:', error);
          if (error.code === "auth/wrong-password") {
            console.warn('Wrong password detected');
            alert("Wrong password. Redirecting to reset page...");
            this.$router.push("/Forgot");
          } else if (error.code === "auth/user-not-found") {
            console.warn('User not found');
            alert("User not found.");
          } else {
            console.error('Unexpected error:', error);
            alert("Error: " + error.message);
          }
        }
      }
    }
  }
</script>
