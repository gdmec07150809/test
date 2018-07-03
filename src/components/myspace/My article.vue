<template>
	<div style="width: 100%;overflow:hidden;position: relative;z-index: 300;background: white;">
		<!--
        	作者：2443611475@qq.com
        	时间：2018-04-12
        	描述：我的文章
        -->
		<!--<div style="width: 100%;height: 0.88rem;position: fixed;top:0;left: 0;z-index: 300;line-height: 0.88rem;border-bottom: 0.005rem solid #999999;background: white;">
			<img @click="hui" style="width: 0.4rem;height: 0.4rem;float:left;margin:0.25rem 0.3rem;" src="../../assets/img/zuo.png" alt="" />
			<p style="font-size: 0.35rem;margin-left: 3.1rem;">我的文章</p>
		</div>-->
		<div class="head" style="z-index: 99999;">
			<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;" src="../../assets/img/zuo.png" @click="hui" />
			<div class="title">
				<p>我的文章</p>
			</div>
		</div>

		<div style="height: 0.88rem;"></div>

		<div class="box" v-for="(i,index) in data">
			<div class="box_childa">
				<div @click="wenzhang(i)">

					<div style="width:100%;height:1rem;line-height: 1rem;position: relative;">
						<p style="font-size:0.48rem;font-weight: 600;position: absolute;left: 0rem;">{{i.insertDate.split(' ')[0].split("-")[2]}}日</p>
						<p style="font-size:0.3rem;margin-left: 0.2rem;font-weight: 600;position: absolute;left: 1rem;">{{i.insertDate.split(' ')[0].split("-")[1]}}月</p>
					</div>

					<div class="box_childb" style="">

						<div style="float:left;height:1.5rem;overflow:hidden;width:2rem;position: relative;">
							<img style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);min-width:100%;min-height:100%;max-height:150%;max-width: 150%;" v-if="i.picInfo.length>0" :src="i.picInfo[0].picUrl" />
						</div>

						<div style="width:4.6rem;height:100%;float:right;">
							<p style="font-size:0.32rem;display: -webkit-box;display: -moz-box;overflow: hidden;text-overflow: ellipsis;word-break: break-all;-webkit-box-orient: vertical;-webkit-line-clamp: 2;font-weight:600;margin-bottom:0.05rem;">{{i.artTitle}}</p>

							<p class="p_box" :class="{p_box1:i.artTitle.length>13}" style="font-size:0.2rem;-webkit-box-orient: vertical">{{html_detail(i.docUrl)}}</p>

							<div class="zhuang1" v-if="i.artFlag=='3'">深度</div>
							<div class="zhuang2" v-else-if="i.artFlag=='4'">头条</div>
						</div>
					</div>
				</div>

				<div style="width: 100%;height: 1rem;margin-top: 0.2rem;border-top:0.01rem solid #F7F7F7;">

					<!--<div style="margin-right: 0.2rem;" class="box_bottom">
						<i style="font-size:0.5rem;margin-top:0.15rem;" class="fa fa-pencil-square-o"></i>
						<p>编辑</p>
					</div>-->

					<!--<div class="box_bottom" @click="replyTap(i)">
	        			<i style="font-size:0.5rem;margin-top:0.15rem;" class="fa fa-comment-o">
	        				<img src="../assets/img/icon_detail_comment.png"/>
	        			</i>
	        			<p>评论</p>
	        		</div>-->

					<div style="margin:0;float: left;" class="box_bottom" @click="callTap(i,index)">
						<span style="font-size:0.5rem;" v-for="c in callStauts">
	        				<img class="like" v-if="c.id==i.artId&&c.stauts=='1'" src="../../../static/img/icon_detail_good_normal.png"/>
	        				<img class="like" v-else-if="c.id==i.artId&&c.stauts=='2'" src="../../../static/img/icon_detail_good_active.png"/>
	        			</span>
						<p v-if="i.readerLike==0" style="position: absolute;bottom: 0.25rem;left:0.2rem;font-size: 0.2rem;">点赞</p>
						<p v-else style="font-size:0.22rem;position: absolute;bottom: 0.25rem;text-align:center;width:0.9rem;">{{(parseInt(i.readerLike.length)==4)?parseInt(i.readerLike)/1000+'k':i.readerLike}}</p>

					</div>

					<div class="box_bottom" style="margin-top: 0rem;float: left;" @click="zhuan_f(i)">
						<!--<i style="font-size:0.5rem;margin-top:0.15rem;" class="fa fa-share">-->
						<img style="width:0.5rem;margin-top: 0.17rem;" src="../../assets/img/icon_detail_share.png" />
						<!--</i>-->
						<p style="position: absolute;bottom: 0.25rem;left:0.2rem;font-size: 0.2rem;">转发</p>
					</div>

					<div style="margin-left: 0.3rem;width: 2rem;line-height: 1.2rem;color: rgb(255, 157, 0);" class="box_bottoms" @click="del_article(i,index)">
						删除作品
					</div>

				</div>

			</div>
			<div style="width: 100%;height: 0.24rem;background:rgba(246,246,246,1);"></div>
		</div>
		<div class="more" @click="listenScroll" v-if="data.length>0">
			<p style="color: #D0D0D0;font-size: 0.3rem;">{{more_text}}</p>
		</div>
		<div class="no_article" v-if="data.length==0">
			<img src="../../assets/img/icon_noArticle.png" style="width: 100%;height: 100%;" />
			<p>您还未发布任何文章</p>
		</div>

		<!--
        	作者：2443611475@qq.com
        	时间：2018-05-25
        	描述：删除确认框
        -->
		<div v-show="xian_s" class="zhe" @touchmove.prevent @click="shan_s">
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 1.9rem;">
					<p style="font-size:0.32rem;">请确认是否删除该文章?</p>
				</div>
				<div style="width:100%;height:0.96rem;border-top:0.02rem solid #E0E0E0;line-height: 0.96rem;">
					<div @click="shan_chu" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.32rem;">
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
	import { Toast } from 'mint-ui';
	import md5 from 'js-md5';
	export default {
		store,
		components: {

		},
		data() {
			return {
				xian_s: false,
				index_s: '',

				data: [],
				day: [],
				month: [],
				callStauts: [], //储存点赞状态
				reply: {
					is_reply: false
				},
				call: {
					id: '',
					stauts: ''
				},

				page: 1,
				more_text: '点击加载更多',
				date: ''
			}
		},
		methods: {
//			html_detail(i) {
//				console.log(i,"33333333")
//				if(i){
//					var str = i.docUrl;
//					var dd = str.replace(/<\/?.+?>/g, "")
//					var dds = dd.replace(/ /g, "");
//					var ddss = dds.replace(/[ ]|[&nbsp;]/g, "");
//					////console.log(dds,"999999999")
//					return ddss;
//				}
				
//			},
			wenzhang(i) {
				this.$store.state.tr = 4

				this.$store.state.zuopin_x = i

				this.$router.push({
					path: '../Details_of_the_article'
				});

			},

			hui() {
				//				window.location = '#/myspace'
				this.$router.push({
					path: '../myspace'
				});
			},
			/*获取文章*/
			getArticle() {

				var url = this.$store.state.request_url + "/api/map/art/selectFlag.do";
				var memId = this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/selectFlag.do?memId=" + memId + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId,
						typeId: '3',
						page: this.page,
						rows: 4
					}
				}).then(function(response) {
					//console.log(response.body.data)
					if(response.body.meta.res == '00000') {

						if(response.body.data.artDocumentsList.length > 0) { //判断返回来的数据长度
							for(var i = 0; i < response.body.data.artDocumentsList.length; i++) {
								this.data.push(response.body.data.artDocumentsList[i]) //添加到备用数组内

								this.searchCall(response.body.data.artDocumentsList[i]) //查询点赞

							}
							this.more_text = "点击加载更多"
							//console.log(this.data)
						} else if(response.body.data.artDocumentsList.length == 0) {

							this.more_text = "已经没有更多了"

						}
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			/*查询点赞状态*/
			searchCall(item) {
				this.callStauts = []
				//				//console.log(item.artId, "查询点赞")
				var url = this.$store.state.request_url + "/api/map/art/likeForOpId.do";
				var memId = this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/likeForOpId.do?memId=" + memId + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId, //测试当前用户Id
						attentionOpId: item.opId, //作者Id
						artId: item.artId //作品Id
					}
				}).then(function(response) {
					//console.log(item.artId, response.body.meta.msg, "状态");
					if(response.body.meta.res == '00000') {
						//console.log(item.artId, response.body.meta.msg, "状态");
						if(response.body.meta.msg == "NO") {
							this.call.id = item.artId;
							this.call.stauts = "1";
							this.callStauts.push(this.call); //未点赞
							this.call = {};
						} else if(response.body.meta.msg == "YES") {
							this.call.id = item.artId;
							this.call.stauts = "2";
							this.callStauts.push(this.call); //已点赞
							this.call = {};
						}
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			/*点赞事件*/
			callTap(item, i) {

				var url = this.$store.state.request_url + "/api/map/art/artLike.do";
				var memId = this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);

				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artLike.do?memId=" + memId + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: item.opId, //作者Id
						likeType: item.artFlag, //类型
						artId: item.artId, //作品Id
						likeOpId: this.$store.state.data.memId //用户Id
					}
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						for(var j = 0; j < this.data.length; j++) {
							this.searchCall(this.data[j]);
						}
						Toast({
							message: "点赞成功",
							position: 'middle',
							duration: 2000
						});
						//				//console.log(this.act[i].readerLike)			
						this.data[i].readerLike += 1
					} else if(response.body.meta.res == "99999") {

						var url = this.$store.state.request_url + "/api/map/art/cancelLike.do";
						var sign = md5(url + memId + token + ts);
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/cancelLike.do?memId=" + memId + "&ts=" + ts,
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							emulateJSON: false,
							method: 'post',
							body: {

								artId: item.artId, //作品Id
								likeOpId: this.$store.state.data.memId //用户Id
							}
						}).then(function(response) {
							if(response.body.meta.res == "00000") {
								for(var j = 0; j < this.data.length; j++) {
									this.searchCall(this.data[j]);
								}

								this.data[i].readerLike -= 1
							}
						}).catch(function(err) { //console.log(err)
						})

					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			/*评论*/
			replyTap(e) {
				this.$store.state.commentWorksdata = e; //闲情信息，评论用
				this.reply.is_reply = true
			},
			/*删除文章*/
			del_article(item, i) {
				this.xian_s = true
				this.index_s = i
			},
			shan_s() {
				this.xian_s = false
			},
			zhuan_f(i) { //微信转发功能
				//console.log(i,"33333333333333")
				var url = this.$store.state.request_url + "/api/map/art/artForward.do"; //state.request_url
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artForward.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: id,
						forwardOpId: i.opId,
						forwardType: i.artFlag,
						artId: i.artId
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {

						this.$store.state.share_url = response.body.data.forwardUrl
						
					
						/*好友*/
						this.$store.state.share_title = "【"+response.body.data.template+"】 " + response.body.data.title;
						if(i.docUrl) {
							this.$store.state.share_content = this.html_detail(i.docUrl)
						} else {
							this.$store.state.share_content = "觅艺APP:艺术交友、交流、交易的互联网社区平台"
						}

						/**朋友圈*/
						this.$store.state.share_new_title = response.body.data.title;
						if(i.docUrl) {
							this.$store.state.share_new_content = "【"+response.body.data.template+"】 " + this.html_detail(i.docUrl);
						} else {
							this.$store.state.share_new_content = "觅艺APP:艺术交友、交流、交易的互联网社区平台"
						}
						
						
						console.log(this.$store.state.share_new_content,"-",this.$store.state.share_content)
						this.$store.state.share_img = response.body.data.picUrl
						this.$store.state.tableList.share();

					}
				}).catch(function(err) {
					//console.log(err)
				})

			},
			/*处理标签*/
			html_detail(i){
				var str=i;
				 var dd=str.replace(/<\/?.+?>/g,"")
				 var dds=dd.replace(/ /g,"");
				  var ddss=dds.replace(/[ ]|[&nbsp;]/g,"");
				//console.log(dds,"999999999")
				return ddss;
			},
			shan_chu() {
				var url = this.$store.state.request_url + "/api/map/art/deleteArt.do";
				var memId = this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);

				this.$http({
					url: this.$store.state.request_url + "/api/map/art/deleteArt.do?memId=" + memId + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.data[this.index_s].opId, //作者Id
						artId: this.data[this.index_s].artId, //作品Id
					}
				}).then(function(response) {
					if(response.body.meta.res == "00000") {

						/*提示语*/
						Toast({
							message: "删除成功",
							position: 'middle',
							duration: 2000
						});

						this.data.splice(this.index_s, 1); //删除文章
						this.xian_s = false
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			/*加载*/
			moreTap() {

				this.more_text = "加载中"
				this.page += 1;
				this.getArticle();
			},
			/*监听滚动事件，上滑加载更多*/
			listenScroll() {
				if(this.more_text === "点击加载更多") {
					//console.log(11111)
					this.moreTap();
				}
				//				var _that = this;
				//				$(window).scroll(function() {
				//					
				//					let scrollTop = $(window).scrollTop();
				//					let windowTop = $(window).height();
				//					let documentTop = $(document).height();
				//					if(documentTop - windowTop <= scrollTop) {
				//								
				//						if(this.more_text == "上滑加载更多") {
				//							
				//							this.moreTap();
				//						}
				//					
				//					}
				//				});
			}
		},
		mounted() {
			this.$store.state.is_bottom = false;
			this.getArticle();
			//this.listenScroll();

		}
	}
</script>

<style scoped="scoped">
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
	
	.box {
		width: 100%;
		height: 3.94rem;
		/*background: powderblue;*/
		position: relative;
		background: white;
		z-index: 9993;
	}
	
	.box_childa {
		width: 92%;
		height: 3.8rem;
		/*background: #CCCCCC;*/
		margin: 0 auto;
	}
	
	.box_childb {
		width: 100%;
		height: 1.5rem;
		/*background: #CCCCCC;*/
	}
	
	.p_box {
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.zhuang {
		width: 0.8rem;
		height: 0.27rem;
		border: 0.005rem solid #ADADAD;
		color: #ADADAD;
		border-radius: 0.05rem;
		float: left;
		font-size: 0.2rem;
		text-align: center;
		line-height: 0.27rem;
		margin-top: 0.15rem;
	}
	
	.zhuang1 {
		width: 0.8rem;
		height: 0.27rem;
		border: 0.005rem solid #2BA4F2;
		color: #2BA4F2;
		border-radius: 0.05rem;
		float: left;
		font-size: 0.2rem;
		text-align: center;
		line-height: 0.27rem;
		margin-top: 0.15rem;
	}
	
	.zhuang2 {
		width: 0.8rem;
		height: 0.27rem;
		border: 0.005rem solid #FD5858;
		color: #FD5858;
		border-radius: 0.05rem;
		float: left;
		font-size: 0.2rem;
		text-align: center;
		line-height: 0.27rem;
		margin-top: 0.15rem;
	}
	
	.box_bottoms {
		width: 0.8rem;
		height: 1rem;
		float: right;
		/*background: #0000FF;*/
		margin-right: 0rem;
		font-size: 0.26rem;
		text-align: center;
		color: #999999;
	}
	
	.box_bottom {
		width: 0.9rem;
		height: 1.3rem;
		float: right;
		/*background: #0000FF;*/
		margin-left: 0.3rem;
		font-size: 0.26rem;
		text-align: center;
		color: #999999;
		position: relative;
	}
	
	.more {
		padding-top: 0.3rem;
		width: 100%;
		height: 0.8rem;
		text-align: center;
		background-color: #fff;
	}
	
	.head {
		width: 100%;
		height: 1rem;
		position: fixed;
		top: 0;
		background: white;
		box-sizing: border-box;
		padding-top: 0.3rem;
		border-bottom: 1px solid #f1f1f1;
	}
	
	.title {
		width: 80%;
		height: 100%;
		float: left;
		font-size: 0.35rem;
		text-align: center;
	}
	
	.no_article {
		width: 30%;
		margin-left: 35%;
		margin-top: 3rem;
		text-align: center;
	}
	
	.no_article p {
		color: #D0D0D0;
		font-size: 0.25rem;
		margin-top: 0.2rem;
	}
	
	.like {
		width: 0.5rem;
		margin-top: 0.15rem;
	}
	
	.p_box1 {
		width: 100%;
		font-size: 0.24rem;
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		/*margin-top: 0.2rem;*/
		color: #999999;
	}
</style>