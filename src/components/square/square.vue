<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-04-27
    	描述：广场页面
   -->
	<div style="width: 100%;">
		
		<!--
        	作者：2443611475@qq.com
        	时间：2018-04-27
        	描述：顶部第一级导航栏
        -->
       
		<div class="top_on1" style="">
			<span class="pan">
				<i style="font-size:0.4rem;float:left;margin-top:0.3rem;margin-right: 0.2rem;" class="fa fa-map-marker"></i>
				<p style="font-size:0.44rem;">{{dy}}</p>
			</span>
			<span style="margin-right: 0.3rem;" class="pan1">
				<p style="font-size:0.4rem;color:#D5D5D5;">商城</p>
			</span>
			<span style="margin-right:0.4rem;" class="pan1">
				<p style="font-size:0.4rem;">社区</p>
			</span>
			
		</div>
		 <!--
        	作者：2443611475@qq.com
        	时间：2018-04-27
        	描述：顶部第二级导航栏
        -->
        
                <!--<div class="swiper-container">
						<div class="swiper-wrapper">
							
							<div @click="li1" class="swiper-slide">
								<div @click="li1" :class="{lis:act.noa1,listo:act.noe1}">
									<p>资料</p>
									<div :class="{move:act.noa1,defultTo:act.noe1}"></div>
								</div>
							</div>
							
						</div>
					</div>-->
        
        
		 <div class="top_no2" >
		 	
		 	<div class="swiper-container_s" style="">
				 <div class="swiper-wrapper">
							
		 	<div class="swiper-slide" @click="js1" style="margin-left: 0.25rem;width: 1rem;height: 0.5rem;" :class="{tables:table_biao.noa1,tables_to:table_biao.noe1}">
		 	   <div class="p_xs" style="height:1rem;width: 1rem;margin: 0;">
		 	  	     人气榜
		 		 <div :class="{xian1:table_biao.noa1,xian:table_biao.noe1}"></div>
		 	   </div>
		 		
		 	</div>
		 	<div class="swiper-slide" @click="js2" :class="{tables:table_biao.noa2,tables_to:table_biao.noe2}" style="">
		 	 
		 	 <div  class="p_xs" style="height:0.5rem;width: 1rem;">
		 		    朋友圈
		 		<div :class="{xian1:table_biao.noa2,xian:table_biao.noe2}"></div>
		 	 </div>	
		 	 
		 	</div>
		 	<div class="swiper-slide" @click="js6" :class="{tables:table_biao.noa6,tables_to:table_biao.noe6}" style="">
		 	   <div class="p_xs" style="height:0.5rem;width:0.7rem;">
		 		     闲情
		 		<div :class="{xian1:table_biao.noa6,xian:table_biao.noe6}"></div>
		 	   </div>	
		 	 </div> 
		 	<div class="swiper-slide" @click="js7" :class="{tables:table_biao.noa7,tables_to:table_biao.noe7}" style="">
		 	 
		 	 <div  class="p_xs" style="height:0.5rem;width: 1rem;">
		 		    一分钟
		 		<div :class="{xian1:table_biao.noa7,xian:table_biao.noe7}"></div>
		 	 </div>	
		 	 
		 	</div>
		 	<div class="swiper-slide" @click="js3" :class="{tables:table_biao.noa3,tables_to:table_biao.noe3}" style="">
		 	  <div class="p_xs" style="height:0.5rem;width: 0.7rem;">
		 		 头条
		 		<div :class="{xian1:table_biao.noa3,xian:table_biao.noe3}"></div>
		     </div>	
		 		
		 	</div>
		 	<div class="swiper-slide" @click="js4" :class="{tables:table_biao.noa4,tables_to:table_biao.noe4}" style="">
		 	   <div class="p_xs" style="height:0.5rem;width: 0.7rem;">	
		 		深度
		 		<div :class="{xian1:table_biao.noa4,xian:table_biao.noe4}"></div>
		 		</div>
		 		
		 	</div>
		 	<!--
             	作者：672423400@qq.com
             	时间：2018-06-14
             	描述：暂时隐藏,还未出数据接口
             -->
		 	<div class="swiper-slide" @click="js5" :class="{tables:table_biao.noa5,tables_to:table_biao.noe5}" style="">
		 	  <div class="p_xs" style="height:0.5rem;width: 1rem;">
		 		 毕业季
		 		<div :class="{xian1:table_biao.noa5,xian:table_biao.noe5}"></div>
		 	  </div>	
		 	</div>
		 	 
		 	 
		 	 <div class="swiper-slide"  style="">
		 	 
		 	</div>
		 	
		 	
		     </div>
	     </div>
		 	
	</div><div style="width: 100%;height:2rem;"></div>
		 
		<div style="width:100%;background:white;padding-bottom: 1.1rem;">
				<router-view></router-view>
		</div>
			
	</div>
