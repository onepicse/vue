<template>
	<div class="idea">
		<div class="appBar white border">
			<div class="appBar-left-icon">

			</div>
			<div class="appBar-center-text">
				攻略
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<mu-tabs class="fixed-tabs" style="background: #fff;" :value="activeTab" @change="handleTabChange">
			<mu-tab value="writeTrip" title="写攻略"/>
			<mu-tab value="showPhoto" title="晒照片" @active="getPhotoDate"/>
		</mu-tabs>
		<div id="writeTripWrap" v-if="activeTab === 'writeTrip'">
			<!-- 写游记 -->
			<div @click.stop="turnIdeaArticle(writeTrip)" v-for="writeTrip in ideaData.writeTrips" class="writeTrip-cell">
				<div class="writeTrip-cell-hd">
					{{ writeTrip.dtitle }}
				</div>
				<div class="writeTrip-cell-bd">
					<img :src="writeTrip.dbanner" alt="">
				</div>
				<div class="writeTrip-cell-ft">
					<div class="writeTrip-cell-ft-l">
						{{ writeTrip.ddate }}
					</div>
					<div class="writeTrip-cell-ft-r">
						<i class="icon icon-watch"></i>
						{{ writeTrip.dwatch }}
						<i class="icon icon-leftMessage"></i>
						{{ writeTrip.leftMessage }}
					</div>	
				</div>
			</div>
			<div @click.stop="turnWriteArticle"  class="write-Article"></div>

			<div v-if="havaData" class="no-data">
				<div class="line"></div>
				<div class="txt">没数据啦</div>
				<div class="line"></div>
			</div>

			<mu-infinite-scroll style="color:#4CAF50" :scroller="loadArticler" :loadingText="loadingText" :loading="loadingArticle" @load="loadArticle"/>
		</div>
		<div id="showPhotoWrap" v-if="activeTab === 'showPhoto'">
		<!-- 晒照片 -->
			<mu-refresh-control style="color:#4CAF50" :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
			<mu-grid-list class="gridlist">
				<mu-grid-tile v-for="tile,index in ideaData.showPhotos" :key="'tile' + index" titlePosition="top" actionPosition="left" :rows="tile.featured ? 2 : 1" :cols="tile.featured ? 2 : 1">
					<img :src="tile.pimage"/>
					<span slot="title">{{tile.ptitle}}</span>
					<span slot="subTitle">by <b>{{tile.uname}}</b></span>
					<mu-icon-button icon="star_border" slot="action"/>
				</mu-grid-tile>
			</mu-grid-list>
			<div @click.stop="turnSharImage"  class="write-Article icon-sharImage"></div>
		</div>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-ideaArticle :writeTrip="propwriteTrip" :comments="comments" v-if="showIdeaArticle"></v-ideaArticle>
			<v-writeArticle v-if="showWriteArticle"></v-writeArticle>
			<v-sharImage v-if="showSharImage"></v-sharImage>
		</transition>
	</div>
</template>


