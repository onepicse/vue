<template>
	<div class="comment-item vux-1px-t vux-1px-b">
		<flexbox align="flex-start" class="comment-item-content">
		        <flexbox-item :span="2/10">
					<div class="comment-item-content-avarta">
						<img :src="comment.comment_avarta" alt="">
					</div>
		        </flexbox-item>
		        <flexbox-item :span="7/10">
					<div class="comment-item-content-t">
						<h3>{{ comment.comment_name }}
							<rater v-model="score" :font-size="14" slot="value" active-color="#fd7c42" disabled></rater>
						</h3>
					</div>
					<div class="comment-item-content-b">
						<p>{{ comment.comment_content }}</p>
					</div>
					<div class="comment-item-content-f">
						<p>
							{{ comment.comment_date }}
							<span class="i-group">
								<i slot="icon" class="icon-like"></i>
								{{ comment.comment_likenum }}
							</span>
						</p>
					</div>
		        </flexbox-item>
		</flexbox>        
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem, Rater } from 'vux'
	export default{
		props: {
			comment: {
				type: Object
			}
		},
		computed: {
			score () {
				return parseFloat(this.comment.comment_score)
			}
		},
		methods: {

		},
		components: {
			Flexbox,
			FlexboxItem,
			Rater
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '../../assets/css/theme.less';
	.comment-item{
		width: 100%;
		height: auto;
		margin-top: 10px;
		padding: 10px 0;
		background-color: @bookworm-white;
		.comment-item-content-avarta{
			width: 100%;
			height: auto;
			&>img{
				display: block;
				width: 60px;
				height: 60px;
				border-radius: 50%;
				margin: 0 auto;
			}
		}
		.comment-item-content-t{
			height: auto;
			width: 100%;
			h3{
				font-size: 15px;
				line-height: 28px;
				font-weight: normal;
				color: #a8a8a8;
			}
		}
		.comment-item-content-b{
			height: auto;
			width: 100%;
			padding: 5px 0;
			p{
				// height: 100px;
				font-size: 14px;
				line-height: 28px;
				color: #7c7371;
				overflow: hidden;
				// white-space: nowrap;
				// text-overflow: ellipsis;
				// word-wrap: break-word;
			}
		}
		.comment-item-content-f{
			height: auto;
			width: 100%;
			p{
				font-size: 14px;
				line-height: 28px;
				color: #b0b0b0;
				span.i-group{
					float: right;
				}
			}
		}
	}
</style>