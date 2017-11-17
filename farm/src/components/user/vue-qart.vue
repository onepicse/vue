<template>
    <div>
        <div class="canvas-wrap" ref="qart"></div>
        <mu-raised-button @click.stop="convertToImage"  class="down-button" label="下载二维码"></mu-raised-button>
    </div>
</template>


<script type="application/ecmascript">
import QArt from 'qartjs';
  export default {
    props: ['config'],
    data () {
      return {
        msg: ''
      }
    },
    mounted(){
      new QArt({
        value: this.config.value,
        imagePath: this.config.imagePath,
        filter: this.config.filter
      }).make(this.$refs.qart);
    },
    methods: {
      convertToImage(){
        const myCanvas = this.$refs.qart.children[0];
        const type = 'image/png';
        let image = myCanvas.toDataURL(type).replace(type, "image/octet-stream");
        window.location.href = image; // it will save locally
      }
    }
  }
</script>

<style lang="less">
  .canvas-wrap{
    display: block;
    text-align: center;
    margin-top: 100px;
    &>canvas{
      width: 300px;
      height: 300px;
    }
  }
  .down-button{
    display: block;
    margin: 0 auto;
  }
</style>