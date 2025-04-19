<template>
  <div class="bigbro">
    <div class="column-wrapper">
      <div class="page-container">
        <div class="flexy">
          <div class="form-container">
            <form @submit.prevent="submitForm" class="form">
              <div class="title">
                <h1>Create Quiz</h1>
              </div>

              <div class="form-group">
                <label>Quiz Title:</label>
                <input
                  v-model="formData.title"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Enter quiz title"
                />
              </div>

              <div class="form-group">
                <label>Number of Questions:</label>
                <input
                  v-model="formData.questions"
                  type="number"
                  min="1"
                  max="50"
                  required
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label>Select Category:</label>
                <select v-model="formData.category" class="form-select">
                  <option value="any">Any Category</option>
                  <optgroup label="General">
                    <option value="9">General Knowledge</option>
                  </optgroup>
                  <optgroup label="Entertainment">
                    <option value="10">Books</option>
                    <option value="11">Film</option>
                    <option value="12">Music</option>
                    <option value="13">Musicals & Theatres</option>
                    <option value="14">Television</option>
                    <option value="15">Video Games</option>
                    <option value="16">Board Games</option>
                    <option value="29">Comics</option>
                    <option value="31">Japanese Anime & Manga</option>
                    <option value="32">Cartoon & Animations</option>
                  </optgroup>
                  <optgroup label="Science">
                    <option value="17">Nature</option>
                    <option value="18">Computers</option>
                    <option value="19">Mathematics</option>
                    <option value="30">Gadgets</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                  </optgroup>
                </select>
              </div>

              <div class="form-group">
                <label>Select Difficulty:</label>
                <select v-model="formData.difficulty" class="form-select">
                  <option value="any">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div class="form-group">
                <label>Select Type:</label>
                <select v-model="formData.type" class="form-select">
                  <option value="any">Any Type</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True/False</option>
                </select>
              </div>

              <button type="submit" class="submit-btn">Create Quiz</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  name: "CreateQuiz",
  data() {
    return {
      formData: {
        scores: [],
        title: '',
        questions: 10,
        category: "any",
        difficulty: "any",
        type: "any",
      },
      loading: false,
      error: null
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.error = null;
      
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
        this.error = error.message || "An error occurred while creating the quiz. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    async fetchQuestions(URL) {
      try {
        console.log("Fetching questions from:", URL);
        const response = await fetch(URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data parsed:", data);

        if (data.response_code === 0 && data.results.length > 0) {
          const auth = getAuth();
          const user = auth.currentUser;
          const author = user ? user.displayName || 'Anonymous' : 'Anonymous';

          const quizRef = await addDoc(collection(db, "quizzes"), {
            title: this.formData.title,
            author: author,
            scores: this.formData.scores || [],
            questions: data.results,
            createdAt: new Date(),
            category: this.formData.category,
            difficulty: this.formData.difficulty,
            type: this.formData.type,
            questionCount: this.formData.questions
          });
          console.log("Quiz stored with ID: ", quizRef.id);
          return quizRef;
        } else {
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
.bigbro {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fdf6f0;
}

.column-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  padding: 20px 0;
}

.page-container {
  width: 100%;
  max-width: 400px;
}

.flexy {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background-color: #fffaf5;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(202, 164, 114, 0.2);
  width: 100%;
}

.title h1 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 28px;
  color: #8b5e3c;
  font-family: 'Georgia', serif;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #9a6d45;
}

.form-input,
.form-select {
  width: 95%;
  padding: 10px 14px;
  border: 1px solid #d4b197;
  border-radius: 6px;
  font-size: 16px;
  background-color: #fffefc;
  color: #5a3d2b;
}

.form-input:focus,
.form-select:focus {
  border-color: #e8a87c;
  box-shadow: 0 0 0 3px rgba(232, 168, 124, 0.1);
  outline: none;
}

.submit-btn {
  width: 100%;
  background-color: #e8a87c;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #d08b66;
}
</style>
