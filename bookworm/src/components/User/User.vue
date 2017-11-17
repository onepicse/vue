<template>
	<div class="user">
		<view-box   body-padding-top="46px" body-padding-bottom="0px">
			<x-header  slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :transition="headerTransition" class="vux-1px-b" :title="title" :left-options="leftOptions">
				<a slot="right"><i slot="icon"></i></a>
			</x-header>
			<transition :name="'vux-' + (direction === 'forward' ? 'in' : 'out')">
				<router-view class="router-view"></router-view>
			</transition>
		</view-box>

	</div>
</template>

<script>
	import { ViewBox, XHeader, Flexbox, FlexboxItem, Group, Cell, Grid, GridItem } from 'vux'
	import { mapState } from 'vuex'
	export default {
		components: {
			'x-header': XHeader,
			Flexbox,
			FlexboxItem,
			Group,
			Cell,
			Grid,
			GridItem,
			ViewBox
		},
		data () {
			return{

			}
		},
		computed: {
			...mapState({
				direction: state => state.direction
			}),
			headerTransition () {
				return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
			},
			title () {
				if (this.$route.path === '/User') return '我的'
				if (this.$route.path === '/User/userWallet') return '我的钱包'
				if (this.$route.path === '/User/userIntegration') return '我的积分'
				if (this.$route.path === '/User/userCoupon') return '我的优惠劵'
				if (this.$route.path === '/User/userOrder/allOrder' || this.$route.path === '/User/userOrder/waitPay' || this.$route.path === '/User/userOrder/waitRefresh' || this.$route.path === '/User/userOrder/waitComment' || this.$route.path === '/User/userOrder/refund' ) return '我的订单' 
				if (this.$route.path === '/User/bookBasket') return '我的书篮'
				if (this.$route.path === '/User/myBook') return '我的图书'
				if (this.$route.path === '/User/myCollection') return '我的收藏'
				if (this.$route.path === '/User/setting') return '设置'
				if (this.$route.path === '/User/postOrder') return '发起订单'
			},
			leftOptions () {
				return {
					showBack: this.$route.path !== '/User',
					backText: ''
				}
			},
		},
		methods: {

		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.user{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}
	.user-info{
		width: 100%;
		height: auto;
		padding: 15px 0;
		background-color: @bookworm-white;
		.user-avarta{
			width: 100%;
			height: 60px;
			img{
				display: block;
				width: 60px;
				height: 60px;
				border: none;
				border-radius: 50%;
				margin: 0 auto;
			}
		}
		.user-name{
			width: 100%;
			height: 24px;
			line-height: 36px;
			text-align: center;
			color: @bookworm-font-color;
		}
	}
	.user-orders{
		margin-top: 16px;
		background-color: @bookworm-white;
		.user-orders-icon{
			font-size: 28px;
		}
	}
	.user-grid{
		background-color: @bookworm-white;
		.user-comment{
			width: 100%;
			padding: 15px 0;
			text-align: center;
			.title{
				display: block;
				speak: none;
				font-style: normal;
				font-weight: normal;
				font-variant: normal;
				text-transform: none;
				line-height: 1;
				color: @theme-color;
			}
		}
	}

</style>