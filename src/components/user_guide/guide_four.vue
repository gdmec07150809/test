<template>
	<div id="app">
		<div class="head">
			<img src="../../assets/img/zuo.png" @click="back"/>
			<p>新手指引</p>
		</div>
		<div class="title">
			<p class="big_title">头条文章和深度文章的不同？</p>
			<p class="small_title">头条文章：</p>
			<p class="jieshao">侧重于艺术圈发生的热点事件、热点人物等新闻。</p>
			<p class="small_title">深度文章：</p>
			<p class="jieshao">侧重于专业性较强的艺术理论、评论等文章。</p>
			<p class="jieshao">请您在发布文章是依据上述标准选择正确的发布版块。</p>
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
		padding-top: 1rem;
		width: 100%;
		margin: 0.6rem 0.3rem 0.2rem;
	}
	.big_title{
		font-size: 0.5rem;
		font-weight: bold;
		line-height: 0.2rem;
	}
	.jieshao{
		width: 90%;
		color:rgba(83,83,83,1);
		font-size: 0.3rem;
		margin-bottom: 0.3rem;
	}
	.small_title{
		margin-top: 0.5rem;
		font-size: 0.35rem;
		color:rgba(246,85,109,1);
	}
</style>