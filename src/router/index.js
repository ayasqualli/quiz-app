import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import createquiz from '../views/Createquiz.vue';
import myquizzes from '@/components/myquizzes.vue';
import TakeQuiz from '../views/TakeQuiz.vue';
import EditQuiz from '../views/EditQuiz.vue';
import Results from '../views/Results.vue';
import singup from '../views/Singup.vue';
import signin from '../views/Signin.vue';
import Quizzes from '../views/Quizzes.vue';

const routes = [
<<<<<<< HEAD
  {
    path: "/",
    name: "Home",
    component: Home,
  },
=======
  { path: '/', name: 'Home', component: Home },
  { path: '/create-quiz', name: 'createquiz', component: createquiz },
  { path: '/myquizzes', name: 'myquizzes', component: myquizzes },
  { path: '/take-quiz/:id', name: 'TakeQuiz', component: TakeQuiz, porps :true},
  { path: '/edit-quiz/:id', name: 'EditQuiz', component: EditQuiz , porps :true},
  { path: '/results', name: 'Results', component: Results },
  {path: '/signup', name:'SignupView',component: singup},
  {path: '/signin', name:'LoginView',component: signin},
  {path: '/quizzes', name:'Quizzes',component: Quizzes},
>>>>>>> 30398ae93717310b358a76de69b41c4929708d57
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
