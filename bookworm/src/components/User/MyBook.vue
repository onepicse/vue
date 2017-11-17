<template>
	<div class="mybook">
		<swipeout>
			<swipeout-item v-for="(item, index) in u_books" transition-mode="follow">
				<div slot="right-menu">
					<swipeout-button @click.native="deleteMyBook(index)" type="warn">
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
								</div>
							</flexbox-item>
						</flexbox>
					</div>
				</div>
			</swipeout-item>
		</swipeout>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem, Swipeout, SwipeoutItem, SwipeoutButton, XButton  } from 'vux'
	import { mapState, mapMutations } from 'vuex'
	import userServer from '../../api/userServer.js'
	export default{
		components: {
			Flexbox,
			FlexboxItem,
			Swipeout,
			SwipeoutItem,
			SwipeoutButton,
			XButton 
		},
		created () {
			this.fetchData();
		},
		computed: {
			...mapState({
				u_id: state => state.user.u_id,
				u_books: state => state.user.u_books
			})
		},
		methods: {
			...mapMutations([
					'DELETE_USER_MYBOOK',
					'UPDATE_USER_U_BOOKS'
				]),
			fetchData () {
				let self = this;
				userServer.GET_USER_USEDBOOK(this, this.u_id).then((res) => {
					setTimeout(() => {
						self.$vux.loading.hide();
						self.UPDATE_USER_U_BOOKS(res.body);
					}, 500)
						
				});
				
				
			},
			deleteMyBook (index) {
				const _this = this
				this.$vux.confirm.show({
					title: '移除确认',
					content: '确定把该图书移除么',
					onCancel () {

					},
					onConfirm () {
						_this.DELETE_USER_MYBOOK(index);
						_this.$vux.toast.show({
							text: '移除成功',
							type: 'success',
							position: 'middle'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.mybook{
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
					p{
						color: @theme-color;
					}
					span{
						color: #9e9e9e;
					}
				}
			}
		}
	}
</style>