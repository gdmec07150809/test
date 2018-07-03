<template>
	<div id="app">
		<div class="head">
			<img src="../../assets/img/zuo.png" @click="back"/>
			<p>新手指引</p>
		</div>
		<div class="title">
			<p class="big_title">觅艺怎么玩？</p>
			<p class="jieshao">未上传自己作品前，右划仅表示为自己喜欢的作品点赞！<br/>
				系统无法为您实行交友配对！<br/>
				但您依然可以通过右划为自己喜欢的作品点赞并选出人气最高的作品！</p>
		</div>
		<div class="content">
			<p class="content_title">喜欢的作品右划！</p>
			<p class="content_p">
				看到喜欢的作品可以向右划照片或者点赞
			</p>
			<img src="../../assets/img/icon_guide_like.png" />
		</div>
		<div class="content">
			<p class="content_title">不感兴趣的作品左划忽略！</p>
			<p class="content_p">
				对作品没兴趣可以向左滑照片跳过或者点击忽略，忽略后的作品将不会再次出现
			</p>
			<img src="../../assets/img/icon_guide_unlike.png" />
		</div>
		<div class="content">
			<p class="content_title">互相右滑/点赞对方的作品，则配对成功</p>
			<p class="content_hui">
				双方互滑/互赞表明大家欣赏彼此的作品，系统将自动帮双方配对成为好友，然后可以正式聊天
			</p>
			<p class="content_hui">
				发布多个作品将能大大增加您的曝光机会，获得更多匹配成功的可能性
			</p>
			<img src="../../assets/img/icon_guide_match.png" />
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
	.content{
		width: 90%;
		overflow: hidden;
		background-color: #fff;
		margin: 0.6rem 0.3rem 1.1rem;
	}
	.content_title{
		font-size: 0.35rem;
		color:rgba(246,85,109,1);
	}
	.content_p{
		margin: 0.1rem auto;
		font-size:0.3rem ;
		color:rgba(83,83,83,1);
	}
	.content_hui{
		margin: 0.1rem auto;
		font-size:0.3rem ;
		color:rgba(186,186,186,1);
	}
	.content img{
		width: 100%;
		height: 4rem;
		margin: 0.3rem auto;
	}
</style>