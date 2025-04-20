<template>
  <div>
    <div v-if="quizzes.length === 0">You haven't created any quizzes yet.</div>
    <div v-for="quiz in quizzes" :key="quiz.id" class="quiz-container">
      <h4>Title : {{ quiz.title }}</h4>
      <p>Category : {{ quiz.category }}</p>
      <button class="aa" @click="goToEditQuiz(quiz.id)">Edit this quiz</button>
      <router-link :to="`/take-quiz/${quiz.id}`">
        <button class="aa">Take Quiz</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default {
  name: 'MyQuizzes',
  data() {
  return {
    quizzes: [],
    loading: true
  };
},
async mounted() {
  const user = auth.currentUser;
  console.log('Current user:', user); // 🔍 Log the current user
  if (!user) {
    console.error('No user is currently signed in.');
    this.loading = false;
    return;
  }

  const q = query(collection(db, 'quizzes'), where('userid', '==', user.uid));
  const querySnapshot = await getDocs(q);

  this.quizzes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  this.loading = false;
},

  methods: {
    goToEditQuiz(quizId) {
      this.$router.push({ name: 'EditQuiz', params: { id: quizId } });
    }
  }
};
</script>
<style>
/* Style for the individual quiz container */
.quiz-container {
background-color: #fff; /* White background for each quiz */
border-radius: 8px;
padding: 20px;
margin: 15px 0;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Slight shadow for a soft floating effect */
}

.quiz-container h4 {
font-size: 22px;
font-weight: 600;
color: #333;
margin-bottom: 10px;
}

.quiz-container p {
font-size: 16px;
color: #6c757d;
margin-bottom: 15px;
}

.aa {
display: inline-block;
margin: 5px 10px;
padding: 10px 16px;
background-color: #f4c784; /* Soft pumpkin */
color: #4a2e1e;
text-decoration: none;
font-weight: 500;
font-size: 20px;
border-radius: 6px;
transition: background-color 0.3s, transform 0.2s;
}

.aa:hover {
background-color: #e1a93d; /* Darker shade for hover */
transform: scale(1.05);
}

.aa:focus {
outline: none;
box-shadow: 0 0 5px rgba(78, 155, 255, 0.5);
}

</style>