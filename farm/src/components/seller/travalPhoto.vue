<template>
	<div class="travalPhoto page">
		<div  class="appBar white border">
			<div @click.stop="backSeller" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				农友晒图
			</div>
			<div class="appBar-right-icon">
				
			</div>
		</div>
		<div class="content">
			<mu-grid-list class="gridlist-demo">
			    <mu-sub-header></mu-sub-header>
			    <mu-grid-tile v-for="tile,index in list" :key="'tile' + index" titlePosition="top" actionPosition="left" :rows="tile.featured ? 2 : 1" :cols="tile.featured ? 2 : 1">
			      <img :src="tile.image"/>
			      <span slot="title">{{tile.title}}</span>
			      <span slot="subTitle">by <b>{{tile.author}}</b></span>
			    </mu-grid-tile>
			  </mu-grid-list>
			<!-- <div class="no-data">
				<div class="line"></div>
				<div class="txt">空空如也</div>
				<div class="line"></div>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default{
		data () {
			return {
				list: [{
					image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493867954885&di=648318ace549f3f596899e980617dc0c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F14%2F11%2F39a58PICvGN_1024.jpg',
					title: '美丽的油菜花',
					author: '小成成'
				}, {
					image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493867954881&di=e9953c785729b8f5f3178c3bbe0e12c6&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1103%2F28%2Fc8%2F7136613_7136613_1301303250522.jpg',
					title: '快乐老小',
					author: '快乐出发'
				}, {
					image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493867954875&di=0db6fc916f0f3cdb7d57229e08bdc0f6&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2014%2F302%2F24%2F27WJDM2FZ575_1000x500.jpg',
					title: '美丽的她',
					author: '美人儿',
					featured: true
				}]
			}  
		},
		methods: {
			backSeller () {
				this.$store.state.showTravalPhoto = false;
			}
 		}
	}
</script>

<style lang="less">

</style>