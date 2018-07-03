<template>
	<div id="app" style="width: 100%;background:white;position:relative;z-index:400;overflow: hidden;">
       <dashang v-show='$store.state.dashang' ></dashang>
         <!--
       	作者：2443611475@qq.com
       	时间：2018-05-30
       	描述：作品详情、、、、、、、、、如果该页面修改，works_detail（2）.vue页面也必须做对应修改
       -->
		<workschild @huoqu="Gdoc" v-bind:m='message'></workschild>

		<div class="head">
			<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../assets/img/zuo.png" @click="backTo"/>
			<div class="title">
				<p>{{$store.state.worksName}}详情</p>
			</div>

			<img class="img2" src="../../assets/img/icon_detail_more.png" @click="reportTap(works_data)" />
		</div>

		<div class="works_infor">
<!------------------------------------------------------------------------------------------------------------------
            	作者：2443611475@qq.com
            	时间：2018-05-15
            	描述：swiper轮播
           -->
           <div style="width: 100%;overflow:hidden;margin-top:1rem;" >
           	<div   class="more_works" @click="goTo" v-if="is_dynamic">
				<div style="float: left;width: 0.75rem;height: 0.75rem;overflow: hidden;border-radius: 50%;margin-top: 0.125rem;position: relative;">
					<img :src="personal.opPic" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" @load="tou_chuli" ref="tou"/><!--personal.opPic-->
				</div>

				
					<p style="line-height: 1rem;font-size: 0.32rem;display: inline-block;margin-left: 0.3rem;">{{personal.nickname}} </p>
				
				
				<div style="float: right;line-height: 1rem;font-size: 0.28rem;color: #D3D1D1;">
					<p>{{chuli_date(getTimess(works_data.insertDate))}}</p>
					
				</div>
			</div>
           </div>
		    <div class="works_s" style="position: relative;">
		    	
			   <div class="swiper-container" style="">
				  <div class="swiper-wrapper">
					<div   v-for="(i,index) in works_data.picInfo" class="swiper-slide" style="overflow:hidden;position: relative;height: 7rem;">
						<img  id="img_box" @click="go_tupain_xiangqing(i.picUrl)"  :src="i.picUrl" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);width: 7.5rem;height: auto;"/>
					</div>
					 
				   </div>
				   <div class="swiper-pagination" style=""></div>
				   <!--
                   	作者：2443611475@qq.com
                   	时间：2018-05-22
                   	描述：分页器
                   -->
				  
			   </div>
			</div>
