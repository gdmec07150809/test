<template>
	<div style="width: 100%;overflow: hidden;background: white;position: relative;z-index: 300;">
		<div style="width: 100%;overflow: hidden;position:relative;z-index: 300;background: white;">
			<!--<div class="box_top" style="width: 100%;height: 0.88rem;background: white;position: fixed;top: 0;left: 0;z-index: 99;line-height: 0.88rem; border-bottom: 2px #f1f1f1 solid;">
	   		<img @click="hui" style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.29rem;" src="../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;margin-left: 3.1rem;">我的作品</p>
	   </div>-->
			<div class="head" style="z-index: 99999;">
				<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;" src="../../assets/img/zuo.png" @click="hui" />
				<div class="title">
					<p>我的作品</p>
				</div>
			</div>
			<div style="height: 0.78rem;"></div>

			<div v-for="(i,index) in actives" class="boxs">
				<div @click="to_zuopin(i)">
					<div class="chat_box">
						<span style="line-height:1.2rem;margin-left: 0.3rem;float: left;">
			<p style="float: left;font-size: 0.45rem;font-weight: 600;">{{i.insertDate.charAt(8)}}{{i.insertDate.charAt(9)}}日</p>
			<p style="float: left;font-size: 0.25rem;margin-left: 0.1rem;font-weight: 600;">{{i.insertDate.charAt(5)}}{{i.insertDate.charAt(6)}}月</p>
		</span>
					</div>

					<div style="overflow:hidden;vertical-align:middle;text-align:center;max-height: 7rem;" class="img_box" v-if="i.picInfo.length>0">
						<img style="max-height:auto;width:100%;" :src="i.picInfo[0].picUrl" alt="" />
					</div>

					<!--<div class="img-box" v-else-if="i.picInfo.length==2" >
			
		   <div style="height:5rem;width:49.7%;float:left;vertical-align:middle;text-align:center;overflow:hidden;">
			<img style="height:100%;max-width:auto;" :src="i.picInfo[0].picUrl" alt="" />
			</div>
			
			<div style="height:5rem;width:49.7%;float:right;vertical-align:middle;text-align:center;overflow:hidden;">
			  <img style="height:100%;max-width:auto;" :src="i.picInfo[1].picUrl" alt="" />
			</div>
			
		</div>
		
		 <div class="img_box" v-else-if="i.picInfo.length==3" >-->
					<!--大图容器-->
					<!--<div style="width:5rem;height:5rem;float:left;overflow:hidden;vertical-align:middle;text-align:center;">
		 	 <img style="height:100%;max-width:auto;" :src="i.picInfo[0].picUrl"></img>
		   </div> 
		 	 <div style="width: 2.44rem;height: 5rem;float: left;margin-left: 0.04rem;">-->
					<!--小图容器上面-->
					<!--<div style="width:100%;height:2.47rem;overflow:hidden;vertical-align:middle;text-align:center;">
	           	   <img style="max-height:100%;max-width:auto;" :src="i.picInfo[1].picUrl"></img>
	           </div>-->

					<!--小图容器下面-->

					<!--<div style="width:100%;height:2.47rem;overflow:hidden;vertical-align:middle;text-align:center;margin-top: 0.04rem;">
	           	   <img style="max-height:100%;max-width:auto;" :src="i.picInfo[2].picUrl"></img>
	           </div>
	            
		 	 </div>
		 </div>-->
				</div>

				<!--文本容器-->
				<div style="width: 100%;box-sizing: border-box;padding: 0.15rem 0.37rem; 0">
					<!--文本内容-->
					<p style="margin-bottom: 0.1rem;font-size: 0.42rem;font-weight: bold;color: rgba(51, 51, 51, 1);">{{i.artTitle}}</p>
					<p class="text_span">
						{{i.artRemark}}
					</p>
				</div>

				<div class="boxs_to">

					<div style="float: left;width: 60%;">
						<span @click="callTap(i,index)" style="font-size: 0.4rem;float: left;margin-top: 0.04rem;color: #CACACA;width: 15%;text-align: center;">
				
				<span  v-for="c in callStauts">
					
				    <img style="height: 0.5rem;width: 0.5rem;"   v-if="c.id==i.artId&&c.stauts=='1'" src="static/img/icon_detail_good_normal.png"/>
	        		<img style="height: 0.5rem;width: 0.5rem;"  v-else-if="c.id==i.artId&&c.stauts=='2'" src="static/img/icon_detail_good_active.png"/>
				    
			   </span>
						<p v-if="i.readerLike=='0'" style="font-size: 0.22rem;text-align: center;">点赞</p>
						<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerLike.length)==4)?parseInt(i.readerLike)/1000+'k':i.readerLike}}</p>
						</span>
						<span style="font-size: 0.4rem;float: left;margin-top: 0.04rem;color: #CACACA;margin-left: 0.5rem;width: 15%;text-align: center;" @click.stop="commtentTap(i)">
				
				<img src="../../assets/img/icon_detail_comment.png" style="height: 0.5rem;width: 0.5rem;"/>
				<p  v-if="i.readerDiscuss=='0'"  style="font-size: 0.22rem;">评论</p>
				<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerDiscuss.length)==4)?parseInt(i.readerDiscuss)/1000+'k':i.readerDiscuss}}</p>
				</span>
						<span @click="zhuan_f(i)" style="font-size: 0.4rem;float: left;margin-top: 0.04rem;color: #CACACA;margin-left: 0.5rem;width: 15%;text-align: center;">
				
				<img src="../../assets/img/icon_detail_share.png" style="height: 0.5rem;width: 0.5rem;"/>
				<p v-if="i.readerForward=='0'" style="font-size: 0.22rem;">转发</p>
				<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerForward.length)==4)?parseInt(i.readerForward)/1000+'k':i.readerForward}}</p>
				</span>

						<span @click="bianji(i)" style="font-size: 0.4rem;float: left;margin-top: 0.04rem;color: #CACACA;margin-left: 0.5rem;width: 15%;text-align: center;">
				      <img src="../../assets/img/icon_detail_edit.png" style="height: 0.5rem;width: 0.5rem;"/>
					 <p style="font-size: 0.22rem;">编辑</p>
				</span>

					</div>

					<span @click="shan_chus(index)" style="float: right;margin-top: 0.04rem;margin-right: 0.3rem;line-height: 1rem;">
				
				<p style="font-size: 0.28rem;color: #ff9d00;">删除作品</p>
			</span>
				</div>
				<div style="width: 100%;height: 0.3rem;background: #F6F6F6;"></div>

			</div>
			<div class="more" @click="listenScroll" v-if="actives.length>0">
				<p style="color: #D0D0D0;font-size: 0.3rem;text-align: center;">{{more_text}}</p>
			</div>
			<div class="no_article" v-if="actives.length==0">
				<img src="../../assets/img/icon_noPaint.png" style="width: 100%;height: 100%;" />
				<p>您还未发布任何作品</p>
			</div>
		</div>

		<!--
        	作者：2443611475@qq.com
        	时间：2018-05-11
        	描述：点击删除弹出，决定框
        -->
		<!--<div v-show="xian_s" class="zhe"  @touchmove.prevent>
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="width:100%;height: 0.07rem;"></div>
				<p style="font-size:0.38rem;margin-top:1rem;">请确认是否删除该作品?</p>
				<div  style="width:100%;height:1rem;margin-top: 0.56rem;border-top:0.02rem solid #E0E0E0;line-height: 1rem;">
					<div @click="shan_chu" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.38rem;">
						 确定
					</div>
					<div @click="shan_s" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.38rem;">
						 取消
					</div>
				</div>
				
			</div>
		</div>-->
		<div v-show="xian_s" class="zhe" @touchmove.prevent @click="shan_s">
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 1.9rem;">
					<p style="font-size:0.32rem;">请确认是否删除该作品?</p>
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
	import { Toast } from 'mint-ui';
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default {
		store,
		data() {
			return {
				//				act:[
				//				  {h:'尾巴开箱'},
				//				  {h:'用户ID'},
				//				   {h:'用户ID'},
				//				],
				likes: [],

				yang_si: {
					noa1: true,
					noe1: false,
					noa2: true,
					noe2: false,
					noa3: true,
					noe3: false
				},

				actives: [],
				page: 1,
				more_text: '点击加载更多',
				callStauts: [], //储存点赞状态
				call: {
					id: '',
					stauts: ''
				},
				index: '',
				xian_s: false,
			}
		},
		methods: {
			bianji(i) {
				//console.log(i)
				var url = this.$store.state.request_url + "/api/map/art/selectByPK.do";
				var memId = this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				this.$http({ //查询作品基础信息
					url: this.$store.state.request_url + "/api/map/art/selectByPK.do?memId=" + memId + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						artId: i.artId //作品Id
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						console.log(response.body.data,'作品信息')

						this.$store.state.bian_ji_show = 2
						this.$store.state.work_artid = response.body.data.artId //作品id

						this.$store.state.img_box.picUrl = response.body.data.picInfo[0].picUrl //图片
						this.$store.state.Data_set.The_name_of_the_work = response.body.data.artTitle //标题

						this.$store.state.Data_set.artClassification = response.body.data.artType.artClassification //类型一级分类
						this.$store.state.Data_set.Type_work = response.body.data.artType.classificationName //类型
						this.$store.state.Data_set.Version_number = response.body.data.artType.printPic //版数
						this.$store.state.Data_set.nian_dai = response.body.data.artDecription.createDecade //年份
						this.$store.state.Data_set.cai_zhi = response.body.data.artDecription.material //材质
						this.$store.state.Data_set.ti_cai = response.body.data.artDecription.createTheme //题材
						this.$store.state.Data_set.chang = response.body.data.artDecription.artLength //长
						this.$store.state.Data_set.kuan = response.body.data.artDecription.artWidth //宽
						this.$store.state.Data_set.gao = response.body.data.artDecription.artHeight //高
						this.$store.state.Data_set.Description_of_creation = response.body.data.artRemark //作品内容
						this.$store.state.Data_set.artExpandOne = response.body.data.sellFlag //展示
						this.$store.state.Data_set.money = response.body.data.retailPrice //展示
						
						if(response.body.data.artCopyright.split(",")[1]=="undefined"){
							this.$store.state.Data_set.original_author = ""
						}else{
						this.$store.state.Data_set.original_author = response.body.data.artCopyright.split(",")[1]
						}
						this.$router.push({
							path: '../add'
						});
					}
				})
			},
			searchCall(item) { //查询点赞事件、、在获取数据内部调用
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

					if(response.body.meta.res == '00000') {
						//console.log(response.body.meta.msg, "状态");
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
			shan_s() {
				this.xian_s = false
			},
			shan_chus(index) {
				this.index = index
				this.xian_s = true
			},
			zhuan_f(i) { //微信转发功能
				//console.log("1111111111",i)
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
						forwardType: "1",
						artId: i.artId
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {
						var ti = '';
						if(response.body.data.title.length > 10) {
							ti = response.body.data.title.substring(0, 10) + "..."
						} else {
							ti = response.body.data.title
						}

						this.$store.state.share_url = response.body.data.forwardUrl

						/*好友*/
						this.$store.state.share_title = "【"+response.body.data.template+"|"+response.body.data.artType+"】 " + localStorage.nickname  + "《" + ti + "》";

						this.$store.state.share_content = "突围艺术圈,人气超58%的用户!觅艺APP:一个与众不同交流的泛艺术社交平台!"

						/**朋友圈*/
						this.$store.state.share_new_title = response.body.data.title;

						this.$store.state.share_new_content = "【"+response.body.data.template+"|"+response.body.data.artType+"】 " + localStorage.nickname  + "《" + ti + "》";

						this.$store.state.share_img = response.body.data.picUrl
						//console.log(this.$store.state.share_new_content, "-", this.$store.state.share_title)
						this.$store.state.tableList.share();
						//console.log(this.$store.state.share_title)
						
					}
				}).catch(function(err) {
					//console.log(err)
				})

			},
			shan_chu() {
				var url = this.$store.state.request_url + "/api/map/art/deleteArt.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				//console.log(this.$store.state.data.memId)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/deleteArt.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId,
						artId: this.actives[this.index].artId
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {

						this.actives.splice(this.index, 1)
						this.xian_s = false
						Toast({
							message: '删除成功',
							position: 'middle',
							duration: 2000
						});

					} else {
						Toast({
							message: '网络错误',
							position: 'middle',
							duration: 2000
						});
					}
				}).catch(function(err) {
					//console.log(err)
				})

			},
			hui() {
				//				window.location = '#/myspace'
				this.$router.push({
					path: '../myspace'
				});
			},

			huoqushuju() { //页面刷新获取数据
				var url = this.$store.state.request_url + "/api/map/art/selectFlag.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				//console.log(this.$store.state.data.memId)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/selectFlag.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId,
						typeId: '1',
						page: this.page,
						rows: 10
					}
				}).then(function(response) {

					if(response.body.meta.res == '00000') {

						if(response.body.data.artResponseList.length > 0) {
							for(var i = 0; i < response.body.data.artResponseList.length; i++) {
								this.actives.push(response.body.data.artResponseList[i])
								this.searchCall(response.body.data.artResponseList[i]);
							}
							this.more_text = "点击加载更多"

						} else if(response.body.data.artResponseList.length == 0) {

							this.more_text = "已经没有更多了"

						}
						//                  this.actives = response.body.data.artResponseList

						//console.log( this.actives,'嘻嘻嘻嘻')
					}
				}).catch(function(err) {
					//console.log(err)
				})

			},

			callTap(item, i) {
				//console.log(item, "点赞作品", i)

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
						likeType: "1", //类型
						artId: item.artId, //作品Id
						likeOpId: this.$store.state.data.memId //用户Id
					}
				}).then(function(response) {
					//console.log(response.body,'点赞')
					this.callStauts = [];
					if(response.body.meta.res == "00000") {
						for(var j = 0; j < this.actives.length; j++) {

							this.searchCall(this.actives[j]);
						}
						Toast({
							message: "点赞成功",
							position: 'middle',
							duration: 2000
						});

						this.actives[i].readerLike += 1

					} else if(response.body.meta.res == "99999") {
						//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、,,,,,
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
							this.callStauts = [];
							if(response.body.meta.res == "00000") {
								for(var j = 0; j < this.actives.length; j++) {
									this.searchCall(this.actives[j]);
								}
								this.actives[i].readerLike -= 1
							}
						}).catch(function(err) { //console.log(err)
						})
						//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			commtentTap(i) {
				this.$store.state.worksName = '作品'
				this.$store.state.back_id = 3
				this.$store.state.worksId = i.artId;
				this.$store.state.is_tan = true; //进入详情弹出评论

				//		  	 window.location = '/#/works_detail'
				this.$router.push({
					path: '../works_detail'
				});
			},
			to_zuopin(i) {

				this.$store.state.worksName = '作品'
				this.$store.state.back_id = 3
				this.$store.state.worksId = i.artId

				//		  	 window.location = '/#/works_detail'
				this.$router.push({
					path: '../works_detail'
				});

			},
			/*加载*/
			moreTap() {
				//console.log("加载")
				this.more_text = "加载中"
				this.page += 1;
				this.huoqushuju();
			},
			/*监听滚动事件，上滑加载更多*/
			listenScroll() {
				if(this.more_text === "点击加载更多") {
					//console.log(11111)
					this.moreTap();
				}
				//				//console.log("8888888888888888888888888")
				//				var _that = this;
				//				$(window).scroll(function() {
				//					let scrollTop = $(window).scrollTop();
				//					let windowTop = $(window).height();
				//					let documentTop = $(document).height();
				//					if(documentTop - windowTop <= scrollTop) {
				//						////console.log(_that.more_text)
				//						//console.log(_that.more_text === "上滑加载更多")
				//						if(_that.more_text === "上滑加载更多") {
				//							//console.log(11111)
				//							_that.moreTap();
				//						}
				//
				//					}
				//				});
			}

		},
		computed: {

		},
		mounted() {
			this.$store.state.is_bottom = false;
			this.huoqushuju()
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
		z-index: 300;
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
	
	.boxs {
		width: 100%;
		background: white;
	}
	
	.chat_box {
		width: 100%;
		height: 1.2rem;
		margin-top: 0.2rem;
	}
	
	.imgs {
		width: 1rem;
		height: 1rem;
		margin: 0.1rem 0.25rem;
		border-radius: 50%;
	}
	
	.text_box {
		width: 5.78rem;
		height: 100%;
		float: right;
		position: relative;
		line-height: 1.2rem;
	}
	
	.img_box {
		width: 100%;
		/*height: 5rem;*/
		vertical-align: middle;
		text-align: center;
		overflow: hidden;
	}
	
	.text_span {
		font-size: 0.28rem;
		color: #999999;
		word-break: break-all;
		white-space: normal;
	}
	
	.boxs_to {
		width: 100%;
		height: 1.3rem;
		padding: 0.3rem 0 0.1rem 0.4rem;
		position: relative;
		margin: 0.25rem auto;
		border-top: 0.005rem solid #f1f1f1;
	}
	
	.imgs {
		display: none;
	}
	
	.imgs_to {
		display: block;
	}
	
	.more {
		padding-top: 0.3rem;
		width: 100%;
		height: 1rem;
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
		z-index: 300;
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
</style>