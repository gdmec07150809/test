<template>
	<div class="gong_class">
		<!--
        	描述：充值页面
        -->
	   <!--<div class="box_top" style="width: 100%;height: 0.88rem;background: white;position: absolute;top: 0;left: 0;line-height: 0.88rem;;">
	   		<img @click="hui" style="width: 0.4rem;height: 0.4rem;float: left;margin:0.25rem 0.3rem;" src="../../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;margin-left: 3.1rem;">充值页面</p>
	   </div>-->
	    <div class="head">
			<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../../assets/img/zuo.png" @click="hui"/>
			<div class="title">
			<p>充值页面</p>
			</div>
		</div>
	     <div style="width:93%;height:90%;float: right;margin-top: 0.88rem;">
	       <div style="width: 6.7rem;height: 5.5rem;margin-top: 1rem;text-align: center;">
	           <p style="font-size: 0.44rem;">当前觅艺币</p>
	           <p style="font-size: 0.8rem;font-weight: 600;">{{$store.state.opGift}}</p>
	       		<p style="font-size: 0.28rem;">单位(个)</p>
	           <div style="width: 100%;height: 3rem;margin-top: 0.5rem;">
	           	
	           	<div style="width: 100%;height: 40%;">
	           		
	           	  <div @click="js1" :class="{jiaqian:act.noa1,jiaqian_to:act.noe1}">
	           	  	  <p style="font-size: 0.34rem;margin-top: 0.1rem;">30币</p>
	           	  	  <p class="liu" style="font-size:0.3rem;color:#A6A6A6;margin-right:0.07rem;">￥3.00</p>
	           	  	  <img :class="{img_xia:acts.noa1,img_xia_to:acts.noe1}" src="../../../assets/img/xia1.png" alt="" />
	           	  </div>
	           	  
	           	  <div @click="js2" :class="{jiaqian:act.noa2,jiaqian_to:act.noe2}">
	           	  	 <p style="font-size: 0.34rem;margin-top: 0.1rem;">40币</p>
	           	  	  <p class="liu" style="font-size: 0.3rem;color:#A6A6A6;margin-right: 0.07rem;">￥4.00</p>
	           	  	  <img :class="{img_xia:acts.noa2,img_xia_to:acts.noe2}" src="../../../assets/img/xia1.png" alt="" />
	           	  </div>
	           	  <div @click="js3" :class="{jiaqian:act.noa3,jiaqian_to:act.noe3}">
	           	  	 <p style="font-size: 0.34rem;margin-top: 0.1rem;">50币</p>
	           	  	  <p class="liu" style="font-size: 0.3rem;color:#A6A6A6;margin-right: 0.07rem;">￥5.00</p>
	           	  	  <img :class="{img_xia:acts.noa3,img_xia_to:acts.noe3}" src="../../../assets/img/xia1.png" alt="" />
	           	  </div>
	           	</div>
	           	 
	           	<div style="width: 100%;height: 40%;">
	           		
	           	  <div @click="js4" :class="{jiaqian:act.noa4,jiaqian_to:act.noe4}">
	           	  	 <p style="font-size: 0.34rem;margin-top: 0.1rem;">60币</p>
	           	  	  <p class="liu" style="font-size: 0.3rem;color:#A6A6A6;margin-right: 0.07rem;">￥6.00</p>
	           	  	  <img :class="{img_xia:acts.noa4,img_xia_to:acts.noe4}" src="../../../assets/img/xia1.png" alt="" />
	           	  </div>
	           	  <div @click="js5" :class="{jiaqian:act.noa5,jiaqian_to:act.noe5}">
	           	  	 <p style="font-size: 0.34rem;margin-top: 0.1rem;">70币</p>
	           	  	  <p class="liu" style="font-size: 0.3rem;color:#A6A6A6;margin-right: 0.07rem;">￥7.00</p>
	           	  	  <img :class="{img_xia:acts.noa5,img_xia_to:acts.noe5}" src="../../../assets/img/xia1.png" alt="" />
	           	  </div>
	           	  <div @click="js6" :class="{jiaqian:act.noa6,jiaqian_to:act.noe6}">
	           	  	 <p style="font-size: 0.34rem;margin-top: 0.1rem;">80币</p>
	           	  	  <p class="liu" style="font-size: 0.3rem;color:#A6A6A6;margin-right: 0.07rem;">￥8.00</p>
	           	  	  <img :class="{img_xia:acts.noa6,img_xia_to:acts.noe6}" src="../../../assets/img/xia1.png" alt="" />
	           	  </div>
	           	  
	           	</div>
	           </div>
	       </div>
	     <button class="btns" style="width: 6.4rem;height: 0.9rem;background:#2E3135;">
	   	   	确认充值</button>
	   </div>
	  
	   	   
	  
	</div>
