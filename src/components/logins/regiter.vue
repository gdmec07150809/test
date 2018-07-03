<template>
	<div id="app">
		<div class="back" @click="backTo()">
			<img src="../../assets/img/zuo.png" />
			<p>返回</p>
		</div>
		<div class="title">
			<p class="title_p">手机注册</p>
			<p class="title_tip">请输入手机号码及密码</p>
		</div>
		<div class="phone_adress">
			<p>中国 (+86)</p>
			<img src="../../assets/img/right_icon.png" />
		</div>
		<div class="phone">
			<p>手机</p>
			<input ref="input_name" type="tel" placeholder="请输入登录手机号码" maxlength="11" />
		</div>
		<div class="password">
			<p>密码</p>
			<input ref="input_password" type="password" placeholder="输入6-12位数字字母密码组合" maxlength="12" />
		</div>
		<div class="code">
			<p>验证码</p>
			<input ref="input_code" type="number" placeholder="请输入验证码" maxlength="4" />
			
			<div class="getCode" >
				<p v-show="!show" :class="{time_blue:is_blue,time_red:is_red}">{{count}} s</p>
				<p v-show="show" @click="getCode">获取验证码</p>
			</div>
			<div class="xian"></div>
		</div>
		<div class="sumbit" @click="next">
			<p>下一步</p>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';
	import store from '../../vuex/store'
	export default {
		store,
		data() {
			return {
				show: true,
				timer: null,
				count: '',
				is_red:false,
				is_blue:true,
				
			}
		},
		methods: {
			backTo() {
//				window.location = '/#/home'
     this.$router.push({path: '../home'})
			},
			next() {
				//window.location = '/#/regiter_information'
				var reg = /^1[3|4|5|7|8][0-9]{9}$/; //手机号正则，开头为1，长度为11
				var reg_pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/; //密码正则，6-12位，包含一种数字一种字母
				var phone = this.$refs.input_name.value.trim()
				var password = this.$refs.input_password.value.trim()

				var code = this.$refs.input_code.value.trim()
				if(phone != null && phone != "") {
					if(reg.test(phone)) {
						if(password != null && password != "") {
							if(reg_pass.test(password)) {
								var m_pass = md5(password);
								var params = "{\"memPhone\":\"" + phone + "\",\"memPwd1\":\"" + m_pass + "\",\"smsVerifCode\":\"" + code + "\",\"pid\":\"684589bb5b0e40059ceb41d71be23d8d\",\"rid\":\"631e32975df34e89a6ec9f58512b912f\",\"cpFlag\":\"0\",\"regEquipment\":\"WAP\"}";
								//console.log(params,"登录");
								this.$http({
									url: this.$store.state.request_url+'/api/user/register.do',
									method: 'post',
									headers: {
										"content-type": "application/json;charset=UTF-8"
									},
									body: params,
									emulateJSON: false,
								}).then(function(response) {

									if(response.body.meta.res == "00000") {
										this.login(m_pass,phone);
										
									} else {
										/*提示语*/
										Toast({
											message: response.data.meta.msg,
											position: 'middle',
											duration: 2000
										});

									}

								}).catch(function(err) {
									//console.log(err)
									/*提示语*/
									Toast({
										message: err.data.meta.msg,
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
				} else {
					/*提示语*/
					Toast({
						message: '手机号不能为空',
						position: 'middle',
						duration: 2000
					});

				}

			},
			getCode() {
				var reg = /^1[3|4|5|7|8][0-9]{9}$/;
				var phone = this.$refs.input_name.value.trim();
				//console.log(phone);
				if(reg.test(phone)) {
					
					/*验证码倒计时*/
					const TIME_COUNT = 60;
					if(!this.timer) {
						
						this.count = TIME_COUNT;
						this.show = false;
						this.timer = setInterval(() => {
							if(this.count > 0 && this.count <= TIME_COUNT) {	
								if(this.count<=10){
									this.is_blue=false;
									this.is_red=true;
								}else{
									this.is_blue=true;
									this.is_red=false;
								}
								this.count--;
							} else {
								this.show = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}
					
					var params = "{\"memPhone\":\"" + phone + "\",\"msgType\":\"1\",\"msgLen\":\"4\"}";
					this.$http({
						url: this.$store.state.request_url+'/api/user/getSmsMsg.do',
						method: 'post',
						headers: {
							"content-type": "application/json;charset=UTF-8"
						},
						body: params,
						emulateJSON: false,
					}).then(function(response) {
						//console.log(response);
					}).catch(function(err) {
						//console.log(err)
					})
				} else {
					/*提示语*/
					Toast({
						message: '手机号格式不对',
						position: 'middle',
						duration: 2000
					});

				}
			},
			login(pass,phone){
				var params = "{\"loginType\":\"2\",\"loginAccount\":\"" + phone + "\",\"loginPwd\":\"" + pass + "\",\"pid\":\"684589bb5b0e40059ceb41d71be23d8d\",\"rid\":\"631e32975df34e89a6ec9f58512b912f\",\"cpFlag\":\"0\",\"regEquipment\":\"WAP\"}";
								
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
						
//						//console.log("memId");
//						//console.log(response.body.data)
//						this.$store.state.data = response.body.data;//储存数据
						
						                localStorage.memId=response.body.data.memId
                                        localStorage.tokEn=response.body.data.tokEn
                                        localStorage.info=response.body.data.info
                                         localStorage.phone=phone
						
//						this.connectWebSocket(response.body.data.memId);//登录成功即连接
						
//						window.location = '/#/regiter_information'
						this.$router.push({path: '../regiter_information'})
					}
				})
			},
			
			
			
		},
		created(){
			//console.log("进来")
		}
	}
</script>

<style scoped="scoped">
	#app{
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
    	position: relative;
		z-index: 500;
		height: 13.2rem;
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
	
	input,
	textarea {
		outline: none;
	}
	/*返回*/
	
	.back {
		width: 1.8rem;
		height: 1.25rem;
		margin-left: 0.25rem;
	}
	
	.back img {
		width: 0.4rem;
		height: 0.5rem;
		float: left;
		margin-top: 0.425rem
	}
	
	.back p {
		font-size: 0.4rem;
		margin-left: 0.1rem;
		float: left;
		line-height: 1.3rem;
	}
	/*标题*/
	
	.title {
		width: 90%;
		margin-left: 5%;
		margin-top: 0.5rem;
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
	}
	
	.phone_adress {
		width: 90%;
		margin-left: 5%;
		
		
		height: 1rem;
		border-bottom: solid 1px #E0E0E0;
		margin-top: 0.3rem;
	}
	
	.phone_adress p {
		width: 2rem;
		float: left;
		font-size: 0.32rem;
		font-family: SimHei;
		line-height: 1rem;
		color: rgba(51, 51, 51, 1);
	}
	
	.phone_adress img {
		margin-top: 0.38rem;
		float: right;
		margin-right: 0.3rem;
		
		height: 0.28rem;
	}
	
	.phone {
	
		width: 90%;
		margin-left: 5%;
		
		height: 1rem;
		border-bottom: #E0E0E0 solid 1px;
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
		border-bottom: #E0E0E0 solid 1px;
	}
	
	.password p {
		width: 20%;
		float: left;
		line-height: 1rem;
		font-size: 0.32rem;;
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
	
	.code {
	
		width: 90%;
		margin-left: 5%;
		
		height: 1.25rem;
		border-bottom: #E0E0E0 solid 1px;
	}
	
	.code p {
		width: 20%;
		float: left;
		font-size: 0.32rem;
		font-family: SimHei;
		line-height: 1.25rem;
		
	}
	
	.code input {
		width: 35%;
		height: 70%;
		border: 0;
		font-size: 0.4rem;
		margin-top: 0.15rem;
		outline: none;
		/*去除默认颜色边框*/
		
		float: left;
	}
	
	.xian {
		float: right;
		width: 4px;
		height: 0.3rem;
		margin-top: 0.475rem;
		margin-right: 0.2rem;
		background-color: #2E3135;
	}
	
	.getCode {
		width: 30%;
		float: right;
	}
	
	.getCode p {
		width: 100%;
		line-height: 1.25rem;
		font-size: 0.32rem;
		font-family: SimHei;
		
	}
	
	.time_blue{
		text-align: center;
		color: #ff9d00;
	}
	.time_red{
		text-align: center;
		color: red;
	}
	.sumbit {
		width: 80%;
		height: 0.9rem;
		border-radius: 0.1rem;
		background-color: #000000;
		margin: 1rem 10%;
	}
	
	.sumbit p {
		text-align: center;
		color: #fff;
		font-size: 0.36rem;
		line-height: 0.9rem;
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
	
</style>