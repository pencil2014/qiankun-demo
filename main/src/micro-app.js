import store from './store'

const microApps = [
  {
    name: '菜单1',
    entry: 'http://192.168.1.15:8081', //process.env.VUE_APP_SUB2
    activeRule: '/sub1/',
    sub: [
      {
        name: '子菜单1',
        entry: 'http://192.168.1.15:8081',
        activeRule: '/menu1',
        subRule: '/sub1/#/menu1'
      },
      {
        name: '子菜单2',
        entry: 'http://192.168.1.15:8081',
        activeRule: '/menu2',
        subRule: '/sub1/#/menu2'
      }
    ]
  },
  {
    name: '菜单2',
    entry: 'http://192.168.1.15:8082',
    activeRule: '/sub2/',
    sub: [
      {
        name: '子菜单3',
        entry: 'http://192.168.1.15:8081',
        activeRule: '/menu3',
        subRule: '/sub2/#/menu3'
      },
      {
        name: '子菜单4',
        entry: 'http://192.168.1.15:8081',
        activeRule: '/menu4',
        subRule: '/sub2/#/menu4'
      }
    ]
  },
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
