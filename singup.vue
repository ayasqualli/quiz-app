<template>
    <div class="bigbro">
      <div class="page-container"></div>
      <div class="flexy">
        <div class="form-container">
          <form @submit.prevent="submitForm" class="form">
            <div class="title">
              <h1>Sign up</h1>
            </div>
  
            <div class="form-group">
              <label>NAME</label>
              <input type="text" v-model="name" required />
            </div>
  
            <div class="form-group">
              <label>USERNAME</label>
              <input type="text" v-model="username" required />
            </div>
  
            <div class="form-group">
              <label>PASSWORD</label>
              <input type="password" v-model="password" required minlength="8" />
            </div>
  
            <div class="form-group">
              <label>EMAIL</label>
              <input type="email" v-model="email" required />
            </div>
  
            <div class="form-group">
              <label>PROFILE PICTURE</label>
              <input type="file" @change="handleImageUpload" accept="image/*" />
              <img
                v-if="profilePicture"
                :src="profilePicture"
                alt="Preview"
                class="image-preview"
              />
            </div>
  
            <div class="terms">
              <input type="checkbox" v-model="agreeToTerms" required />
              <label>I read and agree to <span>Terms & Conditions</span></label>
            </div>
  
            <button type="submit">CREATE MY ACCOUNT</button>
          </form>
        </div>
      </div>
      <div class="login-prompt">
        Already have an account?
        <RouterLink to="/login">Sign in</RouterLink>
      </div>
    </div>
  </template>
  
  <script>
  import { registerWithEmailAndPassword } from "../firebase-config";
  import { RouterLink } from "vue-router";
  
  export default {
    name: "SignupView",
    components: {
      RouterLink
    },
    data() {
      return {
        name: "",
        username: "",
        email: "",
        profilePicture: "",
        password: "",
        agreeToTerms: false,
      };
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            this.profilePicture = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      validateForm() {
        if (!this.name || !this.username || !this.email || !this.password) {
          alert('Please fill in all required fields');
          return false;
        }
        if (!this.agreeToTerms) {
          alert('You must agree to the terms and conditions.');
          return false;
        }
        return true;
      },
      async submitForm() {
        if (!this.validateForm()) return;
        
        try {
          await registerWithEmailAndPassword(this.email, this.password);
          alert('Registration successful!');
          this.$router.push('/login');
        } catch (error) {
          alert('Registration failed: ' + error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .bigbro {
    overflow: hidden;
  }
  
  .page-container {
    position: absolute;
    overflow: hidden;
    width: 110%;
    height: 120%;
    top: -10%;
    left: -10%;
    background: linear-gradient(to right, #003f5c, #58508d, #bc5090);
  }
  
  .flexy {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100vh;
  }
  
  .form-container {
    width: 40%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    background-color: rgba(216, 216, 216, 0.1);
    backdrop-filter: blur(400%);
    -webkit-backdrop-filter: blur(400%);
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    border: 2px solid transparent;
    transition: border-color 0.3s ease-in;
  }
  
  .form-container:hover {
    border-color: rgb(241, 241, 241);
    box-shadow: 0 0 40px rgba(212, 212, 212, 0.5);
  }
  
  .form {
    width: 60%;
  }
  
  h1 {
    font-size: 60px;
    font-weight: 700;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    letter-spacing: -1px;
    margin-bottom: 20px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    margin: 20px 0;
  }
  
  label {
    font-weight: 600;
    margin-bottom: 5px;
    color: white;
  }
  
  input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    background-color: rgba(255, 255, 255, 0.8);
    transition: border-color 0.3s ease-in-out;
  }
  
  input:focus {
    outline: none;
    border-color: #bc5090;
    box-shadow: 0 0 10px rgba(188, 80, 144, 0.5);
  }
  
  button {
    height: fit-content;
    width: 150px;
    padding: 10px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    color: white;
    background-color: #58508d;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #bc5090;
    transform: translateY(-2px) scale(1.05);
    transition: transform 0.2s ease;
  }
  
  .terms {
    display: flex;
    flex-direction: row;
    align-self: center;
    margin-bottom: 10px;
  }
  
  .image-preview {
    max-width: 200px;
    margin-top: 10px;
    border-radius: 4px;
  }
  
  .login-prompt {
    margin-top: 20px;
    color: white;
  }
  
  .login-prompt a {
    color: #bc5090;
    text-decoration: none;
  }
  
  .login-prompt a:hover {
    text-decoration: underline;
  }
  </style>