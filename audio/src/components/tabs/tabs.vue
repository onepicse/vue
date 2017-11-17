<template>
	<div class="tabs">
		<mu-tabs :value="activeTab" @change="handleTabChange">
			<mu-tab value="tab1" title="排行榜"/>
			<mu-tab value="tab2" title="个性推荐"/>
			<mu-tab value="tab3" title="主播电台"/>
			<mu-tab value="tab4" title="歌单"/>
		</mu-tabs>
		<div :runk="runk" v-if="activeTab === 'tab1'">
			<v-slider></v-slider>

			<runk-list v-for="runklist in runk" 
			:runkListData="runklist"></runk-list>

			<div class="bottom-box"></div>
		</div>
		<div v-if="activeTab === 'tab2'">
			<h2>Tab Two</h2>
			<p>
				这是第二个 tab
			</p>
		</div>
		<div v-if="activeTab === 'tab3'">
			<h2>Tab Three</h2>
			<p>
				这是第三个 tab
			</p>
		</div>
		<div v-if="activeTab === 'tab4'">
			<h2>Tab Four</h2>
			<p>
				这是第四个 tab
			</p>
		</div>
	</div>
</template>

<script>
	import slider from '@/components/slider/slider'
	import runkList from '@/components/tabs/runkList'
 	export default {
		name: 'tabs',
		props: {
			runk: {}
		},
		data () {
			return {
				activeTab: 'tab1'
			}
		},
		methods: {
			handleTabChange (val) {
				this.activeTab = val
			}
		},
		components: {
			'v-slider': slider,
			'runk-list': runkList
		}
	}
</script>

<style>
	.mu-tabs{
		background-color: #f8f8f8;
		color: #474a4f;
	}
	.mu-tab-text{
		color: #474a4f;
	}
	.mu-tab-link-highlight{
		background-color: #474a4f;
	}
</style>