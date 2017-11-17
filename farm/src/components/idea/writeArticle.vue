<template>
	<div class="writeArticle page">
		<div class="appBar white border">
			<div  @click.stop="backIdea" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				写攻略
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<div class="writeArticle-content">
			<div class="article-title-input">
				<input type="text" v-model="dtitle" placeholder="标题">
			</div>
			<div class="article-imgs">
				<v-uploadImg @imgs = "imgs"></v-uploadImg>
			</div>
			<div class="article-txt">
				 <mu-text-field hintText="不允许超过600个字符" :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" multiLine :rows="8" :rowsMax="20" v-model="dContentText" :maxLength="600" fullWidth/><br/>
			</div>
			<button @click.stop="postArticle" class="btn" type="button">发表游记</button>
		</div>
		<mu-dialog :open="successDialog" title="" @close="closeDialog">
			<div class="icon-success"></div>
			<h3 class="txt-success">发表成功</h3>
		</mu-dialog>
	</div>
</template>

<script>
	import uploadImg from '@/components/uploadImg/uploadImg'
	export default{
		data () {
			return{
				successDialog : false,
				multiLineInputErrorText: '',
				dtitle: '',
				dbanner: '',
				dContentText: ''
			}
		},
		methods: {
			backIdea () {
				this.$store.state.showBottomNav = true;
				this.$store.state.showWriteArticle = false;
			},
			closeDialog () {
				this.successDialog = false;
			},
			handleMultiLineOverflow (isOverflow) {
		      this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
		    },
		    imgs (...data) {
		    	//获得 upload 的 图片base64 格式
		    	// console.log(data[0][0])
		    	this.dbanner = data[0];
		    	// console.log(this.dbanner)
		    },
		    postArticle () {
		    	this.$store.state.isLoading = true;
		    	let self = this;
		    	let uid = this.$store.state.user.userId;
		    	$.ajax({
		    		url: 'http://aishuwo.cn/nong/diaryServer.php',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {flag: 'submit', dtitle: this.dtitle, dbanner: this.dbanner,contentText: this.dContentText,uid: uid},
		    	})
		    	.done(function(response) {
		    		//response = 1 成功
		    		//response = 0 失败
		    		console.log(response)
		    		if(response === 1){
		    			self.$store.state.showOperationSuccess = true;
			    		setTimeout(() => {
							self.$store.state.showOperationSuccess = false;
							self.$store.state.showBottomNav = true;
							self.$store.state.showWriteArticle = false;
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
		    		
		    	})
		    	.always(function() {
		    		self.$store.state.isLoading = false;
		    	});
		    	
		    },
			changeImg () {
				$("#uploaderInput").change(function() {
					var $file = $(this);
					var fileObj = $file[0];
					var windowURL = window.URL || window.webkitURL;
					var dataURL;
					var $img = $("#uploaderImg");

					if(fileObj && fileObj.files && fileObj.files[0]){
						dataURL = windowURL.createObjectURL(fileObj.files[0]);
						$img.attr('src',dataURL);
					}else{
						dataURL = $file.val();
						var imgObj = document.getElementById("uploaderImg");
						imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
						imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
					}
				});
			}
		},
		components: {
			'v-uploadImg' : uploadImg
		}
	}
</script>

<style lang="less">
	.icon-success{
		width: 64px;
		height: 64px;
		margin: 0 auto;
		background-image: url(./icon-success.png);
		background-size: 64px 64px;
		
	}
	h3.txt-success{
		font-size: 18px;
		line-height: 24px;
		color: #4caf50;
		text-align: center;
	}
	.article-file{
		width: 128px;
		height: 128px;
		background-image: url(./icon-file.png);
		background-repeat: no-repeat;
		background-size: 128px 128px;
		&>input{
			display: block;
			width: 128px;
			height: 128px;
			opacity: 0;
		}
	}
	.mu-text-field.focus-state{
		color: #4caf50;
	}
</style>