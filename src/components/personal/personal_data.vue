<template>
	<div id="app">

		<div class="big_content">
		  
			<img @click="huis" class="img1" src="../../assets/img/icon_detail_back.png" />
			<!--<div class="img_bg">
				<div  style="overflow: hidden;" class="bg_user">
				</div>
				<div></div>
			</div>-->
			 
			 <div class="bei_jin">
			 	 <img class="img_ss" style="min-width:100%;max-width:150%;" :src="$store.state.personal_c.opPic" />
			 </div>
			
			<div  class="userUrl" style="overflow:hidden;z-index:6;">
			  	<img @load='img_chuli' id="img_box" style="" :src="$store.state.personal_c.opPic"/>
			</div>
			
			<div class="content">
				<div class="personal_text">
					<p class="id">{{$store.state.personal_c.nickname}}</p>
					<div class="follow" style="">
						<div class="fensi" style="margin-left:12%">
							<p style="text-align: right;">粉丝：</p>
							<p>{{$store.state.personal_c.opFans}}</p>
						</div>
						<div class="shu"></div>
						<div class="guangzhu">
							<p style="margin-left: 0.2rem;">关注：</p>
							<p>{{$store.state.personal_c.opAttention}}</p>
						</div>
					</div>
					<div class="follow1">
						<div class="call" style="margin-left: 0.5rem;">
							<p>赞：</p>
							<p>{{$store.state.personal_c.artCount1}}</p>
						</div>

						<div class="collect">
							<p>收藏：</p>
							<p>{{$store.state.personal_c.artCount2}}</p>
						</div>

						<div class="share">
							<p>转发：</p>
							<p>{{$store.state.personal_c.artCount3}}</p>
						</div>
					</div>
					<p class="sign">{{$store.state.personal_c.signature?$store.state.personal_c.signature:'还未填写简介'}}</p>
				     
				     
				 <div v-show="this.$store.state.worksOpId!=this.$store.state.data.memId">  
				 	
				    <!--关注-->
				     <div @click="guanzu" v-if="g==2||g==4" class="box_1s" style="text-align: center;">
				     	
				     	<!--<img style="width: 0.3rem;float: left;margin-left:0.27rem;margin-top: 0.13rem;" src="../../assets/img/zl/icon_file_add.png" alt="" />-->
				        <p style="font-size: 0.27rem;line-height: 0.6rem;">关注</p>
				     </div>
				     
				   <!--已关注-->
				     <div @click="xian_ss" v-else-if="g==3" class="box_1s" style="width: 1.8rem;text-align: center;" >
				     	
				     	<!--<img style="width: 0.3rem;float: left;margin-left:0.27rem;margin-top: 0.13rem;" src="../../assets/img/zl/icon_file_added.png" alt="" />-->
				        <p style="font-size: 0.27rem;line-height: 0.6rem;color: #ffa009;">取消关注</p>
				     </div>
				     
				     
					<!--互为好友--> 
				<div v-else="g==1" style="width:3.3rem;height: 0.6rem;margin: 0.3rem auto;">
					
					 <div  @click="xian_ss" class="box_1s" style="float: left;margin: 0;text-align: center;" >
				     	<!--<img style="width: 0.3rem;float: left;margin-left:0.27rem;margin-top: 0.13rem;" src="../../assets/img/zl/icon_file_friends.png" alt="" />-->
				        <p style="font-size: 0.27rem;line-height: 0.6rem;color: #ffa009;">取消好友</p>
				    </div>
					<div @click="chat_to" class="box_1s" style="float:right;margin: 0;text-align: center;" >
				     	<!--<img style="width: 0.3rem;float: left;margin-left:0.27rem;margin-top: 0.13rem;" src="../../assets/img/zl/icon_file_chat.png" alt="" />-->
				        <p style="font-size: 0.27rem;line-height: 0.6rem;">发送私信</p>
				    </div> 	
				</div>
			</div> 		 
					 
				</div>
				<div class="xian"></div>
				<div class="tab">

					<div class="swiper-container">
						<div class="swiper-wrapper">
							<div @click="li1" class="swiper-slide">
								<div @click="li1" :class="{lis:act.noa1,listo:act.noe1}">
									<p>资料</p>
									<div :class="{move:act.noa1,defultTo:act.noe1}"></div>
								</div>
							</div>
							<div @click="li2" class="swiper-slide">
								<div :class="{lis:act.noa2,listo:act.noe2}">
									<p>作品</p>
									<div :class="{move:act.noa2,defultTo:act.noe2}"></div>
								</div>
							</div>
							<div @click="li3" class="swiper-slide">
								<div :class="{lis:act.noa3,listo:act.noe3}">
									<p>闲情</p>
									<div :class="{move:act.noa3,defultTo:act.noe3}"></div>
								</div>
							</div>
							<div @click="li6" class="swiper-slide">
								<div :class="{lis:act.noa6,listo:act.noe6}">
									<p>相册</p>
									<div :class="{move:act.noa6,defultTo:act.noe6}"></div>
								</div>
							</div>
							<div @click="li4" class="swiper-slide">
								<div :class="{lis:act.noa4,listo:act.noe4}">
									<p>文章</p>
									<div :class="{move:act.noa4,defultTo:act.noe4}"></div>
								</div>
							</div>
							<div @click="li5" class="swiper-slide">
								<div :class="{lis:act.noa5,listo:act.noe5}">
									<p>评论</p>
									<div :class="{move:act.noa5,defultTo:act.noe5}"></div>
								</div>
							</div>
							
						</div>

					</div>

				</div>
				<datacontent v-show="act.noe1"></datacontent>
				<workscontent v-show="act.noe2"></workscontent>
				<diarycontent v-show="act.noe3"></diarycontent>
				<articlecontent v-show="act.noe4"></articlecontent>
				<commentbigcontent v-show="act.noe5"></commentbigcontent>
				<photoscontent v-show="act.noe6"></photoscontent>
				
				 <dashang v-show='$store.state.dashang' ></dashang>
			</div>
		</div>

		<!--<div class="footer">
			<div  class="follw_btn" @click="followTap">
				<img src="../../assets/img/icon_detail_focous.png" />
				<p>{{reply_content}}</p>
			</div>
		</div>-->
		
		<commnetcontent v-show="$store.state.is_comment"></commnetcontent>
		
		
		
		<div v-show="xian_s" class="zhe"  @touchmove.prevent  @click="quxiao_ss">
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 1.9rem;">
					<p style="font-size:0.32rem;">确定不再关注他了吗?</p>
				</div>
				<div style="width:100%;height:0.96rem;border-top:0.02rem solid #E0E0E0;line-height: 0.96rem;">
					<div @click="quxiao_huanzu" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.32rem;">
						 确定
					</div>
					<div @click="quxiao_ss" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.32rem;color: #CCCCCC;">
						 取消
					</div>
				</div>
			</div>
		</div>
		
		
		
		
		
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import datacontent from './data.vue'
	import workscontent from './works.vue'
	import diarycontent from './diary.vue'
	import articlecontent from './article.vue'
	import commentbigcontent from './comment.vue'
	import photoscontent from './photos.vue'
	import swiper from '../../../static/js/swiper.js'
	import store from '../../vuex/store.js'
	import commnetcontent from '../commnet_content.vue'
	import md5 from 'js-md5';
	import dashang from '../home/dashang.vue'
	
	export default {
		store,
		components: {
			//个人资料    作品      闲情      文章    相册    评论作品      评论
			datacontent,
			workscontent,
			diarycontent,
			articlecontent,
			photoscontent,
			commnetcontent,
			commentbigcontent,
			dashang,
		},
		data() {
			return {
				is_if: false,

				act: {
					noa1: false,
					noe1: true,
					noa2: true,
					noe2: false,
					noa3: true,
					noe3: false,
					noa4: true,
					noe4: false,
					noa5: true,
					noe5: false,
					noa6: true,
					noe6: false
				},
				reply_content: '申请关注',
                xian_s:false,
			}

		},
		methods: {
		img_chuli(){
//   		var img=new Image();
//   		if($("#img_box")[0]){
//   		img.src=$("#img_box")[0].currentSrc;
//   		
//   		//console.log($("#img_box")[0].currentSrc,"......................")
//   		/*对比原始比例*/
//   		if((img.width/img.height)<(298/298)){
//   			
//   			$("#img_box").css("width","2.98rem");
//   			$("#img_box").css("height","auto");
//   				
//   		}
//   		else if((img.width/img.height)>(298/298)){
//   			
//   			$("#img_box").css("width","auto");
//   			$("#img_box").css("height","2.98rem");
//   			
//   		}
//   		else{
//   			$("#img_box").css("width","2.98rem");
//   			$("#img_box").css("height","2.98rem");
//   		}
//		  	}
		  },
			
			
			
			chat_to(){
                this.$store.state.chat_item.fromOpId = this.$store.state.personal_c.opId
                this.$store.state.chat_item.fromNiceName = this.$store.state.personal_c.nickname
                this.$store.state.chat_item.fromOpPic = this.$store.state.personal_c.opPic
                
			    this.$router.push({
						path: '../chat_to_s'
						});
			},
			
			huis(){
				this.$store.state.xlss=1
				//console.log(this.$store.state.Author_s_detailed_routing)
				
				if(this.$store.state.Author_s_detailed_routing == 1){
						this.$router.push({
						path: '../works_detail'
						});
				}else if(this.$store.state.Author_s_detailed_routing == 2){
					this.$router.push({
						path: '../square/Popularity_list'
						});
				}else if(this.$store.state.Author_s_detailed_routing == 3){
					this.$router.push({
						path: '../Mycollection/works'
						});
					//跳转至我的收藏
				}else if(this.$store.state.Author_s_detailed_routing == 4){
					
					this.$router.push({
						path: '../My_fans'
						});//跳转至我的粉丝
				}else if(this.$store.state.Author_s_detailed_routing == 5){
					
					this.$router.push({
						path: '../My_friend'
						});//跳转至我的好友列表
				}else if(this.$store.state.Author_s_detailed_routing == 6){
					 
					this.$router.push({
						   path: '../square/dynamic'
						});//跳转至朋友圈
				}else if(this.$store.state.Author_s_detailed_routing == 7){
					this.$router.push({
						   path: '../My_attention'
						});//跳转至我的关注
				}else if(this.$store.state.Author_s_detailed_routing == 8){
					this.$router.push({
						   path: '../Details_of_the_article'
						});//跳转至文章详情
				}
				
			},
			backTo() {
				this.$router.push({
						path: '../regiter_information'
						});
				

			},
			confirm() {
				this.is_if = !this.is_if
				//console.log(this.is_if)
			},
			li1(){
				this.act.noa1 = false;
				this.act.noe1 = true;
				this.act.noa2 = true;
				this.act.noe2 = false
				this.act.noa3 = true;
				this.act.noe3 = false
				this.act.noa4 = true;
				this.act.noe4 = false;
				this.act.noa5 = true;
				this.act.noe5 = false;
				this.act.noa6 = true;
				this.act.noe6 = false;
			},
			li2(){
				 /*作品*/
				this.act.noa1 = true;
				this.act.noe1 = false
				this.act.noa2 = false;
				this.act.noe2 = true
				this.act.noa3 = true;
				this.act.noe3 = false
				this.act.noa4 = true;
				this.act.noe4 = false
				this.act.noa5 = true;
				this.act.noe5 = false;
				this.act.noa6 = true;
				this.act.noe6 = false;
			},
			li3() {
				 /*日记*/
				this.act.noa1 = true;
				this.act.noe1 = false
				this.act.noa2 = true;
				this.act.noe2 = false
				this.act.noa3 = false;
				this.act.noe3 = true
				this.act.noa4 = true;
				this.act.noe4 = false
				this.act.noa5 = true;
				this.act.noe5 = false;
				this.act.noa6 = true;
				this.act.noe6 = false;
			},
			li4() {
				 /*文章*/
				this.act.noa1 = true;
				this.act.noe1 = false
				this.act.noa2 = true;
				this.act.noe2 = false
				this.act.noa3 = true;
				this.act.noe3 = false
				this.act.noa4 = false;
				this.act.noe4 = true
				this.act.noa5 = true;
				this.act.noe5 = false;
				this.act.noa6 = true;
				this.act.noe6 = false;
			},
			li5() {
			 /*评论*/
				this.act.noa1 = true;
				this.act.noe1 = false
				this.act.noa2 = true;
				this.act.noe2 = false
				this.act.noa3 = true;
				this.act.noe3 = false
				this.act.noa4 = true;
				this.act.noe4 = false
				this.act.noa5 = false;
				this.act.noe5 = true;
				this.act.noa6 = true;
				this.act.noe6 = false;
			},
			li6() {
				 /*相册*/
				this.act.noa1 = true;
				this.act.noe1 = false
				this.act.noa2 = true;
				this.act.noe2 = false
				this.act.noa3 = true;
				this.act.noe3 = false
				this.act.noa4 = true;
				this.act.noe4 = false
				this.act.noa5 = true;
				this.act.noe5 = false;
				this.act.noa6 = false;
				this.act.noe6 = true;
			},
			swipers() {
				new swiper('.swiper-container', {
					slidesPerView: 6,
					centeredSlides: false,
					
				})
			},
			followTap() {
				if(this.reply_content == "申请关注"){
				var url=this.$store.state.request_url+"/api/map/art/addAttention.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
					
					this.$http({
						url: this.$store.state.request_url+"/api/map/art/addAttention.do?memId="+id+"&ts="+ts,
						method: 'post',
						headers: {
							"content-type": "application/json;charset=UTF-8",
							'sIgn': sign
						},
						body: {
							opId: this.$store.state.data.memId, //当前用户ID(储存的memId)
							attentionOpId:this.$store.state.worksOpId, //被关注用户Id(首页传入)
							attentionType: "1" //关注类型

						},
						emulateJSON: false,
					}).then(function(response) {
						//console.log(response);
						if(response.body.meta.msg == "ok"||response.body.meta.msg == "已经关注了！") {
						
							this.reply_content = "取消关注"
						}
					}).catch(function(err) {
						//console.log(err)
					})
				}else if(this.reply_content == "取消关注"){
					var url=this.$store.state.request_url+"/api/map/art/cancelAttention.do";
					var sign = md5(url+id+token+ts)
					
					this.$http({
						url: this.$store.state.request_url+"/api/map/art/cancelAttention.do?memId="+id+"&ts="+ts,
						method: 'post',
						headers: {
							"content-type": "application/json;charset=UTF-8",
							'sIgn': sign
						},
						body: {
							opId: this.$store.state.data.memId, //当前用户ID(储存的memId)
							attentionOpId: this.$store.state.worksOpId //被关注用户Id(首页传入)
						},
						emulateJSON: false,
					}).then(function(response) {
						this.reply_content = "申请关注"
//						if(response.body.meta.msg == "已经关注了！") {
//							//console.log("关注成功");
//							this.reply_content = "取消关注"
//						}
					}).catch(function(err) {
						//console.log(err)
					})
				}

			},
         
         chaxun(){
         	var url=this.$store.state.request_url+"/api/map/art/attentionSuccessForPairOpId.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
         	
         	this.$http({
				url: this.$store.state.request_url+"/api/map/art/attentionSuccessForPairOpId.do?memId="+id+"&ts="+ts,
				method: 'post',
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				body:{
					opId:this.$store.state.data.memId,//作者id
					attentionOpId:this.$store.state.worksOpId//被关注的Id
				},
				emulateJSON: false,
			}).then(function(response) {
				//console.log(response.body,"关注查询");
				if(response.body.meta.msg == "NO") {
					this.reply_content = "申请关注"
//					this.$store.state.personal_c = response.body.data;
					////console.log(this.$store.state.personal_c.opPic);
				}else{
					this.reply_content = "取消关注"
				}
			}).catch(function(err) {
				//console.log(err)
			})
         },
         
         
         guanzu(){//申请关注
         	var url=this.$store.state.request_url+"/api/map/art/addAttention.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
					
					this.$http({
						url: this.$store.state.request_url+"/api/map/art/addAttention.do?memId="+id+"&ts="+ts,
						method: 'post',
						headers: {
							"content-type": "application/json;charset=UTF-8",
							'sIgn': sign
						},
						body: {
							opId: this.$store.state.data.memId, //当前用户ID(储存的memId)
							attentionOpId:this.$store.state.worksOpId, //被关注用户Id(首页传入)
							attentionType: "1" //关注类型

						},
						emulateJSON: false,
					}).then(function(response) {
						console.log(response.body.meta)
						if(response.body.meta.msg == "ok") {
							
							
//							this.$store.state.personal_c.relationship=response.body.data.relationship
								 this.$store.state.personal_c.relationship = response.body.data.relationship
								
								
						}else{
							Toast({
							message: response.body.meta.msg,
							position: 'middle',
							duration: 2000
						});
						}
					}).catch(function(err) {
						//console.log(err)
					})
         },
         
         quxiao_huanzu(){//取消关注
	            var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
					var url1=this.$store.state.request_url+"/api/map/art/cancelAttention.do";
					var sign1 = md5(url1+id+token+ts)
					
					this.$http({
						url: this.$store.state.request_url+"/api/map/art/cancelAttention.do?memId="+id+"&ts="+ts,
						method: 'post',
						headers: {
							"content-type": "application/json;charset=UTF-8",
							'sIgn': sign1
						},
						body: {
							opId:this.$store.state.data.memId, //当前用户ID(储存的memId)
							attentionOpId: this.$store.state.worksOpId //被关注用户Id(首页传入)
						},
						emulateJSON: false,
					}).then(function(response){
						//console.log(response.body.meta)
					  if(response.body.meta.msg == "ok") {
//						   	   this.$store.state.personal_c.relationship=response.body.data.relationship
						   	   this.$store.state.personal_c.relationship = response.body.data.relationship
						   	   
						   	   //console.log(response.body.data.relationship,'777777777777777777777777')
						   	   this.quxiao_ss()
						}
					}).catch(function(err) {
						//console.log(err)
					})
			},
         
         xian_ss(){
         	this.xian_s = true
         },
         quxiao_ss(){
         	this.xian_s = false
         },
         
         
		},
		computed:{
			g(){
				return this.$store.state.personal_c.relationship
			}
		},
		mounted() {
			if(this.$store.state.xlss==6){
				this.li6()
			}else if(this.$store.state.xlss==4){
				this.li4()
			}else if(this.$store.state.xlss==3){
				this.li3()
			}else if(this.$store.state.xlss==2){
				this.li2()
			}else if(this.$store.state.xlss==1){
				this.li1()
			}
			
			//console.log(this.$store.state.worksOpId,'作者id')
			if(this.$store.state.worksOpId == this.$store.state.data.memId){
				this.$store.state.guanzhu = false
			}
			    this.swipers();
			//console.log(this.$store.state.worksOpId);
			var url=this.$store.state.request_url+"/api/map/user/artUserInfo.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
			this.$http({
				url: this.$store.state.request_url+"/api/map/user/artUserInfo.do?memId="+id+"&ts="+ts,
				method: 'post',
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				body: {
					opId:this.$store.state.worksOpId,//作者id
					loginOpId: this.$store.state.data.memId
				},
				emulateJSON: false,
			}).then(function(response) {
				//console.log(response.body.data);
				if(response.body.meta.res == "00000") {

					this.$store.state.personal_c = response.body.data;
					
					//console.log(this.$store.state.personal_c.relationship,'好友判断');
					
					
				}
			}).catch(function(err) {
				//console.log(err)
			})
			 this.chaxun()
		}
       
	}
