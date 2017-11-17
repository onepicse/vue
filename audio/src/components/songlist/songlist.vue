<template>
<div class="songlist">
  <div class="songlist-icon" @click="openBottomSheet" label=""></div>
  <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
    <mu-list @itemClick="closeBottomSheet">
      <mu-sub-header>
        播放列表 <span @click.stop="clearAll" class="clear-songList"><i></i>清空列表</span>
      </mu-sub-header>
      <div class="over-wrap">
         <mu-list-item @click.stop="turn(index)" v-for="(song,index) in this.$store.state.songList" :title="song.nameAndSinger" :key="index">
            <mu-icon @click.stop="removeSong(song)" slot="right" value="close"/>
         </mu-list-item>
      </div>  
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
  methods: {
    closeBottomSheet () {
      this.bottomSheet = false
    },
    openBottomSheet () {
      this.bottomSheet = true
    },
    turn: function(index){
        this.bottomSheet = false;
        this.$store.state.playIndex = index;  
    },
    //清空播放列表
    clearAll: function () {
      this.$store.state.songList = [];
      localStorage.setItem("songList",JSON.stringify(this.$store.state.songList));
    },
    //删除其中一首歌
    removeSong: function (song) {
      for(let i = 0;i < this.$store.state.songList.length;i++){
        if(this.$store.state.songList[i].songid === song.songid){
          this.$store.state.songList.splice(i,1);
          localStorage.setItem("songList",JSON.stringify(this.$store.state.songList));
          break;
        }
      }
    }
  }
}
</script>

<style>
    .clear-songList{
      float: right;
      width: 100px;
      height: 48px;
      padding-left: 35px;
      line-height: 50px;
      position: relative;
    }
    .clear-songList>i{
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 25px;
      height: 48px;
      background: url(./clear.png) center center no-repeat;
      background-size: 25px 25px;
    }
    .songlist{
      position: absolute;
      right: 5px;
      top: 22px;
      color: #fff;
    }
    .songlist-icon{
      height: 55px;
      width: 55px;
      border: none;
      box-shadow: none;
      background: url(list.png) center center no-repeat;
      background-size: 25px 25px;
    }  
    .over-wrap{
      height: 300px;
      overflow: scroll;
    }
    .mu-item-content{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }
</style>