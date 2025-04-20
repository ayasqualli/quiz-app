<template>
  <div v-if="quiz">
    <h2>Edit Quiz: </h2>
    <p>Topic: {{ quiz.title }}</p>

    <div
      v-for="(question, index) in quiz.questions"
      :key="index"
      class="question-block"
    >
      <!-- Edit question text -->
      <input v-model="question.question" placeholder="Edit question text" />
      <div class="eee">
      <button @click="toggleEdit(index)">
        {{ question.editing ? 'Cancel' : 'Modify' }}
      </button>
      <button @click="deleteQuestion(index)">Delete Question</button>
    </div>
      <div v-if="question.editing" class="edit-form">
        <!-- Edit question type -->
        <label>Question Type:</label>
        <select v-model="question.type">
          <option value="multiple">Multiple Choice (Multiple)</option>
          <option value="true_false">True/False</option>
        </select>

        <!-- Handle multiple choice questions -->
        <div v-if="question.type === 'multiple'">
          <label>Incorrect Answers:</label>
          <div v-for="(incorrect, i) in question.incorrect_answers" :key="i">
            <input v-model="question.incorrect_answers[i]" placeholder="Incorrect answer" />
          </div>
          <button @click="addIncorrectAnswer(index)">Add Incorrect Answer</button>
          <label>Correct Answer:</label>
          <input v-model="question.correct_answer" placeholder="Correct answer" />
        </div>

        <!-- Handle True/False questions -->
        <div v-if="question.type === 'true_false'">
          <label>Correct Answer:</label>
          <select v-model="question.correct_answer">
            <option :value="true">True</option>
            <option :value="false">False</option>
          </select>
        </div>
      </div>
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
    const quizId = this.$route.params.id;
    const quizRef = doc(db, 'quizzes', quizId);
    const quizSnap = await getDoc(quizRef);
    if (quizSnap.exists()) {
      const quizData = quizSnap.data();
      quizData.questions = quizData.questions.map(q => ({
        ...q,
        editing: false, // Track whether a question is being edited
      }));
      this.quiz = { id: quizSnap.id, ...quizData };
    }
  },
  methods: {
    toggleEdit(index) {
      this.quiz.questions[index].editing = !this.quiz.questions[index].editing;
    },
    deleteQuestion(index) {
      this.quiz.questions.splice(index, 1);
    },
    addIncorrectAnswer(index) {
      this.quiz.questions[index].incorrect_answers.push('');
    },
    async saveChanges() {
      // Clean up the incorrect_answers array (remove any empty answers)
      this.quiz.questions.forEach(q => {
        q.incorrect_answers = q.incorrect_answers.filter(ans => ans.trim() !== '');
      });

      const quizRef = doc(db, 'quizzes', this.quiz.id);
      await updateDoc(quizRef, {
        questions: this.quiz.questions,
      });

      alert('Quiz updated!');
    }
  }
};
</script>
<style scoped>
/* Container for each question */
.eee{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.question-block {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Question text input field */
.question-block input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
}

/* Buttons */
button {
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background-color: #e1a95f;
  color: #fff;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color:  #e1a95f;
  transform: translateY(-2px);
}

button:focus {
  outline: none;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Modify and Cancel button styles */
button.modify, button.cancel {
  background-color: #28a745;
}

button.modify:hover, button.cancel:hover {
  background-color: #218838;
}

/* Delete button */
button.delete {
  background-color: #dc3545;
}

button.delete:hover {
  background-color: #c82333;
}

/* Edit form styles */
.edit-form {
  margin-top: 15px;
  padding: 15px;
  background-color: #f1f1f1;
  border-radius: 8px;
  border: 1px solid #ddd;
}

/* Labels for form fields */
label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

/* Input fields in the edit form */
.edit-form input, .edit-form select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
}

/* Spacing and structure around buttons inside edit form */
.edit-form button {
  padding: 8px 15px;
  font-size: 14px;
  margin-right: 10px;
}

.edit-form button.add-answer {
  background-color: #ffc107;
  color: #fff;
}

.edit-form button.add-answer:hover {
  background-color: #e0a800;
}

/* General Loading state styling */
div[v-else] {
  text-align: center;
  font-size: 18px;
  color: #999;
}

/* Spacing between the Save Changes button */
.save-button-container {
  text-align: center;
  margin-top: 30px;
}

.save-button-container button {
  width: 200px;
  background-color:  #e1a95f;
  font-size: 18px;
  padding: 12px;
}

.save-button-container button:hover {
  background-color: #e1a95f;
}

</style>

