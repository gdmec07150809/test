<template>
	<div class="gong_class">
		<!--
        	描述：账户明细
        -->
	   <div class="head">
		<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../../assets/img/zuo.png" @click="hui"/>
		<div class="title">
		<p>账户明细</p>
		</div>
		</div>
	     <div style="width:100%;float:right;margin-top:0.88rem;position:relative;z-index:300;background: white;">
	        
	        <!--
            	作者：2443611475@qq.com
            	时间：2018-03-20
            	描述：打赏收入
            -->
	        <div v-for="(i,index) in actives_s" style="width: 95%;height: 1.5rem;position:relative;margin-left:5%;border-bottom: 0.005rem solid #F1F1F1;background: white;">
	        	<div style="height: 100%;width: 3rem;float: left;">
	        		<p style="font-size: 0.4rem;margin-top: 0.3rem;font-weight: 600;">{{
(i.rechargeSource==0)?'打赏支出':((i.rechargeSource==1)?"充值收入":((i.rechargeSource==2)?"打赏收入":((i.rechargeSource==3)?"赠送收入":((i.rechargeSource==4)?"交易收入":((i.rechargeSource==5)?"动账收入":'')))))
	        		                                                                                                  }}</p>
	        		<p style="font-size: 0.2rem;color: #BFBFBF;margin-top: 0.1rem;">{{i.insertDate}}</p>
	        	</div>
	        	
	        	<!--
                	描述：进账
                -->
	        	<div style="position: relative;top: 0;" v-if="(i.rechargeSource=='1'||i.rechargeSource=='2'||i.rechargeSource=='3'||i.rechargeSource=='4'||i.rechargeSource=='5')" 
	        		>
	        		<p style="font-size: 0.54rem;color: #FF9A2B;margin-top:0.15rem;text-align: right;margin-right:0.6rem;">+{{i.rechargeAmount}}</p>
	        		<p style="font-size: 0.25rem;color: #FF9A2B;margin-right:0.6rem;text-align: right;">(￥{{i.rechargeAmountRmb/100}})</p>
	        	</div>
	        	<!--
                	描述：出账
                -->
	        	<div v-else style="position: relative;">
	        		<p style="font-size:0.54rem;margin-top:0.15rem;text-align: right;margin-right:0.6rem;">-{{i.rechargeAmount}}</p>
	        		<p style="font-size:0.25rem;margin-right:0.6rem;text-align: right;">(￥{{i.rechargeAmountRmb/100}})</p>
	        	</div>
	        	
	        </div>
	        
	   </div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	export default{
		data(){
			return {
				actives_s:[],
			}
		},
		methods:{
			hui(){
//				window.location = '#/mywallet'
				this.$router.push({
						path: '../mywallet'
						});
			},
			
			huoqu(){
				var url=this.$store.state.request_url+"/api/map/user/balanceDetail.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				this.$http({
				url: this.$store.state.request_url+"/api/map/user/balanceDetail.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				emulateJSON: false,
				method:'post',
				body:{
					opId:this.$store.state.data.memId
//                   opId:'1'
				}
			}).then(function(response){
				  
				if(response.body.meta.res == '00000'){
					
                    this.actives_s = response.body.data.balanceDetailResponse
                    
                   // console.log(this.actives_s,'账户明细')
                   
				}
			}).catch(function(err){
				    //console.log(err)
			 })
			},
			
		},
		mounted(){
			this.huoqu()
		},
		computed:{
			plus_a(){
				let a=''
				for(var i=0;i<this.active_s.length;i++){
					if(this.active_s[i].symbol == 'plus'){
						 
					}
				}
			},
			
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
	.box_top{
		width: 100%;height: 0.88rem;background: white;position:fixed;top:0;
		line-height: 0.88rem;border-bottom: 0.005rem solid #CACACA;
		background: white;
		z-index: 301;
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
		z-index: 400;
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