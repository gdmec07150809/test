<template>
	<!--
    	作者：672423400@qq.com
    	时间：2018-06-11
    	描述：一分钟
    -->
	<div id="app" style="width: 100%;height: 100%;" >
		<div class="item_container" v-for="(item,index) in onMinute_data"  > 
			<div class="time">
				<p class="xing">{{item.weekDate}}</p>
				<p class="day">{{item.dateNow.replace("-","/").replace("-","/")}}</p>
			</div>
			
			<div class="tou" v-if="item.headLines.length>0">头条</div>
			<ul class="tou_ul">
				<li  v-for="j in item.headLines">{{j.secRefining}}</li>
				<!--<li>CFT主席：我们需要尊重这一代人对比特币的兴趣</li>
				<li>美投行：加密货币将暴跌90%，大众市场或被消灭</li>-->
			</ul>
			
			<div class="tou" style="margin-top: 0.6rem;" v-if="item.depth.length>0">深度</div>
			<ul class="tou_ul">
				<li v-for="j in item.depth">{{j.secRefining}}</li>
				<!--<li>CFT主席：我们需要尊重这一代人对比特币的兴趣</li>
				<li>美投行：加密货币将暴跌90%，大众市场或被消灭</li>-->
			</ul>
			<p class="tip">恭喜你，今天的新闻全部看完啦。</p>
			<div  :class="{signs_active:item.signInFlag=='yes',signs:item.signInFlag=='no'}" @click="qiandao(item.dateNow,item.signInFlag)" v-if="index==0" >{{item.signInFlag=="yes"?'已签到':'签到'}}</div>
			<p class="num">已有{{item.signInTotal}}人打卡签到</p>
			<div style="width:0.5rem;height:0.24rem;margin: 0.3rem auto 0; ">
				<img src="../../../assets/img/qiandao.gif" style="width: 100%;height: 100%;"/>
			</div>
			<p class="tip_01">想看详细信息？以下一分钟，让您了解更多！</p>
			
			<div class="item_detail" v-for="(d,index) in item.dateilData">
				<p class="title">{{index+1}}.{{d.secRefining}}</p>
				<p class="item_content">{{d.firRefining}}</p>
				<div class="angin" @click="to_airticle(d)">
					<img src="../../../assets/img/come_icon.png" />
					<p>再来5分钟，让您了解个透</p>
					
				</div>
			</div>
			
			<div style="height: 0.2rem;width: 100%;background-color: #F4F4F4;margin-top: 0.6rem;"></div>
		</div>
		<div class="more" @click="listenScroll">
				<p style="color: #D0D0D0;">{{more_text}}</p>
		</div>
		
		 <div v-show="xian_s" class="zhe"  @touchmove.prevent>
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="width:100%;height: 0.07rem;"></div>
				<p style="    font-size: 0.35rem;margin-top: 0.45rem;">你当前是“游客状态”无法操作，是否立即去登录?</p>
				<div  style="width:100%;height:1rem;margin-top: 0.56rem;border-top:0.02rem solid #E0E0E0;line-height: 1rem;">
					<div @click="shan_chu" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.38rem;">
						 确定
					</div>
					<div @click="shan_s" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.38rem;">
						 取消
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import store from '../../../vuex/store'
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';

	export default {
		store,
		data() {
			return {
				xian_s:false,
				qiandaoNum:0,
				qiandaoStr:'签到',
				onMinute_data:[],
				onMinute_detailData:[],
				sum:0,
				pages:1,
				is_dao:false,
				more_text:'点击加载更多'
			}
		},
		methods: {
			shan_chu(){
				 this.$router.push({
						path: '/home'
				 }); 
			},
			
			shan_s(){
		        this.xian_s = false
  	        },
			tiao_s(){
				let ev = ev||event
				this.diyix = ev.touches[0].clientX;
			    this.diyiy = ev.touches[0].clientY;
			},
			tiao(event){
				let ev = ev||event
				let dierx = ev.touches[0].clientX;
				let diery = ev.touches[0].clientY;
				  	var cdx = dierx-this.diyix
				  	var cdy = diery-this.diyiy
				  	let box_to = document.getElementsByClassName('angin')
				  	 if(Math.abs(cdx)<Math.abs(cdy)&&cdy<0){
						/**总高度*/
				  	 	var app_h=document.getElementById("app").scrollHeight/100;
				  	 	//console.log(app_h*0.8,box_to[box_to.length-1].getBoundingClientRect().top/100,app_h)
				  	   	if(box_to[box_to.length-1].getBoundingClientRect().top/100<=app_h){
				  	   		
				  	   		//加载更多
				  	   		if(this.onMinute_data.length<this.sum){
				  	   			//console.log("进来。。。。。。。。。。。。。")
				  	   			this.pages++;
				  	   			this.get_onMinute();
				  	   		}
				  	   	
				  	   	}
				  	 }
			     },
			qiandao(dateNow,signInFlag){
				
				if(localStorage.yous=='true'){
					this.xian_s=true
				}else{
					if(signInFlag=="no"){
					var url = this.$store.state.request_url + "/api/map/user/saveSignIn.do";
				var memId = this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				this.$http({
					url: this.$store.state.request_url + "/api/map/user/saveSignIn.do?memId=" + memId + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId, //当前用户Id	
						dateNow:dateNow
					}
				}).then(function(response) {

					if(response.body.meta.res == '00000') {
						Toast({
							message: '签到成功',
							position: 'middle',
							duration: 2000
						});
						//console.log(response.body,"签到。。。。。。。。。。。")
						//this.qiandaoNum=response.body.data.signInTotal;
						this.onMinute_data=[]
						this.pages=1;
						this.get_onMinute();
					}
				}).catch(function(err) {
					//console.log(err)
				})
				}
			 }
				
				
				
			},
			get_onMinute(){
				var url = this.$store.state.request_url + "/api/mapPlazaManager/showReleaseTime.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/showReleaseTime.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {
						page:this.pages,
						rows:"1"
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						//console.log(response.body.data,"一分钟")
						this.sum=response.body.data.sum;
						if(response.body.data.dateList[0]){
							this.more_text="点击加载更多"
							this.get_onMinute_data(response.body.data.dateList[0])
						}else{
							this.more_text="已经没有更多了"
						}
						
						
					} 
				}).catch(function(err){
					//console.log(err)
				})
			},
			get_onMinute_data(item){
				var url = this.$store.state.request_url + "/api/mapPlazaManager/showOneMinArticle.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/showOneMinArticle.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {
						date:item,
						opId:this.$store.state.data.memId
						
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						//console.log(response.body.data,"一分钟数据")
						
						/**处理数据*/
						var n_arr=[];
						var new_arr=response.body.data;
						
						for(var i=0;i<response.body.data.headLines.length;i++){
							n_arr.push(response.body.data.headLines[i])
						}
						for(var i=0;i<response.body.data.depth.length;i++){
							n_arr.push(response.body.data.depth[i])
						}
						new_arr.dateilData=n_arr;
						//console.log(new_arr,"222222")
						this.onMinute_data.push(new_arr);	
					} 
				}).catch(function(err){
					//console.log(err)
				})
			},
			to_airticle(i){
				
				if(localStorage.yous=='true'){
					this.xian_s=true
				}else{
					var item={};
				item.artId=i.artId;
				this.$store.state.zuopin_x=item;
				this.$store.state.tr = 61
				this.$router.push({
						path: '../Details_of_the_article'
						});
				}
				
				
			},
			
			
			
			
			get_onMinute_s(){//游客状态获取数据方法
				this.$http({
					url:this.$store.state.request_url + "/api/mapFreeVerification/touristsShowReleaseTime.do",
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
					},
					body: {
						page:this.pages,
						rows:"1"
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						this.sum=response.body.data.sum;
						if(response.body.data.dateList[0]){
							this.get_onMinute_data_s(response.body.data.dateList[0])
						}
					} 
				}).catch(function(err){
				})
			},
			get_onMinute_data_s(item){//游客状态获取数据方法
				this.$http({
					url:this.$store.state.request_url + "/api/mapFreeVerification/touristsShowOneMinArticle.do",
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
					},
					body: {
						date:item,
						opId:this.$store.state.data.memId
						
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						
						console.log('游客状态',response.body.data)
						/**处理数据*/
						var n_arr=[];
						var new_arr=response.body.data;
						
						for(var i=0;i<response.body.data.headLines.length;i++){
							n_arr.push(response.body.data.headLines[i])
						}
						for(var i=0;i<response.body.data.depth.length;i++){
							n_arr.push(response.body.data.depth[i])
						}
						new_arr.dateilData=n_arr;
						//console.log(new_arr,"222222")
						this.onMinute_data.push(new_arr);	
					} 
				}).catch(function(err){
					//console.log(err)
				})
			},
			/*监听滚动事件，上滑加载更多*/
			listenScroll() {
				if(this.more_text == "点击加载更多") {
							this.moreTap();
							}
//								var _that = this;
//								$(window).scroll(function() {
//									let scrollTop = $(window).scrollTop();
//									let windowTop = $(window).height();
//									let documentTop = $(document).height();
//									if(documentTop - windowTop <= scrollTop) {
//										//console.log("到底了")
//											if(_that.more_text == "加载更多") {
//												_that.moreTap();
//											}
//										
//									}
//								});
			},
			/*加载*/
			moreTap() {
				this.more_text = "加载中..."
				//加载更多
				 if(this.onMinute_data.length<this.sum){
				  	   			//console.log("进来。。。。。。。。。。。。。")
				  	   	this.pages++;
				  	   	this.get_onMinute();
				  }else{
				  	this.more_text = "已经没有更多了"
				  }
				
				
			},
			
		},
		created() {

			this.$store.state.is_bottom = true;
			if(localStorage.yous=='true'){//判断是否为游客状态
				this.get_onMinute_s()
			}else{
				this.get_onMinute();//获取数据
			}
			
		},
		mounted() {
				this.listenScroll();//监听到底
		}

	}
