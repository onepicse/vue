<template>
	<div class="page goPage">
		<div class="appBar white border">
			<div @click.stop="backIndex" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				热门商铺
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<div class="page-banner">
			<img width="375" :src="goPage" alt="">
		</div>
		<div v-for="seller in sellers" class="gopage-cell">
			<mu-flexbox>
			    <mu-flexbox-item grow="4" class="flex-gopage-l">
			      <img width="132" height="100" :src="seller.bannerImgUrl" alt="">
			    </mu-flexbox-item>
			    <mu-flexbox-item grow="6" class="flex-gopage-r">
			      <h2>{{ seller.sellerName }}</h2>
			      <v-score :score="seller.score" :size="14" :fontSize="12"></v-score>
			      	<mu-flexbox class="border-pd">
			      		<mu-flexbox-item class="gopage-money">
			      			<i class="icon icon-gopage-money"></i>{{ seller.money }}起
			      		</mu-flexbox-item>
			      		<mu-flexbox-item>
			      			<mu-raised-button class="" @click.stop="turnSeller(seller)" label="点击查看" backgroundColor="#4caf50" />
			      		</mu-flexbox-item>
			      	</mu-flexbox>
			      	<p style="margin: 0;line-height: 25px;font-size: 14px">
			      		<i class="icon icon-grey-eye"></i> &nbsp;浏览量  &nbsp;
			      		{{ seller.browse }}
			      	</p>
			    </mu-flexbox-item>
			 </mu-flexbox>
		</div>
	</div>
</template>

<script>
	import goPage from './go-banner.jpg'
	import score from '@/components/score/score'
	export default{
		data () {
			return{
				goPage : goPage,
				sellers: []
			}
		},
		created () {
			let self = this;
			this.$store.state.isLoading = true;
			$.ajax({
			    url: 'http://aishuwo.cn/nong/dataServer.php',
			   	type: 'POST',
			    dataType: 'json',
			    data: {flag: 'mostView'},
			})
			.done(function(response) {
			    console.log(response);
			    for(let i = 0; i < response.length;i++){
			    	let seller = {};
			    	seller.sellerId = response[i].sellerId;
			    	seller.bannerImgUrl = response[i].bannerImgUrl;
			    	seller.browse = response[i].browse;
			    	seller.sellerName = response[i].sellerName;
			    	let score = parseFloat(response[i].score)
			    	seller.score = score;
			    	seller.money = response[i].money;
			    	self.sellers.push(seller);
			    }
			})
			.fail(function() {
			    console.log("error");
			})
			.always(function() {
			    self.$store.state.isLoading = false;
			});
		},
		methods: {
			backIndex () {
				this.$store.state.showBottomNav = true;
				this.$store.state.showGoPage = false;
			},
			 turnSeller (seller){
		    	let sellerId = seller.sellerId;
		    	let self = this;
				self.$store.state.isLoading = true;
				setTimeout(() => {					
					$.ajax({
						url: 'http://aishuwo.cn/nong/getInfo.php',
						type: 'POST',
						dataType: 'json',
						data: { flag: 'data', id : sellerId},
					})
					.done(function(response) {
						let seller = {};
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
						self.$store.state.isLoading = false;
					});
				},1000)	
		    }
		},
		components: {
			'v-score' : score
		}
	}
</script>

<style lang="less">
	.flex-gopage-l{
		padding: 15px 0 15px 10px;
		overflow: hidden;
	}
	.flex-gopage-r{
		padding: 15px  10px 0 0;
		overflow: hidden;
		&>h2{
			margin: 0;
			font-size: 16px;
			font-weight: normal;
			color: #4c4c4c;
		}
	}
	.border-pd{
		padding-bottom: 10px;
		@media screen and (-webkit-min-device-pixel-ratio: 2) {
    		&{ border-bottom: 0.5px solid #b2b2b2 }
		}
		@media screen and (-webkit-min-device-pixel-ratio: 3) {
    		&{ border-bottom: 0.333333px solid #b2b2b2 }
		}
	}
	.gopage-money{
		font-size: 16px;
		color: #f64646;
		line-height: 25px;
	}
	.icon-gopage-money{
		display: inline-block;
		vertical-align: top;
		height: 25px;
		width: 25px;
		margin-right: 5px;
		background-image: url(./icon-gopage-money.png)
	}
	.icon-grey-eye{
		display: inline-block;
		vertical-align: top;
		height: 25px;
		width: 25px;
		margin-right: 5px;
		background-image: url(./icon-grey-eye.png)
	}
</style>