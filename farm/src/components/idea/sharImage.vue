<template>
	<div class="orderSharPhoto page">
		<div class="appBar white border">
			<div @click.stop="backIdea" class="appBar-left-icon">
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
					标题
				</div>
				<mu-text-field v-model="ptitle" hintText="标题"  fullWidth/><br/>
			</div>
			<div class="orderWriteComment-content-item">
				<div class="orderWriteComment-content-title">
					图片上传
				</div>
				<v-uploadImg @imgs = "imgs"></v-uploadImg>
			</div>
			<button @click.stop="postImage" class="btn" type="button">晒图</button>
		</div>
	</div>
</template>

<script>
	import uploadImg from '@/components/uploadImg/uploadImg'
	export default{
		data () {
			return{
				ptitle: '',
				sharImage: ''
			}
		},
		methods: {
			backIdea () {
				this.$store.state.showBottomNav = true;
				this.$store.state.showSharImage = false;
			},
			imgs (...data) {
		    	//获得 upload 的 图片base64 格式
		    	this.sharImage = data[0];
		    },
		    postImage () {
		    	this.$store.state.isLoading = true;
		    	let self = this;
		    	let uid = this.$store.state.user.userId;
		    	$.ajax({
		    		url: 'http://aishuwo.cn/nong/diaryServer.php',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {flag: 'post', pimage: this.sharImage,ptitle: this.ptitle,uid: uid},
		    	})
		    	.done(function(response) {
		    		if(response === 1){
		    			self.$store.state.showOperationSuccess = true;
			    		setTimeout(() => {
							self.$store.state.showOperationSuccess = false;
							self.$store.state.showBottomNav = true;
							self.$store.state.showSharImage = false;
							// self.router.go(0)
			    		},1000)
		    		}else{
		    			self.$store.state.showOperationError = true;
			    		setTimeout(() => {
						self.$store.state.showOperationError = false;
			    		},1000)
		    		}
		    	})
		    	.fail(function() {
		    		console.log("error");
		    	})
		    	.always(function() {
		    		self.$store.state.isLoading = false;
		    	});
		    	
		    }
 		},
 		components: {
 			'v-uploadImg' : uploadImg
 		}
	}
</script>

<style lang="less">
	
</style>