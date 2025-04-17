<template>
    <div>
      <div v-if="quizzes.length === 0">You have no scores yet.</div>
      <div v-for="quiz in quizzes" :key="quiz.id">
        <h4>{{ quiz.title }}</h4>
        <p>Your Score: <strong>{{ getMyScore(quiz.scores) }}</strong></p>
        <p>All Scores: {{ quiz.scores.map(s => s.score).join(', ') }}</p>
      </div>
    </div>
  </template>

<script>
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
  name: 'Myscores',
  data() {
    return {
      quizzes: []
    };
  },
  methods: {
    getMyScore(scores) {
      const userId = auth.currentUser?.uid;
      const scoreObj = scores.find(s => s.userId === userId);
      return scoreObj ? scoreObj.score : 'Not taken';
    }
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, 'quizzes'));
    this.quizzes = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(quiz => quiz.scores.some(s => s.userId === auth.currentUser.uid));
  }
};
</script>