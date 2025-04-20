<template>
  <div >
    <h1>All Quizzes</h1>
    <div v-if="loading">Loading quizzes...</div>
    <div v-else>
      <div v-if="quizzes.length === 0">No quizzes found.</div>
      <div v-else >
        <div
          v-for="quiz in quizzes" :key="quiz.id" class="quiz-card">
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
<style scoped>
/* Page layout */
div {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  background-color: #fff9f0;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #d35400;
}

/* Quiz card style */
.quiz-card {
  background-color: #ffe5cc;
  border-left: 6px solid #de9852;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(255, 153, 51, 0.2);
  transition: transform 0.2s ease;
}

.quiz-card:hover {
  transform: translateY(-3px);
}

/* Quiz content */
h2 {
  margin: 0 0 10px;
  color: #a2652f;
}

p {
  margin: 5px 0;
}

/* Button styling */
button {
  background-color: #c37745;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #99581f;
}

/* Loading and empty states */
.loading,
.no-quizzes {
  text-align: center;
  font-size: 18px;
  color: #999;
}
</style>
