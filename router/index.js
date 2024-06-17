// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'

const routes = [
  { path: '/', component: LoginForm },
  { path: '/signup', component: SignupForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router