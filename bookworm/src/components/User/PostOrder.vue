<template>
	<div class="postOrder">
		<div v-show="postOrderInfo.from === '图书馆'" class="bookStore">
			<flexbox>
				<flexbox-item></flexbox-item>
				<flexbox-item :span="3/5">
					<divider>书籍信息</divider>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
			<group>
				<div class="bookBasket-item-content">
					<div class="bookInfo">
						<flexbox align="flex-start">
							<flexbox-item  :span="2/6">
								<img :src="postOrderInfo.bookStore.book_banner" alt="">
							</flexbox-item>
							<flexbox-item  :span="4/6">
								<div class="book_review-item-book-info">
									<h3>{{ postOrderInfo.bookStore.book_name }}</h3>
									<span>{{ postOrderInfo.bookStore.book_author }}</span>
								</div>
							</flexbox-item>
						</flexbox>
					</div>
				</div>
			</group>
			<flexbox>
				<flexbox-item></flexbox-item>
				<flexbox-item :span="3/5">
					<divider>借阅信息</divider>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
			<group>
				<cell title="借阅名字" :value="user.u_realName"></cell>
				<cell title="借阅学号" :value="user.u_studentId"></cell>
				<cell title="借阅数量" value="1"></cell>
				<cell title="借阅时间" :value="postOrderInfo.date.borrowDate"></cell>
				<cell title="归还时间" :value="postOrderInfo.date.returnDate"></cell>
			</group>
			<flexbox>
				<flexbox-item></flexbox-item>
				<flexbox-item :span="3/5">
					<divider>取书时间</divider>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
			<group>
				<datetime-range title="请选择" :start-date="startDate" :end-date="endDate" v-model="getBookValue"></datetime-range>
			</group>
			<group title="支付金额">
				<cell title="支付金额">
					<div slot="value">
			          <span style="color: #fd7c42"><i class="icon-price"></i>{{ postOrderInfo.bookStore.book_borrowPric }}</span>
			        </div>
				</cell>
			</group>
			<flexbox>
				<flexbox-item></flexbox-item>
				<flexbox-item :span="3/5">
					<divider>支付方式</divider>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
			<group>
				<checklist :label-position="labelPosition" required :options="payList" v-model="selectedType" :max="1"></checklist>
			</group>

			<flexbox style="margin-top: 0.77em; margin-bottom: 0.3em;">
				<flexbox-item></flexbox-item>
				<flexbox-item :span="4/5">
					<x-button @click.native="payNow()" type="default">立即支付</x-button> 
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
			<flexbox>
				<flexbox-item></flexbox-item>
				<flexbox-item :span="3/5">
					<divider>我的底线</divider>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>	
		</div>

		<div v-show="postOrderInfo.from === '二手书'" class="usedBook">
			<flexbox>
				<flexbox-item></flexbox-item>
				<flexbox-item :span="3/5">
					<divider>书籍信息</divider>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
			<group>
				<div class="bookBasket-item-content">
					<div class="bookInfo">
						<flexbox align="flex-start">
							<flexbox-item  :span="2/6">
								<img :src="postOrderInfo.usedBook.book_banner" alt="">
							</flexbox-item>
							<flexbox-item  :span="4/6">
								<div class="book_review-item-book-info">
									<h3>{{ postOrderInfo.usedBook.book_name }}</h3>
									<span>{{ postOrderInfo.usedBook.book_author }}</span>
									<p>{{ postOrderInfo.usedBook.book_depreciation }}</p>
								</div>
							</flexbox-item>
						</flexbox>
					</div>
				</div>
			</group>
			<flexbox>
				<flexbox-item></flexbox-item>
				<flexbox-item :span="3/5">
					<divider>购买信息</divider>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
			<group>
				<cell title="卖家名字" :value="postOrderInfo.usedBook.seller.u_name"></cell>
				<cell title="卖家电话" :value="postOrderInfo.usedBook.seller.u_tell"></cell>
			</group>
			<group title="支付金额">
				<cell title="支付金额">
					<div slot="value">
			          <span style="color: #fd7c42"><i class="icon-price"></i>{{ postOrderInfo.usedBook.book_sellPric }}</span>
			        </div>
				</cell>
			</group>
			<flexbox>
				<flexbox-item></flexbox-item>
				<flexbox-item :span="3/5">
					<divider>支付方式</divider>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
			<group>
				<checklist :label-position="labelPosition" required :options="payList" v-model="selectedType" :max="1"></checklist>
			</group>

			<flexbox style="margin-top: 0.77em; margin-bottom: 0.3em;">
				<flexbox-item></flexbox-item>
				<flexbox-item :span="4/5">
					<x-button  @click.native="payNow()" type="default">立即支付</x-button> 
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
			<flexbox>
				<flexbox-item></flexbox-item>
				<flexbox-item :span="3/5">
					<divider>我的底线</divider>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>	
		</div>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem, Group, Cell, Divider, XSwitch, Checklist, XButton, XInput, DatetimeRange } from 'vux'
	import { mapState, mapMutations } from 'vuex'
	export default{
		components: {
			Flexbox,
			FlexboxItem,
			Group,
			Cell,
			Divider,
			XSwitch,
			Checklist,
			XButton,
			XInput,
			DatetimeRange
		},
		computed: {
			...mapState({
				user: state => state.user,
				postOrderInfo: state => state.postOrderInfo
			}),
			getBookValue () {
				let arry = this.postOrderInfo.date.borrowDate.split(' ');
				let res = [arry[0]];
				for(let i = 0; i < arry[1].split(':').length; i++){
					res.push(arry[1].split(':')[i])
				}
				return res;
			},
			startDate () {
				return this.postOrderInfo.date.borrowDate.split(' ')[0]
			},
			endDate () {
				return this.postOrderInfo.date.returnDate.split(' ')[0]
			}
		},
		methods: {
			...mapMutations([
					'DELETE_BOOKBASKET_BOOKSTORE',
					'UPDATE_USER_U_WALLET_MONEY',
					'ADD_USER_U_WALLET_OUTINFOS',
					'UPDATE_ALL_OREDER',
					'UPDATE_WAIT_REFRESH',
					'DELETE_BOOKBASKET_USEDBOOK'
				]),
			payNow () {
				//判断当前选择的支付方式
				if(this.selectedType[0] === '1'){
					//微信支付

				}
				if(this.selectedType[0] === '2'){
					//余额支付
					let borrowPric = this.postOrderInfo.bookStore.book_borrowPric;
					if(this.user.u_wallet.remaining < borrowPric){
						//余额不足
						//给用户展示失败提示
						this.$vux.toast.show({
						 	text: '余额不足',
						 	type: 'cancel',
						 	position: 'middle'
						})
					}else{
						//执行提交订单请求
						//更新相应state里面的数据（购物车/订单/余额/支付流水）
						let self = this;
						this.$vux.loading.show({
						 	text: '支付中...'
						});
						//发起异步请求
						//获得唯一订单号与二维码
						



						//更新state余额
						this.UPDATE_USER_U_WALLET_MONEY(borrowPric);
						//更新流水
						let outInfo = {
							title: '购买《' + this.postOrderInfo.bookStore.book_name+'》',
		    				date: this.postOrderInfo.date.borrowDate,
		    				from: '订单交易成功',
		    				money: borrowPric
						}
						this.ADD_USER_U_WALLET_OUTINFOS(outInfo);
						//更新所有订单
						let order = {
							order_id: 20170609001,
							from: this.postOrderInfo.from,
							date: this.postOrderInfo.date,
							bookInfo: null
						}
						if(this.postOrderInfo.from === '图书馆'){
							order.bookInfo = this.postOrderInfo.bookStore;
							//更新state 图书馆的购物车
							this.DELETE_BOOKBASKET_BOOKSTORE(this.postOrderInfo.index)
						}
						if(this.postOrderInfo.from === '二手书'){
							order.bookInfo = this.postOrderInfo.usedBook;
							//更新归还订单
							self.UPDATE_WAIT_REFRESH(order);
							//更新state 二手书的购物车
							this.DELETE_BOOKBASKET_USEDBOOK (this.postOrderInfo.index)
						}
						this.UPDATE_ALL_OREDER(order);
						setTimeout(() => {
						   	self.$vux.loading.hide()
							self.$vux.toast.show({
								text: '支付成功',
								type: 'success',
								position: 'middle'
							});
							self.$router.push('/User/userOrder/allOrder')
						}, 1000)
					}
				}
				return;
			}
		},
		data () {
			return{
				getBookDate: [],
				labelPosition: '',
				selectedType: [],
				payList: [{key: '1', value: '微信支付'}, {key: '2', value: '余额支付'}]
			}
		}
	}
</script>

<style lang="less">
	.postOrder{
		width: 100%;
		height: auto;
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
					span{
						color: #9e9e9e;
					}
				}
			}

		}
	}
</style>