<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-21
    	描述：打赏
    -->
	<div class="box_b" id="box" style="">
		<div @click="dashang" style="width: 100%;height: 100%;background:rgba(0,0,0,.05);">
			<div style="width:100%;height:11.2rem;background:rgba(255,255,255,0.95);position: fixed;bottom: 0rem;left: 0;">
			<div class="head">
				<div class="head_left">
					<dt></dt>
					<p>礼物打赏</p>
				</div>
				<p class="head_right"  @click="dashang">
					取消
				</p>
			</div>
			<div class="box-tb">

				<div v-for="(i,index) in $store.state.gift_data.artGift"  @click.stop="js1(index)" class="box_child" :class="{box_childs:noa1==index}">
					<img  :src="i.giftPicUrl" style="width:50%;border-radius:0.15rem;margin-top:0.2rem;"></img>
					<p style="font-size: 0.28rem;margin-top: 0.1rem;">{{i.giftVirtualCurrency}}觅币</p>
					<p class="miyi" style="font-size: 0.24rem;color: #969696;">( {{i.valueRmb}} )</p>
				</div>
			</div>	
			<div style="width:100%;height: 1.2rem;line-height: 1.2rem;">
				<img style="width: 0.44rem;height: 0.44rem;float:left;margin-top:0.38rem;margin-left: 0.4rem;" src="../../assets/img/64-jinbi.png" />
				<p style="font-size: 0.34rem;float:left;margin-left:0.1rem;">{{$store.state.gift_data.opGift}}</p>
				<button @touchstart="A_reward" style="width:1.3rem;height:0.56rem;border:none;border-radius:0.1rem;background-image:linear-gradient(to right,#ff9d00,#ff9d00);font-size:0.3rem;color:white;float:right;margin-top:0.32rem;outline:none;line-height:0.56rem;margin-right:0.5rem;">
				 	打赏</button>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import { Toast } from 'mint-ui';
	import md5 from 'js-md5';
	export default {
		store,
		data() {
			return {
				noa1:'s',
				
				act:[1,1],
				jia:{giftId:''}
			}
		},

		methods: {
			dashang() {
				this.$store.state.dashang = false
				this.$store.state.guanzhu=true;
				 this.$store.state.is_bottom = true
				//console.log(this.$store.state.Return_to_return,"333333333333333333333")
//				if(this.$store.state.Return_to_return == 1){
//					this.$router.push({
//						path: '../slider'
//						});
//					
//				}
//				if(this.$store.state.Return_to_return == 2){
//					this.$router.push({
//						path: '../works_detail'
//						});
//					
//				}
//				if(this.$store.state.Return_to_return == 3){
//					this.$router.push({
//						path: '../personal_data'
//						});
//					
//				}
//				if(this.$store.state.Return_to_return == 4){
//					this.$router.push({
//						path: '../square/popularity_list'
//						});
//					this.$store.state.Return_to_return =1
//				}else if(this.$store.state.Return_to_return == 5){
//					this.$router.push({path:'../square/BS_Graduation_season'})
//					this.$store.state.Return_to_return =1
//				}
//				if(this.$store.state.Return_to_return == 5){
//					
//					this.$router.push({
//						path: '../Details_of_the_article'
//						});
//				}
//				if(this.$store.state.Return_to_return == 6){
//					
//					this.$router.push({
//						path: '../square/dynamic'
//						});
//				}
//				if(this.$store.state.Return_to_return == 7){
//					
//					this.$router.push({
//						path: '../square/The_headlines'
//						});
//				}
//				if(this.$store.state.Return_to_return == 8){
//					
//					this.$router.push({
//						path: '../square/depth'
//						});
//				}
				
				this.$emit('refreshList');
                
			},
			ad() {
				//console.log(this.active.noa1)
				
			},
			js1(index) {//当任意    小礼物被点击
				  this.noa1 = index
				 
                  this.jia = this.$store.state.gift_data.artGift[index]//显示当前 被选中的价格 到下方
               
			},
			 
			 tiao(){
			 	this.$router.push({
						path: '../Rechargepage'
						});
			 },
		
			open2() {
				this.$confirm('由于您余额不足，是否跳转至支付界面进行充值?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var _this=this;
					this.$message({
						type:'success',
						message:_this.tiao()
//						message: window.location = '/#/Rechargepage'

					});
				}).catch(() => {
					this.$message({
						type: 'info',
//						message: '已取消'
                        
					});
				});
			},
           
           
			A_reward(){ //打赏按钮被点击--》发送数据给后台。事件
				
				
				/*评论打赏*/
				if(this.$store.state.is_comment_dashang){
						
				
				var url=this.$store.state.request_url+"/api/map/art/artReward.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
				
				//console.log(this.$store.state.A_reward,'—————————添加打赏当前作品数据————————')
				 this.List_of_gifts()
				if(this.jia.giftId!=''){
				this.$http({
					url: this.$store.state.request_url+"/api/map/art/artReward.do?memId="+id+"&ts="+ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body:{
						opId:this.$store.state.data.memId,//打赏会员ID
						rewardOpId: this.$store.state.A_reward.disOpId,//被打赏会员ID
						rewardType:this.$store.state.dashangtype,//打赏类型 分为: 1作品，2闲情，3热点，4深度,5评论
						artId: this.$store.state.A_reward.disId,//被打赏的作品ID
						giftId: this.jia.giftId,//打赏礼物ID
						giftTotal:"1"//打赏礼物数量
					}
				}).then(function(response) {
					 //console.log(response.body.meta,'打赏结果')
					if(response.body.meta.res == '00000') {
						
						this.List_of_gifts()
						Toast({
											message: '打赏成功',
											position: 'middle',
											duration: 2000
										});
							this.$store.state.is_comment_dashang=false;//恢复打赏作品
						 //this.dashang()//打赏成功---》关闭打赏窗口
						     
						      this.$store.state.is_bottom = true
						    
						 	this.$store.state.dashang = false
						
							if(this.$store.state.Return_to_return == 4){
					this.$router.push({
						path: '../square/popularity_list'
						});
					this.$store.state.Return_to_return =1
				}else if(this.$store.state.Return_to_return == 5){
					
					this.$router.push({path:'../square/BS_Graduation_season'})
					
					this.$store.state.Return_to_return =1
				}
					
						 	////console.log(this.$store.state.Return_to_return,"333333333333333333333")
						 
					}else if(response.body.meta.res == '30001'){
						//余额不足情况
						//this.open2()
						//console.log("111111111111111111111111111")
						this.$store.state.is_pay=true
						
					}
				}).catch(function(err) {
					//console.log(err)
				})
			  }else if(this.jia.giftVirtualCurrency==0){
			  	Toast({
											message: '请选择你要打赏的礼物',
											position: 'middle',
											duration: 2000
										});
			  }
					
				}else{//作品打赏
					
				
				var url=this.$store.state.request_url+"/api/map/art/artReward.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
				
				console.log(this.$store.state.A_reward,'—————————添加打赏当前作品数据————————')
				 this.List_of_gifts()
				if(this.jia.giftId!=''){
				this.$http({
					url: this.$store.state.request_url+"/api/map/art/artReward.do?memId="+id+"&ts="+ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body:{
						opId:this.$store.state.data.memId,//打赏会员ID
						rewardOpId: this.$store.state.A_reward.opId,//被打赏会员ID
						rewardType: this.$store.state.A_reward.artFlag,//打赏类型 分为: 1作品，2闲情，3热点，4深度,5评论
						artId: this.$store.state.A_reward.artId,//被打赏的作品ID
						giftId: this.jia.giftId,//打赏礼物ID
						giftTotal:"1"//打赏礼物数量
					}
				}).then(function(response) {
					 //console.log(response.body.meta,'打赏结果')
					if(response.body.meta.res == '00000') {
						
						this.List_of_gifts()
						Toast({
											message: '打赏成功',
											position: 'middle',
											duration: 2000
										});
						this.$store.state.dashang = false
						// this.dashang()//打赏成功---》关闭打赏窗口
						 
					}else if(response.body.meta.res == '30001'){
						//余额不足情况
						//this.open2()
						//console.log("111111111111111111111111111")
						this.$store.state.is_pay=true
					}
				}).catch(function(err) {
					//console.log(err)
				})
			  }else if(this.jia.giftVirtualCurrency==0){
			  	Toast({
											message: '请选择你要打赏的礼物',
											position: 'middle',
											duration: 2000
										});
			  }
			}
			},
			
			List_of_gifts(){//页面刷新---》获取礼物列表数据
				var url=this.$store.state.request_url+"/api/map/art/artRewardGift.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				
			     this.$http({
					url: this.$store.state.request_url+"/api/map/art/artRewardGift.do?memId="+id+"&ts="+ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId:this.$store.state.data.memId,
						page:'1',
						rows:'1008'
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						
						this.$store.state.gift_data= response.body.data
						
						//console.log(this.$store.state.gift_data,'礼物列表数据,包含，当前用户余额，所有数据，礼物列表数据在  artGift 里面')
					}
				}).catch(function(err) {
					//console.log(err)
				})
		    },
			
		},
	
		created(){
			//console.log("进入打赏")
			this.List_of_gifts()
		},
		
		
		
	}
