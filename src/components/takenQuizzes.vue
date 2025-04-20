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
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default {
  name: 'takenQuizzes',
  data() {
    return {
      takenQuizzes: []
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const querySnapshot = await getDocs(collection(db, 'quizzes'));

      this.takenQuizzes = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(quiz =>
          Array.isArray(quiz.scores) &&
          quiz.scores.some(score => score.userid === user.uid)
        );
    });
  }
};

</script>