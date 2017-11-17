<template>
	<div class="page eatPage">
		<div class="appBar white border">
			<div @click.stop="backIndex" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				热销商品
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<div class="page-banner">
			<img width="375" :src="eatPage" alt="">
		</div>
		<mu-row class="gopage-cell" gutter>
		    <mu-col v-for="eat in eats" width="50" tablet="30" desktop="25">
		    	<div class="eatPage-cell">
		    		<div class="eatPage-commodity">
				      	<img :src="eat.explodedView" alt="">
						<h2>{{ eat.name }}</h2>
						<span class="eatPage-commodity"><i class="icon icon-gopage-money"></i>{{ eat.price }}</span>
						<div class="eatPage-commodity-btn">
				      		<mu-raised-button @click.stop="turnCommodity(eat.gid,eat.sellerName)" label="立即购买" backgroundColor="#4caf50" />
						</div>
			      	</div>
		    	</div>
		    </mu-col>
		</mu-row>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-commodity v-if="showcommodity"></v-commodity>
		</transition>
	</div>	
</template>

<script>
	import eatPage from './eat-banner.jpg'
	import commodity from '@/components/commodity/commodity'
	export default{
		data () {
			return{
				eatPage : eatPage,
				eats : []
			}
		},
		created () {
			let self = this;
			this.$store.state.isLoading = true;
			$.ajax({
			    url: 'http://aishuwo.cn/nong/dataServer.php',
			   	type: 'POST',
			    dataType: 'json',
			    data: {flag: 'mostSale'},
			})
			.done(function(response) {
			    console.log(response);
			    for(let i = 0; i < response.length;i++){
			    	let eat = {};
			    	eat.sellerId = response[i].sellerId;
			    	eat.sellerName = response[i].sellerName;
			    	eat.gid = response[i].gid;
			    	eat.explodedView = response[i].explodedView;
			    	eat.name = response[i].name;
			    	eat.price = response[i].price;
			    	self.eats.push(eat);
			    }
			})
			.fail(function() {
			    console.log("error");
			})
			.always(function() {
			    self.$store.state.isLoading = false;
			});
		},
		computed: {
			showcommodity: function(){
				return this.$store.state.showcommodity;
			}
		},
		methods: {
			backIndex () {
				this.$store.state.showBottomNav = true;
				this.$store.state.showEatPage = false;
			},
			turnCommodity(gid,sellerName){
				let self = this;
				this.$store.state.isLoading = true;
				setTimeout(() => {
					$.ajax({
						url: 'http://aishuwo.cn/nong/getInfo.php',
			        	type: 'POST',
			        	dataType: 'json',
			        	data: {flag : 'goods', gid : gid},
					})
					.done(function(response) {
						console.log(response)
						let goods = {};
						goods.sellerName = sellerName;
						goods.beforeMoney = response[0].beforeMoney;
						goods.explodedView = response[0].explodedView;
						goods.info = response[0].info;
						goods.name = response[0].name;
						goods.price = response[0].price;
						goods.ruleNotice = response[0].ruleNotice;
						goods.sellOut = response[0].sellOut;
						goods.sellerId = response[0].sellerId;
						goods.userRule = response[0].userRule;
						self.$store.state.commodity = goods;
						console.log(self.$store.state.commodity)
						self.$store.state.showcommodity = true;
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						self.$store.state.isLoading = false;
					});
				},500)
			}
		},
		components: {
			'v-commodity' : commodity
		}
	}
</script>