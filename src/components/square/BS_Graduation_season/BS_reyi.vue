<template>
	<div id="app"  @touchstart='tiao_s' @touchmove='tiao' style="width:100%;height:9.9rem;overflow-y:auto;-webkit-overflow-scrolling : touch;padding-bottom:3rem;">
      <!--<div style="width: 100%;height: 1.7rem;"></div>-->
         
         <div class="no_article" v-show="act.length==0">
			<img src="../../../assets/img/icon_noArticle.png" style="width: 100%;height: 100%;" />
			<p>暂无内容</p>
		</div>
         
      
		<div v-for="(i,index) in act"  class="box">
		   <div  class="box_img">
		   	    <img @click="to_xiang(i)" @load='img_chuli_1' id="img_box_1" class="imgs_ss" :src="i.picUrl"/>
		   </div>
		    <div style="width: 95%;margin: 0 auto;padding-top: 0.2rem;position:relative;">
		    	<p style="font-size:0.36rem;">{{i.artTitle}}</p>
		    	<div style="color: #999999;margin-top: 0.1rem;">
		    		<div class="p_x1">{{i.realName}}</div>
		    		 <div v-show="i.realName!=''&&i.realName!=null&&i.schoolName!=''&&i.schoolName!=null" class="is"></div>
		    		<div class="p_x2">{{i.schoolName}}</div>
		    	</div>
		    	
		    	<div  @click="right_ps(index)" class="ai_xin">
		    		<p style="font-size: 0.27rem;float: right;color: #A2A2A2;">{{i.readerLike}}</p>
		    		<!--<img style="float: right;width: 0.32rem;margin-right:0.1rem;margin-top:0.05rem;" src="../../../assets/img/icon_detail_good_normal.png"/>-->
		    		      
		    		     <img style="float: right;width: 0.32rem;margin-right:0.1rem;margin-top:0.05rem;" v-if="i.likeFlag=='no'" src="static/img/icon_detail_good_normal.png" />
						 <img style="float: right;width: 0.32rem;margin-right:0.1rem;margin-top:0.05rem;" v-else src="static/img/icon_detail_good_active.png" />
		    		     
		    	</div>
		    	    
		    	 
<!------------------描述：点击爱心按钮弹出-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
		    	 
		    	 <div :class="{no3_to:right_p == index,no3:(right_p == index?false:true)}" style="position: absolute;right: 0rem;z-index: 500;top: 0.9rem;left:2.8rem;">
						<img class="biao" src="../../../assets/img/icon_ground_box2.png" />
						
						<div @click="likes_to_ss(i,index)" style="">
							<div >
								<img v-if="i.likeFlag=='no'" src="static/img/icon_detail_good_normal.png" class="xt" />
								<img v-else src="static/img/icon_detail_good_active.png" class="xt" />
							</div>
						</div>
						
						<div style="left: 0.8rem;" class="xian"></div>
						
						<div @click="shou_no2(i,index)">
							<div >
								<img v-if="i.collectFlag=='no'" src="static/img/icon_detail_collect_normal.png" class="xt" style="left: 1rem" />
								<img v-else src="static/img/icon_detail_collect_active.png" class="xt" style="left: 1rem" />
							</div>
						</div>
						
						<div style="left: 1.6rem;" class="xian"></div>
						<img class="xt" style="left: 1.9rem;" src="../../../assets/img/icon_detail_share.png"  @click="zhuan_f(i)"/>
						<div style="left: 2.5rem;" class="xian"></div>
						<img @click="xian(i)" class="xt" style="left: 2.8rem;" src="../../../assets/img/icon_detail_comment.png" />
						<div style="left: 3.4rem;" class="xian"></div>
						<img @click="dashang3(i)" class="xt" style="left: 3.6rem;" src="../../../assets/img/home/icon_detail_tip.png" />
					</div>
					
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->		   
            	
		    	<div class="pingluns" v-for="(i,index) in i.commentDate" style="width:101%;font-size: 0.29rem;float:left;margin-top: 0.1rem;">
		    		<p style="float:left;">{{i.userName}}：</p><p style="color:#999999;">{{i.comment}}</p>
		    	</div>
		    	
		    	<div @click="to_xiang(i)" v-show="i.readerDiscuss!=0" style="height:0.4rem;color:#C0C0C0;line-height:0.4rem;margin-top:0.1rem;float: left;">
		    		<p  style="font-size:0.24rem;float: left;">查看全部{{i.readerDiscuss}}条评论</p>
		    		<img style="width: 0.12rem;float: left;margin-left: 0.1rem;margin-top: 0.07rem;" src="../../../assets/img/right_icon.png"/>
		    	</div>
		    </div>
		   <div style="width: 100%;height: 0.2rem;background: #F2F2F2;float:left;margin-top: 0.2rem;"></div>
		</div>
		
		<div v-show='act.length!=0' class="more">
				<p style="color: #D0D0D0;line-height: 1rem;">{{more_text}}</p>
		</div>
		 
		 
		 <replydialog v-bind:a='reply'></replydialog>
		 <dashang v-show='$store.state.dashang'></dashang>
		 
	</div>
