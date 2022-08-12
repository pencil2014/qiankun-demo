import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/Home.vue'
import AboutPage from '../views/About.vue'

Vue.use(Router)

const routes = [
  {
    path: '/menu3',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/menu4',
    name: 'AboutPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutPage
  },
]
const router = new Router({
  mode: 'hash',
  routes
})
export default router
