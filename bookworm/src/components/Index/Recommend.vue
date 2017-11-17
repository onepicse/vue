<template>
	<div class="recommend">
		<view-box   body-padding-top="46px" body-padding-bottom="0px">
			<x-header slot="header"  style="width:100%;position:absolute;left:0;top:0;z-index:100;" class="vux-1px-b" title="推荐书籍" :left-options="{showBack: true,backText: ''}" :right-options="{showMore: false}">
				<a slot="right"></a>
			</x-header>
			<div @click.stop="turnBookInfo(item.book_id)" v-for="(item,index) in recommend" :class="(index%2 ? 'vux-1px-l' : '' )" class="book-recommend-wrap">
				<img class="bookbanner" :src="item.book_banner" alt="">
			</div>
		</view-box>
	</div>
</template>

<script>
	import { ViewBox, XHeader, Flexbox, FlexboxItem } from 'vux'
	import { mapState, mapMutations } from 'vuex'
	import BookServer from '../../api/BookServer.js'
	export default{
		components: {
			ViewBox,
			XHeader,
			Flexbox,
			FlexboxItem
		},
		computed: {
			...mapState({
				direction: state => state.direction,
				recommend: state => state.indexGrid.recommend
			}),
			headerTransition () {
				return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
			}
		},
		methods: {
			...mapMutations([
				'UPDATE_BOOKINFO'
				]),
			turnBookInfo (book_id) {
				let self = this;
				this.$vux.loading.show({
					text: '加载中...'
				});
				BookServer.GET_BOOKINFO(this, book_id).then((res) => { 
					self.UPDATE_BOOKINFO(res.data);
				});
				setTimeout(() => {
					self.$vux.loading.hide()
					self.$router.push('/BookInfo');
				}, 300)
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.book-recommend-wrap{
		background-color: @bookworm-white;
		width: 50%;
		height: 180px;
		padding: 10px;
		float: left;
		box-sizing: border-box;
		position: relative;
		&:after{
			content: '';
			display: block;
			width: 64px;
			height: 64px;
			background-image: url(http://oncxzyx3a.bkt.clouddn.com/recommend-bookIcon.png);
			background-size: 64px 64px;
			position: absolute;
			right: 0;
			top: 0;
		}
		.bookbanner{
			display: block;
			width: 160px;
			height: 160px;
			margin: 0 auto;
		}
	}
</style>