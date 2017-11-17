<template>
	<div class="orderWriteArticle  page">
		<div class="appBar white border">
			<div @click.stop="backSeller" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				写游记
			</div>
			<div class="appBar-right-icon">
			</div>
		</div>
		<div class="orderWriteArticle-content">
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
				<mu-text-field hintText="标题" fullWidth/>
			</div>
			<div class="orderWriteComment-content-item">
				<div class="orderWriteComment-content-title">
					图片上传
				</div>
				<v-uploadImg  @imgs = "imgs"></v-uploadImg>
			</div>
			<div class="orderWriteComment-content-item">
				<div class="orderWriteComment-content-title">
					游记内容
				</div>
				<mu-text-field hintText="不允许超过600个字符" :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" multiLine :rows="8" :rowsMax="20" :maxLength="600" fullWidth/>
			</div>
			
			<button class="btn" type="button">发表游记</button>
			
		</div>
	</div>
</template>

<script>
	import uploadImg from '@/components/uploadImg/uploadImg'
	export default{
		data () {
			return{
				multiLineInputErrorText: ''
			}
		},
		props: {
			waitComment: {
				type: Object
			}
		},
		methods: {
			backSeller () {
				this.$store.state.showOrderWriteArticle = false;
			},
			handleMultiLineOverflow (isOverflow) {
		      this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
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