<template>
  <div class="map-wrap">
    <div class="appBar white">
      <div @click.stop="backSeller" class="appBar-left-icon">
          <i class="icon icon-back"></i>
      </div>
      <div class="appBar-center-text">
        {{ sellerName }}
      </div>
      <div class="appBar-right-icon"></div>
    </div>
    <baidu-map :zoom="16" style="width:375px;height:550px;" :center="position" @ready="handler">
      <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"/>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
    </baidu-map>
    <!-- <el-amap vid="amap" :plugin="plugin" :zoom="zoom" :center="center">
         <el-amap-marker  :position="center"></el-amap-marker>
    </el-amap> -->
  </div>
</template>

<script>
export default {
  data () {
    let self = this;
    return {
      position: {lng: 0, lat: 0}
      // plugin: [{
      //   pName: 'ToolBar',
      //   events: {
      //     init(instance) {
           
      //     }
      //   }
      // }]
    }
  },
  props: {
    center: {
      type: Array
    },
    sellerName: {
      type: String
    }
  },
  created: function(){
  
  },
  methods: {
    handler () {
      this.position.lng = this.center[0]
      this.position.lat = this.center[1]
    },
    backSeller: function(){
      this.$store.state.showMap = false;
    }
  }
};
</script>

<style lang='less'>
  .icon-back{
    background-image: url(./icon-back.png);
  }
</style>
