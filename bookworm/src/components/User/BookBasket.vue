<template>
	<div class="bookBasket">
		<viewBox body-padding-bottom="57px">
			<sticky :offset="46">

				<tab  :line-width=2 v-model="tabIndex">

					<tab-item class="vux-center" @on-item-click="changeTabName(item)" :selected="tabName === item" v-for="(item,index) in tabs" :key="index">{{ item }}</tab-item>
				</tab>
			</sticky>
			<div v-show="tabIndex === 0" class="bookBasket-main">
				<swipeout>
					<checker
					v-model="bookStoreBookId"
					default-item-class="book-item"
					selected-item-class="book-item-selected"
					disabled-item-class="book-item-disabled" :max="2">
					<checker-item @on-item-click="updateIndex(index)"  :value="item" v-for="(item, index) in bookStore" :key="index">
						<swipeout-item transition-mode="follow">
							<div slot="right-menu">
								<swipeout-button @click.native="deleteBookStoreBook(index)" type="warn">
									移除
								</swipeout-button>
							</div>
							<div slot="content" class="bookBasket-item-content">
								<div class="bookInfo">
									<flexbox align="flex-start">
										<flexbox-item  :span="2/6">
											<img :src="item.book_banner" alt="">
										</flexbox-item>
										<flexbox-item  :span="4/6">
											<div class="book_review-item-book-info">
												<h3>{{ item.book_name }}</h3>
												<span>{{ item.book_author }}</span>
												<p><i class="icon-price"></i>{{ item.book_borrowPric }}</p>
											</div>
										</flexbox-item>
									</flexbox>
								</div>
							</div>
						</swipeout-item>
					</checker-item>
				</checker>
			</swipeout>	
		</div>
		<div v-show="tabIndex === 1" class="bookBasket-main">
			<swipeout>
				<checker
				v-model="usedBookId"
				default-item-class="book-item"
				selected-item-class="book-item-selected"
				disabled-item-class="book-item-disabled" :max="2">
				<checker-item :value="item" v-for="(item, index) in usedBook" :key="index">
					<swipeout-item transition-mode="follow">
						<div slot="right-menu">
							<swipeout-button @click.native="deleteUsedBook(index)" type="warn">
								移除
							</swipeout-button>
						</div>
						<div slot="content" class="bookBasket-item-content">
							<div class="bookInfo">
								<flexbox align="flex-start">
									<flexbox-item  :span="2/6">
										<img :src="item.book_banner" alt="">
									</flexbox-item>
									<flexbox-item  :span="4/6">
										<div class="book_review-item-book-info">
											<h3>{{ item.book_name }}</h3>
											<span>{{ item.book_author }}</span>
											<p><i class="icon-price"></i>{{ item.book_sellPric }}</p>
										</div>
									</flexbox-item>
								</flexbox>
							</div>
						</div>
					</swipeout-item>
				</checker-item>
			</checker>
		</swipeout>	
	</div>
	<tabbar slot="bottom">
		<div class="bookBasket-bottom">
			<flexbox>
				<flexbox-item :span="3/5">
					<p class="totalPrice" v-show="tabIndex === 0">总价：<i class="icon-price"></i>{{ bookStoreTotalPrice }}</p>
					<p class="totalPrice" v-show="tabIndex === 1">总价：<i class="icon-price"></i>{{ usedBookTotalPrice }}</p>
				</flexbox-item>
				<flexbox-item :span="2/5">
					<x-button style="margin-top: 2px;" type="default" @click.native="postOrder()">
						结算
					</x-button>
				</flexbox-item>
			</flexbox>
		</div>
	</tabbar>
</viewBox>
</div>
</template>

