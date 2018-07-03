<template>
	<div>
		
		<div v-show="xian_s" id="box_s">
		 	<div  class="zhe_1" style="">
				  <div style="width:100%;height: 0.07rem;"></div>
				  <p style="font-size: 0.35rem;margin-top: 0.45rem;color:#8C939D;line-height:1rem;">你当前是“游客状态”无法获得该页面信息，是否立即去</p>
					<p @click="shan_chu" class="pss">登录?</p>
			</div>
		 </div>
		
		<div class="gong_class">
			
			 
			
			<div style="width: 92%;height: 3.4rem; margin-left: 4%;margin-right: 4%;">
		    	<div class="h_box">
		    		<h6 style="font-size: 0.5rem;margin-bottom: 0.2rem;margin-top: 0.1rem;">{{$store.state.detailed_information.nickname}}</h6>

		    		<p class="p_ss" style="font-size: 0.26rem;color: #ABABAB;width: 100%;height: 0.4rem;overflow: hidden;">
		    			{{$store.state.detailed_information.signature?$store.state.detailed_information.signature:'还未填写简介'}}
		    		</p>
		    	
		    	  <div style="width: 100%;height:1rem;">
		    	  	
		    	  	  <span @click="to_My_fans" style="font-size: 0.3rem;height: 100%;float: left;margin-top: 0.2rem;text-align:center;">
		    	  	  	 <p style="font-size: 0.35rem;font-weight: 600;">{{($store.state.detailed_information.opFans>=1000)?$store.state.detailed_information.opFans/1000+'k':$store.state.detailed_information.opFans}}</p>
		    	  	  	 <p style="font-size: 0.26rem;">粉丝</p>
		    	  	  </span>
		    	  	  
		    	  	  <span @click="to_My_attention" style="font-size: 0.3rem;height: 100%;float: left;text-align:center;margin-top: 0.2rem;margin-left: 0.5rem;">
		    	  	  	 <p style="font-size: 0.35rem;font-weight: 600;">{{($store.state.detailed_information.opAttention>=1000)?$store.state.detailed_information.opAttention/1000+'k':$store.state.detailed_information.opAttention}}</p>
		    	  	  	 <p style="font-size: 0.26rem;">关注</p>
		    	  	  </span>
		    	  	  
		    	  	  <span @click="to_My_work" style="font-size: 0.3rem;height: 100%;float: left;margin-top: 0.2rem;margin-left: 0.5rem;text-align:center;">
		    	  	  	 <p style="font-size: 0.35rem;font-weight: 600;">{{(z>=1000)?z/1000+'k':z}}</p>
		    	  	  	 <p style="font-size: 0.26rem;">作品</p>
		    	  	  </span>
		    	  	  
		    	  	  <span @click="to_My_leisure" style="font-size: 0.3rem;text-align:center;height: 100%;float: left;margin-top: 0.2rem;margin-left: 0.5rem;">
		    	  	  	 <p style="font-size: 0.35rem;font-weight: 600;">{{(x>=1000)?x/1000+'k':x}}</p>
		    	  	  	 <p style="font-size: 0.26rem;">闲情</p>
		    	  	  </span>
		    	  	
		    	  </div>
		    	  
		    	</div>
		    	
		    	<div class="img_box">
		    		
		    		<div class="box_imgs" style="position: relative;">
		    		     <img id="img" @load="img_load" class="img_class" :src="$store.state.detailed_information.opPic" />
		    		</div>
		    		
		    	    <button @click="information_to">修改资料</button>
		    	</div>
		    	
		    </div>
			<div style="width: 100%;height: 0.2rem; background-color: #f1f1f1;"></div>
			<div @click="to_mywallet" class="boxa">
				<img class="imgtos" src="../../assets/img/wodeixnxi/icon_my_purse.png" alt="" />
				 <p style="float: left;margin-left: 0.4rem;line-height: 1.1rem;">我的钱包</p>
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;" />
			</div>
			
			<div @click="to_Myarticle" class="boxa">
				<img class="imgtos" src="../../assets/img/wodeixnxi/icon_my_article.png" alt="" />
				 <p style="float: left;margin-left: 0.4rem;line-height: 1.1rem;">我的文章</p>
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;" />
			</div>
			
			<div @click="to_My_friend" class="boxa">
				<img class="imgtos" src="../../assets/img/wodeixnxi/icon_my_friend.png" alt="" />
				 <p style="float: left;margin-left: 0.4rem;line-height: 1.1rem;">好友列表</p>
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;" />
			</div>
			
			<div @click="to_Mycollection" class="boxa">
				<img class="imgtos" src="../../assets/img/wodeixnxi/icon_my_collection.png" alt="" />
				 <p style="float: left;margin-left: 0.4rem;line-height: 1.1rem;">我的收藏</p>
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;" />
			</div>
			<div style="width: 100%;height: 0.2rem; background-color: #f1f1f1;"></div>
			<div class="boxa" @click="pay">
				<img class="imgtos" src="../../assets/img/wodeixnxi/icon_my_vip.png" alt="" />
				 <p style="float: left;margin-left: 0.4rem;line-height: 1.1rem;">觅艺会员</p>
				<!-- <i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;" class="fa fa-angle-right"></i>-->
				<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;" />
			</div>
			
			<div @click="to_setfocus" class="boxa">
				<img class="imgtos" src="../../assets/img/wodeixnxi/icon_my_setting.png" alt="" />
				 <p style="float: left;margin-left: 0.4rem;line-height: 1.1rem;">设置中心</p>
				<!-- <i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;" class="fa fa-angle-right"></i>-->
				<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;" />
			</div>
			
			<div class="boxa" @click="zhinan">
				<img class="imgtos" src="../../assets/img/wodeixnxi/icon_my_article.png" alt="" />
				 <p style="float: left;margin-left: 0.4rem;line-height: 1.1rem;">新手指引</p>
				 <!--<i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;" class="fa fa-angle-right"></i>-->
				 <img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;" />
			</div>
			
			<!--<div class="boxa">
				<img class="imgtos" src="../../assets/img/wodeixnxi/icon_my_id.png" alt="" />
				 <p style="float: left;margin-left: 0.5rem;">身份认证</p>
				 <i style="float: right;margin-top: 0.23rem;font-size: 0.5rem;" class="fa fa-angle-right"></i>
			</div>-->
			
		
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default{
		store,
		 data(){
			return{
			    xian_s:false,
			}
		},
		 methods:{
		 	shan_chu(){
				 this.$router.push({
						path: '/home'
				 }); 
			},
		 	
		 	information_to(){
//            window.location = '#/information'	
              this.$router.push({
						path: '../information'
						});
		  },
		  to_My_work(){
//		  	 window.location = '#/My_work'
		  	  this.$router.push({
						path: '../My_work'
						});
		  },
		  to_My_leisure(){
//		  	 window.location = '#/My_leisure'
		  	  this.$router.push({
						path: '../My_leisure'
						});
		  },
		  to_My_attention(){
//		  	 window.location = '#/My_attention'
		  	  this.$router.push({
						path: '../My_attention'
						});
		  },
		  to_My_fans(){
//		  	 window.location = '#/My_fans'
		  	  this.$router.push({
						path: '../My_fans'
						});
		  },
		  to_My_friend(){
		  	this.$store.state.adcal = 2
		  	
//		  	 window.location = '#/My_friend'
		  	 this.$router.push({
						path: '../My_friend'
						});
		  },
		  to_mywallet(){
//		  	window.location = '#/mywallet'
		  	this.$router.push({
						path: '../mywallet'
						});
		  },
		  to_Mycollection(){
//		  	window.location = '#/Mycollection'
		  	this.$router.push({
						path: '../Mycollection'
						});
		  },
		  to_setfocus(){
//		  	window.location = '#/setfocus'
		  	this.$router.push({
						path: '../setfocus'
						});
		  },
		  to_Myarticle(){
//		  	window.location = '#/Myarticle'
		  	this.$router.push({
						path: '../Myarticle'
						});
		  },
		  zhinan(){//新手指南
		  		this.$router.push({
						path: '../user_guide'
						});
		  },
		  pay(){
//		  	this.$router.push({
//						path: '../pay'
//						});
		  },
		  
		  Get_content_a(){//页面刷新获取数据
		  	 //console.log( this.$store.state.detailed_information,this.$store.state.data.memId,'我的详细信息')
		  	    var url=this.$store.state.request_url+"/api/map/user/artUserInfo.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
		  	
		  	
		  	this.$http({
				url: this.$store.state.request_url+"/api/map/user/artUserInfo.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				emulateJSON: false,
				method: 'post',
				body:{
					opId:this.$store.state.data.memId
				}
			}).then(function(response) {
				  
				if(response.body.meta.res == '00000'){
                    this.$store.state.detailed_information = response.body.data
                    
                    localStorage.opPic = response.body.data.opPic
                    
   this.$store.state.detailed_information.education=(this.$store.state.detailed_information.education=='null')?'':this.$store.state.detailed_information.education
   this.$store.state.detailed_information.opSex=(this.$store.state.detailed_information.opSex=='null')?'':this.$store.state.detailed_information.opSex                 
   this.$store.state.detailed_information.signature=(this.$store.state.detailed_information.signature=='null')?'':this.$store.state.detailed_information.signature
   this.$store.state.detailed_information.opBirthDay=(this.$store.state.detailed_information.opBirthDay=='null')?'':this.$store.state.detailed_information.opBirthDay
   this.$store.state.detailed_information.opConstellation=(this.$store.state.detailed_information.opConstellation=='null')?'':this.$store.state.detailed_information.opConstellation
   this.$store.state.detailed_information.education=(this.$store.state.detailed_information.education=='null')?'':this.$store.state.detailed_information.education
   this.$store.state.detailed_information.profession=(this.$store.state.detailed_information.profession=='null')?'':this.$store.state.detailed_information.profession
   this.$store.state.detailed_information.schoolName=(this.$store.state.detailed_information.schoolName=='null')?'':this.$store.state.detailed_information.schoolName
   this.$store.state.detailed_information.languageLevel=(this.$store.state.detailed_information.languageLevel=='null')?'':this.$store.state.detailed_information.languageLevel
   
   this.$store.state.detailed_information.introduction=(this.$store.state.detailed_information.introduction=='null')?'':this.$store.state.detailed_information.introduction
   
                    //console.log(this.$store.state.detailed_information,'页面刷新获取数据')
                    
                    if(response.body.data.hobby!=null){
                    this.$store.state.Hobby_box[0] = (response.body.data.hobby.hobbyInfo[0]==null)?[]:response.body.data.hobby.hobbyInfo[0].hobbyText.split(",")
                    this.$store.state.Hobby_box[1] = (response.body.data.hobby.hobbyInfo[1]==null)?[]:response.body.data.hobby.hobbyInfo[1].hobbyText.split(",")
                    this.$store.state.Hobby_box[2] = (response.body.data.hobby.hobbyInfo[2]==null)?[]:response.body.data.hobby.hobbyInfo[2].hobbyText.split(",")
                    this.$store.state.Hobby_box[3] = (response.body.data.hobby.hobbyInfo[3]==null)?[]:response.body.data.hobby.hobbyInfo[3].hobbyText.split(",")
                    this.$store.state.Hobby_box[4] = (response.body.data.hobby.hobbyInfo[4]==null)?[]:response.body.data.hobby.hobbyInfo[4].hobbyText.split(",")
                    this.$store.state.Hobby_box[5] = (response.body.data.hobby.hobbyInfo[5]==null)?[]:response.body.data.hobby.hobbyInfo[5].hobbyText.split(",")
                    this.$store.state.Hobby_box[6] = (response.body.data.hobby.hobbyInfo[6]==null)?[]:response.body.data.hobby.hobbyInfo[6].hobbyText.split(",")
//                  this.$store.state.Hobby_box[7] = (response.body.data.hobby.hobbyInfo[7]==null)?[]:response.body.data.hobby.hobbyInfo[7].hobbyText.split(",")
                    
                    
                    for(var i=0;i<this.$store.state.Hobby_box.length;i++){
                    	 for(var j=0;j<this.$store.state.Hobby_box[i].length;j++){
                    		if(this.$store.state.Hobby_box[i][j] ==''){
                    			this.$store.state.Hobby_box[i].splice(j,1)
                    		}
                    	}
                    }
                    
                    }else if(response.body.data.hobby==null){
                    	
                    	 this.$store.state.Hobby_box = [[],[],[],[],[],[],[]]
                    	 
                    }
                    
                    this.$store.state.nian_biao = response.body.data.opArtHistory.artHistory//传递艺术年表数据
                    
				}else if(response.body.meta.msg=="该用户不存在！"){
					this.$router.push({
						path: '/swiper2'
					});  
				}
			}).catch(function(err){
				
				
			 })
		  	
		  	var url1=this.$store.state.request_url+"/api/map/art/selectFlag.do";
		  	
		  var sign1 = md5(url1+id+token+ts)
		  
		  //获取作品数据   、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
		  	this.$http({
				url: this.$store.state.request_url+"/api/map/art/selectFlag.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign1
				},
				emulateJSON: false,
				method: 'post',
				body:{
					opId:this.$store.state.data.memId,
					typeId:'1',
					page:1,
					rows:100
				}
			}).then(function(response){
				  //console.log(response.body,'1111')
				if(response.body.meta.res == '00000'){
                   this.$store.state.actives_zp = response.body.data
                   // console.log(this.$store.state.actives_zp,'作品')
				}
			}).catch(function(err){
				//console.log(err)
			})
		  },
		  /**处理头像*/
		  img_load(){
		  	 var img=new Image();
				img.src=$("#img")[0].src;
				if(img.width<img.height){
					$("#img").css("width","1.5rem");$("#img").css("height","auto");
				}else{
					$("#img").css("width","auto");$("#img").css("height","1.5rem");
				}
		  },
		  s_q(){
//获取闲情数据、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、............................		  	
		  	    var url=this.$store.state.request_url+"/api/map/art/selectFlag.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
		  	this.$http({
				url: this.$store.state.request_url+"/api/map/art/selectFlag.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				emulateJSON: false,
				method: 'post',
				body:{
					opId:this.$store.state.data.memId,
//					token:this.$store.state.data.tokEn,
					typeId:'2'
				}
			}).then(function(response){
				if(response.body.meta.res == '00000'){
                    this.$store.state.actives_xq = response.body.data
				}
			}).catch(function(err){
				//console.log(err)
			 })
		   },
		 },
		mounted(){
			this.s_q()
			if(this.$store.state.data.memId == undefined || this.$store.state.data.memId == "" || this.$store.state.data.memId == null) {
			
                this.xian_s = true
			}
			this.$store.state.is_bottom=true;
			this.Get_content_a()
		},
		computed:{
			z(){
				//console.log(this.$store.state.actives_zp.pageSize,"作品数")
				return this.$store.state.actives_zp.pageSize
			},
			x(){
				return this.$store.state.actives_xq.pageSize
			},
		}
	}
