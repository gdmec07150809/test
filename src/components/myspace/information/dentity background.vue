<template>
	<div class="gong_class">
		<!--<div style="width: 100%;height: 0.88rem;position: fixed;top:0;left: 0;z-index: 300;line-height: 0.88rem;border-bottom: 0.005rem solid #999999;">
			<img @click="hui" style="width: 0.4rem;height: 0.4rem;float:left;margin:0.25rem 0.3rem;" src="../../../assets/img/zuo.png" alt="" />
			<p style="font-size: 0.36rem;margin-left: 3.1rem;">身份背景</p>
		</div>-->
		<div class="head">
			<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../../assets/img/zuo.png" @click="hui"/>
			<div class="title">
			<p>身份背景</p>
			</div>
		</div>
		<div style="height: 0.88rem;"></div>
		<div style="width:95%;float: right;">

			<div v-for="(i,index) in $store.state.Identity_background" @click="sj1(index)" style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #EEEEEE;">
				<p style="font-size:0.3rem;color:black;float: left;">{{i.dictName}}</p>
				<!--<i style="font-size: 0.5rem;float: right;margin: 0.25rem;" class="fa fa-angle-right"></i>-->
				<img src="../../../assets/img/right_icon.png" style="float: right;height: 0.28rem;margin-top: 0.36rem;margin-right: 0.3rem;" />
			</div>

           
		</div>

		
	</div>
</template>

<script>
	import store from '../../../vuex/store.js'
	import { Toast } from 'mint-ui';
	export default {
		store,
		computed:{
			a(){
				return this.$store.state.top_table
			}
		},
		methods: {
			hui() {
//				window.location = '#/information'
                
                 for(var i=0;i<this.$store.state.Identity_background.length;i++){
				 	for(var j=0;j<this.$store.state.Identity_background[i].dataDictionary.length;j++){
				 		this.$store.state.Identity_background[i].dataDictionary[j].id = false
				 	}
				 }
                
                this.$store.state.bs=[]
               this.$store.state.san_s='i'
                this.$store.state.yemian=1
				this.$router.push({
						   path: '../information'
						});
			},
			
			
			sj1(index){
                
                  console.log(this.$store.state.Identity_background[index].dictName,'外层控制',this.$store.state.top_table)
                  
//			 if(this.$store.state.bs.length == 0){
//			 	
//			 	   this.$store.state.san_s = 2
//			 	
//					  this.$store.state.biao = index;
//			          this.$store.state.top_table = this.$store.state.Identity_background[index].dictName
//			          this.$store.state.top_s = this.$store.state.Identity_background[index].dictName
////			          window.location = '#/Identitybackground2'
//			          this.$router.push({
//						path: '../Identitybackground2'
//						});
//				}else if(this.$store.state.bs[0]==index){
//					
//					 this.$store.state.san_s = 2
//					
//					 this.$store.state.biao = index;
//			          this.$store.state.top_table = this.$store.state.Identity_background[index].dictName
//			           this.$store.state.top_s = this.$store.state.Identity_background[index].dictName
//			         // window.location = '#/Identitybackground2'
//			           this.$router.push({
//						path: '../Identitybackground2'
//						});
//				}else 
               if(this.$store.state.Identity_background[index].dictName != this.$store.state.top_table){
					
                     this.$store.state.san_s = 1
					 this.$store.state.biao = index;
			          this.$store.state.top_table = this.$store.state.Identity_background[index].dictName
			           this.$store.state.top_s = this.$store.state.Identity_background[index].dictName
			           this.$router.push({
						      path: '../Identitybackground2'
						});
				}else{
					
					 this.$store.state.san_s = 2
					 this.$store.state.biao = index;
			          this.$store.state.top_table = this.$store.state.Identity_background[index].dictName
			           this.$store.state.top_s = this.$store.state.Identity_background[index].dictName
			           this.$router.push({
						path: '../Identitybackground2'
						});
				}
				
			},
			
		},
	}
</script>

<style scoped="scoped">
	.chat_box {
		width: 100%;
		height: 1.7rem;
		margin-top: 0.02rem;
	}
	
	.imgs {
		width: 1.3rem;
		height: 1.3rem;
		margin: 0.2rem;
		border-radius: 50%;
	}
	
	.text_box {
		width: 5.78rem;
		height: 100%;
		border-bottom: 0.005rem solid #2C3E50;
		float: right;
		position: relative;
	}
	
	.biao {
		font-size: 0.26rem;
		width: 1.3rem;
		height: 0.54rem;
		border: 0.01rem solid #CACACA;
		text-align: center;
		line-height: 0.54rem;
		float: right;
		position: absolute;
		right: 0.2rem;
		bottom: 0.5rem;
		border-radius: 0.11rem;
		color: #CACACA;
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
	.gong_class{	
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
    	}
</style>