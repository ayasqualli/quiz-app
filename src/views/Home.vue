<template>
  <div class="container">
    <div class="header">
      <div class="profile">
        <img src="public/profile.png" alt="Profile Picture">
        <label>Name</label>
      </div>
      <button class="logout-btn">Log Out</button>
    </div>

    <div class="quiz-actions">
      <router-link class="quiz-btn" :to="{name: 'createquiz'}">Create Quiz</router-link>
      <router-link class="quiz-btn" :to="{name: 'Quizzes'}">Quizzes</router-link>
      <router-link class="quiz-btn" :to="{name: 'EditQuiz'}">Edit Quiz</router-link>
    </div>

    <div class="quiz-sections">
      <div class="section">
        <label>MY SCORES</label>
        <Myscores />
      </div>
      <div class="section">
        <label>MY QUIZZES</label>
        <Myquizzes />
      </div>
      <div class="section">
        <label>TAKEN QUIZZES</label>
        <TakenQuizzes />
      </div>
    </div>
  </div>
</template>

<script>
import Myquizzes from './components/myquizzes.vue';
import Myscores from './components/myscores.vue';
import TakenQuizzes from './takenQuizzes.vue';

export default {
  name: "Home",
  components: {
    Myquizzes,
    Myscores,
    TakenQuizzes
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
