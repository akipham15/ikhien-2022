import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeA from '../views/HomeA.vue'
import HomeB from '../views/HomeB.vue'
import AfterVote from '../views/AfterVote.vue'
import VoteA from '../views/VoteA.vue'
import VoteB from '../views/VoteB.vue'
import AnswerHistory from '../views/AnswerHistory.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home-a',
    name: 'HomeA',
    component: HomeA
  },
  {
    path: '/home-b',
    name: 'HomeB',
    component: HomeB
  },
  {
    path: '/after-vote',
    name: 'afterVote',
    component: AfterVote
  },
  {
    path: '/vote-a',
    name: 'VoteA',
    component: VoteA
  },
  {
    path: '/vote-b',
    name: 'VoteB',
    component: VoteB
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
