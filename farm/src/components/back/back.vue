<template>
	<div @click="back" class="back">
		
	</div>
</template>

<script>
	export default{
		methods: {
			back: function(){
				this.$store.state.showBottomNav = true;
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="less">
	.back{
		background-image: url(./icon-back.png)
	}
</style>