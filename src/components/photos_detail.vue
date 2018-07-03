<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-05-11
    	描述：相册详情
    -->
	<div id="app">
		<div class="head">
			<img src="../assets/img/icon_left_white.png" @click="back"/>
		</div>
		<div class="big_img">
			<img @load="tupian_zuijia" id="img_s" :src="picurl" />
		</div>
		
		<div class="footer">
			<div class="function">
				<div class="function_item_left" @click="call_btn">
					<img :src="call?'static/img/icon_detail_good_active.png':'static/img/icon_photo_good.png'" />
					<p v-if="works_data.readerLike=='0'">点赞</p>
					<p v-else >{{(works_data.readerLike>1000)?parseInt(works_data.readerLike)/1000+'k':works_data.readerLike}}</p>
					
				</div>
				<div class="function_item_left" @click="comentTap">
					<img :src="collect?'static/img/icon_detail_collect_active.png':'static/img/icon_photo_collect.png'" />
					<p v-if="works_data.readerCollect=='0'">收藏</p>
					<p v-else >{{(works_data.readerCollect>1000)?works_data.readerCollect/1000+'k':works_data.readerCollect}}</p>
				</div>
				<div class="function_item_left" @click="zhuan_f">
					<img src="../assets/img/icon_photo_share.png" />
					<p v-if="works_data.readerForward=='0'">转发</p>
					<p v-else >{{(works_data.readerForward>1000)?works_data.readerForward/1000+'k':works_data.readerForward}}</p>
				</div>
				
				<div @click="pin" class="function_item_left">
					<img src="../assets/img/icon_photo_comment.png"/>
					<p v-if="works_data.readerDiscuss=='0'">评论</p>
					<p v-else >{{(works_data.readerDiscuss>1000)?works_data.readerDiscuss/1000+'k':works_data.readerDiscuss}}</p>
				</div>
				
				<div @click="dashang" class="function_item_right">
					<img src="../assets/img/icon_photo_tip.png" />
					<p>打赏</p>
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
//			el:"#app",
			store,
			data(){
				return{
					call:false,
					collect:false,
					photoUrl:'',
					works_data:'',
				}
				
			},
			methods: {
				back(){
					this.$router.push({
							path: '../personal_data'
						})
					this.$store.state.xlss =  6
					//	window.location = '/#/personal_data'
				},
				pin(){
					this.$store.state.xcs = 1
					
				    this.$store.state.web_s=this.$store.state.back_id//将判断路由里面的第一次跳转进入作品详情的地址位置存储起来
					
					this.$store.state.worksId = this.$store.state.photoUrl.artId
					
					this.$router.push({
							path: '../works_detail_s'
						})
				},
				dashang(){
					this.$store.state.xcs = 2
					this.$store.state.back_id = 6
					this.$store.state.worksId = this.$store.state.photoUrl.artId
					this.$router.push({
							path: '../works_detail'
						})
				},
				
				comentTap() {//收藏事件
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
								collectOpId:this.$store.state.photoUrl.opId,//被收藏的Id
								collectType:this.works_data.artFlag,//类型
								artId:this.$store.state.photoUrl.artId,//作品ID
							},
							emulateJSON: false,
						}).then(function(response) {
								//console.log(response)
							    
								if(response.body.meta.res == "00000") {
								  //console.log("收藏");
									this.collect=true
								
								Toast({
											message: '收藏成功',
											position: 'middle',
											duration: 2000
										});
										
								this.works_data.readerCollect+=1
							}else{
////////////////////////////////////取消收藏、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
                var url=this.$store.state.request_url+"/api/map/art/uncollect.do";
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
								collectOpId:this.$store.state.photoUrl.opId,//被收藏的Id
								collectType:this.works_data.artFlag,//类型
								artId:this.$store.state.photoUrl.artId,//作品ID
							},
							emulateJSON: false,
						}).then(function(response) {
								//console.log(response)
								if(response.body.meta.res == "00000") {
								  //console.log("收藏");
									this.collect=false
								this.works_data.readerCollect-=1
							}
						}).catch(function(err) {
							//console.log(err)
						})
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
					}
						}).catch(function(err) {
							//console.log(err)
						})
				
			    },
				call_btn(){//点赞事件
				//console.log(this.works_data,'________asdasd_____________')
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
								artId:this.$store.state.photoUrl.artId,
								likeType:this.works_data.artFlag,
								opId:this.$store.state.photoUrl.opId,
								likeOpId:this.$store.state.data.memId//测试参数当前用户Id
							},
							emulateJSON: false,
					}).then(function(response) {
						
							   if(response.body.meta.res == '00000'){
							   	this.call=true
							   	 Toast({
											message: '点赞成功',
											position: 'middle',
											duration: 2000
										});
								this.works_data.readerLike+=1
							   }else if(response.body.meta.res == '99999'){
//、、、、、、、、、、、、、、、、、、、、、、、、、、取消点赞、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、	
                var url=this.$store.state.request_url+"/api/map/art/cancelLike.do";
		        var sign=md5(url+id+token+ts)
					this.$http({
							url: this.$store.state.request_url+"/api/map/art/cancelLike.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								artId:this.$store.state.photoUrl.artId,
								likeType:this.works_data.artFlag,
								opId:this.$store.state.photoUrl.opId,
								likeOpId:this.$store.state.data.memId//测试参数当前用户Id
							},
							emulateJSON: false,
					}).then(function(response) {
							   if(response.body.meta.res == '00000'){
							   	this.call=false
								this.works_data.readerLike-=1
							   }
						}).catch(function(err) {//console.log(err)
						})
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
					 }
						}).catch(function(err) {
							//console.log(err)
						})
			},
				
				
			shouchang(){
				//请求收藏状态	
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
						attentionOpId:this.$store.state.photoUrl.opId,
						artId:this.$store.state.photoUrl.artId
					},
					emulateJSON: false,
					}).then(function(response) {
						//console.log(response.body,'收藏')
						if(response.body.meta.msg == "NO") {
                            this.collect = false
                            
						}else{
                            this.collect = true
						}
						}).catch(function(err) {
							//console.log(err)
						})
			},
			
		 like_s(){
		 	
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		       
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
						attentionOpId:this.$store.state.photoUrl.opId,
						artId:this.$store.state.photoUrl.artId
					},
					emulateJSON: false,
					}).then(function(response){
						//console.log("点赞");
						//console.log(response.body);
				
						if(response.body.meta.msg == "NO") {
//							this.callStauts="1";
                          this.call = false
						}else{
						  this.call = true
//							this.callStauts="2";
						}
						}).catch(function(err) {
							//console.log(err)
						})  
		        
		 },
			
		 Gdoc(){
				//console.log(this.$store.state.photoUrl.artId,'当前作品id')
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
					artId:this.$store.state.photoUrl.artId//作品ID
				},
				emulateJSON: false,
			}).then(function(response) {
				 
				  //console.log(response.body.meta,'数据状态')
				if(response.body.meta.res == "00000") {
					
					this.works_data = response.body.data;
					
					console.log(this.works_data,'数据详情——————————————')
					
					
					
					//请求点赞状态
				
//					this.tupian_zuijia()
				}
			}).catch(function(err) {
				//console.log(err)
			})
		   },
				
			 tupian_zuijia(){
					var img = document.getElementById('img_s')
					var bodys = document.getElementById('app')
					let height_s = (bodys.offsetHeight-img.offsetHeight)/2
					img.style.marginTop = height_s+'px'
					  
				},
					zhuan_f() { //微信转发功能
					console.log(this.works_data.artFlag,"11111111111111111")
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
							forwardOpId: this.works_data.opId,
							forwardType: this.works_data.artFlag,
							artId: this.works_data.artId
						},
						emulateJSON: false,
					}).then(function(response) {

						if(response.body.meta.res == "00000") {

							//console.log(response.body.data,"1000000000000000000000000")
							this.$store.state.share_url=response.body.data.forwardUrl
							this.$store.state.share_title=response.body.data.title
							this.$store.state.share_content=response.body.data.synopsis
							this.$store.state.share_img=response.body.data.picUrl
							this.$store.state.tableList.share();
						}
					}).catch(function(err) {
							//console.log(err)
					})
					}, 
			},
			mounted() {
//		     setTimeout(()=>{
               this.tupian_zuijia()
//            },150)
				
				this.Gdoc()
				this.shouchang()
				this.like_s()
//				this.photoUrl= this.$store.state.photoUrl.picUrl.picInfo[0].picUrl
//              //console.log(this.$store.state.photoUrl,'相册数据')
                
              
                
                
			},
			
			computed:{
				picurl(){
					return this.$store.state.photoUrl.picInfo[0].picUrl
				},
			}
		
			

	}
