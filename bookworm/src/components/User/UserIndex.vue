<template>
	<div class="user">
			<div class="user-info">
				<div class="user-avarta">
					<img :src="u_avarta" alt="">
				</div>
				<div class="user-name">
					{{ u_name }}
				</div>
			</div>
			<flexbox class="user-grid vux-1px-b">
		        <flexbox-item>
		        	<router-link to="/User/userWallet">
			        	<div class="user-comment">
			        		<div class="vux-1px-r">
			        			<i class="title">{{ u_wallet.remaining }}</i>
			        			<span>钱包</span>
			        		</div>
			        	</div>	
		        	</router-link>
		        </flexbox-item>
		        <flexbox-item>
		        	<router-link to="/User/userIntegration">
			        	<div class="user-comment">
			        		<div class="vux-1px-r">
			        			<i class="title">{{ u_integration.remaining }}</i>
			        			<span>积分</span>
			        		</div>
			        	</div>	
		        	</router-link>
		        </flexbox-item>
		        <flexbox-item>
		        	<router-link to="/User/userCoupon">
		        		<div class="user-comment">
			        		<div>
			        			<i class="title">{{ u_coupon.num }}</i>
			        			<span>优惠劵</span>
			        		</div>
			        	</div>
		        	</router-link>	
		        </flexbox-item>
		    </flexbox>
		    <group  title="我的订单">
			    <div class="user-orders vux-1px-t">
			    	<cell title="所有订单" is-link :link="{ name: 'userOrder',params: { tabIndex: 'allOrder' } }"></cell>
			    	<grid :rows="4">
						<grid-item :link="{ name: 'userOrder',params: { tabIndex: 'waitPay' } }" label="待付款">
					    	<i slot="icon" class="icon-recharge user-orders-icon"></i>
						</grid-item>
						<grid-item :link="{ name: 'userOrder',params: { tabIndex: 'waitRefresh' } }" label="待归还">
					    	<i slot="icon" class="icon-refresh user-orders-icon"></i>
						</grid-item>
						<grid-item :link="{ name: 'userOrder',params: { tabIndex: 'waitComment' } }" label="待评价">
					    	<i slot="icon" class="icon-comment user-orders-icon"></i>
						</grid-item>
						<grid-item :link="{ name: 'userOrder',params: { tabIndex: 'refund' } }"  label="退款单">
					    	<i slot="icon" class="icon-refund user-orders-icon"></i>
						</grid-item>
					</grid>
			    </div>
		    </group>
		    <group title="我的相关">
		    	<cell title="我的书篮" is-link link="/User/bookBasket"></cell>
		    	<cell title="我的图书" is-link link="/User/myBook"></cell>
		    	<cell title="我的收藏" is-link link="/User/myCollection"></cell>
		    	<cell title="我的书评" is-link link=""></cell>
		    	<cell title="我的关注" is-link link=""></cell>
		    	<cell title="设置" is-link link="/User/setting"></cell>
		    </group>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem, Group, Cell, Grid, GridItem } from 'vux'
	import { mapState } from 'vuex'
	export default {
		components: {
			Flexbox,
			FlexboxItem,
			Group,
			Cell,
			Grid,
			GridItem
		},
		data () {
			return{
				turnIndex: ['全部','待付款','待归还','待评价','退款单']
			}
		},
		created () {
			//组件创建完成后获取数据
			this.fetchData();
		},
		watch: {
			//如果路由有变化，则执行该方法
			'$route': 'fetchData'
		},
		computed: {
			...mapState({
				u_id: state => state.user.u_id,
		    	u_avarta: state => state.user.u_avarta,
		    	u_name: state => state.user.u_name,
		    	u_wallet: state => state.user.u_wallet,
		    	u_integration: state => state.user.u_integration,
		    	u_coupon: state => state.user.u_coupon
			})
		},
		methods: {
			fetchData () {
				//异步请求数据
				console.log('执行获取数据函数')
			}
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
		margin: 0;
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
			span{
				color: @bookworm-font-color;
			}
		}
	}
	
</style>