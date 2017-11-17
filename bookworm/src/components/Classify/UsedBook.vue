<template>
	<div class="usedBook">
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
			<div @click.stop="turnBookInfo(item.book_id)" v-for="item in usedBook" class="classify-item vux-1px-b">
				<flexbox align="flex-start">
					<flexbox-item :span="2/7">
						<img width="100" height="100" :src="item.book_banner" alt="">
					</flexbox-item>
					<flexbox-item class="classify-item-info" :span="5/7">
						<h2>{{ item.book_name }}</h2>
						<small>{{ item.book_author }}</small>
						<p><i class="icon-price"></i>{{ item.book_sellPric }}</p>
						<span>{{  item.book_depreciation }}</span>
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
				usedBook: state => state.classify.usedBook
			}),
		},
		created () {
			this.fetchData();
		},
		data () {
			return{
				search_value: '',
				results: [],
			}
		},
		methods: {
			...mapMutations([
				'UPDATE_USEDBOOKINFO',
				'UPDATE_CLASSIFY_USEDBOOK'
			]),
			fetchData () {
				//异步请求数据
				let self = this;
				BookServer.GET_USED_ALLBOOKS(this).then((res) => {
					self.UPDATE_CLASSIFY_USEDBOOK(res.body)
				})
				setTimeout(() => {
				   	self.$vux.loading.hide()
				}, 300)
			},
			turnBookInfo (book_id) {
				//获取相应书籍Id的信息 
				//并通过mutations更新数据源 this.UPDATE_BOOKINFO()
				let self = this;
				this.$vux.loading.show({
					text: '加载中...'
				})
				BookServer.GET_USEDBOOKINFO(this, book_id).then((res) => { 
				   	 self.UPDATE_USEDBOOKINFO(res.data[0]);
				})
				setTimeout(() => {
				   	self.$vux.loading.hide()
					self.$router.push('/UsedBookInfo');
				}, 300)
			},
			trunBookStore () {

			},
			trunUsedBook () {

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
		}
	}
</script>

<style lang="less">

</style>