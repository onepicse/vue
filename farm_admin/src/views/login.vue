<style scoped>
	.layout{
		border: 1px solid #d7dde4;
		background: #fff;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
	}
	.layout-logo{
		width: 100px;
		height: 38px;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 11px;
		left: 20px;
	}
	.layout-header{
		height: 60px;
		background: #fff;
		box-shadow: 0 1px 1px rgba(0,0,0,.1);
	}
	.layout-copy{
		text-align: center;
		padding: 10px 0 20px;
		color: #fff;
		background-color: #4caf50;
	}
	.layout-ceiling{
		background: #4caf50;
		padding: 10px 0;
		overflow: hidden;
	}
	.layout-ceiling-main{
		float: right;
		margin-right: 15px;
		color: #fff;
	}
	.layout-ceiling-main a{
		color: #fff;
	}
	.login-content{
		width: 100%;
		height: 520px;
		position: relative;
	}
	.ivu-carousel-active>button{
		background-color: #4caf50
	}
</style>
<template>
	<div class="login">
		<div class="layout">
			<div class="layout-ceiling">
				<div class="layout-ceiling-main">
					<a href="#">注册登录</a> |
					<a href="#">帮助中心</a> |
					<a href="#">安全中心</a> |
					<a href="#">服务大厅</a>
				</div>
			</div>
			<div class="layout-header">
				<div class="layout-logo">
					<img src="../images/logo.png" height="38" width="80" alt="">
				</div>
			</div>
			<div class="login-content">
				<Carousel autoplay :height="carouselHeight" :autoplay-speed="carouselSpeed">
			        <Carousel-item>
			            <img src="../images/banner_1.jpg" height="768" width="1366" alt="">
			        </Carousel-item>
			        <Carousel-item>
			            <img src="../images/banner_2.jpg" height="768" width="1366" alt="">
			        </Carousel-item>
			        <Carousel-item>
			             <img src="../images/banner_3.jpg" height="768" width="1366" alt="">
			        </Carousel-item>
			    </Carousel>
			</div>
			<div class="layout-copy">
				2017 &copy; 农家
			</div>
		</div>
	</div>

</template>
<script>
	export default {
		data () {
			return{
				carouselSpeed : 3000,
				carouselHeight : 520 
			}
		}
	}
</script>