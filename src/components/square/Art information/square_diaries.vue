<template>
	<!--
    	作者：672423400@qq.com
    	时间：2018-06-11
    	描述：广场-闲情---》
    -->
	<div style="width: 100%;background:#F6F6F6;overflow-x: hidden;" @touchstart='tiao_s' @touchmove='tiaos'>

		<div style="width:100%;height: 10rem;overflow-y: auto;">

			<div class="up_lan" style="overflow-x: hidden;" id="lan" v-show="plate.length>0">
				<div class="tab">
					<div class="swiper-container_diariess">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(i,index) in plate">
								<div class="lis" @click="select_item(index,i.dictName)">
									<img :src="i.dicUrl" style="width: 100%;height: 100%;border-radius: 0.1rem;" />
									<div class="dian" v-show="i.check"></div>
									<div style="width: 100%;height: 100%;text-align: center;line-height: 1.5rem;position: absolute;top: 0;left: 0;">
										<p class="lis_p" :class="{lis_p_active:i.check}">{{i.dictName}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-show="plate.length>0" class="xian"></div>

			<div v-for="(i,index) in act" class="boxs">
				<div class="chat_box" style="-webkit-transform:rotate(0deg);">
					<!--头像-->
					<div style="width: 0.8rem;height: 0.8rem;overflow: hidden;margin: 0.3rem 0.25rem;border-radius: 0.4rem;float: left;vertical-align: middle;position: relative;">
						<img @click="tiao(i)" class="imgs" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" ref="tou" @load="tou_chuli" :src="i.opPic" alt="" />
					</div>

					<div class="text_box">

						<div style="float: left;margin-top: 0.4rem;">
							<!--用户ID-->
							<p style="font-size: 0.32rem;">{{i.nickname}}</p>
							<!--时间-->

							<p style="font-size: 0.28rem;color: #CACACA;">{{chuli_date(i.insertDate)}}</p>
						</div>
						<div class="add_friend" @click="addFriend(i)">关注</div>
					</div>
				</div>

				<div @click="xiang_qing(i)" class="img_box" style="overflow: hidden;" v-if="i.picUrl.length>=4">
					<!--大图容器-->
					<div v-for="(arr,index) in i.picUrl" style="width:2.4rem;height:2.4rem;float:left;vertical-align:middle;text-align:center;overflow:hidden;margin-left:0.07rem;margin-top:0.07rem;">
						<img :src="arr.picUrl" style="width: auto;height: 100%;" />
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
						<img :src="i.picUrl[0].picUrl" ref="img" id="img" @load="img_chuli" style="width:100%;height:100%;position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" />
					</div>

				</div>
				<!--文本容器-->
				<div style="width: 100%;box-sizing: border-box;padding: 0.37rem;" v-if="i.artType&&i.artType!='[]'||i.docUrl">
					<!--文本内容-->
					<p class="dynamic_title" style="-webkit-box-orient: vertical;">{{i.artTitle}}</p>
					<span>
					<span style="padding: 0;margin: 0;display: inline;font-size: 0.28rem;color: #D0D0D0"  v-if="i.artType&&i.artType!='[]'">#{{i.artType}}  </span>
					<span class="text_span" style="-webkit-box-orient: vertical;display: inline;">
						<!--从2008第一家奢华酒店到87家豪华酒店，“酒店王国” 十载光彩卓然。本次设计采用黑金色调，融合主题和酒 店元素进行创意构思，从创意到落地历时一周。
				-->

						{{html_detail(i)}}
					</span>
					</span>

				</div>

				<div class="new_xian"></div>
				<div class="boxs_to">

					<span style="font-size: 0.4rem;float:left;margin-top: 0.2rem;" @click="callTap(i,index)">
				<span  class="" v-for="c in callStauts">
					<img class="imgss"  v-if="c.id==i.artId&&c.stauts=='1'" src="../../../../static/img/icon_detail_good_normal.png"/>
	        		<img class="imgss" v-else-if="c.id==i.artId&&c.stauts=='2'" src="../../../../static/img/icon_detail_good_active.png"/>
				</span>
					<img class="imgss" v-show="yous" src="../../../../static/img/icon_detail_good_normal.png" />

					<br />
					<p v-if="i.readerLike==0" style="text-align: center;font-size: 0.215rem;color: rgba(153, 153, 153, 1);">点赞</p>
					<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerLike.length)==4)?parseInt(i.readerLike)/1000+'k':i.readerLike}}</p>
					</span>

					<span style="font-size: 0.4rem;float: left;margin-top: 0.2rem;margin-left: 0.2rem;" @click="collectTap(i,index)">
				<span  v-for="cl in collectStauts">
					
					<img class="imgss" v-if="cl.id==i.artId&&cl.stauts=='1'" src="../../../../static/img/icon_detail_collect_normal.png"/>
	        		<img class="imgss" v-else-if="cl.id==i.artId&&cl.stauts=='2'" src="../../../assets/img/icon_detail_collect_active.png"/>
				
				</span>
					<img class="imgss" v-show="yous" src="../../../../static/img/icon_detail_collect_normal.png" />

					<br />
					<p v-if="i.readerCollect==0" style="font-size: 0.215rem;color: rgba(153, 153, 153, 1);text-align: center;">收藏</p>
					<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerCollect.length)==4)?parseInt(i.readerCollect)/1000+'k':i.readerCollect}}</p>
					</span>

					<span style="font-size: 0.4rem;float: left;margin-top: 0.2rem;margin-left: 0.2rem;" @click="zhuan_f(i)">
				<!--<i style="margin-left: 0.04rem;" class="">-->
					<img class="imgss" src="../../../assets/img/icon_detail_share.png"  />
				<!--</i>-->
				<br />
				<p v-if="i.readerForward=='0'" style="font-size: 0.215rem;color: rgba(153, 153, 153, 1);text-align:center;">转发</p>
				<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerForward.length)==4)?parseInt(i.readerForward)/1000+'k':i.readerForward}}</p>
				
			</span>

					<span style="font-size: 0.4rem;float: left;margin-top: 0.2rem;margin-left: 0.2rem;" @click="commentTap(i,index)">
				<!--<i style="margin-left: 0.04rem;" class="">-->
					<img class="imgss" src="../../../assets/img/icon_detail_comment.png"/>
				
				<!--</i>-->
				<br />
				<p v-if="i.readerDiscuss=='0'" style="font-size: 0.215rem;color: rgba(153, 153, 153, 1);text-align: center;">评论</p>
				<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerDiscuss.length)==4)?parseInt(i.readerDiscuss)/1000+'k':i.readerDiscuss}}</p>
			</span>

					<span @click="dashang(i,index)" style="float: right;margin-right: 0.2rem;">
				<!--<i style="margin-left: 0.04rem;color: yellow;" class="fa fa-gift"></i>-->
				<img style="width: 0.64rem;height: 0.64rem;margin-top: 0.3rem;" src="../../../assets/img/icon_detail_tip.png"/>
				
			</span>

				</div>

			</div>
			<div class="more" @click="listenScroll" v-if="act.length>0">
				<p style="color: #D0D0D0;">{{more_text}}</p>
			</div>

			<div class="no_article" v-if="act.length==0">
				<img src="../../../assets/img/icon_noPaint.png" style="width: 100%;height: 100%;" />
				<p>暂无闲情</p>
			</div>
		</div>

		<replydialog @huoqu="pinglun_number" v-bind:a='reply'></replydialog>

		<dashang v-show='$store.state.dashang'></dashang>

		<div v-show="xian_s" class="zhe" @touchmove.prevent>
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="width:100%;height: 0.07rem;"></div>
				<p style="    font-size: 0.35rem;margin-top: 0.45rem;">你当前是“游客状态”无法操作，是否立即去登录?</p>
				<div style="width:100%;height:1rem;margin-top: 0.56rem;border-top:0.02rem solid #E0E0E0;line-height: 1rem;">
					<div @click="shan_chu" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.38rem;">
						确定
					</div>
					<div @click="shan_s" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.38rem;">
						取消
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import store from '../../../vuex/store'
	import replydialog from '../../Details_of_the_work/replydialog.vue'
	import dashang from '../../home/dashang.vue'
	import swiper from '../../../../static/js/swiper.js'
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
				testData: [],
				plate: [], //板块数组
				select_name: '',
				yous: false,
			}
		},
		methods: {
			
			
			chuli_date(i){
				var o_time=new Date(i);
				var n_time=new Date();
				//console.log(o_time,"时间",n_time)
				if(o_time.getMonth()==n_time.getMonth()){
					//console.log(parseInt(o_time.getDay()-n_time.getDay()),"111111")
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
			tou_chuli(){
				
				if(this.$refs.tou){
					for(var i=0;i<this.$refs.tou.length;i++){
						var img=new Image();
						img.src=this.$refs.tou[i].currentSrc
						
						if(img.width<img.height){
							this.$refs.tou[i].style.width="100%";
							this.$refs.tou[i].style.height="auto";
						}else{
							this.$refs.tou[i].style.width="auto";
							this.$refs.tou[i].style.height="100%";
						}
					}
					
				
				}
				
				
			},
			shan_chu() {
				this.$router.push({
					path: '/home'
				});
			},

			shan_s() {
				this.xian_s = false
			},
			tiao_s() {
				let ev = ev || event
				this.diyix = ev.touches[0].clientX;
				this.diyiy = ev.touches[0].clientY;
			},
			tiaos(event) {
				let ev = ev || event
				let dierx = ev.touches[0].clientX;
				let diery = ev.touches[0].clientY;
				var cdx = dierx - this.diyix
				var cdy = diery - this.diyiy
				let box_to = document.getElementsByClassName('box_ss')
				if(Math.abs(cdx) < Math.abs(cdy) && cdy < 0) {
					// $("#lan").css("opacity","0");
					//				  	 	console.log("上",box_to[box_to.length-1].getBoundingClientRect().top)

				} else {
					//$("#lan").css("opacity","1");
				}
			},
			tiao(i) {
				if(localStorage.yous == 'true') {
					this.xian_s = true
				} else {
					this.$store.state.Author_s_detailed_routing = 6

					this.$store.state.worksOpId = i.opId;

					this.$router.push({
						path: '../personal_data'
					})
				}

			},

			pinglun_number() {
				this.act[this.pinglun_b].readerDiscuss += 1
				//				//console.log(this.act[pinglun_b].readerDiscuss,'评论数')
			},
			dashang(i, index) {

				if(localStorage.yous == 'true') {
					this.xian_s = true
				} else {
					this.$store.state.Return_to_return = 6
					this.$store.state.dashang = true
					this.$store.state.A_reward = i
					this.$store.state.is_comment_dashang = false; //恢复打赏作品
					this.$store.state.A_reward.artFlag = '2'
					this.pinglun_b = index
				}

				//console.log(i,"打赏")

			},
			xiang_qing(i) {
				//console.log(i,'当前朋友圈被点击的作品')

				if(localStorage.yous == 'true') {
					this.xian_s = true
				} else {
					this.$store.state.Author_s_detailed_routing = 6
					this.$store.state.worksId = i.artId;
					this.$store.state.worksName="闲情"
					this.$store.state.tr = 6
					this.$store.state.back_id = 61
					this.$router.push({
						path: '../works_detail'
					});
				}

			},

			request_data_s() {

				this.$http({
					url: this.$store.state.request_url + "/api/mapFreeVerification/touristsLeisureInquiry.do",
					headers: {
						"content-type": "application/json;charset=UTF-8",

					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId,
						page: this.page,
						rows: 10,
						artType: this.select_name
					}
				}).then(function(response) {
					//console.log(response.body.data)
					if(response.body.meta.res == '00000') {
						console.log('游客状态')
						//this.act = response.body.data.circleFriend
						if(response.body.data.circleFriend.length > 0) {
							for(var i = 0; i < response.body.data.circleFriend.length; i++) {
								this.act.push(response.body.data.circleFriend[i]) //保存朋友圈数据
								this.searchCall(response.body.data.circleFriend[i]); //查询点赞
								this.searchCollect(response.body.data.circleFriend[i]); //查询收藏
							}
							//console.log(this.act, '朋友数据')
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

			/*获取朋友圈*/
			request_data() {

				//console.log(1, "22222222222")
				var url = this.$store.state.request_url + "/api/map/art/leisureInquiry.do";
				var memId = this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/leisureInquiry.do?memId=" + memId + "&ts=" + ts,
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
						artType: this.select_name
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
							//console.log(this.act, '朋友数据')
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

				if(localStorage.yous == 'true') {
					this.xian_s = true
				} else {
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

							//console.log(response.body,'转发')
							var title = "";
							if(i.artType && i.artType != "[]") {
								title = i.artType;
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

				}

			},
			/*点赞事件*/
			callTap(item, i) {

				if(localStorage.yous == 'true') {
					this.xian_s = true
				} else {
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
				}

			},
			/*加载*/
			moreTap() {
				this.more_text = "加载中..."
				this.page += 1;

				if(localStorage.yous == 'true') {
					this.request_data_s()
				} else {
					this.request_data();
				}

			},
			/*处理时间，将时间戳转为日期*/
			r() {

			},
			/*处理标签*/
			html_detail(i) {
				var str = i.docUrl;
				var dd = str.replace(/<\/?.+?>/g, "")
				var dds = dd.replace(/ /g, "");
				var ddss = dds.replace(/[ ]|[&nbsp;]/g, "");
				//console.log(dds,"999999999")
				return ddss;
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

				if(localStorage.yous == 'true') {
					this.xian_s = true
				} else {
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
				}

			},
			/*评论*/
			commentTap(i, index) {
				//console.log("触发")
				if(localStorage.yous == 'true') {
					this.xian_s = true
				} else {
					this.$store.state.commentWorksdata = i;
					this.reply.is_reply = true

					this.pinglun_b = index
				}

			},
			/**加为好友*/
			addFriend(item) {

				if(localStorage.yous == 'true') {
					this.xian_s = true
				} else {
					//console.log("进来");
					var url = this.$store.state.request_url + "/api/map/art/addAttention.do";
					var id = this.$store.state.data.memId;
					var token = this.$store.state.data.tokEn;
					var ts = new Date().getTime();
					var sign = md5(url + id + token + ts)
					var that = this;
					this.$http({
						url: this.$store.state.request_url + "/api/map/art/addAttention.do?memId=" + id + "&ts=" + ts,
						headers: {
							"content-type": "application/json;charset=UTF-8",
							'sIgn': sign
						},
						emulateJSON: false,
						method: 'post',
						body: {
							opId: this.$store.state.data.memId,
							attentionOpId: item.opId,
							attentionType: '1'
						}
					}).then(function(response) {
						//console.log(response.body,"--------------")
						if(response.body.meta.res == '00000') {

							// console.log("___________添加关注_________")
							Toast({
								message: '关注成功',
								position: 'middle',
								duration: 2000
							});
							// this.attention="已关注"

							var new_act = [];
							var new_searchCall = [];
							var new_searchCollect = [];
							/**删除好友相关数据,交换数据达到刷新效果*/
							for(var i = 0; i < that.act.length; i++) {
								if(that.act[i].opId != item.opId) {
									new_act.push(that.act[i])
								}
							}
							that.act = new_act;

							for(var i = 0; i < that.searchCall.length; i++) {
								if(that.searchCall[i].opId != item.opId) {
									new_searchCall.push(that.act[i])
								}
							}
							that.act = new_searchCall;
							for(var i = 0; i < that.searchCollect.length; i++) {
								if(that.searchCollect[i].opId != item.opId) {
									new_searchCollect.push(that.act[i])
								}
							}
							that.act = new_searchCollect;
						} else {
							//console.log(response.body.meta,"2222222222")
							Toast({
								message: response.body.meta.msg,
								position: 'middle',
								duration: 2000
							});
						}
					}).catch(function(err) {
						//console.log(err)
					})
				}

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
			},
			/**顶部条件栏*/
			swipers() {
				new swiper('.swiper-container_diariess', {
					slidesPerView: 4.5,
					centeredSlides: 0,
					spaceBetween: 40,
					initialSlide: 0,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper 
					observeParents: true, //修改swiper的父元素时，自动初始化swiper 
				})

			},
			/*获取板块*/
			getBlock() {
				this.plate = []; //获取前清空
				var url = this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {
						parentId: '84a0d71b5d6a47eaa7a4c84e0362ffaa'
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						//console.log(response.body.data, '标签数据---------------------------')

						/*添加全部对象*/
						var all = {};
						all.check = true;
						all.dictName = "全部"
						all.dicUrl = "static/img/xianqing_all.jpg";
						this.plate.push(all)
						for(var i = 0; i < response.body.data.length; i++) {
							var new_plate = {};
							new_plate = response.body.data[i];
							new_plate.check = false;
							this.plate.push(new_plate);
						}
						setTimeout(() => {
							this.swipers();
						}, 50)
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			select_item(index, name) {
				/**初始化板块状态*/
				if(name == "全部") {
					this.select_name = "";
				} else {
					this.select_name = name;
				}

				for(var i = 0; i < this.plate.length; i++) {

					this.plate[i].check = false
				}
				/**设置选择项*/
				this.plate[index].check = true

				/*初始化数据*/
				this.act = [];
				this.collectStauts = [];
				this.page = 1;
				this.callStauts = [];
				if(localStorage.yous == 'true') {
					this.request_data_s()
				} else {
					this.request_data();
				}

			},
			/*处理图片*/
			img_chuli() {

				if(this.$refs.img) {
					//console.log(this.$refs.img.length,"长度")
					for(var i = 0; i < this.$refs.img.length; i++) {
						var img_str = new Image();

						img_str.src = this.$refs.img[i].src;
						//console.log(i,"---",img_str.width,"-",img_str.height)
						if(img_str.width > img_str.height) {
							this.$refs.img[i].style.width = "auto";
							this.$refs.img[i].style.height = "100%";

							//console.log("-1--",img_str.width,"-",img_str.height)
						} else {
							this.$refs.img[i].style.width = "100%";
							this.$refs.img[i].style.height = "auto";
						}
					}
				}

			}
		},
		created() {

			this.$store.state.is_bottom = true;
			this.getBlock();
			if(localStorage.yous == 'true') {
				this.yous = true
				this.request_data_s()
			} else {
				this.yous = false
				this.request_data();
			} /*获取朋友圈*/

		},
		mounted() {
			//			this.listenScroll(); /*监听滚动事件*/
		}

	}
</script>

<style scoped="scoped">
	@import url("../../../assets/css/swiper.css");
	.boxs {
		width: 100%;
		background: white;
		margin-bottom: 0.2rem;
		overflow: hidden;
	}
	
	.chat_box {
		width: 100%;
		height: 1.4rem;
		/*margin-top: 0.02rem;*/
	}
	
	/*.imgs {
		width: auto;
		height: 100%;
		/*margin: 0.3rem 0.25rem;
	}*/
	
	.text_box {
		width: 6.2rem;
		height: 100%;
		float: right;
		position: relative;
	}
	
	.img_box {
		width: 100%;
		/*height: 5rem;*/
		overflow: hidden;
	}
	
	.text_span {
		padding: 0;
		margin: 0;
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
	
	.add_friend {
		width: 1.3rem;
		height: 0.54rem;
		line-height: 0.54rem;
		text-align: center;
		margin-top: 0.43rem;
		margin-right: 0.2rem;
		border: #333333 solid 1px;
		float: right;
		font-size: 0.26rem;
		border-radius: 0.1rem;
	}
	/*tab菜单*/
	
	.tab {
		width: 96%;
		overflow: hidden;
		margin-left: 4%;
	}
	
	.lis {
		position: relative;
		font-size: 0.26rem;
		color: #333333;
		height: 1.5rem;
		width: 1.5rem;
		line-height: 0.45rem;
		background-color: #F5F4F7;
		margin-top: 0.2rem;
		border-radius: 0.1rem;
	}
	
	.lis_p {
		color: #ffffff;
		text-align: center;
		font-size: 0.26rem;
		line-height: 1.5rem;
	}
	
	.lis_p_active {
		color: #FF9D00;
		text-align: center;
		font-size: 0.26rem;
		line-height: 1.5rem;
	}
	
	.listo {
		float: left;
		font-size: 0.26rem;
		color: #fff;
		width: 1rem;
		line-height: 0.45rem;
		background-color: #FF9A2B;
		margin-top: 0.3rem;
		border-radius: 0.02rem;
	}
	
	.dian {
		position: absolute;
		width: 0.14rem;
		height: 0.14rem;
		border-radius: 50%;
		top: 0.16rem;
		left: 0.13rem;
		background-color: #FF0000;
	}
	
	.up_lan {
		width: 100%;
		height: 1.9rem;
		background-color: #fff;
		z-index: 300;
	}
	
	.xian {
		width: 100%;
		height: 0.2rem;
		background-color: #F7F7F7;
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
	
	.zhe {
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 9994;
		background: rgba(0, 0, 0, .6);
	}
	
	.zhe_1 {
		width: 5rem;
		height: 3.2rem;
		background: white;
		margin: 0 auto;
		border-radius: 0.2rem;
		margin-top: 6rem;
		text-align: center;
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