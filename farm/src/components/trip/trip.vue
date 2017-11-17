<template>
	<div class="trip">
		<div class="appBar white border">
			<div class="appBar-left-icon">

			</div>
			<div class="appBar-center-text">
				农家
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<div class="trip-content">
			<div class="trip-content-search">
				<button @click.stop="turnSearch" type="button">搜索农家乐/活动</button>
			</div>
			<mu-tabs class="fixed-tabs" style="background: #fff;top: 90px;" :value="activeTab" @change="handleTabChange">
				<mu-tab value="mostSell" title="销量最多"/>
				<mu-tab value="minFar" title="离我最近" @active="getminFarSeller"/>
			</mu-tabs>
			<div v-if="activeTab === 'mostSell'">
				<div v-for="seller in mostSellers" @click.stop="turnSeller(seller)" class="activity-cell">
					<div class="activity-img">
						<img :src="seller.bannerImgUrl" alt="">
					</div>
					<div class="activity-info">
						<h2>
							{{ seller.sellerName }}
							<div class="far-tag">
								<i v-for="tag in seller.tags">
									{{ tag }}
								</i>
							</div>
						</h2>
						<v-score :score="seller.score"></v-score>
					</div>
					<div class="active-price">
						￥{{ seller.money }}起
					</div>
				</div>
			</div>
			<div v-if="activeTab === 'minFar'">
				<div v-for="seller in sellers" @click.stop="turnSeller(seller)" class="activity-cell">
					<div class="activity-img">
						<img :src="seller.bannerImgUrl" alt="">
					</div>
					<div class="activity-info">
						<h2>
							{{ seller.sellerName }}
							<div class="far-tag">
								<i v-for="tag in seller.tags">
									{{ tag }}
								</i>
							</div>
						</h2>
						<p><i class="icon icon-far"></i>距离我{{ seller.distance }}KM </p>
					</div>
					<div class="active-price">
						￥{{ seller.money }}起
					</div>
				</div>
			</div>
		</div>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-searchPage v-if="showSearchPage"></v-searchPage>
			<v-userLocation v-if="showUserLocation"></v-userLocation>
		</transition>	
		<mu-dialog :open="dialog" title="请定位" @close="closeDialog">
			亲爱的用户，您还没定位哟！定位之后推送更精确哟
			<mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
			<mu-flat-button slot="actions" primary @click="turnUserLocation" label="定位"/>
		</mu-dialog>
	</div>
</template>

<script>
	import searchPage from '@/components/index/searchPage'
	import userLocation from '@/components/map/userLocation'
	import score from '@/components/score/score'
	export default{
		data () {
			return{
				dialog : false,
 				activeTab: 'mostSell',
 				sellers : [],
 				mostSellers : []
			}
		},
		computed: {
			showSearchPage: function(){
				return this.$store.state.showSearchPage;
			},
			showUserLocation: function () {
				return this.$store.state.showUserLocation;
			}
		},
		created () {
			let self = this;
			this.$store.state.isLoading = true;
			$.ajax({
			    url: 'http://aishuwo.cn/nong/dataServer.php',
			   	type: 'POST',
			    dataType: 'json',
			    data: {flag: 'mostSell'},
			})
			.done(function(response) {
				for(let i = 0;i < response.length;i++){
					let seller = {};
					seller.sellerId = response[i].sellerId;
					seller.sellerName = response[i].sellerName;
					let score = parseFloat(response[i].score);
					seller.score = score;
					seller.browse = response[i].browse;
					seller.money = response[i].money;
					let tags = response[i].tags.split(",");
					seller.tags = tags;
					seller.bannerImgUrl = response[i].bannerImgUrl;
					seller.sellOut = response[i].sellOut;
					self.mostSellers.push(seller);
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
			handleTabChange (val) {
		      this.activeTab = val
		    },
		    turnSearch () {
		    	this.$store.state.showBottomNav = false;
				this.$store.state.showSearchPage = true;
		    },
		    closeDialog () {
		    	this.dialog = false;
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
		    },
		    turnUserLocation () {
		    	this.dialog = false;
		    	this.$store.state.showBottomNav = false;
		    	this.$store.state.showUserLocation = true;
		    },
		    getminFarSeller() {
		    	let point = this.$store.state.user.point;
		    	if(point.lat === undefined){
		    		//未定位 不能调用数据
		    		this.dialog = true;
		    	}else{
		    		let self = this;
		    		this.$store.state.isLoading = true;
					$.ajax({
			    		url: 'http://aishuwo.cn/nong/dataServer.php',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {flag: 'mostNear',lon: point.lng,lat: point.lat},
			    	})
			    	.done(function(response) {
			    		for(let i = 0;i < response.length;i++){
			    			let seller = {};
			    			seller.sellerId = response[i].sellerId;
			    			seller.sellerName = response[i].sellerName;
			    			seller.browse = response[i].browse;
			    			seller.money = response[i].money;
			    			let tags = response[i].tags.split(",");
			    			seller.tags = tags;
			    			seller.bannerImgUrl = response[i].bannerImgUrl;
			    			let distance = parseFloat(response[i].distance).toFixed(2);
			    			console.log(parseFloat(response[i].distance).toFixed(2))
			    			seller.distance = distance;
			    			self.sellers.push(seller);
			    		}
			    	})
			    	.fail(function() {
			    		console.log("error");
			    	})
			    	.always(function() {
			    		self.$store.state.isLoading = false;
			    	});
		    	}	
		    }
		},
		components: {
			'v-searchPage' : searchPage,
			'v-userLocation' : userLocation,
			'v-score' : score
		}
	}
</script>

<style lang="less">
	.flex-select{
		height: 40px;
	}
	.activity-info i.icon{
		display: inline-block;
		vertical-align: top;
	}
</style>