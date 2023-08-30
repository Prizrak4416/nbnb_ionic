import { createRouter, createWebHistory } from '@ionic/vue-router';
import StartPage from '../pages/StartPage.vue'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    redirect: '/bnb'
  },
  {
    path: '/bnb',
    component: StartPage
  },
  {
    path: '/home',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
