<template>
	<div @touchstart='tiao_s' @touchmove='tiao' style="width:100%;height:9.9rem;overflow-y:auto;-webkit-overflow-scrolling : touch;">
		<!--
        	作者：2443611475@qq.com
        	时间：2018-04-10
        	描述：毕业季-热门榜
        -->
		
		<div class="no_article" v-show="this.$store.state.rq_box.length==0">
			<img src="../../../assets/img/icon_noArticle.png" style="width: 100%;height: 100%;" />
			<p>暂无内容</p>
		</div>
		
		<div style="height: auto;overflow-y:auto;overflow-x: hidden;">
		  <div v-show="this.$store.state.rq_box.length!=0" style="float:left;">
			<div style="width: 3.73rem;">
				<div class="img_s" style="width:93%;overflow:hidden;margin-left:0.19rem;height:3rem;width:3.5rem;position: relative;">
					
					<img @load='img_chuli_1'  @click="to_works1" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);min-height:100%;max-height: 150%;" id="img_box_1" :src="no1?no1.picUrl:''" />
				</div>

				<div style="width: 95%;height:1.85rem;margin: 0 auto;position: relative;margin-left: 0.19rem;">
					<p class="bable_ts" style="font-size:0.3rem;padding-top:0.2rem;-webkit-box-orient: vertical;font-weight: 600;">{{no1?no1.artTitle:''}}</p>
					
				  <div class="p_box_s">
				  	 <div class="p_box1" style="">{{no1?no1.nickname:''}}</div>
				  	  <div style="width:0.02rem;height:0.3rem;border-left:0.02rem solid #C0C0C0;float:left;margin-top:0.03rem;"></div>
				  	 <div class="p_box2" style="">&nbsp;{{no1?no1.schoolName:''}}</div>
				  </div>
					
				  <div class="xin_box">
					<img @click="to_no_1" class="inga" :src="ba=='2'?'static/img/icon_detail_good_active.png':'static/img/icon_detail_good_normal.png'" />
					<p class="rq">{{no1?no1.readerLike:''}}</p>
                  </div>
                  
					<!-- 点击爱心按钮弹出 -->
					<div v-show="op1" style="position: absolute;left: 0.03rem;top:1.7rem;z-index: 300;">
						<img class="biao" src="../../../assets/img/zy/icon_graduate_more_left.png" />

						<img @click="likes_to3" class="xt" :src="ba=='2'?'static/img/icon_detail_good_active.png':'static/img/icon_detail_good_normal.png'" />

						<div style="left: 0.8rem;" class="xian"></div>

						<img @click="shou3" class="xt" style="left: 1rem" :src="bs=='2'?'static/img/icon_detail_collect_active.png':' static/img/icon_detail_collect_normal.png'" />

						<div style="left: 1.6rem;" class="xian"></div>
						<img class="xt" style="left: 1.9rem;" src="../../../assets/img/home/icon_detail_share.png"  @click="zhuan_f(no1)"/>
						<div style="left: 2.5rem;" class="xian"></div>
						<img @click="no11" class="xt" style="left: 2.8rem;" src="../../../assets/img/icon_detail_comment.png" />
						<div style="left: 3.4rem;" class="xian"></div>
						<img @click="dashang1" class="xt" style="left: 3.6rem;" src="../../../assets/img/home/icon_detail_tip.png" />
					</div>
					
				</div>
			</div>
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
			<div v-for="(i,index) in no3" class="box_to">
				<div class="img_s" style="width: 93%;overflow: hidden;margin-left: 0.19rem;height:5rem;width: 3.5rem;position: relative;">
					
					<img @click="to_works2(i)" @load='img_chuli_2' style="position: absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:100%;max-height: 150%;" id="img_box_2" :src="i?i.picUrl:''" />
				</div>

				<div style="width: 95%;height:1.85rem;margin: 0 auto;position: relative;margin-left: 0.19rem;">
					<p class="bable_ts" style="font-size:0.3rem;padding-top:0.2rem;-webkit-box-orient: vertical;font-weight: 600;">{{i?i.artTitle:''}}</p>
					
				  <div class="p_box_s">
				  	 <div class="p_box1" style="">{{i?i.nickname:''}}</div>
				  	  <div  style="width:0.02rem;height:0.3rem;border-left:0.02rem solid #C0C0C0;float:left;margin-top:0.03rem;"></div>
				  	 <div class="p_box2" style="">&nbsp;{{i.schoolName}}</div>
				  </div>
					
				  <div class="xin_box">
					<div @click="to_no_2(index)" >
						<img class="inga" v-if="i.likeFlag=='no'" src="static/img/icon_detail_good_normal.png" />
						<img class="inga" v-else src="static/img/icon_detail_good_active.png" />
					</div>
					<p class="rq">{{i?i.readerLike:''}}</p>
                  </div>
					
					
					<!--<p style="font-size: 0.26rem;color: #C0C0C0;">{{i?i.nickname:''}}</p>
					<img @click="to_no_2(index)" class="inga" src="../../../assets/img/home/icon_detail_good_normal.png"/>
					<div @click="to_no_2(index)" >
						<img class="inga" v-if="i.likeFlag=='no'" src="static/img/icon_detail_good_normal.png" />
						<img class="inga" v-else src="static/img/icon_detail_good_active.png" />
					</div>-->

					<!--<p class="rq">{{i?i.readerLike:''}}</p>-->

					<!-- 点击爱心按钮弹出 -->
					<div :class="{no3_to:left_p == index,no3:(left_p == index?false:true)}" style="position: absolute;left: 0.03rem;top:1.7rem;z-index: 500;">
						<img class="biao" src="../../../assets/img/zy/icon_graduate_more_left.png" />

						<div @click="likes_to(i,index)" style="">
							<div >
								<img v-if="i.likeFlag=='no'" src="static/img/icon_detail_good_normal.png" class="xt" />
								<img v-else src="static/img/icon_detail_good_active.png" class="xt" />
							</div>

						</div>

						<div style="left: 0.8rem;" class="xian"></div>
						<div @click="shou_no3(i,index)">
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
						<img @click="dashang2(i)" class="xt" style="left: 3.6rem;" src="../../../assets/img/home/icon_detail_tip.png" />
					</div>
					
				</div>
			</div>

		</div>