</script>

</script>

<style scoped="scoped">
	.xing {
		font-size: 0.47rem;
		font-family: SourceHanSansCN-Bold;
		color: rgba(51, 51, 51, 1);
		line-height: 0.23rem;
		font-weight: bold;
	}
	
	.day {
		margin-top: 0.4rem;
		font-size: 0.36rem;
		font-family: SimHei;
		color: rgba(51, 51, 51, 1);
		line-height: 0.23rem;
	}
	
	.time {
		margin-left: 0.3rem;
		margin-top: 0.5rem;
	}
	.item_container{
		overflow: hidden;
		margin-top: 0.3rem;
	}
	
	.tou{
		width:1rem;
		height:0.72rem;
		background:rgba(255,154,43,1);
		border-radius:0.05rem;
		line-height: 0.72rem;
		margin-bottom: 0.2rem;
		-moz-box-shadow:5px 5px 20px #d1d1d1;
		 -webkit-box-shadow:5px 5px 20px #d1d1d1; 
		 box-shadow:5px 5px 20px #d1d1d1;
		font-size:0.34rem;
		font-family:SimHei;
		text-align: center;
		margin-left: 0.3rem;
		margin-top: 0.5rem;
		color:rgba(255,255,255,1);
		
	}
	.tou_ul{
		width: 90%;
		margin-top: 0.5rem;
		margin-bottom: 1.2rem;
		margin-left: 0.55rem;
	}
	
	.tou_ul li{
		font-size:0.32rem;
		font-family:SimHei;
		margin-left: 0.3rem;
		color:rgba(51,51,51,1);
		line-height:0.68rem;
	}
	.tip{
		font-size:0.32rem;
		font-family:SimHei;
		color:rgba(178,178,178,1);
		text-align: center;
		line-height:1.08rem;
	}
	.tip_01{
		margin-top: 1rem;
		font-size:0.32rem;
		font-family:SimHei;
		color:rgba(51,51,51,1);
		line-height:1.08rem;
		text-align: center;
		margin-bottom: 0.8rem;
	}
	.signs{
		width:1.3rem;
		height:0.72rem;
		background:rgba(255,255,255,1);
		border-radius:0.08rem;
		line-height: 0.72rem;
		text-align: center;
		border:1px solid #080808;
		margin: 0.25rem auto 0;
		font-size:0.3rem;
		font-family:SimHei;
		color:rgba(51,51,51,1);
	}
	
	.signs_active{
		width:1.3rem;
		height:0.72rem;
		background:#FF9D00;
		border-radius:0.08rem;
		line-height: 0.72rem;
		text-align: center;
		margin: 0.25rem auto 0;
		font-size:0.3rem;
		font-family:SimHei;
		color:#FFFFFF;
	}
	.num{
		text-align: center;
		font-size:0.28rem;
		font-family:SimHei;
		color:rgba(178,178,178,1);
		line-height:0.84rem;
		margin-top: 0.2rem;
	}
	.item_detail{
		margin: 0 0.4rem;
		overflow: hidden;
	}
	.title{
		font-size:0.32rem;
		font-family:SimHei;
		color:rgba(255,161,1,1);
		line-height:0.6rem;
	}
	.item_content{
		margin-top: 0.3rem;
		font-size:0.3rem;
		font-family:SimHei;
		color:rgba(51,51,51,1);
		line-height:0.7rem;
	}
	.angin{
		width: 100%;
		overflow: hidden;
		margin-top: 0.16rem;
		margin-bottom: 0.6rem;
	}
	.angin p{
		float:right;
		font-size:0.3rem;
		font-family:SimHei;
		color:rgba(204,204,204,1);
	}
	.angin img{
		float: right;
		margin-top: 0.1rem;
		height: 100%;
		margin-left: 0.05rem;
		width: 0.2rem;
	}
	.zhe{
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 9994; 
		background: rgba(0,0,0,.6);
	}
	.zhe_1{
		width: 5rem;
		height: 3.2rem;
		background: white;
		margin: 0 auto;
		border-radius: 0.2rem;
		margin-top: 6rem;
		text-align: center;
	}
	
	.more {
		padding-top: 0.3rem;
		width: 100%;
		height: 1rem;
		text-align: center;
		padding-bottom: 0.5rem;
		background-color: #fff;
	}
	
	.more p {
		font-size: 0.3rem;
	}
</style>