<script>
	import ideaArticle from '@/components/idea/ideaArticle'
	import writeArticle from '@/components/idea/writeArticle'
	import sharImage from '@/components/idea/sharImage'
	export default{
		data() {
			return{
				havaData: false,
				activeTab: 'writeTrip',
				propwriteTrip: {},
				comments: [],
				loadingText: '正在加载...',
				loadingArticle: false,
      			loadArticler: null,
      			refreshing: false,
      			trigger: null,
				ideaData: {
					writeTrips: [
						
					],
					showPhotos: [
						
					]
				},
				photoTime: 0,
			}
		},
		mounted () {
		    this.loadArticler = document.querySelector('#writeTripWrap');
		    this.trigger = this.$el
		},
		created: function () {
        	//发送请求 获得攻略 部分数据 
        	//塞进 ideaData 中
        	this.$store.state.articleTime = 1;
        	this.$store.state.isLoading = true;
        		let self = this;
        		$.ajax({
		        	url: 'http://aishuwo.cn/nong/diaryServer.php',
		        	type: 'POST',
		        	dataType: 'json',
		        	data: {flag: 'diary', times: 0},
		        })
		        .done(function(response) {
		        	console.log(response)
		        	for( let i = 0;i < response.length;i++){
			        	let article = {};
			        	let have = false;
			        	article.did = response[i].did;
			        	article.dbanner = response[i].dbanner;
			        	article.ddate = response[i].ddate;
			        	article.dtitle = response[i].dtitle;
			        	article.dwatch = response[i].dwatch;
			        	article.leftMessage = response[i].leftMessage;
			        	for(let j = 0;j < self.ideaData.writeTrips.length;j++){
			        		if(self.ideaData.writeTrips[j].did === article.did){
			        			have = true;
			        		}
			        	}
			        	if(!have){
			        		self.ideaData.writeTrips.push(article);
			        	}			        	
		        	}     	
		        })
		        .fail(function() {
		        	console.log("error");
		        })
		        .always(function() {
		        	self.$store.state.isLoading = false;
		    });
    	},
		computed: {
			showIdeaArticle: function(){
				return this.$store.state.showIdeaArticle;
			},
			showWriteArticle: function(){
				return this.$store.state.showWriteArticle;
			},
			showSharImage: function () {
				return this.$store.state.showSharImage;
			}
		},
		methods: {
			handleTabChange (val) {
		      	this.activeTab = val
		    },
		    turnSharImage () {
		    	this.$store.state.showBottomNav = false;
		    	this.$store.state.showSharImage = true;
		    },
		    turnIdeaArticle (writeTrip) {
		    	console.log(writeTrip)
		    	let self = this;
        		$.ajax({
		        	url: 'http://aishuwo.cn/nong/diaryServer.php',
		        	type: 'POST',
		        	dataType: 'json',
		        	data: {flag: 'info', did: writeTrip.did},
		        })
		        .done(function(response) {
		        	writeTrip.dtitle = response[0].dtitle;
		        	let imgs = response[0].contentImg.split(",");
		        	writeTrip.contentImg = imgs;
		        	writeTrip.contentText = response[0].contentText;
		        	self.propwriteTrip = writeTrip;

		        	$.ajax({
			    		url: 'http://aishuwo.cn/nong/diaryCommentServer.php',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {flag: 'search', did: writeTrip.did}
			    	})
			    	.done(function(response) {
			    		console.log(response)
			    		self.comments = response;
			    	})
			    	.fail(function() {
			    		console.log("error");
			    	})
			    	.always(function() {
			    		console.log("complete");
			    	});
		    		self.$store.state.showBottomNav = false;
		    		self.$store.state.showIdeaArticle = true;
		        })
		        .fail(function() {
		        	console.log("error");
		        })
		        .always(function() {
		        	console.log("complete");
		    	});
		    },
		    turnWriteArticle () {
		    	this.$store.state.showBottomNav = false;
		    	this.$store.state.showWriteArticle = true;
		    },
		    getPhotoDate () {
		    	this.$store.state.isLoading = true;
		    	this.ideaData.showPhotos = [];
		    	let self = this;
		    	$.ajax({
		        	url: 'http://aishuwo.cn/nong/diaryServer.php',
		        	type: 'POST',
		        	dataType: 'json',
		        	data: {flag: 'photo', times: 0},
		        })
		        .done(function(response) {
		        	//一次性给我8张
		        	for(let i = 0;i < response.length;i++){
		        		let photo = {};
		        		photo.pid = response[i].pid;
		        		photo.pimage = response[i].pimage;
		        		photo.ptitle = response[i].ptitle;
		        		photo.uname = response[i].uname;
		        		self.ideaData.showPhotos.push(photo);
		        	}
		        })
		        .fail(function() {
		        	console.log("error");
		        })
		        .always(function() {
		        	self.$store.state.isLoading = false;
		        });
		    },
		    loadArticle () {
		    	//加载文章
		    	this.$store.state.articleTime++;
		    	this.havaData = false;
		       	this.loadingArticle = true;
		       	let times = this.$store.state.articleTime;
		       	let self = this;
		        setTimeout(() => {
		        $.ajax({
		        	url: 'http://aishuwo.cn/nong/diaryServer.php',
		        	type: 'POST',
		        	dataType: 'json',
		        	data: {flag: 'diary', times: times},
		        })
		        .done(function(response) {
		        	if( response.length > 0 ){
		        		for(let i = 0;i < response.length;i++){
		        			let article = {};
				        	article.did = response[i].did;
				        	article.dbanner = response[i].dbanner;
				        	article.ddate = response[i].ddate;
				        	article.dtitle = response[i].dtitle;
				        	article.dwatch = response[i].dwatch;
				        	article.leftMessage = response[i].leftMessage;
				        	self.ideaData.writeTrips.push(article);
		        		}
		        	}else{
		        		// self.articleTime = 0;
		    			self.havaData = true;
		        	}
		        	
		        })
		        .fail(function(response) {
		        	// console.log(response);
		        })
		        .always(function() {
		        	console.log("complete");
		        });
		        
		        this.loadingArticle = false;
		      }, 1000)
		    },
		    refresh () {
		    	//加载图片
		      this.refreshing = true
		      setTimeout(() => {
		      	
		        this.refreshing = false
		      }, 1000)
		    }
		},
		components: {
			'v-ideaArticle' : ideaArticle,
			'v-writeArticle' : writeArticle,
			'v-sharImage' : sharImage
		}
	}
</script>

<style lang="less">
	.icon-watch{
		height: 40px;
		background-image: url(./icon-watch.png)
	}
	.icon-leftMessage{
		height: 40px;
		background-image: url(./icon-leftMessage.png)
	}
	.mu-tab-text{
		color: #4c4c4c;
	}
	.mu-tab-active .mu-tab-text{
		color: #4caf50
	}
	.fixed-tabs{
		position: fixed;
		top: 45px;
	}
	#writeTripWrap{
		width: 100%;
		// height: 520px;
		position: absolute;
		top: 93px;
		bottom: 45px;
		padding-bottom: 20px;
		overflow: auto;
  		-webkit-overflow-scrolling: touch;
	}
	#showPhotoWrap{
		position: absolute;
		top: 93px;
		bottom: 45px;
		width: 100%;
		// height: 520px;
		overflow: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
  		// position: relative;
  		user-select: none;
	}
	.write-Article{
		position: fixed;
		right: 20px;
		bottom: 65px;
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background-image: url(./icon-write.png);
		background-size: 64px 64px;
		box-shadow: 0 14px 45px rgba(0,0,0,.247059),0 10px 18px rgba(0,0,0,.219608);
	}
	.icon-sharImage{
		background-image: url(./icon-sharImage.png)
	}
</style>