<template>
	<div class="bookReviewDetails">
		<view-box body-padding-bottom="50px" body-padding-top="46px">
			<x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" class="vux-1px-b vux-1px-t" title="书评详情" :left-options="{ showBack: false}">
				<a slot="right" @click="hideBookReviewDetails()"><i style="font-size: 16px;" slot="icon" class="icon-close"></i></a>
			</x-header>
			<div class="main">
				<div class="bookReviewDetails-t">
					<flexbox>
						<flexbox-item :span="1/5">
							<img class="avarta" :src="bookReviewDetails.u_avarta" alt="">
						</flexbox-item>
						<flexbox-item :span="4/5">
							<h2>{{ bookReviewDetails.u_name }} <rater v-model="bookReviewDetails.score" :font-size="14" slot="value" active-color="#fd7c42" :margin="2" disabled></rater></h2>
							<span class="date">写于&nbsp;&nbsp;{{ bookReviewDetails.date }}</span>
						</flexbox-item>
					</flexbox>
					<div class="bookReviewDetails-t-content">
						<p>{{ bookReviewDetails.comment_content }}</p>
						<div class="bookInfo">
							<flexbox align="flex-start">
								<flexbox-item  :span="2/6">
									<img :src="bookReviewDetails.comment_book.book_banner" alt="">
								</flexbox-item>
								<flexbox-item  :span="4/6">
									<div class="book_review-item-book-info">
										<p>{{ bookReviewDetails.comment_book.book_name }}</p>
										<span>{{ bookReviewDetails.comment_book.book_author }}</span>
									</div>
								</flexbox-item>
							</flexbox>
						</div>
					</div>
				</div>
				<div class="bookReviewDetails-b">
					<div v-for="item in bookReviewDetails.comments" class="comment-item">
						<flexbox align="flex-start">
							<flexbox-item :span="2/15">
								<img class="avarta" :src="item.comment_avarta" alt="">
							</flexbox-item>
							<flexbox-item :span="13/15">
								<h2>{{ item.comment_name }} <span class="pull-right">{{ item.comment_date }}</span></h2>
								<p>{{ item.comment_content }}</p>
							</flexbox-item>
						</flexbox>
					</div>
				</div>
			</div>
			<tabbar slot="bottom">
				<div class="actions vux-1px-t">
					<flexbox>
						<flexbox-item  class="text-center">
							<div @click.stop="openPopup()">
								<i class="icon-comment grey"></i>
								<span>{{ bookReviewDetails.comments.length }}</span>
							</div>
						</flexbox-item>
						<flexbox-item  class="text-center vux-1px-l">
							<div @click.stop="thumbUp()">
								<i :class="{ isLove: bookReviewDetails.isLove }" class="icon-like"></i>
								<span :class="{ isLove: bookReviewDetails.isLove }">{{ bookReviewDetails.lovenum }}</span>
							</div>
						</flexbox-item>
					</flexbox>
				</div>
			</tabbar>
		</view-box>
		<div v-if="showPopup" class="popup-wrap vux-1px-t">
			<popup v-model="showPopup" :show-mask="false">
				<div class="popupContent">
					<div class="popupContent-h">
						<span style="color: #9e9e9e" @click.stop="closePopup()" class="pull-left">关闭</span><span @click.stop="saveComment()" class="pull-right">保存</span>
					</div>
					<x-textarea v-model="commentValue" :max="140" :height="140" placeholder="回复评主" @on-focus="" @on-blur=""></x-textarea>
				</div>
			</popup>
		</div>
	</div>
</template>

