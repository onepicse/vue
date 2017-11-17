<template>
	<div class="order">
		<view-box ref="viewBox">
			<tab slot="header"  :line-width=2 v-model="tabIndex">
				<tab-item class="vux-center" :selected="tabName === tab" v-for="(tab,index) in tabs" @on-item-click="changeContent(index)" :key="index">{{ tab }}</tab-item>
			</tab>
			<div v-show="tabIndex === 0" class="order-content">
				<card v-for="(item, index) in order_all" :header="{title: '来源:' + item.from}" :footer="{title:item.date.borrowDate + '&nbsp;&nbsp;&nbsp;——&nbsp;&nbsp;&nbsp;' + item.date.returnDate }">
					<div @click.stop="showOrderDialog(item)" slot="content" class="bookBasket-item-content">
						<div class="bookInfo">
							<flexbox align="flex-start">
								<flexbox-item  :span="2/6">
									<img :src="item.bookInfo.book_banner" alt="">
								</flexbox-item>
								<flexbox-item  :span="4/6">
									<div class="book_review-item-book-info">
										<h3>{{ item.bookInfo.book_name }}</h3>
										<span>{{ item.bookInfo.book_author }}</span>
										<p>订单号:{{ item.order_id }}</p>
									</div>
								</flexbox-item>
							</flexbox>
						</div>
					</div>
				</card>
			</div>
			<div v-show="tabIndex === 1" class="order-content">
				<flexbox>
					<flexbox-item></flexbox-item>
					<flexbox-item :span="3/5">
						<divider>空空如也</divider>
					</flexbox-item>
					<flexbox-item></flexbox-item>
				</flexbox>
			</div>
			<div v-show="tabIndex === 2" class="order-content">
				<card v-for="(item, index) in order_waitRefresh" :header="{title: '来源:' + item.from}" :footer="{title:'归还时间:' + item.date.returnDate}">
					<div slot="content" class="bookBasket-item-content">
						<div class="bookInfo">
							<flexbox align="flex-start">
								<flexbox-item  :span="2/6">
									<img :src="item.bookInfo.book_banner" alt="">
								</flexbox-item>
								<flexbox-item  :span="4/6">
									<div class="book_review-item-book-info">
										<h3>{{ item.bookInfo.book_name }}</h3>
										<span>{{ item.bookInfo.book_author }}</span>
										<p>订单号:{{ item.order_id }}</p>
									</div>
								</flexbox-item>
							</flexbox>
						</div>
					</div>
				</card>
			</div>
			<div v-show="tabIndex === 3" class="order-content">
				<flexbox>
					<flexbox-item></flexbox-item>
					<flexbox-item :span="3/5">
						<divider>空空如也</divider>
					</flexbox-item>
					<flexbox-item></flexbox-item>
				</flexbox>
			</div>
			<div v-show="tabIndex === 4" class="order-content">
				<flexbox>
					<flexbox-item></flexbox-item>
					<flexbox-item :span="3/5">
						<divider>空空如也</divider>
					</flexbox-item>
					<flexbox-item></flexbox-item>
				</flexbox>
			</div>
		</view-box>
		<div v-transfer-dom>
			<x-dialog v-model="showOrderInfo" class="order-dialog">
				<div class="orderTitle">
					<h2>订单详情</h2>
				</div>
				<div class="infoContent" style="height:240px;padding:5px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">
					<div v-if="orderInfo.from === '图书馆'" v-show="orderInfo.from === '图书馆'">
						<flexbox>
							<flexbox-item></flexbox-item>
							<flexbox-item :span="3/5">
								<divider>书籍信息</divider>
							</flexbox-item>
							<flexbox-item></flexbox-item>
						</flexbox>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">书籍名称</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.bookInfo.book_name}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">书籍作者</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.bookInfo.book_author}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<flexbox>
							<flexbox-item></flexbox-item>
							<flexbox-item :span="3/5">
								<divider>借阅信息</divider>
							</flexbox-item>
							<flexbox-item></flexbox-item>
						</flexbox>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">借阅名字</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{user.u_realName}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">借阅学号</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{user.u_studentId}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">借阅数量</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">1</span>
								</flexbox-item>
							</flexbox>
						</div>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">借阅价格</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.bookInfo.book_borrowPric}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">借阅时间</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.date.borrowDate}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">归还时间</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.date.returnDate}}</span>
								</flexbox-item>
							</flexbox>
						</div>
					</div>
					<div v-if="orderInfo.from === '二手书'" v-show="orderInfo.from === '二手书'">
						<flexbox>
							<flexbox-item></flexbox-item>
							<flexbox-item :span="3/5">
								<divider>书籍信息</divider>
							</flexbox-item>
							<flexbox-item></flexbox-item>
						</flexbox>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">书籍名称</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.bookInfo.book_name}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">书籍作者</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.bookInfo.book_author}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">新旧程度</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.bookInfo.book_depreciation}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<flexbox>
							<flexbox-item></flexbox-item>
							<flexbox-item :span="3/5">
								<divider>购买信息</divider>
							</flexbox-item>
							<flexbox-item></flexbox-item>
						</flexbox>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">购买数量</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">1</span>
								</flexbox-item>
							</flexbox>
						</div>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">购买价格</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.bookInfo.book_sellPric}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<flexbox>
							<flexbox-item></flexbox-item>
							<flexbox-item :span="3/5">
								<divider>卖家信息</divider>
							</flexbox-item>
							<flexbox-item></flexbox-item>
						</flexbox>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">卖家名字</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.bookInfo.seller.u_name}}</span>
								</flexbox-item>
							</flexbox>
						</div>
						<div class="order-info-item">
							<flexbox class=" vux-1px-b">
								<flexbox-item>
									<span class="title">卖家名字</span>
								</flexbox-item>
								<flexbox-item>
									<span class="content">{{orderInfo.bookInfo.seller.u_tell}}</span>
								</flexbox-item>
							</flexbox>
						</div>
					</div>
				</div>
				<div class="infoContent-qrcode">
					<qrcode value="https://baidu.com" type="img"></qrcode>
				</div>
				<div @click="showOrderInfo=false">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>
	</div>
