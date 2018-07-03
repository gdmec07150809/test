<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-04-10
    	描述：作品评论输入框
    -->
	<div id="app" v-show="a.is_reply" @touchmove.prevent>
		<div @click="cancel" style="width: 100%;height: 13.7rem;position:fixed;top: 0;left: 0;background:rgba(0,0,0,0.4);z-index: 10;">

		</div>
		<div class="dia">
			<div class="head">
				<div style="height: 100%;float: left;">
					<p style="line-height: 1rem;font-size: 0.32rem;margin-left: 0.3rem;color: #CCCCCC;" @click="cancel">取消</p>
				</div>
				<div style="height: 100%;float: right;">
					<p style="line-height: 1rem;font-size: 0.32rem; margin-right: 0.3rem;color: #ff9d00;" @click="sendyyy">发送</p>
				</div>

			</div>
			<div class="footer">
				<textarea type="text" :placeholder="'评论@'+$store.state.commentWorksdata.artTitle+':'" ref="vas"></textarea>

			</div>

		</div>
	</div>

</template>

<script>
	import { Toast } from 'mint-ui';
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default {

		data() {
			return {

			}
		},
		props: ['a'],
		methods: {
			cancel() {
                 this.$store.state.is_bottom = true
				this.a.is_reply = false
			},
			sendyyy() { //评论事件
                this.a.is_reply = false
				var disUser = '';
				var disUserPic = '';
				var identification = '';
				var vas = this.$refs.vas.value;

				console.log(this.$store.state.commentWorksdata,'我的id')

				if(vas != '') {
					var url = this.$store.state.request_url + "/api/map/user/artUserInfo.do";
					var id = this.$store.state.data.memId;
					var token = this.$store.state.data.tokEn;
					var ts = new Date().getTime();
					var sign = md5(url + id + token + ts)

					this.$http({
						url: this.$store.state.request_url + "/api/map/user/artUserInfo.do?memId=" + id + "&ts=" + ts,
						method: 'post',
						headers: {
							"content-type": "application/json;charset=UTF-8",
							'sIgn': sign
						},
						body: {
							opId: this.$store.state.data.memId,
						},
						emulateJSON: false,
					}).then(function(response) {
						if(response.body.meta.res == "00000") {
							
							disUser = response.body.data.nickname
							disUserPic = response.body.data.opPic
							identification = response.body.data.idCard

								if(disUserPic == null || disUserPic == "") {
									disUserPic = 'static/img/uploadheadimg.png'
								}
								/*处理身份标识*/
								var icard = ""; //初始化一个存标识的变量
								/*判断是否有身份标识*/
								if(response.body.data.identification != null && response.body.data.identification != "") {
									icard = response.body.data.identification; //赋值
									/*判断是否是作者*/
									if(response.body.data.opId == this.$store.state.commentWorksdata.opId) {
										icard += ',作者';
									} else {
										icard += '';
									}
								} else {
									/*判断是否是作者*/
									if(response.body.data.opId == this.$store.state.commentWorksdata.opId) {
										icard = '作者';
									} else {
										icard = '会员';
								}
								
							}
								console.log(icard)
							var url1 = this.$store.state.request_url + "/api/map/art/artDis.do";
								var sign1 = md5(url1 + id + token + ts)
								this.$http({
									url: this.$store.state.request_url + "/api/map/art/artDis.do?memId=" + id + "&ts=" + ts,
									method: 'post',
									headers: {
										"content-type": "application/json;charset=UTF-8",
										'sIgn': sign1
									},
									body: {
										disId: null, //唯一ID父评论填写null 子评理则填写父评论ID
										opId: this.$store.state.data.memId, //评论会员ID
										disOpId: this.$store.state.commentWorksdata.opId, //被评论会员ID  inps_act 为临时存储该作品所有的信息
										artId: this.$store.state.commentWorksdata.artId, //作品ID

										disContent: vas, //评论内容
										disUser: disUser, //评论人
										disUserPic: disUserPic, //评论人头像Url
										identification: icard //评论会员的身份标识
									},
									emulateJSON: false,
								}).then(function(response) {
									   
//									   console.log(response.body.meta)
									   
									if(response.body.meta.res == "00000") {
										Toast({
											message: '评论成功',
											position: 'middle',
											duration: 2000
										});
										this.$refs.vas.value = ''
                                        this.$store.state.is_bottom = true
										this.cancel()

										this.$emit('huoqu');
		
										this.$parent.pinglun();

										

									}
								}).catch(function(err) {
									//console.log(err)

								})	
								
								
//						}
					}
					}).catch(function(err) {
						//console.log(err)
					})
				} else {
					Toast({
						message: '评论内容不能为空',
						position: 'middle',
						duration: 2000
					});
				}
			}
		}
	}
</script>
</script>

<style scoped="scoped">
	input,
	textarea {
		outline: none;
	}
	
	li {
		list-style-type: none;
	}
	
	* {
		font-family: "微软雅黑";
	}
	
	#app {
		width: 100%;
		height: 13.3rem;
		position: relative;
		z-index:500;
	}
	
	p,
	ul {
		margin: 0;
		padding: 0;
	}
	
	.dia {
		position: fixed;
		bottom: 0;
		z-index: 10;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
		height: 3.7rem;
		background-color: #fff;
		width: 100%;
	}
	
	.dia p {
		height: 30%;
		line-height: 1rem;
		color: rgba(51, 51, 51, 1);
		font-size: 0.32rem;
		text-align: center;
	}
	
	.send {
		width: 18%;
		background-color: #000;
		height: 0.6rem;
		margin-top: 0.2rem;
		margin-right: 0.25rem;
		border-radius: 0.1rem;
		float: right;
	}
	
	.send p {
		color: #fff;
		padding: 0.1rem;
		line-height: 0.4rem;
		text-align: center;
		font-size: 0.3rem;
	}
	
	.head {
		width: 100%;
		height: 0.8rem;
	}
	
	.footer {
		z-index: 4;
		-moz-box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
		/* 老的 Firefox */
		box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
	}
	
	textarea {
		outline: none;
		float: left;
		position: absolute;
		border: 0;
		font-size: 0.3rem;
		margin-top: 0.1rem;
		height: 2rem;
		width: 94%;
		overflow-y: visible;
		color: rgba(180, 180, 180, 1);
		border: 1px #CCCCCC solid;
		padding-left: 0.2rem;
		opacity: 0.01rem;
		margin: 0.3rem 3%;
		border-radius: 0.15rem;
	}
	
	textarea::-webkit-input-placeholder {
		line-height: 0.8rem;
		font-size: 0.3rem;
	}
	
	textarea::-moz-placeholder {
		line-height: 0.8rem;
		font-size: 0.3rem;
	}
	
	textarea::-ms-input-placeholder {
		line-height: 0.8rem;
		font-size: 0.3rem;
	}
</style>