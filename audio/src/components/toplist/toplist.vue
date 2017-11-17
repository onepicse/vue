<template>
	<div class="toplist">
		<div class="toplist-head">
			<i @click="back" class="back-icon"></i>
			<span>{{ title }}</span>
			<i @click="toAudioList" class="audio-list"></i>
		</div>
		<div :style="banner" class="banner">
			
		</div>
		<div class="song-cells">
			<div class="toplist-btns">
				<div class="toplist-btn file-icon">
					36万
				</div>
				<div class="toplist-btn msg-icon">
					56519
				</div>
				<div class="toplist-btn share-icon">
					1479
				</div>
				<div class="toplist-btn down-icon">
					下载
				</div>
			</div>
			<div @click.stop="playAll" class="addAllList">
				<i></i>
				<span>播放全部</span>
			</div>
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
			playAll: function(){
				let i = 0;
				for(; i < this.songs.length;i++){
					let song = this.songs[i];
				    let addSong = {};
					addSong.songUrl = 'http://ws.stream.qqmusic.qq.com//'+song.data.songid + '.m4a?fromtag=46';
					addSong.songName = song.data.songname;
					addSong.singer = song.data.singer[0].name;
					addSong.nameAndSinger = song.data.songname + "——" + song.data.singer[0].name;
					addSong.songid = song.data.songid;
					this.$store.state.songList.push(addSong);
				}
				//向localStorage存入最新的值
				localStorage.setItem("songList",JSON.stringify(this.$store.state.songList));
				this.$store.state.playIndex = (this.$store.state.songList.length - 1 - i); 
				this.$store.state.isShowAudio = true;
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
	.toplist-head{
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 45px;
		background-color: #474a4f;
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
	.banner{
		display: block;
		width: 100%;
		height: 176px;
		margin-top: 45px;
		position: relative;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.toplist-btns{
		width: 100%;
		height: 60px;
		display: flex;
	}
	.toplist-btn{
		flex-grow:1;
		width: 33.333333%;
		background-size: 24px 24px;
		background-repeat: no-repeat;
		background-position: center 8px ; 
		padding-top: 35px;
		text-align: center;
	}
	.toplist-btn.file-icon{
		background-image: url(./file.png);
	}
	.toplist-btn.msg-icon{
		background-image: url(./msg.png);
	}
	.toplist-btn.share-icon{
		background-image: url(./share.png);
	}
	.toplist-btn.down-icon{
		background-image: url(./down.png);
	}
	.addAllList{
		width: 100%;
		height: 55px;
		font-size: 18px;
		color: #323638;
		border-bottom: 1px solid #e1e2e2;
	}
	.addAllList>i{
		display: inline-block;
		width: 50px;
		height: 100%;
		vertical-align: top;
		background: url(./audio.png) center center no-repeat;
		background-size: 25px 25px;
	}
	.addAllList>span{
		display: inline-block;
		width: auto;
		height: 100%;
		vertical-align: top;
		line-height: 55px;
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