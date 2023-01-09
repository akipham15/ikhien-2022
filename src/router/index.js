import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AfterVote from '../views/AfterVote.vue'
import AnswerHistory from '../views/AnswerHistory.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/after-vote',
    name: 'afterVote',
    component: AfterVote
  },
  {
    path: '/history',
    name: 'answerHistory',
    component: AnswerHistory
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
