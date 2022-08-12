const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name;

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    // 可以在配置中 配置端口 VUE_APP_PORT = 8080
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*' // 重点1: 允许跨域访问子应用页面
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd', // 把子应用打包成 umd 库格式
      //
      chunkLoadingGlobal: `webpackJsonp_${packageName}`
    }
  },
})
