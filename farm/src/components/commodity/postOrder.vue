<template>
	<div class="postOrder page">
		<div class="appBar white border">
			<div @click.stop="backSeller" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				提交订单
			</div>
			<div class="appBar-right-icon"></div>
		</div>
		<div class="order-list">
			<div class="order-title">
				订单信息
			</div>
			<ul>
				<li class="order-list-item">
					<div class="list-title">
						商家
					</div>
					<div class="list-content">
						{{ orderInfo.sellerName }}
					</div>
				</li>
				<li class="order-list-item">
					<div class="list-title">
						商品名
					</div>
					<div class="list-content">
						{{ orderInfo.name }}
					</div>
				</li>
				<li class="order-list-item">
					<div class="list-title">
						单价
					</div>
					<div class="list-content">
						{{ orderInfo.price }}
					</div>
				</li>
				<li class="order-list-item">
					<div class="list-title">
						数量
					</div>
					<div class="list-content">
						<i @click.stop="minusNum" class="icon icon-minus"></i>
							{{ num }}
						<i @click.stop="addNum" class="icon icon-add"></i>
					</div>
				</li>
				<li class="order-list-item">
					<div class="list-title">
						小计
					</div>
					<div class="list-content">
						{{ balance }}
					</div>
				</li>
			</ul>
		</div>
		<div class="order-list">
			<div class="order-title">
				使用积分
			</div>
			<ul>
				<li class="order-list-item">
					<div class="list-title">
						使用积分
					</div>
					<div class="list-content">
						暂不支持使用积分
					</div>
				</li>
			</ul>
		</div>
		<div class="order-list">
			<div class="order-title">
				您绑定的手机
			</div>
			<ul>
				<li class="order-list-item">
					<div class="list-title">
						{{ phone }}
					</div>
					<div class="list-content">
						
					</div>
				</li>
			</ul>
		</div>
		<button @click.stop="postOrder" class="btn" type="button">
			立即支付
		</button>
		<mu-bottom-sheet :open="payMethod" @close="closePay">
			<mu-list @itemClick="closePay">
				<mu-sub-header>
					请选择支付方式
				</mu-sub-header>
				<mu-list-item title="支付宝"/>
			    <mu-list-item title="微信"/>
			</mu-list>
		</mu-bottom-sheet>
		<mu-dialog :open="dialog" title="" @close="closeDialog">
			请绑定手机号
			<mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
			<mu-flat-button slot="actions" primary @click="closeDialog" label="确定"/>
		</mu-dialog>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				num : 1,
				bindPhone: false,
				payMethod: false,
				dialog: false
			}
		},
		props: {
			orderInfo: {
				type : Object
			}
		},
		computed: {
			balance: function(){
				return (this.num*this.orderInfo.price).toFixed(2);
			},
			phone: function(){
				if(this.$store.state.user.tel == undefined){
					this.bindPhone = false;
					return "未绑定手机号";
				}else{
					let tel = '';
					for(let i = 0;i < 3;i++){
						tel += this.$store.state.user.tel[i]
					}
					tel += '****';
					for(let j = 7;j < 11;j++){
						tel += this.$store.state.user.tel[j]
					}
					this.bindPhone = true;
					return tel;
				}	
			}
		},
		methods: {
			closeDialog () {
				this.dialog = false;
			},
			closePay () {
				this.payMethod = false;
			},
			backSeller () {
				this.$store.state.showPostOrder = false;
			},
			postOrder () {
				if(this.bindPhone){
					//已绑定
					this.payMethod = true;
				}else{
					//未绑定
					this.dialog = true;
				}
			},
			addNum () {
				this.num++
			},
			minusNum () {
				if(this.num > 1){
					this.num--
				}
			}
		}
	}
</script>

<style lang="less">
	.icon-add{
		background-image: url(./icon-add.png)
	}
	.icon-minus{
		background-image: url(./icon-minus.png)
	}
</style>