</template>

<script>
	import store from '../../../vuex/store.js'
	export default{
		store,
		data(){
			return{
				act:{
					noa1:true,noe1:false,
					noa2:true,noe2:false,
					noa3:true,noe3:false,
					noa4:true,noe4:false,
					noa5:true,noe5:false,
					noa6:true,noe6:false,
				   },
				  acts:{
					noa1:true,noe1:false,
					noa2:true,noe2:false,
					noa3:true,noe3:false,
					noa4:true,noe4:false,
					noa5:true,noe5:false,
					noa6:true,noe6:false,
				   },
			}
		},
		methods:{
			hui(){
				//console.log(this.$store.state.Return_to_return)
				
			    if(this.$store.state.Return_to_return == 1){
//			    	window.location = '/#/slider'
			    		this.$router.push({
						path: '../slider'
						});
			    }
			    if(this.$store.state.Return_to_return == 2){
//			    	window.location = '/#/works_detail'
			    	this.$router.push({
						path: '../works_detail'
						});
			    }
				if(this.$store.state.Return_to_return == 3){
//			    	window.location = '/#/personal_data'
			    	this.$router.push({
						path: '../personal_data'
						});
			    }
				if(this.$store.state.Return_to_return == 4){
//			    	window.location = '/#/popularity_list'
			    	this.$router.push({
						path: '../popularity_list'
						});
			    }
				if(this.$store.state.Return_to_return == 5){
//			    	window.location = '/#/Details_of_the_article'
this.$router.push({
						path: '../Details_of_the_article'
						});

			    }
				if(this.$store.state.Return_to_return == 6){
//			    	window.location = '#/mywallet'
			    	this.$router.push({
						path: '../mywallet'
						});
			    }
				
			},
			
			js1(){
			   this.act.noa1=false;this.act.noe1=true; this.acts.noa1=false;this.acts.noe1=true;
			   this.act.noa2=true;this.act.noe2=false; this.acts.noa2=true;this.acts.noe2=false;
			   this.act.noa3=true;this.act.noe3=false; this.acts.noa3=true;this.acts.noe3=false;
			   this.act.noa4=true;this.act.noe4=false; this.acts.noa4=true;this.acts.noe4=false;
			   this.act.noa5=true;this.act.noe5=false; this.acts.noa5=true;this.acts.noe5=false;
			   this.act.noa6=true;this.act.noe6=false; this.acts.noa6=true;this.acts.noe6=false;
			},
			js2(){
				this.act.noa1=true;this.act.noe1=false; this.acts.noa1=true;this.acts.noe1=false;
			   this.act.noa2=false;this.act.noe2=true; this.acts.noa2=false;this.acts.noe2=true;
			   this.act.noa3=true;this.act.noe3=false; this.acts.noa3=true;this.acts.noe3=false;
			   this.act.noa4=true;this.act.noe4=false; this.acts.noa4=true;this.acts.noe4=false;
			   this.act.noa5=true;this.act.noe5=false; this.acts.noa5=true;this.acts.noe5=false;
			   this.act.noa6=true;this.act.noe6=false; this.acts.noa6=true;this.acts.noe6=false;
			},
			js3(){
				this.act.noa1=true;this.act.noe1=false; this.acts.noa1=true;this.acts.noe1=false;
			   this.act.noa2=true;this.act.noe2=false; this.acts.noa2=true;this.acts.noe2=false;
			   this.act.noa3=false;this.act.noe3=true; this.acts.noa3=false;this.acts.noe3=true;
			   this.act.noa4=true;this.act.noe4=false; this.acts.noa4=true;this.acts.noe4=false;
			   this.act.noa5=true;this.act.noe5=false; this.acts.noa5=true;this.acts.noe5=false;
			   this.act.noa6=true;this.act.noe6=false; this.acts.noa6=true;this.acts.noe6=false;
			},
			js4(){
				this.act.noa1=true;this.act.noe1=false; this.acts.noa1=true;this.acts.noe1=false;
			   this.act.noa2=true;this.act.noe2=false; this.acts.noa2=true;this.acts.noe2=false;
			   this.act.noa3=true;this.act.noe3=false; this.acts.noa3=true;this.acts.noe3=false;
			   this.act.noa4=false;this.act.noe4=true; this.acts.noa4=false;this.acts.noe4=true;
			   this.act.noa5=true;this.act.noe5=false; this.acts.noa5=true;this.acts.noe5=false;
			   this.act.noa6=true;this.act.noe6=false; this.acts.noa6=true;this.acts.noe6=false;
			},
			js5(){
				this.act.noa1=true;this.act.noe1=false; this.acts.noa1=true;this.acts.noe1=false;
			   this.act.noa2=true;this.act.noe2=false; this.acts.noa2=true;this.acts.noe2=false;
			   this.act.noa3=true;this.act.noe3=false; this.acts.noa3=true;this.acts.noe3=false;
			   this.act.noa4=true;this.act.noe4=false; this.acts.noa4=true;this.acts.noe4=false;
			   this.act.noa5=false;this.act.noe5=true; this.acts.noa5=false;this.acts.noe5=true;
			   this.act.noa6=true;this.act.noe6=false; this.acts.noa6=true;this.acts.noe6=false;
			},
			js6(){
			   this.act.noa1=true;this.act.noe1=false; this.acts.noa1=true;this.acts.noe1=false;
			   this.act.noa2=true;this.act.noe2=false; this.acts.noa2=true;this.acts.noe2=false;
			   this.act.noa3=true;this.act.noe3=false; this.acts.noa3=true;this.acts.noe3=false;
			   this.act.noa4=true;this.act.noe4=false; this.acts.noa4=true;this.acts.noe4=false;
			   this.act.noa5=true;this.act.noe5=false; this.acts.noa5=true;this.acts.noe5=false;
			   this.act.noa6=false;this.act.noe6=true; this.acts.noa6=false;this.acts.noe6=true;
			},
			
		},
		created(){
			this.$store.state.is_bottom = false;
		}
	}
</script>

<style scoped="scoped">
	*{
		outline:none;
	}
	.btns{
		border: none;
		border-radius: 0.1rem;
		color: white;
		margin-top: 0.3rem;
		font-size: 0.3rem;
	
	}
	
	.jiaqian{
		/*transition: 1s;*/
		width: 2rem;
		height: 1rem;
		border: 0.02rem solid #CACACA;
		border-radius: 0.15rem;
		float: left;
		margin-left: 0.15rem;
		position:relative;
		text-align: center;
	}
	.img_xia{
		display: none;
		
	}
	
	.jiaqian_to{
		width: 2rem;
		height: 1rem;
		border: 0.02rem solid black;
		border-radius: 0.15rem;
		float: left;
		margin-left: 0.15rem;
		position:relative;
		text-align: center;
	}
	.img_xia_to{
		width: 0.46rem;
		height: 0.46rem;
		position: absolute;
		right: 0;
		bottom: 0;
		display: block;
	}
	.liu{
		margin-top: -0.07rem;
	}
		.gong_class{
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
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