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
      <button class="quiz-btn">Create Quiz</button>
      <button class="quiz-btn">Quizzes</button>
      <button class="quiz-btn">Edit Quiz</button>
    </div>

    <div class="quiz-sections">
      <div class="section">
        <label>MY SCORES</label>
      </div>
      <div class="section">
        <label>MY QUIZZES</label>
      </div>
      <div class="section">
        <label>TAKEN QUIZZES</label>
      </div>
    </div>
  </div>
</template>

<script>
// import Myquizzes from './components/myquizzes.vue';
// import Myscores from './components/myscores.vue';
// import TakenQuizzes from './takenQuizzes.vue';

export default {
  name:"Home",
  // components: {
  //   Myquizzes,
  //   Myscores,
  //   TakenQuizzes
  // }
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

.logout-btn {
  background-color: rgb(46, 40, 40);
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.quiz-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.quiz-btn {
  background-color: rgb(224, 177, 65);
  color: rgb(6, 5, 5);
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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