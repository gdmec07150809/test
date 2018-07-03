<template>
	<div style="width: 100%;">
		
		
		<div  class="chat_box">
			<img class="imgs" style="" src="../../assets/img/ma_kefu.png" alt="" />
			<div class="text_box">
				<p style="font-size: 0.32rem;line-height:1.5rem;margin-left: 0.2rem;">觅艺客服</p>
				<div class="hong" v-show="$store.state.fans.length>0"></div>
				<!--<i style="font-size: 0.45rem;color:#CACACA;position: absolute;right:0.2rem;top: 0.7rem;"class="fa fa-chevron-right"></i>-->
				<img src="../../assets/img/right_icon.png" style="position: absolute; height: 0.28rem;top: 0.61rem;right: 0.3rem;" />
			</div>
		</div>
		
		<div @click="fensi" class="chat_box">
			<img class="imgs" style="" src="../../assets/img/xitong/icon_news_fans.png" alt="" />
			<div class="text_box">
				<p style="font-size: 0.32rem;line-height:1.5rem;margin-left: 0.2rem;">新的粉丝</p>
				<div class="hong" v-show="$store.state.fans.length>0"></div>
				<!--<i style="font-size: 0.45rem;color:#CACACA;position: absolute;right:0.2rem;top: 0.7rem;"class="fa fa-chevron-right"></i>-->
				<img src="../../assets/img/right_icon.png" style="position: absolute; height: 0.28rem;top: 0.61rem;right: 0.3rem;" />
			</div>
		</div>
		
		<div @click="Ctoncs" class="chat_box">
			<img class="imgs" style="" src="../../assets/img/xitong/icon_news_comment.png" alt="" />
			<div class="text_box">
				<p style="font-size: 0.32rem;line-height:1.5rem;margin-left: 0.2rem;">点赞、评论</p>
				<!--<i style="font-size: 0.45rem;color:#CACACA;position: absolute;right:0.2rem;top: 0.7rem;"class="fa fa-chevron-right"></i>-->
				<div class="hong" v-if="$store.state.discuss.length>0||$store.state.likes.length>0"></div>
				<!--<div class="hong" v-else-if="$store.state.likes.length>0"></div>-->
				<img src="../../assets/img/right_icon.png" style="position: absolute; height: 0.28rem;top: 0.61rem;right: 0.3rem;" />
			</div>
		</div>
		
		<div @click="dashang" class="chat_box">
			<img class="imgs" style="" src="../../assets/img/xitong/icon_news_gifts.png" alt="" />
			<div class="text_box">
				<p style="font-size: 0.32rem;line-height:1.5rem;margin-left: 0.2rem;">打赏记录</p>
				<div class="hong" v-show="$store.state.rewards.length>0"></div>
				<!--<i style="font-size: 0.45rem;color:#CACACA;position: absolute;right:0.2rem;top: 0.7rem;"class="fa fa-chevron-right"></i>-->
				<img src="../../assets/img/right_icon.png" style="position: absolute; height: 0.28rem;top: 0.61rem;right: 0.3rem;" />
			</div>
		</div>
		
		
		
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	export default{
		store,
		methods:{
			fensi(){
					this.$router.push({
						path: '../myfensi'
						});
				
			},
			Ctoncs(){
				this.$router.push({
						path: '../Ctoncs'
						});
				
			},
			dashang(){
				this.$router.push({
						path: '../dashang'
						});
				
			},
		}
	}
</script>

<style scoped="scoped">
	.chat_box{
		width: 100%;
		height: 1.5rem;
		margin-top: 0.02rem;
	}
	.imgs{
		width: 1rem;
    	height: 1rem;
   		/*margin: 0.25rem;*/
   		margin-top: 0.25rem;
   		margin-left: 0.25rem;
	   	border-radius: 50%;
	}
	.text_box{
		width: 6rem;
		height: 1.5rem;
		border-bottom:0.005rem solid #f1f1f1 ;
		float: right;
		
		position: relative;
	}
	.hong{
		background-color: red;
		padding: 0.1rem;
		border-radius: 50%;
		top: 0.65rem;
		position: absolute;right: 0.6rem;
	}
</style>