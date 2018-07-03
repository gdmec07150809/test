<template>
	<div class="gong_class">
		<!--
        	描述：我的钱包
        -->
	     <div class="head">
		<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../assets/img/zuo.png" @click="hui"/>
		<div class="title">
		<p>我的钱包</p>
		</div>
		</div>
	     <div style="width:93%;height:90%;float: right;margin-top: 0.88rem;">
	        
	       <div @click="to_Accountdetails" style="width:6.4rem;height:3.1rem;margin-top:1rem;text-align: center;border-radius: 0.1rem;position:relative;">
	       	   <!--()-->
	       	 <img style="width:100%;height:100%;" src="../../assets/img/icon_purse_card.png" alt="" />  
	       	<div style="width:100%;height:100%;position: absolute;top: 0;">
	       	 <p style="font-size: 0.3rem;float: left;margin-top: 0.4rem;margin-left: 40.5%;">当前觅币(个)</p>
	       	  <div style="font-size:0.45rem;float:left;margin-top: 0.3rem;;font-weight: 600;width: 100%;text-align: center;">{{$store.state.opGift}}</div>
	       	  
	       	  <p  style="font-size: 0.3rem;float: left;margin-top: 0.3rem;margin-left: 35%;">查看账户明细
	       	  	</p><i style="font-size: 0.5rem;float: left;margin-top: 0.22rem;margin-left: 0.3rem;" class="fa fa-angle-right"></i>
	       	  </div>
	       	  
	       	  
	       </div>
	       
	       
	     <!--<button @click="to_Rechargepage" class="btns" style="width: 6.4rem;height: 0.9rem;background:#2E3135;margin-top: 0.7rem;">
	   	   	我要充值</button>一期隐藏-->
	   </div>
	  
	   	   
	  
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default{
		store,
		methods:{
			hui(){
//				window.location = '#/myspace'
				this.$router.push({
						path: '../myspace'
						});
			},
			to_Accountdetails(){
//				window.location = '#/Accountdetails'
				this.$router.push({
						path: '../Accountdetails'
						});
			},
			to_Rechargepage(){
//				window.location = '#/Rechargepage'
				this.$router.push({
						path: '../Rechargepage'
						});
				this.$store.state.Return_to_return=6
				
			},
			
			
		  huoqu(){
		  	var url=this.$store.state.request_url+"/api/map/user/userBalance.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
		  	this.$http({
				url: this.$store.state.request_url+"/api/map/user/userBalance.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				emulateJSON: false,
				method: 'post',
				body:{
					opId:this.$store.state.data.memId
				}
			}).then(function(response) {
				//console.log(response.body)
				if(response.body.meta.res == '00000'){
                    this.$store.state.opGift = response.body.data.opGift
                     this.$store.state.opRemaining=response.body.data.opRemaining
				}
			}).catch(function(err){
				//console.log(err)
			 })
		  },
			
			
			
		},
		mounted(){
			this.$store.state.is_bottom=false;//底部栏显隐
			this.huoqu()
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
		.gong_class{
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
	}
</style>