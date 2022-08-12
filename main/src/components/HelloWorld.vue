<template>
  <div class="hello">
    <h1>Hello, 大家好，这里是来自 Qiankun + Vue 的 微前端解决方案！</h1>
    <p>当前处于 qiankun 运行环境</p>
    <p>当前的global state：<code> {{ JSON.stringify(state.user) }}</code></p>
    <div class="btns">
      <button @click="gotoSub1">跳转到sub1子应用</button>
      <button @click="openSubVue">独立打开sub2子应用</button>
      <button @click="changeUsername">改变全局的用户名称</button>
    </div>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'HelloWorld',
  computed: {
    state () {
      // 如果只需要取某个命名空间下的state，比如 user ，可以加上参数
      // return store.getGlobalState('user')

      // 返回所有的state则不需添加参数
      return store.getGlobalState()
    },
    isInQiankun () {
      return window.__POWERED_BY_QIANKUN__
    }
  },
  methods: {
    // setGlobalState 是在 /common/src/store/global-register.js中定义的
    gotoSub1 () {
      history.pushState(null, 'sub1', '/sub1/#/menu1')
    },
    changeUsername () {
      // 也可通过 store.commit('global/setGlobalState', { user: '李四' }) 进行操作
      store.setGlobalState({
        user: { name: '李四' + Math.round(Math.random() * 100) }
      })
    },
    openSubVue () {
      // window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 是qiankun注入的子应用对应的地址，谨慎使用，生产环境建议将跳转地址维护在环境变量中
      window.open('http://192.168.1.15:8082/#/menu3', '_black')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: center;
}
h1 {
  color: #42b983;
}
button{
  margin: 0 5px;
}
code {
  color:blueviolet;
}
</style>
