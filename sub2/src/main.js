import './public-path'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import actions from './action'
Vue.config.productionTip = false

let instance = null

function render (props = {}) {
  const { container } = props
  if (container) {
    actions.setActions(props)
  }
  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑
  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  console.log('[vue] props from main framework', props)
  render(props)
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
