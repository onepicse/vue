<template>
	<div class="pagination clearfix">
		<a :class="{'disable': (currentPage === 1 ? true : false)}" @click.stop="pre" class="icon icon-left pull-left" href="javascript: void(0)">&lt;</a>
		<ul>
			<li :class="{'active': (item === currentPage ? true: false)}" v-for="item in items" @click.stop="turn(item)">{{ item }}</li>
		</ul>
		<a :class="{'disable': (currentPage === totalPage ? true : false)}" @click.stop="next" class="icon icon-right pull-left" href="javascript: void(0)">&gt;</a>
		<div class="">
			前往
			<input @keyup.enter="enter()" v-model.number="value" >
			页
		</div>

	</div>
</template>

<script>
	export default {
		props: {
			pageSize: {
				type: Number
			},
			currentPage: {
				type: Number
			},
			totalPage: {
				type: Number
			}
		},
		data () {
			return {
				value: this.currentPage
			}
		},
		watch: {
			currentPage (curVal) {
				this.value = curVal;
			}
		},
		computed: {
			items () {
				//ul根据当前页数的不同进行改变
				let items = new Array(this.pageSize);
				items[0] = 1;
				if (this.currentPage + 1 < this.pageSize - 1) {
					for (let i = 1;i < this.pageSize - 1;i++) {
						items[i] = i + 1;
					}
					items[this.pageSize-2] = '...';
					items[this.pageSize-1] = this.totalPage;
					return items
				}else if (this.currentPage + (this.pageSize + 1)/2 >= this.totalPage){
					items[1] = '...';
					var num = this.totalPage;
					for (let i = this.pageSize;i >= 2;i--) {
						items[i] = num;
						num--
					}
					return items
				}else{
					items[1] = '...';
					//奇数条件下
					var starNum = this.currentPage - parseInt((this.pageSize - 4)/2);
					for (let i = 2;i < this.pageSize - 2;i++) {
						items[i] = starNum;
						starNum++;
					}
					items[this.pageSize-2] = '...';
					items[this.pageSize-1] = this.totalPage;
					return items;
				}				
			}
		},
		methods: {
			turn (item) {
				//跳转到哪一页
				if (item === '...') {
					return
				}
				this.$emit('changeCurrentPage', item)
			},
			enter () {
				//输入框输入并进行判断输入类型
				if (typeof this.value === 'number') {
					if (0 < this.value &&  this.value <= this.totalPage){
						this.$emit('changeCurrentPage', this.value);
						return;
					}else{
						this.value = this.currentPage;
						return;
					}
				}else{
					this.value = this.currentPage;
					return;
				}
			},
			pre () {
				//上一页 
				if (this.currentPage === 1) {
					return;
				}
				this.$emit('changeCurrentPage', this.currentPage - 1)
			},
			next () {
				//下一页
				if (this.currentPage === this.totalPage) {
					return;
				}
				this.$emit('changeCurrentPage', this.currentPage + 1)
			}
		}
	}
</script>

<style lang="less">
	.pagination{
		width: 560px;
		height: 38px;
		margin: 0 auto;
		color: #292929;
		ul{
			margin: 0;
			padding: 0;
			width: auto;
			height: 100%;
			float: left;
			li{
				float: left;
				display: block;
				margin-right: 4px;
				width: 38px;
				height: 38px;
				font-size: 16px;
				line-height: 36px;
				color: #9e9e9f;
				text-align: center;
				border-radius: 5px;
				background-color: #eeeeee;
				border: 1px solid #e6e6e7;
				cursor: pointer;
				box-sizing: border-box;
				&.active,&:hover {
					background-color: #292929;
					border-color: #292929;
					color: #fff
				}
			}
		}
		.icon {
			text-decoration: none;
			display: block;
			margin-right: 4px;
			width: 38px;
			height: 38px;
			font-size: 16px;
			line-height: 36px;
			color: #9e9e9f;
			text-align: center;
			border-radius: 5px;
			background-color: #eeeeee;
			border: 1px solid #e6e6e7;
			box-sizing: border-box;
			&.active,&:hover {
				background-color: #292929;
				border-color: #292929;
				color: #fff
			}
			&.disable {
				&:hover {
					color: #9e9e9f;
					background-color: #eeeeee;
					border: 1px solid #e6e6e7;
				}
			}
		}
		input {
			display: inline-block;
			width: 38px;
			height: 38px;
			font-size: 14px;
			line-height: 36px;
			text-align: center;
			border: 1px solid #f1f1f2;
			outline: none;
		}
	}
</style>