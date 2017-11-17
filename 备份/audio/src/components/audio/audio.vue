<template>
	<div class="audio animated">
		<div class="toplist-head-song border">
			<i @click="back" class="back-icon"></i>
				<span>{{ songName }} - {{ songer }}</span>	
			<div class="audio-round">
				<div class="round"></div>
				<div :class="{on: isplay}" class="hander"></div>	
			</div>	
		</div>
		<div :class="{play: isplay}"  class="audio-content">
			<audio id="audio" :src="songUrl" v-on:ended="next"  autoloop="autoloop" autoplay="autoplay" :loop="this.$store.state.isLoop">
			</audio>
		</div>
		<div class="audio-buttons">
			<div class="slider-wrap">
				<i :class="{min: !noVolume,no: noVolume}" class="volume-icon"></i>
				<mu-slider v-model="volume"/>
			</div>
			
			<div @click.stop="pre" class="pre"></div>
			<div :class="{on: isplay}" @click.stop="stopPlay" class="stop"></div>
			<div @click.stop="next" class="next"></div>
			<v-songlist></v-songlist>
		</div>
	</div>
</template>

<script>
	import songlist from '@/components/songlist/songlist'
	export default{
		name: 'audio',
		data() {
			return{
				// playList: 0,
				// isplay: this.$store.state.isPlay,
				songName: '',
				songer: '',
				songUrl: '',
				listLength: 0,
				volume: 50,
				noVolume: false
				//总共时间
				// audioTime: 0,
				//过去了的时间
				// audioNowTime: 0
			}
		},
		components: {
			'v-songlist': songlist
		},
		created: function(){
			
		},
		computed: {
			playindex() {
				return this.$store.state.playIndex;
			},
			listLength() { 
				return this.$store.state.songList.length;
			},
			isplay() {
				return this.$store.state.isPlay;
			}
		},
		watch: {
			playindex(newValue){
				this.songName = this.$store.state.songList[newValue].songName;
				this.songer = this.$store.state.songList[newValue].singer;
				this.songUrl = this.$store.state.songList[newValue].songUrl;
				this.$store.state.isPlay = true;
				//模拟手机点击
				let audio = document.querySelector('#audio');
				audio.play();
			},
			volume(newValue){
				if(newValue===0){
					this.noVolume = true;
				}else{
					this.noVolume = false;
				};
				let audio = document.querySelector('#audio');
				audio.volume = (newValue/100); 
			}
		},
		methods: {
			back: function(){
				this.$store.state.isShowAudio = false;
			},
			stopPlay: function(){
				let audio =document.querySelector('#audio');
				if(this.$store.state.isPlay===true){
					audio.pause();
				}else{
					audio.play();
				};
				this.$store.state.isPlay = !this.$store.state.isPlay;
			},
			pre: function(){
				if(this.$store.state.playIndex===0){
					this.$store.state.playIndex = (this.$store.state.songList.length - 1);
				}else{
					this.$store.state.playIndex--;
				}
			},
			next: function(){
				if(this.$store.state.playIndex===(this.$store.state.songList.length - 1)){
					this.$store.state.playIndex = 0;
				}else{
					this.$store.state.playIndex++;
				}
			}
		}
	}
</script>

<style>
	.audio{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background: #474a4f;
		display: block;
	}
	.audio.active{
		display: block;
	}
	.blur {	
		-webkit-filter: blur(10px); /* Chrome, Opera */
		-moz-filter: blur(10px);
		-ms-filter: blur(10px);    
		filter: blur(10px);
	}
	.audio-round{
		width: 100%;
		height: 300px;
		position: absolute;
		left: 0;
		top: 45px;
		overflow: hidden;
	}
	.round{
		position: absolute;
		width: 62px;
		height: 63px;
		left: 50%;
		top: -31px;
		margin-left: -31px;
		z-index: 999;
		background: url(./round.png) center center no-repeat;
	}
	.hander{
		width: 248px;
		height: 152px;
		background: url(./hander.png) no-repeat;
		background-size: 248px 152px;
		background-position:  0 0;
		position: absolute;
		top: 0;
    	left: 180px;
		transition: all 1s linear;
		z-index: 88;
	}
	.hander.on{
		transform: rotate(30deg);
		transform-origin: 12px 14px ;
	}

	.toplist-head-song{
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 999;
		border-bottom: 1px solid rgba(255,255,255,0.65);
	}
	
	.toplist-head-song>span{
		display: block;
	    width: 75%;
	    height: 45px;
	    margin: 0 auto;
	    overflow: hidden;
	    font-size: 16px;
	    line-height: 45px;
	    color: #fff;
	    text-align: center;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    word-wrap: break-word;
	}
	.audio-content{
		position: absolute;
	    top: 50%;
	    left: 50%;
	    width: 300px;
	    height: 300px;
	    margin-top: -180px;
	    margin-left: -150px;
	    border: 1px solid rgba(255,255,255,0.65);
	    border-radius: 50%;
	    background: url(./singlecover.png) rgba(255,255,255,0.23) center center no-repeat;
	    background-size: 250px 250px;
	}
	.audio-content.play{
		-webkit-animation: singlecover 5s linear infinite;
		-moz-animation: singlecover 5s linear infinite;
		-ms-animation: singlecover 5s linear infinite;
		-o-animation: singlecover 5s linear infinite;
		animation: singlecover 5s linear infinite;
	}
	@-webkit-keyframes singlecover{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
	@-moz-keyframes singlecover{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
	@-ms-keyframes singlecover{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
	@-o-keyframes singlecover{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
	@keyframes singlecover{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
	.audio-buttons{
		width: 100%;
		height: 98px;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.slider-wrap{
		width: 70%;
		position: absolute;
		top: -20px;
		left: 15%;
	}
	.volume-icon{
		display: block;
		width: 25px;
		height: 25px;
		position: absolute;
		left: -40px;
		top: -1px;
		background-repeat: no-repeat;
		background-size: 25px 25px;
	}
	.volume-icon.min{
		background-image: url(./volume-min.png);
	}
	.volume-icon.max{
		background-image: url(./volume-max.png);
	}
	.volume-icon.no{
		background-image: url(./volume-no.png);
	}
	.audio-buttons .pre,.audio-buttons .next,.audio-buttons .stop{
		display: block;
		width: 50px;
		height: 50px;
		position: absolute;
		top: 50%;
		margin-top: -25px;
	}
	.audio-buttons .pre{
		left: 45px;
		background: url(./pre.png) center center no-repeat;
		background-size: 50px 50px;
	}
	.audio-buttons .next{
		right: 45px;
		background: url(./next.png) center center no-repeat;
		background-size: 50px 50px;
	}
	.audio-buttons .stop{
		right: 50%;
		margin-right: -25px;
		background: url(./play.png) center center no-repeat;
		background-size: 50px 50px;
	}
	.audio-buttons .stop.on{
		background: url(./stop.png) center center no-repeat;
		background-size: 50px 50px;
	}
</style>