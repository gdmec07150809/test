<template>
	<div id="app">
		<div class="head">
			<img src="../../assets/img/zuo.png" @click="back"/>
			<p>新手指引</p>
		</div>
		<div style="height: 1rem;"></div>
		<div class="title">
			<p class="big_title">怎么上传作品、文章？</p>
			<p class="small_title">1.点击首页底部导航栏的发布"+"号</p>
			<img src="../../assets/img/guide_footer.png" class="one"/>
		</div>
		<div class="title">	
			<p class="small_title">2.选择需要发布的类型</p>
			<p class="jieshao">发布类型包括作品、闲情和文章的发布，其中文章分为热点文章和深度文章种类型、</p>
			<img src="../../assets/img/two.png" class="two" />
		</div>
		<div class="title">	
			<p class="small_title">3.按照发布要求填写所有资料后即可发布</p>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},

		methods: {
			back(){
				this.$router.push({
						path: '../user_guide'
					});
			
			}
			
		},	
		mounted() {
			

		}
	}
</script>

<style scoped="scoped">
	#app{
		width: 100%;
		overflow: hidden;
		position: relative;
		z-index: 300;
		background-color: #fff;
	}
	
	li {
		list-style-type: none;
	}
	
	* {
		font-family: "微软雅黑";
	}
	
	p,
	ul {
		margin: 0;
		padding: 0;
	}
	
	input,
	textarea {
		outline: none;
	}
		.head{
		width: 100%;
		height: 1rem;
		text-align: center;
		position: fixed;
		background-color: #fff;
		top: 0;
		border-bottom: solid 1px #F1F1F1;
	}
	.head p{
		
		font-size: 0.35rem;
		line-height: 1rem;
		margin-right: 0.6rem;
	}
	.head img{
		float: left;
		width:0.32rem;
		margin: 0.36rem 0.2rem 0;
		height: 0.32rem;
	}
	.title{
		
		width: 90%;
		margin: 0.6rem 0.3rem 0.2rem;
	}
	.big_title{
		font-size: 0.5rem;
		font-weight: bold;
		line-height: 0.2rem;
	}
	.jieshao{
		width: 100%;
		color:rgba(83,83,83,1);
		margin-top: 0.3rem;
		font-size: 0.3rem;
	}
	.small_title{
		margin-top: 0.5rem;
		font-size: 0.35rem;
		color:rgba(246,85,109,1);
	}
	.one{
		width: 100%;
		height: 1.2rem;
	}
	.two{
		margin-top: 0.3rem;
		width: 70%;
		height: 8rem;
	}
</style>