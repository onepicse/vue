<template>
	<div class="seller">
		<div class="appBar white">
			<div class="appBar-left-icon">
				<i @click.stop="hideSeller" class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text"></div>
			<div class="appBar-right-icon">
				<mu-checkbox style="margin-top: 12px;margin-left: 10px;" uncheckIcon="favorite_border" checkedIcon="favorite"/>
			</div>
		</div>
		<div class="banner">
			<img :src="item.bannerImgUrl" alt="">
		</div>
		<div class="seller-info">
			<h1>{{ item.sellerName }}</h1>
			<div class="tags">
				<i v-for="tag in item.tags">{{ tag }}</i>
			</div>
			<div class="line"></div>
			<v-score :score="item.score" :size="20" :fontSize="16"></v-score>
			<div @click.stop="toComment" class="comment-length">
				{{ item.commentLength }}条评论
				<i class="icon icon-right">
				
				</i>
			</div>
		</div>
		<div class="seller-address">
			<i class="icon-address"></i>
			<span @click.stop="openMap">{{ item.sellerAddress }}</span>
			<div @click.stop="openTelPopup" class="phone-wrap">
				<i class="icon-phone"></i>
			</div>
		</div>
		<div class="cell">
			<div class="cell-title">
				<i class="icon-we"></i>农友说
			</div>
			<div class="cell-box">
				<div @click.stop="turnTravalArticle" class="cell-box-l">
					<i class="icon icon-article-trip"></i>
				</div>
				<div @click.stop="turnTravalPhoto" class="cell-box-r">
					<i class="icon icon-sharImg"></i>
				</div>
			</div>
		</div>
		<div class="cell">
			<div class="cell-title">
				<i class="icon-selection"></i>商家团购
			</div>
			<div class="cell-items">
				<div @click.stop="toCommodity(groupBuying)" v-for="groupBuying in item.groupBuyings" class="cell-item">
					<div class="cell-item-img">
						<img :src="groupBuying.explodedView" alt="">
					</div>
					<div class="cell-item-info">
						<h3>{{ groupBuying.name }}</h3>
						<span>
							<i class="icon-seller-money"></i>
							{{ groupBuying.price }}
							<small>{{ groupBuying.beforeMoney }}</small>
							<b class="sellout">已售{{ groupBuying.sellOut }}</b>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="cell">
			<div class="cell-title">
				<i class="icon-shop"></i>商家简介
			</div>
			<div v-html="item.sellerSummary" class="cell-summary">
				{{ item.sellerSummary }}
			</div>
		</div>

		<!-- 电话弹出层 -->
		<mu-popup position="bottom" popupClass="tel-popup" :open="bottomPopup" @close="closeTelPopup">
			<a class="tel-item" v-for="tel in tels" :href="tel">
				{{ tel }}
			</a>
		</mu-popup>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-comment v-if="showcomment"></v-comment>
			<v-commodity v-if="showcommodity"></v-commodity>
			<v-map v-if="showMap" :center="item.sellerPosition" :sellerName="item.sellerName"></v-map>
			<v-travalArticle v-if="showTravalArticle"></v-travalArticle>
			<v-travalPhoto v-if="showTravalPhoto"></v-travalPhoto>
		</transition>
	</div>
</template>

