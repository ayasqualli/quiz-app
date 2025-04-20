<template>
  <div class="container">
    <div class="header">
      <div class="profile">
        <router-link to="/Profile"><img src="/profile.png" alt="Profile Picture" /></router-link>
        <label>{{ username || 'Name' }}</label>
      </div>
      <button class="logout-btn" @click="logout">Log Out</button>
    </div>
    <div>
      <router-link to="/create-quiz">CREATE QUIZ</router-link>
      <router-link to="/quizzes">QUIZZES</router-link>
    </div>

    <div style="display:flex; flex-direction:row; gap:20px; justify-content:space-between;">
      <div>
      <h3>MY QUIZZES</h3>
      <myquizzes />
      </div>

      <div ref="taken_quizzes">
        <h3>TAKEN QUIZZES</h3>
        <takenQuizzes />
      </div>

      <div ref="myscores">
        <h3>MY SCORES</h3>
        <myscores />
      </div>
    </div>
    
  </div>
</template>

<script>
import myquizzes from '../components/myquizzes.vue';
import myscores from '../components/myscores.vue';
import takenQuizzes from '../components/takenQuizzes.vue';
import { getAuth, signOut } from 'firebase/auth';

export default {
  name: 'Home',
  components: {
    myquizzes,
    myscores,
    takenQuizzes
  },
  data() {
    return {
      username: ''
    };
  },
  mounted() {
    const user = getAuth().currentUser;
    if (user) {
      this.username = user.displayName || user.email;
    }
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push('/');
      });
    }
  }
};
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  background-color: #fffaf3; /* Soft cream background */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5e6d7; /* Warm beige */
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(166, 122, 81, 0.2);
}

.profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #e1a95f;
  background-color: #fff;
}

.profile label {
  font-size: 16px;
  font-weight: bold;
  color: #6e4b3a;
}

.logout-btn {
  padding: 10px 18px;
  background-color: #d2691e; /* Autumn orange */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #a34700;
}

.router-link-active,
a {
  display: inline-block;
  margin: 5px 10px;
  padding: 10px 16px;
  background-color: #f4c784; /* Soft pumpkin */
  color: #4a2e1e;
  text-decoration: none;
  font-weight: 500;
  border-radius: 6px;
  transition: background-color 0.3s;
}

a:hover {
  background-color: #e3ac56;
}

h3 {
  margin-bottom: 10px;
  font-size: 20px;
  color: #7b4f34;
  border-bottom: 2px solid #e3ac56;
  padding-bottom: 4px;
  width: fit-content;
}
button {
  display: inline-block;
  margin: 5px 10px;
  padding: 10px 16px;
  background-color: #f4c784; 
  color: #4a2e1e;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
}

button:hover {
  background-color: #e3ac56;
}


</style>