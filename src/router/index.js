import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detail',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DetailView.vue')
  },
  {
    path: '/opposite-pair',
    name: 'oppositePair',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListOppositePair.vue')
  },
  {
    path: '/opposite-pair/:id',
    name: 'DetailOppositePair',
    component: () => import(/* webpackChunkName: "about" */ '../views/DetailView.vue'),
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
