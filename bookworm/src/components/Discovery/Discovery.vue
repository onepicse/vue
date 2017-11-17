<template>
	<div class="discovery">
		<view-box body-padding-bottom="0px" body-padding-top="46px">
			<x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
				<div class="discovery-head">
					<flexbox>
						<flexbox-item></flexbox-item>
						<flexbox-item :span="5/8">
							<button-tab v-model="headIndex" style="margin-top: 6.5px;">
								<button-tab-item  @on-item-click="trunFind()"  selected>书评</button-tab-item>    
								<button-tab-item @on-item-click="trunTopic()">话题</button-tab-item>   
							</button-tab>	     					
						</flexbox-item>
						<flexbox-item>
							<div style="width: 100%;height: 100%">
								<i @click.stop="doActions()" style="font-size: 26px;margin-top: 8px;margin-right: 10px;" class="icon-postnote pull-right"></i>
							</div>
						</flexbox-item>
					</flexbox>
				</div>
			</x-header>
			
			<transition :name="'vux-' + (direction === 'forward' ? 'in' : 'out')">
				<router-view class="router-view"></router-view>
			</transition>
		</view-box>	
		<!-- 写书评 -->
		<div v-if="showBookReviewPopup" class="popup-wrap">
			<popup v-model="showBookReviewPopup" :show-mask="false" height="100%">
				<div style="width: 100%;height: 100%;overflow-x: hidden">
					<view-box body-padding-bottom="53px" body-padding-top="46px">
						<x-header slot="header" class="vue-1px-b" :left-options="{ showBack: false}" title="写书评" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
							<a @click.stop="closePopup()" slot="right"><i slot="icon" class="icon-close"></i></a>
						</x-header>
						<group title="标题">
							<x-input v-model="BookReviewFromData.title" placeholder="请输入标题"></x-input>
						</group>
						<group title="选取图书">
							<cell title="选取图书" :value="bookName" is-link @click.native="getUserBooks()"></cell>
						</group>
						<group title="评分">
							<cell>
								<rater v-model="BookReviewFromData.score" slot="value" active-color="#fd7c42"></rater>
							</cell>
						</group>
						<group title="书评内容">
							<x-textarea v-model="BookReviewFromData.content" :height="200" :max="200" placeholder="请输入书评内容"></x-textarea>
						</group>					
						<group>
							<x-button @click.native="postBookReview()" type="default">发表书评</x-button>
						</group>
					</view-box>	
				</div>	
			</popup>
		</div>
		<!-- 发话题 -->
		<div v-if="showTopicPopup" class="popup-wrap">
			<popup v-model="showTopicPopup" :show-mask="false" height="100%">
				<div style="width: 100%;height: 100%;overflow-x: hidden">
					<view-box body-padding-bottom="53px" body-padding-top="46px">
						<x-header slot="header" class="vue-1px-b" :left-options="{ showBack: false}" title="发话题" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
							<a @click.stop="closePopup()" slot="right"><i slot="icon" class="icon-close"></i></a>
						</x-header>
						<group title="标题">
							<x-input v-model="TopicFromData.title" placeholder="请输入标题"></x-input>
						</group>
						<group title="话题内容">
							<x-textarea v-model="TopicFromData.content" :height="200" :max="200" name="content" placeholder="请输入话题内容"></x-textarea>
						</group>
					</view-box>	
				</div>	
			</popup>
		</div>
		<!-- 选取图书 -->
		<popup v-model="chooseBookPopup" :show-mask="false" height="260px" class="">
			<div style="width: 100%;height: 100%;overflow-x: hidden">
				<view-box body-padding-bottom="0px" body-padding-top="46px">
					<x-header class="vux-1px-t vux-1px-b" slot="header" :left-options="{ showBack: false}" title="选取图书" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
						<a @click.stop="chooseBookPopup=false" slot="right"><i slot="icon" class="icon-close"></i></a>
					</x-header>
					<checker
					v-model="bookName"
					default-item-class="book-item"
					selected-item-class="book-item-selected"
					disabled-item-class="book-item-disabled">
					<checker-item v-for="item in bookItems" :value="item.book_name" @on-item-click="onItemClick(item)">
						<div class="bookInfo">
							<flexbox align="flex-start">
								<flexbox-item  :span="2/6">
									<img :src="item.book_banner" alt="">
								</flexbox-item>
								<flexbox-item  :span="4/6">
									<div class="book_review-item-book-info">
										<p>{{ item.book_name }}</p>
										<span>{{ item.book_author }}</span>
									</div>
								</flexbox-item>
							</flexbox>
						</div>
					</checker-item>
				</checker>
			</view-box>	
		</div>	
	</popup>
</div>
</template>

