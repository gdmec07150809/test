<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-21
    	描述：设置中心
    -->
	<div style="width: 100%;position: relative;z-index: 300;background: white;">
	 <div style="width: 100%;background: #F6F6F6;">
		<div style="width: 100%;height: 1rem;position: fixed;top:0;left: 0;z-index: 300;line-height: 1rem;background: white;">
			<img @click="hui" style="width: 0.3rem;height: 0.3rem;float:left;margin:0.35rem 0.3rem;" src="../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;margin-left: 3.1rem;">关于我们</p>
		</div>
		<div style="height: 0.88rem;"></div>
		 
		 <div style="width: 100%;margin-top: 0.4rem;height:3rem;background: white;font-size: 0.32rem;">
		 	<div style="padding-top: 0.2rem;margin-left: 0.3rem;">
		 	 觅艺APP,艺术交友和艺术交流的社交平台！<br/>
			刷金刷脸的时代，是否已和艺术渐行渐远？<br/>
			觅艺APP(MeetArt)，还原您的艺术初心，展现作品背后的真我！<br/>
			我们在这里寻找艺术知音，分享艺术点滴!
			</div>
		 </div>
		 <div style="width: 100%;margin-top: 0.4rem;height:3rem;background: white;font-size: 0.32rem;">
		 	<div style="padding-top: 0.2rem;margin-left: 0.3rem;">
		 	联系电话：020-89015626<br />
		 	服务投诉：QQ1628641716<br />
		 	简历投递：hr@ding-new.com<br />
		 	公司地址：广东省广州市番禺区大石新兴广场8栋307-308
			</div>
		 </div>
		 
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default{
		store,
		methods:{
			hui(){
//				window.location ='#/myspace'
				this.$router.push({
						path: '../setfocus'
						});
			},
			to_Modifythepassword(){
//				window.location ='#/Modifythepassword'
				this.$router.push({
						path: '../Modifythepassword'
						});
			},
			logins(){
						
			/*测试登出功能*/
			
					var ts=Date.parse(new Date());
					console.log(this.$store.state.data.memId,this.$store.state.data.tokEn,"登出",ts)
					var url=this.$store.state.request_url + '/api/user/logout.do';
					
					var sign=md5(url+this.$store.state.data.memId+this.$store.state.data.tokEn+ts);//签名
					this.$http({
							url: this.$store.state.request_url + '/api/user/logout.do?memId='+this.$store.state.data.memId+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn":sign
							},
							body: {
								memId:this.$store.state.data.memId,
								pid:"684589bb5b0e40059ceb41d71be23d8d",
								rid:"631e32975df34e89a6ec9f58512b912f",
								cpFlag:"0"
							},
							emulateJSON: false,
						}).then(function(response) {

							if(response.body.meta.res === "00000") {
								console.log(response.body.meta);
								
								localStorage.memId=''
                				localStorage.tokEn=''
                				localStorage.info=''
                				this.$store.state.data.memId=""
                				this.$store.state.data.tokEn=""
             				
                				
                				this.$router.push({
									path: '../home'
								});	
                				
								//判断是否处于连接状态
								if(this.$store.state.new_ws.readyState==1){
									console.log(this.$store.state.new_ws.readyState)
									var _this=this;
									this.$store.state.new_ws.close();
									console.log(_this.$store.state.new_ws.readyState,"断开")
								
									this.$store.state.new_ws={};
								}
								
//								window.location = '/#/home'
								
							}else{
								this.$router.push({
									path: '/swiper2'
								});
							}
						})
			
				
				
				
				
				
				
				
			}
		},
		mounted(){
			this.$store.state.is_bottom=false;
		}
	}
</script>

<style scoped="scoped">
	.boxa{
		width: 95%;
		float: right;
		height:1rem;
		font-size: 0.3rem;
		line-height:1rem;
		
		
	}
</style>