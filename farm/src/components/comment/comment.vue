<template>
	<div class="comment">
		<div class="appBar white">
	      <div @click.stop="hidecomment" class="appBar-left-icon">
	          <i class="icon icon-back"></i>
	      </div>
	      <div class="appBar-center-text">
	        评价详情
	      </div>
	      <div class="appBar-right-icon"></div>
	    </div>
		<div v-for="comment in comments" class="comment-item">
			<div class="comment-item-head">
				<img :src="comment.avartaUrl" alt="">
				<span class="name"> {{ comment.uname }} </span>
				<span class="date"> {{ comment.date }} </span>
			</div>
			<div class="comment-item-body">
				<v-score :size="16" :fontSize="14" :score="comment.userScore"></v-score>
				<p> {{ comment.msg }} </p>
			</div>
		</div>
	</div>
</template>

<script>
	import score from '@/components/score/score'
	export default{
		data (){
			return{
				comments: []
			}
		},
		created: function(){
			this.comments = this.$store.state.comments;
		},
		methods: {
		    hidecomment: function(){
		    	console.log(1)
		      this.$store.state.showcomment = false;
		    }
  		},
  		components: {
  			'v-score' : score 
  		}
	}
</script>

<style lang='less'>
  .icon-back{
    background-image: url(./icon-back.png);
  }
</style>
