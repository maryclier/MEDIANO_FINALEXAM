
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Tasks from '../views/Tasks.vue'
import Goals from '../views/Goals.vue'
import DailyLogs from '../views/DailyLogs.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/tasks', name: 'tasks', component: Tasks },
    { path: '/goals', name: 'goals', component: Goals },
    { path: '/daily-logs', name: 'daily-logs', component: DailyLogs },
    { path: '/about', name: 'about', component: About }
  ]
})

export default router