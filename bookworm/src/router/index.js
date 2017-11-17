import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index/Index'
	import Hot from '@/components/Index/Hot'
	import Literature from '@/components/Index/Literature'
	import Recommend from '@/components/Index/Recommend'
	import Special from '@/components/Index/Special'
import Classify from '@/components/Classify/Classify'
	import BookStore from '@/components/Classify/BookStore'
	import UsedBook from '@/components/Classify/UsedBook'
import Discovery from '@/components/Discovery/Discovery'
	import Find from '@/components/Discovery/Find'
	import Topic from '@/components/Discovery/Topic'
import User from '@/components/User/User'
	import UserIndex from '@/components/User/UserIndex'
	import UserIntegration from '@/components/User/UserIntegration'
	import UserWallet from '@/components/User/UserWallet'
	import UserCoupon from '@/components/User/UserCoupon'
	import UserOrder from '@/components/User/UserOrder'
	import BookBasket from '@/components/User/BookBasket'
	import MyBook from '@/components/User/MyBook'
	import MyCollection from '@/components/User/MyCollection'
	import Setting from '@/components/User/Setting'
	import PostOrder from '@/components/User/PostOrder'
import BookInfo from '@/components/BookInfo/BookInfo'
import UsedBookInfo from '@/components//UsedBookInfo/UsedBookInfo'

Vue.use(Router)

export default new Router({
	mode: 'history',
    base: __dirname,
	routes: [
		{
			path: '/',
			component: Index
		},
		{
			path: '/Hot',
			component: Hot
		},
		{
			path: '/Literature',
			component: Literature
		},
		{
			path: '/Recommend',
			component: Recommend
		},
		{
			path: '/Special',
			component: Special
		},
		{
			path: '/Classify',
			component: Classify,
			children: [
				{
					path: '/',
					component: BookStore
				},
				{
					path: 'usedBook',
					component: UsedBook
				}
			]
		},
		{
			path: '/Discovery',
			component: Discovery,
			children: [
				{
					path: '/',
					component: Find
				},
				{
					path: 'topic',
					component: Topic
				}
			]
		},
		{
			path: '/User',
			component: User,
			children: [
				{
					path: '/',
					component: UserIndex
				},
				{
					path: 'userIntegration',
					component: UserIntegration
				},
				{
					path: 'userWallet',
					component: UserWallet
				},
				{
					path: 'userCoupon',
					component: UserCoupon
				},
				{
					name: 'userOrder',
					path: 'userOrder/:tabIndex',
					component: UserOrder
				},
				{
					path: 'bookBasket',
					component: BookBasket
				},
				{
					path: 'myBook',
					component: MyBook
				},
				{
					path: 'myCollection',
					component: MyCollection
				},
				{
					path: 'setting',
					component: Setting
				},
				{
					path: 'postOrder',
					component: PostOrder
				}
			]
		},
		{
			path: '/BookInfo',
			component: BookInfo
		},
		{
			path: '/UsedBookInfo',
			component: UsedBookInfo
		}
	]
})
