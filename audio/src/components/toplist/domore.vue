<template>
<div>
  <mu-raised-button class="more-icon" @click.stop="openBottomSheet" label="" />
  <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
    <mu-list @itemClick="closeBottomSheet">
      <mu-sub-header>
        选择操作
      </mu-sub-header>
        <mu-list-item title="收藏"/>
        <mu-list-item @click="addSong" title="添加到播放列表"/>
    </mu-list>
  </mu-bottom-sheet>
</div>
</template>

<script>
export default {
  data () {
    return {
      bottomSheet: false
    }
  },
  props: {
      song: {}
  },
  methods: {
    closeBottomSheet () {
      this.bottomSheet = false
    },
    openBottomSheet () {
      this.bottomSheet = true
    },
    addSong(){
      // console.log(this.song);
      let songid = this.song.data.songid;
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
          this.$store.state.isShowAudio = true;
      }else{
        let self = this;
        let addSong = {};
        addSong.songUrl = 'http://ws.stream.qqmusic.qq.com//'+ this.song.data.songid + '.m4a?fromtag=46';
        addSong.songName = this.song.data.songname;
        addSong.singer = this.song.data.singer[0].name;
        addSong.nameAndSinger = this.song.data.songname + "——" + this.song.data.singer[0].name;
        addSong.songid = this.song.data.songid;
        this.$store.state.songList.push(addSong);
        //向localStorage存入最新的值
        localStorage.setItem("songList",JSON.stringify(this.$store.state.songList));
      }
      this.bottomSheet = false;
      this.$emit('isAdd', 'true');
    }
  }
}
</script>

<style>
  .more-icon{
    height: 55px;
    border: none;
    box-shadow: none;
    background: url(./more.png) center center no-repeat;
    background-size: 25px 25px;
  }  
</style>