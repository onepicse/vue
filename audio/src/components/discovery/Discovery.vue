<template>
	<div class="discovery">
			<v-search></v-search>
			<v-tabs :runk="runk"></v-tabs>
	</div>	
</template>

<script>
	import search from '@/components/search/search'
	import tabs from '@/components/tabs/tabs'
	export default{
		name: 'discovery',
		data() {
			return{
				runk: {}
			}		
		},
		created: function(){
			this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
				params: {
					g_tk: 5381,
					uin: 0,
					format: 'jsonp',
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'h5',
					needNewCode: 1,
					_: new Date().getTime()
				},
				jsonp: 'jsonpCallback'
			}).then(function (response) {
				this.runk = response.body.data.topList;
				console.log(this.runk)
			})
        },
		components: {
			'v-search': search,
			'v-tabs': tabs
		}
	}
</script>

<style>
	
</style>