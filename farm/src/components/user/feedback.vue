<template>
	<div class="page feedback">
		<div  class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				客服反馈
			</div>
			<div class="appBar-right-icon">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data () {
			return{

			}
		},
		methods: {
			backUser () {
				this.$store.state.showFeedback = false;
			}
		}
	}
</script>

<style lang="less">

</style>

