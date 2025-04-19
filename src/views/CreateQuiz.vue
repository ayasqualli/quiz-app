<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="form">
      <h1>Create Quiz</h1>

      <div class="form-group">
        <label>Number of Questions:</label>
        <input
          v-model="formData.questions"
          type="number"
          min="1"
          max="50"
          required
        />
      </div>

      <div class="form-group">
        <label>Select Category:</label>
        <select v-model="formData.category">
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals & Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime & Manga</option>
          <option value="32">Entertainment: Cartoon & Animations</option>
        </select>
      </div>

      <div class="form-group">
        <label>Select Difficulty:</label>
        <select v-model="formData.difficulty">
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div class="form-group">
        <label>Select Type:</label>
        <select v-model="formData.type">
          <option value="any">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </div>

      <button type="submit">Create Quiz</button>
    </form>
  </div>
</template>

<script>
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
export default {
  name: "CreateQuiz",
  data() {
    return {
      formData: {
        questions: 10,
        category: "any",
        difficulty: "any",
        type: "any",
      },
    };
  },
  methods: {
    async submitForm() {
      let apiURL = `https://opentdb.com/api.php?amount=${this.formData.questions}`;
      if (this.formData.category !== 'any') {
        apiURL += `&category=${this.formData.category}`;
      }
      if (this.formData.difficulty !== 'any') {
        apiURL += `&difficulty=${this.formData.difficulty}`;
      }
      if (this.formData.type !== 'any') {
        apiURL += `&type=${this.formData.type}`;
      }
      try {
        const quizRef = await this.fetchQuestions(apiURL);
        this.$router.push({ name: 'TakeQuiz', params: { id: quizRef.id } });
      } catch (error) {
        console.error("Error in submitForm:", error);
        alert("An error occurred while creating the quiz. Please try again.");
      }
    },
    async fetchQuestions(URL) {
      try {
        console.log("Fetching questions from:", URL);
        const response = await fetch(URL);
        console.log("Response received:", response);
        const data = await response.json();
        console.log("Data parsed:", data);

        // Check if the API returned results
        if (data.response_code === 0 && data.results.length > 0) {
          console.log("Storing questions in Firestore");
          const quizRef = await addDoc(collection(db, "quizzes"), {
            questions: data.results,
            createdAt: new Date(),
            category: this.formData.category,
            difficulty: this.formData.difficulty,
            type: this.formData.type,
            questionCount: this.formData.questions
          });
          console.log("Response: ", data);
          console.log("Quiz stored with ID: ", quizRef.id);
          return quizRef; 
        } else {
          console.log("No results returned from the API");
          throw new Error("No results returned from the API");
        }
      } catch (error) {
        console.error("Error fetching or storing questions:", error);
        throw error; 
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  margin: 0;
  padding: 20px;
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
