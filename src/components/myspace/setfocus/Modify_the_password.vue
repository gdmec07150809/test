<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-21
    	描述：设置中心（修改密码）
    -->
	<div style="width: 100%;position: relative;z-index: 300;background: white;">
	
		<div style="width: 100%;height: 1rem;position: fixed;top:0;left: 0;z-index: 300;line-height: 1rem;background: white;border-bottom: 0.005rem solid #EEEEEE;">
				<img @click="hui" style="width: 0.3rem;height: 0.3rem;float:left;margin:0.35rem 0.3rem;" src="../../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;margin-left: 3.1rem;">修改密码</p>
		</div><div style="height: 0.88rem;"></div>
		 
		 <div style="width: 100%;margin-top: 0.3rem;height:2rem;background: white;">
		  <div  class="boxa">
				 <p style="float: left;width: 13%;">手机</p>
				 <input style="float: left;margin-left: 0.8rem;height: 98%;" ref="phone" readonly="readonly" :value="$store.state.detailed_information.phone"/>
			 </div>
			 
			 <div class="boxa">
				 <p style="float: left;width: 13%;">验证</p>
				 <input class="inpss" type="text" placeholder="请输入验证码" ref="code"/>
				  <button v-show="show" class="btn" @click="getCode">获取验证码</button>
				  <button v-show="!show" :class="{time_blue:is_blue,time_red:is_red}">{{count}} s</button>
			 </div>
			 
			 <div class="boxa">
				 <p style="float: left;width: 13%;">旧密码</p>
				 <input style="width: 4rem;" class="inpss"  placeholder="请重新输入登录旧密码" ref="old_password" type="password"/>
			 </div>
			 <div class="boxa">
				 <p style="float: left;width: 13%;">新密码</p>
				 <input style="width: 4rem;" class="inpss"  placeholder="请重新输入登录新密码" ref="new_password" type="password"/>
			 </div>
		 </div>
		 
		 <button class="btns" @click="sumbit">确认修改</button>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';
	import store from '../../../vuex/store.js'
	export default{
		store,
		data(){
			return{
				show: true,
				timer: null,
				count: '',
				is_red: false,
				is_blue: true,
			}
		},
		methods:{
			hui(){
//				window.location ='#/setfocus'
				this.$router.push({
						path: '../setfocus'
						});
			},
			getCode() {
				var reg = /^1[3|4|5|7|8][0-9]{9}$/;
				var phone = this.$refs.phone.value.trim();
				if(reg.test(phone)) {

					/*验证码倒计时*/
					const TIME_COUNT = 30;
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
				var phone = this.$refs.phone.value.trim();
				var old_password = this.$refs.old_password.value.trim();//旧密码
				var new_password = this.$refs.new_password.value.trim();//新密码
				if(phone != null && phone != "") {
					if(reg.test(phone)) {
						
							if(old_password != null & old_password != "") {
								if(reg_pass.test(old_password)) {
									if(new_password != null & new_password != "") {
								if(reg_pass.test(new_password)) {
									var n_pass = md5(new_password);
									var o_pass = md5(old_password);
									////console.log(phone + "  " + code + " " + old_password+" "+o_pass+" "+new_password+" "+n_pass);
									this.$http({
										url: this.$store.state.request_url+'/api/user/changePwd.do?memId='+this.$store.state.data.memId,
										method: 'post',
										headers: {
											"content-type": "application/json;charset=UTF-8"
										},
										body: {
											pwdNew: n_pass,
											pwdOrg:o_pass,
											pwdType: "1"
										},
										emulateJSON: false,
									}).then(function(response) {
										//console.log(response.body.meta.res);
										if(response.body.meta.res =="00000") {
											Toast({
												message: '修改成功',
												position: 'middle',
												duration: 2000
											});
											this.$router.push({
												path: '../setfocus'
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
										message: '6-12位,必须包含至少一个字母和一个数字的新密码',
										position: 'middle',
										duration: 2000
									});
								}
							} else {
								Toast({
									message: '新密码不能为空',
									position: 'middle',
									duration: 2000
								});
							}
								} else {
									Toast({
										message: '6-12位,必须包含至少一个字母和一个数字的旧密码',
										position: 'middle',
										duration: 2000
									});
								}
							} else {
								Toast({
									message: '旧密码不能为空',
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
		},
	}
</script>

<style scoped="scoped">
	*{
		outline:none;
	}
	input{
		border: 0;
	}
	.boxa{
		width: 95%;
		float: right;
		height:1rem;
		font-size: 0.3rem;
		line-height:1rem;
		border-bottom: 0.005rem solid #EEEEEE;
	}
	.inpss{
		width: 2rem;height: 0.8rem;font-size: 0.3rem;
		border: none;
		margin-left: 0.8rem;
	}
	.btn{
		width: 2rem;
		height: 0.4rem;
		font-size: 0.3rem;
		border: none;
		border-left: 0.02rem solid black;
		background: white;
		float: right;
		margin-top: 0.3rem;
		margin-right: 0.1rem;
		line-height: 0.4rem;
	}
	.btns{
		width: 6.4rem;
		height: 0.9rem;
		color: white;
		font-size: 0.3rem;
		background: #2E3135;
		margin-left: 0.5rem;
		border: none;
		border-radius: 0.1rem;
		margin-top: 1rem;
	}
	.time_blue {
		width: 2rem;
		height: 0.4rem;
		font-size: 0.3rem;
		border: none;
		border-left: 0.02rem solid black;
		background: white;
		float: right;
		color: green;
		margin-top: 0.3rem;
		margin-right: 0.1rem;
		line-height: 0.4rem;
	}
	
	.time_red {
		width: 2rem;
		height: 0.4rem;
		font-size: 0.3rem;
		border: none;
		border-left: 0.02rem solid black;
		background: white;
		float: right;
		color: red;
		margin-top: 0.3rem;
		margin-right: 0.1rem;
		line-height: 0.4rem;
	}
</style>