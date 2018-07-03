<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-04-02
    	描述：文章详情////////////////////////如果该页面修改，Details of the article(2).vue页面也要做对应修改********************
    -->
	<div style="width: 100%;background:white;;z-index:300;" class="test">
		<div class="head">
			<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;" src="../../../assets/img/zuo.png" @click="hui" />
			<div class="title">
				<p>文章详情</p>
			</div>

			<img class="img2" src="../../../assets/img/icon_detail_more.png" @click="reportTap()" />
		</div>
		<!--<div style="width:100%;height: 4.21rem;overflow:hidden; vertical-align:middle;text-align: center;position: relative;">
			<img @load="img_chuli" id="img_box" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);width: 7.5rem;height: auto;" :src="actives.picUrl[0].picUrl" alt="" />
		</div>-->

		<div class="box_child">
			<!-- 标题 -->
			<p style="font-size:0.5rem;margin-top:0.42rem;font-weight: bold;">{{actives.artTitle}}</p>
			<!--用户头像和ID-->
			<div @click="fensi" style="width:100%;height:0.54rem;line-height:0.54rem;margin-top:0.3rem;">
				<img class="tou" :src="actives.opPic" alt="" />
				<p style="font-size:0.3rem;float:left;margin-left:0.18rem;">{{actives.nickname}} </p>
				<!--时间-->
				<p style="font-size:0.28rem;float:right;color:#CCCCCC;">{{dates}}</p>
			</div>
			<div class="test2" v-html="actives.docUrl" style="margin-top: 0.3rem; font-size: 0.3rem; line-height: 0.8rem !important; "></div>
			<!--文章内容-->
			<!--<p style="font-size:0.25rem;width:100%;margin-top: 0.25rem;">
	      	{{text_1}}</p>
	       
	      <p style="font-size:0.25rem;width:100%;margin-top: 0.4rem;">
	      	{{text_2}}
	      </p>
	      
	      <div style="width:100%;height:4.3rem;margin-top: 0.25rem;overflow:hidden; vertical-align:middle;text-align: center;">
			<img v-show="img2" style="max-height:auto;width:100%;" :src="img2" alt="" />
		</div>
	      
	      
	      <p style="font-size:0.25rem;width:100%;margin-top: 0.3rem;">
	      	{{text_3}}
	      </p>-->
			<!--标签-->
			<div v-show="r.length!=0" style="width:100%;margin-top: 0.34rem;overflow: hidden;padding-bottom:0.1rem;">

				<div v-for="i in r" class="tab">{{i}}</div>

			</div>
			<!--打赏按钮-->
			<div @click="dahsang" class="da">
				<img class="imgg" src="../../../assets/img/home/icon_detail_tip.png" alt="" />
				<p style="font-size:0.25rem;margin-left:0.45rem;">打赏</p>
			</div>

			<div style="width:110%;height:0.2rem;background:#F7F7F7;margin-left:-0.3rem;"></div>
		</div>
		<!--用户评论区-->
		<div v-for="(i,index) in pin"  style="width:95%;margin: 0 auto;position: relative;z-index: 300;overflow:hidden;">

			<div style="width:100%;height:0.8rem;margin-top: 0.2rem;float: left;">
				<img class="tou" style="margin-top:0.1rem;" :src="i.disUserPic" alt="" />
				<p style="font-size:0.3rem;float:left;margin-left:0.2rem;color:#B1B1B1;line-height:0.8rem; ">{{i.disUser}}</p>
				<div v-show="i.identification=='剪刀手'" class="biao_box">{{i.identification}}</div>

				<!--<img class="zy" src="../../../assets/img/home/icon_comment_translation.png" alt="" />-->

				<!--
                    	作者：2443611475@qq.com
                    	时间：2018-04-02
                    	描述：差评
                    -->
				<span @click="no_like(index)" style="font-size:0.3rem;float:right;color:#B6B6B6;" v-if="i.identification=='剪刀手'">
    					<p style="float: left;margin-right: 0.06rem;">{{i.disDislike}}</p>
    				  <span v-for="c in callStauts_s_s">
    					<img  v-if="c.id==i.disId&&c.stauts=='1'"  src="../../../assets/img/cai.png" style="width:0.32rem;height: 0.32rem;"/>
    					<img  v-else-if="c.id==i.disId&&c.stauts=='2'" src="../../../assets/img/caiguo.png" style="width:0.32rem;height: 0.32rem;"/>
    				  </span>
				</span>
				<!--
                    	作者：2443611475@qq.com
                    	时间：2018-04-02
                    	描述：好评
                    -->
				<span @click="_like(index)" style="font-size:0.3rem;float:right;margin-right:0.35rem;color:#B6B6B6;">
    					<p style="float: left;margin-right: 0.06rem;">{{i.disLike}}</p>
    					
    				  <span  v-for="c in callStauts_s">
    					<img v-if="c.id==i.disId&&c.stauts=='1'" src="../../../assets/img/icon_comment_good.png" style="width:0.32rem;height: 0.32rem;"/>
    					<img v-else-if="c.id==i.disId&&c.stauts=='2'" src="../../../assets/img/icon_comment_good_active.png" style="width:0.32rem;height: 0.32rem;"/>
    				  </span>
				</span>
			</div>

			<div style="width: 6.47rem;margin-left:0.2rem;float:right;border-bottom:0.005rem solid #f1f1f1;">
				<div @click="complaint(i)">
				<p style="font-size:0.3rem;margin-bottom: 0.24rem;color:#333333;word-break:break-all;white-space:normal;margin-left: 0.2rem;">
					{{i.disContent}}</p>

				<span style="float:left;width: 100%;margin-bottom:0.1rem;">
    			<p style="font-size: 0.22rem;color: #C6C6C6;float: left;     margin-left: 0.2rem;">{{jisuan_time(i)}}</p>
    			<p style="font-size: 0.26rem;color: #F2850D;float: right;" v-if="i.identification=='剪刀手'" @click.stop="dashang_dao(i)">打赏剪刀手</p>
    			</span>
    			</div>
				<div v-show="i.replyTotal!='0'" class="more_content" @click="fensi_s(i)">
					<p>查看全部{{i.replyTotal}}条回复</p>
					<img src="../../../assets/img/come_icon.png" />
				</div>
				<!--<span style="margin-top: 0.15rem;float:left;font-size: 0.24rem;">-->
				<!--<p style="float: left;">查看全部4条回复</p>-->
				<!--<i style="font-size: 0.4rem;margin-left:0.1rem;margin-top:-0.05rem;" class="fa fa-angle-right"></i>-->
				<!--</span>-->
			</div>
		</div>
		<div style="width: 100%;height: 1.5rem;"></div>

		<div class="box_bottom">
			<!--
        	返回按钮
        -->
			<!--<img @click="hui" class="img_to" src="../../../assets/img/zuo.png" alt="" />-->

			<!--
        	输入框
        -->
			<div @click="qiyong">
				<input @keyup="alertA($event)" ref='vas' class="inps" type="text" disabled="disabled" placeholder="我也来说两句..." />

			</div>

			<!--
        	点赞按钮
       -->
       
			<div class="shu_content" @click="qiyong">
				<!--<img v-if="likes" class="ims" src="../../../assets/img/home/icon_detail_good_normal.png" alt="" />
				<img v-else class="ims" src="static/img/icon_detail_good_active.png" alt="" />-->
				<div class="shu" v-if="actives.readerDiscuss>0">{{(parseInt(actives.readerDiscuss.length)==4)?parseInt(actives.readerDiscuss)/1000+'k':actives.readerDiscuss}}</div>
				<img class="ims" src="../../../assets/img/icon_detail_comment.png" alt="" />

				<!--<p style="margin-left: 0.28rem;font-size: 0.2rem;" v-if="actives.readerLike>0">{{(actives.readerLike.length==4)?parseInt(actives.readerLike)/1000+'k':actives.readerLike}}</p>-->

			</div>
			
				<div class="shu_content">
				<div class="shu" v-if="actives.readerLike>0">{{(parseInt(actives.readerLike.length)==4)?parseInt(actives.readerLike)/1000+'k':actives.readerLike}}</div>
				<img @click="like_to" v-if="likes" class="ims" src="../../../assets/img/home/icon_detail_good_normal.png" alt="" />
				<img @click="like_to" v-else class="ims" src="static/img/icon_detail_good_active.png" alt="" />

			</div>
			<!--
        	收藏按钮
         -->
			<div class="shu_content">
				<div class="shu" v-if="actives.readerCollect>0">{{(parseInt(actives.readerCollect.length)==4)?parseInt(actives.readerCollect)/1000+'k':actives.readerCollect}}</div>
				<img @click="shou_to" v-if="shou" class="ims" src="../../../assets/img/home/icon_detail_collect_normal.png" alt="" />
				<img @click="shou_to" v-else class="ims" src="static/img/icon_detail_collect_active.png" alt="" />

			</div>

			<!--
        	转发按钮
        -->
			<div @click="zhuan_f" class="shu_content">
				<div class="shu" v-if="actives.readerForward>0">{{(parseInt(actives.readerForward.length)==4)?parseInt(actives.readerForward)/1000+'k':actives.readerForward}}</div>
				<img class="ims" src="../../../assets/img/icon_detail_share.png" alt="" />

			</div>

		</div>

		<dashang v-show='$store.state.dashang'></dashang>

		<!--
      	作者：2443611475@qq.com
      	时间：2018-05-19
      	描述：评论
      -->
		<div style="position: relative;z-index: 9999;">
			<replydialog v-bind:a='reply' @huoqu="pinglun"></replydialog>
			<reportdialog v-bind:f='report'></reportdialog>
			<workschild v-bind:m='message'></workschild>
			<showdialog v-bind:d='mes' @huoqu="Gdoc"></showdialog>
		</div>

	</div>
