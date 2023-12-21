import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from "@/views/MainView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
  },
  {
    path: '/dogs',
    name: 'dogs',
    component: () => import('../views/DogsView.vue')
  },
  {
    path: '/wither',
    name: 'wither',
    component: () => import('../views/WitherView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
