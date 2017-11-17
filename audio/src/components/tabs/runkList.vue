<template>
	<div @click.stop="getData(runkListData)" class="runk-list">
		<mu-row gutter>
			<mu-col width="33" class="runk-img" >
				<img :src="runkListData.picUrl" alt="">
			</mu-col>
			<mu-col width="67" class="runk-audio-list" >
				<span v-for="(songList,index) in runkListData.songList">
				{{ index+1 }}.{{ songList.songname }}	- {{ songList.singername }}
				</span>
			</mu-col>
		</mu-row>
	</div>
</template>

<script>
	export default{
		name: 'runkList',
		props: {
			runkListData: {}
		},
		data() {
			return{
				
			}
		},
		methods: {
			getData(runkListData) {
				this.$store.state.isloading = true;
				this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
				params: {
					topid: runkListData.id,
					format: 'jsonp',
					inCharset: 'utf8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'yqq',
					needNewCode: 0
				},
				jsonp: 'jsonpCallback'
				}).then(function (response) {
					let selt = this; 
					this.$store.state.topList = {},
					this.$store.state.topList = response.body;
					setTimeout(function(){
					selt.$router.push({path:'/toplist'});},500)
				});
			}
		}
	}

</script>

<style>
	.runk-list{
		width: 100%;
		height: 124px;
		margin-top: 3px;
	}
	.runk-img>img{
		display: block;
		width: 124px;
		height: 124px;
	}
	.runk-audio-list{
		height: 124px;
		width: 67%;
		padding: 17px 0 17px 10px;
	}
	.runk-audio-list>span{
		display: block;
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #333;
		overflow: hidden;
		white-space: nowrap;
	    text-overflow: ellipsis;
	    word-wrap: break-word;
	}
</style>