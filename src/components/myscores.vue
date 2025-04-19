<template>
  <div>
    <div v-if="quizzes.length === 0">You have no scores yet.</div>
    <div v-for="quiz in quizzes" :key="quiz.id" class="score-card">
      <h4>{{ quiz.title }}</h4>
      <p><strong>Your Score:</strong> {{ getMyScore(quiz.scores) }}</p>
      <p><strong>Highest:</strong> {{ getHighScore(quiz.scores) }} |
         <strong>Lowest:</strong> {{ getLowScore(quiz.scores) }} |
         <strong>Average:</strong> {{ getAverageScore(quiz.scores) }}</p>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default {
  name: 'myscores',
  data() {
    return {
      quizzes: []
    };
  },
  methods: {
    getMyScore(scores) {
      const userId = auth.currentUser?.uid;
      const myEntry = scores.find(s => s.userId === userId);
      return myEntry ? myEntry.score : 'Not taken';
    },
    getHighScore(scores) {
      if (!scores.length) return '-';
      return Math.max(...scores.map(s => s.score));
    },
    getLowScore(scores) {
      if (!scores.length) return '-';
      return Math.min(...scores.map(s => s.score));
    },
    getAverageScore(scores) {
      if (!scores.length) return '-';
      const total = scores.reduce((sum, s) => sum + s.score, 0);
      return (total / scores.length).toFixed(2);
    }
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, 'quizzes'));
    const userId = auth.currentUser?.uid;

    this.quizzes = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(quiz => quiz.scores?.some(score => score.userId === userId));
  }
};
</script>

<style scoped>
.score-card {
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>