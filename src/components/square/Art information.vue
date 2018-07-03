<template>
	<div style="width:100%;height:13.3rem;background: white;position:relative;z-index:400;">
		<div style="width: 100%;height:1.2rem;">
			<div style="line-height: 0.4rem;position:fixed;top: 0;left: 0;padding-top:0.44rem;background: white;z-index:300;width:100%;border-bottom: 0.005rem solid #8C8C8C;">
				<img @click="hui" style="width:0.4rem;float:left;margin-left:0.3rem;" src="../../assets/img/zuo.png"/>
				<!--<p style="font-size:0.6rem;margin-left:0.15rem;">艺术资讯</p>-->
				
				<div @click="ja1"  :class="{roters:acts.noa,roters_to:acts.noe}">头条</div>
				<div @click="ja2" :class="{roters:acts.noa1,roters_to:acts.noe1}">深度</div>
			</div><div style="width: 100%;height: 0.3rem;"></div>
			
			<!--<div style="width:100%;height:0.6rem;">
				
				<div  style="margin-left: 0.31rem;" class="roters_tos">头条</div>
				
			</div>-->
			
			<div style="width:100%;margin-top:1.25rem;position:relative;background: white;">
				<router-view></router-view>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import router from '../../router/index.js'
	export default{
		router,
		data(){
			return{
				acts:{noa:true,noe:false,noa1:true,noe1:false},
			}
		},
		  methods:{
		  	hui(){//返回广场页面
		  			this.$router.push({
						path: '../square'
						});
		  		
		  	},
		  	ja1(){
		  		this.acts.noa=false;this.acts.noe = true;
		  		this.acts.noa1=true;this.acts.noe1 = false;
		  		router.replace({path:'../Art_information/The_headlines'})
		  	},
		  	ja2(){
		  		this.acts.noa=true;this.acts.noe = false;
		  		this.acts.noa1=false;this.acts.noe1 = true;
		  		router.replace({path:'../Art_information/depth'})
		  	}
		  	
		  },
		  mounted(){
		  	this.ja1()
		  },
	}
</script>

<style scoped="scoped">
	.roters{
		width:1rem;
		height:1rem;
		color: #D0D0D0;
		float: left;
		margin-left:0.5rem;
		text-align: center;
		font-size:0.5rem;
		font-weight: 600;
	}
	
	.roters_to{
		width:1rem;
		height:1rem;
		color: black;
		float: left;
		margin-left:0.5rem;
		text-align: center;
		font-size:0.5rem;
		font-weight: 600;
		/*border-bottom: 0.05rem solid black;*/
	}
	/*.roters_tos{
		width:rem;
		height:0.6rem;
		color: black;
		float: left;
		margin-left:0.5rem;
		text-align: center;
		font-size:0.6rem;
		border-bottom: 0.05rem solid black;
	}*/
</style>