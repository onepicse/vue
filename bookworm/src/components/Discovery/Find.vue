<template>
	<div class="find">
		<div class="book_review-banner">
			<img src="http://oqcwstdev.bkt.clouddn.com/book-banner.jpg" alt="">
		</div>
		<sticky :offset="46">
			<tab v-model="tabIndex" :line-width="2">
				<tab-item class="vux-center" :selected="tabName === tab" v-for="(tab,index) in tabs" @on-item-click="changeTabIndex(index,tab)" :key="index">{{ tab }}</tab-item>
			</tab>
		</sticky>
		<div class="find-main" v-show="tabIndex === 0">
			<!-- 最热 -->
			<div class="book_review-item">
				<flexbox v-if="hots.length > 0" v-for="item in hots"  align="flex-start"  class="vux-1px-b">
					<flexbox-item  :span="2/16">
						<div class="book_review-item-l">
							<img :src="item.u_avarta" alt="">
						</div>
					</flexbox-item>
					<flexbox-item :span="14/16">
						<div class="book_review-item-r">
							<div class="book_review-item-h">
								<h2>{{ item.u_name }} <rater v-model="item.score" :font-size="14" slot="value" active-color="#fd7c42" :margin="2" disabled></rater></h2>
							</div>
							<div  @click.stop="showBookReviewDetails(item)"  class="book_review-item-b">
								<p>{{ item.comment_content.substring(0,50) }}...</p>
								<div @click.stop="turnBookInfo(item.comment_book.book_id)" class="book_review-item-book">
									<flexbox align="flex-start">
										<flexbox-item  :span="2/6">
											<img :src="item.comment_book.book_banner" alt="">
										</flexbox-item>
										<flexbox-item  :span="4/6">
											<div class="book_review-item-book-info">
												<p>{{ item.comment_book.book_name }}</p>
												<span>{{ item.comment_book.book_author }}</span>
											</div>
										</flexbox-item>
									</flexbox>	
								</div>
							</div>
							<div class="book_review-item-f">
								<p>{{ item.date }} 
									<span>
										<i class="icon-comment grey" slot="icon"></i>
										{{ item.comments.length }}
									</span>
									<span :class="{ isLove: item.isLove }">
										<i :class="{ isLove: item.isLove }" class="icon-like" slot="icon"></i>
										{{ item.lovenum }}
									</span>
								</p>
							</div>
						</div>
					</flexbox-item>
				</flexbox>
				<load-more v-else :show-loading="false" tip="暂无数据"></load-more>
			</div>
		</div>
		<div class="find-main" v-show="tabIndex === 1">
			<!-- 最新 -->

			<div class="book_review-item">
				<flexbox v-if="newItems.length > 0" v-for="item in newItems" class="vue-1px-b" align="flex-start">
					<flexbox-item  :span="3/16">
						<div class="book_review-item-l">
							<img :src="item.u_avarta" alt="">
						</div>
					</flexbox-item>
					<flexbox-item :span="13/16">
						<div class="book_review-item-r">
							<div class="book_review-item-h">
								<h2>{{ item.u_name }} <rater v-model="item.score" :font-size="14" slot="value" active-color="#fd7c42" :margin="2" disabled></rater></h2>
							</div>
							<div @click.stop="showBookReviewDetails(item)" class="book_review-item-b">
								<p>{{ item.comment_content.substring(0,50) }}...</p>
								<div @click.stop="turnBookInfo(item.comment_book.book_id)" class="book_review-item-book">
									<flexbox align="flex-start">
										<flexbox-item  :span="2/6">
											<img :src="item.comment_book.book_banner" alt="">
										</flexbox-item>
										<flexbox-item  :span="4/6">
											<div class="book_review-item-book-info">
												<p>{{ item.comment_book.book_name }}</p>
												<span>{{ item.comment_book.book_author }}</span>
											</div>
										</flexbox-item>
									</flexbox>	
								</div>
							</div>
							<div class="book_review-item-f">
								<p>{{ item.date }} 
									<span>
										<i class="icon-comment grey" slot="icon"></i>
										{{ item.comments.length }}
									</span>
									<span :class="{ isLove: item.isLove }">
										<i :class="{ isLove: item.isLove }" class="icon-like" slot="icon"></i>
										{{ item.lovenum }}
									</span>
								</p>
							</div>
						</div>
					</flexbox-item>
				</flexbox>
				<load-more v-else :show-loading="false" tip="暂无数据"></load-more>
			</div>
		</div>
		<div class="find-main" v-show="tabIndex === 2">
			<!-- 关注 -->
		</div>
		<transition enter-active-class="animated slideInUp delay" leave-active-class="animated slideOutDown ">
			<BookReviewDetails :bookReviewDetails="bookReviewDetails" v-if="isShowBookReviewDetails"></BookReviewDetails>
		</transition>
	</div>

