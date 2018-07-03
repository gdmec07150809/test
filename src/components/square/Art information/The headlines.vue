<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-04-02
    	描述：艺术咨询-头条
    -->
	<div @touchstart='tiao_s' @touchmove='tiao' style="width:100%;">

		<div class="up_lan" id="lan" style="opacity: 1;" v-show="testData.length>0">
			<div class="tab">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(i,index) in testData">
							<div class="lis" :class="{listo:i.id}" @click="selecte_item(i,index)">
								<p>{{i.dictName}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="xuan_img" @click="to_select_article">
				<img src="../../../assets/img/icon_addtitle.png" />
			</div>
		</div>
		<div v-show="testData.length>0" style="height: 0.9rem;width: 100%;"></div>
		
		
		<div class="box_ss" v-for="(arr,indexs) in actives" style="width: 100%;margin-top: 0.05rem;">
			<div style="width: 93%;margin: 0 auto;">
				<!--
            	作者：2443611475@qq.com
            	时间：2018-04-02
            	描述：系统发布的文章
            -->
				<div @click.stop="to_xiangqing(arr)" class="boxs">
					<div class=" imgss" style="position: relative;">
						<img ref="pic" @load="detail_img" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);height:100%;width:100%;" :src="arr.picUrl" />
					</div>
					<div style="width:62%;height:1.4rem;float:left;margin-top:0.27rem;margin-left:5%">
						<p id="p_ss" style="-webkit-box-orient: vertical">{{ToCDB(arr.title)}}</p>
						<p class="p_box" :class="{p_box1:getBt(ToCDB(arr.title))>28}" style="-webkit-box-orient: vertical">{{html_detail(arr)}}</p>

					</div>

					<div style="width: 62%;height: 0.4rem;float: right;" >
						<div style="float:left;overflow:hidden;">
							<p class="artType" v-if="arr.artType" v-bind:style="{'color':artTypeDetail(arr.artType),'border-color':artTypeDetail(arr.artType)}" >{{arr.artType}}</p>
							<p style="line-height: 0.42rem;font-size: 0.24rem;color:#CCCCCC;display: inline-block;float: left;margin-left: 0.15rem;">{{arr.nickname}}</p>
						</div>
						<p style="font-size: 0.24rem;color:#CCCCCC;float:right;" v-if="arr.readerDiscuss>0">{{arr.readerDiscuss}}评论</p>
					</div>

				</div>
				<!--
            	作者：2443611475@qq.com
            	时间：2018-04-02
            	描述：剪刀手发布的评论
            -->
				<div>
					<div class="is">
						<div v-for="(i,index) in arr.artDis" style="width: 100%;border-top: 0.005rem solid #f1f1f1;">
							<div v-if="i.identification=='剪刀手'">
								<div style="width:100%;height:0.8rem;line-height:0.8rem;">
									<p style="font-size:0.3rem;float: left;">{{i.disUser}}</p>
									<div class="biao_box">{{i.identification}}</div>
									<!--
                    	作者：2443611475@qq.com
                    	时间：2018-04-02
                    	描述：不赞同
                    -->
									<span @click="no_like3(i,index,indexs)" style="font-size:0.2rem;float:right;color:#B6B6B6;" v-if="i.identification=='剪刀手'">
    					<p style="float: left;font-size: 0.25rem;margin-right: 0.1rem;">{{i.disDislike}}</p>
    					<img  v-if="i.opDislikeFlag!='yes'"  src="../../../assets/img/cai.png" style="width:0.32rem;height: 0.32rem;"/>
    					<img  v-else src="../../../assets/img/caiguo.png" style="width:0.32rem;height: 0.32rem;"/>
									</span>
									<!--
                    	作者：2443611475@qq.com
                    	时间：2018-04-02
                    	描述：赞同
                    -->
									<span @click="_like(i,index,indexs)" style="font-size:0.2rem;float:right;margin-right:0.35rem;color:#B6B6B6;">
    					<p style="float: left; font-size: 0.25rem;margin-right: 0.1rem;">{{i.disLike}}</p>
    					<img v-if="i.opLikeFlag!='yes'" src="../../../assets/img/icon_comment_good.png" style="width:0.32rem;height: 0.32rem;"/>
    					<img v-else src="../../../assets/img/icon_comment_good_active.png" style="width:0.32rem;height: 0.32rem;"/>
    				  <!--</span>-->
									</span>
								</div>
								<p :class="{p_boxs_to:op == index,p_boxs:(op == index?false:true)}" style="-webkit-box-orient: vertical; ">

									{{i.disContent}}
								</p>
								<div style="width:100%;height:0.8rem;line-height:0.8rem;">
									<span v-if="i.disContent.length>80" style="font-size:0.26rem;line-height:0.8rem;color:#999999;">
    					<p  @click="zk(index)" style="float: left;">{{op == index?'点击收起':'展开全部'}}</p>
    					<i style="float:left;font-size:0.4rem;margin-top:0.2rem;margin-left: 0.1rem;" class="fa fa-angle-right is" :class="{is_to:op == index}"></i>
    				    <i style="float:left;font-size:0.4rem;margin-top:0.2rem;margin-left: 0.1rem;" class="fa fa-angle-up" :class="{is:ip == index,is_to:(op == index?false:true)}"></i>
    				</span>
									<p style="font-size:0.26rem;color:#F2850D;float:right;margin-right:0.05rem;" @click="dashang(i)" v-show="$store.state.is_sc.ds">打赏剪刀手</p>

								</div>
							</div>
						</div>
					</div>
				</div>

				<!--
            	作者：2443611475@qq.com
            	时间：2018-04-10
            	描述：显示收起品论     fa fa-angle-double-up
            -->

			</div>
			<!--<div @click="xian(index)" style="width:100%;height:0.3rem;line-height:0.3rem;font-size:0.2rem;color:#D0D0D0;" v-if="i.readerDiscuss!='0'">
    			    <i style="float:left;font-size:0.3rem;margin-left: 2.9rem;" class="fa fa-angle-double-down" :class="{is_to:s2 == index}"></i> 
    			    <i style="float:left;font-size:0.3rem;margin-left: 2.9rem;" class="fa fa-angle-double-up" :class="{is:s1 == index,is_to:(s2 == index?false:true)}"></i> 
    			    
    			    <p style="">{{s2 == index?'点击收起评论':'点击展开评论'}}</p>
    		</div>-->
			<div style="width:100%;height:0.2rem;background:#F7F7F7;"></div>

		</div>
		<div class="no_article" v-if="actives.length==0">
			<img src="../../../assets/img/icon_noArticle.png" style="width: 100%;height: 100%;" />
			<p>暂无头条</p>
		</div>
		<div class="more" v-else>
				<p style="color: #D0D0D0;line-height: 1rem;">{{more_text}}</p>
			</div>
		<dashang v-show='$store.state.dashang'></dashang>
		
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
	import store from '../../../vuex/store.js'
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';
	import dashang from '../../home/dashang.vue'
	import swiper from '../../../../static/js/swiper.js'
	export default {
		store,
		components: {
			dashang,
		},
		data() {
			return {
				xian_s:false,
				zhan: '展开全部',
				actt: {
					noa: true,
					noe: false
				},
				act: '',
				op: "p",
				ip: 'r',
				actives: [], //储存大数据
				s2: 'e',
				s1: 'e',
				icard: '',
				page: 1,
				pageSize: 0,
				yeshu: 5,
				testData: [],
				call: {
					id: '',
					stauts: ''
				},
				more_text:"加载中",
				callStauts_s_s: [], //储存踩状态
				call_s: {
					id: '',
					stauts: ''
				},
				selected_arr: [], //临时数组，储存筛选条件，最多不超过3个
				callStauts_s: [],

			}
		},
		methods: {
			artTypeDetail(item){
				if(item){
				if(item.trim()=="绘画"){ return '#fec262';}
				if(item.trim()=="书法"){ return '#539db8';}
				if(item.trim()=="雕塑"){ return '#32b8d0';}
				if(item.trim()=="当代"){	return '#87a5b5';}
				if(item.trim()=="摄影"){return '#55c167';}
				if(item.trim()=="工艺"){ return '#90ccff';}
				if(item.trim()=="设计"){ return '#6d7c74';}
				if(item.trim()=="文学"){ return '#b5743a';}
				if(item.trim()=="音乐舞蹈"){ return '#87a5b5';}
				if(item.trim()=="影视戏剧") {return '#87a5b5';}
				}
			},
			shan_chu(){
				 this.$router.push({
						path: '/home'
				 }); 
			},
			
			shan_s(){
		        this.xian_s = false
  	        },
			//			   s_likes(i,index,arr){
			//				var url = this.$store.state.request_url + "/api/map/art/isExistDenyOnDis.do";
			//				var id = this.$store.state.data.memId;
			//				var token = this.$store.state.data.tokEn;
			//				var ts = new Date().getTime();
			//				var sign = md5(url + id + token + ts)
			//				this.$http({
			//					url: this.$store.state.request_url + "/api/map/art/isExistDenyOnDis.do?memId=" + id + "&ts=" + ts,
			//					method: 'post',
			//					headers: {
			//						"content-type": "application/json;charset=UTF-8",
			//						'sIgn': sign
			//					},
			//					body: {
			//						opId: this.$store.state.data.memId, //当前登录系统的会员ID
			//						disId: i.disId //评论的唯一id
			//					},
			//					emulateJSON: false,
			//				}).then(function(response) {
			//					
			//					if(response.body.meta.res == '00000') {
			//						if(response.body.meta.msg == "NO") {
			//							  this._like(i,index,arr)
			//						} else if(response.body.meta.msg == "YES") {
			//							  Toast({
			//								message: '你对该评论已经评价过了',
			//								position: 'middle',
			//								duration: 2000
			//							});
			//						}
			//					
			//					}
			//				})
			//			 },
			_like(i, index, indexs) {
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
						disId: i.disId
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						Toast({
							message: '点赞成功',
							position: 'middle',
							duration: 2000
						});
						this.actives[indexs].artDis[index].disLike++
							this.actives[indexs].artDis[index].opLikeFlag = 'yes'
					} else {
						Toast({
							message: '已经赞过了',
							position: 'middle',
							duration: 2000
						});
					}

				}).catch(function(err) {
					console.log(err)
				})
			},
			no_like3(i, index, indexs) {
				//				console.log(this.$store.state.data.memId)
				//				console.log(i.disId)

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
						disId: i.disId
					},
					emulateJSON: false,
				}).then(function(response) {

					console.log(response.body, '88888888888888888')

					if(response.body.meta.res == "00000") {
						Toast({
							message: '点踩成功',
							position: 'middle',
							duration: 2000
						});
						this.actives[indexs].artDis[index].disDislike++
							this.actives[indexs].artDis[index].opDislikeFlag = 'yes'
					} else {
						Toast({
							message: '已经踩过了',
							position: 'middle',
							duration: 2000
						});
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			//			sno_likes(i,index,arr){
			//				var url = this.$store.state.request_url + "/api/map/art/isExistLikeOnDis.do";
			//				var id = this.$store.state.data.memId;
			//				var token = this.$store.state.data.tokEn;
			//				var ts = new Date().getTime();
			//				var sign = md5(url + id + token + ts)
			//				this.$http({
			//					url: this.$store.state.request_url + "/api/map/art/isExistLikeOnDis.do?memId=" + id + "&ts=" + ts,
			//					method: 'post',
			//					headers: {
			//						"content-type": "application/json;charset=UTF-8",
			//						'sIgn': sign
			//					},
			//					body: {
			//						opId: this.$store.state.data.memId, //当前登录系统的会员ID
			//						disId: i.disId //评论的唯一id
			//					},
			//					emulateJSON: false,
			//				}).then(function(response){
			//					if(response.body.meta.res == '00000') {
			//						if(response.body.meta.msg == "NO") {
			//							 this.no_like3(i,index,arr)
			//						} else if(response.body.meta.msg == "YES") {
			//						     Toast({
			//								message: '你对该评论已经评价过了',
			//								position: 'middle',
			//								duration: 2000
			//							});
			//						}
			//					}
			//				})
			//			},
            huoqus_s() {
				this.$http({
					url: this.$store.state.request_url + "/api/mapFreeVerification/touristsArtConsultation.do",
					headers: {
						"content-type": "application/json;charset=UTF-8",
						
					},
					emulateJSON: false,
					method: 'post',
					body: {
						artFlag: '3',
						rows: this.yeshu,
						page: this.page,
						artType: this.selected_arr,
						opId: this.$store.state.data.memId
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						console.log('游客状态')
						this.pageSize = response.body.data.pageSize

						for(var i = 0; i < response.body.data.list.length; i++) {
							this.actives.push(response.body.data.list[i])
						}

						var a = this.actives
						var res = [];
						var json = {};
						for(var i = 0; i < a.length; i++) { //数组去重
							if(!json[a[i].artId]) {
								res.push(a[i]);
								json[a[i].artId] = 1;
							}
						}
						this.actives = res

						//console.log(this.actives, '数据1111111111111')
						//this.more_text="已经加载完成！"
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			
			huoqus() {

				var url = this.$store.state.request_url + "/api/mapPlazaManager/artConsultation.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/artConsultation.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						artFlag: '3',
						rows: this.yeshu,
						page: this.page,
						artType: this.selected_arr,
						opId: this.$store.state.data.memId
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						this.pageSize = response.body.data.pageSize

						for(var i = 0; i < response.body.data.list.length; i++) {
							this.actives.push(response.body.data.list[i])
						}

						var a = this.actives
						var res = [];
						var json = {};
						for(var i = 0; i < a.length; i++) { //数组去重
							if(!json[a[i].artId]) {
								res.push(a[i]);
								json[a[i].artId] = 1;
							}
						}
						this.actives = res

						//console.log(this.actives, '数据1111111111111')
						//this.more_text="已经加载完成！"
						//console.log(this.$refs.artType,"999999999999")
					}
				}).catch(function(err) {
					console.log(err)
				})
				
				
			},
			
			
			/**计算字符数*/
			getBt(str) {
				//				var char = str.replace(/[^\x00-\xff]/g, '**');
				//				return char.length;

//				var total = 0,
//					charCode,
//					i,
//					len;
//				var charset = "utf-16";
//				if(charset === 'utf-16' || charset === 'utf16') {
//					for(i = 0, len = str.length; i < len; i++) {
//						charCode = str.charCodeAt(i);
//						if(charCode <= 0xffff) {
//							total += 2;
//						} else {
//							total += 4;
//						}
//					}
//				} else {
//					for(i = 0, len = str.length; i < len; i++) {
//						charCode = str.charCodeAt(i);
//						if(charCode <= 0x007f) {
//							total += 1;
//						} else if(charCode <= 0x07ff) {
//							total += 2;
//						} else if(charCode <= 0xffff) {
//							total += 3;
//						} else {
//							total += 4;
//						}
//					}
//				}
				return str.replace(/[^\x00-\xff]/g, 'xx').length;;

			},
			/**转半角*/
			ToCDB(str) {
				//console.log(str,"全角")
				var tmp = "";
				for(var i = 0; i < str.length; i++) {
					if(str.charCodeAt(i) == 12288) {
						tmp += String.fromCharCode(str.charCodeAt(i) - 12256);
						continue;
					}
					if(str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
						tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
					} else {
						tmp += String.fromCharCode(str.charCodeAt(i));
					}
				}
				//console.log(tmp,"半角")
				return tmp
			},
			/**选择板块*/
			to_select_article() {
				this.$store.state.if_articleItem = this.selected_arr
				//this.$store.state.tr = 1;
				this.$router.push({
					path: '../select_article_block'
				});
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
				let box_to = document.getElementsByClassName('box_ss')
				if(Math.abs(cdx) < Math.abs(cdy) && cdy < 0) {
					if(box_to[box_to.length - 1]){
						//console.log(box_to[box_to.length - 1],"2222222222222")
					$("#lan").css("opacity", "0");
					if(box_to[box_to.length - 1].getBoundingClientRect().top / 100 + 'rem' <= 16 + 'rem') {
						//console.log(this.pageSize,this.actives.length)
						if(this.pageSize > this.actives.length ) {
							this.more_text="加载中"
							this.page++;
							this.yeshu = 3;
							
							if(localStorage.yous=='true'){
								this.huoqus_s()
							}else{
								this.huoqus()
							}
							
							
							
						}else{
							this.more_text="已经没有更多了！"
						}
					}else{
						this.more_text="已经没有更多了！"
					}
					}else{
						this.more_text="已经没有更多了！"
					}
				} else {
					$("#lan").css("opacity", "1");
				}
			},

			uniq(array) {
				var temp = []; //一个新的临时数组
				for(var i = 0; i < array.length; i++) {
					if(temp.indexOf(array[i]) == -1) {
						temp.push(array[i]);
					}
				}
				return temp;
			},

			/*查询评论点赞是否存在*/

			/*查询评论踩是否存在*/

			to_xiangqing(i) { //跳转至作品详情
				
				if(localStorage.yous=='true'){
					this.xian_s=true
				}else{
					this.$store.state.report_works = i; //举报用
				this.$store.state.zuopin_x = i //将当前文章信息发送到全局数据-供文章详情页面调用
				this.$store.state.zuopin_l = '3'
				this.$router.push({
					path: '../Details_of_the_article'
				});
                
				this.$store.state.Return_to_return = 5
				//this.$store.state.tr = 1
				}
			
			},
			zk(index) {
				if(this.op == index) {
					this.op = 'p'
					this.ip = "r"
				} else {
					this.op = index
					this.ip = index
				}
			},
			/*处理标签*/
			html_detail(i) {
				var str = i.artRemark;
				var dd = str.replace(/<\/?.+?>/g, "")
				var dds = dd.replace(/ /g, "");
				var ddss = dds.replace(/[ ]|[&nbsp;]/g, "");
				return ddss;
			},
			/*处理图片*/
			detail_img() {
				if(this.$refs.pic) {
					for(var i = 0; i < this.$refs.pic.length; i++) {
						var img = new Image();
						img.src = this.$refs.pic[i].src;
						/*对比原始比例*/
						if((img.width / img.height) < (230 / 170)) {
							this.$refs.pic[i].style.width = "2.3rem";
							this.$refs.pic[i].style.height = "auto";

						} else if((img.width / img.height) > (230 / 170)) {
							this.$refs.pic[i].style.height = "1.7rem";
							this.$refs.pic[i].style.width = "auto";

						} else {
							this.$refs.pic[i].style.width = "2.3rem";
							this.$refs.pic[i].style.height = "1.7rem";
						}
					}
				}
			},
			/**顶部条件栏*/
			swipers() {
				new swiper('.swiper-container', {
					slidesPerView: 4.5,
					centeredSlides: false,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper 
					observeParents: true, //修改swiper的父元素时，自动初始化swiper 
				})

			},
			/**条件选择事件*/
			selecte_item(item, index) {
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
//							} else {

								this.selected_arr.push(item.dictName);
								this.testData[index].id = !this.testData[index].id;
							//}
						} else {
							for(var i = 0; i < this.selected_arr.length; i++) {
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

				this.$store.state.if_articleItem = this.selected_arr
				this.yeshu = 5;
				this.page = 1;
				this.actives = [];
				if(localStorage.yous=='true'){
								this.huoqus_s()
							}else{
								this.huoqus()
							}
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
						"sIgn": sign
					},
					body: {
						parentId: "81fadca55fd54a3fa8ad76e4ae797cbc",
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {

						/**处理数据*/
						var array = [];
						array = response.body.data;
						for(var j = 0; j < array.length; j++) {
							array[j].id = false
						}

						/**生成数据*/
						var new_array = [];
						var all = {};
						all.id = true;
						all.dictName = "全部";
						new_array.push(all);

						for(var j = 0; j < array.length; j++) {
							new_array.push(array[j])
						}
						if(this.$store.state.if_articleItem.length > 0) {
							new_array[0].id = false;
							this.selected_arr = this.$store.state.if_articleItem;
							for(var i = 0; i < this.$store.state.if_articleItem.length; i++) {
								for(var j = 0; j < new_array.length; j++) {
									if(this.$store.state.if_articleItem[i] == new_array[j].dictName) {
										new_array[j].id = true
									}
								}
							}
						}
						this.testData = new_array;
						setTimeout(() => {
							this.swipers();
						}, 50)

					}
				})
			},
			/*打赏*/
			dashang(i) {

				this.$store.state.Return_to_return == 7
				this.$store.state.dashang = true
				this.$store.state.A_reward = i
				this.$store.state.is_headline = false
				this.$store.state.is_comment_dashang = true
			}
		},
		mounted() {
			
			if(this.$store.state.if_articleItem.length == 0) {
				this.selected_arr.push("全部")
			} else {
				for(var i = this.$store.state.if_articleItem.length - 1; i >= 0; i--) {
					this.selected_arr.push(this.$store.state.if_articleItem[i])
				}
			}
			this.getZhuanye();
			if(localStorage.yous=='true'){
								this.huoqus_s()
							}else{
								this.huoqus()
							}

		},
		created() {

			this.icard = localStorage.identification
		}

	}
</script>

<style scoped="scoped">
	@import url("../../../assets/css/swiper.css");
	#p_ss {
		font-size: 0.32rem;
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-weight: 600;
		margin-bottom: 0.05rem;
	}
	
	.boxs {
		width: 100%;
		height: 2.3rem;
		padding-bottom: 0.2rem;
	}
	
	.imgss {
		width: 2.3rem;
		height: 1.8rem;
		float: left;
		margin-top: 0.27rem;
		vertical-align: middle;
		text-align: center;
		overflow: hidden;
	}
	
	.p_box {
		width: 100%;
		font-size: 0.24rem;
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/*margin-top: 0.2rem;*/
		color: #999999;
	}
	
	.biao_box {
		padding: 0 0.2rem;
		font-size: 0.2rem;
		text-align: center;
		line-height: 0.33rem;
		background: #FF9D00;
		float: left;
		margin-left: 0.14rem;
		margin-top: 0.23rem;
		color: white;
		border-radius: 0.05rem;
	}
	
	.p_boxs {
		width: 100%;
		font-size: 0.26rem;
		color: #B5B5B5;
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		transition: 1s;
	}
	
	.p_boxs_to {
		word-break: break-all;
		white-space: normal;
		display: -webkit-box;
		width: 100%;
		font-size: 0.26rem;
		color: #B5B5B5;
		/*height: ;*/
		transition: 1s;
	}
	
	.is {
		transition: 1s;
		overflow: hidden;
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
	
	.is_to {
		/*display: none;*/
		height: 0;
		overflow: hidden;
		transition: 1s;
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
		-moz-box-shadow: 0px 4px 11px #E9E9E9;
		-webkit-box-shadow: 0px 4px 11px #E9E9E9;
		box-shadow: 0px 4px 11px #E9E9E9;
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
		width: 100%;
		height: 1rem;
		font-size: 0.3rem;
		padding-bottom: 0.3rem;
		text-align: center;
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
	.artType{
		
		font-size: 0.2rem;
		color:red;
		display: inline-block;
		float: left;
		padding: 0 0.05rem;
		border: 1px solid red;
		border-radius: 0.05rem;
	}
</style>