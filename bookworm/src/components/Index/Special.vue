<template>
	<div class="special">
		<view-box   body-padding-top="46px" body-padding-bottom="0px">
			<x-header slot="header"  style="width:100%;position:absolute;left:0;top:0;z-index:100;" class="vux-1px-b" title="书籍专辑" :left-options="{showBack: true,backText: ''}" :right-options="{showMore: false}">
				<a slot="right"></a>
			</x-header>
			<div style="margin: 10px;overflow: hidden;" v-for="item in list">
				<masker :opacity="0.23" style="border-radius: 2px;">
					<div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
					<div slot="content" class="m-title">
						{{item.title}}
						<br/>
						<span class="m-time">{{item.date}}</span>
					</div>
				</masker>
			</div>	
		</view-box>
	</div>
</template>

<script>
	import { ViewBox, XHeader, Flexbox, FlexboxItem , Masker} from 'vux'
	import { mapState } from 'vuex'
	export default{
		components: {
			ViewBox,
			XHeader,
			Flexbox,
			FlexboxItem,
			Masker
		},
		computed: {
			...mapState({
				direction: state => state.direction,
				list: state => state.indexGrid.special
			}),
			headerTransition () {
				return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
			}
		},
		data () {
			return{
				
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.m-img {
		padding-bottom: 33%;
		display: block;
		position: relative;
		max-width: 100%;
		background-size: cover;
		background-position: center center;
		cursor: pointer;
		border-radius: 2px;
	}
	.m-title {
		color: #fff;
		text-align: center;
		text-shadow: 0 0 2px rgba(0, 0, 0, .5);
		font-weight: 500;
		font-size: 16px;
		position: absolute;
		left: 0;
		right: 0;
		width: 100%;
		text-align: center;
		top: 50%;
		transform: translateY(-50%);
	}
	.m-time {
		font-size: 12px;
		padding-top: 4px;
		border-top: 1px solid #f0f0f0;
		display: inline-block;
		margin-top: 5px;
	}
</style>