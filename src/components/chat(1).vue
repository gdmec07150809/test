<template>
	<div id="app">
		<div class="message_big">

			<div class="head">
				<img src="../assets/img/zuo.png" class="back" @click="back" />
				<p>{{$store.state.chat_item.fromNiceName}}</p>
				<!--<img src="../assets/img/icon_detail_more.png" class="share"/>-->
			</div>
			<ul id="mes_id" style="overflow-y:scroll;padding-top: 1rem;">
				<li v-for="chat in msgs">
					<div @click="to_personal_data(chat)" class="tou" :class="{fr:chat.fromOpId==$store.state.data.memId,fl:chat.fromOpId!=$store.state.data.memId}">
						<img v-if="chat.fromOpId!=$store.state.data.memId" :src="$store.state.chat_item.fromOpPic" />
						<img v-else :src="pic" />
					</div>
					<div :class="{fr:chat.fromOpId==$store.state.data.memId,fl:chat.fromOpId!=$store.state.data.memId}">
						<!--<img :src="chat.fromOpId!=$store.state.data.memId?'../../static/img/witch_icon.png':'../../static/img/black_icon.png'" :class="{fr_icon:chat.fromOpId==$store.state.data.memId,fl_icon:chat.fromOpId!=$store.state.data.memId}"  />-->
						<p style="padding: 0.2rem 0.2rem;">{{chat.message}}</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="dia">
			<div class="footer">
				<!--<div class="biaoqing">
					<img src="../assets/img/happy_icon.png" />
				</div>-->
                  
				<textarea type="text" v-model="content" placeholder="请输入..." ref="mes" maxlength="1000"></textarea>
				<div class="send" @touchstart="sendMessage">
					<p>发送</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import md5 from 'js-md5';
	import store from '../vuex/store.js'
	export default {
		store,
		data() {
			return {
				is_my: false,
				is_other: true,
			
				id: "",
				ws: null, //全局websocket变量
				content:"",
				chatContent: [],
				pic:'',//头像
				names:'',
				message: {}
			}
		},

		methods: {
			nink_chuli(e){
				
				if(e){
					if(e.indexOf("与")>-1){
					//console.log(e.split("与")[1].split("成")[0])
					
					return e.split("与")[1].split("通")[0];
				}
				}
				
			},
			to_personal_data(i){
//				this.$store.state.Author_s_detailed_routing = 5
//				this.$store.state.worksOpId = i.fromOpId
//				
//				this.$router.push({
//						path: '../personal_data'
//						});
			},
			
			back() {
				this.$router.push({
						path: '../personal_data'
					});
				if(this.$store.state.chat_tiao ==0){
					  this.$router.push({
							path: '../message/chat'
						})
				}else if(this.$store.state.chat_tiao ==1){
					this.$router.push({
							path: '../My_friend'
						})
				}
				
				
				
				//window.location = '/#/message/chat'
			},
			sendMessage() {

				var mes = this.$refs.mes.value.trim();

				if(mes != "") {
					
					if(mes.indexOf("$")==-1){
						
						var message = "{\"message\": \"" + mes + "\",\"toOpId\": \""+this.$store.state.chat_item.fromOpId+"\",\"fromOpId\": \""+this.$store.state.data.memId+"\",\"msgType\": \"msg\",\"fromNiceName\": \""+this.names+"\",\"fromOpPic\": \""+this.pic+"\"}";					

					//console.log(message,'555555',this.$store.state.data.memId,this.$store.state.new_ws.readyState)
					
					//向后台发送信息事件
					/*判断是否处于连接状态*/
					if(this.$store.state.new_ws.readyState == 1) {
  
							this.$store.state.tableList.mes=message;
							this.$store.state.tableList.setSend();
							
							var json = eval('(' + message + ')');
							this.chatContent.push(json)
							this.content=""
						
						
					}else{
						//console.log(this.$store.state.new_ws.readyState ,"前")
						/**先断开再创建连接*/
						this.$store.state.new_ws.close();
						this.$store.state.tableList.ConnectWebsocket();
						//console.log(this.$store.state.new_ws.readyState ,"后")
						this.$store.state.tableList.mes=message;
						if(this.$store.state.new_ws.readyState==1){
							
							this.$store.state.tableList.setSend();
							
							this.content=""
						}
											
//						var json = eval('(' + message + ')');
//							
//						this.chatContent.push(json)
							
					}
					
					
					this.getHistory();
					/*使滚动条置底*/
					this.$nextTick(() => {
						var container = this.$el.querySelector("#mes_id");
						container.scrollTop = container.scrollHeight;
					})
					
					}else{
						/*提示语*/
					Toast({
						message: '不能出现特殊符号：$',
						position: 'middle',
						duration: 2000
					});
					}

				} else {
					/*提示语*/
					Toast({
						message: '不能发送空数据',
						position: 'middle',
						duration: 2000
					});
				}
			},
				getHistory(){//页面刷新---》获取礼物列表数据
					this.chatContent=[];
					console.log(this.$store.state.chat_item,"9999999999999")
				var url=this.$store.state.request_url+"/api/map/user/selectChatInformationHistory.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				var that=this;
			     this.$http({
					url: this.$store.state.request_url+"/api/map/user/selectChatInformationHistory.do?memId="+id+"&ts="+ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						toId:this.$store.state.data.memId,
						fromId:this.$store.state.chat_item.fromOpId,
						
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						
						if(response.body.data.information!=null){
							var recoder=response.body.data.information.split("\n");
							console.log(recoder,"记录")
							for(var i=0;i<recoder.length;i++){
								var info={};
							
							if(recoder[i]!=""){
								info.fromOpId=recoder[i].split("$")[0];
								info.message=recoder[i].split("$")[recoder[i].split("$").length-1]
								if(info.fromOpId!=that.$store.state.data.memId){
									info.fromOpPic=that.$store.state.chat_item.fromOpPic;
								}
								
								that.chatContent.push(info);
							}
							
						}
							
						}
						console.log(response.body.data.information,"_________",that.chatContent,"1111111*********1111111")
					
					}
				}).catch(function(err) {
					//console.log(err)
				})
		    },

		},
		created() {
		
            //console.log(this.$store.state.chat_item)
            //console.log(localStorage.nickname)
            this.getHistory();//获取历史记录
			this.pic = localStorage.opPic
			this.names = localStorage.nickname
			
//			this.$store.state.chatContent.push(this.chatContent[this.chatContent.length-1])
			
		},

		mounted() {
			/*使滚动条置底*/
					this.$nextTick(() => {
						var container = this.$el.querySelector("#mes_id");
						container.scrollTop = container.scrollHeight;
					})
        
		},
		 computed:{
		 	msgs(){
		 			 	/*使滚动条置底*/
					this.$nextTick(() => {
						var container = this.$el.querySelector("#mes_id");
						container.scrollTop = container.scrollHeight;
					})
					
					//console.log(this.$store.state.msgs,this.$store.state.chat_item,"2222222222222")
					if(this.$store.state.msgs.fromOpId==this.$store.state.chat_item.toOpId){
						//console.log(this.$store.state.msgs.fromOpId,this.$store.state.chat_item.fromOpId,"*************")
						this.chatContent.push(this.$store.state.chat_item);
						this.$store.state.msgs={};	
					}
				
		 		
				console.log(this.chatContent,"*************")
		 		return this.chatContent;
		 	}
		 }
	}
