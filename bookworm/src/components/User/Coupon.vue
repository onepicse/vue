<template>
	<div class="coupon" :class="{'coupon-5': classArry[0], 'coupon-10': classArry[1], 'coupon-20': classArry[2]}">
		<span>尚未<br>使用</span>
		<div class="deadline-wrap">有效期至{{ deadlineDate }}</div>
	</div>
</template>

<script>
	export default {
		props: {
			money: {
				type: Number
			},
			deadlineDate: {
				type: String
			}
		},
		computed: {
			classArry () {
				console.log(this.money)
				if(this.money === 5){
					return [true, false, false]
				}
				if(this.money === 10){
					return [false, true, false]
				}
				if(this.money === 20){
					return [false, false, true]
				}
			}
		},
		data () {
			return{

			}
		}
	}
</script>

<style lang="less">
	.coupon{
		position: relative;
		width: 320px;
		height: 101px;
		margin: 0 auto 10px auto;
		background-size: 320px 101px;
		background-repeat: no-repeat;
		background-position: center center;
		&.coupon-20{
			background-image: url(http://oqcwstdev.bkt.clouddn.com/takit_20.png)
		}
		&.coupon-10{
			background-image: url(http://oqcwstdev.bkt.clouddn.com/takit_10.png)
		}
		&.coupon-5{
			background-image: url(http://oqcwstdev.bkt.clouddn.com/takit_5.png)
		}
		span{
			position: absolute;
			left: 0;
			right: 0;
			display: block;
			width: 80px;
			height: 101px;
			padding: 20px 0;
			font-size: 18px;
			line-height: 30px;
			text-align: center;
			color: #fff;
			box-sizing: border-box;
		}
		.deadline-wrap{
			position: absolute;
			bottom: 0;
			left: 120px;
			font-size: 12px;
			line-height: 30px;
			color: #fff;
		}
	}
</style>