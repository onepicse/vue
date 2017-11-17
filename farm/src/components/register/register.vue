<template>
	<div class="login">
		<div class="appBar">
	      <div @click.stop="hideLogin" class="appBar-left-icon">
	          <i class="icon icon-close"></i>
	      </div>
	      <div class="appBar-center-text">
	        注册
	      </div>
	      <div class="appBar-right-icon"></div>
	    </div>
	    <div class="login-form">
	    	<div class="login-item">
	    		<label>
	    		     <mu-text-field v-model="userName" hintText="请输入您的手机号" @focus="clearUnameError" :errorText="usernameError" fullWidth type="number" icon="phone"/>
	    		</label>
	    	</div>
	    	<div class="login-item">
	    		<label>
	    		    <mu-text-field v-model="userPwd" hintText="密码, 6-16位数字或字母" :errorText="passwordError" @focus="clearpasswordError" fullWidth type="password" icon="lock"/>
	    		</label>
	    	</div>
	    	<div class="login-item">
	    		<label>
	    		    <mu-text-field v-model="repPwd" hintText="确认密码" :errorText="repPwdError" @focus="clearRepPwdError" fullWidth type="password" icon="lock"/>
	    		</label>
	    	</div>
	    </div>
	    <div class="button-wrap">
	    	<button @click.stop="doRegister" class="green" type="button">同意并注册</button>
	    </div>
	    <div class="button-wrap">
	    	<button @click="turnLogin" class="yello" type="button">返回登录</button>
	    </div>
	    <mu-dialog :open="regResDialog" title="注册失败" @close="closeRegResDialog">
	    	 注册失败
		    <mu-flat-button slot="actions" primary @click="closeRegResDialog" label="确定"/>
		</mu-dialog>
		<mu-dialog :open="alreadyResDialog" title="注册失败" @close="closeAlreadyResDialog">
	    	 该手机号已经被注册过
		    <mu-flat-button slot="actions" primary @click="closeAlreadyResDialog" label="确定"/>
		</mu-dialog>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				userName: '',
				userPwd: '',
				repPwd: '',
				usernameError: '',
				passwordError: '',
				repPwdError: '',
				regResDialog: false,
				alreadyResDialog: false
			}
		},
		methods: {
			closeRegResDialog () {
				this.regResDialog = false;
			},
			closeAlreadyResDialog () {
				this.alreadyResDialog = false;
			},
			clearUnameError () {
				this.usernameError = '';
			},
			clearpasswordError () {
				this.passwordError = '';
			},
			clearRepPwdError () {
				this.repPwdError = '';
			},
			doRegister: function(){
				let self = this;
				if( this.userName === "" ){
					this.usernameError = "请填写手机号";
					return;
				}
				if( this.userPwd === "" ){
					this.passwordError = "请填写密码";
					return;
				}
				if( this.repPwd === "" ){
					this.repPwdError = "请确认密码";
					return;
				}
				if( this.userPwd !== this.repPwd){
					this.passwordError = "两次输入不一致";
					this.repPwdError = "两次输入不一致";
					return;
				}
				this.$store.state.isLoading = true;
				setTimeout(() => {
					$.ajax({
						url: 'http://aishuwo.cn/nong/userServer.php',
				       	type: 'POST',
				        dataType: 'json',
				        data: {flag : 'register', phone: this.userName,password: this.userPwd},
					})
					.done(function(response) {
						console.log(response);
						//response = 2 重名
						//response = 1 注册成功
						//response = 0 注册失败
						switch(response){
							case 1: 

								break;
							case 0: 
								self.regResDialog = true;
								break;
							case 2:
								self.alreadyResDialog = true;
								break;
							default: 
								self.regResDialog = true; 	
						}
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						self.$store.state.isLoading = false;
					});
				},1000)				
			},
			hideLogin: function(){
				this.$store.state.showRegister = false;
			},
			turnLogin: function(){
				this.$store.state.showRegister = false;
				this.$store.state.showLogin = true;
			}
		}
	}
</script>

<style lang="less">
	
</style>