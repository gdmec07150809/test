<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-05-23
    	描述：朋友圈---》
    -->
	<div style="width: 100%;background:#F6F6F6;">

		<div style="height: 10rem;overflow-y: auto;">

			<div v-for="(i,index) in act" class="boxs">

				<div class="chat_box">
					<!--头像-->

					<img @click="tiao(i)" class="imgs" style="" :src="i.opPic" alt="" />
					<div class="text_box">
						<!--用户ID-->
						<p style="font-size: 0.32rem;float: left;">{{i.nickname}}</p>
						<!--时间-->
						<p style="font-size: 0.28rem;float: right;margin-right: 0.3rem;color: #CACACA;">{{chuli_date(i.insertDate)}}</p>
					</div>
				</div>

				<div @click="xiang_qing(i)" class="img_box" style="overflow: hidden;" v-if="i.picUrl.length>=4">
					<!--大图容器-->
					<div v-for="(arr,index) in i.picUrl" style="width:2.4rem;height:2.4rem;float:left;vertical-align:middle;text-align:center;overflow:hidden;margin-left:0.07rem;margin-top:0.07rem;">
						<img :src="arr.picUrl" style="min-height:2.4rem;min-width:2.4;max-height:4rem;max-width:4rem;" />
					</div>  

				</div>

				<div @click="xiang_qing(i)" class="img_box" v-if="i.picUrl.length==3">
					<!--大图容器-->
					<div style="width:5rem;height:5rem;float:left;overflow:hidden;vertical-align:middle;text-align: center;">
						<img :src="i.picUrl[0].picUrl" style="min-height:5rem;min-width:5rem;max-height:6rem;max-width:6rem;" />
					</div>

					<div style="width:2.44rem;height:5rem;float:left;margin-left:0.04rem;">
						<!--小图容器上面-->
						<div style="width: 100%;height: 2.47rem;overflow:hidden;vertical-align:middle;text-align: center;">
							<img :src="i.picUrl[1].picUrl" style="min-height:100%;min-width:100%;" />
						</div>
						<!--小图容器下面-->
						<div style="width: 100%;height: 2.48rem;margin-top: 0.04rem;overflow:hidden;vertical-align:middle;text-align: center;">
							<img :src="i.picUrl[2].picUrl" style="min-height:100%;min-width:100%;" />
						</div>
					</div>
				</div>
				<div @click="xiang_qing(i)" class="img_box" v-else-if="i.picUrl.length==2">
					<!--大图容器-->
					<div style="width: 49.5%;height:5rem;float: left;margin-right: 0.25%;overflow:hidden;vertical-align:middle;text-align: center;">
						<img :src="i.picUrl[0].picUrl" style="height:100%;max-width:auto;" />
					</div>

					<div style="width: 49.5%;height:5rem;float: right;margin-left: 0.25%;overflow:hidden;vertical-align:middle;text-align: center;">
						<img :src="i.picUrl[1].picUrl" style="height:100%;max-width:auto;" />
					</div>
				</div>

				<div @click="xiang_qing(i)" class="img_box" v-else-if="i.picUrl.length==1">
					<!--大图容器-->
					<div style="width: 100%;height: 5rem;overflow:hidden;vertical-align:middle;text-align: center;position: relative;">
						<img :src="i.picUrl[0].picUrl" ref="img1" @load="img1_chuli" style="width:auto;position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" />
					</div>

				</div>
				<!--文本容器-->
				<div style="width: 100%;box-sizing: border-box;padding: 0.37rem;" v-if="i.artType&&i.artType!='[]'||i.docUrl">
					<p class="dynamic_title" style="-webkit-box-orient: vertical">{{i.artTitle}}</p>
					<span>
					<span style="padding: 0;margin: 0;display: inline;font-size: 0.28rem;color: #D0D0D0"  v-if="i.artType&&i.artType!='[]'">#{{i.artType}}  </span>
					<span class="text_span" style="-webkit-box-orient: vertical;display: inline;">
						<!--从2008第一家奢华酒店到87家豪华酒店，“酒店王国” 十载光彩卓然。本次设计采用黑金色调，融合主题和酒 店元素进行创意构思，从创意到落地历时一周。
				-->

						{{i.docUrl}}
					</span>
					</span>
				</div>
				<div class="new_xian"></div>
				<div class="boxs_to">

					<span style="font-size: 0.4rem;float:left;margin-top: 0.2rem;" @click="callTap(i,index)">
				<span  class="" v-for="c in callStauts">
					
					<img class="imgss"  v-if="c.id==i.artId&&c.stauts=='1'" src="../../../static/img/icon_detail_good_normal.png"/>
	        		<img class="imgss" v-else-if="c.id==i.artId&&c.stauts=='2'" src="../../../static/img/icon_detail_good_active.png"/>
				
				</span>
					<br />
					<p v-if="i.readerLike==0" style="text-align: center;font-size: 0.215rem;color: rgba(153, 153, 153, 1);">点赞</p>
					<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerLike.length)==4)?parseInt(i.readerLike)/1000+'k':i.readerLike}}</p>
					</span>

					<span style="font-size: 0.4rem;float: left;margin-top: 0.2rem;margin-left: 0.2rem;" @click="collectTap(i,index)">
				<span  v-for="cl in collectStauts">
					
					<img class="imgss" v-if="cl.id==i.artId&&cl.stauts=='1'" src="../../../static/img/icon_detail_collect_normal.png"/>
	        		<img class="imgss" v-else-if="cl.id==i.artId&&cl.stauts=='2'" src="../../../static/img/icon_detail_collect_active.png"/>
				
				</span>
					<br />
					<p v-if="i.readerCollect==0" style="font-size: 0.215rem;color: rgba(153, 153, 153, 1);text-align: center;">收藏</p>
					<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerCollect.length)==4)?parseInt(i.readerCollect)/1000+'k':i.readerCollect}}</p>
					</span>

					<span style="font-size: 0.4rem;float: left;margin-top: 0.2rem;margin-left: 0.2rem;" @click="zhuan_f(i)">
				<!--<i style="margin-left: 0.04rem;" class="">-->
					<img class="imgss" src="../../assets/img/icon_detail_share.png"  />
				<!--</i>-->
				<br />
				<p v-if="i.readerForward=='0'" style="font-size: 0.215rem;color: rgba(153, 153, 153, 1);text-align:center;">转发</p>
				<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerForward.length)==4)?parseInt(i.readerForward)/1000+'k':i.readerForward}}</p>
				
			</span>

					<span style="font-size: 0.4rem;float: left;margin-top: 0.2rem;margin-left: 0.2rem;" @click="commentTap(i,index)">
				<!--<i style="margin-left: 0.04rem;" class="">-->
					<img class="imgss" src="../../assets/img/icon_detail_comment.png"/>
				
				<!--</i>-->
				<br />
				<p v-if="i.readerDiscuss=='0'" style="font-size: 0.215rem;color: rgba(153, 153, 153, 1);text-align: center;">评论</p>
				<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerDiscuss.length)==4)?parseInt(i.readerDiscuss)/1000+'k':i.readerDiscuss}}</p>
			</span>

					<span @click="dashang(i,index)" style="float: right;margin-right: 0.2rem;">
				<!--<i style="margin-left: 0.04rem;color: yellow;" class="fa fa-gift"></i>-->
				<img style="width: 0.64rem;height: 0.64rem;margin-top: 0.3rem;" src="../../assets/img/icon_detail_tip.png"/>
				
			</span>

				</div>

			</div>
			<div class="more" @click="listenScroll">
				<p style="color: #D0D0D0;">{{more_text}}</p>
			</div>
		</div>

		<replydialog @huoqu="pinglun_number" v-bind:a='reply'></replydialog>

		<dashang v-show='$store.state.dashang'></dashang>

		<div v-show="xian_s" class="zhe_1" style="">
			<div style="width:100%;height: 0.07rem;"></div>
			<p style="font-size: 0.35rem;margin-top: 0.45rem;color:#8C939D;line-height:1rem;">你当前是“游客状态”无法获得该页面信息，是否立即去</p>
			<p @click="shan_chu" class="pss">登录?</p>
		</div>

	</div>
