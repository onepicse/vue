<template>
	<div class="user">
		<div class="page-head">
			<span>账户</span>
		</div>
		<div class="user-content">
			<div class="avatar">
				<img width="60" height="60" src="./uicon.jpg" alt="">
			</div>
			<div class="user-content-title">
				<span>{{ user.name }}</span>
				<i class="level">Lv.{{ user.level }}</i>
			</div>
		</div>
		<div class="user-tab">
			<div class="user-tab-item">
				<span>动态</span>
				<i>{{ user.trends }}</i>
			</div>
			<div class="user-tab-item">
				<span>关注</span>
				<i>{{ user.concern }}</i>
			</div>
			<div class="user-tab-item">
				<span>粉丝</span>
				<i>{{ user.fans }}</i>
			</div>
		</div>
		<v-list></v-list>
		<div class="bottom-box"></div>
	</div>
</template>

<script>
	import list from '@/components/list/list'
	// import avatarImg from '/uicon.jpg'
	export default{
		name: 'user',
		data () {
			return {
				user:{
					name: '易寻光',
					level: 8,
					trends: 1,
					concern: 217,
					fans: 36
				}
			}
		},
		components: {
			'v-list': list
		}
	}
</script>

<style>
	.page-head{
		width: 100%;
		height: 45px;
		font-size: 16px;
		color: #fff;
		text-align: center;
		background-color: #474a4f;
		line-height: 45px;
	}
	.user-content{
		width: 100%;
		height: 98px;
		padding: 15px 10px 15px 15px;
		background-color: #feffff;
		font-size: 0;
	}
	.avatar{
		display: inline-block;
		width: 60px;
		height: 60px;
		margin-right: 10px;
		vertical-align: top;
	}
	.avatar>img{
		border-radius: 50%;
	}
	.user-content-title{
		display: inline-block;
		vertical-align: top;
		background-color: #feffff;
	}
	.user-content-title>span{
		display: block;
		height: 32px;
		width: auto;
		font-size: 14px;
		color: #333;
		line-height: 32px;
	}
	.level{
		display: block;
		width: 35px;
		height: 16px;
		border-radius: 8px;
		border: 1px solid #bfbfbf;
		font-size: 10px;
		line-height: 16px;
		color: #bfbfbf;
		font-weight: bold;
		text-align: center;
	}
	.user-tab{
		display: flex;
		justify-content: center;
		width: 100%;
		height: 52px;
		padding: 11px 0;
		border-top: 1px solid #e5e5e5; 
		border-bottom: 1px solid #e5e5e5; 
	}
	.user-tab-item{
		flex: 1; 
		text-align: center;
	}
	.user-tab-item+.user-tab-item{
		border-left: 1px solid #e5e5e5;
	}
	.user-tab-item>span{
		display: block;
		font-size: 12px;
		color: #a3a4a4;
	}
	.user-tab-item>i{
		display: block;
		font-style: normal;
		font-weight: bold;
		font-size: 12px;
		color: #333333;
	}
	.bottom-box{
		width: 100%;
		height: 66px;
		background-color: #eeeff0; 
	}
</style>