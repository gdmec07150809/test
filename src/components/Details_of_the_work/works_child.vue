<template>
	<div v-show="m.dad" id="app" >
		<div @click="hide" style="width: 100%;position:fixed;top: 0;left: 0;background:rgba(0,0,0,0.4);z-index:4;" >

		
		<div class="return_text">
			<div @click.stop="showD($store.state.worksCommentContent)">
				<div class="athor_infor" >
				<div class="athor_infor_left">
					<div class="athor_icon">
						<img :src="$store.state.worksCommentContent.disUserPic" />
					</div>
					<p class="athor_name">{{$store.state.worksCommentContent.disUser}}</p>
					<div class="athor_div">
						<p class="athor_text" v-if="$store.state.worksCommentContent.identification=='剪刀手'">{{$store.state.worksCommentContent.identification}}</p>
					</div>
				</div>
				<div class="athor_infor_right">
					<div @click="pin_lun($store.state.worksCommentContent)" class="call">
						<p>{{$store.state.worksCommentContent.disLike}}</p>
						<img src="../../assets/img/icon_comment_good.png" />
					</div>
					<!--<div class="call_right">
						<img src="../../assets/img/icon_comment_translation.png" />
					</div>-->
				</div>
			</div>
			
			
			
			<div style="" class="athor_infor_content">
				<p style="width: 96%;margin-bottom: 0.1rem;margin-left: 0.14rem;" class="athor_infor_content_text">{{$store.state.worksCommentContent.disContent}}</p>
				<p class="date">{{str}}</p>
			</div>
			</div>
			<div class="hui_content">
				<dt></dt>
				<p class="all">全部回复</p>
				<dt></dt>
			</div>
			
			<div class="content">
				<div v-for="(arr,index) in $store.state.pinlun_child" @click.stop="showD(arr)">
					<div class="athor_infor">
						<div class="athor_infor_left">
							<div class="athor_icon">
								<img :src="arr.disUserPic" />
							</div>
							<p class="athor_name">{{arr.disUser}}</p>
							<div class="athor_div" v-if="arr.identification=='剪刀手'">
								{{arr.identification}}
							</div>
							
						</div>
						<div class="athor_infor_right">
							
							<div @click.stop="pin_lun(index)" class="call">
								<p>{{arr.disLike}}</p>
								<img src="../../assets/img/icon_comment_good.png" />
							</div>
							<!--<div class="call_right" >
								<img src="../../assets/img/icon_comment_translation.png" />
							</div>-->
						</div>
					</div>
                      
                     <div class="p_texts" ><p>{{arr.disContent}}</p></div>
                      
					<div class="athor_infor_content">
						
						<p class="date">{{jisuan_time(arr)}}</p>
					</div>
					
					
					<div class="small_box">
					<div v-for="(ar,index) in arr.artDisJsonResponse" @click.stop="showD(ar)" style="width: 100%;">
					<div class="athor_infor " style="margin-top: 0;">
						<div class="athor_infor_left">
							
							<p class="athor_name" style="font-size: 0.25rem;" >{{ar.responder}}</p>
							<div class="athor_div" v-if="arr.identification=='剪刀手'">
								{{ar.identification}}
							</div>
							 <div class="p_texts" style="margin-top: 0;padding-left: 0;"><p style="font-size: 0.25rem;margin-top: 0.15rem;">:{{ar.disContent}}</p></div>
							
						</div>
					</div>
                    
                      
					<div class="athor_infor_content" style="margin-left: 0;">
						
						<p class="date" >{{jisuan_time(ar)}}</p>
					</div>
					<div style="height: 0.2rem;width: 100%;"></div>
				</div>
				</div>
				<div style="width:88%;height: 0.03rem;background-color: #F1F1F1;margin-top: 0.5rem;margin-left: 12%;"></div>
				</div>
				<p class="no_more">已无更多评论</p>
			</div>

			<!--<div class="footer">
				<textarea ref="mo_va" type="text" :placeholder='"回复@"+$store.state.worksCommentContent.disUser+"："'></textarea>
				 <div @click.stop="n1" class="send">
					<p>发送</p>
				 </div>
			</div>-->
		</div>
		
		</div>
		<showdialog v-bind:d='mes'></showdialog>
	</div>

