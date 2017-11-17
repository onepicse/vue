<template>
	<div class="search">
		<mu-row gutter>
			<mu-col width="17" class="search-icon" gutter>
				<img width="25" src="./microphone.png" alt="">
			</mu-col>
			<mu-col width="66" gutter>
				<label class="search-input-wrap" for="search-input">
					<input type="search" @focus="showSearch" id="search-input" placeholder="搜索音乐、歌词、电台">
				</label>
			</mu-col>
			<mu-col width="17" class="search-icon" gutter>
				<img width="25" @click="showAudio" style="margin-top:3px;" src="./vertical.png" alt="">
			</mu-col>
  		</mu-row>
  		<div v-if="isShow" v-bind:style="{ width: width+'px',height: height+'px' }" class="search-list-box">
  			<div class="search-list" v-for="(list,index) in lists">
  				{{ index+1 }} &nbsp;&nbsp; {{ list.k }}  &nbsp;&nbsp; {{ list.n }}
  			</div>
  			<i v-if="isShow" @click="hideSearchList" class="close-icon"></i>
  		</div>
	</div>
</template>

<script>
	export default{
		name: 'search',
		data() {
			return{
				isShow: false,
				lists: {}
			}
		},
		computed: {
			width() {
				return $(window).width();
			},
			height() {
				return $(window).height()-45;
			}
		},
		methods: {
			showAudio: function() {
				this.$store.state.isShowAudio = true;
			},
			hideSearchList: function(){
				this.isShow = false;
			},
			showSearch: function() {
				this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', {
					params: {
						g_tk: 5381,
						loginUin: 0,
						hostUin: 0,
						format: 'jsonp',
						inCharset: 'utf8',
						outCharset: 'utf-8',
						notice: 0,
						platform: 'yqq',
						needNewCode: 0
					},
					jsonp: 'jsonpCallback'
				}).then((response) => {
					this.lists = response.body.data.hotkey;
					console.log(this.lists)
				});
				this.isShow = true;
				console.log(this.width)
			}
		}
	}
</script>

<style>
	.search{
		width: 100%;
		height: 45px;
		padding: 7.5px 0;
		background-color: #474a4f;
		position: relative;
	}
	.search-icon>img{
		display: block;
		margin: 0 12px;
	}
	.search-input-wrap{
		position: relative;
		display: block;
		width: 100%;
		height: 30px;
	}
	.search-input-wrap>input{
		display: block;
		height: 30px;
		width: 100%;
		border: none;
		outline: none;
		border-radius: 15px;
		padding-left: 45px;
		line-height: normal;
		background-color: #ffffff;
	}
	.search-list-box{
		position: fixed;
		top: 45px;
		right: 0;
		background-color: #fff;
		overflow: scroll;
		z-index: 999;
	}
	.search-list{
		width: 100%;
		height: 48px;
		padding: 0 20px;
		line-height: 48px;
	}
	.search-list+.search-list{
		/*border-top: 1px solid #474a4f;*/
	}
	.search-list-box>.close-icon{
		display: block;
		width: 50px;
		height: 50px;
		position: fixed;
		top: 40%;
		right: 16px;
		background: url(./close.png) center center no-repeat;
		background-size: 50px 50px;
	}
</style>