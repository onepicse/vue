<template>
	<div class="page">
		<div class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				购物车
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<div v-if="haveShowShopCar" class="shopCar-items">
			<div v-for="(showShopCarData,index) in showShopCarDatas" class="shopCar-item">
				<div class="shopCar-item-head">
					<div class="checkbox-wrap">
						<mu-checkbox name="commodity" :nativeValue="index.toString()"  v-model="checkList" class="margin-top"/>
					</div>
					<div  @click.stop="turnShowCar(showShopCarData.sellerId)" class="shopName">
						<!-- 商家名字 -->
						{{ showShopCarData.sellerName }}
						
					</div>
					<div class="shopCar-item-icons">
						<!-- 删除按钮 -->
						<i @click.stop="delCommodity(index)" class="icon icon-del"></i>
					</div>
				</div>
				<div class="shopCar-item-body">
					<div class="commodity-img">
						<!-- 商品图 -->
						<img :src="showShopCarData.explodedView" alt="">
					</div>
					<div class="commodity-info">
						<!-- 商品名字 -->
						<p>
							{{ showShopCarData.name }}
						</p>
						<!-- 商品价格 -->
						<span>
							￥{{ showShopCarData.money }}
						</span>
						<div class="shop-list-content">
							<i @click.stop="minusNum(index)" class="icon icon-minus"></i>
								{{ showShopCarData.num }}
							<i @click.stop="addNum(index)" class="icon icon-add"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="shopCar-bottom-btns">
				<div @click.stop="checkAll" class="checkAll">
					<!-- <mu-checkbox name="all"  class="margin-top"/> -->
				</div>
				<div class="allMoney">
					合计：<span>{{ allMoney }}</span>
				</div>
				<div class="balanceBtn">
					<button @click.stop="turnShopCarPostOrder" type="button">结算({{ checkList.length }})</button>
				</div>
			</div>
		</div>
		<div v-if="!haveShowShopCar" class="no-data">
			<div class="line"></div>
			<div class="txt">空空如也</div>
			<div class="line"></div>
		</div>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-shopCarPostOrder :checkList="checkList" v-if="showShopCharPostOrder"></v-shopCarPostOrder>
		</transition>
	</div>
</template>

<script>
	import shopCarPostOrder from '@/components/user/shopCarPostOrder'
	export default{
		data () {
			return {
				checkList: [],
				orderInfo: {},
				allMoney: '0.00'
			}
		},
		computed: {
			haveShowShopCar: function(){
				if(this.$store.state.shopChar.length > 0){
					return true;
				}else{
					return false;
				}
			},
			showShopCarDatas: function(){
				return this.$store.state.shopChar;
			},
			showShopCharPostOrder: function () {
				return this.$store.state.showShopCharPostOrder;
			}
		},
		created: function(){
			
		},
		watch: {
			checkList: function(){
				let sum = 0;
				for(let i = 0;i < this.checkList.length;i++){
					sum += parseFloat(this.$store.state.shopChar[parseInt(this.checkList[i])].money*this.$store.state.shopChar[parseInt(this.checkList[i])].num)
				}
				// console.log(this.checkList)
				this.allMoney = sum;
			}
		},
		methods: {
			backUser(){
				this.$store.state.showShopCar = false;
			},
			delCommodity(index){
				this.$store.state.shopChar.splice(index,1);
				this.showShopCarDatas = this.$store.state.shopChar;
			},
			addNum (index) {
				this.$store.state.shopChar[index].num++
				// this.num++
			},
			minusNum (index) {
				if(this.$store.state.shopChar[index].num > 1){
					this.$store.state.shopChar[index].num--
				}
			},
			turnShopCarPostOrder () {
				this.$store.state.showShopCharPostOrder = true;
			},
			turnShowCar(sellerId){
				let self = this;
				let seller = {};
				$.ajax({
					url: 'http://aishuwo.cn/nong/getInfo.php',
					type: 'POST',
					dataType: 'json',
					data: { flag: 'data', id : sellerId},
				})
				.done(function(response) {
					//商家ID
					seller.sellerId = response[0].sellerId;
					//商家背景图
					seller.bannerImgUrl = response[0].bannerImgUrl;
					//商家名字
					seller.sellerName = response[0].sellerName;
					//商家标签
					let tags = response[0].tags.split(",");
					seller.tags = tags;
					//商家电话
					let tels = response[0].sellerTel.split(",");
					seller.sellerTel = tels;
					//商家评分
					seller.score = parseFloat(response[0].score);
					//评论条数
					seller.commentLength = response[0].commentLength;
					//商家地理坐标
					let sellerPosition = response[0].sellerPosition.split(",");
					seller.sellerPosition = sellerPosition;
					//商家地理位置
					seller.sellerAddress = response[0].sellerAddress;
					//商家简介
					seller.sellerSummary = response[0].sellerSummary;
					let groupBuyings = [];
					for(let i = 0;i < response.length;i++){
						let groupBuying = {};
						groupBuying.gid = response[i].gid;
						groupBuying.name = response[i].name;
						groupBuying.price = response[i].price;
						groupBuying.beforeMoney = response[i].beforeMoney;
						groupBuying.sellOut = response[i].sellOut;
						groupBuying.explodedView = response[i].explodedView;
						groupBuyings.push(groupBuying);
					}
					seller.groupBuyings = groupBuyings;
					self.$store.state.seller = seller;
					self.$store.state.showseller = true;
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
			}
			// ,
			// checkAll(){

			// }
		},
		components: {
			'v-shopCarPostOrder' : shopCarPostOrder
		}
	}
</script>

<style lang="less">
	.icon-del{
		background-image: url(./icon-del.png)
	}
	.mu-checkbox{
		line-height: 1em;
	}
	.mu-checkbox-icon-checked {
	    color: #4CAF50;
	}
	.mu-checkbox input[type="checkbox"]:checked + .mu-checkbox-wrapper .mu-checkbox-icon-uncheck {
	    color: #4CAF50;
	}
	.shop-list-content{
		position: absolute;
		bottom: -15px;
		right: 0;
		width: 110px;
		height: 50px;
		line-height: 50px;
		&>i{
		    display: inline-block;
		    vertical-align: top;
		    height: 50px;
		}
	}
</style>