</template>

<script>
	import replydialog from '../../Details_of_the_work/replydialog.vue'
	import reportdialog from '../../Details_of_the_work/reportdialog.vue'
	import workschild from '../../Details_of_the_work/works_child.vue'
	import showdialog from '../../Details_of_the_work/show_dialog.vue'
	import dashang from '../../home/dashang.vue'
	import store from '../../../vuex/store.js'
	import { Toast } from 'mint-ui';
	import md5 from 'js-md5';
	export default {
		store,
		components: {
			dashang,
			replydialog,
			reportdialog,
			workschild,
			showdialog
		},
		updated() {

//			/**处理p标签*/
//			$('.test2').find('p').css('fontSize', '0.3rem'); //字体大小、
//			$('.test2').find('p').css('letterSpacing', '0.025rem'); //字体间距
//			$('.test2').find('p').css('lineHeight', '0.45rem'); //行高
//
//			/**处理span标签*/
//			$('.test2').find('span').css('lineHeight', '0.45rem !important');
//			$('.test2').find('span').css('fontSize', '0.3rem'); //字体大小、
//			$('.test2').find('span').css('letterSpacing', '0.025rem'); //字体间距
//			$('.test2').find('span').css('lineHeight', '0.45rem'); //行高
//
//			$('.test2').find('span').css('lineHeight', '0.45rem !important');
//			/**处理h3标签*/
//			$('.test2').find('h3').css('fontSize', '0.4rem');
//			/**处理h2标签*/
//			$('.test2').find('h2').css('fontSize', '0.45rem');
//
//			/**处理h1标签*/
//			$('.test2').find('h1').css('fontSize', '0.5rem');

	$(".test2 p,.test2 span,.test2 strong,.test2 >*,.test2 p>*").css(
				{"margin":"0px","lineHeight":"0.8rem","fontSize":"0.3rem","fontFamily":'微软雅黑','letterSpacing': '0.025rem'}
			)
		},
		data() {
			return {
				callStauts_s: [], //储存点赞状态
				call: {
					id: '',
					stauts: ''
				},
				callStauts_s_s: [], //储存踩状态
				call_s: {
					id: '',
					stauts: ''
				},

				reply: {
					is_reply: false
				},
				likes: true,
				shou: true,
				icard: '',
				report: {
					is_report: false
				},
				message: {
					dad: false,
					name: ''
				},
				mes: {
					is_show: false
				},
				actives: {
					picUrl: [{
						picUrl: ''
					}, {
						picUrl: ''
					}],
					insertDate: ''
				}, //页面数据

				pin: '', //评论数据
				html: "<img src='http://www.ding-new.com:8080/rsc/meetArt/hot/picture/992ae992-129f-4ab7-8321-7dfa79fb803b600_600.jpg' style='width:100%;' ><h3>龙的传人</h3><br/><p>dsjakdjashdlkhlskhd</p>"
				//				substring:'',
			}
		},
		methods: {
			/*举报事件*/
			reportTap() {
				this.$store.state.report_works.artId=this.$store.state.zuopin_x.artId
				this.report.is_report = true
			},
			guo_lv() {

			},
			complaint(arr) {
				this.$store.state.report_data=arr;
				this.$store.state.input_x=arr;
				this.mes.is_show = true;
			},
			zhuan_f() { //微信转发功能
				var url = this.$store.state.request_url + "/api/map/art/artForward.do"; //state.request_url
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				console.log(this.actives.artFlag,"99999999999999")
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artForward.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: id,
						forwardOpId: this.actives.opId,
						forwardType: this.actives.artFlag,
						artId: this.$store.state.zuopin_x.artId
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {

						//console.log(response.body.data,"1000000000000000000000000")
						this.$store.state.share_url = response.body.data.forwardUrl
						//console.log(this.actives,"999999999")

					
						/*好友*/
						this.$store.state.share_title = "【" + response.body.data.template + "】 " + response.body.data.title;
						if(this.actives.docUrl) {
							this.$store.state.share_content = this.html_detail(this.actives.docUrl)
						} else {
							this.$store.state.share_content = "觅艺APP:艺术交友、交流、交易的互联网社区平台"
						}

						/**朋友圈*/
						this.$store.state.share_new_title = response.body.data.title;
						if(this.actives.docUrl) {
							this.$store.state.share_new_content = "【" +  response.body.data.template + "】 " + this.html_detail(this.actives.docUrl);
						} else {
							this.$store.state.share_new_content = "觅艺APP:艺术交友、交流、交易的互联网社区平台"
						}
						//console.log(this.actives.docUrl,"1原代码")
						//console.log(this.html_detail(this.actives.docUrl),"0简代码")
						console.log(this.$store.state.share_title, "-", this.$store.state.share_new_content)
						
						this.$store.state.share_img = response.body.data.picUrl
						this.$store.state.tableList.share();
					}
				}).catch(function(err) {
					//console.log(err)
				})

			},
			/*处理标签*/
			html_detail(i) {
				var str = i;
				var dd = str.replace(/<\/?.+?>/g, "")
				var dds = dd.replace(/ /g, "");
				var ddss = dds.replace(/[ ]|[&nbsp;]/g, "");
				
				if(ddss.length>150){
					ddss=ddss.substring(0,150);
				}
				//console.log(dds,"999999999")
				return ddss;
			},
