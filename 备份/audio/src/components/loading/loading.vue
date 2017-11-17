<template>
<div @click.stop="" class="loading-box" v-if="this.$store.state.isloading">
  <div class="loading" v-if="this.$store.state.isloading">
     <mu-circular-progress :size="40" color="#474a4f"/>
  </div>
</div>
  
</template>

<script>
  export default {
    name: 'loading'
  }
</script>

<style>
  .loading-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.25);
    z-index: 999;
  }
  .loading{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -20px;
  }  
</style>