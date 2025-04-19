<template>
  <div class="quiz-app">
    <header>
      <div class="page-name">Quiz Mania</div>
      <div class="home">
        <router-link to="/create-quiz">
          <i class="fa fa-home"></i>
          <p>Regenerate Questions</p>
        </router-link>
      </div>
    </header>

    <main class="main">
      <div v-if="loading" class="loading">Loading questions...</div>
      <div v-else>
        <div class="results" v-if="showResults" ref="results">
          <h2>Quiz Complete!</h2>
          <div class="score-summary">
            <p>Your Final Score: <span class="final-score">{{ score }}</span></p>
            <p>Total Questions: <span class="total-questions">{{ questions.length }}</span></p>
          </div>
          <button class="restart-quiz" @click="restartQuiz">Try Again <i class="fa fa-refresh"></i></button>
        </div>

        <div class="quiz-container">
          <div v-for="(question, index) in questions" :key="index" class="question" ref="questionRefs">
            <div class="score-bar">
              <div id="number"><span>Question {{ index + 1 }}</span></div>
              <div id="timer">Time: <span>{{ timeLeft }}</span></div>
            </div>
            <div class="properties">
              <p>Type: <span>{{ question.type }}</span></p>
              <p>Category: <span>{{ question.category }}</span></p>
              <p>Difficulty: <span>{{ question.difficulty }}</span></p>
            </div>
            <h2>{{ question.question }}</h2>
            <div class="options">
              <div v-for="(answer, i) in getAllAnswers(question)" :key="i">
                <input 
                  type="radio" 
                  :name="'question' + index" 
                  :id="'option-' + index + '-' + i" 
                  :value="answer"
                  v-model="userAnswers[index]"
                  :disabled="timeLeft <= 0"
                />
                <label 
                  :class="['option', {
                    'correct': showResults && answer === question.correct_answer,
                    'incorrect': showResults && userAnswers[index] === answer && answer !== question.correct_answer
                  }]" 
                  :for="'option-' + index + '-' + i"
                >
                  {{ answer }}
                </label>
              </div>
            </div>
            <button class="next" @click="nextQuestion(index)" :disabled="!userAnswers[index]">
              Next <i class="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <button v-if="showResults" class="submit-quiz" @click="scrollToResults">Submit Quiz</button>
      </div>
    </main>

    <footer>
      <a href="https://github.com/ayasqualli/quizz-app">Source code Repository</a>
      <p>SPD2-S4</p>
      <p>
        Questions generated from
        <span><a href="https://opentdb.com/api_config.php">Open Trivia DB</a></span>
      </p>
    </footer>
  </div>
</template>

<script>
import { db } from '../firebase-config';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

