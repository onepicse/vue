<template>
	<div class="setting">
		<group title="基本信息">
			<cell title="昵称" :value="user.u_name" is-link link=""></cell>
			<cell title="真实姓名" :value="user.u_realName"></cell>
			<cell title="学生学号" :value="user.u_studentId"></cell>
			<cell title="联系电话" :value="user.u_tell" is-link link=""></cell>
		</group>
		<group title="基本操作">
			<cell title="修改密码" is-link link=""></cell>
			<cell title="绑定学号" is-link link=""></cell>
		</group>
		<flexbox style="margin-top: 0.77em; margin-bottom: 0.3em;">
			<flexbox-item></flexbox-item>
			<flexbox-item :span="4/5">
			<x-button  @click.native="" type="default">退出登录</x-button> 
			</flexbox-item>
			<flexbox-item></flexbox-item>
		</flexbox>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem, Group, Cell, Divider, XSwitch, XButton } from 'vux'
	import { mapState, mapMutations } from 'vuex'
	export default {
		components: {
			Flexbox,
			FlexboxItem,
			Group,
			Cell,
			Divider,
			XSwitch,
			XButton
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		methods: {
			...mapMutations([

				])
		}
	}
</script>

<style lang="less">
	
</style>