</template>

<script>
	import router from '../../../router/index.js';
	import { Toast } from 'mint-ui';
	import md5 from 'js-md5';
	import dashang from '../../home/dashang.vue'
	import replydialog from '../../Details_of_the_work/replydialog.vue'
	export default{
		router,
		components: {
			dashang,
			replydialog
		},
		data(){
			return{
				act:[],
				page:1,
				yeshu:3,
				more_text:'加载中',
				pageSize:'',
				left_p:'x',
				ba: 'r',
				right_p: 'x',
				reply:{
					is_reply: false
				},
			}
		},
		
		mounted(){
			this.Get_content()
		},
		methods:{
			right_ps(index) {
				this.left_p = 'p'
				if(this.right_p == index) {
					this.right_p = 'p'
				} else {
					this.right_p = index
				}
			},
			
			
			dashang3(i) {
				this.$store.state.dashangtype = '6'
				this.$store.state.is_bottom = false
				this.right_ps()
				this.$store.state.dashang = true
				this.$store.state.Return_to_return = 5
				this.$store.state.A_reward = i
				this.$store.state.is_comment_dashang=false;//恢复打赏作品
				this.$store.state.A_reward.artFlag = '1'
				
				this.$router.push({
						path: '../square/dynamic'
						});
			},
			
			xian(i) { //点击评论--弹出输入框
				this.right_ps()
				this.$store.state.commentWorksdata = i;
                 this.$store.state.is_bottom = false
				this.reply.is_reply = true
				
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
							forwardType: "5",
							artId: i.artId
						},
						emulateJSON: false,
					}).then(function(response) {

						if(response.body.meta.res == "00000") {

							//console.log(response.body.data.forwardUrl,"1000000000000000000000000")
							this.$store.state.share_url=response.body.data.forwardUrl
							
							this.$store.state.share_title=response.body.data.title
							this.$store.state.share_content=response.body.data.synopsis
							this.$store.state.share_img=response.body.data.picUrl
							this.$store.state.tableList.share();
						}
					}).catch(function(err) {
							console.log(err)
					})
					
					}, 
			shou_no2(index,i){ 
				
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
						collectOpId:index.opId, //被收藏的Id
						collectType:"5", //类型
						artId: index.artId, //作品ID
					},
					emulateJSON: false,
				}).then(function(response) {
					
					console.log(response.body.meta)
					
					if(response.body.meta.res == "00000") {
                        this.act[i].collectFlag = 'yes';
                        this.right_ps()
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
					body:{
						opId: this.$store.state.data.memId, //当前用户Id
						
						artId: index.artId, //作品ID
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						
						this.act[i].collectFlag = 'no'
					} 
				}).catch(function(err) {console.log(err)})
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			likes_to_ss(index,i){ //左侧点赞事件
				console.log(index.artId,index.opId,this.$store.state.data.memId)
				
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
						likeType: "5",
						opId: index.opId,
						likeOpId:this.$store.state.data.memId //当前用户Id
					},
					emulateJSON: false,
				}).then(function(response) {
//					console.log(response.body)
					if(response.body.meta.res == "00000") {
						 this.act[i].likeFlag = 'yes'
						  this.act[i].readerLike+=1
						Toast({
							message: '点赞成功',
							position: 'middle',
							duration: 2000
						});
						this.right_ps()
						
					} else {
 /////////////////////////////取消点赞//////////////////////////////////////////////// ////////////////////////////////////////
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
                        this.act[i].likeFlag = 'no'
						this.act[i].readerLike-=1
					}
				}).catch(function(err){console.log(err)})
