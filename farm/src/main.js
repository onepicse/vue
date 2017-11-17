// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//状态管理模式
import Vuex from 'vuex'
//路由
import VueRouter from 'vue-router'
//与后端交互数据
import vueResource from 'vue-resource'
// 引入vue-amap
// import AMap from 'vue-amap';

// 引入BaiduMap
import BaiduMap from 'vue-baidu-map'
// 引入 qarts
import VueQArt from 'vue-qart'

import App from './App'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

require('../static/css/animate.css') 

import index from '@/components/index/index'
import trip from '@/components/trip/trip'
import idea from '@/components/idea/idea'
import user from '@/components/user/user'
import seller from '@/components/seller/seller'
import comment from '@/components/comment/comment'
import commodity from '@/components/commodity/commodity'
import map from '@/components/map/map'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(vueResource)
Vue.use(MuseUI)
Vue.use(Vuex)





// Vue.use(AMap);

// 初始化vue-amap
// AMap.initAMapApiLoader({
//   // 申请的高德key
//   key: '115ba565fde3c0bdb43978e6f345e632',
//   // 插件集合
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
// });

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'M0fyxDYyE0KpSjTWxiNFV79paIg9fDqU'
})


const store = new Vuex.Store({
  state: {
      user:{
        userId: '',
        userName: '',
        userAvatar: '',
        tel: '',
        sex: '',
        point: {},
        city: ""
      },
      travelPeoples: [

      ],
      seller: {},
      //商品
      commodity: {},
      //商品评论
      comments: [],
      //购物车
      shopChar: [],
      //订单
      order:{
          //所有订单
          allOrder: [],
          //待付款
          waitPayOrder: [
            
          ],
          //待使用
          waitUse: [],
          //待评价
          waitComment: [],
          //退款单
          refund: []
      },
      articleTime: 0,
      isLoading: false,
      isLogin: false,
      showLogin: true,
      showRegister: false,
  	  showBottomNav: true,
      showseller: false,
      showcommodity: false,
      showcomment: false,
      showMap: false,
      showOrders: false,
      showShopCar: false,
      showSetting: false,
      showPostOrder: false,
      showCollection: false,
      showGoOutPepole: false,
      showIntegration: false,
      showIdeaArticle: false,
      showSearchPage: false,
      showWriteArticle: false,
      showUserLocation: false,
      showOperationSuccess: false,
      showOperationError: false,
      showEadit: false,
      showAddPepole: false,
      showTravalArticle: false,
      showTravalPhoto: false,
      showOrderWriteComment: false,
      showOrderSharPhoto: false,
      showOrderWriteArticle: false,
      showMycode: false,
      showGoPage: false,
      showEatPage: false,
      showSharImage: false,
      showShopCharPostOrder: false,
      showOrderInfo: false,
      showShoppingAddress: false,
      showFeedback: false
  }
})

const routes = [
	{ path:'*/index',component:index },
	{ path:'/trip',component:trip },
	{ path:'/idea',component:idea },
	{ path:'/user',component:user },
  { path:'/seller',component:seller },
  { path:'/comment',component:comment },
	{ path:'/commodity',component:commodity },
  { path:'/map',component:map }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, 
  template: '<App/>',
  components: { App , VueQArt}
}).$mount('#app')