</template>

<script>
	import router from '../../router/index.js'
	import {MP} from '../../../static/js/map.js'
	import swiper from '../../../static/js/swiper.js'
	export default{
		router,
		data(){
			return{
                table_biao:{noa1:true,noe1:false,noa2:true,noe2:false,noa3:true,noe3:false,noa4:true,noe4:false,noa5:true,noe5:false,noa6:true,noe6:false,noa7:true,noe7:false}
			}
		},
		  methods:{
              js1(){//人气榜点击事件
              	this.table_biao.noa5 = true;this.table_biao.noe5 = false;this.table_biao.noa6 = true;this.table_biao.noe6 = false;
              	this.table_biao.noa1 = false;this.table_biao.noe1 = true;this.table_biao.noa2 = true;this.table_biao.noe2 = false;
                this.table_biao.noa3 = true;this.table_biao.noe3 = false;this.table_biao.noa4 = true;this.table_biao.noe4 = false;
                this.table_biao.noa7 = true;this.table_biao.noe7 = false;
                router.replace({path:'../square/Popularity_list'})
              },
		  	  js2(){//朋友圈点击事件
		  	  	this.table_biao.noa5 = true;this.table_biao.noe5 = false;this.table_biao.noa6 = true;this.table_biao.noe6 = false;
              	this.table_biao.noa1 = true;this.table_biao.noe1 = false;this.table_biao.noa2 = false;this.table_biao.noe2 = true;
                this.table_biao.noa3 = true;this.table_biao.noe3 = false;this.table_biao.noa4 = true;this.table_biao.noe4 = false;
                this.table_biao.noa7 = true;this.table_biao.noe7 = false;
                router.replace({path:'../square/dynamic'})
		  	  },
              js3(){//头条点击事件
              	
              	this.$store.state.tr = 1
              	
              	this.table_biao.noa5 = true;this.table_biao.noe5 = false;this.table_biao.noa6 = true;this.table_biao.noe6 = false;
              	this.table_biao.noa3 = false;this.table_biao.noe3 = true;this.table_biao.noa2 = true;this.table_biao.noe2 = false;
                this.table_biao.noa1 = true;this.table_biao.noe1 = false;this.table_biao.noa4 = true;this.table_biao.noe4 = false;
                this.table_biao.noa7 = true;this.table_biao.noe7 = false;
                router.replace({path:'../square/The_headlines'})
              },
              js4(){//深度点击事件
              	
              	this.$store.state.tr = 2
              	
              	this.table_biao.noa5 = true;this.table_biao.noe5 = false;this.table_biao.noa6 = true;this.table_biao.noe6 = false;
              	this.table_biao.noa4 = false;this.table_biao.noe4 = true;this.table_biao.noa2 = true;this.table_biao.noe2 = false;
                this.table_biao.noa3 = true;this.table_biao.noe3 = false;this.table_biao.noa1 = true;this.table_biao.noe1 = false;
                this.table_biao.noa7 = true;this.table_biao.noe7 = false;
                router.replace({path:'../square/depth'})
              },
               js5(){//毕业季点击事件
               	this.table_biao.noa4 = true;this.table_biao.noe4 = false;this.table_biao.noa6 = true;this.table_biao.noe6 = false;
              	this.table_biao.noa5 = false;this.table_biao.noe5 = true;this.table_biao.noa2 = true;this.table_biao.noe2 = false;
                this.table_biao.noa3 = true;this.table_biao.noe3 = false;this.table_biao.noa1 = true;this.table_biao.noe1 = false;
                this.table_biao.noa7 = true;this.table_biao.noe7 = false;
//           console.log(this.$store.state.BS_gs)
             if(this.$store.state.BS_gs==0){
                router.replace({path:'../BS_Graduation_season/BS_remen'})
               }else if(this.$store.state.BS_gs==1){
               	 router.replace({path:'../BS_Graduation_season/BS_reyi'})
               }
              },
               js6(){//闲情点击事件
                 this.table_biao.noa4 = true;this.table_biao.noe4 = false;this.table_biao.noa5 = true;this.table_biao.noe5 = false;
              	this.table_biao.noa6 = false;this.table_biao.noe6 = true;this.table_biao.noa2 = true;this.table_biao.noe2 = false;
                this.table_biao.noa3 = true;this.table_biao.noe3 = false;this.table_biao.noa1 = true;this.table_biao.noe1 = false;
                this.table_biao.noa7 = true;this.table_biao.noe7 = false;
             	  router.replace({path:'../square/square_diaries'})
              },
                 js7(){//一分钟点击事件
                 	this.table_biao.noa4 = true;this.table_biao.noe4 = false;this.table_biao.noa5 = true;this.table_biao.noe5 = false;
              		this.table_biao.noa6 = true;this.table_biao.noe6 = false;this.table_biao.noa2 = true;this.table_biao.noe2 = false;
                	this.table_biao.noa3 = true;this.table_biao.noe3 = false;this.table_biao.noa1 = true;this.table_biao.noe1 = false;
                	this.table_biao.noa7 = false;this.table_biao.noe7 = true;
		             router.replace({path:'../square/one_minute'})
              },
              
              
              collectTap(){
						
			  },
			  
			  swipers() {
				new swiper('.swiper-container_s', {
					slidesPerView :5.8,
                    centeredSlides : false,
					
				})
			},
			  
		  },
		  mounted(){
		  	this.$store.state.rq_box = []
		  	this.swipers()
		  	
		  //	console.log(this.$store.state.tr)
		  	
		  	if(this.$store.state.tr == 1){
		  		this.js3()
		  	}else if(this.$store.state.tr == 2){
		  		this.js4()
		  	}else if(this.$store.state.tr == 0){
		  		this.js1()
		  	}else if(this.$store.state.tr == 4){
		  		this.js2()
		  	}else if(this.$store.state.tr == 5){
		  		this.js5()
		  	}else if(this.$store.state.tr == 6){
		  		this.js6()
		  	}else if(this.$store.state.tr == 61){
		  		this.js7()
		  	}
		  	
		  },
		  computed:{
		  	   dy(){
		  	   	  return this.$store.state.dy
		  	   }
		  }
	}
