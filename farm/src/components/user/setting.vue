<template>
	<div class="page">
		<div class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				设置
			</div>
			<div @click.stop="turnEadit" class="appBar-right-icon">
				<i class="icon icon-small-edit"></i>
			</div>
		</div>
		<div class="page-list">
			<ul>
				<li class="list-item avart">
					<span class="list-item-title">
						头像
					</span>
					<div class="avart-wrap">	
						<img :src="user.userAvatar" alt="">
					</div>
				</li>
			</ul>
		</div>
		<div class="page-list">
			<ul>
				<li class="list-item">
					<span class="list-item-title">
						昵称
					</span>
					<span class="list-item-txt">
						{{ user.userName }}
					</span>
					<!-- <i class="icon icon-black-right"></i> -->
				</li>
				<li class="list-item">
					<span class="list-item-title">
						性别
					</span>
					<span class="list-item-txt">
						{{ userSex }}
					</span>
					<!-- <i class="icon icon-black-right"></i> -->
				</li>
				<li class="list-item">
					<span class="list-item-title">
						生日
					</span>
					<span class="list-item-txt"></span>
					<!-- <i class="icon icon-black-right"></i> -->
				</li>
			</ul>
		</div>
		<div class="page-list">
			<ul>
				<li class="list-item">
					<span class="list-item-title">
						手机号
					</span>
					<span class="list-item-txt">
						{{ user.tel }}
					</span>
					<!-- <i class="icon icon-black-right"></i> -->
				</li>
				<li class="list-item">
					<span class="list-item-title">
						修改密码
					</span>
					<span class="list-item-txt">
						
					</span>
					<!-- <i class="icon icon-black-right"></i> -->
				</li>
				<li class="list-item">
					<span class="list-item-title">
						关于我们
					</span>
					<span class="list-item-txt"></span>
					<!-- <i class="icon icon-black-right"></i> -->
				</li>
			</ul>
		</div>
		<div class="page-bottom">
			<button class="btn" type="button">退出账号</button>
		</div>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-eadit v-if="showEadit"></v-eadit>
		</transition>
	</div>	
</template>

<script>
	import eadit from '@/components/user/eadit'
	export default{
		data () {
			return {
			
			}
		},
		computed: {
			user: function(){
				return this.$store.state.user;
			},
			userSex: function () {
				return this.user.sex? "男" : "女";
			},
			showEadit: function(){
				return this.$store.state.showEadit;
			}
		},
		// created: function(){
		// 	this.user = this.$store.state.user;
		// },
		methods: {
			turnEadit () {
				this.$store.state.showEadit = true;
			},
			backUser () {
				this.$store.state.showSetting = false;
			}
		},
		components: {
			'v-eadit' : eadit
		} 
	}
</script>

<style lang="less">
	.icon-black-right{
		background-image: url(./icon-right.png)
	}
	.icon-small-edit{
		background-image: url(./icon-small-edit.png)
	}
</style>