</template>

<script>
	import store from '../../vuex/store'
	import replydialog from '../Details_of_the_work/replydialog.vue'
	import dashang from '../home/dashang.vue'
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';
	export default {
		store,

		components: {

			replydialog,
			dashang,
		},
		data() {
			return {
				xian_s: false,
				dashang_show: false,
				act: [],
				times: [],
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
				page: 1,
				more_text: '点击加载更多',
				reply: {
					is_reply: false
				},

				pinglun_b: '',
				testData: ["#创作花絮", "#艺圈活动", "#励志"],
			}
		},
		mounted() {
			if(localStorage.yous == 'true') {
				this.xian_s = true
			}
		},
		methods: {
			chuli_date(i){
				var o_time=new Date(i);
				var n_time=new Date();
				//console.log(o_time,"时间",n_time)
				if(o_time.getMonth()==n_time.getMonth()){
				//	console.log(parseInt(o_time.getDay()-n_time.getDay()),"111111")
					if(parseInt(n_time.getDay()-o_time.getDay())>0){
						if(parseInt(n_time.getDay()-o_time.getDay())>1){
							console.log(Math.floor(n_time.getDay()-o_time.getDay()))
							return Math.ceil(n_time.getDay()-o_time.getDay())+"天前"
						}else{
							return "昨天"
						}
						
					}else{
						return "今天"
					}
				}else{
					return Math.ceil((n_time.getTime()-o_time.getTime())/ (1000 * 60 * 60 * 24))+"天前"
				}
				
			},
			shan_chu() {
				this.$router.push({
					path: '/home'
				});
			},

			//			shan_s(){
			//		        this.xian_s = false
			//	        },
			tiao(i) {

				this.$store.state.Author_s_detailed_routing = 6

				this.$store.state.worksOpId = i.opId;

				this.$router.push({
					path: '../personal_data'
				})
			},
			img1_chuli() {
				if(this.$refs.img1.length > 0) {
					for(var i = 0; i < this.$refs.img1.length; i++) {
						var img = new Image();
						img.src = this.$refs.img1[i].currentSrc;
						if(img.width > img.height) {
							this.$refs.img1[i].style.width = "auto"
							this.$refs.img1[i].style.height = "100%"
						} else {
							this.$refs.img1[i].style.width = "100%"
							this.$refs.img1[i].style.height = "auto"
						}
						//console.log(img.width,img.height,"22222222222222222")
					}

				}
			},
			pinglun_number() {
				this.act[this.pinglun_b].readerDiscuss += 1
				//				//console.log(this.act[pinglun_b].readerDiscuss,'评论数')
			},
			dashang(i, index) {
				//console.log(i,"打赏")
				this.$store.state.Return_to_return = 6
				this.$store.state.dashang = true
				this.$store.state.A_reward = i
				this.$store.state.is_comment_dashang = false; //恢复打赏作品
				this.$store.state.A_reward.artFlag = '2'
				this.pinglun_b = index
			},
			xiang_qing(i) {
				//console.log(i,'当前朋友圈被点击的作品')
				this.$store.state.Author_s_detailed_routing = 6
				this.$store.state.back_id = 5
				this.$store.state.worksId = i.artId
				this.$store.state.tr = 4
				this.$store.state.worksName="朋友圈"
				this.$router.push({
					path: '../works_detail'
				});
			},

			/*获取朋友圈*/
			request_data() {

				var url = this.$store.state.request_url + "/api/map/user/circleOfFriends.do";
				var memId = this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				this.$http({
					url: this.$store.state.request_url + "/api/map/user/circleOfFriends.do?memId=" + memId + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId,
						page: this.page,
						rows: 10,
						operatorId: this.$store.state.data.memId
					}
				}).then(function(response) {
					//console.log(response.body.data)
					if(response.body.meta.res == '00000') {
						//this.act = response.body.data.circleFriend
						if(response.body.data.circleFriend.length > 0) {
							for(var i = 0; i < response.body.data.circleFriend.length; i++) {
								this.act.push(response.body.data.circleFriend[i]) //保存朋友圈数据
								this.searchCall(response.body.data.circleFriend[i]); //查询点赞
								this.searchCollect(response.body.data.circleFriend[i]); //查询收藏
							}
							console.log(this.act, '朋友数据')
							this.more_text = "点击加载更多"
							//console.log(this.collectStauts,"收藏状态数组")
							this.r(); //处理时间
						} else if(response.body.data.circleFriend.length == 0) { /*如果无数据,显示*/
							this.more_text = "已经没有更多了"
						}
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			zhuan_f(i) { //微信转发功能
				//console.log(i,"33333333333333")
				this.$store.state.share_url = "";
				this.$store.state.share_title = "";
				this.$store.state.share_content = "";
				this.$store.state.share_img = "";

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
						console.log(response.body.data.artType)
						var title = "";
						if(response.body.data.artType && response.body.data.artType != "[]") {
							title = response.body.data.artType;
						} else {
							title = "励志";
						}

						/**闲情转发内容*/
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
			/*点赞事件*/
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
						likeType: "2", //类型
						artId: item.artId, //作品Id
						likeOpId: this.$store.state.data.memId //用户Id
					}
				}).then(function(response) {
					//console.log(response.body,'点赞')
					this.callStauts = [];
					if(response.body.meta.res == "00000") {
						for(var j = 0; j < this.act.length; j++) {
							this.searchCall(this.act[j]);
						}
						Toast({
							message: "点赞成功",
							position: 'middle',
							duration: 2000
						});

						this.act[i].readerLike++

					} else if(response.body.meta.res == "99999") {
						//、、、、、、、、、、、、、、、、、、、、、、取消点赞事件、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
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
								opId: item.opId, //作者Id
								likeType: "2", //类型
								artId: item.artId, //作品Id
								likeOpId: this.$store.state.data.memId //用户Id
							}
						}).then(function(response) {
							//console.log(response.body,'点赞')
							this.callStauts = [];
							if(response.body.meta.res == "00000") {
								for(var j = 0; j < this.act.length; j++) {
									this.searchCall(this.act[j]);
								}
								this.act[i].readerLike--
							}
						}).catch(function(err) { //console.log(err)
						})
						//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			/*加载*/
			moreTap() {
				this.more_text = "加载中..."
				this.page += 1;
				this.request_data();
			},
			/*处理时间，将时间戳转为日期*/
			r() {

			},
			/*查询点赞状态*/
			searchCall(item) {
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
			/*查询收藏状态*/
			searchCollect(item) {
				//console.log(this.$store.state.data.memId, "用户",item)

				var url = this.$store.state.request_url + "/api/map/art/collectForOpId.do";
				var memId = this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);

				this.$http({
					url: this.$store.state.request_url + "/api/map/art/collectForOpId.do?memId=" + memId + "&ts=" + ts,
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
						//console.log(response.body.meta.msg, "收藏状态");
						if(response.body.meta.msg == "NO") {
							this.collect.id = item.artId;
							this.collect.stauts = "1";
							this.collectStauts.push(this.collect); //未收藏
							this.collect = {};
						} else if(response.body.meta.msg == "YES") {
							this.collect.id = item.artId;
							this.collect.stauts = "2";
							this.collectStauts.push(this.collect); //已收藏
							this.collect = {};
						}

					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			/*收藏事件*/
			collectTap(item, index) {
				//console.log(item, "收藏作品", this.$store.state.data.memId)
				var url = this.$store.state.request_url + "/api/map/art/artCollect.do";
				var memId = this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);

				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artCollect.do?memId=" + memId + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId, //用户Id
						collectType: "2", //类型
						artId: item.artId, //作品Id
						collectOpId: item.opId //作者Id
					}
				}).then(function(response) {
					//console.log(response.body)
					this.collectStauts = [];

					if(response.body.meta.res == "00000") {
						for(var i = 0; i < this.act.length; i++) {
							//console.log(this.act[i])
							//console.log("_______收藏________")

							this.searchCollect(this.act[i]);
						}
						this.act[index].readerCollect += 1
						Toast({
							message: "收藏成功",
							position: 'middle',
							duration: 2000
						});
					} else if(response.body.meta.res == "99999") {
						///////////////////////////////取消收藏事件 //////////////////////////////////////////////////////////////
						var url = this.$store.state.request_url + "/api/map/art/uncollect.do";
						var sign = md5(url + memId + token + ts);
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/uncollect.do?memId=" + memId + "&ts=" + ts,
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							emulateJSON: false,
							method: 'post',
							body: {
								opId: this.$store.state.data.memId, //用户Id
								collectType: "1", //类型
								artId: item.artId, //作品Id
								collectOpId: item.opId //作者Id
							}
						}).then(function(response) {
							//console.log(response.body)
							this.collectStauts = [];

							if(response.body.meta.res == "00000") {
								for(var i = 0; i < this.act.length; i++) {
									this.searchCollect(this.act[i]);
								}
								this.act[index].readerCollect -= 1
							}
						}).catch(function(err) {
							//console.log(err)
						})
						/////////////////////////////////////////////////////////////////////////////////////////////
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			/*评论*/
			commentTap(i, index) {
				//console.log("触发")

				this.$store.state.commentWorksdata = i;
				this.reply.is_reply = true

				this.pinglun_b = index
			},
			/*监听滚动事件，上滑加载更多*/
			listenScroll() {
				if(this.more_text == "点击加载更多") {
					this.moreTap();
				}
				//				var _that = this;
				//				$(window).scroll(function() {
				//					let scrollTop = $(window).scrollTop();
				//					let windowTop = $(window).height();
				//					let documentTop = $(document).height();
				//					if(documentTop - windowTop <= scrollTop) {
				//
				//						
				//					}
				//				});
			}
		},
		created() {
			this.$store.state.is_bottom = true;
			this.request_data(); /*获取朋友圈*/
			//			this.listenScroll(); /*监听滚动事件*/
		},

	}
</script>

<style scoped="scoped">
	.boxs {
		width: 100%;
		background: white;
		margin-bottom: 0.2rem;
		padding-top: 0.15rem;
		overflow: hidden;
	}
	
	.chat_box {
		width: 100%;
		height: 1.4rem;
		/*margin-top: 0.02rem;*/
	}
	
	.imgs {
		width: 0.8rem;
		height: 0.8rem;
		margin: 0.3rem 0.25rem;
		border-radius: 50%;
	}
	
	.text_box {
		width: 6.2rem;
		height: 100%;
		float: right;
		position: relative;
		line-height: 1.4rem;
	}
	
	.img_box {
		width: 100%;
		/*height: 5rem;*/
		overflow: hidden;
	}
	
	.text_span {
		font-size: 0.28rem;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
	}
	
	.boxs_to {
		width: 90%;
		height: 1.3rem;
		margin: 0 auto;
		position: relative;
		border-top: 0.005rem solid #f1f1f1;
		padding-bottom: 0.2rem;
	}
	
	.more {
		padding-top: 0.3rem;
		width: 100%;
		height: 1rem;
		text-align: center;
		padding-bottom: 0.5rem;
		background-color: #fff;
	}
	
	.more p {
		font-size: 0.3rem;
	}
	
	.imgss {
		width: 0.5rem;
		height: 0.5rem;
		margin-left: 0.1rem;
	}
	
	.biaoqian {
		width: 90%;
		margin: 0 auto;
		overflow: hidden;
	}
	
	.biaoqian_item {
		float: left;
		margin-right: 0.3rem;
		font-size: 0.26rem;
		color: #CCCCCC;
	}
	
	.new_xian {
		width: 90%;
		margin: 0 auto;
		height: 0.025rem;
		background: #EEEEEE;
		margin-top: 0.1rem;
	}
	/*.zhe{
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index:50; 
		background: rgba(0,0,0,.6);
	}*/
	
	.zhe_1 {
		width: 5rem;
		height: 3.2rem;
		background: rgb(246, 246, 246);
		;
		margin: 0 auto;
		border-radius: 0.2rem;
		text-align: left;
		position: absolute;
		top: 4rem;
		left: 18%;
	}
	
	.pss {
		font-size: 0.35rem;
		color: #ff9d00;
		position: absolute;
		top: 1.775rem;
		/*right: 0.5;*/
		right: 0.55rem;
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