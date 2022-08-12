import Vue from 'vue'
import VueRouter  from 'vue-router'
import HomePage from '../views/Home.vue'
import AboutPage from '../views/About.vue'

Vue.use(VueRouter )

const routes = [
  {
    path: '/menu1',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/menu2',
    name: 'AboutPage',
    component: AboutPage
  },
]
const router = new VueRouter({
  mode: 'hash',
  routes
})
export default router
