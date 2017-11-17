<template>
	<div class="travalArticle page">
		<div class="appBar white border">
			<div @click.stop="backSeller" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				农友游记
			</div>
			<div class="appBar-right-icon">
			</div>
		</div>
		<div class="content">
			<div @click.stop="turnWriteTrip" class="writeTrip-cell">
					<div class="writeTrip-cell-hd">
						在富强农家乐快乐的一天
					</div>
					<div class="writeTrip-cell-bd">
						<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493867847384&di=254187ec270b46efa57f1b3e9c076446&imgtype=0&src=http%3A%2F%2Fimg.qqbody.com%2Fuploads%2Fallimg%2F201410%2F201410082327365.jpg" alt="">
					</div>
					<div class="writeTrip-cell-ft">
						<div class="writeTrip-cell-ft-l">
							2017-3-4
						</div>
						<div class="writeTrip-cell-ft-r">
							<i class="icon icon-watch"></i>
							201
							<i class="icon icon-leftMessage"></i>
							1
						</div>	
					</div>
				</div>
			<!-- <div class="no-data">
				<div class="line"></div>
				<div class="txt">空空如也</div>
				<div class="line"></div>
			</div> -->
		</div>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-ideaArticle :writeTrip="writeTrip" :comments="comments" v-if="showIdeaArticle"></v-ideaArticle>
		</transition>
	</div>
</template>

<script>
	import ideaArticle from '@/components/idea/ideaArticle'
	export default{
		data () {
			return{
				writeTrip:{
					dtitle:"在富强农家乐快乐的一天",
					contentImg: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493867847387&di=e541834e71bce17a242a45e9894c0fb4&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1402%2F23%2Fc22%2F31494401_1393153405711.jpg","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493867847384&di=254187ec270b46efa57f1b3e9c076446&imgtype=0&src=http%3A%2F%2Fimg.qqbody.com%2Fuploads%2Fallimg%2F201410%2F201410082327365.jpg"],
					contentText:"在要出发的那天早晨，我带着愉快的心情到车站去等我的姨丈，当时我的头脑里就想着这三明到底是什么样子，到底美不美。真想一下子就飞到那里去，我和爸爸妈妈吃完早饭时，我心里都非常的着急，怎么姨丈的车还没有到啊，我就时不时的问我爸爸快可以走了没有。就这样从早上7点等到快到九点，我的人都快疯了一般。当我上车的时候，那种激动的心情，我真的无法形容，我是欣喜若狂-心情非常的畅通无比。",
					dbanner:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493867847387&di=e541834e71bce17a242a45e9894c0fb4&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1402%2F23%2Fc22%2F31494401_1393153405711.jpg"
				},
				comments: [
					{
						avartaUrl: "http://oncxzyx3a.bkt.clouddn.com/1493725748.jpg",
						did: "1",
						mcontent: "真的太棒棒啦",
						mdate: "2017-05-01",
						uname: "小成成"
					}
				]
			}
		},
		computed: {
			showIdeaArticle: function(){
				return this.$store.state.showIdeaArticle;
			}
		},
		methods: {
			backSeller () {
				this.$store.state.showTravalArticle = false;
			},
			turnWriteTrip () {
				this.$store.state.showIdeaArticle =true;
			}
 		},
 		components: {
 			'v-ideaArticle' : ideaArticle
 		}
	}
</script>

<style lang="less">
	
</style>