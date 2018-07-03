<template>
	<div class="gong_class">
		<div style="width: 100%;height: 1rem;position: fixed;top:0;left: 0;z-index: 9992;text-align:center;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<img @click="hui" style="width: 0.3rem;height: 0.3rem;position: absolute;left: 0.3rem;top: 0.35rem;" src="../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;line-height: 1rem;">我的好友</p>
		</div>
		<div style="height: 0.88rem;"></div>
			
		<div style="position: relative;" class="chat_box" v-for="item in my_friend" @click="toPersonal(item)">
			
		  <div class="imgs" style="overflow: hidden;">
			<img style="min-height: 75%;max-height: 105%;min-width: 100%;" :src="item.opPic" alt=""  />
		  </div>	
			
			<div  class="text_box">
				
				<p class="p_title" style="font-size: 0.34rem;margin-top: 0.35rem;margin-left: 0.2rem;">{{item.nickname}}</p>
				
				<p class="bs" style="-webkit-box-orient:vertical">{{item.signature?item.signature:'还未填写简介'}}</p>
				
				<div class="biao"  @click.stop="cannelfriend(item)">取消好友</div>
			</div>
		</div>
		
		<div v-show="xian_s" class="zhe" @touchmove.prevent @click="shan_s">
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 1.9rem;">
					<p style="font-size:0.32rem;">是否确定取消该好友?</p>
				</div>

				<div style="width:100%;height:0.96rem;border-top:0.02rem solid #E0E0E0;line-height: 0.96rem;">
					<div @click="canncelAttention" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.32rem;">
						确定
					</div>
					<div @click="shan_s" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.32rem;color: #CCCCCC;">
						取消
					</div>
				</div>

			</div>
		</div>
			<div class="no_article" v-if="my_friend.length==0">
				<img src="../../assets/img/icon_noFriend.png" style="width: 100%;height: 100%;" />
				<p>您还未添加好友</p>
			</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';
	export default{
		store,
		data(){
			return{
			
			   my_friend:[],//好友
			   xian_s:false,
			   item:{}//临时储存单个数据，用于删除
			  
			}
		},
		methods:{
			cannelfriend(item){
				this.xian_s=true;
				this.item=item;
			},
			shan_s(){
				this.xian_s=false;
			},
			tiao(i){
//				//console.log(i,'详情')
//				this.$store.state.Author_s_detailed_routing = 5
//			    this.$store.state.worksOpId = i.opId
////			    window.location = '#/personal_data'
      
               this.$store.state.chat_tiao = 1
                this.$store.state.chat_item.fromOpId = i.opId
                this.$store.state.chat_item.fromNiceName = i.nickname
                this.$store.state.chat_item.fromOpPic = i.opPic
                
			    this.$router.push({
						path: '../chat_to'
						});
			},
			toPersonal(i){
				this.$store.state.worksOpId=i.opId;
				this.$store.state.Author_s_detailed_routing=5;
				this.$router.push({
						path: '../personal_data'
						});
			},
			hui(){
				
				if(this.$store.state.adcal == 2){
					
					this.$router.push({
						path: '../myspace'
					});
					
				}else if(this.$store.state.adcal == 1){
					
					this.$router.push({
						path: '../message/chat'
					});
					
				}
//				window.location ='#/myspace'
			},
			/*获取好友列表*/
			getFriend(){
				var url=this.$store.state.request_url+"/api/map/user/artUserLists.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
		        
		        
				//console.log("进来");
				this.$http({
				url: this.$store.state.request_url+"/api/map/user/artUserLists.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				emulateJSON: false,
				method: 'post',
				body: {
					opId:this.$store.state.data.memId,
					typeId:'1'
				}
			}).then(function(response) {
				
				if(response.body.meta.res == '00000'){
                    this.my_friend = response.body.data
                    //console.log("___________好友_________________")
                    //console.log(this.my_friend)
				}
			}).catch(function(err){
				//console.log(err)
			})
			},
			//取消关注
			canncelAttention(){
				
				
				var url=this.$store.state.request_url+"/api/map/art/cancelAttention.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				var that=this;
				this.$http({
				url: this.$store.state.request_url+"/api/map/art/cancelAttention.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				emulateJSON: false,
				method: 'post',
				body: {
					opId:this.$store.state.data.memId,
					attentionOpId:this.item.opId,
				}
				}).then(function(response) {
					//console.log(response.body,"--------------")
				if(response.body.meta.res == '00000'){
					that.my_friend=[];
                   Toast({
							message: '取消成功',
							position: 'middle',
							duration: 2000
						});
                  	that.getFriend();
                   // console.log("___________添加关注_________")
                   
                   // this.attention="已关注"
                 	
				}
			}).catch(function(err){
				//console.log(err)
			})
			},
			
		},
		mounted(){
			this.$store.state.is_bottom=false;
				this.getFriend();//获取好友
			}
	}
</script>

<style scoped="scoped">
	.chat_box{
		width: 100%;
		height: 1.7rem;
		margin-top: 0.02rem;
		background: white;
		
	}
	.imgs{
		width: 1.1rem;height:1.1rem;
	   /*margin: 0.3rem;*/
	   position: absolute;
	   top: 0.3rem;
	   left: 0.3rem;
	   border-radius: 50%;
	}
	.text_box{
		width: 5.78rem;
		height: 100%;
		border-bottom:0.005rem solid #f1f1f1 ;
		float: right;
		position: relative;
	}
	.biao{
		font-size: 0.26rem;
		width: 1.3rem;
		height:0.54rem;
		border: 0.01rem solid #CACACA;
		text-align: center;
		line-height: 0.54rem;
		float: right;
		position: absolute;
		right: 0.2rem;
		bottom: 0.5rem;
		border-radius: 0.11rem;
		color: #ff9d00;
	}
	.bs{
		font-size: 0.24rem;color: #B1B1B1;margin-left: 0.2rem;
		width: 3.8rem;
		height: 0.7rem;
		display: -webkit-box;  
		display: -moz-box;  
		overflow: hidden;  
		text-overflow: ellipsis;  
		word-break: break-all;  
		-webkit-box-orient: vertical;  
		-webkit-line-clamp:2;
	}
	.gong_class{
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
	}
	.p_title{
		width: 3.8rem;
		overflow: hidden;
        text-overflow:ellipsis;
         white-space: nowrap;

	}
	
	.zhe {
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 300;
		background: rgba(0, 0, 0, .6);
	}
	
	.zhe_1 {
		width: 80%;
		height: 2.86rem;
		background: white;
		margin: 0 10%;
		border-radius: 0.12rem;
		margin-top: 6rem;
		text-align: center;
	}
	
	.no_article {
		width: 30%;
		margin-left: 35%;
		margin-top: 3rem;
		text-align: center;
	}
	
	.no_article p {
		color: #D0D0D0;
		font-size: 0.25rem;
		margin-top: 0.2rem;
	}
</style>