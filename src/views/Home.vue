<template>
  <div class="container">
    <div class="header">
      <div class="profile">
        <img src="/profile.png" alt="Profile Picture" />
        <label>{{ username || 'Name' }}</label>
      </div>
      <button class="logout-btn" @click="logout">Log Out</button>
    </div>

    <div>
      <h3>MY QUIZZES</h3>
      <myquizzes />
    </div>

    <div>
      <h3>TAKEN QUIZZES</h3>
      <takenQuizzes />
    </div>

    <div>
      <h3>MY SCORES</h3>
      <myscores />
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
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.logout-btn {
  padding: 10px 15px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}
</style>