<script>
	import { ViewBox, Flexbox, FlexboxItem, ButtonTab, ButtonTabItem, Swiper, SwiperItem, Tab, TabItem, Rater, XHeader, Popup, Group, Cell, XInput, XTextarea, Checker, CheckerItem, XButton } from 'vux'
	import { mapState,mapMutations } from 'vuex'
	import userServer from '../../api/userServer.js'
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
			XButton
		},
		computed: {
			...mapState({
				user: state => state.user,
				direction: state => state.direction,
				hots: state => state.discovery.book_review.hots,
				bookItems: state => state.user.u_books
			}),
			headIndex () {
				if( this.$route.path === '/Discovery/' ){
					return 0;
				}
				if( this.$route.path === '/Discovery/topic'){
					return 1;
				}
			}
		},
		data () {
			return{
				showBookReviewPopup: false,
				showTopicPopup: false,
				chooseBookPopup: false,
				bookName: '',
				book: {},
				BookReviewFromData: {
					title: '',
					score: 0,
					comtent: ''
				},
				TopicFromData: {
					title: '',
					comtent: ''
				}
			}
		},
		methods: {
			...mapMutations([
					'UPDATE_DISCOVERY_NEWS',
					'UPDATE_USER_U_BOOKS'
				]),
			getUserBooks () {
				let self = this;
				// userServer.GET_USER_USEDBOOK(this, this.u_id).then((res) => {
				// 	setTimeout(() => {
				// 		self.$vux.loading.hide();
				// 		console.log(res.body)
				// 		// self.UPDATE_USER_U_BOOKS(res.body);
				// 	}, 500)
						
				// });
				this.chooseBookPopup = true;
			},
			trunTopic () {
				this.$router.push('/Discovery/topic');
			},
			trunFind () {
				this.$router.push('/Discovery/');
			},
			doActions () {
				if( this.$route.path === '/Discovery/' ){
					this.showBookReviewPopup = true;
					return;
				}
				if( this.$route.path === '/Discovery/topic'){
					this.showTopicPopup = true;
					return;
				}
				
			},
			closePopup () {
				if( this.$route.path === '/Discovery/' ){
					this.showBookReviewPopup = false;
					this.chooseBookPopup = false;
					return;
				}
				if( this.$route.path === '/Discovery/topic'){
					this.showTopicPopup = false;
					this.chooseBookPopup = false;
					return;
				}
			},
			onItemClick (bookItem) {
				this.book = bookItem;
				this.chooseBookPopup = false;
			},
			postBookReview () {
				let bookReview = {
					u_id: this.user.u_id,	
    				u_avarta: this.user.u_avarta,
    				u_name: this.user.u_name,
    				score: this.BookReviewFromData.score,
    				comment_content: this.BookReviewFromData.content,
    				comment_book: this.book,
    				date: this.getNowFormatDate(),
    				comments: [
    					
    				],
    				isLove: false,
    				lovenum: 0
				}
				//开启异步操作 像后端发送数据
				//未写 与后端交互代码
				this.UPDATE_DISCOVERY_NEWS(bookReview);

				//重置数据
				this.bookName = '';
				this.book = {};
				this.BookReviewFromData = {
					title: '',
					score: 0,
					comtent: ''
				};

				//关闭发书评的Popup
				this.showBookReviewPopup = false;

				//给用户展示成功提示
				this.$vux.toast.show({
				 	text: '发表成功',
				 	type: 'success',
				 	position: 'middle'
				})
			},
			getNowFormatDate() {
				//获取当前时间
			    let date = new Date();
			    let seperator1 = "-";
			    let seperator2 = ":";
			    let month = date.getMonth() + 1;
			    let strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " " + date.getHours() + seperator2 + date.getMinutes();
			    return currentdate;
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.discovery{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		.discovery-head{
			width: 100%;
			height: 46px;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 99;
			background-color: @bookworm-white;
		}
		.book-item{
			height: 100px;
			width: 100%;
			padding: 0 10px;
			margin-top: 10px;
			box-sizing: border-box;
			.bookInfo{
				width: 100%;
				height: auto;
				padding: 3px;
				box-sizing: border-box;
				border-radius: 3px;
				background-color: @bookworm-white;
				position: relative;
				&:after{
					content: '';
					display: block;
					position: absolute;
					bottom: 0;
					right: 0;
					width: 0;
				    height: 0;
				    width: 32px;
				    height: 32px;
				    background-image: url('http://oqcwstdev.bkt.clouddn.com/chose_ok.png');
				    background-size: 32px 32px;
				    background-position: center center;
				    visibility: hidden;
				}
				img{
					display: block;
					width: 100%;
					height: 100px;
				}
				.book_review-item-book-info{
					p{
						line-height: 50px;
					}
					span{
						color: #9e9e9e;
					}
				}
			}

		}
		.book-item-selected{
			.bookInfo{
				border: 2px solid @theme-color;
				&:after{
					visibility: visible;
				}
			}
		}
	}

</style>