<script>
	import { ViewBox, Tabbar, Sticky, Flexbox, FlexboxItem, Tab, TabItem, Popup, Checker, CheckerItem, Swipeout, SwipeoutItem, SwipeoutButton, XButton  } from 'vux'
	import { mapState, mapMutations } from 'vuex'
	export default{
		components: {
			ViewBox,
			Flexbox,
			FlexboxItem,
			Tab,
			TabItem,
			Popup,
			Checker,
			CheckerItem,
			XButton,
			Tabbar,
			Sticky,
			Swipeout,
			SwipeoutItem,
			SwipeoutButton 
		},
		computed: {
			...mapState({
				u_id: state => state.user.u_id,
				bookStore: state => state.bookBasket.bookStore,
				usedBook: state => state.bookBasket.usedBook
			}),
			bookStoreTotalPrice () { 
				if(this.bookStoreBookId === null){
					return 0;
				}else{
					//多选
					// for(let i = 0;i < this.bookStoreBookId.length;i++){

					// }
					return this.bookStoreBookId.book_borrowPric;
				}				
			},
			usedBookTotalPrice () { 
				if(this.usedBookId === null){
					return 0;
				}else{
					//多选
					// for(let i = 0;i < this.usedBookId.length;i++){
					// all += parseFloat()
					// }
					return this.usedBookId.book_sellPric;
				}
			}
		},
		methods: {
			...mapMutations([
				'DELETE_BOOKBASKET_BOOKSTORE',
				'DELETE_BOOKBASKET_USEDBOOK',
				'UPDATE_POSTORDERINFO'
				]),
			updateIndex (index) {
				this.index = index
			},
			deleteBookStoreBook (index) {
				const _this = this
				this.$vux.confirm.show({
					title: '移除确认',
					content: '确定把该图书从书篮中移除么',
					onCancel () {

					},
					onConfirm () {
						_this.DELETE_BOOKBASKET_BOOKSTORE(index);
						_this.$vux.toast.show({
							text: '移除成功',
							type: 'success',
							position: 'middle'
						})
					}
				})
			},
			deleteUsedBook (index) {
				const _this = this
				this.$vux.confirm.show({
					title: '移除确认',
					content: '确定把该图书从书篮中移除么',
					onCancel () {

					},
					onConfirm () {
						_this.DELETE_BOOKBASKET_USEDBOOK(index);
						_this.$vux.toast.show({
							text: '移除成功',
							type: 'success',
							position: 'middle'
						})
					}
				})
			},
			postOrder () {
				let date = {
					borrowDate: this.getNowFormatDate(),
					returnDate: this.getReturnFormatDate(this.getNowFormatDate().split(' ')[1])
				}
				console.log(this.tabName)
				if(this.tabName === '图书馆'){
					//图书馆中图书 进行结算订单
					let info = {
						from: '图书馆',
						date: date,
						index: this.index,
						bookStore: this.bookStoreBookId,
						usedBook: {
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
					let self = this;
					this.$vux.loading.show({
						text: '加载中...'
					});
					setTimeout(() => {
						self.UPDATE_POSTORDERINFO(info);
						self.$vux.loading.hide()
						self.$router.push('/User/postOrder')
					}, 300)
				}
				if(this.tabName === '二手书'){
					//二手书中图书 进行结算订单
					let info = {
						from: '二手书',
						date: date,
						index: this.index,
						bookStore: {
					    	book_id: null,
							book_name: null,
							book_banner: null,
							book_author: null,
							book_borrowPric: null
				    	},
						usedBook: this.usedBookId
					}
					let self = this;
					this.$vux.loading.show({
						text: '加载中...'
					});
					setTimeout(() => {
						self.UPDATE_POSTORDERINFO(info);
						self.$vux.loading.hide()
						self.$router.push('/User/postOrder')
					}, 300)	
				}
				return;
			},
			changeTabName (item) {
				this.tabName = item;
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
			},
			getReturnFormatDate(end) {
				//获取当前时间
				let date = new Date();
				let seperator1 = "-";
				let seperator2 = ":";
				let month = date.getMonth() + 1;
				let strDate = date.getDate()+7;
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
				+ " " + end;
				return currentdate;
			}

		},
		data () {
			return{
				max: 2,
				tabIndex: 0,
				tabName: '图书馆',
				tabs: ['图书馆','二手书'],
				bookStoreBookId: null,
				usedBookId: null,
				index: null
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.bookBasket{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		.bookBasket-main{
			width: 100%;
			height: auto;
		}
		.bookBasket-bottom{
			width: 100%;
			height: 56px;
			padding: 0 10px;
			box-sizing: border-box;
			.totalPrice{
				line-height: 56px;
				font-size: 16px;
				color: @theme-color;
			}
		}
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
						line-height: 50px;
						font-weight: normal;
					}
					p{
						color: @theme-color;
					}
					span{
						color: #9e9e9e;
					}
				}
			}

		}
		.book-item{
			width: 100%;
			height: auto;
			border: 2px solid transparent;
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