<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
			
		<div style="float:right;">

			<div v-for="(i,index) in no2" style="width:3.72rem;">
				<div class="img_s" id="img_s3" style="width: 93%;overflow: hidden;margin-left:0.05rem;height:5rem;width: 3.5rem;overflow: hidden;position: relative;">
					<img @click="to_works3(i)" @load='img_chuli_3' style="position: absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:100%;max-height: 150%;"  id="img_box_3" :src="i?i.picUrl:''" />
				</div>
				<div style="width: 95%;height:1.85rem;margin: 0 auto;position: relative;">
					<p class="bable_ts" style="font-size:0.3rem;padding-top: 0.2rem;-webkit-box-orient: vertical;font-weight: 600;">{{i?i.artTitle:''}}</p>
					
					<div class="p_box_s">
				  	 <div class="p_box1" style="">{{i?i.nickname:''}}</div>
				  	  <div style="width:0.02rem;height:0.3rem;border-left:0.02rem solid #C0C0C0;float:left;margin-top:0.03rem;"></div>
				  	 <div class="p_box2" style="">&nbsp;{{i.schoolName}}</div>
				  </div>
					
				  <div class="xin_box">
					<div @click="right_ps(index)" >
						<img class="inga" v-if="i.likeFlag=='no'" src="static/img/icon_detail_good_normal.png" />
						<img class="inga" v-else src="static/img/icon_detail_good_active.png" />
					</div>
					<p class="rq">{{i?i.readerLike:''}}</p>
                  </div>
					
					
					<!--<p style="font-size: 0.26rem;color: #C0C0C0;">{{i?i.nickname:''}}</p>-->
					<!--<img @click="right_ps(index)" class="inga" src="../../../assets/img/home/icon_detail_good_normal.png" />-->
					
					<!--<div @click="right_ps(index)" >
						<img class="inga" v-if="i.likeFlag=='no'" src="static/img/icon_detail_good_normal.png" />
						<img class="inga" v-else src="static/img/icon_detail_good_active.png" />
					</div>-->

					<!--<p class="rq">{{i?i.readerLike:''}}</p>-->

					<!-- 点击爱心按钮弹出 -->
					<div :class="{no3_to:right_p == index,no3:(right_p == index?false:true)}" style="position: absolute;right: 0rem;z-index: 500;top: 1.7rem;left: -0.9rem;">
						<img class="biao" src="../../../assets/img/zy/icon_graduate_more_right.png" />
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





				</div>
			</div>
		</div>
		
		
		<div style="width: 100%;height:0.8rem;float: left;"></div>
		
		
		</div>
		
		 <div class="more" v-show="this.$store.state.rq_box.length!=0">
				 <p style="color: #D0D0D0;">{{more_text}}</p>
			</div>
		
		
		 <div style="width: 100%;height: 1rem;"></div>
		
		
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
		
	   <!--<div style="position: relative;z-index: 1000;">-->
	   	    <replydialog v-bind:a='reply'></replydialog>
	   <!--</div>-->
		

		
	</div>
