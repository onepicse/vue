<template>
	<div class="orderWriteComment page">
		<div class="appBar white border">
			<div @click.stop="backSeller" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				写评价
			</div>
			<div class="appBar-right-icon">
			</div>
		</div>
		<div class="orderWriteComment-content">
			<div class="orderWriteComment-content-item">
				<div class="orderWriteComment-content-title">
					商家名
				</div>
				<mu-text-field :hintText="waitComment.sellerName" disabled fullWidth/><br/>
			</div>
			<div class="orderWriteComment-content-item">
				<div class="orderWriteComment-content-title">
					评分
				</div>
				<v-score :score="score" :size="16" :fontSize="14"></v-score>
				<mu-slider v-model="scoreData" />
			</div>
			<div class="orderWriteComment-content-item">
				<div class="orderWriteComment-content-title">
					评价
				</div>
				<mu-text-field v-model="commentTxt" hintText="不允许超过200个字符" :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" multiLine :rows="3" :rowsMax="8" :maxLength="200" fullWidth/>
			</div>
			<button @click.stop="postComment" class="btn" type="button">发表评论</button>	
		</div>
	</div>
</template>

<script>
	import score from '@/components/score/score'
	export default{
		data () {
			return{
				scoreData: 0,
				commentTxt: "",
				multiLineInputErrorText: ''
			}
		},
		props: {
			waitComment: {
				type : Object 
			}
		},
		computed: {
			score: function () {
				return parseFloat((this.scoreData/20).toFixed(2));
			}
		},
		methods: {
			backSeller () {
				this.$store.state.showOrderWriteComment = false;
			},
			handleMultiLineOverflow (isOverflow) {
		      this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
		    },
		    postComment () {
		    	let self = this;
				let uid = this.$store.state.user.userId;
				let sellerId = this.waitComment.sellerId;
				let oid = this.waitComment.oid;
				let userScore = this.score;
				let msg = this.commentTxt;
		    	$.ajax({
		    		url: 'http://aishuwo.cn/nong/commentServer.php',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {flag: 'submit', uid: uid,oid: oid,sellerId: sellerId,userScore: userScore,msg: msg},
		    	})
		    	.done(function(response) {
		    		//response = 1 成功
					//response = 0 失败
					if(response === 1){
						// console.log(self.$store.state.order.waitComment);
						// console.log(self.$store.state.order.waitComment.length)
						for(let i = 0; i < self.$store.state.order.waitComment.length;i++){
							// console.log(1)
							if(self.$store.state.order.waitComment[i].oid === oid){
								self.$store.state.order.waitComment.splice(i,1);
								break;
							}
						}
						self.$store.state.showOperationSuccess = true;
						setTimeout(() => {
							self.$store.state.showOrderWriteComment = false;
							self.$store.state.showOperationSuccess = false;
						},1000)
					}else{
						self.$store.state.showOperationError = true;
						setTimeout(() => {
							self.$store.state.showOperationError = false;
						},1000)
					}
		    	})
		    	.fail(function() {
		    		console.log("error");
		    	})
		    	.always(function() {
		    		console.log("complete");
		    	});
		    	
		    }
 		},
 		components: {
 			'v-score' : score
 		}
	}
</script>

<style lang="less">
	.mu-slider-fill {
	    background-color: #4CAF50;
	}
	.mu-slider-thumb {
	    background-color: #4CAF50;
	    color: #4CAF50;
	}
</style>