//////////////////////////////////////////////////////////////////////////////						
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			
			
			to_no_2(index) { //第3名点击爱心弹出-- 框
				if(this.left_p == index) {
					this.left_p = 'p'
				} else {
					this.left_p = index
				}
			},
			
			
			to_xiang(i){
				if(localStorage.yous=='true'){
					
				}else{
				this.$store.state.Author_s_detailed_routing = 6
				this.$store.state.worksId = i.artId
				this.$store.state.tr = 5
				this.$store.state.back_id = 51
				this.$store.state.worksName="毕业季"
				this.$router.push({
					path: '../works_detail'
				});
				}
				
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
				let box_to = document.getElementsByClassName('box')
				
				 this.right_ps()
				
				if(Math.abs(cdx) < Math.abs(cdy) && cdy < 0) {
					
					if(box_to[box_to.length - 1]){
//					$("#lan").css("opacity", "0");
//                  console.log(box_to[box_to.length - 1].getBoundingClientRect().top)
					if(box_to[box_to.length - 1].getBoundingClientRect().top / 100 + 'rem' <= 16 + 'rem') {
						if(this.pageSize > this.act.length ) {
							this.more_text="加载中"
							this.page++;
							this.yeshu = 2;
							
							if(localStorage.yous=='true'){
//								this.huoqus_s()
							}else{
								this.Get_content()
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
				}else{
//					$("#lan").css("opacity", "1");
				}
			},
			
		 img_chuli_1(){//处理图片展示
     		var img=new Image();
     		if($(".imgs_ss")){
     		img.src=$(".imgs_ss").currentSrc;
     		/*对比原始比例*/
     		if((img.width/img.height)<(750/421)){
     			$(".imgs_ss").css("width","7.5rem");
     			$(".imgs_ss").css("height","auto");
     		}
     		else if((img.width/img.height)>(750/421)){
     			$(".imgs_ss").css("width","auto");
     			$(".imgs_ss").css("height","4.21rem");
     		}
     		else{
//   			$(".imgs_ss").css("width","7.5rem");
//   			$(".imgs_ss").css("height","4.21rem");
     		}
		   }
//   	    var app = document.getElementById('app')
//   		var height_s = document.documentElement.clientHeight;
//   		console.log(height_s,'高度')
//   		
//   		app.style.paddingBottom = height_s/6.5+'px'
		  },
		  
		  Get_content(){ //获取页面数据
				//		  		this.$store.state.rq_box = null
				var _this = this;
				
				console.log(localStorage.lei_sss,localStorage.xuey_sss,localStorage.yer_sss,'7777777777777777777777')
				
				var url = this.$store.state.request_url + "/api/mapPlazaManager/graduationSeasonDisplay.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/graduationSeasonDisplay.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						artType:(localStorage.lei_sss==undefined)?null:((localStorage.lei_sss=='全部')?null:localStorage.lei_sss.split(",")),//作品分类
						schoolName:(localStorage.xuey_sss==undefined)?null:localStorage.xuey_sss,//学校名称
						graduatedYear:(localStorage.yer_sss==undefined)?null:localStorage.yer_sss,//毕业年份

//                      artType:['艺术爱好者'],
//                      artType:['油画'],
//                      schoolName:null,
//                      graduatedYear:null,
                         
						rows:this.yeshu,//每一页显示的信息条数
						page:this.page,//当前要显示的页数
						
						inquiryMode:'discussion',
						opId:this.$store.state.data.memId
					}
				}).then(function(response) {
                     
                     console.log(response.body)
                     
					if(response.body.meta.res == '00000') {
						 
						  this.pageSize = response.body.data.count
                          
						for(var i = 0; i < response.body.data.dataList.length; i++) {
							this.act.push(response.body.data.dataList[i])
						}
						
             	 var a= this.act
             	 var res = [];
                 var json = {};
                 for(var i = 0; i < a.length; i++){//数组去重
                    if(!json[a[i].artId]){
                       res.push(a[i]);
                          json[a[i].artId] = 1;
                      }
                   }
                 this.act = res	
                 
//               console.log(this.act,'数据888888888888888888888888888888888')
                 
                 
               }
		    })
		  
		  },
		  
		  
		  
		},
		
		
	}
</script>

<style scoped="scoped">
	.ai_xin{
		height: 0.5rem;
		width: 2rem;
		position: absolute;
		right: 0;
		top: 0.53rem;
	}
	.is{
		height: 0.27rem;
		border-left:0.025rem solid #999999;
		float:left;
		margin-top: 0.05rem;
		margin-right: 0.2rem;
	}
	.p_x1{
		font-size: 0.26rem;
		float: left;
		padding-right: 0.2rem;
	}
	.p_x2{
		font-size: 0.26rem;
		float: left;
		/*padding-left: 0.2rem;*/
	}
	.box{
		float: left;
		width: 100%;
		/*overflow: hidden;*/
	}
	.box_img{
		width:7.5rem;
        height:4.21rem;
        overflow: hidden;
        vertical-align: middle;
        text-align: center;
        position: relative;
	}
	.imgs_ss{
		position: absolute;top:50%; left:50%;
		transform: translate(-50%,-50%);
		/*min-height:100%;max-height:150%;*/
		min-width: 100%;max-width: 130%;
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
	.pingluns{
		
	}
	.no3 {
		display: none;
	}
	.no3_to {
		display: block;
	}
	.xian {
		height: 0.35rem;
		border-left: 0.03rem solid white;
		position: absolute;
		top: 0.33rem;
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
</style>