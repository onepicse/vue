<template>
	<div class="user">
		<div class="user-bg">
			<div class="appBar">
				<div @click.stop="turnMyCode" class="appBar-left-icon">
					<i class="icon-code"></i>
				</div>
				<div class="appBar-center-text"></div>
				<div @click.stop="turnSetting" class="appBar-right-icon">
					<i class="icon-settings"></i>
				</div>
			</div>
			<div class="allOrders">
				<i class="icon icon-allOrders"></i>所有订单
			</div>
			<div v-if="showUserInfo"  class="avatar">
				<img :src="userInfo.userAvatar" alt="">
				<span>{{ userInfo.userName }}</span>
			</div>
			<div @click.stop="showLogin" class="showLogin" v-if="!showUserInfo">
				立即登陆
			</div>
		</div>
		<mu-row class="calligraphy-wrap border" gutter>
		    <mu-col width="25" tablet="25" desktop="25">
		    	<div @click="turnOrder(tabValue[0])" class="calligraphy-item">
					<i v-html="waitPayOrderNum" class="biger-icon small icon-pay">
						
					</i>
		    		<span class="biger-icon-title">
		    			待付款
		    		</span>
		    	</div>
		    </mu-col>
			<mu-col width="25" tablet="25" desktop="25">
		    	<div @click="turnOrder(tabValue[1])" class="calligraphy-item">
					<i class="biger-icon small icon-ticket">
						
					</i>
		    		<span class="biger-icon-title">待使用</span>
		    	</div>
		    </mu-col>
		    <mu-col width="25" tablet="25" desktop="25">
		    	<div @click="turnOrder(tabValue[2])" class="calligraphy-item">
					<i v-html="waitComentsNum" class="biger-icon small icon-edit">
						
					</i>
		    		<span class="biger-icon-title">待评价</span>
		    	</div>
		    </mu-col>
		    <mu-col width="25" tablet="25" desktop="25">
		    	<div @click="turnOrder(tabValue[3])" class="calligraphy-item">
					<i class="biger-icon small icon-refund">
					</i>
		    		<span class="biger-icon-title">退款单</span>
		    	</div>
		    </mu-col>
		</mu-row>

		<mu-row class="calligraphy-wrap border margin-top" gutter>
		    <mu-col width="25" tablet="25" desktop="25">
		    	<div @click.stop="turnShopCar" class="calligraphy-item">
					<i v-html="shopCarNum" class="biger-icon small icon-cart_fill">
						
					</i>
		    		<span class="biger-icon-title">
		    			购物车
		    		</span>
		    	</div>
		    </mu-col>
			<mu-col width="25" tablet="25" desktop="25">
		    	<div @click.stop="turnGoOutPepole" class="calligraphy-item">
					<i class="biger-icon small icon-people_fill">
					</i>
		    		<span class="biger-icon-title">出行人管理</span>
		    	</div>
		    </mu-col>
		    <mu-col width="25" tablet="25" desktop="25">
		    	<div class="calligraphy-item">
					<i class="biger-icon small icon-favor_fill">
					</i>
		    		<span class="biger-icon-title">我的关注</span>
		    	</div>
		    </mu-col>
		    <mu-col width="25" tablet="25" desktop="25">
		    	<div @click.stop="turnIntegration" class="calligraphy-item">
					<i class="biger-icon small icon-present_fill">
					</i>
		    		<span class="biger-icon-title">
		    			农庄积分
		    		</span>
		    	</div>
		    </mu-col>
			<mu-col width="25" tablet="25" desktop="25">
		    	<div @click.stop="turnCollection" class="calligraphy-item">
					<i class="biger-icon small icon-like_fill">
					</i>
		    		<span class="biger-icon-title">我的收藏</span>
		    	</div>
		    </mu-col>
		    <mu-col width="25" tablet="25" desktop="25">
		    	<div class="calligraphy-item">
					<i class="biger-icon small icon-mark_fill">
					</i>
		    		<span class="biger-icon-title">评价详情</span>
		    	</div>
		    </mu-col>
		    <mu-col width="25" tablet="25" desktop="25">
		    	<div @click.stop="turnFeedback" class="calligraphy-item">
					<i class="biger-icon small icon-service_fill">

					</i>
		    		<span class="biger-icon-title">客服反馈</span>
		    	</div>
		    </mu-col>
		    <mu-col width="25" tablet="25" desktop="25">
		    	<div @click.stop="turnShoppingAddress" class="calligraphy-item">
					<i class="biger-icon small icon-location_fill">
					</i>
		    		<span class="biger-icon-title">收货地址</span>
		    	</div>
		    </mu-col>
		</mu-row>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-orders :activeTab="activeTab" v-if="showOrders"></v-orders>
			<v-shopCar v-if="showShopCar"></v-shopCar>
			<v-setting v-if="showSetting"></v-setting>
			<v-myCode v-if="showMycode"></v-myCode>
			<v-collection v-if="showCollection"></v-collection>
			<v-goOutPepole v-if="showGoOutPepole"></v-goOutPepole>
			<v-integration v-if="showIntegration"></v-integration>
			<v-shoppingAddress v-if="showShoppingAddress"></v-shoppingAddress>
			<v-feedback v-if="showFeedback"></v-feedback>
		</transition>	
	</div>
		
</template>
	
