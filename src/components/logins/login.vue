<template>
	<div id="app">
		<div class="back" @click="backTo()">
			<img src="../../assets/img/zuo.png" />
			<p>返回</p>
		</div>
		<div class="title">
			<p class="title_p">手机登录</p>
			<p class="title_tip">请输入手机号码及密码</p>
		</div>

		<div class="phone">
			<p>手机</p>
			<input ref="name" type="tel" placeholder="请输入登录手机号码" maxlength="11" />
		</div>
		<!--<div class="down"></div>-->
		<div class="password">
			<p>密码</p>
			<input ref="password" type="password" placeholder="请输入您的登录密码" maxlength="12" />
		</div>
		<!--<div class="new_down"></div>-->
		<p class="forget" @click="forget">忘记密码？</p>
		<div class="sumbit" @click="login()">
			<p>马上登录</p>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import store from '../../vuex/store'
	import { Toast } from 'mint-ui';
	export default {
		store,
		data(){
			return{
				id:''
			}
		},
		methods: {
			backTo() {
				this.$router.push({
					path: '../home'
				})
			},
			login() {
				
				var reg = /^1[3|4|5|7|8][0-9]{9}$/;
				var reg_pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/; //密码正则，6-12位，包含一种数字一种字母
				var phone = this.$refs.name.value.trim()
				var password = this.$refs.password.value.trim()

				if(phone != null && phone != "") {
					if(phone.length==8){
								var m_pass = md5(password);
								var params = "{\"loginType\":\"1\",\"loginAccount\":\"" + phone + "\",\"loginPwd\":\"" + m_pass + "\",\"pid\":\"684589bb5b0e40059ceb41d71be23d8d\",\"rid\":\"631e32975df34e89a6ec9f58512b912f\",\"cpFlag\":\"0\",\"regEquipment\":\"WAP\"}";
								//console.log("登陆数据: " + params);
								this.$http({
									url: this.$store.state.request_url+'/api/user/login.do',
									method: 'post',
									headers: {
										"content-type": "application/json;charset=UTF-8"
									},
									body: params,
									emulateJSON: false,
								}).then(function(response) {

									if(response.body.meta.res === "00000") {	
										localStorage.memId=response.body.data.memId
                                        localStorage.tokEn=response.body.data.tokEn
                                        localStorage.info=response.body.data.info
										/*提示语*/
										Toast({
											message: '登录成功',
											position: 'middle',
											duration: 2000
										});
										
										
										//this.id=response.body.data.opId
//										this.connectWebSocket(response.body.data.memId);//登录即连接
										this.$router.push({path: '../slider'})
										//this.getUserInfo(response.body.data.memId,response.body.data.tokEn);/*获取用户信息*/
//										
									} else {
										/*提示语*/
										Toast({
											message: response.body.meta.msg,
											position: 'middle',
											duration: 2000
										});
										
									}

								}).catch(function(err) {
									//console.log(err)
									/*提示语*/
										Toast({
											message: "登录失败，请检查网络连接",
											position: 'middle',
											duration: 2000
										});
								})
							

//						} else {
//							/*提示语*/
//							Toast({
//								message: '密码不能为空',
//								position: 'middle',
//								duration: 2000
//								});
//							
//						}
					}else{
						
				
					if(reg.test(phone)) {
						if(password != null && password != "") {
							if(reg_pass.test(password)) {
								var m_pass = md5(password);
								var params = "{\"loginType\":\"2\",\"loginAccount\":\"" + phone + "\",\"loginPwd\":\"" + m_pass + "\",\"pid\":\"684589bb5b0e40059ceb41d71be23d8d\",\"rid\":\"631e32975df34e89a6ec9f58512b912f\",\"cpFlag\":\"0\",\"regEquipment\":\"WAP\"}";
								//console.log("登陆数据: " + params);
								this.$http({
									url: this.$store.state.request_url+'/api/user/login.do',
									method: 'post',
									headers: {
										"content-type": "application/json;charset=UTF-8"
									},
									body: params,
									emulateJSON: false,
								}).then(function(response) {

									if(response.body.meta.res === "00000") {
										//console.log("memId");
										//console.log(response.body.data)
//										this.$store.state.data = response.body.data;	
										localStorage.memId=response.body.data.memId
                                        localStorage.tokEn=response.body.data.tokEn
                                        localStorage.info=response.body.data.info
										/*提示语*/
										Toast({
											message: '登录成功',
											position: 'middle',
											duration: 2000
										});
										//this.id=response.body.data.opId
//										this.connectWebSocket(response.body.data.memId);//登录即连接
										this.$router.push({path: '../slider'})
										//this.getUserInfo(response.body.data.memId,response.body.data.tokEn);/*获取用户信息*/
//										
									} else {
										/*提示语*/
										Toast({
											message: response.body.meta.msg,
											position: 'middle',
											duration: 2000
										});
										
									}

								}).catch(function(err) {
									//console.log(err)
									/*提示语*/
										Toast({
											message: "登录失败，请检查网络连接",
											position: 'middle',
											duration: 2000
										});
								})
							} else {
								/*提示语*/
										Toast({
											message: '6-12位,必须包含至少一个字母和一个数字',
											position: 'middle',
											duration: 2000
										});
							}

						} else {
							/*提示语*/
							Toast({
								message: '密码不能为空',
								position: 'middle',
								duration: 2000
								});
							
						}
					} else {
						/*提示语*/
							Toast({
								message: '手机号格式不对',
								position: 'middle',
								duration: 2000
								});
							
						
					}
					}
				} else {
					/*提示语*/
							Toast({
								message: '手机号不能为空',
								position: 'middle',
								duration: 2000
								});
					
				}

			},
			/*连接*/
			connectWebSocket(id){
				// 打开一个 web socket

				this.ws = new WebSocket("ws://120.76.188.131:6666?opId="+id);
				
			
				/*判断是否处于连接状态*/
				if(this.ws.readyState != 1) {

				//console.log(this.ws)
				
				var that = this
				/*连接*/
				this.ws.onopen = function() {
					//console.log("连接成功",that.ws)
					that.$store.state.new_ws=that.ws;
					that.ws.onmessage = that.getMessage; /*接受推送信息*/
					}
				}
				/*异常触发*/
				this.ws.onerror = function() {
					alert("异常...");
				}
				this.ws.send=function(){
					
				}
				
			},
			/*获取用户信息*/
			getUserInfo(id,token){
			var url=this.$store.state.request_url+"/api/map/user/artUserInfo.do";
		    var ts=new Date().getTime();
		    var sign = md5(url+id+token+ts)
		        
		  	this.$http({
				url: this.$store.state.request_url+"/api/map/user/artUserInfo.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				emulateJSON: false,
				method: 'post',
				body:{
					opId:id
				}
			}).then(function(response) {
				
				if(response.body.meta.res == '00000'){
                   
                   if(response.body.data.nickname==null||response.body.data.nickname==""){
//						window.location="/#/regiter_information"
						this.$router.push({path: '../regiter_information'})
					}else{
						localStorage.opPic=response.body.data.opPic;
						localStorage.nickname=response.body.data.nickname;
						this.$router.push({path: '../slider'})
//						window.location="/#/slider"
					}
				}
			}).catch(function(err){
				
				//console.log(err)
				
			 })
			},
			forget(){
				this.$router.push({
						path: '../forget'
						});
			},
			/*接收信息*/
			getMessage(evt) {
				var received_msg = evt.data;
				//console.log(evt.data,"推送信息")
				if(received_msg != "链接成功,您可以开始聊天" && received_msg != "您的好友已下线！") {

					//将json字符串转为json对象
					var json = eval('(' + received_msg + ')');
					//console.log(json);
					
					switch(json.msgType){
						case 'msg'://聊天信息
							
							this.$store.state.is_infro=true;
							this.$store.state.msgs.push(json)  
							//console.log(this.$store.state.msgs_to.length,"长度")
						if(this.$store.state.msgs_to.length>0){
							let a = 0
							for(var i=0;i<this.$store.state.msgs_to.length;i++){
								if(this.$store.state.msgs_to[i].fromOpId == json.fromOpId){
									this.$store.state.msgs_to[i] = json
									break;
								}else{
									a = 1
								}
								
							}
							if(a==1){
								this.$store.state.msgs_to.push(json)
							}
							
							
						}else{
							this.$store.state.msgs_to.push(json)  
						}
							 
						////console.log(this.$store.state.msgs_to,"22222")
//							if(this.$store.state.msgs.length>0){
//								
//								for(var i=0;i<this.$store.state.msgs.length;i++){
//									//console.log(this.$store.state.msgs[i][0].fromOpId==json.fromOpId," "+this.$store.state.msgs[i][0].fromOpId,"--"+json.fromOpId)
//									if(this.$store.state.msgs[i][0].fromOpId==json.fromOpId){
//										this.$store.state.msgs[i].push(json)
//										break;
//									}else{
//										var new_a=[];
//										new_a.push(json);
//										this.$store.state.msgs.push(new_a)
//										break;
//									}
//								}
//							}else{
//								var new_array=[];
//								new_array.push(json)
//								this.$store.state.msgs.push(new_array)
//							}
							
							//console.log(this.$store.state.msgs_to,"聊天")
							break;
							
						case 'fans'://粉丝通知
							this.$store.state.fans.push(json.message)
							//console.log(this.$store.state.fans,"粉丝")
							break;
							
						case 'friend'://好友通知
							if(this.$store.state.is_login){
								this.$store.state.friends.push(json)
							}else{
								this.$store.state.friends_to=json;
							}
							
							break;
							
						case 'system'://系统通知
							this.$store.state.systems.push(json.message)
							break;
							
						case 'like'://点赞通知
							this.$store.state.likes.push(json.message)
							//console.log(this.$store.state.likes,"点赞")
							break;
							
						case 'discuss'://评论通知
							this.$store.state.discuss.push(json.message)
							//console.log(this.$store.state.discuss,"评论")
							break;
							
						case 'reward'://打赏通知
							this.$store.state.rewards.push(json.message)
							//console.log(this.$store.state.rewards,"打赏")
							break;
							
						case 'complaintSuggestion'://建议通知
							this.$store.state.complaintSuggestions.push(json.message)
							break;
					}

				} else {

					//console.log(received_msg)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	/*返回*/
	#app{
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
    	position: relative;
		z-index: 500;
		height: 13.2rem;
		background: white;
	}
	.back {
		width: 1.8rem;
		height: 1rem;
		margin-left: 0.25rem;
	}
	
	.back img {
		width: 0.3rem;
		height: 0.3rem;
		float: left;
		margin-top: 0.35rem
	}
	
	.back p {
		font-size: 0.4rem;
		margin-left: 0.1rem;
		float: left;
		line-height: 1rem;
	}
	/*标题*/
	
	.title {
		width: 90%;
		margin-left: 5%;
		margin-top: 0.28rem;
	}
	
	.title_p {
		    font-size: 0.6rem;
    font-weight: bold;
		
		color: rgba(51, 51, 51, 1);
		font-family: castellar;
	}
	
	.title_tip {
		font-size: 0.32rem;
		color: #D0D0D0;
		position: relative;
		
	}
	
	.phone {
	
		width: 90%;
		margin-left: 5%;
		border-bottom: 1px #EEEEEE solid;
		height: 1rem;
		margin-top: 0.3rem;
	}
	
	.phone p {
		width: 20%;
		float: left;
		font-size: 0.32rem;
		line-height: 1rem;
		font-family: SimHei;
		color: rgba(51, 51, 51, 1);
	}
	
	.phone input {
		width: 80%;
		height: 100%;
		border: 0;
		text-align: left;
		float: right;
		outline: none;
		/*去除默认颜色边框*/
		font-size: 0.32rem;
	}
	
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #D0D0D0;
		font-size: 0.32rem;
	}
	
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #D0D0D0;
		font-size: 0.32rem;
	}
	
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #D0D0D0;
		font-size: 0.32rem;
	}
	
	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #D0D0D0;
		font-size: 0.32rem;
	}
	
	.password {
		
		width: 90%;
		margin-left: 5%;
		height: 1rem;
		border-bottom: 1px #EEEEEE solid;
	}
	
	.password p {
		width: 20%;
		float: left;
		line-height: 1rem;
		font-size: 0.32rem;
		font-family: SimHei;
		color: rgba(51, 51, 51, 1);
	}
	
	.password input {
		width: 80%;
		height: 100%;
		border: 0;
		outline: none;
		/*去除默认颜色边框*/
		text-align: left;
		float: right;
		font-size: 0.4rem;
	}
	
	.sumbit {
		width: 86%;
    height: 0.9rem;
    border-radius: 0.1rem;
    background-color: #000000;
   
    margin: 1rem 7%;
	}
	
	.sumbit p {
		text-align: center;
		color: #fff;
		line-height: 0.9rem;
		font-size: 0.36rem;
		
	}
	.down {
		
		width: 100%;
		height: 0.01rem;
		background: rgba(247, 247, 247, 1);
		
	}
	.new_down {
		
    	
		width: 100%;
		height: 0.01rem;
		background: rgba(247, 247, 247, 1);
		margin-top: 0.3rem;
	}
	.forget{
		float: right;
		margin-top: 0.2rem;
    	font-size: 0.28rem;
    	margin-right: 0.2rem;
    	color: #D0D0D0;
	}
</style>