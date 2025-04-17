<template>
    <div>
      <div class="t">
  
          <Label>//NAME</Label>
          <button>LOG OUT</button>
  
      </div>
      <div class="t">
        <router-link class="b2">Create Quiz</router-link>
        <button class="b2">Quizzes</button>
        <button class="b2">Edit Quiz</button>
      </div>
  
      <div class="t">
        <label>MY SCORES</label>
        <Myscores />
      </div>
  
      <div>
        <label>MY QUIZZES</label>
        <Myquizzes />
      </div>
  
      <div>
        <label>TAKEN QUIZZES</label>
        <TakenQuizes />
      </div>
    </div>
  </template>
  
  
  <script>
  import Myquizzes from './components/myquizzes.vue';
  import Myscores from './components/myscores.vue';
  import TakenQuizzes from './components/takenQuizzes.vue';
  
  export default {
    name: 'TakeQuiz',
    components: {
      
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  