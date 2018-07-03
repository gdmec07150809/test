<template>
	<div style="width: 100%;overflow:hidden;position: relative;z-index: 300;background: white;">
		<!--
        	描述：艺术年表
        -->
		<!--<div class="box_top" style="width: 100%;height: 0.88rem;background: white;position: absolute;top: 0;left: 0;line-height: 0.88rem;">
	   		<!--<img @click="hui" style="width: 0.4rem;height: 0.4rem;float: left;margin:0.25rem 0.3rem;" src="../../../assets/img/zuo.png" alt="" />-->
	   		<!--<p style="font-size: 0.36rem;margin-left: 3.1rem;">艺术年表</p>-->
	   <!--</div>-->
	    <div class="head">
	    	<div style="width: 10%; float: left;">
				<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../../assets/img/zuo.png" @click="hui"/>
			</div>
			<div class="title">
			<p>艺术年表</p>
			</div>
			<div style="width: 10%;float:right;">
				<p @click="huis" style="font-size: 0.3rem;color:rgb(255, 157, 0);display: block;">保存</p>
			</div>
		</div>
		<div style="width:95%;height:90%;float: right;margin-top: 0.88rem;">
			 <div @click="to_Newchronology" style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #EEEEEE;">
	   	  	  	<!--<i style="font-size: 0.5rem;float: left;margin: 0.25rem 0;" class="fa fa-plus-square"></i>-->
	   	  	  	 <img  style="width:0.32rem;height:0.32rem;float:left;margin-top:0.34rem;" src="../../../assets/img/icon_my_add.png" alt="" />
	   	  	  	  <p style="font-size:0.3rem;float:left;margin-left: 0.2rem;color: #ff9d00;line-height: 1rem;">新增艺术年表</p>
	   	  	  </div>
	   	  	  
	   	  	  <div v-for="(i,index) in $store.state.nian_biao" style="width:100%;height:1rem;line-height:1rem;">
	   	  	  	 	<p style="font-size:0.34rem;color:black;float:left;">{{i.artYear}}</p>
	   	  	  	 	<div style="width:5.5rem;height: 100%;border-bottom:0.005rem solid #EEEEEE;float:right;line-height:1rem;">
	   	  	  	 		<p class="p_box" style="font-size:0.28rem;color:black;float:left;color: #B5B5B5;">{{i.artEvent}}</p>
	   	  	  	 		
	   	  	  	 		<!--<i @click="shanchu(index)" style="font-size:0.4rem;float:right;margin-top: 0.3rem;margin-right:0.5rem;color: #C0C0C0;" class="fa fa-times-circle"></i>-->
	   	  	  	 		<img src="../../../assets/img/icon_my_delete.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0.3rem;" @click="shanchu(index)"/>
	   	  	  	 	</div>
	   	  	  	 </div>
	   	  	  
	   	  	  
			
	  </div>
	   <!--<div class="box_bottom">
	   	   <button @click="huis" class="btns" style="width: 6.4rem;height: 0.9rem;background:#2E3135;">
	   	   	确认保存</button>
	   </div>-->
	</div>
</template>

<script>
	import store from '../../../vuex/store.js'
	export default{
		store,
		data(){
			return{
				
			}
		},
		methods:{
			shanchu(index){//删除年表事件
				this.$store.state.nian_biao.splice(index,1)
			},
			
			hui(){
//				window.location = '#/information'
				this.$router.push({
						path: '../information'
						});
			},
			huis(){
//				window.location = '#/information'
				this.$router.push({
						path: '../information'
						});
				
			},
			to_Newchronology(){
//				window.location = '#/Newchronology'
				this.$router.push({
						path: '../Newchronology'
						});
				
			}
		},
	}
</script>

<style scoped="scoped">
	.box_bottom{
		width: 100%;
		height: 1.4rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9992;
		background: white;
		border-top: 0.01rem solid #CACACA;
	}
	.btns{
		border: none;
		border-radius: 0.1rem;
		position: absolute;
		top: 0.25rem;
		left: 8%;
		color: white;
		font-size: 0.3rem;
	}
	.p_box{
		overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
		width:3.5rem;
	}
	
		.head {
		width: 100%;
		height: 1rem;
		position: fixed;
		top: 0;
		background: white;
		box-sizing: border-box;
		padding-top: 0.3rem;
		border-bottom: 1px solid #f1f1f1;
		z-index: 300;
	}
	
	.title {
		width: 80%;
		height: 100%;
		float: left;
		font-size: 0.38rem;
		text-align: center;
	}
</style>