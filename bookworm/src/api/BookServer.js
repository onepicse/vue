
export default {
	GET_BOOKSTORE_ALLBOOKS (context) {
		/**
		*
		*方法名： 获取图书馆所有图书
		*作者cc
		*
		*/
		return context.$http({
			url : 'http://aishuwo.cn/api/bookServer.php',
			methods : 'GET',
			params : {
				flag : 'allbooks'
			},
			body : {

			},
			before: function () {
				context.$vux.loading.show({
					text: '加载中...'
				});
			}
		})
	},
	GET_USED_ALLBOOKS (context) {
		/**
		*
		*方法名： 获取二手书所有图书
		*作者cc
		*
		*/
		return context.$http({
			url : 'http://aishuwo.cn/api/bookServer.php',
			methods : 'GET',
			params : {
				flag : 'mallBooks'
			},
			body : {

			},
			before: function () {
				context.$vux.loading.show({
					text: '加载中...'
				});
			}
		})
	},
	GET_BOOKINFO (context, book_id) {
		/**
		*
		*方法名： 获取图书馆相应书籍数据
		*需要参数： book_id
		*作者： CC
		*
		*/
		return context.$http({
			url : 'http://aishuwo.cn/api/getInfo.php',
			methods : 'GET',
			params : {
				flag: 'book',
				book_id: book_id
			},
			body : {
				
			},
			before: function () {
				context.$vux.loading.show({
					text: '加载中...'
				});
			}
		});
	},
	GET_USEDBOOKINFO (context, book_id) {
		/**
		*
		*方法名： 获取二手图书相应书籍数据
		*需要参数： book_id
		*作者： CC
		*
		*/
		return context.$http({
			url : 'http://aishuwo.cn/api/bookServer.php',
			methods : 'GET',
			params : {
				flag: 'mallBook',
				bid: book_id
			},
			body : {
				
			},
			before: function () {
				context.$vux.loading.show({
					text: '加载中...'
				});
			}
		});
	},
	SEARCH_BOOKSTORE (context, keyword) {
		/**
		*
		*方法名： 搜索图书
		*注意： 只能搜索图书馆的
		*需要参数：keyword
		*作者： CC
		*
		*/
		return context.$http({
			url : 'http://aishuwo.cn/api/bookServer.php',
			methods : 'GET',
			params : {
				flag: 'search',
				keyword: keyword
			},
			body : {
				
			}
		});
	}
}