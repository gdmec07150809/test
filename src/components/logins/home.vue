<template>
	<div class="gong_class">
		<div class="home_img">
			<img src="../../assets/img/home_img.png" />
		</div>
		<button class="login" @click="login">
			<p >登录账号</p>
		</button>
		<button class="regiter" @click="regiter">
			<p>注册账号</p>
		</button>
		<!--<div class="webChat">
			<dt></dt>
			<p>您也可以用以下方式登录</p> <dt></dt>
		</div>
		<div class="webchat_img" @click="weixin">
			<img src="../../assets/img/icon_wechat.png" />
			<p>微信</p>
		</div>-->
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {

		methods: {
			login() {
				//					window.location = '/#/login'
				this.$router.push({
					path: '../login'
				})

			},
			regiter() {
				this.$router.push({
					path: '../regiter'
				})

			},
			bingPhoneTap() {
				/*提示语*/
				Toast({
					message: '暂不支持',
					position: 'middle',
					duration: 2000
				});
				//				window.location = '/#/bing_phone'
				//this.$router.push({path: '../bing_phone'})

			},
			changepassword() {
				//				this.$router.push({
				//					path: '../Modify_the_password'
				//				})
				//				window.location = '/#/Modify_the_password'
				this.$router.push({
					path: '../Modify_the_password'
				})
			},
			/**微信登陆,测试中(需在微信后台开权限)*/
			weixin() {
//				this.$http({
//					url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1499c5b8d0dadeea&redirect_uri=www.meetartapp.com&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect',
//					method: 'post',
//					headers: {
//						"content-type": "application/json;charset=UTF-8"
//					},
//
//					emulateJSON: false,
//				}).then(function(response) {
//					console.log(response, "9999999999999999")
//
//				}).catch(function(err) {
//
//				})

				//this.$store.state.tableList.authLogin('weixin');
			}
		},
		created() {
			this.$store.state.is_bottom = false; //底部栏显隐
			//console.log(this.$store.state.is_bottom, "home")
		}
	}
</script>

<style scoped="scoped">
	.home_img {
		width: 100%;
		height: 6.8rem;
	}
	
	.home_img img {
		width: 60%;
		margin-left: 20%;
		margin-top: 1.8rem;
	}
	
	.login {
		width: 80%;
		height: 0.9rem;
		margin: 5% 10%;
		border-radius: 0.1rem;
		background-color: #fff;
		border: #000000 solid 3px;
	}
	
	.regiter {
		width: 80%;
		height: 0.9rem;
		margin: 1% 10%;
		border-radius: 0.1rem;
		background-color: #000000;
	}
	
	.login p {
		color: #000000;
		line-height: 0.9rem;
		font-size: 0.36rem;
	}
	
	.regiter p {
		color: #FFFFFF;
		line-height: 0.9rem;
		font-size: 0.36rem;
	}
	
	.webChat {
		margin-left: 10%;
		width: 80%;
		height: 0.4rem;
		margin-top: 0.5rem;
		text-align: center;
	}
	
	.webChat p {
		font-size: 0.25rem;
		color: #D0D0D0;
	}
	
	.webChat dt,
	.webChat p {
		float: left;
	}
	
	.webChat dt {
		width: 15%;
		height: 0.01rem;
		margin: 0.2rem 0.32rem 0;
		background-color: #E0E0E0;
	}
	
	.webchat_img {
		width: 2rem;
		margin: 0.1rem auto;
		text-align: center;
	}
	
	.webchat_img img {
		width: 0.8rem;
		height: 0.8rem;
	}
	
	.webchat_img p {
		font-size: 0.3rem;
	}
	
	.gong_class {
		width: 100%;
		overflow: hidden;
		margin: 0px auto;
	}
</style>