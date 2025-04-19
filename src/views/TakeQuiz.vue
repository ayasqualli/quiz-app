<template>
  <div class="quiz-app">
    <div class="home">
      <button class="regenerate-btn" @click="$router.push('/create-quiz')">
        <i class="fa fa-home"></i>
        <p>Regenerate Questions</p>
      </button>
    </div>

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
              <div id="timer" v-if="index === currentQuestionIndex">Time: <span>{{ timeLeft }}</span></div>
            </div>
            <div class="properties">
              <p>Type: <span>{{ question.type }}</span></p>
              <p>Category: <span>{{ question.category }}</span></p>
              <p>Difficulty: <span>{{ question.difficulty }}</span></p>
            </div>
            <h2>{{ question.question }}</h2>
            <div class="options">
              <div 
                v-for="(answer, i) in getAllAnswers(question)" 
                :key="i" 
                :class="['option', {
                  'selected': userAnswers[index] === answer,
                  'correct': showResults && answer === question.correct_answer,
                  'incorrect': showResults && userAnswers[index] === answer && answer !== question.correct_answer
                }]"
                @click="selectAnswer(index, answer)"
                :disabled="timeLeft <= 0 && index === currentQuestionIndex"
              >
                {{ answer }}
              </div>
            </div>
            <button class="next" @click="nextQuestion(index)">
              Next <i class="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <button v-if="!showResults" class="next" @click="submitQuiz">Submit Quiz</button>
      </div>
    </main>
  </div>
</template>

<script>
import { db } from '../firebase-config';
import { collection, getDocs, getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
      loading: true,
      username: ''
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
          this.questions.forEach(question => {
            question.answers = this.shuffleAnswers([
              ...question.incorrect_answers,
              question.correct_answer
            ]);
          });
          console.log('Fetched questions:', this.questions);
          this.loading = false;
          this.startTimer();
        } else {
          console.error('Quiz document not found');
          this.loading = false;
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        this.loading = false;
      }
    },
    async saveScore() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          this.username = user.displayName || user.email;
          const quizId = this.$route.params.id;
          const quizRef = doc(db, 'quizzes', quizId);
          
          await updateDoc(quizRef, {
            scores: arrayUnion({
              username: this.username,
              score: this.score,
              timestamp: new Date()
            })
          });
          console.log('Score saved successfully');
        }
      } catch (error) {
        console.error('Error saving score:', error);
      }
    },
    shuffleAnswers(answers) {
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      return answers;
    },
    getAllAnswers(question) {
      return question.answers || [...question.incorrect_answers, question.correct_answer];
    },
    selectAnswer(index, answer) {
      if (this.timeLeft > 0 || index !== this.currentQuestionIndex) {
        this.userAnswers[index] = answer;
      }
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
      }
    },
    async submitQuiz() {
      this.calculateScore();
      await this.saveScore();
      this.showResults = true;
      this.$nextTick(() => {
        this.scrollToResults();
      });
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

async function getQuizScores(quizId) {
  try {
    const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
    if (quizDoc.exists()) {
      const scores = quizDoc.data().scores;
      console.log('Quiz scores:', scores);
      return scores;
    } else {
      console.error('Quiz document not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching quiz scores:', error);
    return null;
  }
}
</script>

<style scoped>
.quiz-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff5f0;
  color: #333;
}

header {
  background-color: #f3e2d6;
  padding: 20px 0;
  text-align: center;
  border-bottom: 2px solid #e0c9b2;
}

h1 {
  margin: 0;
  font-size: 2.2em;
  color: #8b5e3c;
}

.main {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quiz-container {
  width: 100%;
  max-width: 850px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.question {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fffaf5;
}

.question h2 {
  font-size: 1.5em;
  color: #d08b66;
  margin-bottom: 20px;
}

.score-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f3e2d6;
  border-radius: 8px;
}

.properties {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 0.9em;
  color: #8b5e3c;
}

.properties p {
  margin: 0;
  padding: 5px 10px;
  background-color: #ffe4d4;
  border-radius: 5px;
}

.options {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  margin: 20px 0;
}

@media (min-width: 600px) {
  .options {
    grid-template-columns: repeat(2, 1fr);
  }
}

.option {
  background-color: #ffe4d4;
  padding: 12px 20px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  font-size: 1.05em;
  cursor: pointer;
}

.option:hover {
  background-color: #fdd8c4;
}

.option.selected {
  background-color: #e8a87c;
  color: white;
}

.correct {
  background-color: #d4edda !important;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.incorrect {
  background-color: #f8d7da !important;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

input[disabled] + label {
  opacity: 0.6;
  cursor: not-allowed;
}

button {
  background-color: #e8a87c;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d08b66;
}

.score {
  font-size: 1.4em;
  font-weight: bold;
  color: #8b5e3c;
  margin-bottom: 20px;
  text-align: center;
}

footer {
  text-align: center;
  padding: 20px;
  background-color: #f3e2d6;
  color: #8b5e3c;
  font-size: 0.9em;
  border-top: 2px solid #e0c9b2;
}

footer a {
  color: #8b5e3c;
  text-decoration: underline;
}

footer a:hover {
  color: #d08b66;
}

.loading {
  font-size: 1.4em;
  color: #8b5e3c;
  text-align: center;
  margin-top: 50px;
}

.question-divider {
  border: none;
  height: 1px;
  background: #e0c9b2;
  margin: 40px 0;
}

</style>