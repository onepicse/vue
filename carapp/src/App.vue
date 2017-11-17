<template>
	<div id="app" style="height: 100%">
		<drawer 
		:show-mode="showMode"
		:placement="placement"
		:show.sync="show"
		:drawer-style="{'background-color':'#343843', width: '310px'}">
			<!-- 左侧用户中心 -->
      		<div slot="drawer" >
				<div class="user-info">
					<div class="user-avarta-wrap">
						<img class="user-avarta" src="./assets/img/@2x/avarta.png" height="82" width="82" alt="">
					</div>
					<h3 class="user-name">
						任盈盈
					</h3>
					<div class="user-address">
						<img src="./assets/img/@2x/icon-address.png" height="12" width="9" alt="">
						<span class="user-address-txt">
							海南 海口
						</span>
					</div>
				</div>
      		</div>
      		<view-box ref="viewBox">
			<!-- 页面标题 -->
				<x-header slot="header" title="立即租车" style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color: #25bdb0">
					<div @click.stop="show = true" slot="overwrite-left">
						<img style="display: inline-block; vertical-align: middle;" src="./assets/img/@2x/user.png" height="22.5" width="22.5" alt="">
						<span class="header-left-text">个人中心</span>
					</div>
				</x-header>
				<!-- 页面主体切换 -->
				<router-view></router-view>
				<tabbar ref="bottom">
					<tabbar-item selected link="/">
				        <img slot="icon" src="">
				        <img slot="icon-active" src="" alt="">
				        <span slot="label">租车</span>
				    </tabbar-item>
				    <tabbar-item link="/">
				        <img slot="icon" src="">
				        <img slot="icon-active" src="" alt="">
				        <span slot="label">代驾</span>
				    </tabbar-item>
				    <tabbar-item link="/">
				        <img slot="icon" src="">
				        <img slot="icon-active" src="" alt="">
				        <span slot="label">物流</span>
				    </tabbar-item>
				    <tabbar-item link="/">
				        <img slot="icon" src="">
				        <img slot="icon-active" src="" alt="">
				        <span slot="label">智慧生活</span>
				    </tabbar-item>
				</tabbar>    
			</view-box>
    	</drawer>
		
	</div>
</template>

<script>
import { Drawer, ViewBox, XHeader, Tabbar, TabbarItem } from 'vux'
export default {
	name: 'app',
	data () {
		return {
			show: false,
			showMode: 'push',
			placement: 'left'
		}
	},
	methods: {
		
	},
	components: {
		Drawer,
		ViewBox,
		XHeader,
		Tabbar,
		TabbarItem
	} 
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
html, body {
	height: 100%;
	width: 100%;
	overflow-x: hidden;
	background-color: #f5f5f5;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.header-left-text {
	color: #fff;
	line-height: 22.5px;
}
.weui-tab__panel {
	padding-top: 46px !important;
}
.user-info {
	width: 100%;
	min-height: 186px;
	padding-top: 40px;
	text-align: center;
}
.user-avarta-wrap {
	display: inline-block;
	width: 90px;
	height: 90px;
	padding: 3px;
	border: 1px solid #9a9ca1;
	border-radius: 50%;
	box-sizing: border-box;
}
.user-name {
	text-align: center;
	line-height: 18px;
	line-height: 18px;
	margin-top: 10px;
	font-weight: normal;
	color: #fff;
}
.user-address {
	text-align: center;
	margin-top: 15px;
	img {
		display: inline-block;
		vertical-align: middle;
	}
	.user-address-txt {
		display: inline-block;
		font-size: 12px;
		color: #aeafb2;
		vertical-align: middle;
	}
}

</style>
