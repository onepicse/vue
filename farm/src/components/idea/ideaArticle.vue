<template>
	<div class="ideaArticle page">
		<div class="appBar white border">
			<div @click.stop="backIdea" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				{{ writeTrip.dtitle }}
			</div>
			<div class="appBar-right-icon">
				<mu-checkbox style="margin-top: 12px;margin-left: 10px;" uncheckIcon="favorite_border" checkedIcon="favorite"/>
			</div>
		</div>
		<div class="ideaArticle-content">
			<img v-for="img in writeTrip.contentImg" :src="img" alt="">
			<div v-html="writeTrip.contentText" class="txt"></div>
		</div>
		<div class="ideaArticle-comment">
			<div v-for="(comment,index) in comments" class="ideaArticle-comment-item">
				<div class="ideaArticle-commenter-info">
					<span class="floor">{{ index+1 }}楼</span>
					<mu-flexbox>
					    <mu-flexbox-item grow="1" class="ideaArticle-commenter-avatar">
					      <img :src="comment.avartaUrl" alt="">

					    </mu-flexbox-item>
					    <mu-flexbox-item grow="6" >
					      <h2>{{ comment.uname }}</h2>
					      <p>{{ comment.mdate }}</p>
					    </mu-flexbox-item>
					</mu-flexbox>
				</div>
				<div class="ideaArticle-comment-txt">
					<p>{{ comment.mcontent }}</p>
				</div>
			</div>
		</div>
		<div class="page-bottom full">
			<button @click.stop="openPopup" class="btn border ideaArticle-comment-btn" type="button">回复楼主</button>
		</div>
		<mu-popup position="bottom" popupClass="popup-bottom" :open="bottomPopup" @close="closePopup" fullWidth>
			<div class="reply">
				<mu-flexbox>
				    <mu-flexbox-item class="flex-demo">
				      <h2>回复楼主</h2>
				    </mu-flexbox-item>
				    <mu-flexbox-item class="flex-demo">
				     	<i @click.stop="save" class="icon icon-withe-save"></i>
				    </mu-flexbox-item>
				</mu-flexbox>    
			</div>
			<div class="reply-main">
				<mu-text-field hintText="不允许超过100个字符" :errorText="multiLineInputErrorText" v-model="mcontent" @textOverflow="handleMultiLineOverflow" multiLine :rows="3" :rowsMax="5" :maxLength="100" fullWidth/>
			</div>
			
	  	</mu-popup>
	</div>
</template>

<script>
	export default{
		data () {
			return {
				bottomPopup: false,
				mcontent: '',
				multiLineInputErrorText: ''
			}
		},
		props: {
			writeTrip: {
				type : Object
			},
			comments: {
				type : Array
			}
		},
		methods: {
			backIdea () {
				this.$store.state.showBottomNav = true;
				this.$store.state.showIdeaArticle = false;
			},
			handleMultiLineOverflow (isOverflow) {
		      this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
		    },
		    save () {
		    	let self = this;
		    	let did = this.writeTrip.did;
		    	let uid = this.$store.state.user.userId;
		    	$.ajax({
		    		url: 'http://aishuwo.cn/nong/diaryCommentServer.php',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {flag: 'submit',did: did,uid: uid,mcontent: this.mcontent},
		    	})
		    	.done(function(response) {
		    		if(response === 1){
						self.$store.state.showOperationSuccess = true;
						setTimeout(() => {
							self.$store.state.showOperationSuccess = false;
							self.bottomPopup = false;
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
		    	
		    },
			openPopup () {
				this.bottomPopup = true;
			},
			closePopup () {
				this.bottomPopup = false;
			}
		}
	}
</script>

<style lang="less">
	.reply{
		width: 100%;
		height: 45px;
		background-color: #4CAF50;
		h2{
			margin: 0;
			padding: 0 10px;
			font-size: 16px;
			line-height: 45px;
			font-weight: normal;
			color: #fff;
		}
	}
	.reply-main{
		width: 100%;
		height: auto;
		padding: 10px;
	}
	.popup-bottom{
		width: 100%;
		height: 200px;
	}
	.icon-favor{
		background-image: url(./icon-favor.png)
	}
	.icon-withe-save{
		float: right;
		background-image: url(./icon-save.png)
	}
</style>