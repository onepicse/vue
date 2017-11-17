<template>
	<div class="page">
		<div class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<mu-tabs style="background: #fff;" :value="onTab" @change="handleTabChange">
			<mu-tab style="color: #4caf50" value="waitPayOrder" title="待付款"/>
			<mu-tab style="color: #4caf50" value="waitUse" title="待使用"/>
			<mu-tab style="color: #4caf50" value="waitComment" title="待评价"/>
			<mu-tab style="color: #4caf50" value="refund" title="退款单"/>
		</mu-tabs>
		<div v-if="onTab === 'waitPayOrder'">
			<div v-for="waitPayOrder in waitPayOrders" v-if="!waitPayOrderData" class="order-cell">
				<div class="order-cell-head">
					<h2>{{ waitPayOrder.sellerName }}</h2>
					<span>未付款</span>
				</div>
				<div class="order-cell-body">
					<div class="order-cell-body-img">
						<img :src="waitPayOrder.commodityImg" alt="">
					</div>
					<div class="order-cell-body-info">
						<span class="top">数量：{{ waitPayOrder.num }}</span>
						<span class="bottom">总价：&nbsp;<strong>￥{{ waitPayOrder.money }}</strong></span>
					</div>
				</div>
				<div class="order-cell-foot">
					<button type="button">支付</button>
				</div>
			</div>
			<div v-if="waitPayOrderData" class="no-data">
				<div class="line"></div>
				<div class="txt">暂无数据</div>
				<div class="line"></div>
			</div>
		</div>
		<div v-if="onTab === 'waitUse'">
			<!-- <div v-if="!waitUseData" v-for="waitUse in waitUses"  class="order-cell">
				<div class="order-cell-head">
					<h2>{{ waitUse.sellerName }}</h2>
					<span>未使用</span>
				</div>
				<div class="order-cell-body">
					<div class="order-cell-body-img">
						<img :src="waitUse.commodityImg" alt="">
					</div>
					<div class="order-cell-body-info">
						<span class="top">数量：{{ waitUse.num }}</span>
						<span class="bottom">代金券 &nbsp;<strong>￥{{ waitUse.money }}</strong></span>
					</div>
				</div>
				<div class="order-cell-foot">
					<button type="button">使用</button>
				</div>
			</div> -->
			<div v-if="waitUseData" class="no-data">
				<div class="line"></div>
				<div class="txt">暂无数据</div>
				<div class="line"></div>
			</div>
		</div>
		<div v-if="onTab === 'waitComment'">
			<div v-for="waitComment in waitComments" v-if="!waitPayOrderData" class="order-cell">
				<div class="order-cell-head">
					<h2>{{ waitComment.sellerName }}</h2>
					<span>待评价</span>
				</div>
				<div class="order-cell-body">
					<div class="order-cell-body-img">
						<img :src="waitComment.commodityImg" alt="">
					</div>
					<div class="order-cell-body-info">
						<span class="top">数量：{{ waitComment.num }}</span>
						<span class="bottom">总价：&nbsp;<strong>￥{{ waitComment.money }}</strong></span>
					</div>
				</div>
				<div class="order-cell-foot">
					<button @click.stop="turnOrderWriteComment(waitComment)" type="button">评价</button>
					<button @click.stop="turnOrderSharPhoto(waitComment)" type="button">晒图</button>
					<button @click.stop="turnOrderWriteArticle(waitComment)" type="button">写游记</button>
				</div>
			</div>
			<div v-if="waitCommentData" class="no-data">
				<div class="line"></div>
				<div class="txt">暂无数据</div>
				<div class="line"></div>
			</div>
		</div>
		<div v-if="onTab === 'refund'">
			<div v-if="refundData" class="no-data">
				<div class="line"></div>
				<div class="txt">暂无数据</div>
				<div class="line"></div>
			</div>
		</div>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-orderWriteComment :waitComment="waitComment" v-if="showOrderWriteComment"></v-orderWriteComment>
			<v-orderSharPhoto :waitComment="waitComment" v-if="showOrderSharPhoto"></v-orderSharPhoto>
			<v-orderWriteArticle :waitComment="waitComment" v-if="showOrderWriteArticle"></v-orderWriteArticle>
		</transition>
	</div>
</template>

<script>
	import orderWriteComment from '@/components/orders/orderWriteComment'
	import orderSharPhoto from '@/components/orders/orderSharPhoto'
	import orderWriteArticle from '@/components/orders/orderWriteArticle'
	export default{
		data () {
		    return {
		      onTab: 'waitPayOrder',
		      waitComment: {},
		    }
		},
		props: {
			activeTab: {
				type : String
			}
		},
		computed: {
			waitPayOrderData: function(){
				if(this.$store.state.order.waitPayOrder.length > 0){
					return false;
				}else{
					return true;
				}
			},
			waitPayOrders: function(){
				return this.$store.state.order.waitPayOrder;
			},
			waitUseData: function(){
				if(this.$store.state.order.waitUse.length > 0){
					return false;
				}else{
					return true;
				}
			},
			waitUses: function(){
				return this.$store.state.order.waitUse;
			},
			waitCommentData: function(){
				if(this.$store.state.order.waitComment.length > 0){
					return false;
				}else{
					return true;
				}
			},
			waitComments: function(){
				return this.$store.state.order.waitComment;
			},
			refundData: function(){
				if(this.$store.state.order.refund.length > 0){
					return false;
				}else{
					return true;
				}
			},
			refunds: function(){
				return this.$store.state.order.refund;
			},
			showOrderWriteComment: function () {
				return this.$store.state.showOrderWriteComment;
			},
			showOrderSharPhoto: function () {
				return this.$store.state.showOrderSharPhoto;
			},
			showOrderWriteArticle: function () {
				return this.$store.state.showOrderWriteArticle;
			},
		},
		created: function(){
			this.onTab = this.activeTab;
		},
		methods: {
			turnOrderWriteComment (waitComment) {
				this.waitComment = waitComment;
				this.$store.state.showOrderWriteComment = true;
			},
			turnOrderSharPhoto (waitComment) {
				this.waitComment = waitComment;
				this.$store.state.showOrderSharPhoto = true;
			},
			turnOrderWriteArticle (waitComment) {
				this.waitComment = waitComment;
				this.$store.state.showOrderWriteArticle = true;
			},
			handleTabChange (val) {
		      this.onTab = val
		    },
			backUser(){
				this.$store.state.showOrders = false;
			}
		},
		components: {
			'v-orderWriteComment' : orderWriteComment,
			'v-orderSharPhoto' : orderSharPhoto,
			'v-orderWriteArticle' : orderWriteArticle
		}
	}
</script>

<style lang="less">
	.mu-tab-link-highlight{
		background-color: #4caf50
	}
</style>