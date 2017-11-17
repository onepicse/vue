// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

require('../static/css/animate.css') 

import discovery from '@/components/discovery/discovery'
import myself from '@/components/myself/myself'
import friends from '@/components/friends/friends'
import user from '@/components/user/user'
import toplist from '@/components/toplist/toplist'
import audio from '@/components/audio/audio'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(vueResource)
Vue.use(MuseUI)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playIndex: 0,
    songList: [],
    topList: [],
    isPlay:false,
    isLoop:false,
    isShowAudio: false,
    isShowtopList: false,
    isloading: false
  },
  mutations: {
    update (state) {
      localStorage.setItem("songList",JSON.stringify(state.songList));
    },
    getStorageData (state) {
      state.songList = JSON.parse(localStorage.getItem("songList") || '[]');
    }
  }
})


const routes = [
	{ path:'/discovery',component: discovery},
	{ path:'/myself',component: myself},
	{ path:'/friends',component: friends},
	{ path:'/user',component: user},
	{ path:'/toplist',component: toplist},
  { path:'/audio',component: audio}
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
  components: { App }
}).$mount('#app')
