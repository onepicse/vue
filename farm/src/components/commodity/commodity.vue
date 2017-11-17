<template>
	<div class="commodity">
		<div class="appBar white">
			<div @click.stop="back" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				{{ commodity.name }}
			</div>
			<div class="appBar-right-icon">
				<mu-checkbox style="margin-top: 12px;margin-left: 10px;" uncheckIcon="favorite_border" checkedIcon="favorite"/>
			</div>
		</div>
		<div class="commodity-banner">
			<img :src="commodity.explodedView" alt="">
			<div class="commodity-banner-text"></div>
		</div>
		<div class="commodity-money">
			<span>￥{{ commodity.price }} <small>农庄价{{ commodity.beforeMoney }}</small></span>
			<button @click.stop="addShopCar" class="button" type="button">加入购物车</button>
			<button @click.stop="turnPostOrder" class="button" type="button">马上购买</button>
		</div>
		<div class="cell">
			<div class="cell-title">
				商品信息
			</div>
			<div class="cell-items">
				<p>{{ commodity.info }}</p>
			</div>
		</div>
		<div class="cell">
			<div class="cell-title">
				购买相关
			</div>
			<div class="cell-items">
				<mu-sub-header>购买须知</mu-sub-header>
				<mu-content-block>
					{{ commodity.ruleNotice }}
				</mu-content-block>
				<mu-sub-header>使用规则</mu-sub-header>
				<mu-content-block>
					{{ commodity.userRule }}
				</mu-content-block>
			</div>
		</div>
		<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
			加入成功
		</mu-popup>
		<mu-dialog :open="dialog" title="请登录" @close="closeDialog">
			亲爱的用户，您还没登陆哟！
			<mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
			<mu-flat-button slot="actions" primary @click="showLogin" label="登陆"/>
		</mu-dialog>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-postOrder :orderInfo="orderInfo" v-if="showPostOrder"></v-postOrder>
		</transition>	
	</div>
</template>

<script>
	import postOrder from '@/components/commodity/postOrder'
	export default{
		data (){
			return{
				dialog: false,
				topPopup: false,
				// isLove: false,
				orderInfo: '',
				commodity: {}
			}
		},
		computed: {
			showPostOrder: function(){
				return this.$store.state.showPostOrder
			}
		},
		created: function(){
			this.commodity = this.$store.state.commodity;
			console.log(this.commodity)
		},
		methods: {
			// changeLoveState: function(){
			// 	this.isLove = !this.isLove;
			// },
			open (position) {
				this[position + 'Popup'] = true
			},
			close (position) {
				this[position + 'Popup'] = false
			},
			closeDialog () {
				this.dialog = false
			},
			back: function(){
				this.$store.state.showcommodity = false;
			},
			showLogin(){
				this.dialog = false;
				this.$store.state.showLogin = true;
			},
			addShopCar(){
				if(this.$store.state.isLogin){
					console.log(this.commodity)
					this.topPopup = true;
					let shopCharCommodity = {};
					shopCharCommodity.sellerId = this.commodity.sellerId;
					shopCharCommodity.commodityId = this.commodity.commodityId;
					shopCharCommodity.num = 1;
					shopCharCommodity.sellerName = this.commodity.sellerName;
					shopCharCommodity.name =  this.commodity.name;
					shopCharCommodity.money = this.commodity.price;
					shopCharCommodity.explodedView = this.commodity.explodedView;
					this.$store.state.shopChar.push(shopCharCommodity);
				}else{
					this.dialog = true;
				}
			},
			turnPostOrder(){
				if(this.$store.state.isLogin){
					this.orderInfo = this.commodity;
					this.$store.state.showPostOrder = true;
				}else{
					this.dialog = true;
				}
			}
		},
		watch: {
			topPopup (val) {
				if (val) {
					setTimeout(() => {
						this.topPopup = false
					}, 1000)
				}
			}
		},
		components: {
			'v-postOrder': postOrder
		}
	}
</script>

<style lang="less">
	.popup-top{
		width: 100%;
		height: 45px;
		font-size: 16px;
		line-height: 45px;
		color: #4caf50;
		text-align: center;
	}
	.mu-flat-button-label{
		color: #4caf50;
	}
</style>