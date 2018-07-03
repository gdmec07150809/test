<template>
	<div id="app">
		<!--
        	作者：2443611475@qq.com
        	时间：2018-05-09
        	描述：闲情
        -->

		<div class="kong" v-show="!show">
			<img src="../../assets/img/icon_noArticle.png" />
			<p>暂时还未发布过闲情</p>
		</div>
		<div v-show="show" class="works_item" v-for="(arr,index) in data">

			<div @click="toDiary(index)">

				<div class="xian" v-if="(arr.insertDate&&index>0)?true:false"></div>
				<div class="date">
					<p class="day">{{arr.insertDate.split(' ')[0].split("-")[1]}}日</p>
					<p class="month">{{arr.insertDate.split(' ')[0].split("-")[2]}}月</p>
				</div>
				<div class="works_img">

					<!--2-->
					<div class="two" style="height: 5rem;" v-if="arr.picInfo.length==2">
						<div class="two_left" style="vertical-align:middle;text-align:center;overflow:hidden;">
							<img :src="arr.picInfo[0].picUrl" style="min-height:100%;min-width:100%;max-height:150%;max-width:150%;" />
						</div>

						<div class="two_right" style="height:5rem;vertical-align:middle;text-align:center;overflow:hidden;">
							<img :src="arr.picInfo[1].picUrl" style="min-height:100%;min-width:100%;max-height:150%;max-width:150%;" />
						</div>

					</div>

					<!--3-->
					<div class="three" style="height: 5rem;" v-else-if="arr.picInfo.length==3">
						<div class="big_img" style="vertical-align:middle;text-align:center;overflow:hidden;">
							<img :src="arr.picInfo[0]?arr.picInfo[0].picUrl:''" style="min-height:100%;min-width:100%;max-height:150%;max-width:150%;" />
						</div>
						<div class="small_img">
							<div class="small_img_01" style="vertical-align:middle;text-align:center;overflow:hidden;">
								<img :src="arr.picInfo[1]?arr.picInfo[1].picUrl:''" style="min-height:100%;min-width:100%;max-height:150%;max-width:150%;" />
							</div>
							<div class="small_img_02" style="vertical-align:middle;text-align:center;overflow:hidden;">
								<img :src="arr.picInfo[2]?arr.picInfo[2].picUrl:''" style="min-height:100%;min-width:100%;max-height:150%;max-width:150%;" />
							</div>
						</div>
					</div>

					<!--1-->
					<div v-else-if="arr.picInfo.length==1" style="vertical-align:middle;text-align:center;overflow:hidden;width: 100%;">

						<img :src="arr.picInfo[0].picUrl" style="max-height:auto;width:100%;" />

					</div>

					<div style="width: 100%;overflow: hidden;" v-if="arr.picInfo.length>=4">
						<!--大图容器-->
						<div v-for="(i,index) in arr.picInfo" style="width:2.4rem;height:2.4rem;float:left;vertical-align:middle;text-align:center;overflow:hidden;margin-left:0.1rem;margin-top:0.1rem;">
							<img :src="i.picUrl" style="min-height:2.4;min-width:2.4;max-width: 4rem;max-height: 4rem;" />
						</div>

					</div>

				</div>
				<div class="works_content" v-if="arr.artType&&arr.artType!='[]'||arr.docUrl">
					<!--<p class="introduce_content" style="-webkit-box-orient: vertical;">{{arr.docUrl}}</p>-->
					<p class="dynamic_title" style="-webkit-box-orient: vertical;">{{arr.artTitle}}</p>
					<span>
					<span style="padding: 0;margin: 0;display: inline;font-size: 0.25rem;color: #D0D0D0"  v-if="arr.artType">#{{arr.artType}}  </span>
					<span class="introduce_content" style="-webkit-box-orient: vertical;display: inline;">
						<!--从2008第一家奢华酒店到87家豪华酒店，“酒店王国” 十载光彩卓然。本次设计采用黑金色调，融合主题和酒 店元素进行创意构思，从创意到落地历时一周。
				-->

						{{arr.docUrl}}
					</span>
					</span>
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
				<div class="function_item_left" @click="zhuan_f(arr)">
					<img src="../../assets/img/icon_detail_share.png" />
					<p v-if="arr.readerForward=='0'">转发</p>
					<p v-else>{{(parseInt(arr.readerForward.length)==4)?parseInt(arr.readerForward)/1000+'k':arr.readerForward}}</p>
				</div>
				<div class="function_item_left" @click.stop="commentTap(index)">
					<img src="../../assets/img/icon_detail_comment.png" />
					<p v-if="arr.readerDiscuss=='0'">评论</p>
					<p v-else>{{(parseInt(arr.readerDiscuss.length)==4)?parseInt(arr.readerDiscuss)/1000+'k':arr.readerDiscuss}}</p>
				</div>
				<div @click="dashang(arr)" class="function_item_right">
					<img src="../../assets/img/icon_detail_tip.png" />
					<p>打赏</p>
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
		//			el:"#app",
		components: {

		},
		store,
		data() {
			return {
				act: [{
						name: '11'
					},
					{
						name: '12'
					},
					{
						name: '13'
					},
					{
						name: '14'
					}
				],

				op: "p",

				data: [],
				show: true,
				clo: "p",
				day: [],
				month: [],
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

			}

		},
		methods: {
			dashang(i) {
				this.$store.state.guanzhu = false;
				this.$store.state.A_reward = i

				this.$store.state.A_reward.artFlag = '2'

				this.$store.state.dashang = true

				this.$store.state.Return_to_return = 3
			},

			toDiary(index) {
				this.$store.state.worksName = "闲情";
				//				this.$store.state.back_id = 2

				this.$store.state.worksId = this.data[index].artId;

				//				//console.log(this.$store.state.worksId,'——————闲情')
				this.$store.state.xlss = 3

				this.$router.push({
					path: '../works_detail_s'
				});
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
					//console.log(response.body)
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
						this.data[i].readerLike += 1
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
						forwardType: "2",
						artId: i.artId
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {
						/**闲情转发内容*/
						var title = "";
						if(response.body.data.artType && response.body.data.artType != "[]") {
							title = response.body.data.artType;
						} else {
							title = "励志";
						}

						/**闲情转发内容*/
						//var title =this.select_name;
						/**判断有无标题*/
						if(response.body.data.title) {
							switch(title) {
								case "创作花絮":
									this.$store.state.share_title = "【闲情|创作花絮】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|创作花絮】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "艺圈活动":
									this.$store.state.share_title = "【闲情|艺圈活动】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|艺圈活动】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "小时光":
									this.$store.state.share_title = "【闲情|小时光】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|小时光】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "旅途":
									this.$store.state.share_title = "【闲情|旅途】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|旅途】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "美食":
									this.$store.state.share_title = "【闲情|美食】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|美食】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;

								case "创意":
									this.$store.state.share_title = "【闲情|创意】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|创意】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "搞笑":
									this.$store.state.share_title = "【闲情|搞笑】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|搞笑】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "嘚瑟":
									this.$store.state.share_title = "【闲情|嘚瑟】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|嘚瑟】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "励志":
									this.$store.state.share_title = "【闲情|励志】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|励志】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "推荐":
									this.$store.state.share_title = "【闲情|推荐】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|推荐】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "收藏鉴宝":
									this.$store.state.share_title = "【闲情|收藏鉴宝】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|收藏鉴宝】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "其他":
									this.$store.state.share_title = "【闲情|其他】" + response.body.data.title;
									this.$store.state.share_new_content = "【闲情|其他】" + response.body.data.title;
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;

							}
						} else {
							switch(title) {
								case "创作花絮":
									this.$store.state.share_title = "【闲情|创作花絮】" + "我爱艺术!";
									this.$store.state.share_new_content = "【闲情|创作花絮】" + "我爱艺术!";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "艺圈活动":
									this.$store.state.share_title = "【闲情|艺圈活动】" + "我爱艺术!";
									this.$store.state.share_new_content = "【闲情|艺圈活动】" + "我爱艺术!";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "小时光":
									this.$store.state.share_title = "【闲情|小时光】" + "因过竹院逢僧话,偷得浮生终日闲。";
									this.$store.state.share_new_content = "【闲情|小时光】" + "因过竹院逢僧话,偷得浮生终日闲。";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "旅途":
									this.$store.state.share_title = "【闲情|旅途】" + "一个陌生的地方,一种久违的感动。";
									this.$store.state.share_new_content = "【闲情|旅途】" + "一个陌生的地方,一种久违的感动。";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "美食":
									this.$store.state.share_title = "【闲情|美食】" + "唯有爱与美食不可辜负!";
									this.$store.state.share_new_content = "【闲情|美食】" + "唯有爱与美食不可辜负!";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;

								case "创意":
									this.$store.state.share_title = "【闲情|创意】" + "独乐乐不如众乐乐!";
									this.$store.state.share_new_content = "【闲情|创意】" + "独乐乐不如众乐乐!";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "搞笑":
									this.$store.state.share_title = "【闲情|搞笑】" + "独乐乐不如众乐乐!";
									this.$store.state.share_new_content = "【闲情|搞笑】" + "独乐乐不如众乐乐!";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "嘚瑟":
									this.$store.state.share_title = "【闲情|嘚瑟】" + "独乐乐不如众乐乐!";
									this.$store.state.share_new_content = "【闲情|嘚瑟】" + "独乐乐不如众乐乐!";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "励志":
									this.$store.state.share_title = "【闲情|励志】" + "你若盛开,清风自来!";
									this.$store.state.share_new_content = "【闲情|励志】" + "你若盛开,清风自来!";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "推荐":
									this.$store.state.share_title = "【闲情|推荐】" + "赠人玫瑰,手有留香!";
									this.$store.state.share_new_content = "【闲情|推荐】" + "赠人玫瑰,手有留香!";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "收藏鉴宝":
									this.$store.state.share_title = "【闲情|收藏鉴宝】" + "我爱艺术!";
									this.$store.state.share_new_content = "【闲情|收藏鉴宝】" + "我爱艺术!";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;
								case "其他":
									this.$store.state.share_title = "【闲情|其他】" + "我爱艺术!";
									this.$store.state.share_new_content = "【闲情|其他】" + "我爱艺术!";
									this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
									break;

							}
						}

						console.log(this.$store.state.share_title, "闲情转发")
						//闲情转发内容先不动
						////console.log(response.body.data.forwardUrl,"1000000000000000000000000")
						this.$store.state.share_url = response.body.data.forwardUrl
						this.$store.state.share_img = response.body.data.picUrl
						this.$store.state.tableList.share();
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
						collectType: "2", //类型
						artId: index.artId, //作品Id
						collectOpId: index.opId //作者Id
					}
				}).then(function(response) {
					//					//console.log(response.body)
					this.collectStauts = [];

					if(response.body.meta.res == "00000") {
						for(var i = 0; i < this.data.length; i++) {
							this.search_collect(this.data[i])
						}
						this.data[is].readerCollect += 1
						Toast({
							message: '收藏成功',
							position: 'middle',
							duration: 2000
						});
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
			commentTap(index) {
				//				//console.log("触发");
				this.$store.state.commentWorksdata = this.data[index];
				this.$store.state.is_comment = true;
			},
			r() {
				//			   for(var i=0;i<this.data.length;i++){
				//			   	   this.month.push(this.data[i].insertDate.split(' ')[0].split("-")[1]);
				//			     }
				//			   for(var i=0;i<this.data.length;i++){
				//			   	   this.day.push(this.data[i].insertDate.split(' ')[0].split("-")[2]);
				//			     }
			},

			likes(i) {
				var url = this.$store.state.request_url + "/api/map/art/likeForOpId.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				//				//console.log(i, "作品", this.$store.state.data.memId)
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
					//					//console.log(response.body.meta.msg, "状态")
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

					//					//console.log(this.callStauts)
				}).catch(function(err) {
					//console.log(err)
				})

			},
			search_collect(i) {
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
						//						//console.log(response.body.meta.msg, "收藏状态");
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

			huoqus() { //获取页面数据
				var url = this.$store.state.request_url + "/api/map/art/selectFlag.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				//console.log(this.$store.state.worksOpId,"闲情-----------------------------------");
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/selectFlag.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: this.$store.state.worksOpId,
						typeId: "2",
						page: 1,
						rows: 10000,
						operatorId: this.$store.state.data.memId
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						this.data = response.body.data.artDocumentsList;
						//console.log(this.data,'闲情')

						if(this.data.length > 0) {
							this.show = true
							this.r();
							for(var i = 0; i < this.data.length; i++) {
								this.likes(this.data[i])

							}
							for(var i = 0; i < this.data.length; i++) {
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
			this.huoqus()

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
	ul {
		margin: 0;
		padding: 0;
	}
	
	.works_item {
		width: 100%;
		margin: 0rem 0 0.8rem;
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
	/*.big_img img,*/
	/*.small_img_01 img,
	.small_img_02 img {
		width: 100%;
		height: 100%;
	}*/
	
	.works_content {
		margin-top: 0.1rem;
		width: 100%;
		overflow: hidden;
		margin-left: 0.1rem;
	}
	
	.works_content_title {
		font-size: 0.35rem;
		color: rgba(51, 51, 51, 1);
		line-height: 0.165rem;
	}
	
	.introduce {
		margin-top: 0.25rem;
		font-size: 0.215rem;
		color: rgba(51, 51, 51, 1);
		line-height: 0.165rem;
	}
	
	.introduce_content {
		margin-top: 0.25rem;
		font-size: 0.25rem;
		margin-right: 0.2rem;
		color: rgba(153, 153, 153, 1);
		line-height: 0.335rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
	}
	
	.function {
		margin-top: 0.25rem;
		width: 100%;
		height: 0.75rem;
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
	
	.down {
		width: 100%;
		height: 0.01rem;
		background: rgba(247, 247, 247, 1);
		margin-top: 0.3rem;
	}
	
	.xian {
		height: 0.2rem;
		width: 100%;
		background: rgba(247, 247, 247, 1);
	}
	/*.big_img img,*/
	/*.small_img_01 img,
	.small_img_02 img {
		width: 100%;
		height: 100%;
	}*/
	
	.two {
		width: 100%;
		overflow: hidden;
	}
	
	.three {
		width: 100%;
		height: 100%;
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
	
	.dynamic_title {
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		font-size: 0.36rem;
		color: #333333;
		font-weight: bold;
		margin-bottom: 0.16rem;
	}
</style>