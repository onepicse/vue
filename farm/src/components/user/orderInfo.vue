<template>
	<div class="page orderInfo">
		<div class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				订单详情
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<div class="orderInfo-content">
			<div class="order-list">
				<div class="order-title">
					订单详情
				</div>
				<ul>
					<li class="order-list-item">
						<div class="list-title">
							订单号
						</div>
						<div class="list-content">
							201495784234
						</div>
					</li>
					<li class="order-list-item">
						<div class="list-title">
							订单交易码
						</div>
						<div class="list-content">
							5119-4482-4418-3307-2015
						</div>
					</li>
					<li class="order-list-item">
						<div class="list-title">
							订单二维码
						</div>
						<div class="list-content">
						</div>
					</li>
				</ul>
				<img style="display: block;margin: 10px auto;" width="300" height="300" :src="imgurl" alt="">
			</div>

		</div>
	</div>
</template>

<script>
	import img from './code.png'
	export default{
		data () {
			return{
				imgurl : img
			}
		},
		props: {
			checkList: {
				type : Array 
			}
		},
		methods: {
			backUser () {
				for(let i = 0;i < this.checkList.length;i++){
					for(let j = 0;j < this.$store.state.shopChar.length; j++){
						if(parseInt(this.checkList[i]) === j){
							this.$store.state.shopChar.splice(j,1);
							console.log(this.$store.state.shopChar)
						}
					}
				}
				this.$store.state.showShopCharPostOrder = false;
				this.$store.state.showOrderInfo = false;
			}
		},
	}
</script>

<style lang="less">
	
</style>