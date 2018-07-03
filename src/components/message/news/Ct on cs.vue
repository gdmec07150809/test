<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-20
    	描述：消息记录
    -->
	<div style="width: 100%;height:13.33rem;position: relative;z-index: 9992;background: white;">
		<div style="width: 100%;height: 0.88rem;position: fixed;top:0;left: 0;z-index: 9992;line-height: 0.88rem;border-bottom: 0.005rem solid #999999;background: white;">
			<img @click="hui" style="width: 0.4rem;height: 0.4rem;float:left;margin:0.25rem 0.3rem;" src="../../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;margin-left: 2rem;float: left;">消息记录</p>
	   		<p style="font-size: 0.28rem;float: right;margin-right: 0.3rem;">清空</p>
		</div>
		<div style="height: 0.88rem;"></div>
		
		<!--
        	作者：2443611475@qq.com
        	时间：2018-03-20
        	描述：循环创建
        -->
		<div class="test_box">
			<div style="width: 4.4rem;height: 100%;float: left;position: relative;">
				<div style="width: 100%;height: 0.56rem;margin-top: 0.3rem;line-height: 0.56rem;">
					<img style="width:0.56rem;height:0.56rem;float:left;border-radius:50%;" src="../../../assets/img/15211045617076231.jpg"/>
				    <p style="font-size: 0.28rem;float: left;margin-left: 0.2rem;color: #B1B1B1;">用户id</p>
				</div>
				<div class="text_boxs">
					本次设计采用黑金色调，融合主题和酒
					店元素进行创合主题和酒店元素进行创
				</div>
				<p style="font-size: 0.2rem;color: #B1B1B1;position: absolute;bottom: 0.3rem;left: 0.75rem;">03-09 09：06</p>
			</div>
			<div style="width: 2.7rem;height: 100%;float: left;">
				<img style="width: 1.4rem;height: 1.4rem;margin: 0.6rem;" src="../../../assets/img/bab6b0330fcaebe2a621af57d70e6916.jpg"/>
			</div>
		</div>
		
		<div class="test_box">
			<div style="width: 4.4rem;height: 100%;float: left;position: relative;">
				<div style="width: 100%;height: 0.56rem;margin-top: 0.3rem;line-height: 0.56rem;">
					<img style="width:0.56rem;height:0.56rem;float:left;border-radius:50%;" src="../../../assets/img/15211045617076231.jpg"/>
				    <p style="font-size: 0.28rem;float: left;margin-left: 0.2rem;color: #B1B1B1;">用户id</p>
				</div>
				
				<img style="width: 0.34rem;height: 0.34rem;float: left;margin-left: 0.75rem;margin-bottom: 0.3rem;" src="../../../assets/img/like.png">
				
				<p style="font-size:0.2rem;color:#B1B1B1;position: absolute;bottom: 0.3rem;left: 0.75rem;">03-09 09：06</p>
			</div>
			<div style="width: 2.7rem;height: 100%;float: left;">
				<img style="width: 1.4rem;height: 1.4rem;margin: 0.6rem;" src="../../../assets/img/bab6b0330fcaebe2a621af57d70e6916.jpg"/>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	export default{
		methods:{
			hui(){
				this.$router.push({
						path: '../message/news'
						});
				
			}
		},
	}
</script>

<style scoped="scoped">
	.chat_box{
		width: 100%;
		height: 1.7rem;
		margin-top: 0.02rem;
	}
	.test_box{
		width: 95%;
		height: 2.5rem;
		float: right;
		border-bottom: 0.005rem solid #CACACA;
	}
	.text_boxs{
		margin-left: 0.75rem;
		font-size: 0.28rem;
		width: 3.4rem;
		height: 0.8rem;
	   display: -webkit-box;  
      display: -moz-box;  
      overflow: hidden;  
      text-overflow: ellipsis;  
      word-break: break-all;  
      -webkit-box-orient: vertical;  
      -webkit-line-clamp:2;  
	}
</style>