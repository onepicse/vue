<template>
	<div class="myself">
		<mu-list>
			<mu-list-item title="我的音乐">
				<mu-icon slot="left" value="send"/>
			</mu-list-item>
			<mu-list-item title="最近播放">
				<mu-icon slot="left" value="drafts"/>
			</mu-list-item>
			<mu-list-item title="我的歌单"  toggleNested>
				<mu-icon slot="left" value="inbox"/>
				<mu-list-item slot="nested" title="喜欢的歌曲">
					<mu-icon slot="left" value="grade"/>
				</mu-list-item>
				<mu-list-item slot="nested" title="喜欢的电台">
					<mu-icon slot="left" value="grade"/>
				</mu-list-item>
			</mu-list-item>
		</mu-list>
	</div>
		
</template>
<script>
	export default {
		name: 'myself',
		components: {
			
		}
	}
</script>