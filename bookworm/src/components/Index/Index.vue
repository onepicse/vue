<template>
	<div class="index">
		<view-box body-padding-bottom="0px">
			<search 
				top="0"
				@result-click="resultClick"
				@on-change="getResult"
				:results="results"
				v-model="search_value"
				@on-focus="onFocus"
				@on-cancel="onCancel"
				@on-submit="onSubmit"
			ref="search">
			</search>
			<swiper>
				<swiper-item auto v-for="(item, index) in swipers" :key="index"><img :src="item"></swiper-item>
			</swiper>

			<div class="index-grid vux-1px-b">
				<grid :rows="4">
					<grid-item link="/Hot" label="最热书籍">
						<i slot="icon" class="index-grid-icon icon-hot"></i>
					</grid-item>
					<grid-item link="/Recommend" label="推荐书籍">
						<i slot="icon" class="index-grid-icon icon-commend"></i>
					</grid-item>
					<grid-item link="/Special" label="书籍专题">
						<i slot="icon" class="index-grid-icon icon-topic"></i>
					</grid-item>
					<grid-item link="/Literature" label="精品文学">
						<i slot="icon" class="index-grid-icon icon-prime"></i>
					</grid-item>
				</grid>
			</div>
			<sticky :offset="46">
				<tab :line-width=2 v-model="tabIndex">
					<tab-item class="vux-center" :selected="tabTitle === item.name" v-for="(item, index) in booktabs" @on-item-click="get_book_data (item.name, index)" :key="index">{{item.name}}</tab-item>
				</tab>
			</sticky>
			<div class="book-tabs">
				
				<!-- <div v-if="tabIndex === 0" class="index-tab-content">
					<div @click.stop="turnBookInfo(bookdata.book_id)" v-for="(bookdata,index) in booktabs[0].bookdatas" :class="(index%2 ? 'vux-1px-l' : '' )" class="book-wrap vux-1px-b">
						<img class="bookbanner" :src="bookdata.book_banner" alt="">
					</div>
					<load-more v-if="booktabIsLoading" tip="正在加载"></load-more>
				</div> -->
				<div v-if="tabIndex === 0" class="index-tab-content">
					<div @click.stop="turnBookInfo(bookdata.book_id)" v-for="(bookdata,index) in booktabs[0].bookdatas" :class="(index%2 ? 'vux-1px-l' : '' )" class="book-wrap vux-1px-b">
						<img class="bookbanner" :src="bookdata.book_banner" alt="">
					</div>
					<load-more v-if="booktabIsLoading" tip="正在加载"></load-more>
				</div>
				<div v-if="tabIndex === 1" class="index-tab-content">
					<div @click.stop="turnBookInfo(bookdata.book_id)" v-for="(bookdata,index) in booktabs[1].bookdatas" :class="(index%2 ? 'vux-1px-l' : '' )" class="book-wrap vux-1px-b">
						<img class="bookbanner" :src="bookdata.book_banner" alt="">
					</div>
					<load-more v-if="booktabIsLoading" tip="正在加载"></load-more>
				</div>
				<div v-if="tabIndex === 2" class="index-tab-content">
					<div @click.stop="turnBookInfo(bookdata.book_id)" v-for="(bookdata,index) in booktabs[2].bookdatas" :class="(index%2 ? 'vux-1px-l' : '' )" class="book-wrap vux-1px-b">
						<img class="bookbanner" :src="bookdata.book_banner" alt="">
					</div>
					<load-more v-if="booktabIsLoading" tip="正在加载"></load-more>
				</div>
				<div v-if="tabIndex === 3" class="index-tab-content">
					<div @click.stop="turnBookInfo(bookdata.book_id)" v-for="(bookdata,index) in booktabs[3].bookdatas" :class="(index%2 ? 'vux-1px-l' : '' )" class="book-wrap vux-1px-b">
						<img class="bookbanner" :src="bookdata.book_banner" alt="">
					</div>
					<load-more v-if="booktabIsLoading" tip="正在加载"></load-more>
				</div>
				<div v-if="tabIndex === 4" class="index-tab-content">
					<div @click.stop="turnBookInfo(bookdata.book_id)" v-for="(bookdata,index) in booktabs[4].bookdatas" :class="(index%2 ? 'vux-1px-l' : '' )" class="book-wrap vux-1px-b">
						<img class="bookbanner" :src="bookdata.book_banner" alt="">
					</div>
					<load-more v-if="booktabIsLoading" tip="正在加载"></load-more>
				</div>
				<div v-if="tabIndex === 5" class="index-tab-content">
					<div @click.stop="turnBookInfo(bookdata.book_id)" v-for="(bookdata,index) in booktabs[5].bookdatas" :class="(index%2 ? 'vux-1px-l' : '' )" class="book-wrap vux-1px-b">
						<img class="bookbanner" :src="bookdata.book_banner" alt="">
					</div>
					<load-more v-if="booktabIsLoading" tip="正在加载"></load-more>
				</div>
				<div v-if="tabIndex === 6" class="index-tab-content">
					<div @click.stop="turnBookInfo(bookdata.book_id)" v-for="(bookdata,index) in booktabs[6].bookdatas" :class="(index%2 ? 'vux-1px-l' : '' )" class="book-wrap vux-1px-b">
						<img class="bookbanner" :src="bookdata.book_banner" alt="">
					</div>
					<load-more v-if="booktabIsLoading" tip="正在加载"></load-more>
				</div>
			</div>
		</view-box>
	</div>
