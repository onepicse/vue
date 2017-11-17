<template>
	<div class="classify">
		<view-box body-padding-top="46px" body-padding-bottom="0px">
			<x-header :left-options="{ showBack: false}" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
				<div class="classify-head">
					<flexbox>
						<flexbox-item></flexbox-item>
						<flexbox-item :span="5/8">
							<button-tab v-model="headIndex" style="margin-top: 6.5px;">
								<button-tab-item  @on-item-click="trunBookStore()"  :selected="selectedBTN === '图书馆'">图书馆</button-tab-item>    
								<button-tab-item :selected="selectedBTN === '二手书'"  @on-item-click="trunUsedBook()">二手书</button-tab-item>   
							</button-tab>	     					
						</flexbox-item>
						<flexbox-item>
							
						</flexbox-item>
					</flexbox>
				</div>
				<a slot="right">筛选</a>
			</x-header>
			<transition :name="'vux-' + (direction === 'forward' ? 'in' : 'out')">
				<router-view class="router-view"></router-view>
			</transition>
		</view-box>
	</div>
</template>

<script>
	import { ViewBox, Flexbox, FlexboxItem, ButtonTab, ButtonTabItem, Swiper, SwiperItem, Tab, TabItem, Rater, XHeader, Popup, Group, Cell, XInput, XTextarea, Checker, CheckerItem, XButton, Search } from 'vux'
	import { mapState,mapMutations } from 'vuex'
	export default {
		components: {
			ViewBox,
			ButtonTab,
			ButtonTabItem,
			Flexbox,
			FlexboxItem,
			Swiper,
			SwiperItem,
			Tab,
			TabItem,
			Rater,
			XHeader,
			Popup,
			Group,
			Cell,
			XInput,
			XTextarea,
			Checker,
			CheckerItem,
			XButton,
			Search
		},
		computed: {
			...mapState({
				user: state => state.user,
				direction: state => state.direction,
				selectedBTN: state => state.classify.selectedBTN
			}),
			headIndex () {
				if( this.$route.path === '/Classify/' ){
					return 0;
				}
				if( this.$route.path === '/Classify/usedBook' ){
					return 1;
				}
			}
		},
		data () {
			return{
				
			}
		},
		methods: {
			...mapMutations([
					'UPDATE_CLASSIFY_SELECTEDBTN'
				]),
			trunBookStore () {
				let selectedBTN = '图书馆';
				this.UPDATE_CLASSIFY_SELECTEDBTN(selectedBTN);
				this.$router.push('/Classify/')
			},
			trunUsedBook () {
				let selectedBTN = '二手书';
				this.UPDATE_CLASSIFY_SELECTEDBTN(selectedBTN);
				this.$router.push('/Classify/usedBook')
			}
		}
	}
</script>

<style lang="less">
	.classify{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		.classify-head{
			width: 100%;
			height: 46px;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 99;
			background-color: @bookworm-white;
		}
	}
</style>