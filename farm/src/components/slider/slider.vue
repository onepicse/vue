<template>
  <slider-template :pages="sliderData" :sliderinit="sliderinit" @slide='slide'></slider-template>
</template>
<script>
  import sliderTemplate from './sliderTemplate'
  export default {
    data () {
      return {
        sliderData: [
          {
            src: '../static/img/banner_1.jpg',
            alt: 'sliderimg'
          },
          {
            src: '../static/img/banner_2.jpg',
            alt: 'sliderimg'
          }
        ],
        sliderinit: {
          currentPage: 1,
          start: {},
          end: {},
          tracking: false,
          thresholdTime: 500,
          thresholdDistance: 100,
          loop: true
        }
      }
    },
    beforeMount () {
      
    },
    components: {
      sliderTemplate
    },
    methods: {
      slide (pagenum) {
      }
    }
  }
</script>