</template>

<script>
	import { ViewBox, Flexbox, FlexboxItem, ButtonTab, ButtonTabItem, Swiper, SwiperItem, Tab, TabItem, Rater, LoadMore, Sticky } from 'vux'
	import { mapState, mapMutations } from 'vuex'
	import BookServer from '../../api/BookServer.js'
	import BookReviewDetails from './BookReviewDetails'
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
			LoadMore,
			BookReviewDetails,
			Sticky
		},
		computed: {
			...mapState({
				direction: state => state.direction,
				isShowBookReviewDetails: state => state.discovery.book_review.isShowBookReviewDetails,
				tabName: state => state.discovery.book_review.tabName,
				tabIndex: state => state.discovery.book_review.activeIndex,
				hots: state => state.discovery.book_review.hots,
				newItems: state => state.discovery.book_review.news
			})
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
				showtabs: true,
				headIndex: 0,
				tabs: ['热门','最新','关注'],
				bookReviewDetails: {}
			}
		},
		methods: {
			...mapMutations([
				'UPDATE_BOOKINFO',
				'UPDATE_DISCOVERY_ACTIVEINDEX',
				'UPDATE_DISCOVERY_TABNAME',
				'UPDATE_DISCOVERY_ISSHOWBOOKREVIEWDETAILS'
				]),
			fetchData () {
				//异步请求数据
				console.log('执行获取数据函数')
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
			changeTabIndex (index,tab) {
				this.UPDATE_DISCOVERY_TABNAME(tab);
				this.UPDATE_DISCOVERY_ACTIVEINDEX(index);
			},
			showBookReviewDetails (data) {
				let self = this;
				this.bookReviewDetails = data;
				this.$vux.loading.show({
				 text: '加载中...'
				});
				setTimeout(() => {
					self.$vux.loading.hide()
					self.UPDATE_DISCOVERY_ISSHOWBOOKREVIEWDETAILS(true);
				}, 300);
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.find{
		width: 100%;
		.book_review-banner{
			width: 100%;
			height: 180px;
			overflow: hidden;
			&>img{
				display: block;
				width: 100%;
				height: 180px;
			}
		}
		.book_review-item{
			width: 100%;
			height: auto;
			padding: 10px 15px;
			box-sizing: border-box;
			margin-bottom: 10px;
			background-color: @bookworm-white;
			.book_review-item-l{
				&>img{
					display: block;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin-top: 5px;
				}
			}
			.book_review-item-r{
				.book_review-item-h{
					width: 100%;
					height: auto;
					h2{
						font-size: 16px;
						color: #afafaf;
						margin: 0;
						line-height: 30px;
						font-weight: normal;
					}
				}
				.book_review-item-b{
					p{
						font-size: 16px;
						line-height: 30px;
						margin:  5px 0;
						color: #4c4c4c;
					}
					.book_review-item-book{
						width: 100%;
						height: auto;
						padding: 3px;
						border: 1px solid #d6d5d5;
						box-sizing: border-box;
						border-radius: 3px;
						img{
							display: block;
							width: 100%;
							height: 80px;
						}
						.book_review-item-book-info{
							p{
								line-height: 35px;
							}
							span{
								color: #9e9e9e;
							}
						}
					}
				}
				.book_review-item-f{
					width: 100%;
					height: auto;
					padding: 5px 0;
					margin-top: 5px;
					p{
						color: #9e9e9e;
					}
					span{
						float: right;
						color: #9e9e9e;
						margin-left: 10px;
						&.isLove{
							color: @theme-color;
						}
					}
				}
			}
		}
	}
</style>