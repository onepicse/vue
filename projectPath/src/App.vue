<template>
	<div id="app">
		<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight ">	
			<router-view></router-view>
		</transition>
		<tabbar>
			<tabbar-item selected link="/">
				<i slot="icon" class="fa fa-book"></i>
				<span slot="label">书城</span>
			</tabbar-item>
			<tabbar-item link="/class">
				<i slot="icon" class="fa fa-th-large"></i>
				<span slot="label">分类</span>
			</tabbar-item>
			<tabbar-item>
				<img slot="icon" src="">
				<span slot="label"></span>
			</tabbar-item>
			<tabbar-item link="/community">
				<i slot="icon" class="fa fa-coffee"></i>
				<span slot="label">社区</span>
			</tabbar-item>
			<tabbar-item link="/me">
				<i slot="icon" class="fa fa-user"></i>
				<span slot="label">我的</span>
			</tabbar-item>
			<CircleMenu class="circleMenu" type="middle-around" :circle="true" :number="4" mask='black' btn :colors="circleMenuColor">
				<button type="button" slot="item_btn">
					
				</button>
				<a slot="item_1" class="fa fa-barcode fa-lg white" herf="#" ></a>
				<a slot="item_2" class="fa fa-weixin fa-lg white" herf="#" ></a>
				<a slot="item_3" class="fa fa-qrcode fa-lg white" herf="#" ></a>
				<a slot="item_4" class="fa fa-weibo fa-lg white" herf="#" ></a>
			</CircleMenu>
		</tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vux'
	import CircleMenu from 'vue-circle-menu'
	export default {
		name: 'app',
		data () {
			return{
				circleMenuColor: [ '#fd7b41', '#ff5722', '#00bcd4', '#ffc107','#F3825F']
			}
		},
		computed: {

		},
		components: {
			CircleMenu,
			Tabbar,
			TabbarItem
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import './assets/css/base.less';
	.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
		color: @font-active-color !important;
	}
	.weui-tabbar__label {
	    color: @font-grey-color !important;
	}
	i.weui-tabbar__icon, .weui-tabbar__icon > i{
		color: @font-grey-color !important;
	}
	.circleMenu{
		position: absolute;
		left: 50%;
		margin-left: -24px;
		top: -6px;
	}
	.oy-menu-btn>button{
		display: none
	}
	.fa.white{
		color: @white;
	}
</style>
