import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/HelloWorld.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

let router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
	routes: routes
})


export default router