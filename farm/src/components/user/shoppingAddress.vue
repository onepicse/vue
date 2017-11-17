<template>
	<div class="page shoppingAddress">
		<div  class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				管理收货地址
			</div>
			<div class="appBar-right-icon">
				<i class="icon icon-addAddress"></i>
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
				this.$store.state.showShoppingAddress = false;
			}
		}
	}
</script>

<style lang="less">
	.icon-addAddress{
		background-size: 30px 30px;
		background-image: url(./icon-addAddress.png)
	}
</style>

