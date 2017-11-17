import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	pageScrollTop: 0,
	isLogin: false,
	isLoading: false,
	direction: 'forward',
	swipers: [
	'http://oqcwstdev.bkt.clouddn.com/wallhaven-297714.jpg',
	'http://oqcwstdev.bkt.clouddn.com/wallhaven-7494.jpg',
	'http://oqcwstdev.bkt.clouddn.com/wallhaven-251198%20%281%29.jpg'
	],
	indexGrid: {
		hot: [
			{
				book_id: 1,
				book_banner: 'http://oqcwstdev.bkt.clouddn.com/25069331-1_w_10.jpg',		
			},
			{
				book_id: 2,
				book_banner: 'https://img12.360buyimg.com/n1/13555/875beab6-77aa-44c0-b935-fbde6caff963.jpg',
			}
		],
		recommend: [
			{
				book_id: 1,
				book_banner: 'http://oqcwstdev.bkt.clouddn.com/25069331-1_w_10.jpg',		
			},
			{
				book_id: 2,
				book_banner: 'https://img12.360buyimg.com/n1/13555/875beab6-77aa-44c0-b935-fbde6caff963.jpg',
			}
		],
		special: [
			{
				title: '六一·第二趴',
				img: 'http://oncxzyx3a.bkt.clouddn.com/special-2.jpg',
				date: '2017-6-3'
			},{
				title: '六一·第二趴',
				img: 'http://oncxzyx3a.bkt.clouddn.com/special-1.jpg',
				date: '2017-6-1'
			}
		],
		literature: [
			{
				book_id: 1,
				book_banner: 'http://oqcwstdev.bkt.clouddn.com/25069331-1_w_10.jpg',		
			},
			{
				book_id: 2,
				book_banner: 'https://img12.360buyimg.com/n1/13555/875beab6-77aa-44c0-b935-fbde6caff963.jpg',
			}
		]
	},
	bookInfo: {
		book_id: null,
		book_banner: null,
		book_name: null,
		book_author: null,
		book_inventory: null,
		book_originalPric: null,
		book_borrowPric: null,
		book_publishingHouse: null,
		book_publishingTime: null,
		book_ISBN: null,
		book_introduction: null,
		book_catalog: null,
		comments: [
		{
			u_id: null,
			comment_avarta: null,
			comment_name: null,
			comment_content: null,
			comment_likenum: null,
			comment_score: null,
			comment_date: null
		}
		]		
	},
	usedBookInfo: {
		u_id: 1,
		u_name: '熔熔',
		u_avarta: 'http://oqcwstdev.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720170522215602.jpg',
		u_tell: '13389634270',
		book_id: 2,
		book_banner: 'https://img12.360buyimg.com/n1/13555/875beab6-77aa-44c0-b935-fbde6caff963.jpg',
		book_name: '生如夏花',
		book_author: '泰戈尔',
		book_publishingHouse: '台海出版社',
		book_publishingTime: '2017年04月',
		book_introduction:'用户对这本书的简介',
		book_ISBN: '9787516813379',
		book_sellPric: 20,
		book_depreciation: '九成新'
	},
	booktabsIndex: 0,
	booktabsTitle: '推荐',
	booktabs: [
	// {
	// 	type: 0,
	// 	name: '推荐',
	// 	bookdatas: [
	// 	{
	// 		book_id: 1,
	// 		book_banner: 'http://oqcwstdev.bkt.clouddn.com/25069331-1_w_10.jpg',		
	// 	},
	// 	{
	// 		book_id: 2,
	// 		book_banner: 'https://img12.360buyimg.com/n1/13555/875beab6-77aa-44c0-b935-fbde6caff963.jpg',
	// 	}
	// 	]
	// },
	{
		type: 1,
		name: '文学',
		bookdatas: []
	},
	{
		type: 2,
		name: '教育',
		bookdatas: []
	},
	{
		type: 3,
		name: '生活',
		bookdatas: []
	},
	{
		type: 4,
		name: '艺术',
		bookdatas: []
	},
	{
		type: 5,
		name: '科技',
		bookdatas: []
	},
	{
		type: 6,
		name: '经营',
		bookdatas: []
	},
	{
		type: 7,
		name: '职场',
		bookdatas: []
	},
	],
	classify: {
		selectedBTN: '图书馆',
		bookStore: [
			{
				book_id: 1,
				book_banner: 'http://oqcwstdev.bkt.clouddn.com/25069331-1_w_10.jpg',
				book_name: '走进奇妙的虫子世界',
				book_author: '尤瓦·左默',
				book_borrowPric: 20,
				book_inventory: 0,
			}
		],
		usedBook: [
			{
				u_id: 1,
				u_name: '熔熔',
				u_avarta: 'http://oqcwstdev.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720170522215602.jpg',
				u_tell: '13389634270',
				book_id: 2,
				book_banner: 'https://img12.360buyimg.com/n1/13555/875beab6-77aa-44c0-b935-fbde6caff963.jpg',
				book_name: '生如夏花',
				book_author: '泰戈尔',
				book_publishingHouse: '台海出版社',
				book_publishingTime: '2017年04月',
				book_introduction:'用户对这本书的简介',
				book_ISBN: '9787516813379',
				book_sellPric: 20,
				book_depreciation: '九成新'
			}
		]
	},
	discovery: {
		book_review: {
			activeIndex: 0,
			tabName: '热门',
			isShowBookReviewDetails: false,
			hots: [
			{
				u_id: 3,	
				u_avarta: 'http://oqcwstdev.bkt.clouddn.com/IMG_0899.JPG',
				u_name: 'C的平方',
				score: 4,
				comment_content: '之前在书店看见过原版就特别心动，没想到这么快就出了中文版，太好啦~在看这本书之前，觉得虫子都挺可怕的，但是这本书中的虫子都是很清新狠可爱的，也让我发现了另一种美，原来虫子的世界这么有意思！',
				comment_book: {
					book_id: 1,
					book_name: '走进奇妙的虫子世界',
					book_banner: 'http://oqcwstdev.bkt.clouddn.com/25069331-1_w_10.jpg',
					book_author: '尤瓦·左默',
				},
				date: '2017-5-27 9:45',
				comments: [
				{
					comment_avarta: 'http://oqcwstdev.bkt.clouddn.com/IMG_0899.JPG',
					comment_name: 'C的平方',
					comment_content: '评价的非常有好哎，我准备去图书馆借一波',
					comment_date: '2017-5-23 16:02'
				}
				],
				isLove: true,
				lovenum: 25
			},
			{
				u_id: 3,	
				u_avarta: 'http://oqcwstdev.bkt.clouddn.com/IMG_0899.JPG',
				u_name: 'C的平方',
				score: 5,
				comment_content: '独立斜阳，看着孤寂的黄昏，突然一丝清风划过，带来阵阵清凉，吹散了深秋的一抹闲愁，迎来了初冬的一抹暖阳，照耀着人们心田，静下心，将这万象看做镜花水月，万事如空，如那喜欢的佛语：一花一天堂，一草一世界，一树一菩提，一土一如来，一方一净土，一笑一尘缘，一念一清净，心开似莲花。执一份清净，忘一段尘缘，一心无忧便可一世无愁。既然生，就生如夏花般绚烂。',
				comment_book: {
					book_id: 2,
					book_name: '生如夏花',
					book_banner: 'https://img12.360buyimg.com/n1/13555/875beab6-77aa-44c0-b935-fbde6caff963.jpg',
					book_author: '泰戈尔',
				},
				date: '2017-5-27 9:45',
				comments: [
				{
					comment_avarta: 'http://oqcwstdev.bkt.clouddn.com/IMG_0899.JPG',
					comment_name: 'C的平方',
					comment_content: '评价的非常有好哎，我准备去图书馆借一波',
					comment_date: '2017-5-23 16:02'
				}
				],
				isLove: false,
				lovenum: 25
			}
			],
			news: [
			{
				u_id: 3,	
				u_avarta: 'http://oqcwstdev.bkt.clouddn.com/IMG_0899.JPG',
				u_name: 'C的平方',
				score: 4,
				comment_content: '独立斜阳，看着孤寂的黄昏，突然一丝清风划过，带来阵阵清凉，吹散了深秋的一抹闲愁，迎来了初冬的一抹暖阳，照耀着人们心田，静下心，将这万象看做镜花水月，万事如空，如那喜欢的佛语：一花一天堂，一草一世界，一树一菩提，一土一如来，一方一净土，一笑一尘缘，一念一清净，心开似莲花。执一份清净，忘一段尘缘，一心无忧便可一世无愁。既然生，就生如夏花般绚烂。',
				comment_book: {
					book_id: 2,
					book_name: '生如夏花',
					book_banner: 'https://img12.360buyimg.com/n1/13555/875beab6-77aa-44c0-b935-fbde6caff963.jpg',
					book_author: '泰戈尔',
				},
				date: '2017-5-27 9:45',
				comments: [
				{
					comment_avarta: 'http://oqcwstdev.bkt.clouddn.com/IMG_0899.JPG',
					comment_name: 'C的平方',
					comment_content: '评价的非常有好哎，我准备去图书馆借一波',
					comment_date: '2017-5-23 16:02'
				}
				],
				isLove: false,
				lovenum: 25
			}
			],
			focuses: [

			]
		},
		topic: {
			activeIndex: 0,
			tabName: '热门',
			hots: [
			{
				u_id: 4,	
				u_avarta: 'http://oncxzyx3a.bkt.clouddn.com/IMG_0983.JPG',
				u_name: '那年高三',
				topic_content: '',
				date: '2017-5-27 9:45',
				isLove: false,
				lovenum: 25,
				comments: [

				]
			}
			],
		}
	},
	user: {
		u_id: 1,
		u_studentId: 2014210606,
		u_tell: 18523530295,
		u_avarta: 'http://oqcwstdev.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720170522215602.jpg',
		u_name: '熔熔',
		u_realName: '许烜熔',
		u_books: [
			
		],
    	//钱包
    	u_wallet: {
    		remaining: 50,
    		out: 20,
    		walletInfo: {
    			inInfos: [
    			{
    				title: '营业收入',
    				date: '2017-5-25 5:18',
    				from: '订单交易成功',
    				money: '20'
    			},
    			{
    				title: '营业收入',
    				date: '2017-5-22 2:20',
    				from: '订单交易成功',
    				money: '10'
    			}
    			],
    			outInfos: [
    			{
    				title: '购买图书',
    				date: '2017-5-20 18:18',
    				from: '订单交易成功',
    				money: '15'
    			}
    			]
    		}
    	},
    	//积分
    	u_integration: {
    		remaining: 100,
    		out: 0,
    		integrationInfo: {
    			inInfos: [
    			{
    				title: '完成任务',
    				date: '2017-5-25 5:18',
    				from: '萌新注册赠送',
    				money: '100'
    			},
    			],
    			outInfos: [

    			]
    		}
    	},
    	//优惠劵
    	u_coupon: {
    		num: 2,
    		newCouponInfos: [
    			{
	    			ouponSerialNumber: 201706850004,
	    			money: 20,
	    			deadlineDate: '2017-10-01'
	    		},
	    		{
	    			ouponSerialNumber: 201706850003,
	    			money: 10,
	    			deadlineDate: '2017-10-01'
	    		},
	    		{
	    			ouponSerialNumber: 201706850002,
	    			money: 5,
	    			deadlineDate: '2017-10-01'
	    		}
    		],
    		usedCouponInfos: [
	    		{
	    			ouponSerialNumber: 201706850001,
	    			money: 20,
	    			deadlineDate: '2017-3-2'
	    		}
    		] 
    	}
    },
    order: {
    	//所有订单
    	order_all: [
    		
    	],
    	//等待付款
    	order_waitPay: [

    	],
    	//等待归还
    	order_waitRefresh: [

    	],
    	//等待评论
    	order_waitComment: [

    	],
    	//退款单
    	order_refund: [

    	]
    },
    bookBasket: {
    	bookStore: [
			{
				book_id: 2,
				book_name: '生如夏花',
				book_banner: 'https://img12.360buyimg.com/n1/13555/875beab6-77aa-44c0-b935-fbde6caff963.jpg',
				book_author: '泰戈尔',
				book_borrowPric: 20

			},
			{
				book_id: 1,
				book_name: '走进奇妙的虫子世界',
				book_banner: 'http://oqcwstdev.bkt.clouddn.com/25069331-1_w_10.jpg',
				book_author: '尤瓦·左默',
				book_borrowPric: 16.25
			}
    	],
    	usedBook:[
    		{
				book_id: 1,
				book_name: '走进奇妙的虫子世界',
				book_banner: 'http://oqcwstdev.bkt.clouddn.com/25069331-1_w_10.jpg',
				book_author: '尤瓦·左默',
				book_sellPric: 16.25,
				book_depreciation: '九成新',
				seller: {
					u_id: 1,
					u_name: '熔熔',
					u_tell: 13389634270
				}
			}
    	]
    },
    postOrderInfo: {
    	from: null,
    	index: null,
    	date: {
	    	borrowDate: null,
	    	returnDate: null,
	    },
    	bookStore: {
	    	book_id: null,
			book_name: null,
			book_banner: null,
			book_author: null,
			book_borrowPric: null
    	},
    	usedBook: {
	    	book_id: null,
			book_name: null,
			book_banner: null,
			book_author: null,
			book_sellPric: null,
			book_depreciation: null,
			seller: {
				u_id: null,
				u_name: null,
				u_tell: null
			}
    	}
    	
    	
    }
}

