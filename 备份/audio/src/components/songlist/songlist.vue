<template>
<div class="songlist">
  <div class="songlist-icon" @click="openBottomSheet" label=""></div>
  <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
    <mu-list @itemClick="closeBottomSheet">
      <mu-sub-header>
        播放列表
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
    removeSong: function(song){
      console.log(song);
      for(let i = 0;i < this.$store.state.songList.length;i++){
        if(this.$store.state.songList[i].songid===song.songid){
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