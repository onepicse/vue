<template>
  <div id="demoComponent" class="userLocation page">
    <div class="appBar white border">
      <div class="appBar-left-icon">
        <i @click.stop="backIndex" class="icon icon-back"></i>
      </div>
      <div class="appBar-center-text">
        我的位置
      </div>
      <div class="appBar-right-icon"></div>
    </div>
    <!-- <label>关键词：<input v-model="keyword"></label>
    <label>地区：<input v-model="location"></label> -->
    <baidu-map  :zoom="16" style="width:375px;height:550px;" class="map">
      <bm-geolocation @locationSuccess = "locationSuccess" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" animation="BMAP_ANIMATION_BOUNCE"  :autoLocation="true"/>
       <!-- <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search> -->
    </baidu-map>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        // location: '重庆',
        // keyword: '富强农家乐',
      }
    },
    methods: {
      backIndex () {
        this.$store.state.showBottomNav = true;
        this.$store.state.showUserLocation = false;
      },
      locationSuccess (...data) {
        this.$store.state.showOperationSuccess = true;
        this.$store.state.user.point = data[0].point;
        this.$store.state.user.city = data[0].addressComponent.district;
        setTimeout(() => {
          this.$store.state.showOperationSuccess = false;
        },500)
      }
    }
  };
</script>