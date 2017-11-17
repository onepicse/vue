<template>
	<div class="goOutPepole page">
		<div class="appBar white border">
			<div @click.stop="backUser" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				出行人管理
			</div>
			<div class="appBar-right-icon">
				<i class="icon icon-scan">
					<input type="file"  style="opacity: 0;" accept="audio/3gpp, video/3gpp">
				</i>
			</div>
		</div>
		<div class="goOutPepole-content">
			<div v-for="(travelPeople,index) in travelPeoples" class="goOutPepole-cell">
				<div class="goOutPepole-cell-item">
					<div class="cell-l">
						姓名
					</div>
					<div class="cell-r">
						{{ travelPeople.travelname }}
					</div>
				</div>
				<div class="goOutPepole-cell-item">
					<div class="cell-l">
						电话
					</div>
					<div class="cell-r">
						{{ travelPeople.traveltel }}
					</div>
				</div>
				<div class="goOutPepole-cell-item">
					<div class="cell-l">
						身份证
					</div>
					<div class="cell-r">
						{{ travelPeople.travelIdCard }}
					</div>
				</div>
				<div class="goOutPepole-cell-item">
					<div class="cell-l">
						操作
					</div>
					<div class="cell-r doMethods">
						<i @click.stop="delTravelPeople(travelPeople.travelid)" class="icon icon-red-del"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="page-bottom full">
			<button @click.stop="turnAddPepole" class="btn" type="button">新增出行人</button>
		</div>
		<transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
			<v-addPepole v-if="showAddPepole"></v-addPepole>
		</transition>
	</div>
</template>

<script>
	import addPepole from '@/components/user/addPepole'	
	export default{
		data() {
			return{
				travelPeoples: []
			}
		},
		computed: {
			showAddPepole: function () {
				return this.$store.state.showAddPepole;
			},
			travelPeoples: function () {
				return this.$store.state.travelPeoples;
			}
		},
		created () {
			let self = this;
			let uid = this.$store.state.user.userId;
			$.ajax({
				url: 'http://aishuwo.cn/nong/personServer.php',
				type: 'POST',
				dataType: 'json',
				data: {flag: 'search', uid: uid},
			})
			.done(function(response) {
				for(let i = 0;i < response.length;i++){
					let travelPeople = {};
					travelPeople.travelid = response[i].psid;
					travelPeople.travelname = response[i].psname;
					travelPeople.traveltel = response[i].psphone;
					travelPeople.travelIdCard = response[i].psidcard;
					self.travelPeoples.push(travelPeople);
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
			
			// //判断localStorage中是否存有searchHistory
			// if(localStorage.getItem("travelPeoples") == null){
			// 	//如果没有 就新建一个 并存入
			// 	localStorage.setItem("travelPeoples",JSON.stringify(this.$store.state.travelPeoples));

			// }else{
			// 	//如果有 就取出 并赋给this.historys
			// 	this.travelPeoples = JSON.parse(localStorage.getItem("travelPeoples"));
			// 	console.log(this.travelPeoples)
			// }
		},
		methods: {
			backUser () {
				this.$store.state.showGoOutPepole = false;
			},
			turnAddPepole () {
				this.$store.state.showAddPepole = true;
			},
			delTravelPeople(travelid){
				let self = this;
				let uid = this.$store.state.user.userId;
				$.ajax({
					url: 'http://aishuwo.cn/nong/personServer.php',
					type: 'POST',
					dataType: 'json',
					data: {flag: 'delete',uid: uid,psid: travelid},
				})
				.done(function(response) {
					//response = 1 成功
					//response = 0 失败
					// self.$store.state.showGoOutPepole = false;
					// self.$store.state.showGoOutPepole = true;
					if(response === 1){
						for(let i = 0;i < self.$store.state.travelPeoples.length;i++){
							console.log(self.$store.state.travelPeoples);
							if(self.$store.state.travelPeoples[i].travelid === travelid){
								self.$store.state.travelPeoples.splice(i,1);
								self.travelPeoples = self.$store.state.travelPeoples;
								break;
							}
						}
						self.$store.state.showOperationSuccess = true;
						setTimeout(() => {
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
			'v-addPepole' : addPepole
		}
	}
</script>

<style lang="less">
	.doMethods{
		text-align: right;
	}
	.icon-red-del{
		display: inline-block;
		vertical-align: top;
		background-image: url(./icon-red-del.png)
	}
</style>