<script>
	import score from '@/components/score/score'
	import comment from '@/components/comment/comment'
	import commodity from '@/components/commodity/commodity'
	import travalArticle from '@/components/seller/travalArticle'
	import travalPhoto from '@/components/seller/travalPhoto'
	import map from '@/components/map/map'
	export default{
		data() {
			return{
				item: {},
				bottomPopup: false
			}
		},
		computed: {
			tels: function(){
				let telArr = [];
				for (let i = 0; i < this.item.sellerTel.length;i++){
					let tel = "tel:" + this.item.sellerTel[i];
					telArr.push(tel);
				}
				return telArr;
			},
			showcomment: function(){
				return this.$store.state.showcomment;
			},
			showcommodity: function(){
				return this.$store.state.showcommodity;
			},
			showMap: function(){
				return this.$store.state.showMap;
			},
			showTravalArticle: function(){
				return this.$store.state.showTravalArticle;
			},
			showTravalPhoto: function () {
				return this.$store.state.showTravalPhoto;
			}
		},
		created() {
			document.body.scrollTop = 0;
		    this.item = this.$store.state.seller;
		},
		methods: {
			openTelPopup: function(){
				this.bottomPopup = true;
			},
			closeTelPopup: function(){
				this.bottomPopup = false;
			},
			openMap: function(){
				this.$store.state.showMap = true;
			},
			turnTravalArticle () {
				console.log(1)
				this.$store.state.showTravalArticle = true;
			},
			turnTravalPhoto () {
				this.$store.state.showTravalPhoto = true;
			},
			toComment: function(){
				let self = this;
				this.$store.state.isLoading = true;
				setTimeout(() =>{
					$.ajax({
						url: 'http://aishuwo.cn/nong/getInfo.php',
			        	type: 'POST',
			        	dataType: 'json',
			        	data: {flag : 'comment', id : self.item.sellerId},
					})
					.done(function(response) {
						let comments = [];
						for(let i = 0; i < response.length;i++){
							let commenter = {};
							commenter.avartaUrl = response[i].avartaUrl;
							commenter.uname = response[i].uname;
							commenter.date = response[i].date;
							commenter.msg = response[i].msg;
							let userScore = parseFloat(response[i].userScore);
							commenter.userScore = userScore;
							comments.push(commenter);
						}
						self.$store.state.comments = comments;
						self.$store.state.showcomment = true;
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						self.$store.state.isLoading = false;
					});
				},500)				
			},
			toCommodity: function(groupBuying){
				let self = this;
				this.$store.state.isLoading = true;
				setTimeout(() => {
					$.ajax({
						url: 'http://aishuwo.cn/nong/getInfo.php',
			        	type: 'POST',
			        	dataType: 'json',
			        	data: {flag : 'goods', gid : groupBuying.gid},
					})
					.done(function(response) {
						console.log(response)
						let goods = {};
						goods.sellerName = self.item.sellerName;
						goods.beforeMoney = response[0].beforeMoney;
						goods.explodedView = response[0].explodedView;
						goods.commodityId = response[0].gid;
						goods.info = response[0].info;
						goods.name = response[0].name;
						goods.price = response[0].price;
						goods.ruleNotice = response[0].ruleNotice;
						goods.sellOut = response[0].sellOut;
						goods.sellerId = response[0].sellerId;
						goods.userRule = response[0].userRule;
						self.$store.state.commodity = goods;
						self.$store.state.showcommodity = true;
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						self.$store.state.isLoading = false;
					});
				},500)				
			},
			hideSeller: function(){
				this.$store.state.showseller = false;
			}
		},
		components: {
			'v-score': score,
			'v-comment' : comment,
			'v-commodity' : commodity,
			'v-map' : map,
			'v-travalArticle' : travalArticle,
			'v-travalPhoto' : travalPhoto
		}
	}
</script>

<style lang="less">
	.icon-love{
		background-image: url(./icon-favor.png);
		&.on{
			background-image: url(./icon-favor_fill.png)
		}
	}
	.icon-article-trip{
		height: 60px;
		display: inline-block;
		background-size: 32px 32px;
		background-image: url(./icon-article-trip.png)
	}
	.icon-sharImg{
		height: 60px;
		display: inline-block;
		background-size: 32px 32px;
		background-image: url(./icon-sharImg.png)
	}
	.icon-address{
		background-image: url(./icon-location.png)
	}
	.icon-phone{
		background-image: url(./icon-phone.png)
	}
	.icon-we{
		background-image: url(./icon-we.png)
	}
	.icon-selection{
		background-image: url(./icon-selection.png)
	}
	.icon-seller-money{
		background-image: url(./icon-seller-money.png)
	}
	.icon-shop{
		background-image: url(./icon-shop.png)
	}
	.tel-popup{
		width: 100%;
		max-height: 180px;
	}
</style>