export default {
  name: "TakeQuiz",
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      timeLeft: 30,
      timer: null,
      score: 0,
      showResults: false,
      loading: true
    };
  },
  methods: {
    async fetchQuestions() {
      try {
        const quizId = this.$route.params.id;
        if (!quizId) {
          console.error('Quiz ID is missing');
          this.loading = false;
          return;
        }

        const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
        if (quizDoc.exists()) {
          this.questions = quizDoc.data().questions;
          console.log('Fetched questions:', this.questions);
          this.loading = false;
          if (this.questions.length > 0) {
            this.startTimer();
          }
        } else {
          console.error('Quiz document not found');
          this.loading = false;
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        this.loading = false;
      }
    },
    getAllAnswers(question) {
      return [...question.incorrect_answers, question.correct_answer];
    },
    startTimer() {
      this.timeLeft = 30;
      this.timer = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          clearInterval(this.timer);
          this.nextQuestion(this.currentQuestionIndex);
        }
      }, 1000);
    },
    nextQuestion(index) {
      clearInterval(this.timer);
      if (index < this.questions.length - 1) {
        this.currentQuestionIndex = index + 1;
        this.scrollToQuestion(this.currentQuestionIndex);
        this.startTimer();
      } else {
        this.calculateScore();
        this.showResults = true;
        this.scrollToResults();
      }
    },
    calculateScore() {
      this.score = this.questions.reduce((acc, question, index) => {
        return acc + (this.userAnswers[index] === question.correct_answer ? 1 : 0);
      }, 0);
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.userAnswers = [];
      this.score = 0;
      this.showResults = false;
      this.startTimer();
      this.scrollToQuestion(0);
    },
    scrollToQuestion(index) {
      this.$refs.questionRefs[index].scrollIntoView({ behavior: 'smooth' });
    },
    scrollToResults() {
      this.$refs.results.scrollIntoView({ behavior: 'smooth' });
    }
  },
  mounted() {
    this.fetchQuestions();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(-45deg, #f8ebd8, #d5b1f9 ,#6a5acd, #632382);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
    margin: 0;
    padding: 0;
}

header{
    height: 100px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    background: #f8ebd8;
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 0;
    margin: 0;
    box-shadow: 0 2px 10px rgba(99, 35, 130, 0.1);
    transition: box-shadow 0.3s ease;
}

/* Sticky Header scroll effect */
header.scrolled {
    box-shadow: 0 4px 20px rgba(99, 35, 130, 0.2);
}

.page-name{
    font-size: 50px;
    display: flex;
    justify-content: center; 
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: #632382;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transition: color 0.3s ease;
}


header img{
    width: 150px;
    height: auto;
    margin-left: 30px;
}

footer{
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    color: #f8ebd8;
    background-color: #383e4e;
}

footer {
    margin-top: auto;
    width: 100%;
    padding: 20px 0;
}


footer a {
    color:#d5b1f9; 
    text-decoration: none; 
    transition: color 0.3s ease, text-shadow 0.3s ease;
}

footer a:hover {
    color: #632382;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin: 5px;
}

footer p {
    margin: 2px;
}

header p {
    margin: auto;
    font-size: 16px;
    color: #d5b1f9;
    text-align: center;
}

.home a {
    display: flex;
    margin-top: 30px;
    margin-right: 20px;
    align-items: center;
    color: #d5b1f9;
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
}

.home a:hover, .home p:hover {
    color: #632382;
    transform: scale(1.05);
}

.home i {
    margin-right: 8px;
    font-size: 20px;
}

.question {
    width: 80%;
    margin:2% 10%;
    padding: 32px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.question-container {
    padding: 32px;
    width: 80%;
    margin: 32px auto;
    height: 100vh;
}

.question h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    color: #632382;
    font-size: 24px;
    margin-bottom: 24px;
    text-align: center;
}

.options {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
}

.option {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    background: #f8ebd8;
    border: 2px solid #d5b1f9;
    border-radius: 10px;
    padding: 16px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.option:hover {
    background: #d5b1f9;
    color: white;
    transform: translateY(-2px);
}
.option:active {
    background: #aa58fd;
    color: white;
    transform: translateY(-2px);
}

input[type="radio"] {
    display: none;
}

input[type="radio"]:checked + label {
    background: #aa58fd;
    color: white;
    transform: translateY(-2px);
    transition: none;
}

.score-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    font-weight: bold;
    color: #632382;
    width: 100%;
    padding: 0 8px;
}

#score {
    text-align: left;
}

#timer {
    text-align: right;
}

.properties {
    display: flex;
    justify-content: space-around;
    margin-bottom: 32px;
    padding: 16px;
    background: #f8ebd8;
    border-radius: 10px;
}

.properties p {
    margin: 0;
    color: #632382;
}

.next {
    display: block;
    margin: 24px auto 0;
    display: block;
    margin-left: auto;
    background: #632382;
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.3s ease;
}

.next:hover {
    background: #6a5acd;
    transform: translateY(-2px);
}


.option.correct{
    background: green !important;
    border-color: rgb(1, 82, 1);
    color: white;
}

.option.incorrect{
    background: red !important ;
    border-color: rgb(211, 2, 2);
    color: white;
}

.generate-message{
    color: #f8ebd8;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    height: 75vh;
}

.results {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.results h2 {
    color: #632382;
    font-size: 2em;
    margin-bottom: 20px;
}

.score-summary {
    font-size: 1.5em;
    color: #6a5acd;
}

.restart-quiz {
    background: #632382;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
}

.restart-quiz:hover {
    background: #6a5acd;
}
</style>