/*计算时间*/
		jisuan_time(arr){
			 //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
			 var str=arr.disDate
			 if(str!=undefined){
			 	
			
    			var sTime =new Date(); //开始时间
    			
				var endTime =new Date(str); //结束时间
					
				var times=parseInt((sTime.getTime()-endTime.getTime())/(60*1000))//分钟
				////console.log(times/60,"时间")
				if(times<1){//刚刚

					return "刚刚"
					
				}else{
					if(times>1&&times<60){//分钟
						////console.log(times+"分钟前")
						return times+"分钟前"
						
					}else if(times>60&&(times/60)<24){//小时
						var hours=parseInt(times/60);
						////console.log(hours+"小时前")
						return hours+"小时前"
						
					}else if(times/60>24&&(times/60)<96){
						var day=parseInt(times/(60*24));
						////console.log(day+"天前")
						return day+"天前"
						
					}else{
						////console.log(str)
						return str
						
					}
			
    	}
			}
		},
		
			fensi() {
				this.$store.state.lu_you = this.$store.state.tr
				this.$store.state.Author_s_detailed_routing = 8
				this.$store.state.worksOpId = this.actives.opId
				//			   window.location = '#/personal_data'
				this.$router.push({
					path: '../personal_data'
				});
			},
			fensi_s(i) {
				console.log(i, this.$store.state.zuopin_x, "333333333333333")
				//				this.$store.state.lu_you = this.$store.state.tr
				//				this.$store.state.Author_s_detailed_routing = 8
				//				this.$store.state.worksOpId = i.opId
				//				//			   window.location = '#/personal_data'
				//				this.$router.push({
				//					path: '../personal_data'
				//				});

				//				this.message.name = this.worksComment[arr].name
				this.$store.state.worksCommentContent = i;
				this.$store.state.worksId = this.$store.state.zuopin_x.artId;
				this.message.dad = true
				var url = this.$store.state.request_url + "/api/map/art/selectArtDis.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/selectArtDis.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						artId: this.$store.state.zuopin_x.artId,
						parentId: i.disId,
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {

						this.$store.state.pinlun_child = response.body.data.artDis;

						console.log(this.$store.state.pinlun_child, "66666666666666")

					}
				}).catch(function(err) {
					//console.log(err)
				})

			},

			img_chuli() {
				var img = new Image();
				img.src = $("#img_box")[0].currentSrc;

				//console.log($("#img_box")[0].currentSrc,"......................")
				/*对比原始比例*/
				if((img.width / img.height) < (750 / 421)) {

					$("#img_box").css("width", "7.5rem");
					$("#img_box").css("height", "auto");

				} else if((img.width / img.height) > (750 / 421)) {
					$("#img_box").css("width", "auto");
					$("#img_box").css("height", "4.21rem");
				} else {
					$("#img_box").css("width", "7.5rem");
					$("#img_box").css("height", "4.21rem");
				}

			},

			likes_s_s(i) { //查询评论踩
				this.callStauts_s_s = []
				var url = this.$store.state.request_url + "/api/map/art/isExistLikeOnDis.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/isExistLikeOnDis.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: this.$store.state.data.memId, //当前登录系统的会员ID
						disId: i.disId //评论的唯一id
					},
					emulateJSON: false,
				}).then(function(response) {
					////console.log(response.body.meta.msg, "状态")
					if(response.body.meta.res == '00000') {
						if(response.body.meta.msg == "NO") {
							this.call_s.id = i.disId;
							this.call_s.stauts = "1";
							this.callStauts_s_s.push(this.call_s); //未点赞
							this.call_s = {};
						} else if(response.body.meta.msg == "YES") {
							this.call_s.id = i.disId;
							this.call_s.stauts = "2";
							this.callStauts_s_s.push(this.call_s); //已点赞
							this.call_s = {};
						}
					}

					////console.log(this.callStauts)
				}).catch(function(err) {
					//console.log(err)
				})
			},
			no_like(index) {
				var url = this.$store.state.request_url + "/api/map/art/addDenyOnDis.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/addDenyOnDis.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: this.$store.state.data.memId,
						disId: this.pin[index].disId
					},
					emulateJSON: false,
				}).then(function(response) {
					//console.log(response.body)

					if(response.body.meta.res == "00000") {
						for(var j = 0; j < this.pin.length; j++) {
							this.likes_s_s(this.pin[j])
						}
						Toast({
							message: '你对这条评论表示不赞同',
							position: 'middle',
							duration: 2000
						});

						this.pin[index].disDislike += 1

					} else {

						Toast({
							message: '你已经对这条评论表示过不赞同了',
							position: 'middle',
							duration: 2000
						});

					}

				}).catch(function(err) {

					//console.log(err)

				})
			},

			likes_s(i) { //查询评论点赞
				this.callStauts_s = []
				var url = this.$store.state.request_url + "/api/map/art/isExistLikeOnDis.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/isExistLikeOnDis.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: this.$store.state.data.memId, //当前登录系统的会员ID
						disId: i.disId //评论的唯一id
					},
					emulateJSON: false,
				}).then(function(response) {
					////console.log(response.body.meta.msg, "状态")
					if(response.body.meta.res == '00000') {
						if(response.body.meta.msg == "NO") {
							this.call.id = i.disId;
							this.call.stauts = "1";
							this.callStauts_s.push(this.call); //未点赞
							this.call = {};
						} else if(response.body.meta.msg == "YES") {
							this.call.id = i.disId;
							this.call.stauts = "2";
							this.callStauts_s.push(this.call); //已点赞
							this.call = {};
						}
					}

					////console.log(this.callStauts)
				}).catch(function(err) {
					//console.log(err)
				})
			},
			_like(index) {
				var url = this.$store.state.request_url + "/api/map/art/addLikeOnDis.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/addLikeOnDis.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: this.$store.state.data.memId,
						disId: this.pin[index].disId
					},
					emulateJSON: false,
				}).then(function(response) {
					//console.log(response.body)
					if(response.body.meta.res == "00000") {
						for(var j = 0; j < this.pin.length; j++) {
							this.likes_s(this.pin[j])
						}
						Toast({
							message: '点赞成功',
							position: 'middle',
							duration: 2000
						});
						this.pin[index].disLike += 1
					} else {
						Toast({
							message: '你已经对这条评论点过赞了',
							position: 'middle',
							duration: 2000
						});
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			qiyong() {
				this.$store.state.is_detail="1";
				this.reply.is_reply = true
				console.log(this.actives)
				this.$store.state.commentWorksdata = this.actives;
				this.$store.state.commentWorksdata.artId = this.$store.state.zuopin_x.artId
				this.$store.state.worksId= this.$store.state.zuopin_x.artId
				console.log(this.$store.state.commentWorksdata,"------------")
			},

			dahsang() {
				this.$store.state.dashang = true
				this.$store.state.A_reward = this.$store.state.zuopin_x
				this.$store.state.A_reward.artFlag = this.$store.state.zuopin_l

				//console.log(this.$store.state.A_reward)
			},
			/**打赏剪刀手*/
			dashang_dao(i){
				this.$store.state.Return_to_return == 8
				this.$store.state.dashang = true
				this.$store.state.A_reward = i
				this.$store.state.is_headline="art"
				this.$store.state.is_comment_dashang=true
			},
			alertA(ev) { //按下回车键，触发评论
				//				 if(ev.keyCode==13){
				//               var disUser ='';
				//           	 var disUserPic ='';
				//               var identification ='';
				//               var vas=this.$refs.vas.value;
				//           	if(vas!=''){
				//           		var url=this.$store.state.request_url+"/api/map/user/artUserInfo.do";
				//		var id=this.$store.state.data.memId;
				//		var token=this.$store.state.data.tokEn;
				//		var ts=new Date().getTime();
				//		var sign=md5(url+id+token+ts)
				//           		this.$http({
				//							url: this.$store.state.request_url+"/api/map/user/artUserInfo.do?memId="+id+"&ts="+ts,
				//							method: 'post',
				//							headers:{
				//								"content-type": "application/json;charset=UTF-8",
				//								"sIgn":sign
				//							},
				//							body: {
				//								opId:this.$store.state.data.memId,
				//							},
				//							emulateJSON: false,
				//						}).then(function(response){
				//							    //console.log(response.body.data,'cccc')
				//							if(response.body.meta.res == "00000"){
				//								//console.log(response.body)
				//								disUser = response.body.data.nickname
				//								disUserPic = response.body.data.opPic
				//								identification = response.body.data.identification
				//								
				//								//console.log(disUser,'1111111',disUserPic,identification)
				//                             if(disUser!==''&&disUserPic!==''){
				//               	              
				//               	var url=this.$store.state.request_url+"/api/map/art/artDis.do";
				//		var id=this.$store.state.data.memId;
				//		var token=this.$store.state.data.tokEn;
				//		var ts=new Date().getTime();
				//		var sign=md5(url+id+token+ts)              
				//          	  this.$http({
				//							url: this.$store.state.request_url+"/api/map/art/artDis.do?memId="+id+"&ts="+ts,
				//							method: 'post',
				//							headers: {
				//								"content-type":"application/json;charset=UTF-8",
				//								"sIgn":sign
				//							},
				//							body: {
				//								disId:null,//唯一ID父评论填写null 子评理则填写父评论ID
				//								opId:this.$store.state.data.memId,//评论会员ID
				//								disOpId:this.$store.state.zuopin_x.opId,//被评论会员ID  inps_act 为临时存储该作品所有的信息
				//								artId:this.$store.state.zuopin_x.artId,//作品ID
				//								
				//								disContent:vas,//评论内容
				//								disUser:disUser,//评论人
				//								disUserPic:disUserPic,//评论人头像Url
				//								identification: (response.body.data.identification==null)?'': response.body.data.identification   //评论会员的身份标识
				//							},
				//							emulateJSON: false,
				//						}).then(function(response) {
				//							//console.log(response.body,)
				//							if(response.body.meta.res == "00000") {
				//								Toast({
				//											message: '评论成功',
				//											position: 'middle',
				//											duration: 2000
				//									});
				//								this.$refs.vas.value= ''
				//								this.pinglun()
				//							}
				//						}).catch(function(err) {
				//							//console.log(err)
				//						})
				//						}
				//							}
				//						}).catch(function(err) {
				//							//console.log(err)
				//						})
				//						}else{
				//							Toast({
				//											message: '评论内容不能为空',
				//											position: 'middle',
				//											duration: 2000
				//									});
				//						}
				//                    
				//             }
			},

			hui() {
				//console.log(this.$store.state.tr)

				if(this.$store.state.tr == 1) {
					this.$router.push({
						path: '../square/The_headlines'
					})

				} else if(this.$store.state.tr == 2) {
					this.$router.push({
						path: '../square/depth'
					})
				} else if(this.$store.state.tr == 3) {
					this.$router.push({
						path: '../personal_data'
					})
				} else if(this.$store.state.tr == 4) {
					this.$router.push({
						path: '../Myarticle'
					})
				}else if(this.$store.state.tr == 61) {
					this.$router.push({
						path: '../square/one_minute'
					})
				}else if(this.$store.state.tr == 22) {
					this.$router.push({
						path: '../Mycollection/actives_rower'
					})
					
				}

			},

			Gdoc() { //获取页面数据
				console.log("刷新")
				var url = this.$store.state.request_url + "/api/mapPlazaManager/showConsultationById.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/showConsultationById.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						artId: this.$store.state.zuopin_x.artId
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						this.actives = response.body.data
						//                     this.actives.docUrl =  this.actives.docUrl.replace(/style\s*=(['\"\s]?)[^'\"]*?\1/gi,'')
						console.log(this.actives, '__________页面数据')
						this.$store.state.zuopin_l=this.actives.artFlag;
						 this.$store.state.zuopin_x.opId=this.actives.opId;
						var a = document.getElementByClassName('test2')[0];

						//                a.getElementByTagName('p').style.lineHeight='0.5rem';
						//                
						//                a.getElementByTagName('p').style.fontSize = '0.3rem';
						//console.log(this.actives.picUrl)
						this.pin=[];
						this.pinglun()
						
					}
				}).catch(function(err) {
					//console.log(err)
				})

			},

			pinglun() { //获取评论数据
				console.log("获取评论")
				var url = this.$store.state.request_url + "/api/map/art/selectArtDis.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();

				var sign = md5(url + id + token + ts)
				var _this = this
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/selectArtDis.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						artId: this.$store.state.zuopin_x.artId,
						parentId: '0',

					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						this.pin = response.body.data.artDis
						for(var j = 0; j < this.pin.length; j++) {
							this.likes_s(this.pin[j])
							this.likes_s_s(this.pin[j])
						}
						console.log(this.pin,'__________评论数据')
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			like_shouchang() { //点赞收藏查询事件
				var url = this.$store.state.request_url + "/api/map/art/likeForOpId.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({ //点赞  查询
					url: this.$store.state.request_url + "/api/map/art/likeForOpId.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId, //当前登录系统的会员ID
						attentionOpId: this.$store.state.zuopin_x.opId, //被点赞会员的ID
						artId: this.$store.state.zuopin_x.artId //被打赏的作品ID

					}
				}).then(function(response) {
					//console.log(response.body.meta,"点赞查询")
					if(response.body.meta.msg == 'NO') {
						this.likes = true
					} else if(response.body.meta.msg == 'YES') {
						this.likes = false
					}

				}).catch(function(err) {
					//console.log(err)
				})

				var url1 = this.$store.state.request_url + "/api/map/art/collectForOpId.do";
				var sign1 = md5(url1 + id + token + ts)

				this.$http({ //收藏  查询
					url: this.$store.state.request_url + "/api/map/art/collectForOpId.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign1
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId, //当前登录系统的会员ID
						attentionOpId: this.$store.state.zuopin_x.opId, //被关注会员的ID
						artId: this.$store.state.zuopin_x.artId //被打赏的作品ID
					}
				}).then(function(response) {
					//console.log(response.body.meta,"收藏查询")
					if(response.body.meta.res == '00000' && response.body.meta.msg == 'NO') {
						this.shou = true
					} else if(response.body.meta.res == '00000' && response.body.meta.msg == 'YES') {
						this.shou = false
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			like_to() { //点赞事件
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();

				//执行点赞
				var url = this.$store.state.request_url + "/api/map/art/artLike.do";
				var sign = md5(url + id + token + ts)
				//console.log(this.$store.state.zuopin_x,"sss")
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artLike.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {
						artId: this.$store.state.zuopin_x.artId, //点赞作品ID
						likeType: '3', //点赞类型 分为: 1作品，2闲情，3热点，4深度
						opId: this.$store.state.zuopin_x.opId, //作者ID
						likeOpId: this.$store.state.data.memId, //当前用户Id
					},
					emulateJSON: false,
				}).then(function(response) {
					//console.log(response.body)
					if(response.body.meta.res == "00000") {
						this.likes = false
						Toast({
							message: '点赞成功',
							position: 'middle',
							duration: 2000
						});
						this.actives.readerLike++
					} else {
						//、、、、、、、、、、、、、、执行取消点赞、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
						var url_s = this.$store.state.request_url + "/api/map/art/cancelLike.do";
						var sign = md5(url_s + id + token + ts)
						var _this = this
						//console.log(_this.$store.state.zuopin_x.artId,_this.$store.state.data.memId)

						this.$http({
							url: this.$store.state.request_url + "/api/map/art/cancelLike.do?memId=" + id + "&ts=" + ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							body: {
								artId: _this.$store.state.zuopin_x.artId, //点赞作品ID

								likeOpId: _this.$store.state.data.memId, //当前用户Id
							},
							emulateJSON: false,
						}).then(function(response) {
							//console.log(response.body)
							if(response.body.meta.res == "00000") {
								_this.likes = true
								_this.actives.readerLike--
							}
						}).catch(function(err) { //console.log(err)
						})
						//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			shou_to() { //收藏事件
				var url = this.$store.state.request_url + "/api/map/art/artCollect.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artCollect.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {
						opId: this.$store.state.data.memId,
						collectOpId: this.$store.state.zuopin_x.opId,
						collectType: '3',
						artId: this.$store.state.zuopin_x.artId
					},
					emulateJSON: false,
				}).then(function(response) {
					//console.log(response.body)
					if(response.body.meta.res == "00000") {
						Toast({
							message: '收藏成功',
							position: 'middle',
							duration: 2000
						});

						this.shou = false
						this.actives.readerCollect++
					} else {
						/////////////////////////////////////////////////////////////////////////////////////////////////
						var url_s = this.$store.state.request_url + "/api/map/art/uncollect.do";
						var sign = md5(url_s + id + token + ts)
						var _this = this
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/uncollect.do?memId=" + id + "&ts=" + ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							body: {
								opId: _this.$store.state.data.memId,

								artId: _this.$store.state.zuopin_x.artId
							},
							emulateJSON: false,
						}).then(function(response) {
							//console.log(response.body)
							if(response.body.meta.res == "00000") {
								_this.shou = true
								_this.actives.readerCollect--
							}
						})
						/////////////////////////////////////////////////////////////////////////////////////////////////
					}
				})
			},

		},
		mounted() {

			//console.log(this.$store.state.jie_dian,'22222222')

			this.Gdoc()
			this.pinglun()
			this.like_shouchang()
			this.icard = localStorage.identification
		},
		computed: {

			html_lv() {
				return this.actives.docUrl
				//.replace(/style\s*=(['\"\s]?)[^'\"]*?\1/gi,'');
			}

		},
		computed: {
			r() {
				return(this.actives.articleTags == null) ? "" : this.actives.articleTags.split('#').join('').split(',')
			},

			text_1() { //文章内容第一段文字
				return(this.actives.docUrl == null) ? "" : this.actives.docUrl.substring(0, 82)
			},
			text_2() { //文章内容第,二段文字
				return(this.actives.docUrl == null) ? "" : this.actives.docUrl.substring(83, 272)
			},
			text_3() { //文章内容第,三段文字
				return(this.actives.docUrl == null) ? "" : this.actives.docUrl.substring(272, 512)
			},

			img1() {
				if(!(this.actives.picUrl == null)) {
					for(var i = 0; i < this.actives.picUrl.length; i++) {
						if(this.actives.picUrl[i].picType == 'cover_pic') {
							return this.actives.picUrl[i].picUrl
						}
					}
				}
			},
			img2() {
				if(!(this.actives.picUrl == null)) {
					for(var i = 0; i < this.actives.picUrl.length; i++) {
						if(this.actives.picUrl[i].picType == 'supplementary_pic') {
							return this.actives.picUrl[i].picUrl
						}
					}
				}
			},
			dates() {
				return this.actives.insertDate.substring(5, 7) + '月' + this.actives.insertDate.substring(8, 10) + '日'
			}

		}

	}
