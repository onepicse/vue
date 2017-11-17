<template>
	<div @click.stop="intoSeller" class="recommend-item">
		<div class="recommend-item-img-wrap">
			<img :src="item.bannerImgUrl" alt="">
			<div class="recommend-item-img-txt">
				<div class="browse">
					<i class="icon-eye"></i>
					<span>{{ item.browse }}次</span>
				</div>
				<div class="money">
					<i class="icon-money"></i>
					<span>{{ item.money }}
						<em>起</em></span>
					</div>
				</div>
			</div>
			<div class="recommend-item-info">
				<h2>{{ item.sellerName }}</h2>
				<div class="far-tag">
					<span><i class="icon-far"></i>{{ item.far }}km</span>
					|
					<i v-for="tag in item.tags">
						{{ tag }}
					</i>
				</div>
			</div>
		</div>		
	</div>
</template>

<script>
	// let freight = new Vue();
	export default{
		props: {
			item: {
				type: Object
			}
		},
		methods: {
			intoSeller: function () {
				let self = this;
				let seller = {};
				self.$store.state.isLoading = true;
				setTimeout(() => {					
					$.ajax({
						url: 'http://aishuwo.cn/nong/getInfo.php',
						type: 'POST',
						dataType: 'json',
						data: { flag: 'data', id : self.item.sellerId},
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
						self.$store.state.isLoading = false;
					});
				},1000)	
			}
		}
	}
</script>

<style lang="less">
	
</style>