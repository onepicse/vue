// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import store from './vuex/index'
import router from './router/index'
import vueResource from 'vue-resource'
import App from './App'

Vue.use(vueResource)

require('./assets/css/animate.css')
require('./assets/css/icon_style.css')

import  { AlertPlugin, ToastPlugin, WechatPlugin, LoadingPlugin, ConfirmPlugin  } from 'vux'

Vue.use(ConfirmPlugin)
Vue.use(WechatPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

/*this.$http.post('http://aishuwo.cn/api/wechat.php').then(res => {
 	*
		后端返回数据格式
		需要为一个对象，并且存放config中配置的相应属性
		wx.config({
		    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: '', // 必填，公众号的唯一标识
		    timestamp: , // 必填，生成签名的时间戳
		    nonceStr: '', // 必填，生成签名的随机串
		    signature: '',// 必填，签名，见附录1
		    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		
	wx.config(res.data)
})
wx.ready(() => {
	//微信jssdk验证完成 可以调用微信相关接口

})*/

FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
	store.commit('UPDATELOADINGSTATUS', {isLoading: true})
	next()
})

router.afterEach((route, from, next) => {
	store.commit('UPDATELOADINGSTATUS', {isLoading: false});
	if(from.path === '/' || from.path === '/User' || from.path === '/Classify' || from.path === '/Discovery/topic' ){
		store.commit('UPDATE_DIRECTION', 'forward')
	}else{
		store.commit('UPDATE_DIRECTION', 'back')
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app-box')