<!------------------------------------------------------------------------------------------------------------------->


			<div class="works_content">
				<div>
					
				
				<p class="works_content_title" v-if="works_data.artTitle">{{works_data.artTitle}}</p>
					<p style="display: inline-block;float: right;font-size:0.32rem;color: #FF9D00;line-height: 0.7rem;margin-top: 0.15rem; */" v-if="works_data.retailPrice">.00</p>
					<p style="display: inline-block;float: right;font-size:0.42rem;color: #FF9D00;margin-top: 0.15rem; */" v-if="works_data.retailPrice">￥{{works_data.retailPrice}}</p>
				</div>
				<!--<p class="introduce" v-if="works_data.artDecription">{{works_data.artType.classificationName}}/{{(works_data.artDecription==null)?"":works_data.artDecription.createDecade}}/{{(works_data.artDecription==null)?"":works_data.artDecription.material}}/{{(works_data.artDecription==null)?"":works_data.artDecription.createTheme}}/{{(works_data.artDecription==null||works_data.artDecription=='')?"":'x'+works_data.artDecription.artHeight}}{{(works_data.artDecription==null)?"":'x'+works_data.artDecription.artLength}}{{(works_data.artDecription==null)?"":'x'+works_data.artDecription.artWidth}}cm</p>-->
				<div style="width: 100%;overflow: hidden;">
					<div class="introduce">
						<p  v-if="works_data.artDecription" style="display: inline-block;">{{cation_Name}}{{create_Decade}}{{material}}{{create_Theme}}{{artLength}}{{artWidth}}{{artHeight}}</p>
						<p style="display: inline-block;" v-if="artLength||artWidth||artHeight">cm</p>
					</div>
					
				</div>
				<p class="introduce_content" v-if="works_data.artRemark">{{html_detail(works_data)}}</p>
				<div class="tip" v-if="autor_detail(works_data.artCopyright)">
					<div class="tip_item" v-if="autor_detail(works_data.artCopyright)">
						<img src="../../assets/img/icon_detail_trick.png" />
						<p>原作：{{autor_detail(works_data.artCopyright)}}</p>
					</div>
					<div class="tip_item" v-if="works_data.retailPrice">
						<img src="../../assets/img/icon_detail_trick.png" />
						<p>可出售</p>
					</div>
				</div>
			</div>
			<div class="down"></div>
			<div class="function">
				<div  class="function_item_left" @click="call_btn">
					<img style="transition:2s;" :src="callStauts=='2'?goods.goodUrl1:goods.goodUrl" />
					<p v-if="works_data.readerLike=='0'">点赞</p>
					<p v-else-if="works_data.readerLike>0" >{{(parseInt(works_data.readerLike.length)==4)?parseInt(works_data.readerLike)/1000+'k':works_data.readerLike}}</p>
				</div>
				<div  class="function_item_left" @click="comentTap">
					<img style="transition:2s;" :src="collectStauts=='2'?coment.coment_active:coment.coment_defult" />
					<p v-if="works_data.readerCollect=='0'">收藏</p>
					<p v-else-if="works_data.readerCollect>0" >{{(parseInt(works_data.readerCollect.length)==4)?parseInt(works_data.readerCollect)/1000+'k':works_data.readerCollect}}</p>
				</div>
				
				<div   class="function_item_left" @click="replyTap">
					<img src="../../assets/img/icon_detail_comment.png"/>
						<p v-if="works_data.readerDiscuss=='0'">评论</p>
					<p v-else-if="works_data.readerDiscuss>0" >{{(parseInt(works_data.readerDiscuss.length)==4)?parseInt(works_data.readerDiscuss)/1000+'k':works_data.readerDiscuss}}</p>
				</div>
				
				<div @click="zhuan_f" class="function_item_left">
					<img src="../../assets/img/icon_detail_share.png" />
					<p v-if="works_data.readerForward=='0'">转发</p>
					<p v-else-if="works_data.readerForward>0" >{{(parseInt(works_data.readerForward.length)==4)?parseInt(works_data.readerForward)/1000+'k':works_data.readerForward}}</p>
				</div>
				
				<div @click="dashang1" class="function_item_right" style="height: 0.64rem;width: 0.64rem;margin-right: 0.3rem;margin-top: 0.1rem;">
					<img src="../../assets/img/icon_detail_tip.png" style="height: 100%;width: 100%;"/>
					
				</div>
				
				
			</div>
			<div v-show="xiao" class="xian"></div>
			<div v-show="xiao"  class="more_works" @click="goTo" v-if="!is_dynamic">
				<div class="more_img_left">
					<img :src="personal.opPic"/><!--personal.opPic-->
				</div>

				<div class="works_fan">
					<p class="work_fan_id">{{personal.nickname}} </p>
					<p class="work_fan_p" style="-webkit-box-orient: vertical;" v-if="personal.specialization">{{personal.specialization.artCategoryName}}-{{personal.specialization.artCategorySubclass}}</p>
				</div>
				<div class="more_right">
					<p>{{worksNum}}个作品</p>
					<img src="../../assets/img/come_icon.png" />
				</div>
			</div>
			
			<div class="xian" v-if="!is_dynamic"></div>
			
			<div v-show="noa_s" style="width: 100%;height: 5rem;text-align: center;">
				<img class="img_no" style="" src="../../assets/img/icon_noComment.png"/>
				<p style="font-size: 0.3rem;color: #cccccc;margin-top: 0.1rem;">暂时还没有人评论哦</p>
			</div>
			
			<div  class="comment_item" v-for="(arr,index) in worksComment">
				<div class="athor_infor">
					<div class="athor_infor_left">
						<div class="athor_icon">
							<img @click="goTo_s(arr)" :src="arr.disUserPic" />
						</div>
						<p class="athor_name">{{arr.disUser}}</p>
						<div class="athor_div">
							<p v-show="arr.identification=='作者'" class="athor_text">{{arr.identification}}</p>
                            <p v-show="arr.identification.length>2" class="athor_text">{{arr.identification.substring(3,5)}}</p>

						</div>
					</div>
					<div class="athor_infor_right">
						
					<div class="call" @click.stop="callTap(index)">
						 
						  <span  v-for="c in callStauts_s">
							<img v-if="c.id==arr.disId&&c.stauts=='1'" src="../../assets/img/icon_comment_good.png"/>
							<img v-else-if="c.id==arr.disId&&c.stauts=='2'" src="../../assets/img/icon_comment_good_active.png" alt="" />  
						  </span>	
						  <p>{{arr.disLike}}</p>
					</div>
						
						<!--<div class="call_right">-->
							<!--<img src="../../assets/img/icon_comment_translation.png" />-->
						<!--</div>-->
					</div>
				</div>
				<div class="athor_infor_content">
					<div @click="complaint(arr)">
						<p class="athor_infor_content_text">{{arr.disContent}}</p>

						<p class="date" >{{jisuan_time(arr)}}</p>
					</div>
					
					<div v-show="arr.replyTotal!='0'" class="more_content" @click.stop="shows(index)">
						<p>查看全部{{arr.replyTotal}}条回复</p>
						<img src="../../assets/img/come_icon.png" />
					</div>

				</div>
				<div class="down_xian"></div>
			</div>
			
		</div>
		
		<div v-show="xiao&&$store.state.home_x==1" style="width: 100%;height: 1.5rem;background: white;"></div>
		<div v-show="xiao&&$store.state.home_x==1" class="footer">
			<div class="love" @click="call_btn2">
				<img src="../../assets/img/icon_detail_like.png" />
				
			</div>
			<div class="ignore" @click="ignoreTap">
				<img src="../../assets/img/icon_detail_dislike.png" />
				
			</div>
		</div>
		
		<showdialog v-bind:d='mes' @huoqu="Gdoc" ></showdialog>
		
		<replydialog v-bind:a='reply' @huoqu="Gdoc" ></replydialog>
		
		<reportdialog  v-bind:f='report'></reportdialog>
		
	</div>
</template>
<script src="../../static/js/adaption.js"></script>

<script>
	
	import workschild from './works_child.vue'
	import store from '../../vuex/store.js'
	import showdialog from './show_dialog.vue'
	import replydialog from './replydialog.vue'
	import reportdialog from './reportdialog.vue'
	import dashang from '../home/dashang.vue'
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';
	
	import axios from 'axios'
