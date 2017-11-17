<template>
	<div class="orderSharPhoto page">
		<div class="appBar white border">
			<div @click.stop="backSeller" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				晒图
			</div>
			<div class="appBar-right-icon">
			</div>
		</div>
		<div class="orderSharPhoto-content">
			<div class="orderWriteComment-content-item">
				<div class="orderWriteComment-content-title">
					商家名
				</div>
				<mu-text-field :hintText="waitComment.sellerName" disabled fullWidth/><br/>
			</div>
			<div class="orderWriteComment-content-item">
				<div class="orderWriteComment-content-title">
					标题
				</div>
				<mu-text-field hintText="标题"  fullWidth/><br/>
			</div>
			<div class="orderWriteComment-content-item">
				<div class="orderWriteComment-content-title">
					图片上传
				</div>
				<v-uploadImg @imgs = "imgs"></v-uploadImg>
			</div>
			<button class="btn" type="button">晒图</button>
		</div>
	</div>
</template>

<script>
	import uploadImg from '@/components/uploadImg/uploadImg'
	export default{
		props: {
			waitComment: {
				type: Object
			}
		},
		methods: {
			backSeller () {
				this.$store.state.showOrderSharPhoto = false;
			},
			 imgs (...data) {
		    	//获得 upload 的 图片base64 格式
		    	console.log(data);
		    },
 		},
 		components: {
 			'v-uploadImg' : uploadImg
 		}
	}
</script>

<style lang="less">
	
</style>