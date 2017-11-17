<template>
	<div class="bottomNav">
		<div class="navitem-wrap">
			<router-link active-class="navitem-active" to="/index" class="nav-item">
				<i class="icon icon-index"></i>
				<span class="icon-title">首页</span>
			</router-link>
			<router-link active-class="navitem-active" to="/trip" class="nav-item">
				<i class="icon icon-trip"></i>
				<span class="icon-title">农家</span>
			</router-link>
			<router-link active-class="navitem-active" to="/idea" class="nav-item">
				<i class="icon icon-idea"></i>
				<span class="icon-title">攻略</span>
			</router-link>
			<router-link active-class="navitem-active" to="/user" class="nav-item">
				<i class="icon icon-my"></i>
				<span class="icon-title">我的</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'bottomNav',
		data () {
		    return {
		     
		    }
		},
		methods: {
		 	
		}
	}
</script>

<style lang="less">
	.icon.icon-index{
		background-image: url(./icon-home.png)
	}
	.navitem-active .icon.icon-index{
		background-image: url(./icon-home-active.png)
	}
	.icon.icon-trip{
		background-image: url(./icon-car.png)
	}
	.navitem-active .icon.icon-trip{
		background-image: url(./icon-car-active.png)
	}
	.icon.icon-idea{
		background-image: url(./icon-idea.png)
	}
	.navitem-active .icon.icon-idea{
		background-image: url(./icon-idea-active.png)
	}
	.icon.icon-my{
		background-image: url(./icon-smile.png)
	}
	.navitem-active .icon.icon-my{
		background-image: url(./icon-smile-active.png)
	}
</style>