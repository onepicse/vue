<template>
	<div id="app">
		<view-box ref="viewBox" body-padding-bottom="50px">
			<transition :name="'vux-' + (direction === 'forward' ? 'in' : 'out')">
				<router-view class="router-view"></router-view>
			</transition>
			<tabbar slot="bottom">
				<tabbar-item selected link="/">
					<i slot="icon" class="icon-book"></i>
					<span slot="label">书库</span>
				</tabbar-item>
				<tabbar-item link="/Classify">
					<i slot="icon" class="icon-classify"></i>
					<span slot="label">分类</span>
				</tabbar-item>
				<tabbar-item link="">
					<i slot="icon" class=""></i>
					<span slot="label"></span>
				</tabbar-item>
				<tabbar-item link="/Discovery">
					<i slot="icon" class="icon-discovery"></i>
					<span slot="label">发现</span>
				</tabbar-item>
				<tabbar-item link="/User">
					<i slot="icon" class="icon-user"></i>
					<span slot="label">我的</span>
				</tabbar-item>
				<div @click.stop="doScanQRCode" class="tabbar-round">
					<i class="icon-scan"></i>
				</div>
			</tabbar>
		</view-box>
	</div>
</template>

<script>
	import { ViewBox, Tabbar, TabbarItem, TransferDom  } from 'vux'
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'app',
		directives: {
			TransferDom
		},
		components: {
			ViewBox,
			'tabbar' : Tabbar,
			'tabbar-item' : TabbarItem,
			TransferDom
		},
		data () {
			return{

			}
		},
		created () {
			const wx = this.$wechat;
			// const permissions = JSON.stringify(['scanQRCode']);
			const url = document.location.href;
			this.$http.get('http://aishuwo.cn/api/wechat/wechat.php?url=' + encodeURIComponent(url.split('#')[0])).then(res => {
					wx.config({
						debug: true,
						appId: res.data.appId,
						timestamp: res.data.timestamp,
						nonceStr: res.data.nonceStr,
						signature: res.data.signature,
						jsApiList: [
							"checkJsApi",
							'onMenuShareTimeline',
							'onMenuShareAppMessage',
							'onMenuShareQQ',
							'onMenuShareWeibo',
							'onMenuShareQZone',
							'startRecord',
							'stopRecord',
							'onVoiceRecordEnd',
							'playVoice',
							'pauseVoice',
							'stopVoice',
							'onVoicePlayEnd',
							'uploadVoice',
							'downloadVoice',
							'chooseImage',
							'previewImage',
							'uploadImage',
							'downloadImage',
							'translateVoice',
							'getNetworkType',
							'openLocation',
							'getLocation',
							'hideOptionMenu',
							'showOptionMenu',
							'hideMenuItems',
							'showMenuItems',
							'hideAllNonBaseMenuItem',
							'showAllNonBaseMenuItem',
							'closeWindow',
							'scanQRCode',
							'chooseWXPay',
							'openProductSpecificView',
							'addCard',
							'chooseCard',
							'openCard'
						]
					})
			  })
			// this.$http.post('http://aishuwo.cn/api/wechat.php').then(res => {
			// 	wx.config({
			// 		debug: true,
			// 		appId: res.data.appId,
			// 		timestamp: res.data.timestamp,
			// 		nonceStr: res.data.nonceStr,
			// 		signature: res.data.signature,
			// 		jsApiList: [
			// 			"checkJsApi",
			// 			'onMenuShareTimeline',
			// 			'onMenuShareAppMessage',
			// 			'onMenuShareQQ',
			// 			'onMenuShareWeibo',
			// 			'onMenuShareQZone',
			// 			'startRecord',
			// 			'stopRecord',
			// 			'onVoiceRecordEnd',
			// 			'playVoice',
			// 			'pauseVoice',
			// 			'stopVoice',
			// 			'onVoicePlayEnd',
			// 			'uploadVoice',
			// 			'downloadVoice',
			// 			'chooseImage',
			// 			'previewImage',
			// 			'uploadImage',
			// 			'downloadImage',
			// 			'translateVoice',
			// 			'getNetworkType',
			// 			'openLocation',
			// 			'getLocation',
			// 			'hideOptionMenu',
			// 			'showOptionMenu',
			// 			'hideMenuItems',
			// 			'showMenuItems',
			// 			'hideAllNonBaseMenuItem',
			// 			'showAllNonBaseMenuItem',
			// 			'closeWindow',
			// 			'scanQRCode',
			// 			'chooseWXPay',
			// 			'openProductSpecificView',
			// 			'addCard',
			// 			'chooseCard',
			// 			'openCard'
			// 		]
			// 	})
			// });	
		},
		computed: {
			...mapState({
				route: state => state.route,
				path: state => state.route.path,
				direction: state => state.direction,
				isLoading: state => state.isLoading
			})
		},
		methods: {
			doScanQRCode() {
				const wx = this.$wechat;
				wx.ready(() => {
					wx.scanQRCode({
						needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
						success: function (res) {
						    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						}
					});
					// wx.getNetworkType({
					//     success: function (res) {
					//         var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
					//         console.log(networkType)
					//     }
					// });
				})	
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import './assets/css/theme.less';
	body,html{
		height: 100%;
		width: 100%;
		overflow-x: hidden;
		background-color: #f3f2f0;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	#app{
		width: 100%;
		height: 100%;
	}
	.router-view {
		width: 100%;
	}
	.vux-out-enter-active,
	.vux-out-leave-active,
	.vux-in-enter-active,
	.vux-in-leave-active {
		will-change: transform;
		transition: all 500ms;
		height: 100%;
		position: absolute;
		backface-visibility: hidden;
		perspective: 1000;
	}
	.vux-out-enter {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}
	.vux-out-leave-active {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
	.vux-in-enter {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
	.vux-in-leave-active {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}
	.weui-tabbar__item.weui-bar__item_on .icon-user:before,
	.weui-tabbar__item.weui-bar__item_on .icon-classify:before,
	.weui-tabbar__item.weui-bar__item_on .icon-book:before,
	.weui-tabbar__item.weui-bar__item_on .icon-discovery:before,
	{
		color: #fd7c42
	}
	.tabbar-round{
		position: absolute;
		left: 50%;
		height: 50%;
		display: block;
		width: 50px;
		height: 50px;
		margin-top: -5px;
		margin-left: -25px;
		border-radius: 50%;
		text-align: center;
		line-height: 60px;
		background-color: @theme-color;
		.icon-scan{
			font-size: 24px;
			margin-left: 1px;
		}
	}
	.pull-right{
		float: right;
	}
	.pull-left{
		float: left;
	}
	.text-center{
		text-align: center;
	}
</style>
