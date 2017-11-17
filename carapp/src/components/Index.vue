<template>
  <div>
    <div class="button-tab-wrap">
      <button-tab v-model="buttonTabactive">
        <button-tab-item v-for="(item,index) in buttonTabItems">
          {{ item }}
        </button-tab-item>
      </button-tab>
    </div>

    <div class="button-tab-centent" v-if="0 == buttonTabactive">
      <flexbox :gutter="0" wrap="wrap"  align="flex-start">
        <flexbox-item :span="1/3">
          <div class="car-list">
            <div @click.stop="changeActive(index)" :class="{'active': item.isactive}" class="car-item" v-for="(item, index) in cars">
              <img :src="item.imgSrc" :alt="item.label">
            </div>
          </div>
        </flexbox-item>
        <flexbox-item :span="2/3" style="padding: 10px 0;background: #fff;min-height: 484px">
          2
        </flexbox-item>
      </flexbox>
    </div>

    <div class="button-tab-centent" v-if="1 == buttonTabactive">
      <div class="content-map">
        <baidu-map @load="test" class="map" zoom="16">
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        </baidu-map>
      </div>
    </div>

    <div class="button-tab-centent" v-if="2 == buttonTabactive">
      
    </div>
    
    
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem, Flexbox, FlexboxItem } from 'vux'
import taxi from '../assets/img/@2x/taxi.png'
import car from '../assets/img/@2x/car.png'
import truck1 from '../assets/img/@2x/truck1.png'
import truck2 from '../assets/img/@2x/truck2.png'
import convertible from '../assets/img/@2x/convertible.png'

export default {
  name: 'index',
  data() {
    return{
      buttonTabactive: 0,
      buttonTabItems: ['整租', '拼租', '加盟'],
      carActive: 0,
      cars: [
        {
          imgSrc: taxi,
          label: '出租车',
          isactive: true
        },
        {
          imgSrc: car,
          label: '7座轿车',
          isactive: false
        },
        {
          imgSrc: truck1,
          label: '货车I型',
          isactive: false
        },
        {
          imgSrc: truck2,
          label: '货车II型',
          isactive: false
        },
        {
          imgSrc: convertible,
          label: '跑车',
          isactive: false
        }
      ]
    }
  },
  methods: {
    test() {
      console.log(1)
    },
    changeActive(index) {
      for(var i = 0; i < this.cars.length; i++) {
        this.cars[i].isactive = false;
      }
      this.cars[index].isactive = true;
    }
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Flexbox,
    FlexboxItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.button-tab-wrap{
  padding: 15px 30px;
  background-color: #25bdb0
}
.content-map {
  width: 100%;
  height: 301px;
  border-bottom: 1px solid #eaeaea;
  .map {
    width: 100%;
    height: 300px;
  }
}
.car-list {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.car-item {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  &.active {
    background-color: #fff
  }
  img {
    display: inline-block;
    line-height: 60px;
    margin-top: 8px;
  }
}
</style>
