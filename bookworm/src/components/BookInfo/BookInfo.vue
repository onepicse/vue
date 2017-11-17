<template>
	<div class="bookInfo">
		<view-box body-padding-bottom="0px" body-padding-top="46px" >
			<x-header slot="header"  style="width:100%;position:absolute;left:0;top:0;z-index:100;" class="vux-1px-b" :title="bookInfo.book_name" @on-click-more="openActionsmenus" :left-options="{showBack: true,backText: ''}" :right-options="{showMore: true}">
				<a slot="right"><i slot="icon"></i></a>
			</x-header>
			<div class="book-banner">
				<img :src="bookInfo.book_banner" alt="">
			</div>
			<div class="book-info-content" >
				<div class="book-info-content-t vux-1px-t">
					<h1>
						{{ bookInfo.book_name }}
						<span>库存:{{ bookInfo.book_inventory }}</span>
					</h1>
					<span class="book-author">
						{{ bookInfo.book_author }}
						<small>出版社:{{ bookInfo.book_publishingHouse }}</small>
					</span>
				</div>
				<div class="book-info-content-b vux-1px-t vux-1px-b">
					<h2><i slot="icon" class="icon-price"></i>{{ bookInfo.book_borrowPric }} <span>书本原价:{{ bookInfo.book_originalPric}}元</span></h2>
				</div>
				<div class="bookInfo-tabs vux-1px-t vux-1px-b">
					<tab :line-width=2 v-model="tabIndex">
						<tab-item class="vux-center" :selected="tabName === item" v-for="(item,index) in tabs" :key="index">{{ item }}</tab-item>
					</tab>
					<swiper style="padding: 20px 15px;background-color: #fff" v-model="tabIndex" :show-dots="false">
						<swiper-item> 
							<div class="tab-swiper vux-center">
								<div class="bookInfo-tabs-content">
									<p>
										{{ bookInfo.book_introduction }}
									</p>
								</div>
							</div>
						</swiper-item>
						<swiper-item> 
							<div class="tab-swiper vux-center">
								<div class="bookInfo-tabs-content">
									<ul>
										<li v-for="item in bookLists">{{ item }}</li>
									</ul>
								</div>	
							</div>
						</swiper-item>
					</swiper>
				</div>
				<div v-if="( bookInfo.comments.length > 0 ? true : false )" class="bookInfo-comments">
					<comment-item v-for="item in bookInfo.comments" :comment="item"></comment-item>
				</div>
			</div>
		</view-box>
		<div v-transfer-dom>
			<actionsheet v-model="actionsmenusSwich" :menus="actionsmenus" @on-click-menu-borrwow="doBorrwow(bookInfo.book_id,bookInfo.book_inventory)" @on-click-menu-addBookCar="doAddBookCar(bookInfo.book_id)" show-cancel></actionsheet>
		</div>
	</div>
</template>

<script>
	import { XHeader, ViewBox, Flexbox, FlexboxItem, Swiper, SwiperItem, Tab, TabItem, Actionsheet, Alert, Previewer, TransferDomDirective as TransferDom } from 'vux'
	import { mapState, mapMutations } from 'vuex'
	import Comment from '@/components/Comment/Comment'
	export default{
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			ViewBox,
			Flexbox,
			FlexboxItem,
			Swiper,
			SwiperItem,
			Tab,
			TabItem,
			Actionsheet,
			Alert,
			Previewer,
			'comment-item' : Comment
		},
		data () {
			return{
				actionsmenusSwich: false,
				tabIndex: 0,
				tabName: '简介',
				tabs: ['简介','目录'],
				actionsmenus: {
					borrwow: '立即借阅',
					addBookCar: '加入书篮'
				}
			}
		},
		computed: {
			...mapState({
				uid: state => state.u_id,
				bookInfo: state => state.bookInfo
			}),
			bookLists () {
				if(this.bookInfo.book_catalog === ''){	
					return "暂无数据"
				}else{
					return this.bookInfo.book_catalog.split('/')
				}
			}
		},
		methods: {
			...mapMutations([
				'ADD_BOOKBASKET_BOOKSTORE'
			]),
			doBorrwow (book_id, book_inventory) {
				//判断库存量是否为0
				if(book_inventory === 0){
					this.$vux.alert.show({
					  title: '失败',
					  content: '该书库存不足，看看其他的吧',
					  onShow () {
					    
					  },
					  onHide () {
					    
					  }
					})
					return;
				}
				//进行立即借阅的动作
				
			},
			doAddBookCar () {
				let book = {
					book_id: this.bookInfo.book_id,
					book_name: this.bookInfo.book_name,
					book_banner: this.bookInfo.book_banner,
					book_author: this.bookInfo.book_author,
					book_borrowPric: this.bookInfo.book_borrowPric
				};
				this.ADD_BOOKBASKET_BOOKSTORE(book);
				this.$vux.toast.show({
					text: '添加成功',
					type: 'success',
					position: 'middle'
				});
			},
			openActionsmenus () {
				this.actionsmenusSwich = true;
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.bookInfo{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		.book-banner{
			width: 100%;
			height: 350px;
			padding: 10px 0;
			background-color: @bookworm-white;
			&>img{
				display: block;
				width: 350px;
				height: 350px;
				margin: 0 auto;
			}
		}
		.book-info-content{
			width: 100%;
			height: auto;
			.book-info-content-t{
				width: 100%;
				height: auto;
				padding: 10px 15px;
				box-sizing: border-box;
				background-color: @bookworm-white;
				h1{
					font-size: 16px;
					font-weight: normal;
					line-height: 35px;
					color: @bookworm-font-color;
					span{
						float: right;
						font-size: 14px;
						line-height: 35px;
						color: #b0b0b0;
					}
				}
				.book-author{
					font-size: 14px;
					line-height: 20px;
					color: @theme-color;
					small{
						float: right;
						font-size: 14px;
						color: #b0b0b0;
					}
				} 
			}
			.book-info-content-b{
				width: 100%;
				height: auto;
				padding: 10px 15px;
				box-sizing: border-box;
				background-color: @bookworm-white;
				h2{
					font-size: 24px;
					color: @theme-color;
					.icon-price{
						font-size: 13px;
					}
					span{
						font-size: 14px;
						line-height: 35px;
						color: #b0b0b0;
						font-weight: normal;
						margin-left: 15px;
						text-decoration:line-through;
					}
				}
			}
			.book-info-content-f{
				width: 100%;
				height: auto;
				padding: 10px 0;
				background-color: @bookworm-white;
				.book-info-content-f-item{
					text-align: center;
					font-size: 14px;
					color: #b0b0b0;
				}
			}
			.bookInfo-tabs-content{
				height: 180px;
				overflow: auto;
				p{
					font-size: 14px;
					text-indent: 2em;
					line-height: 28px;
					color: #b0b0b0; 
				}
				ul {
					padding-left: 20px;
					list-style: disc;
					li{
						display: block;
						padding: 5px 0;
						font-size: 14px;
						color: #b0b0b0;
						list-style: disc;
					}
				}
			}
		}
	}
</style>