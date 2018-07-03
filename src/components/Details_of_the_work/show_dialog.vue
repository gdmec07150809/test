<template>
	<div id="app" v-show="d.is_show" @touchmove.prevent>
		<div  @click="cancel" style="width: 100%;height: 18.7rem;position:fixed;top: 0;left: 0;background:rgba(0,0,0,0.4);z-index: 10;" >
		
	</div>
		<div v-if="ad"  class="dia">
			<p @click="reply">回复</p>
			<div class="down"></div>
			<p @click="reportTap">举报</p>
			<div class="xian" ></div>
			<p @click="cancel">取消</p>
		</div>
		
		
		<div v-else class="dia">
			<div class="head">
				<div style="height: 100%;float: left;">
					<p style="line-height: 1rem;font-size: 0.32rem;margin-left: 0.3rem;color: #CCCCCC;" @click="cancel">取消</p>
				</div>
				<div style="height: 100%;float: right;">
					<p style="line-height: 1rem;font-size: 0.32rem; margin-right: 0.3rem;color: #ff9d00;" @click="tower_go">发送</p>
				</div>
				
			</div>
			<div class="footer">
				<textarea  type="text" :placeholder='"回复@"+$store.state.input_x.disUser+"："' ref="vas"></textarea>
				
			</div>
			
		</div>
		<div class="dia2" v-show="is_report_stauts">
			<p class="report_class" @click="x1('1')">发布不良信息</p>
			<div style="width: 100%;height: 2px;background:rgba(247,247,247,1);" ></div>
		 	 <p class="report_class" @click="x1('2')">存在侵权行为</p>
		 	 <div style="width: 100%;height: 2px;background:rgba(247,247,247,1);"></div>
			<p class="report_class" @click="x1('3')">存在欺诈行为</p>
			<div class="xian" ></div>
			<p @click="cancel_show" class="cancel">取消</p>
		</div>
	</div>
	
</template>