<script>
	import { ViewBox, XHeader, Flexbox, FlexboxItem, Rater, LoadMore, Tabbar, TransferDom, Popup, XTextarea, Group } from 'vux'
	import { mapState, mapMutations } from 'vuex'
	export default {
		components: {
			XHeader,
			ViewBox,
			Flexbox,
			FlexboxItem,
			Rater,
			LoadMore,
			Tabbar,
			TransferDom,
			Popup,
			XTextarea,
			Group
		},
		data () {
			return{
				showPopup: false,
				commentValue: ''
			}
		},
		props: {
			bookReviewDetails: {
				type: Object
			}
		},
		computed: {
			...mapState({
				u_id: state => state.user.u_id,
				u_name: state => state.user.u_name,
				u_avarta: state => state.user.u_avarta
			}),
		},
		methods: {
			...mapMutations([
				'UPDATE_DISCOVERY_ISSHOWBOOKREVIEWDETAILS'
				]),
			hideBookReviewDetails () {
				this.UPDATE_DISCOVERY_ISSHOWBOOKREVIEWDETAILS(false);
			},
			thumbUp () {
				if( this.bookReviewDetails.isLove ){
					this.bookReviewDetails.isLove = false;
					this.bookReviewDetails.lovenum--;
				}else{
					this.bookReviewDetails.isLove = true;
					this.bookReviewDetails.lovenum++;
				}
			},
			openPopup () {
				this.showPopup = true;
			},
			closePopup () {
				this.showPopup = false;
			},
			saveComment () {
				if( this.commentValue === '' ){
					console.log('输入为空');
					this.$vux.toast.text('请输入文字', 'middle')
					return;
				}
				var date = this.getNowFormatDate();
				var comment = {
					comment_avarta: this.u_avarta,
			    	comment_name: this.u_name,
			    	comment_content: this.commentValue,
			    	comment_date: date
				};
				this.bookReviewDetails.comments.push(comment);
				this.commentValue = '';
				this.showPopup = false;
				this.$vux.toast.text('回复成功', 'middle')
			},
			getNowFormatDate() {
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
	.bookReviewDetails{
		position: absolute;
		top: 46px;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 500;
		background-color: #f3f2f0;
		overflow-x: hidden;
		.bookReviewDetails-t{
			width: 100%;
			height: auto;
			padding: 10px 15px;
			box-sizing: border-box;
			background-color: @bookworm-white;
			img.avarta{
				display: block;
				width: 60px;
				height: 60px;
				border-radius: 50%;
				margin: 0 auto;
			}
			h2{
				font-size: 16px;
				color: #afafaf;
				margin: 0;
				line-height: 30px;
				font-weight: normal;
			}
			span.date{
				font-size: 14px;
				color: #afafaf;
				margin: 0;
				line-height: 30px;
			}
			.bookReviewDetails-t-content{
				padding: 10px 0;
				p{
					font-size: 16px;
					line-height: 30px;
					color: #4c4c4c;
				}
			}
			.bookInfo{
				width: 100%;
				height: auto;
				margin: 5px 0;
				padding: 3px;
				border: 1px solid #d6d5d5;
				box-sizing: border-box;
				border-radius: 3px;
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
		.bookReviewDetails-b{
			width: 100%;
			height: auto;
			.comment-item{
				width: 100%;
				height: auto;
				padding: 10px 15px;
				background-color: @bookworm-white;
				box-sizing: border-box;
				img.avarta{
					display: block;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin: 0 auto;
				}
				h2{
					font-size: 16px;
					color: #afafaf;
					margin: 0;
					line-height: 30px;
					font-weight: normal;
					span{
						font-size: 14px;
					}
				}
				p{
					font-size: 16px;
					line-height: 30px;
					color: #4c4c4c;
					margin: 5px 0;
				}
			}
		}
		.actions{
			height: 50px;
			width: 100%;
			padding: 10px 0;
			background-color: @bookworm-white;
			box-sizing: border-box;
			text-align: center;
			i{
				font-size: 24px;
			}
			span{
				font-size: 16px;
				display: inline-block;
				vertical-align: top;
				color: #979797;
				&.isLove{
					color: #fd7c42;
				}
			}
		}
		.popup-wrap{
			width: 100%;
			height: 100%;
			.popupContent{
				width: 100%;
				height: 260px;
				box-sizing: border-box;
				background-color: @bookworm-white;
				.popupContent-h{
					width: 100%;
					height: 35px;
					padding: 0 15px;
					box-sizing: border-box;
					span{
						color: @theme-color;
						line-height: 35px;
					}
				}
			}
		}
		
	}
</style>