</script>

<style scoped="scoped">
	.h_box{
		width: 65%;
		height: 100%;
		box-sizing: border-box;
		padding-top: 0.5rem;
		float: left;
	}
	.img_box{
		width: 35%;
		height: 100%;
		float: left;
		position: relative;
	}
	.box_imgs{
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		overflow: hidden;
		margin: 0.6rem 0.35rem 0.3rem;
	}
	
	.img_box button{
		width: 1.5rem;
		height: 0.5rem;
		font-size: 0.26rem;
		margin: 0 0.35rem;
		border: none;
		border: 0.01rem solid black;
		background: white;
		border-radius: 0.1rem;
	}
	.boxa{
		    width: 92%;
    		height: 1.1rem;
    		margin-left: 4%;
    		margin-right: 4%;
    		font-size: 0.3rem;
    		font-weight: bold;
    		line-height: 1rem;
	}
	.imgtos{
		width: 0.36rem;
		height: 0.36rem;
		margin-top: 0.37rem;
		float: left;
		
	}
	.gong_class{
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
    	padding-bottom: 1.1rem;
		}
		.img_class{
			 min-width: 100%;
			 max-width: 150%;
			 min-height: 100%;
			 max-height: 150%;
			 position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.p_ss{
			            overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;

		}
		.zhe_1{
		width: 5rem;
		height: 3.2rem;
		background: rgb(246, 246, 246);;
		margin: 0 auto;
		border-radius: 0.2rem;
		text-align: left;
		position: absolute;
		top: 4rem;
		left: 18%;
	}
	.pss{
		font-size: 0.35rem;
		color: #ff9d00;
		position: absolute;
		top: 1.775rem;
		/*right: 0.5;*/
		right:0.25rem;
	}
	#box_s{
		width: 7.5rem;
		height: 90%;
		background: whitesmoke;
		position: fixed;
		top: 0;
		z-index: 1000;
	}
</style>