</script>

<style scoped="scoped">
	#app{
		/*overflow-x: hidden;*/
		width: 100%;
		background-color: #000000;
		height: 13.32rem;
		position: fixed;
		top:0;
		left:0;
		z-index: 300;
	}
	li {
		list-style-type: none;
	}
	*{
		font-family: "微软雅黑";
	}
	p,
	ul {
		margin: 0;
		padding: 0;
	}
	.head{
		
		width: 100%;
		height: 0.5rem;
		position:fixed;
		top: 0.5rem;
		left: 0.25rem;
		z-index: 9999;
		/*background: white;*/
	}
	.head img{
		width: 0.25rem;
		/*height: 0.5rem;*/
	}
	.big_img{
		/*margin-top: 0.5rem;*/
		/*height: 9rem;*/
		width: 100%;
		vertical-align: middle;
		text-align: center;
	}
	.big_img img{
		width: 100%;
		max-height: auto;
	}
	.footer{
		
		width: 100%;
		height: 1.75rem;
		position: fixed;
		bottom: 0;
		
	}
	
	.function {
		margin-top: 0.25rem;
		width: 100%;
		height: 0.75rem;
	}
	
	.function_item_left {
		float: left;
		width: 20%;
		text-align: center;
		height: 100%;
	}
	
	.function_item_left img,
	.function_item_right img {
		width: 35%;
		height: 0.5rem;
	}
	
	.function_item_left p,
	.function_item_right p {
		font-size: 0.3rem;
		color: #fff;
		line-height: 0.75rem;
	}
	
	.function_item_right {
		float: right;
		width: 20%;
		text-align: center;
		height: 100%;
	}
</style>