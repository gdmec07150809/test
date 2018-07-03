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
	   		<p style="font-size: 0.36rem;margin-left: 3.1rem;">设置中心</p>
		</div><div style="height: 0.88rem;"></div>
		 
		 <div style="width: 100%;margin-top: 0.3rem;overflow:hidden;background: white;">
		  <div @click="to_Modifythepassword" class="boxa" style="border-bottom: 0.005rem solid #EEEEEE;">
				 <p style="float: left;">修改密码</p>
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;margin-right: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0.3rem;" />
				 
			 </div>
		
			  <div class="boxa" style="border-bottom: 0.005rem solid #EEEEEE;" @click="about">
				 <p style="float: left;">关于我们</p>
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;margin-right: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0.3rem;" />
			 </div>
			  <div class="boxa" style="border-bottom: 0.005rem solid #EEEEEE;">
				 <p style="float: left;">版本号</p>
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;margin-right: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <p style="float: right;margin-right: 0.6rem;">V{{$store.state.version}}</p>
			 </div>
			 <div class="boxa" @click="check_update">
				 <p style="float: left;">检测新版本</p>
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;margin-right: 0.5rem;" class="fa fa-angle-right"></i>-->
				 
				 <img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0.3rem;" />
			 </div>
		 </div>
		
		 <!--<div style="width: 100%;margin-top: 0.3rem;height:2rem;background: white;">-->
		     <!--<div class="boxa" style="border-bottom: 0.005rem solid #EEEEEE;">-->
				 <!--<p style="float: left;">清理缓存</p>-->
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;margin-right: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <!--<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0.3rem;" />-->
				 <!--<p style="font-size: 0.3rem;float: right;margin-right: 0.2rem;">30M</p>-->
			 <!--</div>-->
			 <!--<div class="boxa">-->
				 <!--<p style="float: left;">语言切换</p>-->
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;margin-right: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <!--<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0.3rem;" />-->
			       <!--<p style="font-size: 0.3rem;float: right;margin-right: 0.2rem;">中文</p>-->
			 <!--</div>-->
		 <!--</div>-->
		 <div @click="is_loginOut" style="width: 100%;margin-top: 0.3rem;height:1rem;background: white;">
		   <div class="boxa">
				 <p style="float: left;">退出登录</p>
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;margin-right: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <img src="../../assets/img/right_icon.png" style="float: right;height: 0.28rem;margin-top: 0.36rem;margin-right: 0.3rem;" />
			 </div>
		 </div>
		 <div style="width: 100%;height: 0.3rem;background:#F6F6F6;"></div>
		
		</div>
		
		
		<div v-show="$store.state.update_version" class="zhe" @touchmove.prevent>
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 1.9rem;">
					<p style="font-size:0.32rem;">检测到新版本,是否立即更新?</p>
				</div>
				<div style="width:100%;height:0.96rem;border-top:0.02rem solid #E0E0E0;line-height: 0.96rem;">
					<a :href="$store.state.is_sc.iosurl"  style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.32rem;display: block;">
						确定
					</a>
					<div @click="cannel" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.32rem;color: #CCCCCC;">
						取消
					</div>
				</div>
			</div>
		</div>
		
		
		<div v-show="xian_s" class="zhe" @touchmove.prevent @click="shan_s">
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 1.9rem;">
					<p style="font-size:0.32rem;">是否确定退出登陆?</p>
				</div>

				<div style="width:100%;height:0.96rem;border-top:0.02rem solid #E0E0E0;line-height: 0.96rem;">
					<div @click="logins" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.32rem;">
						确定
					</div>
					<div @click="shan_s" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.32rem;color: #CCCCCC;">
						取消
					</div>
				</div>

			</div>
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
				xian_s:false
			}
		},
		methods:{
			shan_s(){
				this.xian_s=false;
			},
			is_loginOut(){
				this.xian_s=true;
			},
			hui(){
				this.$router.push({
						path: '../myspace'
						});
			},
			to_Modifythepassword(){
				this.$router.push({
						path: '../Modifythepassword'
						});
			},
			logins(){
			/*测试登出功能*/
					var ts=Date.parse(new Date());
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
								//判断是否处于连接状态
								if(this.$store.state.new_ws.readyState==1){
									var _this=this;
									this.$store.state.new_ws.close();
									this.$store.state.new_ws={};
								}
								localStorage.memId=''
                				localStorage.tokEn=''
                				localStorage.info=''
                				this.$store.state.data.memId=""
                				this.$store.state.data.tokEn=""
             				
                				this.$router.push({
									path: '../home'
								});	
							}
						})
			                    
			},
			about(){
				this.$router.push({
									path: '/about_us'
								});
			},
			/*取消更新*/
			cannel(){
				this.$store.state.update_version = false;
			},
			check_update(){
					/**判断有无新版本*/
			if(apk == "" || apk == null) {
				this.$store.state.is_sc.bb = "1.0.0";
				this.$store.state.is_sc.ss = false;
				this.$store.state.is_sc.sc = false;
				this.$store.state.is_sc.zf = false;
				this.$store.state.is_sc.ds = false;
				this.$store.state.is_sc.hy = false;
				this.$store.state.is_sc.ql = false;
				this.$store.state.is_sc.yy = false;
				this.$store.state.is_sc.jl = false;

				this.$store.state.update_version = false;

			} else {
				
					this.$store.state.is_sc = apk;
//					//console.log(this.$store.state.is_sc, "999999999999999999999999999", ifshow)
//					//console.log(parseFloat((this.$store.state.is_sc.bb).substring(2, (this.$store.state.is_sc.bb).length)), "-----------", (this.$store.state.is_sc.bb).substring(2, (this.$store.state.is_sc.bb).length))
					if((this.$store.state.is_sc.bb).substring(2, (this.$store.state.is_sc.bb).length) > (this.$store.state.version).substring(2, (this.$store.state.version).length)) {
						this.$store.state.update_version = true;
						
					}else{
						/*提示语*/
							Toast({
								message: '当前版本为最高版本',
								position: 'middle',
								duration: 2000
							});
					}
				

			}
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
	
		.zhe {
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 9994;
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
</style>