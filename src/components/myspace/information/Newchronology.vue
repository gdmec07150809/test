<template>
	<div style="width: 100%;">
		<!--
        	描述：新增艺术年表
        -->
		<!--<div class="box_top" style="width: 100%;height: 0.88rem;background: white;position: absolute;top: 0;left: 0;line-height: 0.88rem;">
	   		<img @click="hui" style="width: 0.4rem;height: 0.4rem;float: left;margin:0.25rem 0.3rem;" src="../../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;margin-left: 3.1rem;">新增年表</p>
	   		 
	   		
	   		
	  </div>-->
		 <div class="head">
	   		<div style="width: 10%; float: left;">
				<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../../assets/img/zuo.png" @click="hui"/>
			</div>
			<div class="title">
			<p>新增年表</p>
			</div>
			<div style="width: 10%;float:right;">
				<p @click="huis" style="font-size: 0.3rem;color:rgb(255, 157, 0);display: block;">新增</p>
			</div>
		</div>
		<div style="width:95%;height:90%;float: right;margin-top: 1rem;">
			
		    <div @click="xls" style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #EEEEEE;">
	   	  	  	<p style="font-size:0.3rem;color:black;float: left;" >{{values.artYear}}</p>
	   	  	  	    
	   	  	  	    <!--<i style="font-size: 0.5rem;float: right;margin: 0.25rem;" class="fa fa-angle-right"></i>-->
	   	  	  	    <img src="../../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0.3rem;" />
	   	  	  </div>
		    <div style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #EEEEEE;">
	   	  	  	<input class="inps" v-model="values.artEvent" type="text" placeholder="请填写年表内容"/>
	   	  	  	
	   	  	  </div>
		    
		   
		</div>
		
		
		<!--
        	作者：2443611475@qq.com
        	时间：2018-04-16
        	描述：年份选择
        -->
		<div style="position: relative;z-index: 99999;">
          <mt-datetime-picker :startDate="startDate" :endDate="endDate" v-show="show_d" @cancel="handleCancel" @confirm="handleConfirm" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value}日">
		  </mt-datetime-picker>
	    </div>
		
		
		<!--<div class="box_bottom">
	   	   <button @click="huis" class="btns" style="width: 6.4rem;height: 0.9rem;background:#2E3135;">
	   	   	确认新增</button>
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
				startDate: new Date('1980/01/01'),
				endDate: new Date(),
				show_d:false,
				xl:false,
				values:{
					artYear:'请添加时间',
					artEvent:''
			    },
					
				 
			}
		},
		methods:{
			handleCancel(){
				this.show_d=false
			},
			handleConfirm(e) {//选择生日
				var d = new Date(e);
				var youWant = d.getFullYear() + '-' + (d.getMonth() + 1);
				
				this.values.artYear = youWant;
				
				this.show_d = false;
			},
			hui(){
//				window.location = '#/Artchronology'
				this.$router.push({
						path: '../Artchronology'
						});
			},
			huis(){
				
			    //console.log(this.$store.state.nian_biao,'123')
			    
			   if(this.values.artEvent!=''&&this.values.artYear!='选择获奖年份'){
				this.$store.state.nian_biao.push(this.values)
				this.values = {}
				this.values.artYear = '选择获奖年份'
				this.values.artEvent = ''
//				window.location = '#/Artchronology'
				this.$router.push({
						path: '../Artchronology'
						});
				}else if(this.values.artEvent==''){
					  Toast({
									message: "内容不能为空",
									position: 'middle',
									duration: 2000
								});
				}else if(this.values.artYear=='选择获奖年份'){
					  Toast({
									message: "请选择年份",
									position: 'middle',
									duration: 2000
								});
				}
			   
			   
			},
			xls(){
				this.show_d = true
			},
			
			
			
			
		}
	}
</script>

<style scoped="scoped">
	*{
		outline:none;
	}
	.inps{
		font-size:0.3rem;height:1rem;width:100%;border:none;
		border-bottom: 0.005rem solid #EEEEEE;
	}
	.box_bottom{
		width: 100%;
		height: 1.4rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 300;
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