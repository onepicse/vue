<template>
  <div id="app">
    <transition enter-active-class="animated bounceInLeft fast delay" leave-active-class="animated bounceOutRight fast">
      <router-view></router-view>
    </transition>
    <v-navigation></v-navigation>
    <v-loading></v-loading>
    <v-audio :class="{ slideInUp: this.$store.state.isShowAudio,slideOutDown:!this.$store.state.isShowAudio}"></v-audio>
  </div>
</template>

<script>
import audio from '@/components/audio/audio'
import loading from '@/components/loading/loading'
import navigation from '@/components/navigation/Navigation'
export default {
  name: 'app',
  components:{
    'v-navigation': navigation,
    'v-loading': loading,
    'v-audio': audio
  },
  created() {
    this.$store.state.songList = JSON.parse(localStorage.getItem("songList") || '[]');
  }
}
</script>

<style>
  html,body{
    background-color: #eeeff0;
  }
  .delay{
    animation-delay: 0.65s;
  }
</style>