</template>

<script>
	import store from '../../../vuex/store.js'
	import { Toast } from 'mint-ui';
	import dashang from '../../home/dashang.vue'
	import md5 from 'js-md5';
	import replydialog from '../../Details_of_the_work/replydialog.vue'
	export default {
		store,
		components: {
			dashang,
			replydialog
		},
		data() {
			return {
				more_text:'加载中',
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
//				more_text: '点击加载更多',
                
               diyix:'',
               diyiy:'',
                
                ye:1,
                shu:6,
                pageSize:'',
               
			}
		},
		methods: {
			Get_content(){ //获取页面数据
				var _this = this;
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
						rows:this.shu,//每一页显示的信息条数
						page:this.ye,//当前要显示的页数
						
						inquiryMode:'popular',
						opId:this.$store.state.data.memId
					}
				}).then(function(response) {
                          
//                        console.log(response.body.meta)
                          
					if(response.body.meta.res == '00000') {
						
//						  console.log(response.body.data,'热门榜数据')
						   
                          this.pageSize = response.body.data.count;
                          
                       if(response.body.data.dataList.length!=0){
                       	   for(var i = 0; i < response.body.data.dataList.length; i++) {
							   this.$store.state.rq_box.push(response.body.data.dataList[i])
						   }
                       }
						 
//						 console.log(this.$store.state.rq_box,'数据信息777777777777777777777777777777777777777')
						 
						if((this.pageSize-1)==this.$store.state.rq_box.length){
							 this.more_text = '已经没有更多了'
						}
						
						
             	 var a= this.$store.state.rq_box
             	 var res = [];
                 var json = {};
                 for(var i = 0; i < a.length; i++){//数组去重
                    if(!json[a[i].artId]){
                       res.push(a[i]);
                          json[a[i].artId] = 1;
                      }
                   }
                 this.$store.state.rq_box=res	
               
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

//						console.log(this.$store.state.rq_box, '页面数据')
//                   }
					}
				}).catch(function(err) {
					console.log(err)
				})
				///////////////////作品 ，点赞、收藏， 查询///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

			},
			
			tiao_s(){
				let ev = ev||event
				this.diyix = ev.touches[0].clientX;
			    this.diyiy = ev.touches[0].clientY;
			},
			tiao(event){
				let ev = ev||event
				let dierx = ev.touches[0].clientX;
				let diery = ev.touches[0].clientY;
				  	var cdx = dierx-this.diyix
				  	var cdy = diery-this.diyiy
				  	let box_to = document.getElementsByClassName('box_to')
				  	 if(Math.abs(cdx)<Math.abs(cdy)&&cdy<0){
				  	 	
				  	 	
				  	 	
				  	   	if(box_to[box_to.length-1].getBoundingClientRect().bottom/100+'rem'<=16+"rem"){
				  	   	   if(this.pageSize>this.$store.state.rq_box.length){
				  	   	   	 // console.log(this.ye)
				  	   	   	   this.shu = 4;
				  	   	   	   this.ye+=1;
				  	   		   this.Get_content();
				  	   	   }
				  	   	}
				  	 }
			     },
			
		img_chuli_1(){
     		var img=new Image();
     		if($("#img_box_1")[0]){
     		img.src=$("#img_box_1")[0].currentSrc;
     		
     		/*对比原始比例*/
     		if((img.width/img.height)<(350/300)){
     			$("#img_box_1").css("width","3.5rem");
     			$("#img_box_1").css("height","auto");
     		}
     		else if((img.width/img.height)>(350/300)){
     			
     			$("#img_box_1").css("width","auto");
     			$("#img_box_1").css("height","3rem");
     		}
     		else{
     			$("#img_box_1").css("width","3.5rem");
     			$("#img_box_1").css("height","3rem");
     		}
		  }
		  },
		img_chuli_2(){
     		var img=new Image();
     		if($("#img_box_2")[0]){
     		img.src=$("#img_box_2")[0].currentSrc;
     		/*对比原始比例*/
     		if((img.width/img.height)<(350/500)){
     			
     			$("#img_box_2").css("width","3.5rem");
     			$("#img_box_2").css("height","auto");
     		}
     		else if((img.width/img.height)>(350/500)){
     			$("#img_box_2").css("width","auto");
     			$("#img_box_2").css("height","5rem");
     		}
     		else{
     			$("#img_box_2").css("width","3.73rem");
     			$("#img_box_2").css("height","5rem");
     		}
     		
     		let box = document.getElementsByClassName('img_s')[1]//视口
     		let imgs = document.getElementById('img_box_2')//图片
     		
     		let img_bottom_top = imgs.getBoundingClientRect().bottom//图片底部距离可视区域顶部的距离
     	    let box_top_bottom = box.getBoundingClientRect().top//视口距离可视区域顶部的距离
     	   
     	    box.style.height = img_bottom_top-box_top_bottom+'px'
     	   }
		  },
		img_chuli_3(){
     		var img=new Image();
     		if($("#img_box_3")[0]){
     		img.src=$("#img_box_3")[0].currentSrc;
     		
//   		console.log($("#img_box_3")[0].currentSrc,"......................")
     		/*对比原始比例*/
     		if((img.width/img.height)<(350/500)){
     			$("#img_box_3").css("width","3.5rem");
     			$("#img_box_3").css("height","auto");
     			//
//   			console.log(1,'yy')
     		}
     		else if((img.width/img.height)>(350/500)){
     			$("#img_box_3").css("width","auto");
     			$("#img_box_3").css("height","5rem");
//   			console.log(2,'yy')
     		}
     		else{
     			$("#img_box_3").css("width","3.5rem");
     			$("#img_box_3").css("height","5rem");
//   			console.log(3,'yy')
     		}
     		
     		let box = document.getElementsByClassName('img_s')[2]//视口
     		let imgs = document.getElementById('img_box_3')//图片
     		
     		let img_bottom_top = imgs.getBoundingClientRect().bottom//图片底部距离可视区域顶部的距离
     	    let box_top_bottom = box.getBoundingClientRect().top//视口距离可视区域顶部的距离
     	   
     	    box.style.height = img_bottom_top-box_top_bottom+'px'
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
		
			likes_to(index,i){ //左侧点赞事件
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
						likeOpId: this.$store.state.data.memId //当前用户Id
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
                          this.no3[i].likeFlag = 'yes'
						  this.no3[i].readerLike+=1
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
						this.no3[i].readerLike-=1
					}
				}).catch(function(err) {console.log(err)})
