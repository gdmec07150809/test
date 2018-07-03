<template>
	<div class="gong_class">
		<!--
        	作者：2443611475@qq.com
        	时间：2018-04-12
        	描述：我的关注
        -->
		<div style="width: 100%;height: 1rem;position: fixed;text-align:center;top:0;left: 0;z-index: 9992;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			
			<img @click="hui" style="width: 0.3rem;height: 0.3rem;position: absolute;left: 0.3rem;top: 0.35rem;display: block;" src="../../assets/img/zuo.png" alt="" />
	   	
	   		<p style="font-size: 0.36rem;line-height: 1rem;">我的关注</p>
		</div>
		<div style="height: 0.88rem;"></div>
			
		<div style="position: relative;" class="chat_box" v-for="item in new_active_fs">
		 <div @click="fensi(item)">	
		 <div class="imgs" style="overflow:hidden;">
			<img  style="min-height: 75%;max-height: 105%;min-width: 100%;" :src="item.opPic" alt="" />
		</div>		
			
			<div class="text_box">
				
				<p class="p_title" style="font-size: 0.34rem;margin-top: 0.35rem;margin-left: 0.2rem;">{{item.nickname}}</p>
				<p class="p_ss" style="font-size: 0.24rem;color: #B1B1B1;margin-left: 0.2rem;">{{item.signature?item.signature:'还未填写简介'}}</p>
				<div class="biao" @click.stop="canncel1(item)">取消关注</div>
			</div>
			</div>
		</div>
		<div  style="position: relative;" class="chat_box" v-for="item in new_my_friend">
		<div  @click="fensi(item)">
		<div class="imgs" style="overflow:hidden;">
			<img  style="min-height: 75%;max-height: 105%;min-width: 100%;" :src="item.opPic" alt="" />
		</div>		
			
			<!--<img class="imgs" style="" :src="item.opPic" alt="" />-->
			
			
			<div class="text_box">
				<div style="width: 4rem;overflow: hidden;">
					<p class="p_title" style="float:left;font-size: 0.34rem;margin-top: 0.35rem;margin-left: 0.2rem;display: block;" >{{item.nickname}}</p> <p class="goodf" >好友</p>
				</div>
				<p  class="p_ss" style="font-size: 0.24rem;color: #B1B1B1;margin-left: 0.2rem;">{{item.signature?item.signature:'还未填写简介'}}</p>
				<div class="biao" @click.stop="canncel(item)">取消好友</div>
			
			</div>
		</div>	
		</div>
		
		<div v-show="xian_s" class="zhe" @touchmove.prevent @click="shan_s">
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 1.9rem;">
					<p style="font-size:0.32rem;">{{tip}}</p>
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
		
		
			<div class="no_article" v-if="new_active_fs.length==0&&new_my_friend.length==0">
				<img src="../../assets/img/icon_noFriend.png" style="width: 100%;height: 100%;" />
				<p>您还未关注任何人</p>
			</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import store from '../../vuex/store'
	import { Toast } from 'mint-ui';
	export default{
		store,
		data(){
			return{
			   attentions:[],//旧关注
			   my_friend:[],//旧好友
			   new_active_fs:[],//新关注
			   new_my_friend:[],//新好友
			   xian_s:false,
			   item:{},//储存单个数据，用于删除
			   tip:""//用于删除提示
			   
			}
		},
		methods:{
			hui(){
//				window.location ='#/myspace'
				 this.$router.push({
						path: '../myspace'
						});
			},
			/*获取关注列表*/
			getAttention(){
				var url = this.$store.state.request_url + "/api/map/user/artUserLists.do";
				var memId =this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				
				this.$http({
				url: this.$store.state.request_url + "/api/map/user/artUserLists.do?memId="+memId+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					"sIgn":sign
				},
				emulateJSON: false,
				method: 'post',
				body: {
					opId:this.$store.state.data.memId,
					typeId:'3'
				}
			}).then(function(response) {
				if(response.body.meta.res == '00000'){
                    this.attentions = response.body.data
                    //console.log("___________关注_________________")
                    //console.log(this.attentions)
                    /*确保有数据才进行下一步请求*/
                    if(this.attentions.length>0){
                    	this.getFriend();
                    }
                    
				}
			}).catch(function(err){
				//console.log(err)
			})
			},
			/*获取好友列表*/
			getFriend(){
				var url = this.$store.state.request_url + "/api/map/user/artUserLists.do";
				var memId =this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				
				this.$http({
				url: this.$store.state.request_url+"/api/map/user/artUserLists.do?memId="+memId+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					"sIgn":sign
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
                   // console.log("___________好友_________________")
                   // console.log(this.my_friend)
                   
                   	this.find_fs();//找关注
                    this.find_friend();//找好友
				}
			}).catch(function(err){
				//console.log(err)
			})
			},	
			/*判断是否在数组内*/
			find_tong(arr,str){
				
				for(var i = 0; i < arr.length; i++){
        			if(str === arr[i].opId){
            		return true;
        		}
    		}
    			return false;
			},
			/*找关注*/
			find_fs(){
				for(var i=0;i<this.attentions.length;i++){
						
						if(!this.find_tong(this.my_friend,this.attentions[i].opId)){
								/*防止重复push*/
							if(!this.find_tong(this.new_active_fs,this.attentions[i].opId)){
								this.new_active_fs.push(this.attentions[i])
								
							}	
						}
				}
				
			},
			/*找好友*/
			find_friend(){
				for(var i=0;i<this.attentions.length;i++){
						
						if(this.find_tong(this.my_friend,this.attentions[i].opId)){
								/*防止重复push*/
							if(!this.find_tong(this.new_my_friend,this.attentions[i].opId)){
								this.new_my_friend.push(this.attentions[i])
								
							}	
						}
				}
				
			},
			//取消关注
			canncelAttention(){
				//console.log("111111111111111");
				
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
                  that.new_active_fs=[];
                  that.new_my_friend=[];
                   Toast({
							message: '取消成功',
							position: 'middle',
							duration: 2000
						});
                  that.getAttention();
                   // console.log("___________添加关注_________")
                   
                   // this.attention="已关注"
                 	
				}
			}).catch(function(err){
				//console.log(err)
			})
			},
			canncel(item){
				this.tip="是否确定取消该好友？";
				this.xian_s=true;
				this.item=item;
			},
			canncel1(item){
				this.tip="是否确定取消该关注？";
				this.xian_s=true;
				this.item=item;
			},
			shan_s(){
				this.xian_s=false;
			},
			fensi(i){
				this.$store.state.Author_s_detailed_routing = 7
			   this.$store.state.worksOpId = i.opId
//			   window.location = '#/personal_data'
			    this.$router.push({
						path: '../personal_data'
						});
			},
			
		},
		
		mounted(){
			this.$store.state.is_bottom=false;
			this.getAttention();	
		},
		computed:{
			
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
	   
	   border-radius: 50%;
	   position: absolute;
	   left: 0.3rem;
	   top: 0.3rem;
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
		border: 0.01rem solid #f1f1f1;
		text-align: center;
		line-height: 0.54rem;
		float: right;
		position: absolute;
		right: 0.2rem;
		bottom: 0.5rem;
		border-radius: 0.11rem;
		color: #ff9d00;
	}
	.gong_class{
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
	}
	.p_ss{
		width:4rem;
		height: 0.8rem;
		display: -webkit-box;  
display: -moz-box;  
overflow: hidden;  
text-overflow: ellipsis;  
word-break: break-all;  
-webkit-box-orient: vertical;  
-webkit-line-clamp:2;
	}
	.p_title{
		
		overflow: hidden;
        text-overflow:ellipsis;
         white-space: nowrap;

	}
	.goodf{
		float: left;
		font-size: 0.2rem;
		margin-left:0.2rem;
		margin-top: 0.43rem;
		background-color:#ff9d00 ;
		color: #fff;
		border-radius: 0.05rem;
		line-height: 0.23rem;
		padding: 0.04rem 0.13rem;
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