<template>
	<div id="app">
		<div class="head">
			<img src="../../assets/img/zuo.png" @click="back"/>
			<p>新手指引</p>
		</div>
		<div class="title">
			<p class="big_title">如何进入人气榜？</p>
			<p class="small_title">人气榜是一个实时变动的作品排行榜！</p>
			<p class="jieshao">人气榜是通过一幅作品所获得的赞、关注、赏、转、评论等数据综合评估而来。<br/>
提示：很多的画廊机构及收藏家，都在密切的关注人气榜哦！</p>
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
		width: 85%;
		color:rgba(83,83,83,1);
		margin-top: 0.3rem;
		font-size: 0.3rem;
	}
	.small_title{
		margin-top: 0.8rem;
		font-size: 0.35rem;
		color:rgba(246,85,109,1);
	}
</style>