</script>

<style scoped="scoped">
	@import url("../../assets/css/swiper.css");
	
	.swiper-container_s{
		height: 1rem;
	}
	.p_xs{
		margin: 0 auto;
	}
	.top_on1{
		width:100%;height:1rem;line-height:1rem;font-weight:600;
		position:fixed;top:0;
		background:white;z-index:300;
	}
	.top_no2{
		width:7.5rem;height:1rem;position:fixed;top: 0.9rem;
		background: white;
		z-index: 300;
		border-bottom: #f7f7f7 solid 2px;
	}
	.pan{
		width: 2rem;
		float: left;
		margin-left:0.5rem;
	}
	.pan1{
		float: right;
	}
	
	.tables{
		font-size: 0.32rem;
		float: left;
		color: #000;
		height: 0.5rem;
		line-height: 0.5rem;
		margin-top: 0.27rem;
	   
	}
	.tables_to{
		font-size: 0.32rem;
		float: left;
		color: #ff9d00;
		height: 0.5rem;
		line-height: 0.5rem;
		margin-top: 0.27rem;
	}
	.xian{
		width: 100%;
		height: 0.06rem;
		margin: 0 auto;
		margin-top: 0.155rem;
		border-radius: 0.2rem;
		background-color:#ff9d00;	
	}
	.xian1{
		height: 0.06rem;
		margin-top: 0.155rem;
		border-radius: 0.2rem;
	}
	.swiper-slide{
		height: 1rem;
		width: 1.5rem;
		text-align: center;
	}
	
</style>