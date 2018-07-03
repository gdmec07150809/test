<template>
	<div style="width: 100%;">
		
		 <div v-show="xian_s" id="box_s">
		 	<div  class="zhe_1" style="">
				  <div style="width:100%;height: 0.07rem;"></div>
				  <p style="font-size: 0.35rem;margin-top: 0.45rem;color:#8C939D;line-height:1rem;">你当前是“游客状态”无法获得该页面信息，是否立即去</p>
					<p @click="shan_chu" class="pss">登录?</p>
			</div>
		 </div>
		
		<div v-show="tops" class="div-top" style="width: 100%;height: 1rem;border-bottom: 0.005rem solid #f1f1f1;position: fixed;top: 0;left: 0;z-index: 300;">
			<span class="spans" style=""><router-link to='/message/chat'>消息</router-link></span>
			<span class="spans" style=""><router-link to='/message/news'>聊天</router-link></span>
			
			
			<!--<span class="spans" style=""><router-link to='/message/dynamic'>动态</router-link></span>-->
		 
		</div>
		   <div style="width: 100%;height: 1rem;"></div>
	    <!--
        	作者：2443611475@qq.com
        	时间：2018-03-16
        	描述：以下是子路由显示你内容
        -->  
		 <div style="width: 100%;">
		 	<router-view></router-view>
		 </div>
		 
		
		    
		 
		 
	</div>
</template>

<script>
	
	export default{
		data(){
			return{
			   xian_s:false,	
			   tops:true,
			}
		},
		methods:{
			shan_chu(){
				 this.$router.push({
						path: '/home'
				 }); 
			},
			
			
		},
		mounted(){
			if(this.$store.state.data.memId == undefined || this.$store.state.data.memId == "" || this.$store.state.data.memId == null) {
				
				
				this.tops = false
				this.xian_s=true
				//console.log("----------")
//				this.$router.push({
//					path: '/swiper2'
//				 });
                  
			}
			this.$store.state.is_bottom=true;
		},
	}
</script>

<style scoped="scoped">
	*{
		text-decoration:none;
	}
	.div-top{
		font-size: 0.4rem;
	    line-height: 0.88rem;
	    background: white;
	}
	.spans{
		margin-left: 0.5rem;
		font-size: 0.45rem;
		
	}
	.router-link-active{color: black;font-weight: 600;/*border-bottom: 0.05rem solid black;*/}
	
	a{
		color: #CACACA;
	}
	.zhe_1{
		width: 5rem;
		height: 3.2rem;
		background: rgb(246, 246, 246);;
		margin: 0 auto;
		border-radius: 0.2rem;
		text-align: left;
		position: absolute;
		top: 4rem;
		left: 18%;
	}
	.pss{
		font-size: 0.35rem;
		color: #ff9d00;
		position: absolute;
		top: 1.775rem;
		/*right: 0.5;*/
		right:0.25rem;
	}
	#box_s{
		width: 7.5rem;
		height: 90%;
		background: whitesmoke;
		position: fixed;
		top: 0;
		z-index: 1000;
	}
</style>