<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-20
    	描述：打赏记录
    -->
	<div style="width: 100%;height:13.33rem;position: relative;z-index: 9992;background: white;">
		<div style="width: 100%;height: 0.88rem;position: fixed;top:0;left: 0;z-index: 9992;line-height: 0.88rem;border-bottom: 0.005rem solid #999999;background: white;">
			<img @click="hui" style="width: 0.4rem;height: 0.4rem;float:left;margin:0.25rem 0.3rem;" src="../../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;margin-left: 2rem;float: left;">打赏记录</p>
	   		
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
			
			   <span class="ps">
			   	<p>打赏了</p>
			   	<p style="color: #FF9A2B;">6个觅艺币</p>
			   </span>
			
				<p style="font-size: 0.2rem;color: #B1B1B1;position: absolute;bottom: 0.3rem;left: 0.75rem;">03-09 09：06</p>
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
	.ps{
		font-size: 0.3rem;
		float: left;
		margin-left: 0.75rem;
		margin-top: 0.3rem;
	}
	.ps p{
		float: left;
	}
</style>