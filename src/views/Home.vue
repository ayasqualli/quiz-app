<template>
  <div>
    <div class="t">

        <Label>//NAME</Label>
        <button>LOG OUT</button>

    </div>
    <div class="t">
      <router-link class="b2" :to="{name : 'createquiz'}">Create Quiz</router-link>
      <router-link class="b2" :to="{name : 'Quizzes'}">Quizzes</router-link>
      <router-link class="b2" :to="{name : 'EditQuiz'}">Edit Quiz</router-link>
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
  name: 'Home',
  components: {
    Myquizzes,
    Myscores,
    TakenQuizzes
  }
}
</script>

<style scoped>
.b1 {
  background-color: rgb(46, 40, 40);
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 30px;
}

.b2 {
  background-color: rgb(224, 177, 65);
  color: rgb(6, 5, 5);
  font-size: 20px;
  font-weight: bold;
  padding: 30px;
}

.t {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.tt {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tp {
  border-radius: 10px;
  width: 50px;
  height: 50px;
}
</style>