//	import wxapi from '../../mixins/wxapi.js'
	import Swiper from '../../../static/js/swiper.js'
	export default {
		
//		mixins:[wxapi],
		//			el:"#app",
		store,
		components:{
			workschild,
			showdialog,
			replydialog,
			reportdialog,
			dashang,
		},

	    computed:{
	    	
	    	cation_Name(){
	    		
	    		if(this.works_data.artType){
	    			//console.log(this.works_data.artType)
					return (this.works_data.artType.classificationName=="")?'':this.works_data.artType.classificationName
				}
	    	},
	    	create_Decade(){
	    		if(this.works_data.artDecription){
return (this.works_data.artDecription.createDecade=="")?"":'/'+this.works_data.artDecription.createDecade
	    		}
	    	},
	    	material(){
	    		if(this.works_data.artDecription){
return (this.works_data.artDecription.material=="")?"":'/'+this.works_data.artDecription.material
				}
	    	},
	    	create_Theme(){
	    		if(this.works_data.artDecription){
return 	(this.works_data.artDecription.createTheme=="")?"":'/'+this.works_data.artDecription.createTheme    
}
	    	},
//	    	
	    	artHeight(){
	    		if(this.works_data.artDecription){
return (this.works_data.artDecription.artHeight==null||this.works_data.artDecription.artHeight=='')?"":'x'+this.works_data.artDecription.artHeight	
}
	    	},
	    		
	    	artLength(){
	    		if(this.works_data.artDecription){
return (this.works_data.artDecription.artLength==""||this.works_data.artDecription.artLength=='')?"":'/'+this.works_data.artDecription.artLength	
}
	    	},
	    	artWidth(){
	    		if(this.works_data.artDecription){
return (this.works_data.artDecription==""||this.works_data.artDecription.artWidth=='')?"":'x'+this.works_data.artDecription.artWidth	 
}
	    	}
	    		
	    },
		
		data() {
			return {
				callStauts_s: [], //储存点赞状态
				call: {
					id: '',
					stauts: ''
				},
				xiao:true,
				acst: [

				],
				noa_s:true,
				message: {
					dad: false,
					name: ''
				},
				goods: {
					goodUrl: 'static/img/icon_detail_good_normal.png',
					goodUrl1: 'static/img/icon_detail_good_active.png',
				},
				call: {
					is_active: false
				},
				coment: {
					coment_defult: 'static/img/icon_detail_collect_normal.png',
					coment_active: 'static/img/icon_detail_collect_active.png',
				},
				coment_value: {
					is_coment: false
				},
				shu: 0,

				mes: {
					is_show: false
				},
				reply:{
					is_reply:false
				},
				report:{
					is_report:false
				},
				works_data: {},
				personal:{specialization:{artCategoryName:''}},
				worksComment:{},
				worksNum:'',
				callStauts:'',
				collectStauts:'',
				times_array:[],//处理时间储存数组
				
				config:{//微信分享数据临时存储
					appId:'',//微信appid
					timestamp:'',//时间戳
					nonceStr:'',
					signature:'',//签名
				},
				is_dynamic:false
				
			}

		},
     
		
		
	methods: {
		tou_chuli(){
			if(this.$refs.tou){
				console.log(this.$refs.tou)
				var img=new Image();
				img.src=this.$refs.tou.src;
				if(img.width<img.height){
					this.$refs.tou.style.width="100%";
					this.$refs.tou.style.height="auto";
				}else{
					this.$refs.tou.style.width="auto";
					this.$refs.tou.style.height="100%";
				}
				
			}
			
		},
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
		getTimess(e){
	    		var t=new Date(e);
	    		return t.getTime();
	    	},
		autor_detail(t){
			if(t){
				var tt=t.split(",")[1];
				if(tt=="undefined"||tt==null||tt==""){
					return false;
				}else{
					return tt;
				}
			}
		},
		/*处理标签*/
			html_detail(i) {
				if(i.artRemark){
				//	console.log(i,"详情")
				var str = i.artRemark;
				var dd = str.replace(/<\/?.+?>/g, "")
				var dds = dd.replace(/ /g, "");
				var ddss = dds.replace(/[ ]|[&nbsp;]/g, "");
				return ddss;
				}
			},
		goTo_s(i) {
			       this.$store.state.Author_s_detailed_routing = 1
				    this.$store.state.home_x = 0
					this.$store.state.worksOpId=i.opId;
					//window.location = '/#/personal_data'
					this.$router.push({
						path: '../personal_data'
					})
			},
		
		
		
		likes(i){//查询评论点赞
			this.callStauts_s = []
				var url=this.$store.state.request_url+"/api/map/art/isExistLikeOnDis.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				
				this.$http({
					url: this.$store.state.request_url+"/api/map/art/isExistLikeOnDis.do?memId="+id+"&ts="+ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					body: {
						opId: this.$store.state.data.memId, //当前登录系统的会员ID
						disId:i.disId//评论的唯一id
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
		 
		 callTap(i){//评论点赞
                  var url=this.$store.state.request_url+"/api/map/art/addLikeOnDis.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
                   this.$http({
							url:this.$store.state.request_url+"/api/map/art/addLikeOnDis.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body:{
								opId:this.$store.state.data.memId,
								disId:this.worksComment[i].disId
							},
							emulateJSON: false,
						}).then(function(response) {
							//console.log(response.body)
							if(response.body.meta.res == "00000") {
								for(var j=0;j<this.worksComment.length;j++){
									this.likes(this.worksComment[j])
								}
								Toast({
											message: '点赞成功',
											position: 'middle',
											duration: 2000
										});
										
								this.worksComment[i].disLike+=1
							}else{
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
		
		
//		tiao(event){
//				let ev = ev||event
//				
//					//console.log(ev.touches[0].clientX,'滑动事件')
//			
//				
//			},
		
	    yan_zheng(){
	    	 let url=this.$store.state.request_url+"/api/map/user/artShare";
	      	 let id=this.$store.state.data.memId;
	      	 let token=this.$store.state.data.tokEn;
	      	 let ts=new Date().getTime();
	      	 let sign = md5(url+id+token+ts)
	      	 this.$store.state.sign = sign
		  	this.$store.state.tableList.wx_js_sdk()
	    },
	    
		
              	zhuan_f() { //微信转发功能

				var url = this.$store.state.request_url + "/api/map/art/artForward.do"; //state.request_url
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				//console.log(this.works_data,"988888888888")
				this.$http({
						url: this.$store.state.request_url + "/api/map/art/artForward.do?memId=" + id + "&ts=" + ts,
						method: 'post',
						headers: {
							"content-type": "application/json;charset=UTF-8",
							'sIgn': sign
						},
						body: {
							opId: id,
							forwardOpId: this.works_data.opId,
							forwardType: this.works_data.artFlag,
							artId: this.works_data.artId
						},
						emulateJSON: false,
					}).then(function(response) {

						if(response.body.meta.res == "00000") {
						//console.log(response.body,"转发",this.works_data)
						var ti = '';
						if(response.body.data.title.length > 10) {
							ti = response.body.data.title.substring(0, 10) + "..."
						} else {
							ti = response.body.data.title
						}

						this.$store.state.share_url = response.body.data.forwardUrl

						/*好友*/
						this.$store.state.share_title = "【"+response.body.data.template+"|"+response.body.data.artType+"】 " + this.personal.nickname + "《" + ti + "》";

						this.$store.state.share_content = "突围艺术圈,人气超58%的用户!觅艺APP:一个与众不同交流的泛艺术社交平台!"

						/**朋友圈*/
						this.$store.state.share_new_title = response.body.data.title;

						this.$store.state.share_new_content = "【"+response.body.data.template+"|"+response.body.data.artType+"】 " + this.personal.nickname + "《" + ti + "》";

						this.$store.state.share_img = response.body.data.picUrl
						//console.log(this.$store.state.share_new_content, "-", this.$store.state.share_title)
						this.$store.state.tableList.share();
						//console.log(this.$store.state.share_title)
							
						}
					}).catch(function(err) {
							//console.log(err)
					})
				}, 
        
       
       
            go_tupain_xiangqing(i){
            	this.$store.state.picurl_ss = i
            	this.$router.push({
						path: '../photos_datu'
					})
              },
			dashang1(){
				
				this.$store.state.dashang = true  
				
				this.$store.state.A_reward = this.works_data
				
				this.$store.state.Return_to_return=2
				
			},
			
			goTo() {
				   this.$store.state.Author_s_detailed_routing = 1
				    this.$store.state.home_x = 0
					this.$store.state.worksOpId=this.personal.opId;
					this.$router.push({
						path: '../personal_data'
					})
			},
			
			shows(arr) {
				this.message.name = this.worksComment[arr].name
				this.$store.state.worksCommentContent= this.worksComment[arr];
				this.message.dad = true
				var url=this.$store.state.request_url+"/api/map/art/selectArtDis.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
				this.$http({
							url: this.$store.state.request_url+"/api/map/art/selectArtDis.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								artId:this.$store.state.worksId,
								parentId:this.$store.state.worksCommentContent.disId,
							},
							emulateJSON: false,
						}).then(function(response){
							
							if(response.body.meta.res == "00000"){
								
								this.$store.state.pinlun_child=response.body.data.artDis;
							}
						}).catch(function(err) {
							//console.log(err)
						})
						
						this.da()
			},
		
			backTo(){
				 this.$store.state.home_x = 0
				 this.$store.state.xcs = 0
                 
//               console.log(this.$store.state.back_id,'返回跳转路由')
                 
                 
				 switch(this.$store.state.back_id){
				 	case 61:
				 		this.$router.push({
							path: '../square/square_diaries'//跳转至闲情
						})
				 		break;
				 	case 1:
				 		this.$router.push({
							path: '../slider'
						})
				 		break;
				 	case 12:
				 		this.$router.push({
							path: '../BS_stack'
						})
				 		break;
				 	case 2:
//				 	    this.$store.state.xlss =  6
				 		this.$router.push({
							path: '../personal_data'
						})
				 		break;
				 	case 3:
				 		this.$router.push({
							path: '../My_work'
						})
				 		break;
				 	case 4:
				 		this.$router.push({
							path: '../square/Popularity_list'
						})
				 		break;
				 	case 7:
				 		this.$router.push({
							path: '../My_leisure'
						})
				 		break;
				 	case 8:
				 		this.$router.push({
							path: '../Myarticle'
						})
				 		break;
				 	case 91:
				 		this.$router.push({
							path: '../Mycollection/works'
						})
				 		break;
				 	case 92:
				 		this.$router.push({
							path: '../Mycollection/Leisure'
						})
				 		break;
				 	case 93:
				 		this.$router.push({
							path: '../Mycollection/actives_rower'
						})
				 		break;
				 	case 5:
				 		this.$router.push({
							path: '../square/dynamic'
						})
				 		break;
//				 	case 6:
//				 	    this.$store.state.xlss =  6
//				 		this.$router.push({
//							path: '../personal_data'//跳转至相册
//						})
//				 		 this.$store.state.back_id=this.$store.state.web_s//反向将第一次跳转进入作品详情的地址位置返回给判断路由
//				 		break;
				 	case 51:
				 	   this.$store.state.tr = 5
				       this.$router.push({
				 	        path:'../square/BS_Graduation_season'//跳转至--》 毕业季 ---》 热门榜
				        })
				 		break;
				 	case 52:
				 	   this.$store.state.tr = 5
				       this.$router.push({
				 	        path:'../square/BS_Graduation_season'//跳转至--》 毕业季 ---》 热门榜
				        })
				 		break;
				 }
	
			},
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、			
			call_btn(){//作品点赞事件
				if(this.callStauts == '2'){//取消点赞
					 var url=this.$store.state.request_url+"/api/map/art/cancelLike.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
					this.$http({
							url: this.$store.state.request_url+"/api/map/art/cancelLike.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								artId: this.works_data.artId,
								likeOpId:this.$store.state.data.memId//当前登录用户Id
							},
							emulateJSON: false,
					}).then(function(response) {
							   if(response.body.meta.res == '00000'){
							   	 this.callStauts="1"
							   	 this.works_data.readerLike-=1
							   }
						}).catch(function(err) {
							//console.log(err)
						})
						
				}else{//执行点赞
				
				var url=this.$store.state.request_url+"/api/map/art/artLike.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
					this.$http({
							url: this.$store.state.request_url+"/api/map/art/artLike.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								artId: this.works_data.artId,
								likeType:this.works_data.artFlag,
								opId:this.works_data.opId,
								likeOpId:this.$store.state.data.memId//测试参数当前用户Id
							},
							emulateJSON: false,
					}).then(function(response){
							   if(response.body.meta.res == '00000'){
							   	 this.callStauts="2"
							   	 Toast({
											message: '点赞成功',
											position: 'middle',
											duration: 2000
										});
								
								this.works_data.readerLike+=1
										
							   }else if(response.body.meta.res == '99999'){
							   	  Toast({
											message: "你已经对此作品点赞",
											position: 'middle',
											duration: 2000
										});
							   }
						}).catch(function(err) {
							//console.log(err)
						})
				 }
			},
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、			
			
			call_btn2(){//footer点赞事件
				    var url=this.$store.state.request_url+"/api/map/art/artLike.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
					this.$http({
							url: this.$store.state.request_url+"/api/map/art/artLike.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								artId: this.works_data.artId,
								likeType:this.works_data.artFlag,
								opId:this.works_data.opId,
								likeOpId:this.$store.state.data.memId//测试参数当前用户Id
							},
							emulateJSON: false,
					}).then(function(response) {
						
							   if(response.body.meta.res == '00000'){
							     	this.callStauts="2"
							   }else if(response.body.meta.res == '99999'){
							   }
								
						}).catch(function(err) {
							//console.log(err)
						})
						
				 this.$store.state.home_ts = 'like'
				 this.$store.state.Display_storage[0] = this.$store.state.home_box
				 this.$store.state.xcs = 0
				 this.$store.state.home_x = 0
			  if(this.$store.state.back_id==12){
			  	 this.$router.push({path: '../BS_stack'})
			  }else{
			  	this.$router.push({path: '../slider'})
			  }
				
			},
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、			
			comentTap() {//收藏事件
				if(this.collectStauts=="2"){//取消收藏事件
					var url=this.$store.state.request_url+"/api/map/art/uncollect.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
				this.$http({
							url: this.$store.state.request_url+"/api/map/art/uncollect.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body:{
								opId:this.$store.state.data.memId,//测试参数当前用户Id
								
								artId:this.works_data.artId,//作品ID
							},
							emulateJSON: false,
					}).then(function(response) {
							if(response.body.meta.res == "00000") {
								this.collectStauts="1"
								this.works_data.readerCollect-=1	
							}
							
						}).catch(function(err) {
							//console.log(err)
						})
						
				}else{//执行收藏事件
				var url=this.$store.state.request_url+"/api/map/art/artCollect.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
				this.$http({
							url: this.$store.state.request_url+"/api/map/art/artCollect.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body:{
								opId:this.$store.state.data.memId,//测试参数当前用户Id
								collectOpId:this.works_data.opId,//被收藏的Id
								collectType:this.works_data.artFlag,//类型
								artId:this.works_data.artId,//作品ID
							},
							emulateJSON: false,
					}).then(function(response) {
						if(response.body.meta.res == "00000") {
								this.collectStauts="2"
								Toast({
											message: '收藏成功',
											position: 'middle',
											duration: 2000
										});
								this.works_data.readerCollect+=1		
						       }
						}).catch(function(err) {
							//console.log(err)
						})
				}
			},
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、			
			
			hide() {
				this.m.dad = false
			},
			complaint(arr) {
				console.log("举报111111111111111")
				this.$store.state.input_x = arr;
				this.$store.state.report_data=arr;
				this.mes.is_show = true;
			},
			replyTap(){
				this.$store.state.is_detail="1";
				this.$store.state.commentWorksdata=this.works_data;
				
//				//console.log(this.$store.state.commentWorksdata,'小小小消息')
				
				this.reply.is_reply = true
			},
			
			
			/*举报事件*/
			reportTap(works) {
				//console.log(works)
				this.$store.state.report_works = works;
				
				this.report.is_report = true
			},
			ignoreTap(){
				var url=this.$store.state.request_url+"/api/map/art/artDeny.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
				this.$http({
							url: this.$store.state.request_url+"/api/map/art/artDeny.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								artId: this.works_data.artId,//作品ID
								likeType:this.works_data.artFlag,//类型
								opId:this.$store.state.data.memId,//测试参数当前用户Id
								likeOpId:this.works_data.opId//被被忽略的Id
							},
							emulateJSON: false,
					}).then(function(response) {
						this.$store.state.home_ts = 'no_like'		
				
				        this.$store.state.Display_storage[0] = this.$store.state.home_box
                        
                        this.$store.state.xcs = 0
                        this.$store.state.home_x = 0
						if(this.$store.state.back_id == 1){
							this.$router.push({
								path: '../slider'
											})
						//window.location = '/#/slider'
				}else if(this.$store.state.back_id==2){
					this.$router.push({
							path: '../personal_data'
						})
					//window.location = '#/personal_data'
				}else if(this.$store.state.back_id==3){
					this.$router.push({
							path: '../My_work'
						})
					//window.location = '/#/My_work'
				}else if(this.$store.state.back_id==4){
					this.$router.push({
							path: '../square/Popularity_list'
						})
					//window.location = '/#/Popularity_list'
				}else if(this.$store.state.back_id==5){
					this.$router.push({
							path: '../square/dynamic'
						})
					//window.location = '/#/Popularity_list'
				}else if(this.$store.state.back_id==12){
			  	 this.$router.push({path: '../BS_stack'})
			  }
									
						}).catch(function(err) {
							//console.log(err)
						})
			},
			shouchang(){
				//请求收藏状态	
				//console.log(this.works_data.opId,'1111')
				//console.log(this.works_data.artId,'1111')
				var url=this.$store.state.request_url+"/api/map/art/collectForOpId.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
				this.$http({
					url: this.$store.state.request_url+"/api/map/art/collectForOpId.do?memId="+id+"&ts="+ts,
					method: 'post',
					headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
					},
					body: {
						opId: this.$store.state.data.memId,
						attentionOpId:this.works_data.opId,
						artId:this.works_data.artId
					},
					emulateJSON: false,
					}).then(function(response) {
						//console.log(response.body,'收藏')
						if(response.body.meta.msg == "NO") {
							this.collectStauts="1";
						}else{
							this.collectStauts="2";
						}
						}).catch(function(err) {
							//console.log(err)
						})
						this.da()
			},
			
			Gdoc(){
				console.log("金玛丽")
				this.times_array=[];
				//console.log(this.$store.state.worksId)
				//console.log('获取作品评论')
				var url=this.$store.state.request_url+"/api/map/art/selectByPK.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
				
				
		/*查询作品详情*/
			this.$http({
				url: this.$store.state.request_url+"/api/map/art/selectByPK.do?memId="+id+"&ts="+ts,
				method: 'post',
				headers: {
					"content-type":"application/json;charset=UTF-8",
					'sIgn': sign
				},
				body: {
					artId: this.$store.state.worksId//作品ID
				},
				emulateJSON: false,
			}).then(function(response) {
				
				if(response.body.meta.res == "00000") {
					
					this.works_data = response.body.data;
					if(this.works_data.artFlag=="2"){
						this.is_dynamic=true;
					}
					 
					console.log(this.works_data,'数据详情——————————————')
					   
					if(this.$store.state.xcs == 1){
				        this.replyTap()
				        this.$store.state.xcs = 0
			        }else if(this.$store.state.xcs == 2){
				        this.dashang1()
				        this.$store.state.xcs = 0
			        }
					
					if(this.works_data.opId == this.$store.state.data.memId){
						      this.xiao = false
					}
					
					
					if(this.$store.state.is_tan){
						this.replyTap();
						this.$store.state.is_tan=false;
					}
				
					this.$store.state.works_ads = this.works_data
					
					this.$store.state.A_reward = response.body.data
					
					//console.log(this.works_data,'1212121')
					this.shouchang()
					
					//请求点赞状态
				var url1=this.$store.state.request_url+"/api/map/art/likeForOpId.do";
				var sign1=md5(url1+id+token+ts)
				
				this.$http({
					url: this.$store.state.request_url+"/api/map/art/likeForOpId.do?memId="+id+"&ts="+ts,
					method: 'post',
					headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign1
					},
					body: {
						opId: this.$store.state.data.memId,
						attentionOpId:this.works_data.opId,
						artId:this.works_data.artId
					},
					emulateJSON: false,
					}).then(function(response){
						//console.log("点赞");
						//console.log(response.body);
				
						if(response.body.meta.msg == "NO") {
							this.callStauts="1";
						}else{
							this.callStauts="2";
						}
						this.da()
						}).catch(function(err) {
							//console.log(err)
						})
						
					
					/*查询用户信息*/
					//console.log(response.body.data.opId)
					if(response.body.data.opId) {
						var url2=this.$store.state.request_url+"/api/map/user/artUserInfo.do";
				        var sign2=md5(url2+id+token+ts)
						this.$http({
							url: this.$store.state.request_url+"/api/map/user/artUserInfo.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign2
							},
							body: {
								opId: response.body.data.opId
							},
							emulateJSON: false,
						}).then(function(response) {
							
							if(response.body.meta.res == "00000"){
								//console.log("作品详情");
								this.personal = response.body.data;
								//console.log(this.personal)
							}
						}).catch(function(err){
							//console.log(err)
						})
						this.da()
					}
					
					if(response.body.data.opId) {
						var url3=this.$store.state.request_url+"/api/map/user/introduction.do";
				        var sign3=md5(url3+id+token+ts)
						this.$http({
							url: this.$store.state.request_url+"/api/map/user/introduction.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign3
							},
							body: {
								opId: response.body.data.opId
							},
							emulateJSON: false,
						}).then(function(response) {
							
							if(response.body.meta.res == "00000") {
								//console.log("用户信息");
								this.worksNum = response.body.data.artCount1;
								this.da()
							}
						}).catch(function(err) {
							//console.log(err)
						})
					}
					
					/*查询作品评论*/
					if(response.body.data.artId) {
						var url4=this.$store.state.request_url+"/api/map/art/selectArtDis.do";
				        var sign4=md5(url4+id+token+ts)
						this.$http({
							url: this.$store.state.request_url+"/api/map/art/selectArtDis.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign4
							},
							body: {
								artId: response.body.data.artId,
								parentId:0
							},
							emulateJSON: false,
						}).then(function(response) {
							//console.log("作品评论");
							//console.log(response);
							if(response.body.meta.res == "00000") {
								this.worksComment = response.body.data.artDis;
								this.callStauts_s = []
								for(var i=0;i<this.worksComment.length;i++){
									this.likes(this.worksComment[i])
								}
								//console.log(this.callStauts_s,"************")
								console.log(this.worksComment,'作品评论11111')
								
								if(response.body.data.total == '0'){
									
									this.noa_s=true
								}else{
									
									this.noa_s=false;
									this.jisuan_time();
								}
								this.da()
								
							}
						}).catch(function(err) {
							//console.log(err)
						})
					}
					
				}
			}).catch(function(err) {
				//console.log(err)
			})
			
			
			 this.da()
		},
		/*计算时间*/
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
			
			
			this.da()
			
			}
		},
		
		da(){
		   //console.log(new Swiper,'Swiper加载')
		   new Swiper('.swiper-container',{ 
//		   	   pagination : '.swiper-pagination',
//             paginationClickable: true,
               
               observer:true,//修改swiper自己或子元素时，自动初始化swiper 
               observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                
              pagination: {
                   el: '.swiper-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' +
                 ' of ' +
                 '<span class="' + totalClass + '"></span>';
          },
        },
              
              
              
		   })
		   
		   
		  },

       		/**处理图片*/
		  img_chuli(){
     		var img=new Image();
     		if($("#img_box")[0]){
     		img.src=$("#img_box")[0].currentSrc;
     		
     		//console.log($("#img_box")[0].currentSrc,"......................")
     		/*对比原始比例*/
     		if((img.width/img.height)<(750/700)){
     			
     			$("#img_box").css("width","7.5rem");
     			$("#img_box").css("height","auto");
     				
     		}
     		else if((img.width/img.height)>(750/700)){
     			
     			$("#img_box").css("width","auto");
     			$("#img_box").css("height","7rem");
     			
     		}
     		else{
     			$("#img_box").css("width","7.5rem");
     			$("#img_box").css("height","7rem");
     		}
		  	}
		  },
		},
		mounted(){
			setTimeout(()=>{
    			this.img_chuli()
    		},170)
			

//		   this.yan_zheng()
			this.$store.state.is_bottom=false;

		   
//			this.lunbo_s()
           this.Gdoc()
           
//         this.da()
           
           
//			this.acst = this.$store.state.act;
			
//			//console.log(this.$store.state.worksId+" : "+this.$store.state.worksName);
//		if(this.$store.state.back_id == 3){
//			this.xiao =false
//		}
			
		},
		created(){
			this.$store.state.is_bottom=false;
		}
	

	}
