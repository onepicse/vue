<template>
	<div class="topic">
		<div class="topic-banner">
			<img src="http://oncxzyx3a.bkt.clouddn.com/pexels-photo-70252.jpg" alt="">
		</div>
		<div style="margin-bottom: 15px">
			<card :footer="{title:'查看全部话题',link:''}">
				<div slot="content">
					<flexbox class="topic-box" v-for="item in commends">
						<flexbox-item v-for="i in item" v-bind:class="{'vux-1px-r': i.hasBorder}">
							#{{ i.title }}# <img width="64" height="32" src="http://oncxzyx3a.bkt.clouddn.com/font-commend.png" alt="">
						</flexbox-item>
					</flexbox>
				</div>	
			</card>
		</div>
		<sticky :offset="46">
			<tab v-model="tabIndex" :line-width="2">
				<tab-item class="vux-center" :selected="tabName === item" v-for="(item,index) in tabs" @on-item-click="changeTabIndex(index,item)" :key="index">{{ item }}</tab-item>
			</tab>
		</sticky>	
		<div class="topic-main" v-show="tabIndex === 0">
			
		</div>
		<div class="topic-main" v-show="tabIndex === 1">

		</div>
		<div class="topic-main" v-show="tabIndex === 2">

		</div>
	</div>
</template>

<script>
	import { ViewBox, Tab, TabItem, Sticky, Flexbox, FlexboxItem, Group, Cell, Card  } from 'vux'
	import { mapState, mapMutations } from 'vuex'
	export default {
		components: {
			ViewBox,
			Tab,
			TabItem,
			Sticky,
			Flexbox,
			FlexboxItem,
			Group,
			Cell,
			Card
		},
		computed: {
			...mapState({
				tabName: state => state.discovery.topic.tabName,
				tabIndex: state => state.discovery.topic.activeIndex,
			})
		},
		data () {
			return{
				tabs: ['热门','最新','关注'],
				commends: [
				[
				{
					title: '求书',
					hasBorder: true
				},
				{
					title: '文学库',
					hasBorder: false
				}
				],
				[
				{
					title: '英语角',
					hasBorder: true
				},
				{
					title: '综合讨论',
					hasBorder: false
				}
				]
				]
			}
		},
		methods: {
			...mapMutations([
				'UPDATE_DISCOVERY_TOPIC_ACTIVEINDEX',
				'UPDATE_DISCOVERY_TOPIC_TABNAME'
			]),
			changeTabIndex (index, item) {
				this.UPDATE_DISCOVERY_TOPIC_ACTIVEINDEX(index);
				this.UPDATE_DISCOVERY_TOPIC_TABNAME(item);
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.topic{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		.topic-banner{
			width: 100%;
			height: 180px;
			overflow: hidden;
			&>img{
				display: block;
				width: 100%;
				height: 180px;
			}
		}
		.topic-box{
			padding: 15px 10px;
			line-height: 32px;
			box-sizing: border-box;
			text-align: center;
			background-color: @bookworm-white;
			img{
				display: inline-block;
				vertical-align: bottom;
			}
		}
		.topic-main{
			width: 100%;
			height: auto;
		}
	}
</style>