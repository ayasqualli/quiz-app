<template>
    <ul>
      <li v-for="quiz in takenQuizzes" :key="quiz.id">{{ quiz.title }}</li>
    </ul>
  </template>
  
  <script>
  import { db } from '../firebaseconfig';
  import { onSnapshot, collection } from 'firebase/firestore';
  import { getAuth } from 'firebase/auth';
  
  export default {
    data() {
      return {
        takenQuizzes: []
      };
    },
    created() {
      const auth = getAuth();
      const user = auth.currentUser;
  
      const unsubscribe = onSnapshot(collection(db, "quizzes"), (snapshot) => {
        const quizzes = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const hasTaken = data.scores?.some(score => score.userId === user.uid);
          if (hasTaken) {
            quizzes.push({ id: doc.id, ...data });
          }
        });
        this.takenQuizzes = quizzes;
      });
    }
  };
  </script>
  