import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Profile from '../views/Profile'

Vue.use(VueRouter)

const routes = [
  { path: "/", name:"home", component:Home, },
  { path: "/profile/:id", name:"profile", component:Profile, },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
