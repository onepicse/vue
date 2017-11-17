<template>
	<div class="friends">
		<mu-list>
			<mu-sub-header>今天</mu-sub-header>
			<mu-list-item title="这个周末一起吃饭么?">
				<mu-avatar src="http://img2.imgtn.bdimg.com/it/u=2959468746,3057091608&fm=23&gp=0.jpg" slot="leftAvatar"/>
				<span slot="describe">
					<span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
				</span>
				<mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
					<mu-menu-item title="回复" />
					<mu-menu-item title="标记" />
					<mu-menu-item title="删除" />
				</mu-icon-menu>
			</mu-list-item>
			<mu-divider inset/>
			<mu-list-item title="Alex Qin">
				<mu-avatar src="http://img.popoho.com/allimg/150510/1G021C16-12.jpg" slot="leftAvatar"/>
				<span slot="describe">
					<span style="color: rgba(0, 0, 0, .87)">看电影啊</span> <br/>
					我们去看电影，最近有部烂片上映，又有吐槽的了
				</span>
				<mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
					<mu-menu-item title="回复" />
					<mu-menu-item title="标记" />
					<mu-menu-item title="删除" />
				</mu-icon-menu>
			</mu-list-item>
			<mu-divider inset/>
			<mu-list-item title="LOL">
				<mu-avatar src="http://www.feizl.com/upload2007/2011_05/110504000111905.jpg" slot="leftAvatar"/>
				<span slot="describe">
					<span style="color: rgba(0, 0, 0, .87)">去打游戏啊</span><br/>
					周末一起 LOL
				</span>
				<mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
					<mu-menu-item title="回复" />
					<mu-menu-item title="标记" />
					<mu-menu-item title="删除" />
				</mu-icon-menu>
			</mu-list-item>
			<mu-divider inset/>
			<mu-list-item title="Myron Liu">
				<mu-avatar src="http://img4.imgtn.bdimg.com/it/u=2503782049,2229245081&fm=214&gp=0.jpg" slot="leftAvatar"/>
				<span slot="describe">
					<span style="color: rgba(0, 0, 0, .87)">哇去</span><br/> 实在编不下去，这就是个demo
				</span>
				<mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
					<mu-menu-item title="回复" />
					<mu-menu-item title="标记" />
					<mu-menu-item title="删除" />
				</mu-icon-menu>
			</mu-list-item>
		</mu-list>
	</div>
	
</template>
<script>
	export default {
		name: 'friends'
	}
</script>