</script>

<style scoped="scoped">
	@import url("../../assets/css/swiper.css");
	#app {
		overflow-x: hidden;
		position: relative;
		z-index: 300;
		width: 100%;
		background: white;
	}
	li{
		list-style-type: none;
	}
	
	p,
	ul {
		margin: 0;
		padding: 0;
	}
	
	workscontent{
		width: 100%;
	}
	
	.img1 {
		z-index: 12;
		position: fixed;
		width: 0.5rem;
		height: 0.5rem;
		top: 0.2rem;
		left: 0.2rem;
		border-radius: 50%;
		z-index: 9999;
	}
	
	.img_bg{
		width: 100%;
		height: 3.19rem;
		z-index: -5;
	}
	.img_bg div{
		width: 100%;
		height: 5rem;
		z-index: 2;
		background-color: #707070;
		position: absolute;
		top: 0;
		left: 0;
		filter: Alpha(Opacity=60);
		opacity: 0.6;
	}
	
	.bg_user {
		width: 100%;
		height: 100%;
		z-index: -1;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.userUrl{
		   width: 1.8rem;
    height: 1.8rem;
    padding-bottom: 0;
    position: relative;
    z-index: 6;
    left: 38%;
    top: 2rem;
    border: 0.03rem solid white;
    border-radius: 50%;
		
		
	}
	
	.personal_text {
		margin-top: 0.7rem;
		width: 100%;
		text-align: center;
		height:3rem;
		
	}
	
	.follow {
		width: 50%;
    margin:0.1rem auto;
    height: 0.4rem;
	}
	
	.follow1 {
		    width: 60%;
    	margin: 0.1rem 20% 0;
		height: 0.35rem;
	}
	.follow1 p{
		font-size: 0.28rem;
	}
	
	.follow p {
		font-size: 0.3rem;
		font-family: SimHei;
		color: rgba(51, 51, 51, 1);
		line-height: 0.25rem;
	}
	
	.id {
		font-size: 0.4rem;
		font-family: SimHei;
		color: rgba(51, 51, 51, 1);
		line-height: 0.5rem;
		font-weight: 600;
	}
	
	.fensi {
		
		float: left;
	}
	
	.fensi p,
	.guangzhu p {
		float: left;
	}
	
	.guangzhu {
		
		float: left;
	}
	
	.shu {
		width: 1%;
		float: left;
		margin-left: 0.2rem;
		height: 60%;
		background-color: #2E3135;
	}
	
	.call,
	.collect,
	.share {
		
		float: left;
		font-size: 0.3rem;
		font-family: SimHei;
		text-align: right;
		margin-left: 0.3rem;
		color: rgba(188, 188, 188, 1);
		line-height: 0.165rem;
	}
	
	.call p,
	.collect p,
	.share p {
		float: left;
	}
	
	.sign {
		font-size: 0.3rem;
		font-family: SimHei;
		color: rgba(188, 188, 188, 1);
		line-height: 0.315rem;
	}
	/*tab菜单*/
	
	.swiper-slide {
		margin-top: 0.25rem;
	}
	
	.tab {
		width: 90%;
		height: 1rem;
		text-align: center;
		margin: 0.2rem 5% 0.1rem;
		border-bottom: rgba(247, 247, 247, 1) solid 1px;
	}
	
	.tab ul {
		width: 100%;
		height: 100%;
	}
	
	.lis {
		float: left;
		font-size: 0.35rem;
		color: #D0D0D0;
		margin-right: 0.25rem;
	}
	
	.listo {
		float: left;
		font-size: 0.35rem;
		color: #000000;
		margin-right: 0.25rem;
		font-weight: 600;
	}
	
	.move {
		width: 80%;
		margin-left: 15%;
		margin-top: 0.5rem;
		height: 0.1rem;
	}
	
	.defultTo {
		width: 80%;
		margin-left: 15%;
		margin-top: 0.2rem;
		background-color: #ff9d00;
		height: 0.06rem;
		border-radius: 0.1rem;
	}
	
	.footer {
		width: 100%;
		height: 1.8rem;
		position: fixed;
		bottom: 0;
		z-index: 300;
		background-color: #fff;
		text-align: center;
		-moz-box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
		/* 老的 Firefox */
		box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
	}
	
	.follw_btn {
		width: 1.5rem;
		height: 1.4rem;
		margin: 0.2rem auto;
	}
	
	.follw_btn img {
		width: 0.9rem;
		height: 0.9rem;
		margin: 0 auto;
		border-radius: 50%;
	}
	
	.follw_btn p {
		font-size: 0.3rem;
		font-family: SimHei;
		color: rgba(51, 51, 51, 1);
		line-height: 0.335rem;
	}
	
	.big_content {
		width: 100%;
		overflow: hidden;
		position: relative;
	}
	
	.content {
		width: 100%;
		margin-top: 2rem;
		background-color: #fff;
		z-index: 5;
	}
	
	.xian {
		height: 0.2rem;
		width: 100%;
		background: rgba(247, 247, 247, 1);
	}
	.box_1s{
		width: 1.5rem;
		height: 0.6rem;
		border: 0.01rem solid #dfdfdf;
		margin: 0.3rem auto;
		border-radius: 0.1rem;
	}
	.bei_jin{
		width: 100%;
		height: 3.19rem;
		position: absolute;
		top: 0;
		background:white;
		z-index: 2;
		overflow: hidden;
	}
	.img_ss{
		
            filter: blur(25px);    
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
	#img_box{
		position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);
		min-width:160%;height: auto;max-width: 200%;
	}
</style>