</template>

<script>
	import { ViewBox, Flexbox, FlexboxItem, Grid, GridItem, Search, Swiper, SwiperItem, Tab, TabItem, LoadMore, Sticky } from 'vux'
	import { mapState,	mapMutations } from 'vuex'
	import BookServer from '../../api/BookServer.js'
	import DataBase from '../../api/DataBase.js'
	export default {
		components: {
			ViewBox,
			Flexbox,
			FlexboxItem,
			Grid,
			GridItem,
			Search,
			Swiper,
			SwiperItem,
			Tab,
			TabItem,
			LoadMore,
			Sticky
		},
		created () {
			//组件创建完成后获取数据
			this.fetchData();
		},
		watch: {
			//如果路由有变化，则执行该方法
			'$route': 'fetchData'
		},
		data () {
			return{
				search_value: '',
				results: [],
				booktabIsLoading: false
			}
		},
		computed: {
			...mapState({
				tabTitle: state =>state.booktabsTitle,
				tabIndex: state => state.booktabsIndex,
				swipers: state => state.swipers,
				booktabs: state => state.booktabs
			})
		},
		methods: {
			...mapMutations([
				'UPDATE_BOOKINFO',
				'UPDATE_INDEX_TAB',
				'UPDATE_INDEX_BOOKTABSINDEX',
				'UPDATE_INDEX_BOOKTABSTITLE'
				]),
			fetchData () {
				//异步请求数据
				this.get_book_data('文学', 0);
				console.log('执行获取数据函数')
			},
			resultClick () {

			},
			onFocus () {

			},
			onSubmit () {

			},
			onCancel () {

			},
			getResult () {

			},
			get_book_data (booktab, index) {
				this.UPDATE_INDEX_BOOKTABSINDEX(index);
				this.UPDATE_INDEX_BOOKTABSTITLE(booktab);
				this.booktabIsLoading = true;
				let self = this;
				setTimeout(() => {
					//发起异步请求 进行获取相应数据
					DataBase.GET_INDEX_BASEDATA(this, index+1).then((res) => {
						self.UPDATE_INDEX_TAB({index: index, books: res.body});
					});
					self.booktabIsLoading = false;
				},1000)
				
			},
			turnBookInfo (book_id) {
				let self = this;
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
	.index{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}
	.vux-swiper-item img{
		display: block;
		width: 100%;
		height: 180px;
	}
	.index-grid{
		background-color: @bookworm-white;
		.index-grid-icon{
			font-size: 28px;
			// background-image: linear-gradient(to right, #f83600 0%, #fd7c42 100%);
		}
	}
	.vux-center:after{
		content: '.';
		display: block;
		font-size: 0;
		line-height: 0;
		visibility: hidden;
		clear: both;
	}

	.book-wrap{
		background-color: @bookworm-white;
		width: 50%;
		height: 180px;
		padding: 10px;
		float: left;
		box-sizing: border-box;
		.bookbanner{
			display: block;
			width: 160px;
			height: 160px;
			margin: 0 auto;
		}
	}
</style>