<script>
	import orders from '@/components/orders/orders'
	import shopChar from '@/components/user/shopCar'
	import setting from '@/components/user/setting'
	import myCode from '@/components/user/myCode'
	import integration from '@/components/user/integration'
	import collection from '@/components/user/collection'
	import goOutPepole from '@/components/user/goOutPepole'
	import shoppingAddress from '@/components/user/shoppingAddress'
	import feedback from '@/components/user/feedback'
	export default{
		name: 'user',
		data() {
			return{
				tabValue: ['waitPayOrder','waitUse','waitComment','refund'],
				activeTab: 'waitPayOrder'
			}
		},
		computed: {
			waitPayOrderNum: function(){
				if(this.$store.state.order.waitPayOrder.length > 0){
					return '<b>'+this.$store.state.order.waitPayOrder.length+'</b>';
				}
			},
			waitComentsNum: function(){
				if(this.$store.state.order.waitComment.length > 0){
					return '<b>'+this.$store.state.order.waitComment.length+'</b>';
				}
			},
			showUserInfo: function(){
				return this.$store.state.isLogin;
			},
			userInfo: function(){
				return this.$store.state.user;
			},
			shopCarNum: function(){
				if(this.$store.state.shopChar.length > 0){
					return '<b>'+this.$store.state.shopChar.length+'</b>';
				}
			},
			showOrders: function(){
				return this.$store.state.showOrders;
			},
			showShopCar: function(){
				return this.$store.state.showShopCar;
			},
			showSetting: function(){
				return this.$store.state.showSetting;
			},
			showCollection: function(){
				return this.$store.state.showCollection;
			},
			showGoOutPepole: function(){
				return this.$store.state.showGoOutPepole;
			},
			showIntegration: function(){
				return this.$store.state.showIntegration;
			},
			showMycode: function () {
				return this.$store.state.showMycode;
			},
			showFeedback: function () {
				return this.$store.state.showFeedback;
			},
			showShoppingAddress: function () {
				return this.$store.state.showShoppingAddress;
			}
		},
		created: function(){
			
		},
		methods: {
			showLogin: function(){
				this.$store.state.showLogin = true;
			},
			turnShoppingAddress () {
				if(this.$store.state.isLogin){
					console.log(1)
					this.$store.state.showShoppingAddress = true;
				}else{
					this.$store.state.showLogin = true;
				}	
			},
			turnMyCode () {
				if(this.$store.state.isLogin){
					this.$store.state.showMycode = true;
				}else{
					this.$store.state.showLogin = true;
				}	
			},
			turnOrder(value){
				if(this.$store.state.isLogin){
					this.activeTab = value;
					this.$store.state.showOrders = true;
				}else{
					this.$store.state.showLogin = true;
				}
			},
			turnCollection(){
				if(this.$store.state.isLogin){
					this.$store.state.showCollection = true;
				}else{
					this.$store.state.showLogin = true;
				}
			},
			turnShopCar(){
				if(this.$store.state.isLogin){
					this.$store.state.showShopCar = true;
				}else{
					this.$store.state.showLogin = true;
				}
			},
			turnFeedback(){
				if(this.$store.state.isLogin){
					this.$store.state.showFeedback = true;
				}else{
					this.$store.state.showLogin = true;
				}
			},
			turnGoOutPepole(){
				if(this.$store.state.isLogin){
					this.$store.state.showGoOutPepole = true;
				}else{
					this.$store.state.showLogin = true;
				}
			},
			turnIntegration(){
				if(this.$store.state.isLogin){
					this.$store.state.showIntegration = true;
				}else{
					this.$store.state.showLogin = true;
				}
			},
			turnSetting(){
				if(this.$store.state.isLogin){
					this.$store.state.showSetting = true;
				}else{
					this.$store.state.showLogin = true;
				}
			}
		},
		components: {
			'v-orders' : orders,
			'v-shopCar' : shopChar,
			'v-setting' : setting,
			'v-collection' : collection,
			'v-goOutPepole' : goOutPepole,
			'v-integration' : integration,
			'v-myCode' : myCode,
			'v-shoppingAddress' : shoppingAddress,
			'v-feedback' : feedback
 		}
	}
</script>

<style lang="less">
	.icon-allOrders{
		display: inline-block;
		vertical-align: top;
		margin-top: 2px;
		background-size: 25px;
		background-image: url(./icon-allOrder.png)
	}
	.icon-code{
		background-image: url(./icon-code.png)
	}
	.icon-pay{
		background-image: url(./icon-pay.png);
	}
	.icon-ticket{
		background-image: url(./icon-ticket.png);
	}
	.icon-edit{
		background-image: url(./icon-edit.png);
	}
	.icon-refund{
		background-image: url(./icon-refund.png);
	}
	.icon-settings{
		background-image: url(./icon-settings.png)
	}
	.icon-cart_fill{
		background-image:url(./icon-cart_fill.png)
	}
	.icon-favor_fill{
		background-image:url(./icon-favor_fill.png)
	}
	.icon-location_fill{
		background-image:url(./icon-location_fill.png)
	}
	.icon-people_fill{
		background-image:url(./icon-people_fill.png)
	}
	.icon-present_fill{
		background-image:url(./icon-present_fill.png)
	}
	.icon-service_fill{
		background-image:url(./icon-service_fill.png)
	}
	.icon-present_fill{
		background-image:url(./icon-present_fill.png)
	}
	.icon-mark_fill{
		background-image:url(./icon-mark_fill.png)
	}
	.icon-like_fill{
		background-image:url(./icon-like_fill.png)
	}
</style>