</script>

<style scoped="scoped">
	input,
	textarea {
		outline: none;
	}
	#app{
		width: 100%;
		height: 13.3rem;
		position: relative;
		z-index: 300;
		background: white;
	}
	li {
		list-style-type: none;
	}
	
	* {
		font-family: "微软雅黑";
	}
	
	p,
	ul {
		margin: 0;
		padding: 0;
	}
	
	.fr {
		max-width: 63%;
		float: right;
	}
	
	.fl {
		max-width: 63%;
		float: left;
	}
	
	.head {
		height: 1rem;
		width: 100%;
		position: fixed;
		top: 0;
		background: rgba(246, 246, 246, 1);
	}
	
	.back {
		margin-top: 0.34rem;
		margin-left: 0.2rem;
		margin-right: 0.15rem;
		float: left;
		width: 0.32rem;
		height: 0.32rem;
		
	}
	
	.share {
			margin-top: 0.47rem;
		min-width: auto;
		height: 0.06rem;
		float: right;
		margin-right: 0.25rem;
	}
	
	.head p {
		width: 40%;
		float: left;
		font-size: 0.4rem;
		line-height: 1rem;
	}
	
	.message_big {
		width: 100%;
		position: absolute;
		top: 0;
		overflow-y: auto;
		height: 100%;
		padding-bottom: 1.2rem;
		background: rgba(246, 246, 246, 1);
	}
	
	ul {
		width: 100%;
		height: 100%;
	}
	
	ul li {
		width: 100%;
		font-size: 0.3rem;
		overflow: hidden;
		margin: 0.2rem auto;
		word-break: break-all;
	}
	
	.tou {
		width: 1rem;
		height: 1rem;
		margin: 0.2rem;
	}
	
	.tou img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	ul li p {
		word-break: break-all;
		/*换行*/
		margin-top: 0.2rem;
		border-radius: 0.1rem;
	}
	
	.fl p {
		background-color: #fff;
		border: 1px #d5d5d5 solid;
		/*-moz-box-shadow: 0.05rem 0.1rem 0.2rem #A6A6A6;
		-webkit-box-shadow: 0.05rem 0.1rem 0.2rem #A6A6A6;
		box-shadow: 0.05rem 0.1rem 0.2rem #A6A6A6;*/
		margin: 0.3rem auto;
	}
	
	.fr p {
		color: #000;
		background: #f1eff2;
		border: 1px #d5d5d5 solid;
		/*-moz-box-shadow: -0.05rem 0.1rem 0.2rem #A6A6A6;
		-webkit-box-shadow: -0.05rem 0.1rem 0.2rem #A6A6A6;
		box-shadow: -0.05rem 0.1rem 0.2rem #A6A6A6;*/
		margin: 0.3rem auto;
	}
	
	.fl_icon {
		width: 0.4rem;
		height: 0.5rem;
		float: left;
		position: relative;
		top: 0.45rem;
		left: -0.32rem;
	}
	
	.fr_icon {
		width: 0.4rem;
		height: 0.6rem;
		float: right;
		position: relative;
		top: 0.4rem;
		right: -0.3rem;
		/*-webkit-transform: rotateY(180deg);
            -moz-transform: rotateY(180deg);
            -o-transform: rotateY(180deg);
            -ms-transform: rotateY(180deg);
            transform: rotateY(180deg);*/
	}
	
	.dia {
		position: fixed;
		bottom: 0;
		z-index: 10;
		min-height: 1.1rem;
		max-height: 2rem;
		background-color: #fff;
		width: 100%;
		height: auto;
	}
	
	.dia p {
		height: 30%;
		line-height: 1.1rem;
		color: rgba(51, 51, 51, 1);
		font-size: 0.35rem;
		text-align: center;
	}
	
	.send {
		width: 18%;
		background-color: #000;
		height: 0.6rem;
		
		margin-top: 0.25rem;
		margin-right: 0.25rem;
		border-radius: 0.1rem;
		float: right;
	}
	
	.send p {
		color: #fff;
		line-height: 0.6rem;
		
		text-align: center;
		font-size: 0.3rem;
	}
	
	.biaoqing {
		float: left;
		width: 10%;
		height: 0.8rem;
		margin-left: 0.1rem;
		margin-top: 0.2rem;
	}
	
	.biaoqing img {
		width: 0.8rem;
		height: 0.7rem;
	}
	
	.footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 1.1rem;
		z-index: 4;
		-moz-box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
		/* 老的 Firefox */
		box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
	}
	
	.footer textarea {
	
		
		outline: none;
		float: left;
		position: absolute;
		width: 70%;
		font-size: 0.32rem;
		
		height: 0.8rem;
		bottom:0.15rem;
		margin-left: 3%;
		color: rgba(180, 180, 180, 1);
		border: #D8D8D8 solid 1px;
		padding-left: 0.2rem;
		border-radius: 0.15rem;
	}
	
	textarea::-webkit-input-placeholder {
		font-size: 0.32rem;
		line-height: 0.8rem;
	}
	
	textarea::-moz-placeholder {
		font-size: 0.32rem;
		line-height: 0.8rem;
	}
	
	textarea::-ms-input-placeholder {
		font-size: 0.32rem;
		line-height: 0.8rem;
	}
</style>