</template>

<script>
	import showdialog from './show_dialog.vue'
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';
	export default {

		components: {
			showdialog
		},
		data() {
			return {
				dad: {
					noa: true,
					noe: false
				},
				mes: {
					is_show: false
				},
				acct: '',
				da: '',
				times_array:[],
				str:'',
				new_a:[]
			}
		},
		props: ['m'],
		methods: {
		/*计算时间*/
		jisuan_time(arr){
			 //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    			var sTime =new Date(); //开始时间
    			var str=arr.disDate
				var endTime =new Date(str); //结束时间
					
				var times=parseInt((sTime.getTime()-endTime.getTime())/(60*1000))//分钟
				
				if(times<1){//刚刚
					return "刚刚"
					
				}else{
					if(times>1&&times<60){//分钟

						return times+"分钟前"
						
					}else if(times>60&&(times/60)<24){//小时
						var hours=parseInt(times/60);
						return hours+"小时前"
						
					}else if(times/60>24&&(times/60)<72){
						var day=parseInt(times/(60*24));
					
						return day+"天前"
					}else{
						return str
					}
			
    		}
			
			
			
		},
             n1(){//一级回复评论
            
             	var disUser ='';
             	var disUserPic ='';
                 var identification ='';
                 var mo_va=this.$refs.mo_va.value;
                 
             	if(mo_va!=''){
             		var url=this.$store.state.request_url+"/api/map/user/artUserInfo.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
             		this.$http({
							url: this.$store.state.request_url+"/api/map/user/artUserInfo.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								opId:this.$store.state.data.memId,
								
							},
							emulateJSON: false,
						}).then(function(response) {
							 
							if(response.body.meta.res == "00000") {
								//console.log(response.body)
								disUser = response.body.data.nickname
								disUserPic = response.body.data.opPic
								identification = response.body.data.idCard
								
								//console.log(disUser,'1111111',disUserPic)
                               
                               if(disUser!==''&&disUserPic!==''){
                 	              //console.log("评论");
                 	        var url1=this.$store.state.request_url+"/api/map/art/artDis.do";      
                 	          var sign1=md5(url1+id+token+ts)    
                 	              
                 	         	/*处理身份标识*/
                               	var icard="";//初始化一个存标识的变量
                               	/*判断是否有身份标识*/
                               	if(response.body.data.identification!=null&&response.body.data.identification!=""){
                               		icard=response.body.data.identification;//赋值
                               		/*判断是否是作者*/
                               		if(response.body.data.opId==this.$store.state.worksCommentContent.opId){
                               			icard+=',作者';
                               		}else{
                               			icard+=',会员';
                               		}
                               	}else{
                               		/*判断是否是作者*/
                               		if(response.body.data.opId==this.$store.state.worksCommentContent.opId){
                               			icard='作者';
                               		}else{
                               			icard='会员';
                               		}
                               	}
                               	//console.log("身份标识：   "+icard);
                 	              
            	  			this.$http({
							url: this.$store.state.request_url+'/api/map/art/artDis.do',
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign1
							},
							body: {
								disId:this.$store.state.worksCommentContent.disId,
								opId:this.$store.state.data.memId,
								disOpId:this.$store.state.works_ads.opId,
								artId:this.$store.state.worksId,
								disContent:mo_va,
								disUser:disUser,
								disUserPic:disUserPic,
								identification:icard
							},
							emulateJSON: false,
						}).then(function(response) {
							  //console.log(response.body,"二级回复状态");
							if(response.body.meta.res == "00000") {
								//this.worksComment = response.body.data;
								this.$emit('huoqu');
								Toast({
											message: '回复成功',
											position: 'middle',
											duration: 2000
										});
								this.$parent.Gdoc();
								this.$refs.mo_va.value = ''
								
								
								
								
							}
						}).catch(function(err) {
							//console.log(err)
						})
						
						}
                 
							}
						}).catch(function(err) {
							//console.log(err)
						})
             		
                 
						}else{
							Toast({
											message: '评论内容不能为空',
											position: 'middle',
											duration: 2000
										});
							
						}
						
						
            },
			showss() {

			},
			hide() {
				this.$parent.Gdoc();//调用父组件方法，达到刷新数据效果
				this.m.dad = false
			},
			showD(arr) {
					this.$store.state.is_detail="2";
				this.mes.is_show = true
				this.$store.state.input_x = arr
				
				
			},
			
			
			plhf(){//获取回复状态
				//console.log("******")
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
						}).then(function(response) {
							console.log(response.body,"一级回复状态");
							if(response.body.meta.res=="00000"){
								//this.worksComment = response.body.data;
								
								this.$store.state.pinlun_child = response.body.data.artDis;
								
							}
						}).catch(function(err) {
							//console.log(err)
						})
			},
			
			pin_lun(i){
//				//console.log((i.disId)?'111':'222')
                
                
                 var url=this.$store.state.request_url+"/api/map/art/addLikeOnDis.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
                   this.$http({
							url: this.$store.state.request_url+"/api/map/art/addLikeOnDis.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body:{
								opId:this.$store.state.data.memId,
								disId:(i.disId)?i.disId:this.$store.state.pinlun_child[i].disId
							},
							emulateJSON: false,
						}).then(function(response) {
							//console.log(response.body)
							 
							if(response.body.meta.res == "00000") {
								
								Toast({
											message: '点赞成功',
											position: 'middle',
											duration: 2000
										});
										
								if(i.disId){
									i.disLike+=1
								}else{
									this.$store.state.pinlun_child[i].disLike+=1
								}
								
								
//								this.worksComment[i].replyTotal+=1
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
				jsonSort(array, field, reverse) {
				//var date=new Date(field);
				//数组长度小于2 或 没有指定排序字段 或 不是json格式数据
				if(array.length < 2 || !field || typeof array[0] !== "object") return array;
				//数字类型排序
				if(typeof array[0][field] === "number") {
					array.sort(function(x, y) {
						return x[field] - y[field]
					});
				}
				//字符串类型排序
				if(typeof array[0][field] === "string") {
					array.sort(function(x, y) {
						return x[field].localeCompare(y[field])
					});
				}
				//倒序
				if(reverse) {
					array.reverse();
				}
				return array;
			},
			sort_ar(a){
				this.new_a=this.jsonSort(a,"disDate",true);
				////console.log(a,"1111111111111111111111111111111")
				return this.new_a
			}
				
		

		
		},
		mounted() {
//			this.da = this.$store.state.pinlun_child
			//this.da = this.$store.state.act;
			//console.log("1111111111111111111111")
			this.plhf();	

		},
		created(){
			this.da = this.$store.state.pinlun_child
			//console.log(this.$store.state.worksCommentContent,"888888888888888888")
			//console.log(this.$store.state.pinlun_child)
			
		}
		}
</script>

<style scoped="scoped">
	.p_texts{
		
		
		padding-left: 0.75rem;
		color: #495060;

		margin-top: 0.2rem;
		margin-left: 0.14rem;
		word-break:break-all;/* 不换行 */ 
        white-space:normal;/* 不换行 */ 
	}
	.p_texts p{
		font-size: 0.3rem;
		color: rgba(153, 153, 153, 1);
	}
	input,textarea{
		outline: none;
	}

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
	
	.athor_infor {
		margin-top: 0.5rem;
		width: 100%;
		
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
		font-size: 0.32rem;
    	margin-left: 0.2rem;
		color: #333333;
		line-height: 0.17rem;
	}
	
	.athor_div {
		margin-top: 0.2rem;
		float: left;
		margin-left: 0.1rem;
		padding: 0 0.05rem;
		text-align: center;
		font-size: 0.23rem;
		background-color: #000000;
		border-radius: 0.05rem;
		color: #fff;
	}
	
	.lou{
		margin-top: 0.2rem;
		float: left;
		margin-left: 0.1rem;
		
		height: 0.25rem;
		text-align: center;
		background-color: #67B9F8;
		border-radius: 0.05rem;
	}
	.athor_text {
		padding: 0.12rem;
    	font-size: 0.24rem;
    	color: rgba(255, 255, 255, 1);
    	line-height: 0.01rem;
	}
	
	.athor_infor_left {
		width: 100%;
		height: 100%;
		float: left;
	}
	
	.athor_icon {
		float: left;
	}
	
	.athor_infor_right {
		width: 15%;
		height: 100%;
		float: right;
	}
	
	.athor_infor_content {
		
		margin: 0 0.25rem 0 0.75rem;
	}
	
	.athor_infor_content_text {
		width: 5rem;
		/*background: red;*/
		font-size: 0.3rem;
		color: rgba(153, 153, 153, 1);
		line-height: 0.335rem;
	}
	
	.call {
		/*margin: 8%;*/
		width:0.7rem;
		float: left;
	}
	
	.call p {
		font-size: 0.3rem;
		color: #D0D0D0;
		float: left;
		line-height: 0.5rem;
	}
	
	.call img {
		float: right;
		margin-top: 0.1rem;
		width: 0.32rem;
		height: 0.32rem;
	}
	
	.call_right {
		float: right;
		height: 100%;
		margin-right: 0.25rem;
	}
	
	.call_right img {
		width: 0.5rem;
		height: 0.4rem;
		margin: 30% 0;
	}
	
	.date {
		padding-top: 0.1rem;
		font-size: 0.26rem;
		color: rgba(198, 198, 198, 1);
		line-height: 0.335rem;
		margin-left: 0.14rem;
	}
	
	.all {
		width: 100%;
		
		text-align: center;
		color: rgba(51, 51, 51, 1);
		font-size: 0.3rem;
		
	}
	
	.return_text {
		/*height: 90%;
		position: fixed;*/
		
		width: 100%;
		overflow-y: auto; height: 11.5rem;
		z-index: 4;
		margin-top: 2rem;
		background-color: #fff;
		border-top-left-radius: 0.45rem;
		border-top-right-radius: 0.45rem;
	}
	
	.content {
		
		
		/*padding-bottom: 1.5rem;*/
	}
	
	.footer {
		height: 1rem;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 4;
		-moz-box-shadow: 0 0 0.3rem rgba(247,247,247,1); /* 老的 Firefox */
		box-shadow: 0 0 0.3rem rgba(247,247,247,1);
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
		opacity:0.01rem;
		border-radius: 0.15rem ; 
	}
	
	
	.no_more{
		text-align: center;
		font-size: 0.3rem;
		line-height: 1rem;
		color: #D0D0D0;
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
	
	.box {
		display: none;
	}
	
	.boxto {
		display: block;
	}
	.hui_content{
		width: 90%;
		margin: 0.3rem 5% 0;
		overflow: hidden;
	}
	.hui_content dt{
		width: 30%;
		height: 1px;
		margin:0.25rem 0.3rem 0;
		
		background-color: #EFEFEF;
	}
	.hui_content p{
		width: 20%;
		text-align: center;
	}
	.hui_content dt,.hui_content p{
	float: left;	
	}
	.down_xian{
		width: 90%;
		height: 0.01rem;
		background:rgba(247,247,247,1);
		margin: 0.2rem 0;
		margin-left: 0.75rem;
	}
	.small_box{
		background-color: #f0f0f0;width: 85%;margin-left: 10%;margin-right:5%;border-radius: 0.1rem;margin-top: 0.2rem;
	}
</style>