<template>
	<div class="postOrder page">
		<div class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				提交订单
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<div class="order-list">
			<div class="order-title">
				订单信息
			</div>
			<ul v-for="orderData in orderDatas">
				<li class="order-list-item">
					<div class="list-title">
						商家
					</div>
					<div class="list-content">
						{{ orderData.sellerName }}
					</div>
				</li>
				<li class="order-list-item">
					<div class="list-title">
						商品名
					</div>
					<div class="list-content">
						{{ orderData.commodityName }}
					</div>
				</li>
				<li class="order-list-item">
					<div class="list-title">
						单价
					</div>
					<div class="list-content">
						{{ orderData.money }}
					</div>
				</li>
				<li class="order-list-item">
					<div class="list-title">
						数量
					</div>
					<div class="list-content">
							{{ orderData.num }}		
					</div>
				</li>
				<li class="order-list-item">
					<div class="list-title">
						小计
					</div>
					<div class="list-content">
						{{ parseFloat(orderData.money*orderData.num) }}
					</div>
				</li>
			</ul>
		</div>
		<div class="order-list">
			<div class="order-title">
				使用积分 
			</div>
			<ul>
				<li class="order-list-item">
					<div class="list-title">
						使用积分
					</div>
					<div class="list-content">
						暂不支持使用积分
					</div>
				</li>
			</ul>
		</div>
		<div class="order-list">
			<div class="order-title">
				总价
			</div>
			<ul>
				<li class="order-list-item">
					<div class="list-title">
						总价
					</div>
					<div class="list-content red">
						￥{{ allMoney }}
					</div>
				</li>
			</ul>
		</div>
		<div class="order-list">
			<div class="order-title">
				您绑定的手机
			</div>
			<ul>
				<li class="order-list-item">
					<div class="list-title">
						{{ phone }}
					</div>
					<div class="list-content">
						
					</div>
				</li>
			</ul>
		</div>
		<button @click.stop="postOrder" class="btn" type="button">
			立即支付
		</button>
		<mu-bottom-sheet :open="payMethod" @close="closePay">
			<mu-list @itemClick="closePay">
				<mu-sub-header>
					请选择支付方式
				</mu-sub-header>
				<mu-list-item @click.stop="turnOrderInfo" title="支付宝"/>
			    <mu-list-item title="微信"/>
			</mu-list>
		</mu-bottom-sheet>
		<mu-dialog :open="dialog" title="" @close="closeDialog">
			请绑定手机号
			<mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
			<mu-flat-button slot="actions" primary @click="closeDialog" label="确定"/>
		</mu-dialog>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-orderInfo :checkList="checkList" v-if="showOrderInfo"></v-orderInfo>
		</transition>
	</div>
</template>

<script>
	import orderInfo from '@/components/user/orderInfo'
	export default {
		data(){
			return{
				num : 1,
				bindPhone: false,
				payMethod: false,
				dialog: false,
				allMoney: 0
			}
		},
		props: {
			checkList: {
				type : Array
			}
		},
		computed: {
			showOrderInfo: function () {
				return this.$store.state.showOrderInfo;
			},
			orderDatas : function () {
				let orderArray = [];
				let self = this;
				console.log(this.checkList)
				console.log(this.$store.state.shopChar)
				for(let i = 0;i < this.checkList.length;i++){
					let sellerOrder = {};
					sellerOrder.sellerId = this.$store.state.shopChar[i].sellerId;
					sellerOrder.sellerName = this.$store.state.shopChar[i].sellerName;
					sellerOrder.commodityName = this.$store.state.shopChar[i].name;
					sellerOrder.num = this.$store.state.shopChar[i].num;
					sellerOrder.money = this.$store.state.shopChar[i].money;
					orderArray.push(sellerOrder);
				}
				let sum = 0;
				for(let i =0;i < orderArray.length;i++){
					sum += orderArray[i].num * orderArray[i].money;
				}
				this.allMoney = sum;
				return orderArray;
			},
			phone: function(){
				if(this.$store.state.user.tel == undefined){
					this.bindPhone = false;
					return "未绑定手机号";
				}else{
					let tel = '';
					for(let i = 0;i < 3;i++){
						tel += this.$store.state.user.tel[i]
					}
					tel += '****';
					for(let j = 7;j < 11;j++){
						tel += this.$store.state.user.tel[j]
					}
					this.bindPhone = true;
					return tel;
				}	
			}
		},
		methods: {
			closeDialog () {
				this.dialog = false;
			},
			closePay () {
				this.payMethod = false;
			},
			backUser () {
				this.$store.state.showShopCharPostOrder = false;
			},
			turnOrderInfo () {
				this.$store.state.showOrderInfo = true;
				// for(let i = 0;i < this.checkList.length;i++){
				// 	for(let j = 0;j < this.$store.state.shopChar.length; j++){
				// 		if(parseInt(this.checkList[i]) === j){
				// 			this.$store.state.shopChar.splice(j,1);
				// 			console.log(this.$store.state.shopChar)
				// 		}
				// 	}
				// }
			},
			postOrder () {
				if(this.bindPhone){
					//已绑定
					this.payMethod = true;
				}else{
					//未绑定
					this.dialog = true;
				}
			}
		},
		components: {
			'v-orderInfo' : orderInfo
		}
	}
</script>

<style lang="less">

</style>