<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';
	export default {
		store,
		data() {
			return {
					ad:true,
					vas:'',
					is_report_stauts:false,
					report_content:['发布不良信息','存在侵权行为','存在欺诈行为']
			}
		},
        props:['d'],
		methods: {
			cancel(){
				this.d.is_show = false
				this.ad = true
			},
			reply(){
				this.ad = false
			},
			
			cancel_show(){
				this.is_report_stauts=false;
			},
			reportTap(){
			
				//this.f.is_report = false;
				this.is_report_stauts=true;
				
			},
			x1(e){
				var value='';
				
				switch(e){
					case '1':
					
						value="发布不良信息"
					break;
					case '2':
					
						value="存在侵权行为"
					break;
					case '3':
					
						value="存在欺诈行为"
					break;
				}
				
				var url=this.$store.state.request_url+"/api/map/art/addReportInfo.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
		        var that=this;
				this.$http({
					url: this.$store.state.request_url+"/api/map/art/addReportInfo.do?memId="+id+"&ts="+ts,
					method: 'post',
					headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
					},
					body: {
						disId: this.$store.state.report_data.disId,
						opId:id,
						expose:value
					},
					emulateJSON: false,
					}).then(function(response) {
						
						
						
						if(response.data.meta.res=="00000"){
							Toast({
											message: '举报成功',
											position: 'middle',
											duration: 2000
										});
				
							//console.log("举报内容:"+value)
							that.d.is_show = false
							that.is_report_stauts=false;
							that.f.is_report = false
							
						}else{
							Toast({
											message: response.data.meta.msg,
											position: 'middle',
											duration: 2000
										});
				
							//console.log("举报内容:"+value)
							that.d.is_show = false
							that.is_report_stauts=false;
							that.d.is_show = false
							
						}
						
					}).catch(function(err) {
							//console.log(err)
						
					})
			},
			tower_go(){
				
             	var disUser ='';
             	var disUserPic ='';
                 var identification ='';
                 var vas=this.$refs.vas.value;
             	if(vas!=''){
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
								
								console.log(this.$store.state.worksId,'1111111',disUserPic)
                               
                               if(disUser!==''){
                               	if(disUserPic==null||disUserPic==""){
                               		disUserPic='static/img/uploadheadimg.png'
                               	}
                 	              //console.log("评论");
                 	              	/*处理身份标识*/
                               	var icard="";//初始化一个存标识的变量
                               	/*判断是否有身份标识*/
                               	if(response.body.data.identification!=null&&response.body.data.identification!=""){
                               		icard=response.body.data.identification;//赋值
                               		/*判断是否是作者*/
                               		if(response.body.data.opId==this.$store.state.commentWorksdata.opId){
                               			icard+=',作者';
                               		}else{
                               			icard+=',会员';
                               		}
                               	}else{
                               		/*判断是否是作者*/
                               		if(response.body.data.opId==this.$store.state.commentWorksdata.opId){
                               			icard='作者';
                               		}else{
                               			icard='会员';
                               		}
                               	}
                               	//console.log("身份标识：   "+icard);
                 	        var url1=this.$store.state.request_url+"/api/map/art/artDis.do";      
                 	        var sign1=md5(url1+id+token+ts)      
            	  this.$http({
							url: this.$store.state.request_url+"/api/map/art/artDis.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign1
							},
							body: {
								disId:this.$store.state.input_x.disId,
								opId:this.$store.state.data.memId,
								disOpId:this.$store.state.input_x.opId,
								artId:this.$store.state.worksId,
								disContent:vas,
								disUser:disUser,
								disUserPic:disUserPic,
								identification:icard
							},
							emulateJSON: false,
						}).then(function(response) {
							  //console.log(response.body,"二级回复状态");
							if(response.body.meta.res == "00000") {
								
								Toast({
											message: '回复成功',
											position: 'middle',
											duration: 2000
									});
								this.$refs.vas.value= ''
								this.cancel()
								
								if(this.$store.state.is_detail=="1"){
									this.$parent.Gdoc();
								}else{
									this.$parent.plhf();
									
								}
								this.$parent.pinglun();
								
								
								
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
			
		},
		creatd(){
			console.log(this.$store.state.commentWorksdata,"评论")
		}
	}
</script>
</script>

<style scoped="scoped">
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
	.dia{
		position:fixed;
		bottom: 0;
		z-index: 10;
		height: 3.4rem;
		background-color: #fff;
		width: 100%;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
	}
		.head{
		width: 100%;
		height: 0.8rem;
		
	}
	.dia2{
		position:fixed;
		bottom: 0;
		z-index: 10;
		height: 4.2rem;
		background-color: #fff;
		width: 100%;
	}
	.report_class{
		height: 1rem;
		line-height: 1rem;
		color:rgba(51,51,51,1);
		font-size: 0.32rem;
		text-align: center;
	}
		.cancel{
		height: 1rem;
		line-height: 1rem;
		color:rgba(51,51,51,1);
		font-size: 0.32rem;
		text-align: center;
	}
	
	.dia p{
		height:1rem;
		line-height: 1rem;
		color:rgba(51,51,51,1);
		font-size: 0.32rem;
		text-align: center;
	}
	.down{
		width: 100%;
		height: 0.01rem;
		margin-top: 0.2rem;
		background:rgba(247,247,247,1);
	}
	.xian{
		height: 0.2rem;
		width: 100%;
		background:rgba(247,247,247,1);
	}
	.footer {
		height: 2rem;
		width: 100%;
		
		z-index: 300;
		
		background: white;
	}
	.footer textarea {
		outline: none;
		float: left;
		border: 0;
		width: 94%;
		font-size: 0.32rem;
		margin-top: 0.1rem;
		height: 100%;
		margin-left: 3%;
		color: rgba(180, 180, 180, 1);
		border: #D8D8D8 solid 1px;
		line-height: 0.8rem;
		padding-left: 0.2rem;
		opacity:0.01rem;
		border-radius: 0.15rem ; 
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
		textarea::-webkit-input-placeholder{
		line-height: 0.8rem;
		font-size: 0.3rem;
	}
	textarea::-moz-placeholder{
		line-height: 0.8rem;
			font-size: 0.3rem;
	}
	textarea::-ms-input-placeholder{
		line-height: 0.8rem;
			font-size: 0.3rem;
	}
</style>