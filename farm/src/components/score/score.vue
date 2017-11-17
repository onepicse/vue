<template>
	<div class="score">
		<mu-icon v-for="item in items" :color="item" value="star" :size="size"/>
		<span :style="{fontSize: fontSize+'px'}">{{ score }}分</span>
	</div>
</template>

<script>
	const number = 5;
	const ClsFull = "#4caf50";
	const ClsNone = "#d8d8d8";
	export default {
		data() {
			return {

			}
		},
		computed: {
			items: function() {
				let scoreArr = [];
				for(let i = 0;i < parseInt(this.score);i++){
					scoreArr.push(ClsFull);
				}
				while(scoreArr.length < 5){
					scoreArr.push(ClsNone);
				}
				return scoreArr;
			}
		},
		props: {
			score: {
				type: Number
			},
			size: {
				type: Number
			},
			fontSize: {
				type: Number
			}
		}
	}
</script>

<style lang="less">
	.icon-right{
		position: absolute;
		right: 2px;
		top: 0;
		background-image: url(./icon-right.png)
	}
</style>