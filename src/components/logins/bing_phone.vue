<template>
	<div id="app">
		<div class="back" @click="backTo()">
			<img src="../../assets/img/back.png" />
			<p>返回</p>
		</div>
		<div class="title">
			<p class="title_p">绑定手机</p>
			<p class="title_tip">请输入手机号码及密码</p>
		</div>
		<div class="phone_adress">
			<p>中国 (+86)</p>
			<img src="../../assets/img/come_icon.png" />
		</div>
		<div class="phone">
			<p>手机</p>
			<input type="number" placeholder="请输入登录手机号码"/>
		</div>
		
		<div class="code">
			<p>验证码</p>
			<input type="number" placeholder="请输入验证码"/>
			<div class="xian"></div>
			<div class="getCode"><p>获取验证码</p></div>
		</div>
		<div class="sumbit"><p>确认绑定</p></div>
	</div>
</template>

<script>
	export default {
		methods:{
			backTo(){
				this.$router.push({path: '../home'})
				
			}
		}
	}
</script>

<style scoped="scoped">
	/*返回*/
	
	.back {
		width: 1.8rem;
		height: 1.25rem;
		margin-left: 0.25rem;
	}
	
	.back img {
		width:0.5rem;
		height: 0.5rem;
		float: left;
		margin-top: 0.425rem
	}
	
	.back p {
		font-size: 0.4rem;
		margin-left: 0.1rem;
		line-height: 1.35rem;
		float: left;
	}
	/*标题*/
	
	.title {
		position: absolute;
		left: 0.4rem;
		
	}
	
	.title_p {
		font-size: 0.8rem;
		font-weight: bold;
		color:rgba(51,51,51,1);
		font-family: castellar;
	}
	
	.title_tip {
		font-size: 0.35rem;
		color: #D0D0D0;
		position: relative;
		
	}
	
	.phone_adress {
		position: absolute;
		top: 3.45rem;
		width: 90%;
		left: 0.4rem;
		height: 1rem;
		border-bottom: solid 1px #D0D0D0;
	}
	
	.phone_adress p {
		width: 2rem;
		float: left;
		margin-top: 0.2rem;
		font-size: 0.4rem;
		font-family:SimHei;
		color:rgba(51,51,51,1);
	}
	
	.phone_adress img {
		margin-top: 0.3rem;
		float: right;
		margin-right: 0.3rem;
		width: 0.4rem;
		height: 0.4rem;
	}
	
	.phone {
		position: absolute;
		top: 4.75rem;
		width: 90%;
		left: 0.4rem;
		height: 1rem;
		border-bottom: rgba(247, 247, 247, 1) solid 5px;
	}
	
	.phone p {
		width: 20%;
		float: left;
		font-size: 0.4rem;
		line-height: 1rem;
		font-family:SimHei;
		color:rgba(51,51,51,1);
	}
	
	.phone input {
		width: 80%;
		height: 100%;
		border: 0;
		text-align: left;
		float: right;
		outline: none;/*去除默认颜色边框*/
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

	.code{
		position: absolute;
	
		top: 5.75rem;
		width: 90%;
		left: 0.4rem;
		height: 1.25rem;
		border-bottom: solid 1px #D0D0D0;
	}
	.code p{
		width: 20%;
		float: left;
		line-height: 1.25rem;
		font-size: 0.425rem;
		font-family:SimHei;
		color:rgba(51,51,51,1);
	}
	.code input{
		width: 40%;
		height: 70%;
		border: 0;
		font-size: 0.5rem;
		margin-top: 0.1rem;
		outline: none;/*去除默认颜色边框*/
		margin-left: 2%;
		float: left;
	}
	.xian{
		float: left;
		width: 4px;
		height: 40%;
		margin-top: 0.425rem;
		background-color: #2E3135;
	}
	.getCode{
		width: 30%;
		float: right;
		}
	.getCode p{
		width: 100%;
		line-height: 1.25rem;
		font-size: 0.375rem;
		font-family:SimHei;
		color:rgba(51,51,51,1);
	}
	.sumbit{
		width: 80%;
		height: 1rem;
		border-radius: 0.1rem;
		background-color: #000000;
		position: absolute;
		top:8rem;
		margin: 0 10%;
	}
	.sumbit p{
		text-align: center;
		color: #fff;
		font-size: 0.475rem;
		margin-top: 0.2rem;
	}
	#app{
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
	}
</style>