</template>

<script>
	import { ViewBox, Flexbox, FlexboxItem, Swiper, SwiperItem, Tab, TabItem, Group, Cell, LoadMore, Card, XDialog, Qrcode, Divider,  TransferDomDirective as TransferDom } from 'vux'
	import { mapState, mapMutations } from 'vuex'
	export default{
		directives: {
			TransferDom
		},
		components: {
			ViewBox,
			Flexbox,
			FlexboxItem,
			Swiper,
			SwiperItem,
			Tab, 
			TabItem,
			Group,
			Cell,
			LoadMore,
			Card,
			XDialog,
			Qrcode,
			Divider
		},
		computed: {
			...mapState({
				user: state => state.user,
				order_all: state => state.order.order_all,
				order_waitPay: state => state.order.order_waitPay,
				order_waitRefresh: state => state.order.order_waitRefresh,
				order_waitComment: state => state.order.order_waitComment,
				order_refund: state => state.order.order_refund
			}),
			tabIndex () {
				let index = 0;
				let tabIndex = this.$route.params.tabIndex;
				let self = this;
				switch( tabIndex ){
					case 'allOrder':
					index = 0;
					self.tabName = '全部';
					break;
					case 'waitPay':
					index = 1;
					self.tabName = '待付款';
					break;
					case 'waitRefresh':
					index = 2;
					self.tabName = '待归还';
					break;
					case 'waitComment':
					index = 3;
					self.tabName = '待评价';
					break;
					case 'refund':
					index = 4;
					self.tabName = '退款单';
					break;			
				}
				return index;
			}
		},
		methods: {
			...mapMutations([

				]),
			changeContent (index) {
				switch( index ){
					case 0:
					this.$router.push('/User/userOrder/allOrder');
					break;
					case 1:
					this.$router.push('/User/userOrder/waitPay');
					break;
					case 2:
					this.$router.push('/User/userOrder/waitRefresh');
					break;
					case 3:
					this.$router.push('/User/userOrder/waitComment');
					break;
					case 4:
					this.$router.push('/User/userOrder/refund');
					break;
				}
			},
			showOrderDialog (item) {
				
				this.orderInfo = item;
				console.log(this.orderInfo)
				this.showOrderInfo = true;
			}
		},
		data () {
			return{
				showOrderInfo: false,
				tabName: '全部',
				tabs: ['全部','待付款','待归还','待评价','退款单'],
				orderInfo: {
					from: null,
					date: {
						borrowDate: null,
						returnDate: null,
					},
					bookInfo: {
						book_id: null,
						book_name: null,
						book_banner: null,
						book_author: null,
						book_sellPric: null,
						book_depreciation: null,
						seller: {
							u_id: null,
							u_name: null,
							u_tell: null
						}
					}
				}
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	@import '~vux/src/styles/close';
	.order{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		.bookBasket-item-content{
			height: 110px;
			width: 100%;
			padding: 0 10px;
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
					h3{
						line-height: 36px;
						font-weight: normal;
					}
					span{
						line-height: 30px;
						color: #9e9e9e;
					}
				}
			}
		}
		.order-dialog {
			.weui-dialog{
				border-radius: 8px;
				padding-bottom: 8px;
			}
			.dialog-title {
				line-height: 30px;
				color: #666;
			}			
			.vux-close {
				margin-top: 16px;
				margin-bottom: 16px;
			}
		}
	}
	.orderTitle{
		width: 100%;
		height: 18px;
		padding: 5px 0;
		h2{
			text-align: center;
			line-height: 18px;
			font-size: 18px;
			font-weight: 400;
			width: auto;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: #030303
		}
	}
	.order-info-item{
		width: 100%;
		height: 30px;
		padding: 0 15px;
		box-sizing: border-box;
		span{
			display: block;
			width: 100%;
			height: 100%;
			font-size: 12px;
			line-height: 30px;
			color: #666;
			&.content{
				text-align: right;
			}
		}
	}
	.infoContent-qrcode{
		width: 100%;
		height: 180px;
		padding: 10px 0;
		box-sizing: border-box;
	}
</style>