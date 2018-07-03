<template>

	<div id="app" @touchstart='tiao_s' @touchmove='tiao' style="width:100%;height:9.9rem;overflow-y:auto;-webkit-overflow-scrolling : touch;" ref="box">
		
		
	 
		<div class="up_lan" id="lan" style="opacity: 1;" v-show="testData.length>0">
			<div class="tab">
				<div class="swiper-container" @load="swipers">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(i,index) in testData">
							<div class="lis" :class="{listo:i.id}" @click="selecte_item(i,index)">
								<p>{{i.dictName}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="xuan_img" @click="to_selectBlock">
				<img src="../../assets/img/icon_addtitle.png" />
			</div>
		</div>
     
      <div v-show="testData.length>0" style="width: 100%;height: 1rem;"></div>
		<!--
        	作者：2443611475@qq.com
        	时间：2018-04-10
        	描述：广场---人气榜
        -->
		<!--<div style="width: 100%;height:1.5rem;position:fixed;top:0rem;left:0;background: white;z-index: 400;">
			<div style="margin-top: 0.3rem;">
				<img @click="hui" style="width:0.4rem;float:left;margin-left:0.3rem;margin-top: 0.23rem;" src="../../assets/img/zuo.png"/>
				<p style="font-size:0.6rem;margin-left:0.2rem;float: left;">人气榜</p>
			</div>
		</div><div style="width: 100%;height: 1.5rem;"></div>-->
		<!--<div style="width:100%;height:1rem;background:white;line-height:1rem;position:fixed;top:2.09rem;z-index: 300;">
			<p style="font-size:0.42rem;float:left;margin-left:0.3rem;">
				作品类型
			</p>
			
			<span style="font-size: 0.3rem;float: right;margin-right: 0.3rem;color: #FF9A2B;">
				<p style="float: left;margin-right: 0.1rem;">全部</p>
				<i style="font-size:0.5rem;" class="fa fa-angle-down"></i>
			</span>
			 
		</div>-->
		<div style="height: auto;-webkit-overflow-scrolling : touch;overflow-x: hidden;">
			<!--<div style="width: 100%;height: 0.2rem;"></div>-->

			<div style="float:left;" v-if="no1">
				<div style="width: 3.73rem;">
					<div class="img_s" style="width:93%;overflow:hidden;margin-left:0.19rem;height:3rem;width:3.5rem;position: relative;">

						<img @load='img_chuli_1' @click="to_works1" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);min-height:100%;max-height: 150%;" id="img_box_1" :src="no1?no1.picUrl:''" />
					</div>

					<div style="width: 90%;height: 1.25rem;margin: 0 auto;position: relative;">
						<p class="bable_ts" style="font-size:0.32rem;padding-top:0.14rem;-webkit-box-orient: vertical;font-weight: 600;">{{no1?no1.artTitle:''}}</p>
						<p style="font-size: 0.26rem;color: #C0C0C0;">{{no1?no1.nickname:''}}</p>
						<p class="zhanshi">{{no1.retailPrice?('￥'+no1.retailPrice):no1.sellFlag}}</p>
						<img @click="to_no_1" v-if="no1" class="inga" :src="ba=='2'?'static/img/icon_detail_good_active.png':'static/img/icon_detail_good_normal.png'" />
						<p class="rq">{{no1?(parseInt(no1.readerLike)>1000?(parseFloat(no1.readerLike)/1000)+"k":no1.readerLike):''}}</p>

						<!-- 点击爱心按钮弹出 -->
						<div v-show="op1" style="position: absolute;left: 0.45rem;top: 1rem;z-index: 200;">
							<img class="biao" src="../../assets/img/drawable-xxxhdpi/icon_ground_box.png" />

							<img @click="likes_to3" class="xt" :src="ba=='2'?'static/img/icon_detail_good_active.png':'static/img/icon_detail_good_normal.png'" />

							<div style="left: 0.8rem;" class="xian"></div>

							<img @click="shou3" class="xt" style="left: 1rem" :src="bs=='2'?'static/img/icon_detail_collect_active.png':' static/img/icon_detail_collect_normal.png'" />

							<div style="left: 1.6rem;" class="xian"></div>
							<img class="xt" style="left: 1.9rem;" src="../../assets/img/home/icon_detail_share.png" @click="zhuan_f(no1)" />
							<div style="left: 2.5rem;" class="xian"></div>
							<img @click="no11" class="xt" style="left: 2.8rem;" src="../../assets/img/icon_detail_comment.png" />
							<div style="left: 3.4rem;" class="xian"></div>
							<img @click="dashang1" class="xt" style="left: 3.6rem;" src="../../assets/img/home/icon_detail_tip.png" />
						</div>
					</div>
				</div>
				<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
				<div v-for="(i,index) in no3" class="box_to">
					<div class="img_s" style="width: 93%;overflow: hidden;margin-left: 0.19rem;height:5rem;width: 3.5rem;position: relative;">

						<img @click="to_works2(i)" @load='img_chuli_2' style="position: absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:100%;max-height: 150%;" id="img_box_2" :src="i?i.picUrl:''" />
					</div>

					<div style="width: 90%;height: 1.25rem;margin: 0 auto;position: relative;">
						<p class="bable_ts" style="font-size:0.32rem;padding-top:0.14rem;-webkit-box-orient: vertical;font-weight: 600;">{{i?i.artTitle:''}}</p>
						<p style="font-size: 0.26rem;color: #C0C0C0;">{{i?i.nickname:''}}</p>
						<p class="zhanshi">{{i.retailPrice?('￥'+i.retailPrice):i.sellFlag}}</p>
						<!--<img @click="to_no_2(index)" class="inga" src="../../assets/img/home/icon_detail_good_normal.png"/>-->
						<div @click="to_no_2(index)">
							<img class="inga" v-if="i.likeFlag=='no'" src="../../../static/img/icon_detail_good_normal.png" />
							<img class="inga" v-else src="../../../static/img/icon_detail_good_active.png" />
						</div>

						<p class="rq">{{i?(parseInt(i.readerLike)>1000?(parseFloat(i.readerLike)/1000)+"k":i.readerLike):''}}</p>

						<!-- 点击爱心按钮弹出 -->
						<div :class="{no3_to:left_p == index,no3:(left_p == index?false:true)}" style="position: absolute;left: 0.45rem;top: 1rem;z-index: 200;">
							<img class="biao" src="../../assets/img/drawable-xxxhdpi/icon_ground_box.png" />

							<div @click="likes_to(i,index)" style="">
								<div>
									<img v-if="i.likeFlag=='no'" src="../../../static/img/icon_detail_good_normal.png" class="xt" />
									<img v-else src="../../../static/img/icon_detail_good_active.png" class="xt" />
								</div>

							</div>

							<div style="left: 0.8rem;" class="xian"></div>
							<div @click="shou_no3(i,index)">
								<div>
									<img v-if="i.collectFlag=='no'" src="../../../static/img/icon_detail_collect_normal.png" class="xt" style="left: 1rem" />
									<img v-else src="../../../static/img/icon_detail_collect_active.png" class="xt" style="left: 1rem" />
								</div>
							</div>

							<div style="left: 1.6rem;" class="xian"></div>
							<img class="xt" style="left: 1.9rem;" src="../../assets/img/icon_detail_share.png" @click="zhuan_f(i)" />
							<div style="left: 2.5rem;" class="xian"></div>
							<img @click="xian(i)" class="xt" style="left: 2.8rem;" src="../../assets/img/icon_detail_comment.png" />
							<div style="left: 3.4rem;" class="xian"></div>
							<img @click="dashang2(i)" class="xt" style="left: 3.6rem;" src="../../assets/img/home/icon_detail_tip.png" />
						</div>
					</div>
				</div>

			</div>

			<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->

			<div style="float:right;">

				<div v-for="(i,index) in no2" style="width:3.72rem;">
					<div class="img_s" id="img_s3" style="width: 93%;overflow: hidden;margin-left:0.05rem;height:5rem;width: 3.5rem;overflow: hidden;position: relative;">
						<img @click="to_works3(i)" @load='img_chuli_3' style="position: absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:100%;max-height: 150%;" id="img_box_3" :src="i?i.picUrl:''" />
					</div>
					<div style="width: 90%;height: 1.25rem;margin: 0 auto;position: relative;">
						<p class="bable_ts" style="font-size:0.32rem;padding-top: 0.14rem;-webkit-box-orient: vertical;font-weight: 600;">{{i?i.artTitle:''}}</p>
						<p style="font-size: 0.26rem;color: #C0C0C0;">{{i?i.nickname:''}}</p>
						<p class="zhanshi">{{i.retailPrice?('￥'+i.retailPrice):i.sellFlag}}</p>
						<img @click="right_ps(index)" class="inga" src="../../assets/img/home/icon_detail_good_normal.png" />

						<div @click="right_ps(index)">
							<img class="inga" v-if="i.likeFlag=='no'" src="../../../static/img/icon_detail_good_normal.png" />
							<img class="inga" v-else src="../../../static/img/icon_detail_good_active.png" />
						</div>

						<p class="rq">{{i?(parseInt(i.readerLike)>1000?(parseFloat(i.readerLike)/1000)+"k":i.readerLike):''}}</p>

						<!-- 点击爱心按钮弹出 -->
						<div :class="{no3_to:right_p == index,no3:(right_p == index?false:true)}" style="position: absolute;right: 0rem;z-index: 80;top: 1rem;">
							<img class="biao" src="../../assets/img/icon_ground_box2.png" />

							<!--<img @click="likes_to2(index)" class="xt" :src="bos2[index]=='2'?'../../../static/img/icon_detail_good_active.png':' ../../../static/img/icon_detail_good_normal.png'"/>-->
							<div @click="likes_to_ss(i,index)" style="">
								<div>
									<img v-if="i.likeFlag=='no'" src="../../../static/img/icon_detail_good_normal.png" class="xt" />
									<img v-else src="../../../static/img/icon_detail_good_active.png" class="xt" />
								</div>
							</div>
							<div style="left: 0.8rem;" class="xian"></div>

							<!--<img @click="shou2(index)" class="xt" style="left: 1rem" :src="bod2[index]=='2'?'../../../static/img/icon_detail_collect_active.png':' ../../../static/img/icon_detail_collect_normal.png'"/>-->
							<div @click="shou_no2(i,index)">
								<div>
									<img v-if="i.collectFlag=='no'" src="../../../static/img/icon_detail_collect_normal.png" class="xt" style="left: 1rem" />
									<img v-else src="../../../static/img/icon_detail_collect_active.png" class="xt" style="left: 1rem" />
								</div>
							</div>
							<div style="left: 1.6rem;" class="xian"></div>
							<img class="xt" style="left: 1.9rem;" src="../../assets/img/icon_detail_share.png" @click="zhuan_f(i)" />
							<div style="left: 2.5rem;" class="xian"></div>
							<img @click="xian(i)" class="xt" style="left: 2.8rem;" src="../../assets/img/icon_detail_comment.png" />
							<div style="left: 3.4rem;" class="xian"></div>
							<img @click="dashang3(i)" class="xt" style="left: 3.6rem;" src="../../assets/img/home/icon_detail_tip.png" />
						</div>

					</div>
				</div>
			</div>
			
			<div style="height: 0.8rem;width: 100%;float: left;"></div>	
		</div>
		
		<div class="no_article" v-if="no1==null&&no2.length==0&&no3.length==0">
				<img src="../../assets/img/icon_noPaint.png" style="width: 100%;height: 100%;" />
				<p>暂无作品</p>
			</div>
		<div class="more" v-else>
				<p style="color: #D0D0D0;">{{more_text}}</p>
			</div>
		
		<dashang v-show='$store.state.dashang'></dashang>
		<!--
        	作者：2443611475@qq.com
        	时间：2018-04-09
        	描述：评论按钮
        -->
		<!--<div v-show="inps" style="width:100%;height:13.3rem;position:fixed;top:0;background: rgba(0,0,0,.3);z-index: 300;">
			<div @click="xiao" style="width: 100%;height:12.3rem;">
			</div>
		  <div class="footer">
				<textarea  ref="vas" type="text" :placeholder='"回复@"+$store.state.input_x.disUser+"："'></textarea>
				 <div @click="pl_ac" class="send">
					<p>发送</p>
				 </div>
			</div>
		</div>-->
		<replydialog v-bind:a='reply'></replydialog>

		<!--<div style="width: 100%;height:2rem;"></div>-->
		
		<!--
        	作者：2443611475@qq.com
        	时间：2018-06-22
        	描述：游客提示框
        -->
		 <div v-show="xian_s" class="zhe"  @touchmove.prevent>
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="width:100%;height: 0.07rem;"></div>
				<p style="    font-size: 0.35rem;margin-top: 0.45rem;">你当前是“游客状态”无法操作，是否立即去登录?</p>
				<div  style="width:100%;height:1rem;margin-top: 0.56rem;border-top:0.02rem solid #E0E0E0;line-height: 1rem;">
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
	import store from '../../vuex/store.js'
	import { Toast } from 'mint-ui';
	import dashang from '../home/dashang.vue'
	import md5 from 'js-md5';
	import replydialog from '../Details_of_the_work/replydialog.vue'
	import swiper from '../../../static/js/swiper.js'
	export default {
		store,
		components: {
			dashang,
			replydialog
		},
		data() {
			return {
				top_tab:true,
				
				xian_s:false,
				
				inps: false,
				inps_act: '', //评论储存信息

				ac: [1, 1, 1],
				op1: false,
				left_p: 'x',

				right_p: 'x',
				yeshu: 1, //加载的页数

				likes: 'o',

				ba: 'r',
				bs: 'r',

				bos1: [],
				bod1: [],

				bos2: [],
				bod2: [],

				callStauts: [], //左侧储存点赞状态
				call: {
					id: '',
					stauts: ''
				},
				collectStauts: [], //左侧储存收藏状态
				collect: {
					id: '',
					stauts: ''
				},
				reply: {
					is_reply: false
				},
				page: 1,
				more_text: '加载中',

				diyix: '',
				diyiy: '',

				ye: 1,
				shu: 6,
				pageSize: '',
				testData: [],
				selected_arr: [], //临时数组，储存筛选条件，最多不超过3个
				is_tab: true, //选择栏的显隐
			}
		},
		methods: {
			shan_chu(){
				 this.$router.push({
						path: '/home'
				 }); 
			},
			
			shan_s(){
		        this.xian_s = false
  	        },
  	        
			/*获取领域*/
			getZhuanye() {
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
						"sIgn":sign

					},
					body: {
						parentId: "4f5e22db04214b85a627e8bf416a7e66",
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {

						//console.log(response.body.data,"9999999999")
						/**处理数据*/
						var array = [];
						for(var i = 0; i < 3; i++) {
							array.push(response.body.data[i]);
						}

						for(var j = 0; j < array.length; j++) {
							for(var i = 0; i < array[j].dataDictionary.length; i++) {
								array[j].dataDictionary[i].id = false
							}
						}

						/**生成数据*/
						var new_array = [];
						var all = {};
						all.id = true;
						all.dictName = "全部";
						new_array.push(all);

						for(var j = 0; j < array.length; j++) {
							for(var i = 0; i < array[j].dataDictionary.length; i++) {
								new_array.push(array[j].dataDictionary[i])
							}
						}
						//console.log(this.$store.state.if_item, "000000000000")
						if(this.$store.state.if_item.length > 0) {
							if(this.$store.state.if_item[0] == "全部") {
								new_array[0].id = true;
							} else {
								new_array[0].id = false;
								for(var i = 0; i < this.$store.state.if_item.length; i++) {
									for(var j = 0; j < new_array.length; j++) {
										if(this.$store.state.if_item[i] == new_array[j].dictName) {
											new_array[j].id = true
											//this.selected_arr.push(new_array[j].dictName);
										}
									}
								}
							}
						}

						this.testData = new_array;
						//console.log(this.data_yuan,"新数据")
						//this.eye=this.title[0].dataDictionary;
						setTimeout(()=>{
							this.swipers();
						},50)
						
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			
			Get_content_s(){//获取页面数据
//				var _this = this;
				
				this.$http({
					url: this.$store.state.request_url + "/api/mapFreeVerification/touristsPopularityList.do",
					headers: {
						"content-type": "application/json;charset=UTF-8",
						
					},
					emulateJSON: false,
					method: 'post',
					body: {
						artType: this.selected_arr,
						rows: this.shu,
						page: this.ye,
						opId: this.$store.state.data.memId
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000'){
						
						//console.log('游客状态数据',response.body.data)
						
						this.pageSize = response.body.data.pageSize;
						for(var i = 0; i < response.body.data.poplarity.length; i++) {
							this.$store.state.rq_box.push(response.body.data.poplarity[i])
						}
						var a = this.$store.state.rq_box
						var res = [];
						var json = {};
						for(var i = 0; i < a.length; i++) { //数组去重
							if(!json[a[i].artId]) {
								res.push(a[i]);
								json[a[i].artId] = 1;
							}
						}
						this.$store.state.rq_box = res
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			Get_content(){//获取页面数据
				var _this = this;
				var url = this.$store.state.request_url + "/api/mapPlazaManager/popularityList.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/popularityList.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						artType: this.selected_arr,
						rows: this.shu,
						page: this.ye,
						opId: this.$store.state.data.memId
					}
				}).then(function(response) {

					if(response.body.meta.res == '00000') {
						this.pageSize = response.body.data.pageSize;

						for(var i = 0; i < response.body.data.poplarity.length; i++) {
							this.$store.state.rq_box.push(response.body.data.poplarity[i])
						}
						//console.log(response.body.data,'长度')

						var a = this.$store.state.rq_box
						var res = [];
						var json = {};
						for(var i = 0; i < a.length; i++) { //数组去重
							if(!json[a[i].artId]) {
								res.push(a[i]);
								json[a[i].artId] = 1;
							}
						}
						this.$store.state.rq_box = res

						if(this.$store.state.rq_box.length > 0) {
							//                  if(this.ye=1){  
							var url1 = this.$store.state.request_url + "/api/map/art/likeForOpId.do";
							var sign1 = md5(url1 + id + token + ts)
							this.$http({
								url: this.$store.state.request_url + "/api/map/art/likeForOpId.do?memId=" + id + "&ts=" + ts,
								method: 'post',
								headers: {
									"content-type": "application/json;charset=UTF-8",
									"sIgn": sign1
								},
								body: {
									opId: this.$store.state.data.memId,
									attentionOpId: this.$store.state.rq_box[0].opId,
									artId: this.$store.state.rq_box[0].artId
								},
								emulateJSON: false,
							}).then(function(response) {
								if(response.body.meta.msg == "NO") {
									this.ba = '1'
								} else if(response.body.meta.msg == "YES") {
									this.ba = '2'
								}
							}).catch(function(err) {
								console.log(err)
							})
							//收藏查询	

							var url2 = this.$store.state.request_url + "/api/map/art/collectForOpId.do";

							var sign2 = md5(url2 + id + token + ts)
							this.$http({
								url: this.$store.state.request_url + "/api/map/art/collectForOpId.do?memId=" + id + "&ts=" + ts,
								method: 'post',
								headers: {
									"content-type": "application/json;charset=UTF-8",
									"sIgn": sign2
								},
								body: {
									opId: this.$store.state.data.memId,
									attentionOpId: this.$store.state.rq_box[0].opId,
									artId: this.$store.state.rq_box[0].artId
								},
								emulateJSON: false,
							}).then(function(response) {
								if(response.body.meta.msg == "NO") {
									this.bs = '1'
								} else if(response.body.meta.msg == "YES") {
									this.bs = '2'
								}
							}).catch(function(err) {
								console.log(err)
							})
						}
						//						console.log(this.$store.state.rq_box, '页面数据')
						//                   }
						//this.more_text="已经加载完成！"
					}
				}).catch(function(err) {
					console.log(err)
				})
				///////////////////作品 ，点赞、收藏， 查询///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

			},

			tiao_s() {
				let ev = ev || event
				this.diyix = ev.touches[0].clientX;
				this.diyiy = ev.touches[0].clientY;
			},
			tiao(event) {
				let ev = ev || event
				let dierx = ev.touches[0].clientX;
				let diery = ev.touches[0].clientY;
				var cdx = dierx - this.diyix
				var cdy = diery - this.diyiy
				let box_to = document.getElementsByClassName('box_to')
				if(Math.abs(cdx) < Math.abs(cdy) && cdy < 0) {

					
					//console.log(box_to[box_to.length - 1],"1111111111111111")
					if(box_to[box_to.length - 1]){
						$("#lan").css("opacity", "0");
					if(box_to[box_to.length - 1].getBoundingClientRect().bottom / 100 + 'rem' <= 16 + "rem") {
						if(this.pageSize > this.$store.state.rq_box.length) {

							// console.log(this.ye)
							this.more_text="加载中"
							this.shu = 4;
							this.ye += 1;
							if(localStorage.yous=='true'){
								this.Get_content_s()
							}else{
								this.Get_content();
							}
							
							
						}else{
							this.more_text="已经没有更多了！"
						}

					}
					}else{
						this.more_text="已经没有更多了！"
					}
				} else {
					$("#lan").css("opacity", "1");
				}
			},

			img_chuli_1() {
				var img = new Image();
				if($("#img_box_1")[0]) {
					img.src = $("#img_box_1")[0].currentSrc;

					/*对比原始比例*/
					if((img.width / img.height) < (350 / 300)) {
						$("#img_box_1").css("width", "3.5rem");
						$("#img_box_1").css("height", "auto");
					} else if((img.width / img.height) > (350 / 300)) {

						$("#img_box_1").css("width", "auto");
						$("#img_box_1").css("height", "3rem");
					} else {
						$("#img_box_1").css("width", "3.5rem");
						$("#img_box_1").css("height", "3rem");
					}
				}
			},
			img_chuli_2() {
				var img = new Image();
				if($("#img_box_2")[0]) {
					img.src = $("#img_box_2")[0].currentSrc;
					/*对比原始比例*/
					if((img.width / img.height) < (350 / 500)) {

						$("#img_box_2").css("width", "3.5rem");
						$("#img_box_2").css("height", "auto");
					} else if((img.width / img.height) > (350 / 500)) {
						$("#img_box_2").css("width", "auto");
						$("#img_box_2").css("height", "5rem");
					} else {
						$("#img_box_2").css("width", "3.73rem");
						$("#img_box_2").css("height", "5rem");
					}

					let box = document.getElementsByClassName('img_s')[1] //视口
					let imgs = document.getElementById('img_box_2') //图片

					let img_bottom_top = imgs.getBoundingClientRect().bottom //图片底部距离可视区域顶部的距离
					let box_top_bottom = box.getBoundingClientRect().top //视口距离可视区域顶部的距离

					box.style.height = img_bottom_top - box_top_bottom + 'px'
				}
			},
			img_chuli_3() {
				var img = new Image();
				if($("#img_box_3")[0]) {
					img.src = $("#img_box_3")[0].currentSrc;

				 		//console.log($("#img_box_3")[0].currentSrc,"......................")
					/*对比原始比例*/
					if((img.width / img.height) < (350 / 500)) {
						$("#img_box_3").css("width", "3.5rem");
						$("#img_box_3").css("height", "auto");
						//
						//   			console.log(1,'yy')
					} else if((img.width / img.height) > (350 / 500)) {
						$("#img_box_3").css("width", "auto");
						$("#img_box_3").css("height", "5rem");
						//   			console.log(2,'yy')
					} else {
						$("#img_box_3").css("width", "3.5rem");
						$("#img_box_3").css("height", "5rem");
						//   			console.log(3,'yy')
					}

					let box = document.getElementsByClassName('img_s')[2] //视口
					let imgs = document.getElementById('img_box_3') //图片

					let img_bottom_top = imgs.getBoundingClientRect().bottom //图片底部距离可视区域顶部的距离
					let box_top_bottom = box.getBoundingClientRect().top //视口距离可视区域顶部的距离

					box.style.height = img_bottom_top - box_top_bottom + 'px'
				}
				//   		let img_box_3 = document.getElementsByClassName('img_s')[2]//图片
				//   		let img_box_3_whs = img_box_3.offsetHeight*img_box_3.offsetWidth//图片面积

				//   		let shi_k = document.getElementById('img_s3')//视口
				//   		let shi_k_whs = shi_k.offsetHeight*shi_k.offsetWidth//视口面积

				//   		console.log(img_box_3.offsetWidth,img_box_3.offsetHeight,'图片的宽高8888888888888888888888888888')

				//   		console.log((img_box_3.offsetWidth-shi_k.offsetWidth)/2,'9999999999999999999')

				//   		if(shi_k_whs<img_box_3_whs){
				//   			if(img_box_3.offsetWidth>img_box_3.offsetHeight){
				//   				img_box_3.style.height = shi_k.offsetHeight+'px';
				//                  let a = (img_box_3.offsetWidth-shi_k.offsetWidth)
				//                  img_box_3.style.float = 'left'
				//   				img_box_3.style.marginLeft = '200px'
				//   			}
				//   		}

				//   	    img_s1.style.height = img_box_3_height/100+'rem'

			},

			likes_to(index, i) { //左侧点赞事件
				var url = this.$store.state.request_url + "/api/map/art/artLike.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artLike.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {
						artId: index.artId,
						likeType: "1",
						opId: index.opId,
						likeOpId: this.$store.state.data.memId //当前用户Id
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						this.no3[i].likeFlag = 'yes'
						this.no3[i].readerLike += 1
						Toast({
							message: '点赞成功',
							position: 'middle',
							duration: 2000
						});
						this.to_no_2()

					} else {
						/////////////////////////////取消点赞//////////////////////////////////////////////// \
						var url = this.$store.state.request_url + "/api/map/art/cancelLike.do";
						var sign = md5(url + id + token + ts)
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/cancelLike.do?memId=" + id + "&ts=" + ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							body: {
								artId: index.artId,

								likeOpId: this.$store.state.data.memId //当前用户Id
							},
							emulateJSON: false,
						}).then(function(response) {
							if(response.body.meta.res == "00000") {
								this.no3[i].likeFlag = 'no'
								this.no3[i].readerLike -= 1
							}
						}).catch(function(err) {
							console.log(err)
						})
						//////////////////////////////////////////////////////////////////////////////						
					}
				}).catch(function(err) {
					console.log(err)
				})
			},

			likes_to_ss(index, i) { //左侧点赞事件
				var url = this.$store.state.request_url + "/api/map/art/artLike.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artLike.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {
						artId: index.artId,
						likeType: "1",
						opId: index.opId,
						likeOpId: this.$store.state.data.memId //当前用户Id
					},
					emulateJSON: false,
				}).then(function(response) {
					//					console.log(response.body)
					if(response.body.meta.res == "00000") {
						this.no2[i].likeFlag = 'yes'
						this.no2[i].readerLike += 1
						Toast({
							message: '点赞成功',
							position: 'middle',
							duration: 2000
						});
						this.to_no_2()

					} else {
						/////////////////////////////取消点赞//////////////////////////////////////////////// \
						var url = this.$store.state.request_url + "/api/map/art/cancelLike.do";
						var sign = md5(url + id + token + ts)
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/cancelLike.do?memId=" + id + "&ts=" + ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							body: {
								artId: index.artId,

								likeOpId: this.$store.state.data.memId //当前用户Id
							},
							emulateJSON: false,
						}).then(function(response) {
							//					console.log(response.body)
							if(response.body.meta.res == "00000") {
								//						this.box_to[i].readerLike-=1
								//						this.zou()
								Toast({
									message: '取消成功',
									position: 'middle',
									duration: 2000
								});
								this.no2[i].likeFlag = 'no'
								this.no2[i].readerLike -= 1
							}
						}).catch(function(err) {
							console.log(err)
						})
						//////////////////////////////////////////////////////////////////////////////						
					}
				}).catch(function(err) {
					console.log(err)
				})
			},

			dashang1() {
				this.$store.state.dashang = true
				this.to_no_1()
				this.$store.state.is_comment_dashang = false; //恢复打赏作品
				this.$store.state.Return_to_return = 4
				this.$store.state.A_reward = this.no1
				this.$store.state.A_reward.artFlag = '1'
				//				console.log(this.$store.state.A_reward, '打赏信息——————===----')

			},
			dashang2(i) {
				this.to_no_2()
				this.$store.state.dashang = true
				this.$store.state.Return_to_return = 4
				this.$store.state.A_reward = i
				this.$store.state.is_comment_dashang = false; //恢复打赏作品
				this.$store.state.A_reward.artFlag = '1'
				//				console.log(this.$store.state.A_reward, '打赏信息——————===----')

			},
			dashang3(i) {

				this.right_ps()
				this.$store.state.dashang = true
				this.$store.state.Return_to_return = 4
				this.$store.state.A_reward = i
				this.$store.state.is_comment_dashang = false; //恢复打赏作品
				this.$store.state.A_reward.artFlag = '1'
				//				console.log(this.$store.state.A_reward, '打赏信息——————===----')

			},

			to_works1() { //进入作品详情1
				
				 if(localStorage.yous=='true'){
               	  this.xian_s = true
               }else{
               	this.$store.state.back_id = 4
				this.$store.state.Author_s_detailed_routing = 2
				this.$store.state.worksId = this.no1.artId
					this.$store.state.worksName="作品"
				this.$router.push({
					path: '../works_detail'
				});
				this.$store.state.tr = 0
               }
				
			},
			to_works2(i) { //进入作品详情2
				 if(localStorage.yous=='true'){
               	  this.xian_s = true
               }else{
               	this.$store.state.Author_s_detailed_routing = 2
				this.$store.state.back_id = 4
				this.$store.state.worksId = i.artId
				this.$store.state.worksName="作品"
				this.$router.push({
					path: '../works_detail'
				});
				this.$store.state.tr = 0
               }
				
			},
			to_works3(i) { //进入作品详情3
				 if(localStorage.yous=='true'){
               	  this.xian_s = true
               }else{
               	this.$store.state.Author_s_detailed_routing = 2
				this.$store.state.back_id = 4
				this.$store.state.worksId = i.artId
				this.$store.state.worksName="作品"
				this.$router.push({
					path: '../works_detail'
				});
				this.$store.state.tr = 0
               }
				
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
						forwardType: "1",
						artId: i.artId
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {
						
						//console.log(response.body,"转发")
						var ti = '';
						if(response.body.data.title.length > 10) {
							ti = response.body.data.title.substring(0, 10) + "..."
						} else {
							ti = response.body.data.title
						}

						this.$store.state.share_url = response.body.data.forwardUrl

						/*好友*/
						this.$store.state.share_title = "【人气榜|"+response.body.data.artType+"】 " + i.nickname + "《" + ti + "》";

						this.$store.state.share_content = "突围艺术圈,人气超58%的用户!觅艺APP:一个与众不同交流的泛艺术社交平台!"

						/**朋友圈*/
						this.$store.state.share_new_title = response.body.data.title;

						this.$store.state.share_new_content = "【人气榜|"+response.body.data.artType+"】 " + i.nickname + "《" + ti + "》";

						this.$store.state.share_img = response.body.data.picUrl
						console.log(this.$store.state.share_new_content, "-", this.$store.state.share_title)
						this.$store.state.tableList.share();

					}
				}).catch(function(err) {
					console.log(err)
				})

			},
			no11() { //第一名-点击评论事件
				this.to_no_2()
				//				this.inps = true
				//				this.inps_act = this.no1
				//				this.$store.state.input_x.disUser = this.no1.nickname
				this.$store.state.commentWorksdata = this.no1;

				//				console.log(this.$store.state.commentWorksdata,'小小小消息')

				this.reply.is_reply = true
			},

			xian(i) { //点击评论--弹出输入框
				this.to_no_2()

				this.$store.state.commentWorksdata = i;

				this.reply.is_reply = true

			},

			xiao() {
				this.inps = false
			},

			shou_no3(index, i) { //左侧收藏事件

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
						opId: this.$store.state.data.memId, //当前用户Id
						collectOpId: index.opId, //被收藏的Id
						collectType: "1", //类型
						artId: index.artId, //作品ID
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						this.no3[i].collectFlag = 'yes';
						this.to_no_2()
						Toast({
							message: '收藏成功',
							position: 'middle',
							duration: 2000
						});

					} else {
						//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
						var url = this.$store.state.request_url + "/api/map/art/uncollect.do";
						var sign = md5(url + id + token + ts)
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/uncollect.do?memId=" + id + "&ts=" + ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							body: {
								opId: this.$store.state.data.memId, //当前用户Id
								artId: index.artId, //作品ID
							},
							emulateJSON: false,
						}).then(function(response) {
							if(response.body.meta.res == "00000") {
								
								Toast({
									message: '取消成功',
									position: 'middle',
									duration: 2000
								});
								this.no3[i].collectFlag = 'no'
								
							}
						}).catch(function(err) {
							console.log(err)
						})
						//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			shou_no2(index, i) {

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
						opId: this.$store.state.data.memId, //当前用户Id
						collectOpId: index.opId, //被收藏的Id
						collectType: "1", //类型
						artId: index.artId, //作品ID
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						this.no2[i].collectFlag = 'yes';
						this.to_no_2()
						Toast({
							message: '收藏成功',
							position: 'middle',
							duration: 2000
						});

					} else {
						//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
						var url = this.$store.state.request_url + "/api/map/art/uncollect.do";
						var sign = md5(url + id + token + ts)
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/uncollect.do?memId=" + id + "&ts=" + ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							body: {
								opId: this.$store.state.data.memId, //当前用户Id

								artId: index.artId, //作品ID
							},
							emulateJSON: false,
						}).then(function(response) {
							if(response.body.meta.res == "00000") {
								
								Toast({
									message: '取消成功',
									position: 'middle',
									duration: 2000
								});
								this.no2[i].collectFlag = 'no'
							}
						}).catch(function(err) {
							console.log(err)
						})
						//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
					}
				}).catch(function(err) {
					console.log(err)
				})
			},

			pl_ac() { //评论事件
				var disUser = '';
				var disUserPic = '';
				var identification = '';
				var vas = this.$refs.vas.value;

				var url = this.$store.state.request_url + "/api/map/user/artUserInfo.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				if(vas != '') {
					this.$http({
						url: this.$store.state.request_url + "/api/map/user/artUserInfo.do?memId=" + id + "&ts=" + ts,
						method: 'post',
						headers: {
							"content-type": "application/json;charset=UTF-8",
							"sIgn": sign
						},
						body: {
							opId: this.$store.state.data.memId,
						},
						emulateJSON: false,
					}).then(function(response) {
						if(response.body.meta.res == "00000") {
							//							console.log(response.body)
							disUser = response.body.data.nickname
							disUserPic = response.body.data.opPic
							identification = response.body.data.idCard

							if(disUser !== '' && disUserPic !== '') {
								//								
								var url = this.$store.state.request_url + "/api/map/art/artDis.do";
								var id = this.$store.state.data.memId;
								var token = this.$store.state.data.tokEn;
								var ts = new Date().getTime();
								var sign = md5(url + id + token + ts)

								this.$http({
									url: this.$store.state.request_url + "/api/map/art/artDis.do?memId=" + id + "&ts=" + ts,
									method: 'post',
									headers: {
										"content-type": "application/json;charset=UTF-8",
										"sIgn": sign
									},
									body: {
										disId: null, //唯一ID父评论填写null 子评理则填写父评论ID
										opId: this.$store.state.data.memId, //评论会员ID
										disOpId: this.inps_act.opId, //被评论会员ID  inps_act 为临时存储该作品所有的信息
										artId: this.inps_act.artId, //作品ID
										disContent: vas, //评论内容
										disUser: disUser, //评论人
										disUserPic: disUserPic, //评论人头像Url
										identification: (response.body.data.certified == null) ? '咸鱼' : response.body.data.certified //评论会员的身份标识
									},
									emulateJSON: false,
								}).then(function(response) {
									//									console.log(response.body, "二级回复状态");
									if(response.body.meta.res == "00000") {
										Toast({
											message: '评论成功',
											position: 'middle',
											duration: 2000
										});
										this.$refs.vas.value = ''
										this.xiao()
									}
								}).catch(function(err) {
									console.log(err)
								})
							}
						}
					}).catch(function(err) {
						console.log(err)
					})
				} else {
					Toast({
						message: '评论内容不能为空',
						position: 'middle',
						duration: 2000
					});
				}
			},
			likes_to2(index) { //右侧点赞事件
				var url = this.$store.state.request_url + "/api/map/art/artLike.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artLike.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {
						artId: this.no2[index].artId,
						likeType: "1",
						opId: this.no2[index].opId,
						likeOpId: this.$store.state.data.memId //当前用户Id
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						this.bos2[index] = '2'

						Toast({
							message: '点赞成功',
							position: 'middle',
							duration: 2000
						});
						this.right_ps()

					} else {
						Toast({
							message: response.body.meta.msg,
							position: 'middle',
							duration: 2000
						});
						this.right_ps()
					}
				}).catch(function(err) {
					console.log(err)
				})
			},

			shou2(index) { //右侧收藏事件
				//				console.log(this.no2[index], '第二名')
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

						opId: this.$store.state.data.memId, //当前用户Id
						collectOpId: this.no2[index].opId, //被收藏的Id
						artId: this.no2[index].artId, //作品ID
						collectType: "1", //类型

					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						//							   
						this.bod2[index] = '2'

						Toast({
							message: '收藏成功',
							position: 'middle',
							duration: 2000
						});
						this.right_ps()

					} else {

						Toast({
							message: '你已经收藏该作品了',
							position: 'middle',
							duration: 2000
						});
						this.right_ps()
					}
				}).catch(function(err) {
					console.log(err)
				})
			},

			likes_to3() { //第一点赞事件
				//				
				var url = this.$store.state.request_url + "/api/map/art/artLike.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/map/art/artLike.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {
						artId: this.$store.state.rq_box[0].artId,
						likeType: "1",
						opId: this.$store.state.rq_box[0].opId,
						likeOpId: this.$store.state.data.memId, //当前用户Id
					},
					emulateJSON: false,
				}).then(function(response) {
					//					
					if(response.body.meta.res == "00000") {
						this.ba = "2"
						Toast({
							message: '点赞成功',
							position: 'middle',
							duration: 2000
						});
						this.$store.state.rq_box[0].readerLike += 1

						this.to_no_1()
					} else {
						//////////////////////////////取消点赞/////////////////////////////////////////////////////////////////							
						var url_s = this.$store.state.request_url + "/api/map/art/cancelLike.do";
						var sign = md5(url_s + id + token + ts)
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/cancelLike.do?memId=" + id + "&ts=" + ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							body: {
								artId: this.$store.state.rq_box[0].artId,
								likeOpId: this.$store.state.data.memId, //当前用户Id
							},
							emulateJSON: false,
						}).then(function(response) {
							//					
							if(response.body.meta.res == "00000") {
								Toast({
									message: '取消成功',
									position: 'middle',
									duration: 2000
								});
								this.ba = "1"
								this.$store.state.rq_box[0].readerLike -= 1
							}
						}).catch(function(err) {
							console.log(err)
						})

						///////////////////////////////////////////////////////////////////////////////////////////////						
					}
				}).catch(function(err) {
					console.log(err)
				})
			},

			shou3() { //第一收藏事件
				//				
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
						opId: this.$store.state.data.memId, //当前用户Id
						collectOpId: this.$store.state.rq_box[0].opId, //被收藏的Id
						artId: this.$store.state.rq_box[0].artId, //作品ID
						collectType: "1", //类型
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						this.bs = "2";
						Toast({
							message: '收藏成功',
							position: 'middle',
							duration: 2000
						});
						this.to_no_1()
					} else {
						//////////////////////////////////////////////////////////////////////////////////////////////////////////		
						var url = this.$store.state.request_url + "/api/map/art/uncollect.do";
						var sign = md5(url + id + token + ts)
						this.$http({
							url: this.$store.state.request_url + "/api/map/art/uncollect.do?memId=" + id + "&ts=" + ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							body: {
								opId: this.$store.state.data.memId, //当前用户Id
								artId: this.$store.state.rq_box[0].artId, //作品ID
							},

							emulateJSON: false,
						}).then(function(response) {
							if(response.body.meta.res == "00000") {
								Toast({
									message: '取消成功',
									position: 'middle',
									duration: 2000
								});
								this.bs = "1";
							}
						}).catch(function(err) {
							console.log(err)
						})
						////////////////////////////////////////////////////////////////////////////////////////////
					}
				}).catch(function(err) {
					console.log(err)
				})
			},

			to_no_1() { //第一名点击爱心弹出-- 框
               if(localStorage.yous=='true'){
               	  this.xian_s = true
               }else{
               	if(this.op1) {
					this.op1 = false
				} else {
					this.op1 = true
				}
				this.left_p = 'x'
				this.right_p = 'p'
               }
                
				
			},
			to_no_2(index) { //第3名点击爱心弹出-- 框
                 if(localStorage.yous=='true'){
               	  this.xian_s = true
               }else{
               	this.right_p = 'p'
				this.op1 = false
				if(this.left_p == index) {
					this.left_p = 'p'
				} else {
					this.left_p = index
					//this.zou()
				}
               }
				
			},
			right_ps(index) {
				//		  		this.zou()
               if(localStorage.yous=='true'){
               	  this.xian_s = true
               }else{
               	this.left_p = 'p'
				this.op1 = false
				if(this.right_p == index) {
					this.right_p = 'p'
				} else {
					this.right_p = index
					//					this.you()
				}
               }
				
			},
			/**顶部条件栏*/
			swipers() {
				new swiper('.swiper-container', {
					slidesPerView: 4.5,
					centeredSlides: 0,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper 
					observeParents: true, //修改swiper的父元素时，自动初始化swiper 
				})
			},
			/**条件选择事件*/
			selecte_item(item, index) {
				console.log(index)
				var is_shua=true;//是否刷新
				if(item.dictName == "全部") {
					if(item.id) {
						if(this.selected_arr.indexOf(item.dictName) == -1) {
							this.selected_arr.push(item.dictName);
						}
					} else {
						this.selected_arr = [];
						this.selected_arr.push(item.dictName);
						this.testData[index].id = true;
						for(var i = 1; i < this.testData.length; i++) {
							this.testData[i].id = false;
						}
					}

				} else {
					if(this.testData[0].id) {
						
							if(this.selected_arr.indexOf(this.testData[0].dictName) > -1) {
								this.selected_arr = [];
							}
							this.testData[0].id = false;
							this.testData[index].id = !this.testData[index].id;
							this.selected_arr.push(item.dictName);
						
					} else {

						if(this.testData[index].id == false) {
//							if(this.selected_arr.length == 3) {
//								Toast({
//									message: '最多只能选择3个',
//									position: 'middle',
//									duration: 2000
//								});
//								is_shua=false;
//							} else {

								this.selected_arr.push(item.dictName);
								this.testData[index].id = !this.testData[index].id;
						//	}
						} else {
							for(var i = 0; i < this.selected_arr.length; i++) {
								console.log(this.selected_arr[i] == item.dictName,"判断")
								if(this.selected_arr[i] == item.dictName) {
									this.selected_arr.splice(i, 1);
									if(this.selected_arr.length == 0) {
										this.testData[0].id = true;
										this.selected_arr.push(this.testData[0].dictName);
									}
								}
							}
							this.testData[index].id = !this.testData[index].id;
						}

					}
				}
				this.$store.state.if_item = this.selected_arr;
				//console.log(this.selected_arr, "选择")
				if(is_shua){
					this.ye = 1;
					this.shu = 6;
					this.$store.state.rq_box = [];
					        if(localStorage.yous=='true'){
								this.Get_content_s()
							}else{
								this.Get_content();
							}
				}
				
			},
			/**跳转选择版块页*/
			to_selectBlock() {

				this.$store.state.if_item = this.selected_arr;
				this.$router.push({
					path: '../select_block'
				});
			},
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		  

		},

		mounted() {

			//			console.log(this.$store.state.if_item,"1111111111111111111111人气榜")
			if(this.$store.state.if_item.length == 0) {
				this.selected_arr.push("全部")
			} else {
				//console.log(this.$store.state.if_item, "999999999999999999999999")
				//this.selected_arr.push("全部")

				for(var i = this.$store.state.if_item.length - 1; i >= 0; i--) {
					this.selected_arr.push(this.$store.state.if_item[i])
				}
				//console.log(this.selected_arr, "999999999999999999999999")
				//this.selected_arr=this.$store.state.if_item
			}
			this.$store.state.rq_box = []

			this.$store.state.is_bottom = true;
			//			console.log(this.$store.state.rq_box, '该页面数据')\
			this.ye = 1;
			this.shu = 6;

			if(localStorage.yous=='true'){
								this.Get_content_s()
								this.top_tab = false
								
							}else{
								this.Get_content();
							}
			

		},
		created() {

			this.getZhuanye();
			
		},
		computed: {
			no1() {
				return this.$store.state.rq_box[0]
			},
			no2() { //右侧查询
				let a = []
				for(var i = 0; i < this.$store.state.rq_box.length; i++) {
					if(i % 2 !== 0) {
						a.push(this.$store.state.rq_box[i])
					}
				}
				return a
			},
			//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，			

			no3() { //左侧查询
				let a = []
				for(var i = 1; i < this.$store.state.rq_box.length; i++) {
					if(i % 2 == 0) {
						a.push(this.$store.state.rq_box[i])
					}
				}
				return a
			}
		}
	}
