import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import createquiz from "../views/CreateQuiz.vue";
import myquizzes from "@/components/myquizzes.vue";
import TakeQuiz from "../views/TakeQuiz.vue";
import EditQuiz from "../views/EditQuiz.vue";
import Results from "../views/Results.vue";
import singup from "../views/Signup.vue";
import signin from "../views/signin.vue";
import Quizzes from "../views/Quizzes.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/create-quiz", name: "createquiz", component: createquiz },
  { path: "/myquizzes", name: "myquizzes", component: myquizzes },
  {
    path: "/take-quiz/:id",
    name: "TakeQuiz",
    component: TakeQuiz,
    props: true,
  },
  {
    path: "/edit-quiz/:id",
    name: "EditQuiz",
    component: EditQuiz,
    porps: true,
  },
  { path: "/results", name: "Results", component: Results },
  { path: "/signup", name: "SignupView", component: singup },
  { path: "/signin", name: "LoginView", component: signin },
  { path: "/quizzes", name: "Quizzes", component: Quizzes },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
