<template>
	<div class="userWallet">
		<view-box ref="viewBox">
			<div slot="header" class="userWallet-h">
				<flexbox class="userWallet-content vux-1px-b">
					<flexbox-item>
						<div class="userWallet-content-item">
							<p>支出（元）</p>
							<span>
								<countup :decimals="2" :start-val="0" :end-val="u_wallet.out" :duration="3"></countup>
							</span>
						</div>
					</flexbox-item>
					<flexbox-item>
						<div class="userWallet-content-item">
							<p>账户余额（元）</p>
							<span>
								<countup  :decimals="2" :start-val="0" :end-val="u_wallet.remaining" :duration="3"></countup>
							</span>
						</div>
					</flexbox-item>
				</flexbox>
			</div>
			<div class="userWallet-b">
				<tab :line-width=2 v-model="tabIndex">
					<tab-item class="vux-center" :selected="tabName === tab" v-for="(tab,index) in tabs" :key="index">{{ tab }}</tab-item>
				</tab>
				<swiper height="360px" style="background-color: #fff;overflow: scroll" v-model="tabIndex" :show-dots="false">
					<swiper-item> 
						<div class="tab-swiper vux-center">
							<div class="userWallet-tabs-content">
								<cell v-if="(u_wallet.walletInfo.inInfos.length > 0 ? true : false )" v-for="inInfo in u_wallet.walletInfo.inInfos" :title="inInfo.title" :inline-desc='( inInfo.date + " — " + inInfo.from )'>
									<div slot="value">
							          <span style="color: #fd7c42">+{{ inInfo.money }}</span>
							        </div>
								</cell>
								<load-more v-if="(u_wallet.walletInfo.inInfos.length > 0 ? false : true )" :show-loading="false" tip="空空如也"></load-more>
							</div>
						</div>
					</swiper-item>
					<swiper-item> 
						<div class="tab-swiper vux-center">
							<div class="userWallet-tabs-content">
								<cell v-if="(u_wallet.walletInfo.outInfos.length > 0 ? true : false )" v-for="outInfo in u_wallet.walletInfo.outInfos" :title="outInfo.title" :inline-desc='( outInfo.date + " — " + outInfo.from )'>
									<div slot="value">
							          <span style="color: #fd7c42">-{{ outInfo.money }}</span>
							        </div>
								</cell>
								<load-more v-if="(u_wallet.walletInfo.outInfos.length > 0 ? false : true )" :show-loading="false" tip="空空如也"></load-more>
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
				tabName: '收入',
				tabs: [
					'收入',
					'支出'
				]
			}
		},
		computed: {
			...mapState ({
				u_id: state => state.user.u_id,
				u_wallet: state => state.user.u_wallet
			})
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.userWallet{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		.userWallet-h{
			width: 100%;
			height: auto;
			.userWallet-content{
				width: 100%;
				height: auto;
				padding: 30px 0;
				background-color: #656D89;
				.userWallet-content-item{
					width: 100%;
					padding: 20px 0;
					text-align: center;
					p{
						margin-bottom: 10px;
						font-size: 14px;
						color:  @bookworm-white;
					}
					span{
						font-size: 18px;
						color:  @theme-color;
					}
				}
			}
		}
		
	}
</style>