//////////////////////////////////////////////////////////////////////////////						
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			
			likes_to_ss(index,i){ //左侧点赞事件
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
						likeOpId: this.$store.state.data.memId //当前用户Id
					},
					emulateJSON: false,
				}).then(function(response) {
//					console.log(response.body)
					if(response.body.meta.res == "00000") {
						 this.no2[i].likeFlag = 'yes'
						  this.no2[i].readerLike+=1
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
                        this.no2[i].likeFlag = 'no'
						this.no2[i].readerLike-=1
					}
				}).catch(function(err) {console.log(err)})
//////////////////////////////////////////////////////////////////////////////						
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			
			dashang1() {
				this.$store.state.dashangtype = '6'
				
				 this.$store.state.is_bottom = false
				
				this.$store.state.dashang = true
				this.to_no_1()
				this.$store.state.is_comment_dashang=false;//恢复打赏作品
//				this.$store.state.Return_to_return = 4
				this.$store.state.A_reward = this.no1
				this.$store.state.A_reward.artFlag = '1'
//				console.log(this.$store.state.A_reward, '打赏信息——————===----')
               this.$store.state.Return_to_return = 5
                 this.$router.push({
						path: '../square/dynamic'
						});
			},
			dashang2(i) {
				this.$store.state.dashangtype = '6'
				 this.$store.state.is_bottom = false
				this.to_no_2()
				this.$store.state.dashang = true
//				this.$store.state.Return_to_return = 4
				this.$store.state.A_reward = i
				this.$store.state.is_comment_dashang=false;//恢复打赏作品
				this.$store.state.A_reward.artFlag = '1'
//				console.log(this.$store.state.A_reward, '打赏信息——————===----')
                this.$store.state.Return_to_return = 5
                 this.$router.push({
						path: '../square/dynamic'
						});
			},
			dashang3(i) {
				this.$store.state.dashangtype = '6'
				 this.$store.state.is_bottom = false
				this.right_ps()
				this.$store.state.dashang = true
//				this.$store.state.Return_to_return = 4
				this.$store.state.A_reward = i
				this.$store.state.is_comment_dashang=false;//恢复打赏作品
				this.$store.state.A_reward.artFlag = '1'
//				console.log(this.$store.state.A_reward, '打赏信息——————===----')
                  this.$store.state.Return_to_return = 5
                 this.$router.push({
						path: '../square/dynamic'
						});
			},

			to_works1() { //进入作品详情1
				this.$store.state.back_id = 51
				this.$store.state.Author_s_detailed_routing = 2
				this.$store.state.worksId = this.no1.artId
				this.$store.state.worksName="毕业季"
				this.$router.push({
					path: '../works_detail'
				});
				this.$store.state.tr = 0
			},
			to_works2(i) { //进入作品详情2
				this.$store.state.Author_s_detailed_routing = 2
				this.$store.state.back_id = 51
				this.$store.state.worksId = i.artId
				this.$store.state.worksName="毕业季"
				this.$router.push({
					path: '../works_detail'
				});
				this.$store.state.tr = 0
			},
			to_works3(i) { //进入作品详情3
				this.$store.state.Author_s_detailed_routing = 2
				this.$store.state.back_id = 51
				this.$store.state.worksId = i.artId
				this.$store.state.worksName="毕业季"
				this.$router.push({
					path: '../works_detail'
				});
				this.$store.state.tr = 0
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
			no11() { //第一名-点击评论事件
				this.to_no_2()
				//				this.inps = true
				//				this.inps_act = this.no1
				//				this.$store.state.input_x.disUser = this.no1.nickname
				this.$store.state.commentWorksdata = this.no1;
                this.$store.state.is_bottom = false
				//				console.log(this.$store.state.commentWorksdata,'小小小消息')

				this.reply.is_reply = true
			},

			xian(i) { //点击评论--弹出输入框
				this.to_no_2()
				
				this.$store.state.commentWorksdata = i;
                 this.$store.state.is_bottom = false
				this.reply.is_reply = true
				
			},

			xiao() {
				this.inps = false
			},
			
			shou_no3(index,i){ //左侧收藏事件
				
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
						collectType: "5", //类型
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
					body:{
						opId: this.$store.state.data.memId, //当前用户Id
						artId: index.artId, //作品ID
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						
						this.no3[i].collectFlag = 'no'
					} 
				}).catch(function(err) {console.log(err)})
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
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
						collectOpId: index.opId, //被收藏的Id
						collectType: "5", //类型
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
					body:{
						opId: this.$store.state.data.memId, //当前用户Id
						
						artId: index.artId, //作品ID
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						
						this.no2[i].collectFlag = 'no'
					} 
				}).catch(function(err) {console.log(err)})
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
			likes_to2(index){//右侧点赞事件
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
						likeType: "5",
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
						collectType: "5", //类型

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
				
//				console.log(this.$store.state.rq_box)
				
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
						artId:this.$store.state.rq_box[0].artId,
						likeType: "5",
						opId:this.$store.state.rq_box[0].opId,
						likeOpId: this.$store.state.data.memId, //当前用户Id
					},
					emulateJSON: false,
				}).then(function(response) {
					  
                       console.log(response)

					if(response.body.meta.res == "00000") {
						this.ba = "2"
						Toast({
							message: '点赞成功',
							position: 'middle',
							duration: 2000
						});
						this.$store.state.rq_box[0].readerLike+=1
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
					if(response.body.meta.res == "00000"){
						this.ba = "1"
						this.$store.state.rq_box[0].readerLike-=1
					} 
				}).catch(function(err) {console.log(err)})  
					
///////////////////////////////////////////////////////////////////////////////////////////////						
			   }
				}).catch(function(err) {
					console.log(err)
				})
			},

			shou3(){ //第一收藏事件
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
						collectType: "5", //类型
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
						this.bs = "1";
					} 
				}).catch(function(err) {console.log(err)})
