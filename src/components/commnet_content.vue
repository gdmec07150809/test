<template>
	<div id="app" v-show="$store.state.is_comment">
		<div  @touchstart="canc" style="width: 100%;height: 18.7rem;position:fixed;top: 0;left: 0;background:rgba(0,0,0,0.4);z-index: 10;" >
		
		</div>
		<div class="dia">
			<div class="footer">
				<textarea type="text"  :placeholder="'回复@'+$store.state.commentWorksdata.artTitle+'：'" ref="vas"></textarea>
				<div class="send" @touchstart="sendtt">
					<p>发送</p>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import store from '../vuex/store.js'
	import { Toast } from 'mint-ui';
	import md5 from 'js-md5';
	
	export default {
		store,
		data() {
			return {
					
			}
		},
        
		methods: {
			canc(){
				
				this.$store.state.is_comment = false
			},
			sendtt(){
				
				 var disUser ='';
             	 var disUserPic ='';
                 var identification ='';
                 var vas=this.$refs.vas.value;
                 
                 //console.log(this.$store.state.data.memId,'我的id')
                 
             	if(vas!=''){
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
								opId:this.$store.state.data.memId,
							},
							emulateJSON: false,
						}).then(function(response) {
							//console.log(response.body)
							if(response.body.meta.res == "00000") {
								//console.log(response.body)
								disUser = response.body.data.nickname
								disUserPic = response.body.data.opPic
								identification = response.body.data.idCard
								
								//console.log(disUser,'1111111',disUserPic)
                               
                               if(disUser!==''&&disUserPic!==''){
                 	     var url=this.$store.state.request_url+"/api/map/art/artDis.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
                 	     
            	  this.$http({
							url: this.$store.state.request_url+"/api/map/art/artDis.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								disId:null,//唯一ID父评论填写null 子评理则填写父评论ID
								opId:this.$store.state.data.memId,//评论会员ID
								disOpId:this.$store.state.commentWorksdata.opId,//被评论会员ID  inps_act 为临时存储该作品所有的信息
								artId:this.$store.state.commentWorksdata.artId,//作品ID
								
								disContent:vas,//评论内容
								disUser:disUser,//评论人
								disUserPic:disUserPic,//评论人头像Url
								identification:(response.body.data.certified==null) ? '咸鱼':response.body.data.certified//评论会员的身份标识
							},
							emulateJSON: false,
						}).then(function(response) {
							  //console.log(response.body,"二级回复状态");
							if(response.body.meta.res == "00000") {
								Toast({
											message: '评论成功',
											position: 'middle',
											duration: 2000
									});
								this.$refs.vas.value= ''
								
								
								 
								this.canc()
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
		height: 2rem;
		background-color: #fff;
		width: 100%;
	}
	.dia p{
		height: 30%;
		line-height: 1rem;
		color:rgba(51,51,51,1);
		font-size: 0.35rem;
		text-align: center;
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
		line-height: 0.4rem;
		text-align: center;
		font-size: 0.3rem;
	}
	
	.footer {
		height: 1.5rem;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 4;
		-moz-box-shadow: 0 0 0.3rem rgba(247,247,247,1); /* 老的 Firefox */
		box-shadow: 0 0 0.3rem rgba(247,247,247,1);
	}
	
	.footer textarea {
		outline: none;
		float: left;
		border: 0;
		width: 70%;
		font-size: 0.35rem;
		margin-top: 0.1rem;
		
		margin-left: 3%;
		color: rgba(180, 180, 180, 1);
		border: #D8D8D8 solid 1px;
		
		padding-left: 0.2rem;
		
		border-radius: 0.15rem ; 
	}
	textarea::-webkit-input-placeholder{
		line-height: 1rem;
	}
	textarea::-moz-placeholder{
		line-height: 1rem;
	}
	textarea::-ms-input-placeholder{
		line-height: 1rem;
	}
</style>