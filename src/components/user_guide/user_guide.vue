<template>
	<div id="app">
		<div class="head">
			<img src="../../assets/img/zuo.png" @click="hui"/>
			<p>新手指引</p>
		</div>
		<img src="../../assets/img/icon_guide_card.png" class="new_user" />
		<div class="ruhe" @click="guide_01">
			<p>觅艺怎么玩？</p>
			<img src="../../assets/img/back_gray_icon.png" />
		</div>
		<div class="ruhe" @click="guide_02">
			<p>没有作品，如何交友？</p>
			<img src="../../assets/img/back_gray_icon.png" />
		</div>
		<div class="ruhe" @click="guide_03">
			<p>怎么上传作品、文章、闲情？</p>
			<img src="../../assets/img/back_gray_icon.png" />
		</div>
		<div class="ruhe" @click="guide_04">
			<p>头条文章和深度文章的不同？</p>
			<img src="../../assets/img/back_gray_icon.png" />
		</div>
		<div class="ruhe" @click="guide_05">
			<p>如何进入人气榜？</p>
			<img src="../../assets/img/back_gray_icon.png" />
		</div>
		<div class="ruhe" @click="guide_06">
			<p>如何获得更多的交友配对？</p>
			<img src="../../assets/img/back_gray_icon.png" />
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
			hui(){
				this.$router.push({
						path: '../myspace'
					});
			},
			guide_01(){
				 this.$router.push({
						path: '../guide_one'
					});
			},
			guide_02(){
				this.$router.push({
						path: '../guide_two'
						});
			
				
			},
			guide_03(){
				this.$router.push({
						path: '../guide_three'
						});
			
			},
			guide_04(){
				this.$router.push({
						path: '../guide_four'
						});
				
			},
			guide_05(){
				this.$router.push({
						path: '../guide_five'
						});
				
			},
			guide_06(){
				this.$router.push({
						path: '../guide_six'
						});
			
			}
		},	
		mounted() {
			
			
		this.$store.state.is_bottom=false;
			//console.log(this.$store.state.is_bottom)
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
		margin: 0.34rem 0.2rem 0;
		height: 0.32rem;
	}
	.new_user{
		width: 95%;
		height: 4rem;
		padding-top: 1rem;
		margin: 0.3rem 2.5% 0;
		 
	}
	.ruhe{
		width: 90%;
		height: 1.2rem;
		position: relative;
		margin-left: 0.4rem;
		margin: 0 auto;
		border-bottom: solid 1px #F1F1F1;
	}
	.ruhe p{
		line-height: 1rem;
		font-size: 0.35rem;
	}
	.ruhe img{
		position: absolute;
		width:0.4rem;
		height: 0.4rem;
		top: 0.3rem;
		right: 0;
		-webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -o-transform: rotateY(180deg);
        -ms-transform: rotateY(180deg);
        transform: rotateY(180deg);
	}
</style>