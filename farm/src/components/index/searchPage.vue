<template>
	<div class="searchPage page">
		<div class="appBar white border">
			<div @click.stop="backIndex" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				<mu-auto-complete hintText="请输入搜索商铺或产品" v-model="searchName" @focus="clearSearchReses" @input="handleInput" :dataSource="dataSource" @change="handlechange" />
			</div>
			<div @click.stop="getSearchResult" class="appBar-right-icon">
				<i class="icon icon-search"></i>
			</div>
		</div>
		<div v-if="showSearchTags" class="searchTags">
			<div class="search-history">
				<p>最近搜索 <i @click.stop="clearHistory" style="float: right;" class="icon icon-del"></i></p>
				<mu-chip @click="pushInput(history)" style="background-color: #f3f3f3" v-for="(history,index) in historys" @delete="handleClose(index)" showDelete>
					{{ history }}
				</mu-chip>
			</div>
			<div class="search-hot">
				<p>热门搜索</p>
				<mu-chip style="background-color: #f3f3f3" v-for="hot in hots">
					{{ hot }}
				</mu-chip>
			</div>
		</div>
		<div v-if="!showSearchTags" class="searchRes">
			<div @click.stop="turnSeller(searchRes)" v-for="searchRes in searchReses" class="searchRes-cell">
				<div class="searchRes-cell-img">
					<img :src="searchRes.bannerImgUrl" alt="">
				</div>
				<div class="searchRes-cell-info">
					<h2>{{ searchRes.sellerName }}</h2>
					<v-score :score="searchRes.score" :size="14" :fontSize="12"></v-score>	
					<div class="tags">
						<i v-for="tag in searchRes.tags">{{ tag }}</i>
						<span class="far">{{ searchRes.far }}km</span>
					</div>
				</div>
			</div>
			<div v-if="havaData" class="no-data">
				<div class="line"></div>
				<div class="txt">未搜索到</div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import score from '@/components/score/score' 
	export default{
		data(){
			return{
				havaData: false,
				showSearchTags: true,
				dataSource: [],
				searchName: '',
				historys: [

				],
				hots: [
				'度假村','农家乐','钓鱼场','温泉','采摘园','休闲山庄'
				],
				searchReses: []
			}
		},
		created: function () {
			//判断localStorage中是否存有searchHistory
			if(localStorage.getItem("searchHistory") == null){
				//如果没有 就新建一个 并存入
				localStorage.setItem("searchHistory",JSON.stringify(this.historys));

			}else{
				//如果有 就取出 并赋给this.historys
				this.historys = JSON.parse(localStorage.getItem("searchHistory"));
			}
			// console.log(localStorage.getItem("searchHistory") || '[]')
		},
		methods: {
			pushInput(history){
				this.searchName = history;
			},
			backIndex(){
				this.$store.state.showBottomNav = true;
				this.$store.state.showSearchPage = false;
			},
			handlechange (val) {
				console.log(`${val}`);
			},
			handleClose (index) {
				this.historys.splice(index,1);
				localStorage.setItem("searchHistory",JSON.stringify(this.historys));
			},
			clearHistory () {
				this.historys = [];
				localStorage.setItem("searchHistory",JSON.stringify(this.historys));
			},
			handleInput (val) {
				this.dataSource = [
				val + '农庄',
				val + '农家乐',
				val + '乡村游'
				]
			},
			clearSearchReses () {
				this.searchReses = [];
				this.showSearchTags = true;
			},
			getSearchResult () {
		    	//发送数据请求到后端  
		    	//数据为 this.searchName
		    	this.showSearchTags = false;
		    	this.$store.state.isLoading = true;
		    	let self = this;
		    	setTimeout(() => {
		    		$.ajax({
			    		url: 'http://aishuwo.cn/nong/getInfo.php',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {flag : 'search',input: this.searchName},
			    	})
			    	.done(function(response) {
			    		if( response.length > 0){
			    			self.havaData = false;
			    			for( let i = 0; i < response.length;i++){
			    				let searchRes = {};
			    				searchRes.sellerId = response[i].sellerId;
			    				searchRes.score = parseFloat(response[i].score);
			    				searchRes.far = response[i].far;
			    				let tags = response[i].tags.split(",")
			    				searchRes.tags = tags;
			    				searchRes.bannerImgUrl = response[i].bannerImgUrl;
			    				searchRes.sellerName = response[i].sellerName;
			    				self.searchReses.push(searchRes);
			    			}
			    		}else{
			    			self.havaData = true
			    		}
			    	})
			    	.fail(function() {
			    		console.log("error");
			    	})
			    	.always(function() {
			    		self.$store.state.isLoading = false;
			    	});
		    	},500)
		    	//更新 this.historys
		    	this.historys.push(this.searchName);
		    	//将搜索信息存入 localStorage
		    	localStorage.setItem("searchHistory",JSON.stringify(this.historys));
		    },
		    turnSeller(searchRes){
		    	let sellerId = searchRes.sellerId;
		    	let self = this;
				let seller = {};
				self.$store.state.isLoading = true;
				setTimeout(() => {					
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
	.icon-search{
		background-image: url(./icon-search.png)
	}
	.mu-text-field-focus-line {
		background-color: #4CAF50;
	}
	.mu-chip{
		margin: 5px;
	}
</style>