</script>

<style scoped="scoped">
	.box-tb {
		width: 100%;
		height: 9rem;
		overflow-y: auto;
		}
	
	.box_child {
		width: 25%;
		padding-top: 0.2rem;
		float: left;
		height: 3rem;
		padding-bottom: 0.3rem;
		text-align: center;
		
	}
	
	.box_childs {
		width: 25%;
		padding-top: 0.2rem;
		padding-bottom: 0.26rem;
		float: left;
		height: 3rem;
		text-align: center;
		border: 0.04rem solid #ff9d00;
	}
	
	.box-img {
		width: 50%;
		
		border-radius: 0.15rem;
		margin-top: 0.2rem;
		margin-left: 0.33rem;
	}
	
	.miyi {}
	.box_b{
		width: 100%;
		height: 100%;
		position:fixed;top: 0;left:0;
		z-index: 3000;
		background:rgba(0,0,0,0.4);
	}
	.head{
		width: 100%;
		height: 1rem;
		border-bottom: #EEEEEE 1px solid;
	}
	.head_left{
		width: 2rem;
		height: 1rem;
		float: left;
		text-align: center;
		
	}
	.head_left dt{
		height: 0.34rem;
		margin-top: 0.3rem;
		width: 6px;
		margin-left: 0.2rem;
		float: left;
		border-radius: 0.3rem;
		background-color: #FF9D00;
	}
	.head_left p{
		line-height: 1rem;
		float: left;
		font-size: 0.3rem;
		color: #000000;
		margin-left: 0.2rem;
	}
	.head_right{
		line-height: 1rem;
		float: right;
		margin-right: 0.2rem;
		font-size: 0.3rem;
		color: #000000;
		
	}
	
	
</style>