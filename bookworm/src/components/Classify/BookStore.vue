<template>
	<div class="bookStore">
		<sticky :offset="46">
			<search
				placeholder="搜索书名、作者、IBSN"
				top="46px"
				@result-click="resultClick"
				@on-change="getResult"
				:results="results"
				v-model="search_value"
				@on-focus="onFocus"
				@on-cancel="onCancel"
				@on-submit="onSubmit"
				ref="search">
			</search>
		</sticky>	
		<div class="classify-content">
			<div @click.stop="turnBookInfo(item.book_id)" v-for="item in bookStore" class="classify-item vux-1px-b">
				<flexbox align="flex-start">
					<flexbox-item :span="2/7">
						<img width="100" height="100" :src="item.book_banner" alt="">
					</flexbox-item>
					<flexbox-item class="classify-item-info" :span="5/7">
						<h2>{{ item.book_name }}</h2>
						<small>{{ item.book_author }}</small>
						<p><i class="icon-price"></i>{{ item.book_borrowPric }}</p>
						<span>剩余{{  item.book_inventory }}</span>
					</flexbox-item>
				</flexbox>
			</div>
		</div>
	</div>
</template>

<script>
	import { ViewBox, Flexbox, FlexboxItem, ButtonTab, ButtonTabItem, Swiper, SwiperItem, Tab, TabItem, Rater, XHeader, Popup, Group, Cell, XInput, XTextarea, Checker, CheckerItem, XButton, Search, Sticky } from 'vux'
	import { mapState,mapMutations } from 'vuex'
	import BookServer from '../../api/BookServer.js'
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
			Search,
			Sticky
		},
		computed: {
			...mapState({
				bookStore: state => state.classify.bookStore
			}),
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
			}
		},
		methods: {
			...mapMutations([
				'UPDATE_BOOKINFO',
				'UPDATE_CLASSIFY_BOOKSTORE'
			]),
			fetchData () {
				//异步请求数据
				let self = this;
				BookServer.GET_BOOKSTORE_ALLBOOKS(this).then((res) => {
					self.UPDATE_CLASSIFY_BOOKSTORE(res.body)
				})
				setTimeout(() => {
				   	self.$vux.loading.hide()
				}, 300)
			},
			turnBookInfo (book_id) {
				//获取相应书籍Id的信息 
				//并通过mutations更新数据源 this.UPDATE_BOOKINFO()
				let self = this;
				BookServer.GET_BOOKINFO(this, book_id).then((res) => { 
				   	self.UPDATE_BOOKINFO(res.data);
				});
				setTimeout(() => {
				   	self.$vux.loading.hide()
					self.$router.push('/BookInfo');
				}, 300)
			},
			resultClick (item) {
				//获取相应书籍Id的信息 
				//并通过mutations更新数据源 this.UPDATE_BOOKINFO()
				let self = this;
				this.$vux.loading.show({
				 text: '加载中...'
				})
				BookServer.GET_BOOKINFO(this, item.book_id).then((res) => { 
				   	self.UPDATE_BOOKINFO(res.data);
				});
				setTimeout(() => {
				   	self.$vux.loading.hide()
					self.$router.push('/BookInfo');
				}, 300)
			},
			onFocus () {
				this.results = [];
			},
			onSubmit () {
				let self = this;
				BookServer.SEARCH_BOOKSTORE(this, this.search_value).then((res) => {
					for(let i = 0; i < res.data.length; i++){
						self.results.push( {
							title: res.data[i].book_name,
							other: i,
							book_id: res.data[i].book_id
						})
					}
					console.log(self.results)
				});
			},
			onCancel () {

			},
			getResult () {

			},
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.classify-content{
		width: 100%;
		height: auto;
		.classify-item{
			width: 100%;
			height: auto;
			padding: 10px;
			box-sizing: border-box;
			background-color: @bookworm-white;
			.classify-item-info{
				h2{
					font-size: 16px;
					color: @bookworm-font-color;
					font-weight: normal;
					line-height: 24px;
				}
				small{
					font-size: 12px;
					line-height: 24px;
					color: #a8a8a8;
				}
				p{
					font-size: 16px;
					line-height: 24px;
					color: @theme-color;
				}
				span{
					font-size: 12px;
					line-height: 24px;
					color: #a8a8a8;
				}
			}
		}
	}
</style>