const mutations = {
	UPDATE_PAGESCROLLTOP (state, num) {
		state.pageScrollTop = num;
	},
	UPDATELOADINGSTATUS (state, payload) {
		state.isLoading = payload.isLoading
	},
	UPDATE_DIRECTION (state, direction) {
		state.direction = direction
	},
	UPDATE_U_AVARTA (state, newAvarta) {
    	//更新头像
    	state.u_avarta = newAvarta;
    },
    UPDATE_U_NAME (state, newName) {
    	//更新名字 
    	state.u_name = newName;
    },
    UPDATE_INDEX_BOOKTABSINDEX (state, index) {
    	state.booktabsIndex = index;
    },
    UPDATE_INDEX_BOOKTABSTITLE (state, title) {
    	state.booktabsTitle = title;
    },
    UPDATE_INDEX_TAB (state, data) {
    	//根据index不同更新不同index的数据
    	state.booktabs[data.index].bookdatas = data.books;
    },
    UPDATE_BOOKINFO (state, bookInfo) {
		//更新书籍详情
		state.bookInfo = bookInfo;
	},
	UPDATE_USEDBOOKINFO (state, bookInfo) {
		//更新书籍详情
		state.usedBookInfo = bookInfo;
	},
	UPDATE_CLASSIFY_SELECTEDBTN (state, selectedBtn) {
		//跟新分类tab的selectedBtn
		state.classify.selectedBTN = selectedBtn;
	},
	UPDATE_CLASSIFY_BOOKSTORE (state, books) {
		//跟新分类中图书馆中的书籍
		state.classify.bookStore = books;
	},
	UPDATE_CLASSIFY_USEDBOOK (state, books) {
		//跟新分类中二手书中的书籍
		state.classify.usedBook = books;
	},
	UPDATE_DISCOVERY_ACTIVEINDEX (state, index) {
		//书评的tab的activeIndex
		state.discovery.book_review.activeIndex = index;
	},
	
	UPDATE_DISCOVERY_TABNAME (state, tabName) {
		//书评的tab的tabname
		state.discovery.book_review.tabName = tabName;
	},
	UPDATE_DISCOVERY_TOPIC_ACTIVEINDEX (state, index) {
		//话题的tab的activeIndex
		state.discovery.topic.activeIndex = index;
	},
	UPDATE_DISCOVERY_TOPIC_TABNAME (state, tabName) {
		//话题的tab的tabName
		state.discovery.topic.tabName = tabName;
	},
	UPDATE_DISCOVERY_ISSHOWBOOKREVIEWDETAILS (state, isShow) {
		state.discovery.book_review.isShowBookReviewDetails = isShow;
	},
	UPDATE_DISCOVERY_NEWS (state, newBookReview) {
		//发表书评 并对 news里进行新增
		state.discovery.book_review.news.unshift(newBookReview)
	},
	UPDATE_USER_U_BOOKS (state, books) {
		//对用户的图书进行更新
		state.user.u_books = books; 
	},
	DELETE_USER_MYBOOK (state, index){
		state.user.u_books.splice(index,1)
	},
	ADD_BOOKBASKET_BOOKSTORE (state, book) {
		//把图书馆的书放到书篮
		state.bookBasket.bookStore.push(book);
	},
	DELETE_BOOKBASKET_BOOKSTORE (state, index) {
		//删除书篮中的图书版块里面的图书
		state.bookBasket.bookStore.splice(index,1)
	},
	DELETE_BOOKBASKET_USEDBOOK (state, index) {
		//删除书篮中的图书版块里面的图书
		state.bookBasket.usedBook.splice(index,1)
	},
	UPDATE_USER_U_WALLET_MONEY (state, money) {
		//更新用户钱包的余额和花掉的钱
		state.user.u_wallet.remaining = parseFloat(state.user.u_wallet.remaining) - money;
		state.user.u_wallet.out = parseFloat(state.user.u_wallet.out) + money;
	},
	UPDATE_ALL_OREDER (state, order) {
		//更新所有订单中的订单
		state.order.order_all.push(order);
	},
	UPDATE_WAIT_PAY (state, order) {
		//更新等待付款中的订单
		state.order.order_waitPay.push(order);
	},
	UPDATE_WAIT_REFRESH (state, order) {
		//更新等待归还中的订单
		state.order.order_waitRefresh.push(order);
	},
	UPDATE_WAIT_COMMENT (state, order) {
		//更新等待评论中的订单
		state.order.order_waitComment.push(order);
	},
	UPDATE_REFUND (state, order) {
		//更新等待退款中的订单
		state.order.order_refund.push(order);
	},
	ADD_USER_U_WALLET_OUTINFOS (state, outInfo){
		state.user.u_wallet.walletInfo.outInfos.push(outInfo);
	},
	UPDATE_POSTORDERINFO (state, info) {
		state.postOrderInfo = info
	}
}

const actions = {
	UPDATE_U_AVARTA ({ commit},newAvarta ) {
		//更新头像动作
		commit('UPDATE_U_AVARTA',newAvarta)
	},
	UPDATE_U_NAME ({ commit},newName ) {
		//更新名字动作
		commit('UPDATE_U_NAME',newName)
	},
	UPDATE_BOOKINFO ({ commit}, bookInfo) {
		//更新书籍详情动作
		commit('UPDATE_BOOKINFO',bookInfo)
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})