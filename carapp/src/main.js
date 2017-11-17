// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import store from './vuex/index'
import router from './router/index'
// 引入BaiduMap
import BaiduMap from 'vue-baidu-map'
import App from './App'

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'M0fyxDYyE0KpSjTWxiNFV79paIg9fDqU'
})


/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
