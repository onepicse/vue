<template>
	<div class="page eadit">
		<div class="appBar white border">
			<div @click.stop="backSetting" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				编辑
			</div>
			<div class="appBar-right-icon">
				
			</div>
		</div>
		<div class="eadit-content">
			<div class="eadit-avatar">
				<div class="avatar-img">
					<img  width="80" height="80" style="border-radius: 50%" id="uploaderImg" :src="userAvarta" alt="">
				</div>
				<div class="avatar-file">
					<form id="upAvarta" action="" method="POST" enctype="multipart/form-data">
						<input @click.stop="changeImg" id="uploaderInput" type="file"  accept="image/*" multiple="">
					</form>
				</div>
			</div>
			<div class="eadit-content-item">
				<mu-text-field label="昵称" v-model="username" fullWidth />
			</div>
			<div class="eadit-content-item">
				<mu-radio label="男" name="sex" nativeValue="1" v-model="sex" class="margin-top"/> <br/>
  				<mu-radio label="女" name="sex" nativeValue="0" v-model="sex"  class="margin-top"/> <br/>
			</div>
			<div class="eadit-content-item">
				 <mu-date-picker v-model="birthday" label="生日" fullWidth/> <br/>
			</div>
			<div class="eadit-content-item">
				<mu-text-field label="电话" v-model="usertel" disabled fullWidth />
			</div>
		</div>
		<div class="page-bottom">
			<button @click.stop="updateUser" class="btn" type="button">保存资料</button>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return{
				username: "",
				sex: "",
				birthday: "",
				userAvarta: ""
			}
		},
		created () {
			this.username = this.$store.state.user.userName;
			this.sex = this.$store.state.user.sex;
			this.birthday = this.$store.state.user.birthday;
			this.userAvarta = this.$store.state.user.userAvatar;
		},
		computed: {
			usertel: function () {
				if( this.$store.state.user.tel === null ){
					return " ";
				}
				return this.$store.state.user.tel;
			}
		},
		methods: {
			backSetting () {
				this.$store.state.showEadit = false;
			},
			changeImg (event) {
				let self = this;
				$("#uploaderInput").change(function() {
					var $file = $(this);
					var fileObj = $file[0];

					var windowURL = window.URL || window.webkitURL;
					var dataURL;
					var $img = $("#uploaderImg");

					var file = document.getElementById("uploaderInput").files[0];  
				    var reader = new FileReader();  
				    //将文件以二进制形式读入页面  
				    reader.readAsDataURL(file);  
				    reader.onload = function(f){  
				        self.userAvarta = this.result;
				        $img.attr('src',this.result);     
				    } 
				});
			},
			updateUser () {
				//资料上传
				// console.log(this.birthday );
				// console.log(this.sex );
				// console.log(this.username );
				
				let self = this;
				let userId = this.$store.state.user.userId;
				this.$store.state.isLoading = true;
				$.ajax({
					url: 'http://aishuwo.cn/nong/userServer.php',
					type: 'POST',
					dataType: 'json',
					data: {flag: 'update', uid: userId, birthday: this.birthday , sex: this.sex ,uname: this.username , avartaUrl: this.userAvarta },
				})
				.done(function(response) {
					//response 1 修改成功
					//response 0 修改失败
					console.log(response)
					if(response === 1){
						self.$store.state.showOperationSuccess = true;
						self.$store.state.user.userName = self.username;
						self.$store.state.user.userAvatar = self.userAvarta;
						self.$store.state.user.birthday = self.birthday;
						setTimeout(() => {
							self.$store.state.showOperationSuccess = false;
							self.$store.state.showEadit = false;
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
		}
	}
</script>

<style lang="less">
	.mu-radio-icon-checked {
	    color: #4CAF50;
	}
	.mu-radio input[type="radio"]:checked + .mu-radio-wrapper .mu-radio-icon-uncheck {
	    color: #4CAF50;
	}
	.mu-date-display {
	    background-color: #4CAF50;
	    color: #ffffff;
	}
	.mu-day-button-bg {
	    background-color: #4CAF50;
	}
	.mu-day-button.now .mu-day-button-text {
	    color: #4CAF50;
	}
	.avatar-file{
		width: 80px;
		height: 80px;
		background-image: url(./icon-file.png);
		background-repeat: no-repeat;
		background-size: 80px 80px;
		input{
			display: block;
			width: 80px;
			height: 80px;
			opacity: 0;
		}
	}
	.eadit .mu-text-field-input {
	    height: 45px;
	}
</style>