<template>
	<div id="app">
		<div class="head">
			<img src="../../assets/img/back_gray_icon.png" @click="back"/>
			<p>新手指引</p>
		</div>
		<div class="title">
			<p class="big_title">如何获得更多的交友配对？</p>
			<p class="jieshao">1.发布拍摄质量好的图片。<br/>
2.发布更多的作品图片。<br/>
3.完善个人信息，让对方多了解您！<br/>
4.每天右划越多，交友配对几率越高！<br/>
5.积极参与赞、关注、赏、转、评论等操作，让更多的人关注到您！</p>
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
		font-weight: bold;
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
		width: 85%;
		font-size: 0.4rem;
		line-height: 0.6rem;
		font-weight: bold;
	
	}
	.jieshao{
		width: 85%;
		color:rgba(83,83,83,1);
		margin-top: 0.3rem;
		font-size: 0.3rem;
	}
	.small_title{
		margin-top: 0.5rem;
		font-size: 0.35rem;
		color:rgba(246,85,109,1);
	}
</style>