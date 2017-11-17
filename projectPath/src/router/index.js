import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Class from '@/components/Class'
import Community from '@/components/Community'
import Me from '@/components/Me'

Vue.use(Router)

export default new Router({
  routes: [
    {
	    path: '/',
	    name: 'Index',
	    component: Index
    },
    {
    	path: '/class',
    	name: 'Class',
    	component: Class
    },
    {
    	path: '/community',
    	name: 'Community',
    	component: Community
    },
    {
    	path: '/me',
    	name: 'Me',
    	component: Me
    }
  ]
})
