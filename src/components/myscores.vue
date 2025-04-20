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
      const myEntry = scores.find(s => s.userid === userId);
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
      .filter(quiz => quiz.scores?.some(score => score.userid === userId));
  }
};
</script>

<style scoped>
/* Style the score card container */
.score-card {
padding: 20px;
margin-bottom: 20px;
border: 1px solid #ddd;
border-radius: 10px;
background-color:white;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
font-family: Arial, sans-serif;
}

/* Style for quiz title */
.quiz-title {
font-size: 1.5em;
color: #333;
margin-bottom: 10px;
}

/* Style for individual score details */
.score-detail {
font-size: 1.1em;
color: #555;
margin: 5px 0;
}

/* Style for the case when no scores are available */
.no-scores {
font-size: 1.2em;
color: #999;
text-align: center;
padding: 20px;
}

/* Add spacing between score details */
.score-detail strong {
color: #333;
}
</style>