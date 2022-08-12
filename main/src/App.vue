<template>
  <div id="app">
    <div class="menu-box">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        :default-openeds="['0','1','2']"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu :index="`${index}`" v-for="(item, index) in microApps" :key="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group v-if="item.sub" >
            <el-menu-item :index="`${index}-${i}`" v-for="(ele, i) in item.sub" :key="i" @click="goto(ele)">{{ele.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="cnt-box">
      <div class="tag-box" v-if="current !== '#/'">
       <ul>
        <li  v-for="(item,index) in tagArr" :key="index"  @click="goto(item)" :class="{active: item.subRule.includes(current)}">{{item.name}}</li>
       </ul>
      </div>
      <div class="main-box">
        <router-view />
        <div id="subapp-viewport"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from "nprogress";
import microApps from "./micro-app";
import store from './store'
export default {
  name: "App",
  components: {},
  data() {
    return {
      isLoading: true,
      microApps,
      current: "/",
      tagArr: [],
      active: '',
      defaultActive: ''
    };
  },
  watch: {
    isLoading(val) {
      if (val) {
        NProgress.start();
      } else {
        this.$nextTick(() => {
          NProgress.done();
        });
      }
    },
  },
  methods: {
    goto (item) {
      this.active = item.name
      store.setGlobalState({
        path: item.subRule
      })
      let activeRule = this.tagArr.map(ele => ele.activeRule)
      if (!activeRule.includes(item.activeRule)) {
        this.tagArr.push(item)
      }
      history.pushState(null, item.activeRule, item.subRule)
    },
    bindCurrent() {
      let {hash} = window.location
      this.current = hash
      let text = {
        '#/menu1': '0-0',
        '#/menu2': '0-1',
        '#/menu3': '1-0',
        '#/menu4': '1-1',
        '#/': ''
      }
      this.defaultActive = text[hash] || ''
    },
    listenRouterChange() {
      const _wr = function (type) {
        const orig = history[type];
        return function () {
          const rv = orig.apply(this, arguments);
          const e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return rv;
        };
      };
      history.pushState = _wr("pushState");
      window.addEventListener("pushState", this.bindCurrent);
      window.addEventListener("popstate", this.bindCurrent);

      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("pushState", this.bindCurrent);
        window.removeEventListener("popstate", this.bindCurrent);
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    state () {
      return store.getGlobalState()
    },
  },
  created() {
    this.bindCurrent();
    NProgress.start();
  },
  mounted() {
    this.listenRouterChange();
    this.isLoading = false;
  },
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}
#app {
  display: flex;
}
.menu-box {
  flex-basis: 300px;
  flex-shrink: 0;
}
.cnt-box {
  flex: 1;
}
.tag-box{
}
.tag-box ul {
  list-style: none;
  display: flex;
  background-color:#eee;
  color: #000;
  font-size: 12px;
}
.tag-box ul li{
  width: 100px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.tag-box ul li.active{
  background-color: #42b983;
  color: #fff;
}
</style>
