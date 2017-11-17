<template>
	<div class="userIntegration">
		<view-box ref="viewBox">
			<div slot="header" class="userIntegration-h">
				<flexbox class="userIntegration-content vux-1px-b">
					<flexbox-item>
						<div class="userIntegration-content-item">				<span>
							<countup :start-val="0" :end-val="u_integration.remaining" :duration="3"></countup>
						</span>
					</div>
				</flexbox-item>
			</flexbox>
		</div>
		<div class="userIntegration-b">
			<tab :line-width=2 v-model="tabIndex">
				<tab-item class="vux-center" :selected="tabName === item" v-for="(item,index) in tabs" :key="index">{{ item }}</tab-item>
			</tab>
			<swiper height="360px" style="background-color: #fff;overflow: scroll" v-model="tabIndex" :show-dots="false">
				<swiper-item> 
					<div class="tab-swiper vux-center">
						<div class="userWallet-tabs-content">
							<cell v-if="u_integration.integrationInfo.inInfos.length > 0" v-for="item in  u_integration.integrationInfo.inInfos" :title="item.title" :inline-desc='( item.date + " — " + item.from )'>
								<div slot="value">
									<span style="color: #fd7c42">+{{ item.money }}</span>
								</div>
							</cell>
							<load-more v-else :show-loading="false" tip="空空如也"></load-more>
						</div>
					</div>
				</swiper-item>
				<swiper-item> 
					<div class="tab-swiper vux-center">
						<div class="userWallet-tabs-content">
							<cell v-if="
							u_integration.integrationInfo.outInfos.length > 0 " v-for="item in u_integration.integrationInfo.outInfos" :title="outInfo.title" :inline-desc='( item.date + " — " + item.from )'>
								<div slot="value">
									<span style="color: #fd7c42">-{{ item.money }}</span>
								</div>
							</cell>
							<load-more v-else :show-loading="false" tip="空空如也"></load-more>
						</div>	
					</div>
				</swiper-item>
			</swiper>
		</div>
	</view-box>
</div>
</template>

<script>
	import { ViewBox, Flexbox, FlexboxItem, Swiper, SwiperItem, Tab, TabItem, Cell, Countup, LoadMore  } from 'vux'
	import { mapState } from 'vuex'
	export default{
		components: {
			ViewBox,
			Flexbox,
			FlexboxItem,
			Swiper,
			SwiperItem,
			Tab,
			TabItem,
			Cell,
			Countup,
			LoadMore
		},
		data () {
			return{
				tabIndex: 0,
				tabName: '支出',
				tabs: [
				'支出',
				'收入'
				]
			}
		},
		computed: {
			...mapState ({
				u_id: state => state.user.u_id,
				u_integration: state => state.user.u_integration
			})
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.userIntegration{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		.userIntegration-h{
			width: 100%;
			height: auto;
			.userIntegration-content{
				width: 100%;
				height: auto;
				padding: 30px 0;
				background-color: #656D89;
				.userIntegration-content-item{
					width: 100%;
					padding: 20px 0;
					text-align: center;
					span{
						font-size: 40px;
						color:  @theme-color;
					}
				}
			}
		}
	}
</style>