////////////////////////////////////////////////////////////////////////////////////////////
				}
				}).catch(function(err) {
					console.log(err)
				})
			},

			to_no_1() { //第一名点击爱心弹出-- 框

				if(this.op1) {
					this.op1 = false
				} else {
					this.op1 = true
				}
				this.left_p = 'x'
				this.right_p = 'p'
			},
			to_no_2(index) { //第3名点击爱心弹出-- 框
				this.right_p = 'p'
				this.op1 = false
				if(this.left_p == index) {
					this.left_p = 'p'
				} else {
					this.left_p = index
				}
			},
			right_ps(index) {
				this.left_p = 'p'
				this.op1 = false
				if(this.right_p == index) {
					this.right_p = 'p'
				} else {
					this.right_p = index
				}
			},

			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		  

		},

		mounted() {
		 
				
		  
		  console.log(localStorage.xuey_sss,localStorage.lei_sss,localStorage.yer_sss)
		  
		  
//				arr.push("全部")
            this.$store.state.rq_box = []
            
			this.$store.state.is_bottom = true;
//			console.log(this.$store.state.rq_box, '该页面数据')
			this.Get_content()

			setTimeout(()=>{
//  			this.img_chuli_1()
//              this.img_chuli_2()
//               this.img_chuli_3()
    		},170)
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
	.xin_box{
		position: relative;
		width: 100%;
		height: 0.5rem;
		margin-top: 0.15rem;
	}
	.p_box1{
		font-size:0.26rem;color:#C0C0C0;float: left;float:left;
		/*padding-top: 0.05rem;*/
		padding-right:0.1rem;
	}
	.p_box2{
		font-size:0.26rem;color:#C0C0C0;float:left;
		/*padding-top: 0.05rem;*/
		padding-left: 0.05rem;
		/*border-left:0.02rem solid #C0C0C0;*/
	}
	.p_box_s{
		width: 100%;
		height: 0.4rem;
		margin-top: 0.1rem;
	}
	
	.bable_ts {
		width: 2.7rem;
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
		width: 0.3rem;
		/*height: 0.36rem;*/
		float: left;
		margin-top: 0.023rem;
	}
	
	.box_to {
		width: 3.72rem;
	}
	
	.rq {
		/*background: red;*/
		/*width: 1rem;*/
		text-align: center;
		font-size: 0.24rem;
		color: #A2A2A2;
		float: left;
		margin-left: 0.1rem;
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
		text-align: center;
		background-color: #fff;
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
		padding-top: 0.1rem;
		width: 100%;
		height: 1rem;
		font-size: 0.3rem;
		text-align: center;
		background-color: #fff;
	}
</style>