<template>
	<div class="login">
		<div class="appBar">
	      <div @click.stop="hideLogin" class="appBar-left-icon">
	          <i class="icon icon-close"></i>
	      </div>
	      <div class="appBar-center-text">
	        登录
	      </div>
	      <div class="appBar-right-icon"></div>
	    </div>
	    <div class="login-form">
	    	<div class="login-item">
	    		<label for="userName">
	    		    <mu-text-field v-model="username" hintText="请输入您的账号" @focus="clearUnameError" :errorText="usernameError" fullWidth type="number" icon="phone"/>
	    		    <!-- <i class="icon icon-user"></i> -->
	    			<!-- <input v-model="username" type="text" name="userName" placeholder="请输入您的账号"> -->
	    		</label>
	    	</div>
	    	<div class="login-item">
	    		<label for="userPwd">
	    			<mu-text-field v-model="password" hintText="密码, 6-16位数字或字母" :errorText="passwordError" @focus="clearpasswordError" fullWidth type="password" icon="lock"/>
	    		    <!-- <i class="icon icon-lock"></i>
	    			<input v-model="password" type="password" name="userPwd" placeholder="密码, 6-16位数字或字母"> -->
	    		</label>
	    	</div>
	    </div>
	    <div class="button-wrap">
	    	<button @click.stop="login" class="green" type="button">登录</button>
	    </div>
	    <div class="button-wrap">
	    	<button @click.stop="turnRegister" class="yello" type="button">注册新用户</button>
	    </div>
	    <mu-dialog :open="loginResDialog" title="登录失败" @close="closeLoginResDialog">
	    	请确认账号密码是否有误
		    <mu-flat-button slot="actions" primary @click="closeLoginResDialog" label="确定"/>
		</mu-dialog>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				username: '',
				password: '',
				usernameError: '',
				passwordError: '',
				loginResDialog: false
			}
		},
		methods: {
			hideLogin: function(){
				this.$store.state.showLogin = false;
			},
			turnRegister: function(){
				this.$store.state.showLogin = false;
				this.$store.state.showRegister = true;
			},
			clearUnameError () {
				this.usernameError = "";
			},
			clearpasswordError () {
				this.passwordError = "";
			},
			closeLoginResDialog () {
				this.loginResDialog = false;
			},
 			login () {
				let self = this;
				if( this.username === "" ){
					this.usernameError = "请输入手机号";
					return;
				}
				if( this.password === "" ){
					this.passwordError = "请输入密码";
					return;
				}
				//获取用户输入的账号密码
				//发送到后端 与数据库进行匹配 
				//成功则返回 相应用户数据 
				//用户数据赋值到this.$store.state.user
				//订单数据赋值到this.$store.state.order
				//不成功则 弹出未注册
				this.$store.state.isLoading = true;
				setTimeout(() => {
					$.ajax({
						url: 'http://aishuwo.cn/nong/userServer.php',
				       	type: 'POST',
				        dataType: 'json',
				        data: {flag : 'login', phone: this.username,password: this.password},
					})
					.done(function(response) {
					//赋值用户信息
					
						if(response === 0){
							console.log(response)
							self.loginResDialog = true;
						}else{
							self.$store.state.user.userId = response[0].uid;
							self.$store.state.user.userName = response[0].uname;
							self.$store.state.user.userAvatar = response[0].avartaUrl;
							self.$store.state.user.birthday = response[0].birthday;
							self.$store.state.user.tel = response[0].phone;
							self.$store.state.user.sex = response[0].sex;

							let orderTestData = {
					        	//所有订单
						        allOrder: [],
						        //待付款
						        waitPayOrder: [],
						        //待使用
						        waitUse: [],
						        //待评价
						        waitComment: [],
						        //退款单
						        refund: []
					    	}

							//获取订单数据
						    
						    let uid = self.$store.state.user.userId;
						    $.ajax({
						    	url: 'http://aishuwo.cn/nong/orderServer.php',
						    	type: 'POST',
						    	dataType: 'json',
						    	data: {flag: 'search', uid: uid},
						    })
						    .done(function(response) {
						    	console.log(response);
						    	//type = 1 未付款
							    //type = 2 待使用
							    //type = 3 待评价
							    //type = 4 退款单 
						    	for(let i = 0; i < response.length; i++){
						    		switch(response[i].type){
						    			case "1":
						    				let waitPayOrder = {};
						    				waitPayOrder.sellerId = response[i].sellerId;
						    				waitPayOrder.oid = response[i].oid;
						    				waitPayOrder.sellerName = response[i].sellerName;
						    				waitPayOrder.num = response[i].num;
						    				waitPayOrder.commodityImg = response[i].explodedView;
						    				waitPayOrder.money = response[i].pay;
						    				orderTestData.waitPayOrder.push(waitPayOrder);
						    			break;
						    			case "2":

						    			break;
						    			case "3":
						    				let waitComment = {};
						    				waitComment.sellerId = response[i].sellerId;
						    				waitComment.oid = response[i].oid;
						    				waitComment.sellerName = response[i].sellerName;
						    				waitComment.num = response[i].num;
						    				waitComment.commodityImg = response[i].explodedView;
						    				waitComment.money = response[i].pay;
						    				orderTestData.waitComment.push(waitComment);
						    			break;
						    			case "4":

						    			break;
						    			default:

						    			break;
						    		}
						    	}
						    })
						    .fail(function() {
						    	console.log("error");
						    })
						    .always(function() {
						    	console.log("complete");
						    });
						    	
							
							//赋值订单信息
							self.$store.state.order = orderTestData;

							//退出登录页面 是否登录标记为true
							self.$store.state.showLogin = false;
							self.$store.state.isLogin = true;
						}
					   
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						self.$store.state.isLoading = false;
					});
				}, 1000)
			}
		}
	}
</script>

<style lang="less">
	.icon-close{
		background-image: url(icon-close.png)
	}
	.icon-lock{
		background-image: url(icon-lock.png)
	}
	.icon-user{
		background-image: url(icon-user.png)
	}
</style>