<template>
	<div class="usedBookInfo">
		<view-box body-padding-bottom="0px" body-padding-top="46px" >
			<x-header slot="header"  style="width:100%;position:absolute;left:0;top:0;z-index:100;" class="vux-1px-b" :title="usedBookInfo.book_name" @on-click-more="openActionsmenus" :left-options="{showBack: true,backText: ''}" :right-options="{showMore: true}">
				<a slot="right"><i slot="icon"></i></a>
			</x-header>
			<div class="book-banner">
				<img :src="usedBookInfo.book_banner" alt="">
			</div>
			<div class="book-info-content" >
				<div class="book-info-content-t vux-1px-t">
					<h1>
						{{ usedBookInfo.book_name }}
						<span>新旧程度:{{ usedBookInfo.book_depreciation }}</span>
					</h1>
					<span class="book-author">
						{{ usedBookInfo.book_author }}
						<small>出版社:{{ usedBookInfo.book_publishingHouse }}</small>
					</span>
				</div>
				<div class="book-info-content-b vux-1px-t vux-1px-b">
					<h2><i slot="icon" class="icon-price"></i>{{ usedBookInfo.book_sellPric }}</h2>
				</div>
			</div>
			<flexbox>
				<flexbox-item></flexbox-item>
				<flexbox-item :span="3/5">
					<divider>卖家信息</divider>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
			<div class="seller-wrap">
				<flexbox>
					<flexbox-item :span="2/5">
						<img :src="usedBookInfo.u_avarta" alt="">
					</flexbox-item>
					<flexbox-item :span="3/5">
						<span>{{usedBookInfo.user_name}}</span>
						<p>联系电话:{{usedBookInfo.u_tell}}</p>
					</flexbox-item>
				</flexbox>
			</div>
		</view-box>
		<div v-transfer-dom>
			<actionsheet v-model="actionsmenusSwich" :menus="actionsmenus" @on-click-menu-borrwow="doBorrwow(bookInfo.book_id,bookInfo.book_inventory)" @on-click-menu-addBookCar="doAddBookCar(bookInfo.book_id)" show-cancel></actionsheet>
		</div>
	</div>
</template>

<script>
	import { XHeader, ViewBox, Flexbox, FlexboxItem, Swiper, SwiperItem, Tab, TabItem, Actionsheet, Alert, Previewer, Divider,TransferDomDirective as TransferDom } from 'vux'
	import { mapState, mapMutations } from 'vuex'
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
			Divider
		},
		data () {
			return{
				actionsmenusSwich: false,
				actionsmenus: {
					borrwow: '立即购买',
					addBookCar: '加入书篮'
				}
			}
		},
		computed: {
			...mapState({
				usedBookInfo: state => state.usedBookInfo
			}),
		},
		methods: {
			...mapMutations([
				
			]),
			doAddBookCar () {
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
	.usedBookInfo{
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
		.seller-wrap{
			width: 100%;
			height: auto;
			padding: 10px 15px;
			background-color: #fff;
			box-sizing: border-box;
			img{
				display: block;
				width: 100px;
				height: 100px;
				border-radius: 50%;
			}
			span{
				font-size: 18px;
				line-height: 32px;
			}
			p{
				font-size: 16px;
				line-height: 30px;
			}
		}
	}
</style>