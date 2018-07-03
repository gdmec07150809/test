<template>
	<div id="app">
		<div class="head">
			<img src="../../assets/img/zuo.png" @click="back"/>
			<p>新手指引</p>
		</div>
		<div class="title">
			<p class="big_title">没有作品，如何交友？</p>
			<p class="small_title">主动关注或者打赏对方！</p>
			<p class="jieshao">您可以在交友广场选择并点击喜欢的作品，进入详情后，关注作者或打赏作者，这样对方将可以查看到您关注或打赏的信息，如果对方选择关注回您，则交友配对成功！</p>
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
		margin-top: 0.5rem;
		font-size: 0.35rem;
		color:rgba(246,85,109,1);
	}
</style>