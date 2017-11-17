<template>
	<div  class="index">
		<div id="index-content">
			<div class="search">
				<label for="searchtxt">
					<span>{{ city }}</span>
					<input @click.stop="turnSearch" type="button" value="搜索商铺或产品">
					<i @click.stop="getLoaction" class="icon-location"></i>
				</label>
			</div>
			<div class="banner">
				<v-slider></v-slider>
			</div>
			<!-- <mu-row class="calligraphy-wrap" gutter>
			    <mu-col width="25" tablet="25" desktop="25">
			    	<router-link class="calligraphy-item" to="">
						<i class="biger-icon icon-rice"></i>
			    		<span class="biger-icon-title">农家菜</span>
			    	</router-link>
			    </mu-col>
				<mu-col width="25" tablet="25" desktop="25">
			    	<router-link class="calligraphy-item" to="">
						<i class="biger-icon icon-house"></i>
			    		<span class="biger-icon-title">民宿</span>
			    	</router-link>
			    </mu-col>
			    <mu-col width="25" tablet="25" desktop="25">
			    	<router-link class="calligraphy-item" to="">
						<i class="biger-icon icon-farm"></i>
			    		<span class="biger-icon-title">乡村游</span>
			    	</router-link>
			    </mu-col>
			    <mu-col width="25" tablet="25" desktop="25">
			    	<router-link class="calligraphy-item" to="">
						<i class="biger-icon icon-friut"></i>
			    		<span class="biger-icon-title">农品汇</span>
			    	</router-link>
			    </mu-col>
			</mu-row -->
			<div class="activity-wrap" gutter>
				<div @click.stop="turnEatPage" class="activity">
					<img src="./eat.jpg" alt="">
				</div>
				<div @click.stop="turnGoPage" class="activity">
					<img  src="./go.jpg" alt="">
				</div>
			</div>
			<div id="recommend" class="recommend-wrap margin-top">
				<div class="recommend-title">
					<h2>为你推荐</h2>
				</div>
				<div class="recommend-main">
					<v-recommend :item="item" v-for="item in items"></v-recommend>
				</div>
				<div v-if="havaData" class="no-data">
					<div class="line"></div>
					<div class="txt">没数据啦</div>
					<div class="line"></div>
				</div>
			</div>
			<mu-infinite-scroll style="color:#4CAF50" :scroller="scroller" :loadingText="loadingText" :loading="loading" @load="loadMore"/>
		</div>
		<!-- <div @touch="" v-if="" class="touch-example">
			
		</div> -->
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<!-- <v-map v-if="showMap" :center="position"></v-map> -->
			<v-userLocation v-if="showUserLocation"></v-userLocation>
			<v-searchPage v-if="showSearchPage"></v-searchPage>
			<v-goPage v-if="showGoPage"></v-goPage>
			<v-eatPage v-if="showEatPage"></v-eatPage>
		</transition>	
	</div>
</template>

