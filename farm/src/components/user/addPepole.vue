<template>
	<div class="addPepole page">
		<div class="appBar white border">
			<div @click.stop="backGoOutPepole" class="appBar-left-icon">
				<i class="icon icon-back"></i>
			</div>
			<div class="appBar-center-text">
				新增出行人
			</div>
			<div @click.stop="addPepole" class="appBar-right-icon">
				<i class="icon icon-save"></i>
			</div>
		</div>
		<div class="addPepole-content">
			<div class="input-item">
				<mu-text-field v-model="name" label="姓名" hintText="请输入姓名" fullWidth />
			</div>
			<div class="input-item">
				<mu-text-field v-model="tel" label="电话" hintText="请输入电话" fullWidth />
			</div>
			<div class="input-item">
				<mu-text-field v-model="IdCard" label="身份证" hintText="请输入身份证" fullWidth />
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data () {
			return{
				name: '',
				tel: '',
				IdCard: ''
			}
		},
		methods: {
			backGoOutPepole () {
				this.$store.state.showAddPepole = false;
			},
			addPepole () {
				if( this.name === "" || this.tel === "" || this.IdCard === "" ){
					this.$store.state.showOperationError = true;
					setTimeout(() => {
						this.$store.state.showOperationError = false;
					},1000)
					return;
				}
				let travelPeople = {};
				travelPeople.travelname = this.name;
				travelPeople.traveltel = this.tel;
				travelPeople.travelIdCard = this.IdCard;
				this.$store.state.travelPeoples.push(travelPeople);

				let self = this;
				let uid = this.$store.state.user.userId;
				$.ajax({
					url: 'http://aishuwo.cn/nong/personServer.php',
					type: 'POST',
					dataType: 'json',
					data: {flag: 'add',uid: uid ,psname: self.name,psphone: self.tel,psidcard: self.IdCard},
				})
				.done(function(response) {
					//response = 1 成功
					//response = 0 失败
					if(response === 1){
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
				
				// //存入
				// //将搜索信息存入 localStorage
		  //   	localStorage.setItem("travelPeoples",JSON.stringify(this.$store.state.travelPeoples));

				// this.$store.state.showOperationSuccess = true;
				// 	setTimeout(() => {
				// 		this.$store.state.showOperationSuccess = false;
				// 	},1000)
				this.name = "";
				this.tel = "";
				this.IdCard = "";
			}
		}
	}
</script>

<style lang="less">
	.icon-save{
		background-image: url(./icon-save.png)
	}
</style>