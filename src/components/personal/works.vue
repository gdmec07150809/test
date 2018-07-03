<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-04-17
    	描述：作品
    -->
	<div id="app">
		<div class="kong" v-show="!show">
			<img src="../../assets/img/icon_noArticle.png" />
			<p>暂时还未发布作品</p>
		</div>
		<div v-show="show" class="works_item" v-for="(arr,index) in data">

			<div @click="toWorksDetail(arr.artId)" style="width: 100%;">

				<div class="xian" v-if="(arr.insertDate&&index>0)?true:false"></div>
				<div class="date">
					<p class="day">{{arr.insertDate.split(' ')[0].split("-")[2]}}日</p>
					<p class="month">{{arr.insertDate.split(' ')[0].split("-")[1]}}月</p>
				</div>
				<div class="works_img">

					<!--<div class="three" v-if="arr.picInfo.length==3">
						<div class="big_img">
							<img :src="arr.picInfo[0].picUrl?arr.picInfo[0].picUrl:''"/>
						</div>
						<div class="small_img">
							<div class="small_img_01">
								<img :src="arr.picInfo[1].picUrl?arr.picInfo[1].picUrl:''"/>
							</div>
							<div class="small_img_02">
								<img :src="arr.picInfo[2].picUrl?arr.picInfo[2].picUrl:''"/>
							</div>
						</div>
					</div>

					<div class="two" v-else-if="arr.picInfo.length==2">
						<img :src="arr.picInfo[0].picUrl" class="two_left" />
						<img :src="arr.picInfo[1].picUrl" class="two_right" />
					</div>-->

					<div class="two" v-if="arr.picInfo.length>0" style="">

						<img :src="arr.picInfo[0].picUrl" style="max-height:auto;width:100%;" />

					</div>

				</div>
				<div class="works_content">
					<div class="re_bang">
						<p class="works_content_title">{{arr.artTitle}}</p><img v-if="arr.name?true:false" src="../../assets/img/bang.png" />
					</div>

					<p class="introduce_content">{{arr.artRemark}}</p>
				</div>
				<div class="down"></div>

			</div>

			<div class="function">

				<div class="function_item_left" @click.stop="goodTap(arr,index)">
					<div v-for="c in callStauts">
						<img v-if="c.id==arr.artId&&c.stauts=='1'" src="../../../static/img/icon_detail_good_normal.png" />
						<img v-else-if="c.id==arr.artId&&c.stauts=='2'" src="../../../static/img/icon_detail_good_active.png" />
					</div>
					<p v-if="arr.readerLike=='0'">点赞</p>
					<p v-else>{{(parseInt(arr.readerLike.length)==4)?parseInt(arr.readerLike)/1000+'k':arr.readerLike}}</p>
				</div>

				<div class="function_item_left" @click.stop="collectTap(arr,index)">
					<div v-for="cl in collectStauts">
						<img v-if="cl.id==arr.artId&&cl.stauts=='1'" src="../../../static/img/icon_detail_collect_normal.png" />
						<img v-else-if="cl.id==arr.artId&&cl.stauts=='2'" src="../../../static/img/icon_detail_collect_active.png" />

					</div>
					<p v-if="arr.readerCollect=='0'">收藏 </p>
					<p v-else>{{(parseInt(arr.readerCollect.length)==4)?parseInt(arr.readerCollect)/1000+'k':arr.readerCollect}}</p>
				</div>

				<div class="function_item_left" @click="zhuan_f(arr)"  v-show="$store.state.is_sc.zf">
					<img src="../../assets/img/icon_detail_share.png" />
					<p v-if="arr.readerForward=='0'">转发</p>
					<p v-else>{{(parseInt(arr.readerForward.length)==4)?parseInt(arr.readerForward)/1000+'k':arr.readerForward}}</p>
				</div>
				<div class="function_item_left" @click="commentTap(index)">
					<img src="../../assets/img/icon_detail_comment.png" />
					<p v-if="arr.readerDiscuss=='0'">评论</p>
					<p v-else>{{(parseInt(arr.readerDiscuss.length)==4)?parseInt(arr.readerDiscuss)/1000+'k':arr.readerDiscuss}}</p>
				</div>
				<div @click="dashang(arr)" class="function_item_right" v-show="$store.state.is_sc.ds">
					<img src="../../assets/img/icon_detail_tip.png" />
					<p>打赏</p>
				</div>
			</div>
		</div>

		<!--<commnetcontent  @refreshList="onRefresList" v-show="$store.state.is_comment"></commnetcontent>-->
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import { Toast } from 'mint-ui';
	import md5 from 'js-md5';
	//	import commnetcontent from '../commnet_content.vue'

	export default {
		//			el:"#app",
		store,
		//		components:{
		//			commnetcontent,
		//		},
		data() {

			return {
				data: [],
				two: false,
				three: true,
				op: "p",
				clo: "p",
				act: [],
				day: [],
				month: [],
				show: true,
				time: '',

				callStauts: [], //储存点赞状态
				call: {
					id: '',
					stauts: ''
				},
				collectStauts: [], //储存收藏状态
				collect: {
					id: '',
					stauts: ''
				},

				pinglun_s: '',

			}

		},
		methods: {
			onRefresList() {

				this.data[this.pinglun_s].readerDiscuss += 1

			},
			dashang(i) {

				this.$store.state.guanzhu = false;
				//console.log(this.$store.state.guanzhu,'关注')
				this.$store.state.A_reward = i

				this.$store.state.A_reward.artFlag = '1'

				this.$store.state.dashang = true

				this.$store.state.Return_to_return = 3
			},

			goodTap(index, i) { //点赞事件
				var url = this.$store.state.request_url + "/api/map/art/artLike.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artLike.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: index.opId, //作者Id
						likeType: "1", //类型
						artId: index.artId, //作品Id
						likeOpId: this.$store.state.data.memId //用户Id
					}
				}).then(function(response) {

					this.callStauts = [];
					if(response.body.meta.res == "00000") {
						for(var j = 0; j < this.data.length; j++) {
							this.likes(this.data[j]);
						}
						Toast({
							message: '点赞成功',
							position: 'middle',
							duration: 2000
						});
						this.data[i].readerLike++
					} else if(response.body.meta.res == "99999") {
						///////////////////////////////////内部执行取消点赞功能/////////////////////////////////////////////////////////////////////////////////////
						var url_s = this.$store.state.request_url + "/api/map/art/cancelLike.do";
						var sign = md5(url_s + id + token + ts)
						var _this = this
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/cancelLike.do?memId=" + id + "&ts=" + ts,
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							emulateJSON: false,
							method: 'post',
							body: {
								artId: index.artId, //作品Id
								likeOpId: _this.$store.state.data.memId //用户Id
							}
						}).then(function(response) {
							_this.callStauts = [];
							if(response.body.meta.res == "00000") {
								for(var k = 0; k < _this.data.length; k++) {
									_this.likes(_this.data[k]);
								}
								_this.data[i].readerLike--
							}
						}).catch(function(err) { //console.log(err)
						})
						/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////						

					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			collectTap(index, is) { //收藏事件
				var url = this.$store.state.request_url + "/api/map/art/artCollect.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artCollect.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId, //用户Id
						collectType: "1", //类型
						artId: index.artId, //作品Id
						collectOpId: index.opId //作者Id
					}
				}).then(function(response) {
					this.collectStauts = [];
					if(response.body.meta.res == "00000") {
						Toast({
							message: '收藏成功',
							position: 'middle',
							duration: 2000
						});
						for(var i = 0; i < this.data.length; i++) {
							this.search_collect(this.data[i]);
						}
						this.data[is].readerCollect += 1
					} else if(response.body.meta.res == "99999") {
						///////////////////////////////////执行取消收藏、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、						 

						var url_s = this.$store.state.request_url + "/api/map/art/uncollect.do";
						var sign = md5(url_s + id + token + ts)
						var _this = this
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/uncollect.do?memId=" + id + "&ts=" + ts,
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							emulateJSON: false,
							method: 'post',
							body: {
								opId: _this.$store.state.data.memId, //用户Id
								artId: index.artId, //作品Id
							}
						}).then(function(response) {
							_this.collectStauts = [];
							if(response.body.meta.res == "00000") {
								for(var i = 0; i < _this.data.length; i++) {
									_this.search_collect(_this.data[i]);
								}
								_this.data[is].readerCollect -= 1
							}
						}).catch(function(err) { //console.log(err)
						})
						//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、						 
					}
				}).catch(function(err) {
					//console.log(err)
				})
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
						//console.log(response.body.data,"1000000000000000000000000")
						//console.log("[觅艺app]"+this.personal.nickname+"《"+response.body.data.forwardUrl+"》","11111111")

						this.$store.state.share_url = response.body.data.forwardUrl

						/*好友*/
						this.$store.state.share_title = "【"+response.body.data.template+"|"+response.body.data.artType+"】 " + this.$store.state.personal_c.nickname + "《" + ti + "》";

						this.$store.state.share_content = "突围艺术圈,人气超58%的用户!觅艺APP:一个与众不同交流的泛艺术社交平台!"

						/**朋友圈*/
						this.$store.state.share_new_title = response.body.data.title;

						this.$store.state.share_new_content = "【"+response.body.data.template+"|"+response.body.data.artType+"】 " + this.$store.state.personal_c.nickname + "《" + ti + "》";

						//console.log(this.$store.state.share_new_content, "作品详情内容")
						this.$store.state.share_img = response.body.data.picUrl
						this.$store.state.tableList.share();
					}
				}).catch(function(err) {
					//console.log(err)
				})

			},
			toWorksDetail(e) {
				//				this.$store.state.back_id = 2
				this.$store.state.worksId = e;

				this.$store.state.xlss = 2

				this.$store.state.worksName = "作品";
				//console.log(this.$store.state.worksName);

				this.$router.push({
					path: '../works_detail_s'
				});

			},

			commentTap(index) {
				this.pinglun_s = index
				//				//console.log("触发");
				this.$store.state.commentWorksdata = this.data[index];

				this.$store.state.is_comment = true;

				//				//console.log(this.$store.state.commentWorksdata)
			},

			r() {
				//				//console.log(this.data)
				//				for(var i = 0; i < this.data.length; i++) {
				//					this.month.push(this.data[i].insertDate.split(' ')[0].split("-")[1]);
				//					
				//				}
				//				for(var i = 0; i < this.data.length; i++) {
				//					this.day.push(this.data[i].insertDate.split(' ')[0].split("-")[2]);
				//				}

			},
			likes(i) {
				var url = this.$store.state.request_url + "/api/map/art/likeForOpId.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				//console.log(i, "作品", this.$store.state.data.memId)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/likeForOpId.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: this.$store.state.data.memId, //当前登录系统的会员ID
						attentionOpId: i.opId, //被点赞会员的ID
						artId: i.artId //被点赞的作品ID
					},
					emulateJSON: false,
				}).then(function(response) {
					////console.log(response.body.meta.msg, "状态")
					if(response.body.meta.res == '00000') {
						if(response.body.meta.msg == "NO") {
							this.call.id = i.artId;
							this.call.stauts = "1";
							this.callStauts.push(this.call); //未点赞
							this.call = {};
						} else if(response.body.meta.msg == "YES") {
							this.call.id = i.artId;
							this.call.stauts = "2";
							this.callStauts.push(this.call); //已点赞
							this.call = {};
						}
					}
					////console.log(this.callStauts)
				}).catch(function(err) {
					//console.log(err)
				})
			},
			search_collect(i) {
				//console.log(22222)
				var url = this.$store.state.request_url + "/api/map/art/collectForOpId.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				this.$http({
					url: this.$store.state.request_url + "/api/map/art/collectForOpId.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: this.$store.state.data.memId,
						attentionOpId: i.opId,
						artId: i.artId
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == '00000') {
						//console.log(response.body.meta.msg, "收藏状态");
						if(response.body.meta.msg == "NO") {
							this.collect.id = i.artId;
							this.collect.stauts = "1";
							this.collectStauts.push(this.collect); //未收藏
							this.collect = {};
						} else if(response.body.meta.msg == "YES") {
							this.collect.id = i.artId;
							this.collect.stauts = "2";
							this.collectStauts.push(this.collect); //已收藏
							this.collect = {};
						}
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			zuopin() {
				//console.log(this.$store.state.worksOpId,"作品-----------------------------------");
				var url = this.$store.state.request_url + "/api/map/art/selectFlag.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				//获取作品
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/selectFlag.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: this.$store.state.worksOpId,
						typeId: "1",
						page: 1,
						rows: 3000,
						operatorId:this.$store.state.data.memId
					},
					emulateJSON: false,
				}).then(function(response) {

					//console.log(response.body.data,'作品1111111111111111111111')

					if(response.body.meta.res == "00000") {
						if(response.body.data.artResponseList.length > 0) {
							this.show = true
							this.data = response.body.data.artResponseList;
							this.r();
							//console.log(this.data, "作品：");
							for(var i = 0; i < this.data.length; i++) {
								//请求点赞状态
								this.likes(this.data[i])
								this.search_collect(this.data[i])
							}

						} else {
							this.show = false
						}

					}
				}).catch(function(err) {
					//console.log(err)
				})
			}

		},

		mounted() {
			this.zuopin()

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
	ul,
	img {
		margin: 0;
		padding: 0;
	}
	
	.works_item {
		width: 100%;
		margin: 0.5rem 0;
	}
	
	.date {
		width: 100%;
		height: 0.6rem;
		margin: 0.5rem 0.25rem 0;
	}
	
	.day {
		float: left;
		font-size: 0.4rem;
		font-weight: bold;
	}
	
	.month {
		float: left;
		font-size: 0.25rem;
		color: #000;
		margin-left: 0.1rem;
		line-height: 0.75rem;
	}
	
	.works_img {
		width: 100%;
		/*height: 4rem;*/
		/*margin-bottom: 0.2rem;*/
	}
	
	.small_img {
		float: left;
		width: 39.5%;
		height: 100%;
		margin-left: 0.5%;
	}
	
	.big_img {
		float: left;
		width: 60%;
		height: 100%;
		clear: both;
		background-color: #007AFF;
	}
	
	.small_img_01 {
		width: 100%;
		height: 49.5%;
		background-color: #D0D0D0;
	}
	
	.small_img_02 {
		width: 100%;
		height: 49.5%;
		margin-top: 1%;
		background-color: #2C3E50;
	}
	
	.works_content {
		margin-top: 0.4rem;
		width: 100%;
		overflow: hidden;
		margin-left: 0.1rem;
	}
	
	.works_content_title {
		font-size: 0.35rem;
		color: rgba(51, 51, 51, 1);
		line-height: 0.165rem;
		margin-top: 0.15rem;
	}
	
	.introduce {
		margin-top: 0.25rem;
		font-size: 0.215rem;
		color: rgba(51, 51, 51, 1);
		line-height: 0.165rem;
	}
	
	.introduce_content {
		width: 93.4%;
		overflow: hidden;
		margin-top: 0.25rem;
		font-size: 0.25rem;
		margin-left: 0.17rem;
		color: rgba(153, 153, 153, 1);
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}
	
	.function {
		width: 100%;
		height: 0.75rem;
		margin-top: 0.25rem;
	}
	
	.function_item_left {
		float: left;
		width: 15%;
		text-align: center;
		height: 100%;
	}
	
	.function_item_left img,
	.function_item_right img {
		width: 50%;
		height: 0.5rem;
	}
	
	.function_item_left p,
	.function_item_right p {
		font-size: 0.215rem;
		color: rgba(153, 153, 153, 1);
		line-height: 0.55rem;
	}
	
	.function_item_right {
		float: right;
		width: 15%;
		margin-right: 0.05rem;
		text-align: center;
		height: 100%;
	}
	
	.xian {
		height: 0.2rem;
		width: 100%;
		background: rgba(247, 247, 247, 1);
	}
	
	.down {
		width: 100%;
		height: 0.01rem;
		background: rgba(247, 247, 247, 1);
		margin-top: 0.3rem;
	}
	
	.re_bang {
		width: 100%;
		height: 0.5rem;
		margin-left: 0.17rem;
		margin-top: 0.5rem;
	}
	
	.re_bang p,
	.re_bang img {
		float: left;
	}
	
	.re_bang img {
		width: 0.5rem;
		height: 0.5rem;
	}
	
	.big_img img,
	.small_img_01 img,
	.small_img_02 img {
		width: 100%;
		height: 100%;
	}
	
	.two,
	.three {
		width: 100%;
		/*height: 100%;*/
		float: left;
	}
	
	.two_left {
		width: 49.7%;
		height: 100%;
		margin-right: 0.3%;
		float: left;
	}
	
	.two_right {
		width: 49.7%;
		margin-left: 0.3%;
		height: 100%;
		float: right;
	}
	
	.kong {
		height: 5rem;
		width: 100%;
		text-align: center;
	}
	
	.kong img {
		width: 3rem;
		height: 2.8rem;
		margin: 15% 30% 0;
	}
	
	.kong p {
		color: #D0D0D0;
		font-size: 0.25rem;
		margin-top: 0.2rem;
	}
</style>