<script>
	// let index = document.querySelector('#index');
	import recommendItem from '@/components/recommendItem/recommendItem'
	import map from '@/components/map/map'
	import slider from '@/components/slider/slider'
	import searchPage from '@/components/index/searchPage'
	import userLocation from '@/components/map/userLocation'
	import goPage from '@/components/index/goPage'
	import eatPage from '@/components/index/eatPage'
	export default{
		name: 'index',
		data() {
			return{
				havaData: false,
				loading: false,
      			scroller: null,
      			loadingText: '正在加载...',
      			position: [],
      			positionName: '您的当前位置',
				activeTab: 'tab1',
				items: [
					
				],
				times: 1
			}
		},
		mounted () {
	        this.scroller = document.querySelector('#index-content');
	        //this.scroller = this.$el;
	    },
	    created: function () {
	    	this.times = 1;
	    	// this.$store.state.isLoading = true;
	    	let slef = this;
	    	$.ajax({
		        	url: 'http://aishuwo.cn/nong/getInfo.php',
		        	type: 'POST',
		        	dataType: 'json',
		        	data: {flag : 'seller',times : 0},
		        	})
		        	.done(function(response) {
		        		//获取创建数据
		        		for( let i = 0;i < response.length;i++){
		        			let seller = {};
		        			//商家ID
		        			seller.sellerId = response[i].sellerId;
		        			//商家名字
		        			seller.sellerName = response[i].sellerName;
		        			//商家背景图
		        			seller.bannerImgUrl = response[i].bannerImgUrl;
		        			//商家被查看数
		        			seller.browse = response[i].browse;
		        			//商家最低价格
		        			seller.money = response[i].money;
		        			//距离商家有多远
		        			seller.far = response[i].far;
		        			//商家的标签
		        			let tags = response[i].tags.split(",");
		        			seller.tags = tags;

		        			slef.items.push(seller);
		        		}
		        	})
		        	.fail(function() {
		        		console.log("error");
		        	})
		        	.always(function() {
		        		// self.$store.state.isLoading = false;
		        	});
	    },
	    computed: {
	    	showSearchPage: function(){
				return this.$store.state.showSearchPage;
			},
			showUserLocation: function(){
				return this.$store.state.showUserLocation;
			},
			showGoPage: function () {
				return this.$store.state.showGoPage;
			},
			showEatPage: function () {
				return this.$store.state.showEatPage;
			},
			city: function () {
				return this.$store.state.user.city;
			}
	    },
		methods: {
			handleTabChange (val) {
		      this.activeTab = val
		    },
		    turnSearch () {
		    	this.$store.state.showBottomNav = false;
				this.$store.state.showSearchPage = true;
		    },
		    turnGoPage () {
		    	this.$store.state.showBottomNav = false;
				this.$store.state.showGoPage = true;
		    },
		    turnEatPage () {
		    	this.$store.state.showBottomNav = false;
				this.$store.state.showEatPage = true;
		    },
		    getLoaction (){
		    	this.$store.state.showBottomNav = false;
		    	this.$store.state.showUserLocation = true
		    },
		    loadMore () {
		    	//滚动刷新
		    	this.havaData = false;
		        this.loading = true;
		        setTimeout(() => {
		        	let self = this;
	    			$.ajax({
			        	url: 'http://aishuwo.cn/nong/getInfo.php',
			        	type: 'POST',
			        	dataType: 'json',
			        	data: {flag : 'seller',times : this.times},
			        	})
		        		.done(function(response) {
		        		//获取创建数据
		        			if( response.length > 0 ){
								for( let i = 0;i < response.length;i++){
				        			let seller = {};
				        			//商家ID
				        			seller.sellerId = response[i].sellerId;
				        			//商家名字
				        			seller.sellerName = response[i].sellerName;
				        			//商家背景图
				        			seller.bannerImgUrl = response[i].bannerImgUrl;
				        			//商家被查看数
				        			seller.browse = response[i].browse;
				        			//商家最低价格
				        			seller.money = response[i].money;
				        			//距离商家有多远
				        			seller.far = response[i].far;
				        			//商家的标签
				        			let tags = response[i].tags.split(",");
				        			seller.tags = tags;
				        			self.items.push(seller);
				        		}
				        		self.times++;
		        			}else{
		        				self.havaData = true;
		        			}
			        		
		        		})
			        	.fail(function() {
			        		console.log("error");
			        	})
			        	.always(function() {
			        		console.log("complete");
			        	});
		          		this.loading = false
		        	}, 1000)
		      }
		},
		components: {
			'v-recommend' : recommendItem,
			'v-userLocation' : userLocation,
			'v-slider' : slider,
			'v-searchPage' : searchPage,
			'v-goPage' : goPage,
			'v-eatPage' : eatPage
		}
	}
</script>

<style lang="less">
	.icon-rice{
		background-image: url(./icon-rice.png);
	}
	.icon-house{
		background-image: url(./icon-house.png);
	}
	.icon-farm{
		background-image: url(./icon-farm.png);
	}
	.icon-friut{
		background-image: url(./icon-friut.png);
	}
	.icon-eye{
		background-image: url(./icon-eye.png)
	}
	.icon-money{
		background-image: url(./icon-money.png)
	}
	.icon-far{
		background-image: url(./icon-address.png)
	}
	.icon-location{
		background-image: url(./icon-location_fill.png)
	}
	.touch-example{
		position: fixed;
		z-index: 998;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: url(./touch-example.png);
		background-size: 100%;
		background-repeat: no-repeat;
		// width: 100%;
		// height: 100%;
	}
	#index-content{
		width: 100%;
		height: 622px;
		overflow: scroll;
		position: absolute;
		top: 0;
		bottom: 45px;
	}
	.mu-tab-link-highlight{
		background-color: #ff9800
	}
	.mu-circle-spinner{
		border-color: #4CAF50;
	}
</style>