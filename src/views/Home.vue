<template>
  <div class="container">
    <div class="header">
      <div class="profile">
        <img src="public/profile.png" alt="Profile Picture">
        <label>Name</label>
      </div>
      <button class="logout-btn">Log Out</button>
    </div>
    <div>
      <label>MY QUIZZES</label>
      <myquizzes />
    </div>

    <div>
      <label>TAKEN QUIZZES</label>
      <takenQuizzes />
    </div>

    <div class="t">
      <label>MY SCORES</label>
      <myscores />
    </div>
  </div>
</template>

<script>

import myquizzes from './components/myquizzes.vue';
import myscores from './components/myscores.vue';
import takenQuizzes from './components/takenQuizzes.vue';


export default {
  name: "Home",
  components: {

    myquizzes,
    myscores,
    takenQuizzes
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.quiz-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.quiz-btn {
  padding: 30px;
  text-decoration: none;
  color: inherit;
  text-align: center;
}

.quiz-sections {
  display: flex;
  gap: 20px;
  justify-content: space-around;
}

.section {
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
</style>