</script>

<style scoped="scoped">
	@import url("../../assets/css/swiper.css");

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
	
	.img1 {
		margin-top: 0.1rem;
		width: 0.5rem;
		height: 0.5rem;
		margin-left: 0.15rem;
		float: left;
	}
	
	.img2 {
		margin-top: 0.25rem;
		min-width: auto;
		height: 0.06rem;
		float: right;
		margin-right: 0.25rem;
	}
	
	.title {
		width: 80%;
		height: 100%;
		float: left;
		font-size: 0.35rem;
		text-align: center;
	}
	/*作品*/
	
	.works_s{
		
		width:7.5rem;
		height:7rem;
		
	}
	
	.works_content {
		margin-top: 0.2rem;
		/*width: 100%;*/
		/*height: 2rem;*/
		overflow: hidden;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
	}
	
	.works_content_title {
		margin-top: 0.15rem;
		font-size: 0.42rem;
		font-weight: bold;
		display: inline-block;
		color: rgba(51, 51, 51, 1);
		/*line-height: 0.165rem;*/
	}
	
	.introduce {
		/*margin-top: 0.25rem;*/
		float: left;
		display: inline-block;
		font-size: 0.25rem;
		color: rgba(51, 51, 51, 1);
		line-height: 0.5rem;
		margin-top: 0.1rem;
	}
	
	.introduce_content {
		margin-top: 0.2rem;
		font-size: 0.29rem;
		
		color: rgba(153, 153, 153, 1);
		line-height: 0.42rem;
		word-break: break-all;
        white-space: normal;
	}
	
	.function {
		margin-top: 0.3rem;
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
		width: 0.5rem;
		height: 0.5rem;
	}
	
	.function_item_left p,
	.function_item_right p {
		font-size: 0.215rem;
		color: rgba(153, 153, 153, 1);
		line-height: 0.5rem;
	}
	
	.function_item_right {
		float: right;
		width: 15%;
		text-align: center;
		height: 100%;
	}
	
	.more_works {
		/*margin-top: 0.5rem;
		*/
		height: 1rem;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
	}
	
	.more_img_left {
		width: 18%;
		height: 100%;
		margin-left: 0.1rem;
		float: left;
	}
	
	.more_img_left img {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
	}
	
	.works_fan {
		width: 50%;
		height: 100%;
		float: left;
	}
	
	.works_infor {
		/*overflow-y: auto;*/
		overflow-x: hidden;
		width: 100%;
		overflow: hidden;
	}
	
	.work_fan_id {
		margin-top: 5%;
		height: 40%;
		font-size: 0.32rem;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 0.165rem;
	}
	
	.work_fan_p {
		
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		
		font-size: 0.26rem;
		color: rgba(177, 177, 177, 1);
	}
	
	.more_right {
		width: 19%;
		margin-top: 5.5%;
		
		float: right;
	}
	
	.more_right p {
		margin-top: 0.1rem;
		float: left;
		font-size: 0.25rem;
		color: rgba(174, 174, 174, 1);
		line-height: 0.165rem;
		
	}
	
	.more_right img {
		width: 0.25rem;
		height: 0.4rem;
		float: right;
	}
	/*评论区*/
	
	.comment_item {
		margin-left: 0.3rem;
    	margin-right: 0.3rem;

		margin-top: 0.3rem;
	}
	
	.athor_infor {
		width: 100%;
		height: 0.6rem;
	}
	
	.athor_icon {
		width: ;
		margin-left: 0.15rem;
		height: 0.6rem;
	}
	
	.athor_icon img {
		width: 0.6rem;
		height: 100%;
		border-radius: 50%;
	}
	
	.athor_name {
		margin-top: 0.25rem;
		float: left;
		font-size: 0.30rem;
		margin-left: 0.16rem;
		color:#333333;
		line-height: 0.165rem;
	}
	
	.athor_div {
		margin-top: 0.225rem;
		float: left;
		margin-left: 0.1rem;
		/*width: 20%;*/
		height: 0.25rem;
		text-align: center;
		background-color: #000000;
		border-radius: 0.05rem;
	}
	
	.athor_text {
		padding: 0.08rem;
		font-size: 0.185rem;
		color: rgba(255, 255, 255, 1);
		line-height: 0.08rem;
	}
	
	.athor_infor_left {
		/*width: 40%;*/
		height: 100%;
		float: left;
	}
	
	.athor_icon {
		float: left;
	}
	
	.athor_infor_right {
		width: 20%;
		height: 100%;
		float: right;
	}
	
	.call {
		margin: 8%;
		width: 50%;
		float: left;
		z-index: 5;
        margin-left:0.48rem;
	}
	
	.call p {
		font-size: 0.3rem;
		color: #D0D0D0;
		float: right;
		line-height: 0.5rem;
		margin-right: 0.1rem;
	
	}
	
	.call img {
		float: right;
		width: 0.32rem;
		height: 0.32rem;
		margin-top: 0.05rem;
	}
	
	.athor_infor_content {
		padding-top: 0.1rem;
		padding-bottom: 0.1rem;
		margin: 0 0.05rem 0 0.85rem;
		overflow: hidden;
	}
	
	.call_right {
		float: right;
		height: 100%;
		margin-top: 0.2rem;
		margin-right: 0.25rem;
	}
	
	.call_right img {
		width: 0.5rem;
		height: 0.4rem;
	}
	
	.athor_infor_content_text {
		
		font-size: 0.29rem;
		color: rgba(153, 153, 153, 1);
		line-height: 0.335rem;
		word-break:break-all;white-space:normal; 
		
	}
	
	.date {
		float: left;
		padding-top: 0.1rem;
		padding-right: 0.2rem;
		font-size: 0.21rem;
		color: rgba(198, 198, 198, 1);
		line-height: 0.335rem;
	}
	
	.more_content {
		width: 100%;
		padding-top: 0.1rem;
		float: left;
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
	
	.footer {
		width: 100%;
		background-color: #fff;
		height: 1.3rem;
		position: fixed;
		bottom: 0;
		-moz-box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
		/* 老的 Firefox */
		box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
	}
	
	.footer p {
		text-align: center;
		font-size: 0.25rem;
		color: rgba(51, 51, 51, 1);
	}
	
	.love {
		width: 50%;
		height: 100%;
		float: left;
	}
	
	.love img {
		width: 1rem;
		margin-top: 0.2rem;
		margin-left: 37%;
		height: 0.95rem;
	}
	
	.ignore {
		width: 50%;
		height: 100%;
		float: left;
	}
	
	.ignore img {
		margin-top: 0.2rem;
		width: 1rem;
		margin-left: 37%;
		height: 0.95rem;
	}
	
	.down {
		
		height: 0.01rem;
		background: #e1e1e1;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
		margin-top: 0.3rem;
	}
	
	.down_xian {
		
		height: 0.01rem;
		background: rgba(246, 246, 246, 1);
		margin: 0.2rem 0;
		
	}
	
	.xian {
		height: 0.2rem;
		width: 100%;
		margin-top: 0.4rem;
		background: rgba(246, 246, 246, 1);
	}
	#app{
		width: 100%;
		
		background: white;
		position: relative;
		z-index: 500;
		/*margin-bottom: 1.35rem;*/
		padding-bottom: 1.3rem;
	}
	.img_no{
		width: 3rem;height:2.5rem;margin: 1.5rem 2.3rem 0;
	}
	.swiper-slide{
		height: 7rem;
		width: 7.5rem;
	}
	.swiper-pagination{
		font-size: 0.3rem;
        color: white;
	}
	.tip{
		margin-top: 0.26rem;
		width: 100%;
		overflow: hidden;
	}
	.tip_item{
		/*//width: 30%;*/
		float: left;margin-right: 0.3rem;
		overflow: hidden;
	}
	.tip_item img{
		float: left;
		width: 0.26rem;
		height: 0.26rem;
	}
	.tip_item p{
		font-size:0.24rem;
		font-family:SimHei;
		display: inline-block;
		margin-left: 0.1rem;
		color:rgba(204,204,204,1);
		line-height:0.26rem;
	}
</style>