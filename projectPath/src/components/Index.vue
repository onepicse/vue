<template>
	<div class="index">
			<div class="header-search">
				<Search class="bw-search" auto-scroll-to-top :results="results" v-model="searchValue" @on-submit="search" @on-cancel="cancelSearch" ref="search"></Search>
			</div>
		<Swiper :list="swiperList" auto :index="swiperIndex"></Swiper>
		<grid :rows="4">
	      <grid-item :label="grid.label" v-for="(grid,index) in grids" :key="index">
	        <img slot="icon" :src="grid.iconSrc">
	      </grid-item>
	    </grid>
		<Group class="group-noMargin">
			<Cell style="color: #fd7b41" title="公告">
				<i slot="icon" style="font-size: 20px;color: #fd7b41" class="fa fa-bell"></i>
				<marquee>
		          <marquee-item v-for="(announcement,index) in announcements" :key="index">{{ announcement }}</marquee-item>
		        </marquee>
			</Cell>
		</Group>
	</div>
</template>

<script>
	import { Search, Swiper, Cell, Grid, GridItem, GroupTitle, Group, Marquee, MarqueeItem,XHeader } from 'vux'
	import icon_hot from '../assets/img/icon_hot.png'
	import icon_good from '../assets/img/icon_good.png'
	import icon_tag from '../assets/img/icon_tag.png'
	import icon_letter from '../assets/img/icon_letter.png'

	const baseList = [{
	    url: 'javascript:',
	    img: 'https://static.vux.li/demo/1.jpg',
	    title: '送你一朵fua'
	}, {
	    url: 'javascript:',
	    img: 'https://static.vux.li/demo/2.jpg',
	    title: '送你一辆车'
	}, {
	    url: 'javascript:',
	    img: 'https://static.vux.li/demo/3.jpg',
	    title: '送你一次旅行'
	}]

	const grids = [{
		label: "火热图书",
		iconSrc: icon_hot
	},
	{
		label: "推荐图书",
		iconSrc: icon_good
	},
	{
		label: "往期专题",
		iconSrc: icon_tag
	},
	{
		label: "精品文学",
		iconSrc: icon_letter
	}]

	const announcements = [
		"今日图书馆闭馆",
		"最新图书",
		"《爱读书，读好书》活动展开"
	]
	export default{
		name: 'Index',
		data () {
			return{
				searchValue: '',
				swiperList: baseList,
				swiperIndex: 0,
				results: [],
				grids: grids,
				announcements: announcements
			}
		},
		methods: {
			search () {
				for(let i = 0;i < 10;i++){
					let result = {};
					result.title = "result"+i;
					result.other = i;
					this.results.push(result);
				}
			},
			cancelSearch () {
				this.results = [];
			}
		},
		components: {
			Search,
			Swiper,
			Cell,
			Grid,
			GridItem,
			GroupTitle,
			Group,
			Marquee,
			MarqueeItem,
			'x-header' : XHeader 
		}
	}
</script>

<style lang="less" scoped>
	@import '../assets/css/base.less';
	.weui-search-bar__cancel-btn{
		color: @font-active-color !important;
	}
	.vux-icon-dot.active{
		background-color: @font-active-color !important;
	}
	.index{
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 54px;
		padding-top: 44px;
		.bw-search{
			position: absolute !important;
			top: 0;
		}
	}
	.weui-grids{
		background-color: @white;
	}
	.weui-grid__label{
		color: #111111 !important;
	}
	.header-search{
		// width: 
	}
	.vux-no-group-title{
		margin-top: 0 !important;
	}
</style>