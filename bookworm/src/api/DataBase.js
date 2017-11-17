/**
*
*app基础数据
*API
*作者： CC
*
*/

export default {
	GET_INDEX_BASEDATA (context) {
		//获取INDEX页面的相关初始数据
		return context.$http({
			url : 'http://aishuwo.cn/api/',
			methods : 'GET',
			params : {
				//传递的参数
			},
			body : {
				
			}
		});
	},
	GET_INDEX_BASEDATA (context, index) {
		//获取INDEX页面中TAB所选的相关数据
		//传入分类的名字
		return context.$http({
			url : 'http://aishuwo.cn/api/bookServer.php',
			methods : 'GET',
			params : {
				flag: 'type',
				typeid: index
			},
			body : {
				
			}
		});
	},
	GET_CLASSIFY_BASEDATA (context) {
		//获取CLASSIFY页面的相关初始数据
		return context.$http({
			url : 'http://aishuwo.cn/api/',
			methods : 'GET',
			params : {
				//传递的参数
			},
			body : {
				
			}
		});
	},
	GET_DISCOVERY_BASEDATA (context) {
		//获取DISCOVERY页面的相关初始数据
		return context.$http({
			url : 'http://aishuwo.cn/api/',
			methods : 'GET',
			params : {
				//传递的参数
			},
			body : {
				
			}
		});
	},
	GET_USER_BASEDATA (context) {
		//获取USER页面的相关初始数据
		return context.$http({
			url : 'http://aishuwo.cn/api/',
			methods : 'GET',
			params : {
				//传递的参数
			},
			body : {
				
			}
		});
	}
}