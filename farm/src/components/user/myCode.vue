<template>
	<div class="myCode page">
		<div class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				我的二维码
			</div>
			<div @click.stop="scan" node-type="qr-btn" class="appBar-right-icon">
				<i class="icon icon-scan"></i>
			</div>
		</div>
		<div class="myCode-content">
			<v-code :config="config"></v-code>
		</div>
	</div>
</template>

<!-- <script src="js/qrcode.lib.min.js"></script>
<script src="js/qrcode.js"></script> -->
<script> 
	import code from './vue-qart.vue'
  	import QArt from 'qartjs'
  	import logoSrc from './logo.png'
	export default{
		data () {
		    return {
		        config: {
		            value: 'Hello yoyuo',
		            imagePath: logoSrc,
		            filter: 'color'
		        },
		    }
		},
		methods: {
			backUser () {
				this.$store.state.showMycode = false;
			},
			// scan () {
			// 	Qrcode.init($('[node-type=qr-btn]'));
			// }
		},
		components: {
	      'v-code' : code
	    },
	}
</script>

<style lang="less">
	.icon-scan{
		background-image: url(./icon-scan.png)
	}
	// input[node-type=jsbridge]{
	//     display:none;
	// }
</style>