<template>
  <div v-if="quiz">
    <h2>Edit Quiz: {{ quiz.title }}</h2>
    <p>Topic: {{ quiz.topic }}</p>

    <div v-for="(question, index) in quiz.questions" :key="index" class="question-block">
      <input v-model="question.text" placeholder="Edit question text" />
      <button @click="deleteQuestion(index)">Delete Question</button>
    </div>
    <button @click="saveChanges">Save Changes</button>
  </div>
  <div v-else>
    Loading quiz...
  </div>
</template>

<script>
import { db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default {
  name: 'EditQuiz',
  data() {
    return {
      quiz: null,
    };
  },
  async created() {
    const quizId = this.$route.params.quizId;
    const quizRef = doc(db, 'quizzes', quizId);
    const quizSnap = await getDoc(quizRef);
    if (quizSnap.exists()) {
      this.quiz = { id: quizSnap.id, ...quizSnap.data() };
    }
  },
  methods: {
    async saveChanges() {
      const quizRef = doc(db, 'quizzes', this.quiz.id);
      await updateDoc(quizRef, {
        questions: this.quiz.questions
      });
      alert('Quiz updated!');
    },
    deleteQuestion(index) {
      this.quiz.questions.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.question-block {
  margin-bottom: 1em;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
