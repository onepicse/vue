<template>
	<div class="toplist">
		<div :style="banner" class="banner">
			<div class="toplist-head">
				<i @click="back" class="back-icon"></i>
				<span>{{ title }}</span>
				<i @click="toAudioList" class="audio-list"></i>
			</div>
		</div>
		<div class="song-cells">
			<div @click.stop="playNow(song)" v-for="(song,index) in songs" class="song-cell">
				<mu-row gutter>
					<mu-col width="10" class="song-index" >
							{{ index+1 }}
					</mu-col>
					<mu-col width="65" class="song-content" >
							<p>
								{{ song.data.songname }}
							</p>
							<span>
								{{
									song.data.singer[0].name
								}}
							</span>
					</mu-col>
					<mu-col class="do-more" width="25">
						<do-more :isAdd="showSuccess" :song="song"></do-more>
					</mu-col>
				</mu-row>	
			</div>
		</div>
		<div class="bottom-box"></div>
		 <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
    		添加成功
  		</mu-popup>
	</div>
</template>
<script>
	import doMore from '@/components/toplist/doMore'
	export default{
		name: 'toplist',
		data() {
			return{
				title: '',
				songs: [],
				banner: {},
				topPopup: false
			}
		},
		components: {
			'do-more': doMore
		},
		methods: {
			open (position) {
		      this[position + 'Popup'] = true
		    },
		    close (position) {
		      this[position + 'Popup'] = false
		    },
			back: function(){
				this.$router.go(-1);
			},
			toAudioList: function(){
				this.$store.state.isShowAudio = true;
			},
			showSuccess: function(){
				console.log(1)
				this.topPopup = true;
			},
			playNow: function(song){
				let songid = song.data.songid;
			    let isHave = false;
			    let i = 0
			    for(;i < this.$store.state.songList.length;i++){
			        if(this.$store.state.songList[i].songid==songid){
			          isHave = true;
			          break;
			        }
			    };
			    if(isHave){
			        this.$store.state.playIndex = i;
			    }else{
					let addSong = {};
				    addSong.songUrl = 'http://ws.stream.qqmusic.qq.com//'+song.data.songid + '.m4a?fromtag=46';
				    addSong.songName = song.data.songname;
				    addSong.singer = song.data.singer[0].name;
				    addSong.nameAndSinger = song.data.songname + "——" + song.data.singer[0].name;
				    addSong.songid = song.data.songid;
				    this.$store.state.songList.push(addSong);
				    //向localStorage存入最新的值
				    localStorage.setItem("songList",JSON.stringify(this.$store.state.songList));

				    this.$store.state.playIndex = (this.$store.state.songList.length - 1); 
			    }
			     this.$store.state.isShowAudio = true;
			}
		},
		watch: {
			topPopup (val) {
				if (val) {
					setTimeout(() => {
						this.topPopup = false
					}, 2000)
				}
			}
		},
		created: function() {
				this.$store.state.isloading = false;
				$("body").scrollTop(0);
				this.title = this.$store.state.topList.topinfo.ListName;
				this.songs = this.$store.state.topList.songlist;
				this.banner = "backgroundImage: url(" + this.$store.state.topList.topinfo.pic_h5 + ")" ;				
		}
	}
</script>

<style>
	.banner{
		display: block;
		width: 100%;
		height: 176px;
		position: relative;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.toplist-head{
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 45px;
		background-color: rgba(71,74,79,0.23);
		z-index: 99
	}
	.toplist-head>span{
		display: block;
		width: 100%;
		height: 45px;
		line-height: 45px;
		font-size: 18px;
		text-align: center;
		color: #fff;

	}
	.back-icon{
		position: absolute;
		left: 16px;
		top: 5px;
		display: block;
		width: 25px;
		height: 35px;
		background: url(./back.png) center center no-repeat;
		background-size: 25px 25px;
	}
	.audio-list{
		position: absolute;
		right: 16px;
		top: 5px;
		display: block;
		width: 25px;
		height: 35px;
		background: url(./vertical.png) center center no-repeat;
		background-size: 25px 25px;
	}
	.do-more{
		display: block;

	}
	.song-cells{
		width: 100%;
		height: auto;
	}
	.song-cell{
		width: 100%;
		height: 55px;
		border-bottom: 1px solid #e1e2e2;
	}
	.song-index{
		width: 10%;
		line-height: 55px;
		text-align: center;
		font-size: 16px;
		color: #323638;
	}
	.song-content{
		width: 80%;
	}
	.song-content>p{
		display: block;
		width: 100%;
		height: 35px;
		overflow: hidden;
		font-size: 16px;
		line-height: 35px; 
		color: #323638;
		margin: 0;
		overflow: hidden;
		white-space: nowrap;
	    text-overflow: ellipsis;
	    word-wrap: break-word;
	}
	.song-content>span{
		display: block;
		line-height: 12px;
		vertical-align: top;
		font-size: 12px;
		color: #888888;
	}
</style>