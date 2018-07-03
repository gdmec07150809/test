<template>
	<div id="app">
		<div class="head1">
			<img style="width: 0.3rem;height:0.3rem;position: absolute;left: 0.3rem;top: 0.35rem;"  src="../../assets/img/zuo.png" @click="backTo"/>
			
				<p style="line-height: 1rem;">忘记密码</p>
		</div>
		<div class="phone">
			<p>手机</p>
			<input ref="phone_input" type="text" placeholder="请输入登陆手机号" maxlength="11" />
		</div>
		<div class="code">
			<p class="code_text">验证</p>
			<input ref="code_input" type="text" placeholder="请输入验证码" />
			<dt></dt>
			<p v-show="show" class="getCode" @click="getCode">获取验证码</p>
			<p v-show="!show" :class="{time_blue:is_blue,time_red:is_red}">{{count}} s</p>

		</div>
		<div class="pass">
			<p>密码</p>
			<input ref="password_input" type="password" placeholder="请重新输入登录密码" />
		</div>

		<div class="sumbit" @click="sumbit">
			<p>确认密码</p>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				show: true,
				timer: null,
				count: '',
				is_red: false,
				is_blue: true,

			}
		},
		methods: {
			backTo() {
				this.$router.push({
					path: '../login'
				})
			},
			getCode() {
				var reg = /^1[3|4|5|7|8][0-9]{9}$/;
				var phone = this.$refs.phone_input.value.trim();
				if(reg.test(phone)) {

					/*验证码倒计时*/
					const TIME_COUNT = 60;
					if(!this.timer) {

						this.count = TIME_COUNT;
						this.show = false;
						this.timer = setInterval(() => {
							if(this.count > 0 && this.count <= TIME_COUNT) {
								if(this.count <= 10) {
									this.is_blue = false;
									this.is_red = true;
								} else {
									this.is_blue = true;
									this.is_red = false;
								}
								this.count--;
							} else {
								this.show = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}

					var params = "{\"memPhone\":\"" + phone + "\",\"msgType\":\"3\",\"msgLen\":\"4\"}";
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
			sumbit() {
				var reg = /^1[3|4|5|7|8][0-9]{9}$/;
				var reg_pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/; //密码正则，6-12位，包含一种数字一种字母
				var phone = this.$refs.phone_input.value.trim();
				var code = this.$refs.code_input.value.trim();
				var password = this.$refs.password_input.value.trim();
				if(phone != null && phone != "") {
					if(reg.test(phone)) {
						if(code != null && code != "") {
							if(password != null & password != "") {
								if(reg_pass.test(password)) {
									var m_pass = md5(password);
									//console.log(phone + "  " + code + " " + password);
									this.$http({
										url: this.$store.state.request_url+'/api/user/forgetPassword.do',
										method: 'post',
										headers: {
											"content-type": "application/json;charset=UTF-8"
										},
										body: {
											loginAccount: phone,
											smsVerifCode: code,
											pwdNew: m_pass,
											pid: "684589bb5b0e40059ceb41d71be23d8d",
											rid: "631e32975df34e89a6ec9f58512b912f",
											cpFlag: "0"
										},
										emulateJSON: false,
									}).then(function(response) {
										//console.log(response);
										if(response.body.meta.res == "00000") {
											Toast({
												message: '修改成功',
												position: 'middle',
												duration: 2000
											});
											this.$router.push({
												path: '../login'
											})
										}else{
											Toast({
												message: response.body.meta.msg,
												position: 'middle',
												duration: 2000
											});
										}
									}).catch(function(err) {
										Toast({
											message: '修改失败，请重新修改',
											position: 'middle',
											duration: 2000
										});
									})
								} else {
									Toast({
										message: '6-12位,必须包含至少一个字母和一个数字',
										position: 'middle',
										duration: 2000
									});
								}
							} else {
								Toast({
									message: '密码不能为空',
									position: 'middle',
									duration: 2000
								});
							}

						} else { /*提示语*/
							Toast({
								message: '验证码不能为空',
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
			}

		}
	}
</script>

<style scoped="scoped">
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
		border: 0;
	}
	.head1 {
		width: 100%;
		height: 1rem;
		position: fixed;
		top: 0;
		line-height: 1rem;
		background: white;
		text-align: center;
		font-size: 0.32rem;
		box-sizing: border-box;
		border-bottom: #f1f1f1 solid 1px;
	
	}
	.title {
		width: 80%;
		height: 100%;
		float: left;
		font-size: 0.35rem;
		text-align: center;
	}
	
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #D0D0D0;
		font-size: 0.32rem;
		line-height: 1rem;
	}
	
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #D0D0D0;
		font-size: 0.32rem;
		line-height: 1rem;
	}
	
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #D0D0D0;
		font-size: 0.32rem;
		line-height: 1rem;
	}
	
	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #D0D0D0;
		font-size: 0.32rem;
		line-height: 1rem;
	}
	
	.head{
		margin-top: 0.3rem;
		height: 0.8rem;
		position: relative;
		border-bottom: rgba(247, 247, 247, 1) solid 3px;
	}
	
	.head img {
		float: left;
		width: 0.5rem;
		margin-left: 0.3rem;
		height: 0.5rem;
	}
	
	.head p {
		font-size: 0.4rem;
		text-align: center;
	}
	
	.phone {
		height: 1rem;
		width: 90%;
		margin-left: 5%;
		margin-top: 1rem;
		border-bottom: rgba(247, 247, 247, 1) solid 3px;
	}
	
	.phone p {
		float: left;
		width: 20%;
		line-height: 1rem;
		font-size: 0.32rem;
	}
	
	
	
	.phone input {
		width: 80%;
		float: right;
		
		margin-top: 0.1rem;
		font-size: 0.32rem;
		height: 0.8rem;
		line-height: 1rem;
	}
	
	.code {
		height: 1rem;
		width: 90%;
		margin: 0 5%;
		border-bottom: rgba(247, 247, 247, 1) solid 3px;
	}
	
	.code_text {
		float: left;
		width: 20%;
		line-height: 1rem;
		font-size: 0.32rem;
	}
	
	.code input {
		float: left;
		width: 40%;
		font-size: 0.32rem;
		height: 0.9rem;
		line-height: 0.9rem;
	}
	
	.code dt {
		float: left;
		width: 0.03rem;
		background: rgba(46, 49, 53, 1);
		height: 0.4rem;
    	margin-top: 0.3rem;
	}
	
	.getCode {
		float: left;
		width: 28%;
		text-align: center;
		line-height: 1rem;
		font-size: 0.3rem;
	}
	
	.sumbit {
	width: 6.45rem;
    height: 0.9rem;
    border-radius: 0.1rem;
    background-color: #000000;
    margin: 0.5rem auto;
	}
	
	.sumbit p {
		text-align: center;
		color: #fff;
		line-height: 0.9rem;
		font-size: 0.36rem;
		
	}
	
	.time_blue {
		float: left;
		width: 28%;
		text-align: center;
		line-height: 0.9rem;
		font-size: 0.3rem;
		color: #ff9d00;
	}
	
	.time_red {
		float: left;
		width: 28%;
		text-align: center;
		line-height: 0.9rem;
		font-size: 0.3rem;
		color: red;
	}
	#app{
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
	}
	.pass{
		width: 90%;
		height: 1rem;
		margin-left: 5%;
		line-height: 1rem;
		border-bottom: rgba(247, 247, 247, 1) solid 3px;
	}
	.pass p{
		float: left;
		width: 20%;
		line-height: 1rem;
		font-size: 0.32rem;
	}
	.pass input{
		float: right;
		width: 80%;
		margin-top: 0.1rem;
		font-size: 0.32rem;
		height: 0.8rem;
		line-height: 1rem;
	}
</style>