<template>
  <div class="hello">
    <h1>这是来自子项目1的页面</h1>
    <p>当前处于 Vue2 子应用运行环境</p>
    <p>当前的global state：<code> {{ JSON.stringify(global.user) }}</code></p>
    <button @click="gotoSub2">跳转到sub2子应用</button>
    <button @click="changeUsername">改变全局的用户名称</button>
    <button @click="goHome">返回首页</button>
  </div>
</template>

<script>
import actions from '../action'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      global: ''
    }
  },
  methods: {
    gotoSub2() {
       history.pushState(null, 'sub2', '/sub2/#/menu3')
    },
    goHome() {
       history.pushState(null, '', '/')
    },
    changeUsername () {
      // 也可通过 store.commit('global/setGlobalState', { user: '李四' }) 进行操作
      actions.setGlobalState({
        user: { name: '李四' + Math.round(Math.random() * 100) }
      })
    },
  },
  mounted() {
    actions.onGlobalStateChange((state)=>{
      this.global = state
    },true)
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
