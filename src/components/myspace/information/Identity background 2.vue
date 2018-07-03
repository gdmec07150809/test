<template>
	<div style="width: 100%;">
		<!--
        	描述：背景选择
        -->
	   <!--<div class="box_top" style="width: 100%;height: 0.88rem;background: white;position: fixed;top: 0;left: 0;line-height: 0.88rem;">
	   		<img @click="hui" style="width: 0.4rem;height: 0.4rem;float: left;margin:0.25rem 0.3rem;" src="../../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;margin-left: 3.1rem;">{{$store.state.top_table}}</p>
	   </div>-->
	   <div class="head">
			<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../../assets/img/zuo.png" @click="hui"/>
			<div class="title">
			<p>{{$store.state.top_table}}</p>
			</div>
			<p @click="huis" style="font-size: 0.3rem;color:rgb(255, 157, 0);float:right;margin-right:0.3rem;display: block;">修改</p>
		</div>
	     <div style="width:95%;height:90%;float: right;margin-top: 0.88rem;margin-bottom: 2rem;">
	        
	          <div @click="xz(index)" v-for="(i,index) in r" style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #EEEEEE;">
	   	  	  	<p style="font-size:0.3rem;color:black;float: left;">{{i.dictName}}</p>
	   	  	  	    <!--<i v-show="i.id" style="font-size: 0.4rem;float: right;margin: 0.3rem;"  class="fa fa-check" ></i>-->
	   	  	  	    <img v-show="i.id"  style="float: right;width: 0.4rem;height: 0.4rem;margin-top: 0.3rem;margin-right: 0.2rem;" src="static/img/icon_my_choose.png" />
	   	  	  </div>
	     
	         
	   </div>
	 <!--<div class="box_bottom">
	   	   <button @click="huis" class="btns" style="width: 6.4rem;height: 0.9rem;background:#2E3135;">
	   	   	确认选择</button>
	   </div>-->
	</div>
</template>

<script>
	import store from '../../../vuex/store.js'
	import { Toast } from 'mint-ui';
	export default{
		store,
		data(){
			return{
				ip:false,
				op:"p"
			}
		},
		methods:{
			hui(){
//				window.location = '#/dentitybackground'
                
				
				
               
				 this.$router.push({
						path: '../dentitybackground'
						});
			},
			huis(){
				
				 this.$store.state.yemian = 0
				 this.$router.push({
						path: '../information'
						});
				
			},
			
			qing(){
				
//				console.log(this.$store.state.Identity_background)
				
				 for(var i=0;i<this.$store.state.Identity_background.length;i++){
				 	for(var j=0;j<this.$store.state.Identity_background[i].dataDictionary.length;j++){
				 		this.$store.state.Identity_background[i].dataDictionary[j].id = false
				 	}
				 }
				    
				    
				           this.$store.state.box_table=[];
							this.$store.state.bs=[]
							this.$store.state.san_s='i'
			},
			xz(index){
				   
				   console.log(this.$store.state.san_s)
				   
				if(this.r[index].id){
					
					for(var i=0;i<this.$store.state.box_table.length;i++){
						
					if(this.$store.state.box_table[i] == this.r[index].dictName){
						
						this.$store.state.box_table.splice(i,1)
						
						this.r[index].id = false

						this.$store.state.bs.splice(i,1)
						
					}
				 }
//					if(this.$store.state.box_table.length==0){
//							this.$store.state.top_table = ''
//						}
					
				}else{
					if(this.$store.state.san_s==1){
						    this.qing()
						}
					 console.log(this.$store.state.box_table)
					 
					 
					 
					if(this.$store.state.box_table.length<5){
						
						
					  this.r[index].id = true
					  
					  this.$store.state.box_table.push(this.r[index].dictName)
					  
					   this.$store.state.top_table =  this.$store.state.top_s//将一级标签
					  
					  this.$store.state.bs.push(this.$store.state.biao)
					  
				      //console.log(this.$store.state.bs,'2')
				      
				      //console.log(this.$store.state.box_table,'2')
				      
				      }else{
				      	 Toast({
										message: '选项不能超过五个',
										position: 'middle',
										duration: 2000
								});
				      }
				}
			},
		},
		mounted(){
			
		},
		computed:{
			r(){
				return this.$store.state.Identity_background[this.$store.state.biao].dataDictionary
			}
		}
		
	}
</script>

<style scoped="scoped">
	*{
		outline:none;
	}
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
	.is{
		display: none;
	}
	.is_to{
		display: block;
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
		height:100%;
		/*line-height: 0.5rem;*/
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