<template>
	<div class="userCoupon">
		<divider>未使用</divider>

		<coupon v-for="item in u_coupon.newCouponInfos" :money="item.money" :deadlineDate="item.deadlineDate"></coupon>
		<!-- <span><i slot="icon" class="icon-price"></i>{{ item.money }}</span>
			<p>有效期至{{ item.deadlineDate }}</p> -->
		<divider>已过期</divider>
		<!-- <div v-for="item in u_coupon.usedCouponInfos" class="userCoupon-item icon-coupon used">
			<span><i slot="icon" class="icon-price"></i>{{ item.money }}</span>
			<p>有效期至{{ item.deadlineDate }}</p>
		</div> -->
		<load-more v-if="( u_coupon.num > 0 ? false : true )" :show-loading="false" tip="空空如也"></load-more>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem, LoadMore, Divider  } from 'vux'
	import { mapState } from 'vuex'
	import coupon from './Coupon'
	export default{
		components: {
			Flexbox,
			FlexboxItem,
			LoadMore,
			Divider,
			coupon
		},
		data () {
			return{

			}
		},
		computed: {
			...mapState({
				u_id: state => state.user.u_id,
				u_coupon: state => state.user.u_coupon
			})
		}
	}
</script>

<style lang="less">
	.userCoupon-item{
		width: 100%;
		height: 140px;
		overflow: hidden;
		position: relative;
		span{
			position: absolute;
			left: 50%;
			top: 50%;
			display: block;
			width: auto;
			padding: 0 10px;
			font-size: 40px;
			font-weight: bold;
			color: #fff;
			&>.icon-price:before{
				font-size: 20px;
				color: #fff;
			}
		}
		p{
			width: 100%;
			position: absolute;
			top: 12%;
			text-align: center;
			color: #fff;
			font-size: 14px;
		}
		&.used:before{
			color: #d9d9d9;
		}
		&:before{
			position: absolute;
			left: 50%;
			top: -53px;
			margin-left: -120px;
			font-size: 240px;
			z-index: 0;
		}
	}
</style>