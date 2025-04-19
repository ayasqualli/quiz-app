<template>
  <div>
    <h3>My Quizzes</h3>
    <div v-if="quizzes.length === 0">You haven't created any quizzes yet.</div>
    <ul>
      <li v-for="quiz in quizzes" :key="quiz.id">
        {{ quiz.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { db, auth } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default {
  name: 'myquizzes',
  data() {
    return {
      quizzes: []
    };
  },
  async mounted() {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, 'quizzes'), where('ownerId', '==', user.uid));
    const querySnapshot = await getDocs(q);

    this.quizzes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
</script>