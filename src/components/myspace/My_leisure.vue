<template>
	<div style="width: 100%;position:relative;z-index: 300;background: white;overflow: hidden;">
		<!--
        	作者：2443611475@qq.com
        	时间：2018-04-12
        	描述：我的闲情
        -->
		<div style="width: 100%;position:relative;z-index: 300;background: white;">
			<!--<div class="box_top" style="width: 100%;height: 0.88rem;background: white;position: fixed;top: 0;left: 0;z-index: 99;line-height: 0.88rem;">
				<img @click="hui" style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.29rem;" src="../../assets/img/zuo.png" alt="" />
				<p style="font-size: 0.36rem;margin-left: 3.1rem;">我的闲情</p>
			</div>-->
			
			<div class="head">
				<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../assets/img/zuo.png" @click="hui"/>
				<div class="title">
					<p>我的闲情</p>
				</div>
			<!--<img class="img2" src="../../assets/img/icon_detail_more.png" @click="reportTap(works_data)" />-->
			</div>
			
			<div style="height: 0.88rem;"></div>
			
			<div v-for="(i,index) in data" class="boxs">

				<div class="chat_box">
					<span style="line-height:1.2rem;margin-left: 0.3rem;float: left;">
					<p style="float: left;font-size: 0.4rem;font-weight: 600;">{{i.insertDate.split(' ')[0].split("-")[2]}}日</p>
					<p style="float: left;font-size: 0.25rem;margin-left: 0.1rem;font-weight: 600;">{{i.insertDate.split(' ')[0].split("-")[1]}}月</p>
				</span>
				</div>
				<div @click="dainji(i)">
					<!--
                    	作者：2443611475@qq.com
                    	时间：2018-05-15
                    	描述：图片数量大于3张时
                    -->
					<div class="img_box" style="overflow: hidden;" v-if="i.picInfo.length>=4">
						<!--大图容器-->
						<div v-for="(arr,index) in i.picInfo" style="width:2.4rem;height:2.4rem;float:left;vertical-align:middle;text-align:center;overflow:hidden;margin-left:0.07rem;margin-top:0.07rem;position: relative;">
							<img  ref="img1" @load="img1_chuli" :src="arr.picUrl" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" />
						</div>
                     
					</div>
					
					<!--三张图 -->
					<div class="img_box" v-if="i.picInfo.length == 3">
						<!--大图容器-->
						<div style="width:5rem;height:5rem;float:left;vertical-align:middle;text-align: center;overflow: hidden;position: relative;">
							<img ref="img1" @load="img1_chuli" :src="i.picInfo[0].picUrl" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" />
						</div>

						<div style="width: 2.44rem;height: 5rem;float: left;margin-left:0.04rem;">
							<!--小图容器上面-->
							<div style="width: 100%;height: 2.47rem;vertical-align:middle;text-align: center;overflow: hidden;position: relative;">
								<img ref="img1" @load="img1_chuli" :src="i.picInfo[1].picUrl" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);"/>
							</div>
							<!--小图容器下面-->
							<div style="width: 100%;height: 2.48rem;margin-top:0.04rem;overflow: hidden;position: relative;">
								<img ref="img1" @load="img1_chuli":src="i.picInfo[2].picUrl" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);"/>
							</div>
						</div>
					</div>

					<!--二张图 -->
					<div class="img_box" v-else-if="i.picInfo.length==2">

						<div style="width: 100%;height: 5rem;">
							<!--小图容器上面-->
							<div style="width:49.5%;height:100%;margin-right:0.25%;float:left;vertical-align:middle;text-align: center;overflow: hidden;position: relative;">
								<img ref="img1" @load="img1_chuli" :src="i.picInfo[0].picUrl" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" />
							</div>
							<!--小图容器下面-->
							<div style="width:49.5%;height:100%;margin-left:0.25%;float:right;vertical-align:middle;text-align: center;overflow: hidden;position: relative;">
								<img ref="img1" @load="img1_chuli" :src="i.picInfo[1].picUrl" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" />
							</div>
						</div>
					</div>

					<!--一张图 -->
					<!--<div  >-->
					<div v-else-if="i.picInfo.length==1" style="height:5rem;width:100%;vertical-align:middle;text-align:center;overflow: hidden;position:relative">
						<img :src="i.picInfo[0].picUrl" ref="img1" @load="img1_chuli" style="width:auto;position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" />
					</div>
					<!--</div>-->
					<!--文本容器-->
					<div style="width: 100%;box-sizing: border-box;padding: 0.37rem;"v-if="i.artType&&i.artType!='[]'||i.docUrl" >
						<!--文本内容-->
						<p class="dynamic_title" style="-webkit-box-orient: vertical;">{{i.artTitle}}</p>
						<span>
					<span style="padding: 0;margin: 0;display: inline;font-size: 0.28rem;color: #D0D0D0"  v-if="i.artType&&i.artType!='[]'">#{{i.artType}}  </span>
					<span class="text_span" style="-webkit-box-orient: vertical;display: inline;">
						<!--从2008第一家奢华酒店到87家豪华酒店，“酒店王国” 十载光彩卓然。本次设计采用黑金色调，融合主题和酒 店元素进行创意构思，从创意到落地历时一周。
				-->

						{{i.docUrl}}
					</span>
				</span>
					</div>
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
				
				
			    <span style="font-size: 0.4rem;float: left;margin-top: 0.04rem;color: #CACACA;margin-left: 0.5rem;width: 15%;text-align: center;" @click.stop="replyTap(i)">
				
				   <img src="../../assets/img/icon_detail_comment.png" style="height: 0.5rem;width: 0.5rem;"/>
				  <p  v-if="i.readerDiscuss=='0'"  style="font-size: 0.22rem;">评论</p>
				  <p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerDiscuss.length)==4)?parseInt(i.readerDiscuss)/1000+'k':i.readerDiscuss}}</p>
				</span>
				<span @click="zhuan_f(i)" style="font-size: 0.4rem;float: left;margin-top: 0.04rem;color: #CACACA;margin-left: 0.5rem;width: 15%;text-align: center;">
				
				<img src="../../assets/img/icon_detail_share.png" style="height: 0.5rem;width: 0.5rem;" />
				<p v-if="i.readerForward=='0'" style="font-size: 0.22rem;">转发</p>
				<p v-else style="font-size:0.22rem;text-align: center;">{{(parseInt(i.readerForward.length)==4)?parseInt(i.readerForward)/1000+'k':i.readerForward}}</p>
				</span>
						<!--<span style="font-size: 0.4rem;float: left;margin-top: 0.04rem;color: #CACACA;margin-left: 0.5rem;width: 15%;text-align: center;">
				
				<img src="../../assets/img/icon_detail_edit.png" style="height: 0.5rem;width: 0.5rem;"/>
					<p style="font-size: 0.22rem;">编辑</p>
				</span>-->
					</div>

			<span @click="shan_chus(index)" style="float: right;margin-top: 0.04rem;margin-right: 0.3rem;line-height: 1rem;">
				
				<p style="font-size: 0.28rem;color: #ff9d00;">删除闲情</p>
			</span>
				</div>
				<div style="width: 100%;height: 0.3rem;background: #F6F6F6;"></div>
			</div>
			<div class="more" @click="listenScroll" v-if="data.length>0">
				<p style="color: #D0D0D0;font-size: 0.3rem;text-align: center;">{{more_text}}</p>
			</div>
			<div class="no_article" v-if="data.length==0">
			<img src="../../assets/img/icon_noImage.png" style="width: 100%;height: 100%;" />
			<p>您还未发布任何闲情</p>
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
					<div @click="del_article" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.38rem;">
						 确定
					</div>
					<div @click="shan_s" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.38rem;">
						 取消
				  </div>
			   </div>
			</div>
		</div>-->
		<div v-show="xian_s" class="zhe"  @touchmove.prevent  @click="shan_s">
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 1.9rem;">
					<p style="font-size:0.32rem;">请确认是否删除该闲情?</p>
				</div>
				
				<div  style="width:100%;height:0.96rem;border-top:0.02rem solid #E0E0E0;line-height: 0.96rem;">
					<div @click="del_article" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.32rem;">
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
				data: [],

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
				date: '',
				index:'',
				xian_s:false,
			}
		},
		methods: {
			dainji(i) {
				//console.log(i, '闲情')
				this.$store.state.worksName = '闲情'
				this.$store.state.back_id = 7
				this.$store.state.worksId = i.artId
				//				window.location='/#/works_detail'
				this.$router.push({
					path: '../works_detail'
				});

			},
			hui() {
				//				window.location = '#/myspace'
				this.$router.push({
					path: '../myspace'
				});
			},
		   searchCall(item){//查询点赞事件、、在获取数据内部调用
				var url = this.$store.state.request_url + "/api/map/art/likeForOpId.do";
				var memId =this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/likeForOpId.do?memId="+memId+"&ts="+ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn":sign
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
			
			
			/*获取闲情*/
			getLeisure() {
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
						typeId: '2',
						page: this.page,
						rows: 3
					}
				}).then(function(response) {
						console.log(response.body)
					if(response.body.meta.res == '00000') {

						if(response.body.data.artDocumentsList.length > 0) {
							for(var i = 0; i < response.body.data.artDocumentsList.length; i++) {
								this.data.push(response.body.data.artDocumentsList[i])
								this.searchCall(response.body.data.artDocumentsList[i]);
							}
							this.more_text = "点击加载更多"

						} else if(response.body.data.artDocumentsList.length == 0) {

							this.more_text = "已经没有更多了"

						}
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			callTap(item, i) {
				//console.log(item, "点赞作品", i)
				
				var url = this.$store.state.request_url + "/api/map/art/artLike.do";
				var memId =this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artLike.do?memId="+memId+"&ts="+ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn":sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: item.opId, //作者Id
						likeType: "1", //类型
						artId: item.artId, //作品Id
						likeOpId: this.$store.state.data.memId //用户Id
					}
				}).then(function(response){
					//console.log(response.body,'点赞')
					this.callStauts = [];
					if(response.body.meta.res=="00000"){
						for(var j = 0; j < this.data.length; j++) {
						
						this.searchCall(this.data[j]);
						}
						Toast({
											message: "点赞成功",
											position: 'middle',
											duration: 2000
										});
										
						this.data[i].readerLike+=1				
						
					}else if(response.body.meta.res=="99999"){
//////////////////////////////////////////////////////////////////////////////////////////////////////
                var url = this.$store.state.request_url + "/api/map/art/cancelLike.do";
				var sign = md5(url + memId + token + ts);
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/cancelLike.do?memId="+memId+"&ts="+ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn":sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						
						artId: item.artId, //作品Id
						likeOpId: this.$store.state.data.memId //用户Id
					}
				}).then(function(response){
					//console.log(response.body,'点赞')
					this.callStauts = [];
					if(response.body.meta.res=="00000"){
						for(var j = 0; j < this.data.length; j++) {
						    this.searchCall(this.data[j]);
						}
						this.data[i].readerLike-=1				
						
					}
				}).catch(function(err) {
					//console.log(err)
				})
//////////////////////////////////////////////////////////////////////////////////////////////////////
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			
			zhuan_f(i) { //微信转发功能

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
							
							console.log(response.body.data)
							/**闲情转发内容*/
							var title ="";
						if(response.body.data.artType&&response.body.data.artType!="[]"){
							title = response.body.data.artType;
						}else{
							title = "励志";
						}
						
						/**闲情转发内容*/
						/**判断有无标题*/
						if(response.body.data.title){
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
								this.$store.state.share_new_content = "【闲情|嘚瑟】" +response.body.data.title;
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
								this.$store.state.share_title = "【闲情|其他】" +response.body.data.title;
								this.$store.state.share_new_content = "【闲情|其他】" + response.body.data.title;
								this.$store.state.share_content = "觅艺APP:一个与众不同的泛艺术(理论、美术、设计、文学、影视、表演)社交平台!"
								break;

						}
						}else{
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

							
							
							console.log(this.$store.state.share_title,"闲情转发")
							//闲情转发内容先不动
							////console.log(response.body.data.forwardUrl,"1000000000000000000000000")
							this.$store.state.share_url=response.body.data.forwardUrl
							this.$store.state.share_img=response.body.data.picUrl
							this.$store.state.tableList.share();
						}
					}).catch(function(err) {
							//console.log(err)
					})
					
					
					
					},
			
			
			
			
			
			/*评论*/
			replyTap(e) {
				
				this.$store.state.worksName = '闲情'
		  		this.$store.state.back_id = 7
		  		this.$store.state.worksId = e.artId;
		  		this.$store.state.is_tan=true;//进入详情弹出评论
		  	
//		  	 window.location = '/#/works_detail'
		  	 this.$router.push({
						path: '../works_detail'
				 });
			},
			
			
			shan_s(){
			   this.xian_s = false
			},
			shan_chus(index){
				//console.log(1111)
				
			   	this.index = index
			   	this.xian_s = true
			},
			/*删除文章*/
			del_article () {
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
						opId: this.data[this.index].opId, //作者Id
						artId: this.data[this.index].artId, //作品Id
					}
				}).then(function(response) {
					////console.log("删除");

					if(response.body.meta.res == "00000") {
						this.shan_s()
						/*提示语*/
						Toast({
							message: "删除成功",
							position: 'middle',
							duration: 2000
						});

						this.data.splice(this.index, 1); //删除闲情

					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			img1_chuli(){
				if(this.$refs.img1.length>0){
					for(var i=0;i<this.$refs.img1.length;i++){
						var img=new Image();
						img.src=this.$refs.img1[i].currentSrc;
						//console.log(img.width,img.height,"222222")
						if(img.width>img.height){
							this.$refs.img1[i].style.width="auto"
							this.$refs.img1[i].style.height="100%"
						}else{
							this.$refs.img1[i].style.width="100%"
							this.$refs.img1[i].style.height="auto"
						}
						//console.log(img.width,img.height,"22222222222222222")
					}
					
					
				}
			},
			/*加载*/
			moreTap() {
				//console.log("加载")
				this.more_text = "加载中"
				this.page += 1;
				this.getLeisure();
			},
			/*监听滚动事件，上滑加载更多*/
			listenScroll() {
				if(this.more_text === "点击加载更多") {
							//console.log(11111)
							this.moreTap();
						}
				//console.log("8888888888888888888888888")
//				var _that = this;
//				$(window).scroll(function() {
//					let scrollTop = $(window).scrollTop();
//					let windowTop = $(window).height();
//					let documentTop = $(document).height();
//					if(documentTop - windowTop <= scrollTop) {
//						//console.log(_that.more_text,"111111111111111111")
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
		mounted() {
			this.$store.state.is_bottom=false;
			this.getLeisure();
			//this.listenScroll();

		}
	}
</script>

<style scoped="scoped">
	.boxs {
		width: 100%;
		background: white;
	}
	
	.chat_box {
		width: 100%;
		height: 1.2rem;
		margin-top: 0.02rem;
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
		height: 5rem;
	}
	
	.text_span {
		font-size: 0.28rem;
		color: #999999;
		width: 100%;
		/*height: 2.9rem;*/
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
	}
	
	.boxs_to {
		width: 100%;
		height: 1.3rem;
		padding: 0.3rem 0 0.1rem 0.4rem;
		position: relative;
		margin: 0 auto 0.25rem;
		border-top: 0.005rem solid #f1f1f1;
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
	.no_article{
		width: 30%;
		margin-left: 35%;
		margin-top: 3rem;
		text-align: center;
	}
	.no_article p{
		color: #D0D0D0;
		font-size: 0.25rem;
		margin-top: 0.2rem;
	}
	.zhe{
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 300; 
		background: rgba(0,0,0,.6);
	}
		.zhe_1{
		width: 80%;
		height: 2.86rem;
		background: white;
		margin: 0 10%;
		border-radius: 0.12rem;
		margin-top: 6rem;
		text-align: center;
	}
	.dynamic_title{
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		font-size:0.36rem;color: #333333;font-weight: bold;margin-bottom: 0.2rem;
	}
</style>