</script>

<style scoped="scoped">
	* {
		outline: none;
	}
	
	.box_bottom {
		width: 100%;
		height: 1.1rem;
		position: fixed;
		z-index: 300;
		bottom: 0;
		border-top: 0.005rem solid #f1f1f1;
		background: white;
	}
	
	.img_to {
		width: 0.32rem;
		height: 0.32rem;
		float: left;
		margin: 0.35rem;
	}
	
	.inps {
		    width: 3.4rem;
		height: 0.62rem;
		float: left;
		border: none;
		margin-left: 0.3rem;
		border: 0.01rem solid #D8D8D8;
		font-size: 0.26rem;
		margin-top: 0.24rem;
		background-color: rgba(255, 255, 255, 1);
		text-indent: 0.3rem;
		border-radius: 0.1rem;
	}
	
	.ims {
		width: 0.44rem;
		height: 0.42rem;
		/*margin-top: 0.26rem;
		margin-left: 0.3rem;*/
	}
	
	.box_child {
		width: 93%;
		margin: 1rem auto 0;
	}
	
	.tou {
		width: 0.64rem;
		height: 0.64rem;
		float: left;
		border-radius: 50%;
	}
	
	.tab {
		height: 0.5rem;
		line-height: 0.5rem;
		border: 0.005rem solid #8C8C8C;
		border-radius: 0.1rem;
		text-align: center;
		float: left;
		font-size: 0.28rem;
		padding: 0 0.2rem;
		margin-right: 0.2rem;
		margin-top: 0.1rem;
	}
	
	.da {
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 50%;
		margin: 0 auto;
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
		border: 0.005rem solid #8C8C8C;
	}
	
	.imgg {
		width: 0.6rem;
		height: 0.6rem;
		margin-top: 0.25rem;
		margin-left: 0.4rem;
	}
	
	.biao_box {
		font-size: 0.26rem;
		text-align: center;
		background: #FF9D00;
		float: left;
		margin-left: 0.14rem;
		margin-top: 0.23rem;
		color: white;
		border-radius: 0.05rem;
		padding: 0 0.12rem;
	}
	
	.zy {
		width: 0.28rem;
		height: 0.28rem;
		float: right;
		margin-top: 0.24rem;
		margin-left: 0.2rem;
	}
	
	.test2>>>img {
		width: 100%;
		height: auto;
	}
	
	.test2>>>p {
		font-size: 0.4rem;
		/*line-height: 0.4rem;*/
	}
	/*标题栏*/
	
	.head {
		width: 100%;
		height: 1rem;
		position: fixed;
		top: 0;
		background: white;
		box-sizing: border-box;
		padding-top: 0.3rem;
		z-index: 300;
	}
	
	.title {
		width: 80%;
		height: 100%;
		float: left;
		font-size: 0.35rem;
		text-align: center;
	}
	
	.img2 {
		margin-top: 0.25rem;
		min-width: auto;
		height: 0.06rem;
		float: right;
		margin-right: 0.25rem;
	}
	
	.shu {
		padding: 0.02rem 0.06rem;
		font-size: 0.2rem;
		background-color: #FF9D00;
		color: #fff;
		border-radius: 0.08rem;
		position: absolute;
		line-height: 0.2rem;
		top: 0rem;
		right: -0.16rem;
	}
	
	.shu_content {
		height: 0.5rem;
		margin-top: 0.3rem;
		margin-left: 0.4rem;
		float: left;
		text-align: center;
		position: relative;
	}
	
	.more_content {
		width: 100%;
		padding-top: 0.1rem;
		float: left;
		margin-left: 0.2rem;
	}
	
	.more_content p {
		float: left;
		font-size: 0.24rem;
		color: rgba(198, 198, 198, 1);
		line-height: 0.335rem;
	}
	
	.more_content img {
		float: left;
		margin-top: 0.05rem;
		height: 100%;
		width: 0.2rem;
	}
</style>