</script>

<style scoped="scoped">
	@import url("../../assets/css/swiper.css");
	.bable_ts {
		width: 2.4rem;
		height: 0.7rem;
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}
	
	.inga {
		width: 0.36rem;
		height: 0.36rem;
		position: absolute;
		right: 0.4rem;
		top: 0.7rem;
	}
	
	.box_to {
		width: 3.72rem;
	}
	
	.rq {
		/*background: red;*/
		width: 0.72rem;
		text-align: left;
		font-size: 0.24rem;
		color: #A2A2A2;
		position: absolute;
		right: -0.4rem;
		top: 0.7rem;
	}
	.zhanshi{
		
		text-align: left;
		font-size: 0.26rem;
		color: #FF9D00;
		position: absolute;
		right: 0;
		top: 0.2rem;
	}
	.biao {
		width: 4.3rem;
	}
	
	.xt {
		width: 0.38rem;
		height: 0.35rem;
		position: absolute;
		top: 0.35rem;
		left: 0.2rem;
	}
	
	.xian {
		height: 0.35rem;
		border-left: 0.03rem solid white;
		position: absolute;
		top: 0.33rem;
	}
	
	.no3 {
		display: none;
	}
	
	.no3_to {
		display: block;
	}
	
	.footer {
		height: 1rem;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 300;
		-moz-box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
		/* 老的 Firefox */
		box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
		background: white;
	}
	
	.footer textarea {
		outline: none;
		float: left;
		border: 0;
		width: 70%;
		font-size: 0.35rem;
		margin-top: 0.1rem;
		height: 0.8rem;
		margin-left: 3%;
		color: rgba(180, 180, 180, 1);
		border: #D8D8D8 solid 1px;
		line-height: 0.8rem;
		padding-left: 0.2rem;
		opacity: 0.01rem;
		border-radius: 0.15rem;
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
		text-align: center;
		font-size: 0.3rem;
	}
	
	.img_s {
		/*display: table-cell;*/
		vertical-align: middle;
		text-align: center;
		overflow: hidden;
	}
	
	.more {
		padding-top: 0.6rem;
		width: 100%;
		height: 1rem;
		font-size: 0.3rem;
		text-align: center;
		background-color: #fff;
	}
	
	.item_class {
		float: left;
		padding: 0.1rem 0.3rem;
		background-color: #ffffff;
		font-size: 0.23rem;
		margin-top: 0.3rem;
		margin-left: 0.2rem;
		border: #D0D0D0 solid 1px;
		border-radius: 0.1rem;
	}
	/*tab菜单*/
	
	.tab {
		width: 86%;
		height: 100%;
		float: left;
		margin-left: 3%;
		background: #fff;
		border-bottom: rgba(247, 247, 247, 1) solid 1px;
	}
	
	.lis {
		float: left;
		font-size: 0.26rem;
		color: #333333;
		text-align: center;
		width: 1.3rem;
		line-height: 0.5rem;
		background-color: #F5F4F7;
		margin-top: 0.2rem;
		border-radius: 0.05rem;
	}
	
	.listo {
		float: left;
		font-size: 0.26rem;
		color: #fff;
		width: 1.3rem;
		text-align: center;
		line-height: 0.5rem;
		background-color: #FF9A2B;
		margin-top: 0.2rem;
		border-radius: 0.05rem;
	}
	
	.up_lan {
		width: 100%;
		height: 0.9rem;
		position: fixed;
		top: 1.9rem;
		z-index: 300;
		background-color: #fff;
		-moz-box-shadow: 0px 3px 11px rgba(233, 233, 233, 0.59);
		;
		-webkit-box-shadow: 0px 3px 11px rgba(233, 233, 233, 0.59);
		;
		box-shadow: 0px 3px 11px rgba(233, 233, 233, 0.9);
		;
	}
	
	.xuan_img {
		width: 11%;
		height: 100%;
		float: right;
	}
	
	.xuan_img img {
		float: right;
		height: 0.5rem;
		margin-top: 0.2rem;
		/*-moz-box-shadow: -5px 0px 0px #E6E6E6;
		-webkit-box-shadow: -5px 0px 0px #E6E6E6;
		box-shadow: -5px 0px 0px #E6E6E6;*/
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
	
	.more {
		padding-top: 0.3rem;
		
		width: 100%;
		height: 1rem;
		text-align: center;
		padding-bottom: 0.5rem;
		background-color: #fff;
	}
	
	.zhe{
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 9994; 
		background: rgba(0,0,0,.6);
	}
	.zhe_1{
		width: 5rem;
		height: 3.2rem;
		background: white;
		margin: 0 auto;
		border-radius: 0.2rem;
		margin-top: 6rem;
		text-align: center;
	}
</style>