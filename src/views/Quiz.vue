<template>
  <div class="quiz">
    <h1>Quiz</h1>
    <router-link to="/" class="btn">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'QuizView'
}
</script>

<style scoped>
.quiz {
  text-align: center;
  padding: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
}

.btn:hover {
  background-color: #3aa876;
}
</style> 