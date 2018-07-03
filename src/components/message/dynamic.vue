<template>
	<div style="width: 100%;background:#F6F6F6;margin-bottom: 1.35rem;">
		<div v-for="(i,index) in act" class="boxs">
			
			<div class="chat_box">
		<!--头像-->
			<img class="imgs" style="" src="../../assets/img/15211045617076231.jpg" alt="" />
			<div class="text_box">
		<!--用户ID-->
				<p style="font-size: 0.32rem;float: left;">{{i.h}}</p>
		<!--时间-->	
				<p style="font-size: 0.28rem;float: right;margin-right: 0.3rem;color: #CACACA;">3天前</p>
			</div>
		</div>
			
			
		 <div class="img_box">
	  <!--大图容器-->
		 	 <div style="width: 5rem;height: 5rem;background: #666666;float: left;"></div>
		 	 
		 	 <div style="width: 2.44rem;height: 5rem;float: left;margin-left: 0.04rem;">
	  <!--小图容器上面--> 	
		 	 	<div style="width: 100%;height: 2.47rem;background: #666666;"></div>
	  <!--小图容器下面-->  	
		 	 	<div style="width: 100%;height: 2.48rem;background: #666666;margin-top: 0.04rem;"></div>
		 	 </div>
		 </div>
		 
	  <!--文本容器-->		
	   <div style="width: 100%;box-sizing: border-box;padding: 0.37rem;">
	  <!--文本内容-->	 
	   	  <p class="text_span">
	   	  	从2008第一家奢华酒店到87家豪华酒店，“酒店王国”
                                十载光彩卓然。本次设计采用黑金色调，融合主题和酒
                                 店元素进行创意构思，从创意到落地历时一周。
	   	  </p>
	   </div>
		
		<div class="boxs_to">
			
			<span style="font-size: 0.4rem;float: left;margin-top: 0.04rem;color: #CACACA;">
				<i style="margin-left: 0.04rem;" class="fa fa-heart-o"></i><br />
				<p style="font-size: 0.22rem;">点赞</p>
			</span>
			
			<span style="font-size: 0.4rem;float: left;margin-top: 0.04rem;margin-left: 0.6rem;color: #CACACA;">
				<i style="margin-left: 0.04rem;" class="fa fa-star-o"></i><br />
				<p style="font-size: 0.22rem;">收藏</p>
			</span>
			
			<span style="font-size: 0.4rem;float: left;margin-top: 0.04rem;margin-left: 0.6rem;color: #CACACA;">
				<i style="margin-left: 0.04rem;" class="fa fa-share"></i><br />
				<p style="font-size: 0.22rem;">转发</p>
			</span>
			
			<span style="font-size: 0.4rem;float: left;margin-top: 0.04rem;margin-left: 0.6rem;color: #CACACA;">
				<i style="margin-left: 0.04rem;" class="fa fa-comment-o"></i><br />
				<p style="font-size: 0.22rem;">评论</p>
			</span>
			
			<span style="font-size: 0.45rem;float: right;margin-top: 0.04rem;margin-right: 0.2rem;">
				<i style="margin-left: 0.04rem;color: yellow;" class="fa fa-gift"></i><br />
				<p style="font-size: 0.22rem;color: #CACACA;">打赏</p>
			</span>
			
		</div>
		
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				act:[
				  {h:'尾巴开箱'},
				  {h:'用户ID'},
				],
				
			}
		}
	}
</script>

<style scoped="scoped">
	.boxs{
		width: 100%;
		background: white;
		margin-bottom: 0.2rem;
	}
	.chat_box{
		width: 100%;
		height: 1.2rem;
		margin-top: 0.02rem;
	}
	.imgs{
		width: 1rem;height:1rem;
	   margin: 0.1rem 0.25rem;
	   border-radius: 50%;
	}
	.text_box{
		width: 5.78rem;
		height: 100%;
		
		float: right;
		position: relative;
		line-height: 1.2rem;
	}
	.img_box{
		width: 100%;
		height: 5rem;
	}
	.text_span{
		
		font-size: 0.28rem;
		color: #999999;
	}
	.boxs_to{
		width: 90%;
		height: 1rem;
		margin: 0 auto;
		position: relative;
		border-top: 0.005rem solid #666666;
	}
</style>