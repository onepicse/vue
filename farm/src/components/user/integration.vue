<template>
	<div class="integration page">
		<div class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				农庄积分
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<div style="text-align:center;" class="integration-round">
			 <mu-circular-progress mode="determinate" :size="150" :strokeWidth="8" color="#4caf50" :value="value"/>
			 <span>{{ value }}</span>
		</div>
		<div class="integration-txt">
			<h2>积分使用规则</h2>
			<h4>1、什么是积分？</h4>
			<p>(1) 进行消费给予的奖励，首次注册将会赠与新用户100积分。</p>
			<p>(2) 针对每笔订单的不同，积分可抵扣额度也不同，具体抵扣额度以商家设定的可用积分为准（1积分=1元）。</p>
			<h4>2、如何获得积分？</h4>
			<p>(1) 首次注册可得100积分;</p>	
			<p>(3) 下单并消费后，30天内该订单进行评价，即可获得此笔订单消费金额对应比例的积分（消费100元可获1积分）;</p>	
			<p>(4) 不定期开展积分奖励活动，可能会增加积分获得的倍数，具体以活动公告为准。</p>	
			<h4>3、在哪些情况下，会扣除积分？</h4>	
			<p>若违反活动限制或采取非正常流程获得的积分，可能会扣除积分，情节严重时积分将会被清零。</p>	
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				value: 0
			}
		},
		mounted () {
		    this.timer = setInterval(() => {
		      this.value += 1
		      if (this.value > 100) this.value = 100,clearInterval(this.timer);
		    }, 25)
		},
		// beforeDestroy () {
		//     clearInterval(this.timer)
		// },
		methods: {
			backUser(){
				this.$store.state.showIntegration = false;
			}
		}
	}
</script>

<style lang="less">
	
</style>