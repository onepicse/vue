<template>
	<div class="collection page">
		<div class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				我的收藏
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<mu-tabs style="background: #fff;" :value="activeTab" @change="handleTabChange">
			<mu-tab value="seller" title="商家"/>
			<mu-tab value="commodity" title="商品"/>
			<mu-tab value="idea" title="攻略"/>
		</mu-tabs>
		<div v-if="activeTab === 'seller'">
			<div class="no-data">
				<div class="line"></div>
				<div class="txt">去逛逛吧</div>
				<div class="line"></div>
			</div>
		</div>
		<div v-if="activeTab === 'commodity'">
			<div class="no-data">
				<div class="line"></div>
				<div class="txt">去逛逛吧</div>
				<div class="line"></div>
			</div>
		</div>
		<div v-if="activeTab === 'idea'">
			<div class="no-data">
				<div class="line"></div>
				<div class="txt">去逛逛吧</div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				activeTab: 'seller'
			}
		},
		methods: {
			handleTabChange (val) {
		      this.activeTab = val
		    },
			backUser(){
				this.$store.state.showCollection = false;
			}
		}
	}
</script>

<style lang="less">
	
</style>