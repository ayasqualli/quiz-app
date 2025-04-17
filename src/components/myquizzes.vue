<template>
  <div>
    <div v-if="quizzes.length === 0">You haven't created any quizzes yet.</div>
    <div v-for="quiz in quizzes" :key="quiz.id">
      <h4>{{ quiz.title }}</h4>
      <p>Topic: {{ quiz.topic }}</p>
    </div>
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
