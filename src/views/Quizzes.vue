<template>
  <div >
    <h1>All Quizzes</h1>
    <div v-if="loading">Loading quizzes...</div>
    <div v-else>
      <div v-if="quizzes.length === 0">No quizzes found.</div>
      <div v-else >
        <div
          v-for="quiz in quizzes" :key="quiz.id">
          <h2>{{ quiz.title }}</h2>
          <p><strong>Author:</strong> {{ quiz.author }}</p>
          <p><strong>Category:</strong> {{ quiz.category }}</p>
          <router-link :to="`/take-quiz/${quiz.id}`">
            <button>Take Quiz</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config.js"; 

export default {
  name: "Quizzes",
  data() {
    return {
      quizzes: [],
      loading: true,
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "quizzes"));
      this.quizzes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
