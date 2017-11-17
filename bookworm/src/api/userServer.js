/**
*
*user相关数据服务
*API
*作者： CC
*
*/

export default {
	GET_USER_USEDBOOK (context, uid) {
		//获取用户出售的二手图书
		return context.$http({
			url : 'http://aishuwo.cn/api/bookServer.php',
			methods : 'GET',
			params : {
				flag: 'myBooks',
				uid: uid
			},
			body : {
				
			},
			before: function () {
				context.$vux.loading.show({
					text: '加载中...'
				});
			}
		});
	}
}