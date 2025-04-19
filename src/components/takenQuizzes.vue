<template>
  <div>
    <div v-if="takenQuizzes.length === 0">You haven't taken any quizzes yet.</div>
    <ul>
      <li v-for="quiz in takenQuizzes" :key="quiz.id">
        {{ quiz.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default {
  name: 'takenQuizzes',
  data() {
    return {
      takenQuizzes: []
    };
  },
  async mounted() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const querySnapshot = await getDocs(collection(db, 'quizzes'));

    this.takenQuizzes = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(quiz =>
        quiz.scores?.some(score => score.userId === user.uid)
      );
  }
};
</script>