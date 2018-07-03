<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-20
    	描述：消息记录
    -->
	<div style="width: 100%;overflow:hidden;position: relative;z-index: 300;background: white;">
		<div style="width: 100%;height: 1rem;text-align:center;position: fixed;top:0;left: 0;z-index: 300;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<img @click="hui" style="width: 0.3rem;position: absolute;top: 0.35rem;left: 0.3rem;" src="../../../assets/img/zuo.png" alt="" />
			<p style="font-size: 0.36rem;line-height: 1rem;">消息记录</p>
			<span style="font-size: 0.28rem;position:absolute;line-height: 1rem;top: 0;right: 0.3rem;" @click="clearRecode">清空</span>
		</div>
		<div style="height: 0.88rem;"></div>

		<!--
        	作者：2443611475@qq.com
        	时间：2018-03-20
        	描述：循环创建
        -->
        <!--<img v-show="msgs.length==0" style="width: 4rem;margin: 23%;" src="../../../assets/img/xiao_xi/icon_noArticle.png"/>-->
        <div style="margin:  3rem 35% 0;width: 30%;text-align: center;" v-if="msgs.length==0">
			<img src="../../../assets/img/xiao_xi/icon_noArticle.png" style="width: 100%" />
			<p style="margin-top: 0.2rem;color: #CCCCCC; font-size: 0.26rem;">暂时消息记录！</p>
		</div>
        
		<div class="test_box" v-for="msg in msgs" @click="toDetail(msg)">
			<div style="width: 4.4rem;height: 100%;float: left;position: relative;">
				<div style="width: 100%;height: 0.8rem;margin-top: 0.55rem;line-height: 0.8rem;">
					<img style="width:0.8rem;height:0.8rem;float:left;border-radius:50%;" :src="msg.disUserPic" />
					<p style="font-size: 0.28rem;float: left;margin-left: 0.2rem;color: #B1B1B1;">{{msg.disUser}}</p>
				</div>
				<div class="text_boxs" style="-webkit-box-orient: vertical;">
					<!--本次设计采用黑金色调，融合主题和酒
					店元素进行创合主题和酒店元素进行创-->
					{{msg.disContent}}
				</div>
				<p style="font-size: 0.25rem;color: #B1B1B1;position: absolute;bottom: 0.3rem;left: 0.95rem;">{{msg.disDate}}</p>
			</div>
			<div  style="width: 1.4rem;height:1.4rem;float: right;margin-top: 0.55rem;margin-right: 0.5rem;overflow: hidden;position: relative;">
				<img ref="pic" @load="detail_img" style="width: 1.4rem;height: 1.4rem;position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" :src="msg.picUrl" />
			</div>
		</div>

		<div class="test_box" v-for="call in calls" @click="toDetail(call)">
			<div style="width: 4.4rem;height: 100%;float: left;position: relative;">
				<div style="width: 100%;height: 0.56rem;margin-top: 0.6rem;line-height: 0.56rem;">
					<img style="width:0.8rem;height:0.8rem;float:left;border-radius:50%;" :src="call.opPic" />
					<p style="font-size: 0.28rem;float: left;margin-left: 0.2rem;color: #B1B1B1;">{{call.nickname}}</p>
				</div>

				<img style="width: 0.34rem;height: 0.34rem;float: left;margin-left: 0.2rem;margin-bottom: 0.3rem;" src="../../../../static/img/icon_detail_good_active.png">

				<p style="font-size:0.25rem;color:#B1B1B1;position: absolute;bottom: 0.3rem;left: 0.95rem;">{{call.insertDate}}</p>
			</div>
			<div style="width: 1.4rem;height: 1.4rem;float: right;margin-right: 0.5rem;margin-top: 0.55rem;overflow: hidden;position: relative;">
				<img ref="pic" @load="detail_img" style="width: 1.4rem;height: 1.4rem;position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" :src="call.picUrl" />
			</div>
		</div>
		<div v-show="xian_s" class="zhe"  @touchmove.prevent  @click="shan_s">
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 1.9rem;">
					<p style="font-size:0.32rem;">请确认是否删除该闲情?</p>
				</div>
				
				<div  style="width:100%;height:0.96rem;border-top:0.02rem solid #E0E0E0;line-height: 0.96rem;">
					<div @click="que" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.32rem;">
						 确定
					</div>
					<div @click="shan_s" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.32rem;color: #CCCCCC;">
						 取消
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../../../vuex/store'
	import md5 from 'js-md5';
	import { Toast } from 'mint-ui';
	export default {
		store,
		data() {
			return {
				msgs: [], //临时储存评论数据
				calls: [], //临时储存点赞数据
				xian_s:false
			}
		},
		methods: {
			hui() {
				this.$router.push({
					path: '../message'
				});

			},
			/*清空数据*/
			clearRecode(){
				this.xian_s = true
				
				
			},
			/*跳转详情页未通，后台未给指定数据*/
			toDetail(arr){
				//console.log(arr,"11111111111111")
			},
			request_call_data() {
				//console.log(this.$store.state.likes, "点赞", localStorage.like)
				
				//处理缓存数据
				var like_arr=[];
				var new_str="";
				if(localStorage.like!=undefined){
					if(localStorage.like.length>0){
					if(localStorage.like.indexOf(",")>-1){
						like_arr = localStorage.like.split(",");
					}else{
						like_arr.push(localStorage.like)
					}
				}
				}
				
		
				/*处理成后台想要的请求数据*/
				if(this.$store.state.likes.length > 0) {
					if(like_arr.length>0){
						var new_arr=this.mergeArray(like_arr,this.$store.state.likes);
						
						for(var i = 0; i < new_arr.length; i++) {

							if(i == new_arr.length - 1) {
								new_str += new_arr[i]
							} else {
								new_str +=new_arr[i] + ","

							}

						}
					}else{
						for(var i = 0; i < this.$store.state.likes.length; i++) {

							if(i == this.$store.state.likes.length - 1) {
								new_str += this.$store.state.likes[i]
							} else {
								new_str +=this.$store.state.likes[i] + ","

							}

						}
					}
				}else{
					for(var i = 0; i < like_arr.length; i++) {

							if(i == like_arr.length - 1) {
								new_str += like_arr[i]
							} else {
								new_str +=like_arr[i] + ","

							}

						}
				}			
					if(new_str != "") {

						//console.log(new_arr,"88888888888888");
						localStorage.like = new_str;
						var url = this.$store.state.request_url + "/api/map/user/artUserMessagePush.do";
						var memId = this.$store.state.data.memId;
						var ts = new Date().getTime();
						var token = this.$store.state.data.tokEn;
						var sign = md5(url + memId + token + ts);
						/*请求点赞记录*/
						this.$http({
							url: this.$store.state.request_url + '/api/map/user/artUserMessagePush.do?memId=' + memId + "&ts=" + ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							body: {
								fldrId: new_str,
								type: "like"
							},
							emulateJSON: false,
						}).then(function(response) {

							if(response.body.meta.res === "00000") {
								//console.log(response.body);
								this.calls = response.body.data;
								this.$store.state.likes=[];

							}
						})
					}

				
				
			},
			/*数组去除重复项，返回一个数组*/
			mergeArray(arr1, arr2) {
				for(var i = 0; i < arr1.length; i++) {
					for(var j = 0; j < arr2.length; j++) {
						if(arr1[i] === arr2[j]) {
							arr1.splice(i, 1); //利用splice函数删除元素，从第i个位置，截取长度为1的元素
						}
					}
				}
				//alert(arr1.length)
				for(var i = 0; i < arr2.length; i++) {
					arr1.push(arr2[i]);
				}
				return arr1;
			},
			request_comemt_data() {
				//console.log(this.$store.state.discuss, "进入评论")
				//处理缓存数据
				var discuss_arr=[];
				var new_str="";
				if(localStorage.discuss!=undefined){
					//console.log(localStorage.discuss,"0000000")
					if(localStorage.discuss.length>0){
					if(localStorage.discuss.indexOf(",")>-1){
						discuss_arr = localStorage.discuss.split(",");
					}else{
						discuss_arr.push(localStorage.discuss)
						//console.log(discuss_arr,"1111111111")
					}
				}
				}
				
		
				/*处理成后台想要的请求数据*/
				if(this.$store.state.discuss.length > 0) {
					if(discuss_arr.length>0){
						var new_arr=this.mergeArray(discuss_arr,this.$store.state.discuss);
						
						for(var i = 0; i < new_arr.length; i++) {

							if(i == new_arr.length - 1) {
								new_str += new_arr[i]
							} else {
								new_str +=new_arr[i] + ","

							}

						}
					}else{
						for(var i = 0; i < this.$store.state.discuss.length; i++) {

							if(i == this.$store.state.discuss.length - 1) {
								new_str += this.$store.state.discuss[i]
							} else {
								new_str +=this.$store.state.discuss[i] + ","

							}

						}
					}
					//console.log(new_str,"5555555555")
				}else{
					for(var i = 0; i < discuss_arr.length; i++) {

							if(i == discuss_arr.length - 1) {
								new_str += discuss_arr[i]
							} else {
								new_str +=discuss_arr[i] + ","

							}

						}
				}

					////console.log(str,"评论")
					/*请求评论记录*/
					if(new_str != "") {
						
						
						//console.log(new_arr,"777777777")
						localStorage.discuss = new_str;
						var url = this.$store.state.request_url + "/api/map/user/artUserMessagePush.do";
						var memId = this.$store.state.data.memId;
						var ts = new Date().getTime();
						var token = this.$store.state.data.tokEn;
						var sign = md5(url + memId + token + ts);
						this.$http({
							url: this.$store.state.request_url + '/api/map/user/artUserMessagePush.do?memId=' + memId + "&ts=" + ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn": sign
							},
							body: {
								fldrId: new_str,
								type: "discuss"
							},
							emulateJSON: false,
						}).then(function(response) {

							if(response.body.meta.res === "00000") {
								//console.log(response.body);
								this.msgs = response.body.data;
								this.$store.state.discuss=[];
							}
						})
					}

			},
			shan_s(){
				this.xian_s = false
			},
			que(){
				if(this.calls.length>0||this.msgs.length>0){
					localStorage.like ="";
					this.$store.state.likes=[];
					localStorage.discuss="";
					this.$store.state.discuss=[];
					this.calls=[];
					this.msgs=[];
					
					/*提示语*/
					Toast({
						message: '成功清空数据',
						position: 'middle',
						duration: 2000
					});
				}else{
					/*提示语*/
					Toast({
						message: '暂无数据',
						position: 'middle',
						duration: 2000
					});
				}
				
			},
			detail_img() {
				////console.log(this.$refs.pic, "*******************")

				if(this.$refs.pic) {

					for(var i = 0; i < this.$refs.pic.length; i++) {
						//this.$refs.img_boxs[i]
						var img = new Image();
						img.src = this.$refs.pic[i].src;

						/*对比原始比例*/
						if((img.width / img.height) < (140/ 140)) {
							this.$refs.pic[i].style.width = "1.4rem";
							this.$refs.pic[i].style.height = "auto";

						} else if((img.width / img.height) > (140 / 140)) {
							this.$refs.pic[i].style.height = "1.4rem";
							this.$refs.pic[i].style.width = "auto";

						} else {
							this.$refs.pic[i].style.width = "1.4rem";
							this.$refs.pic[i].style.height = "1.4rem";
						}

					}
				}

			},

		},
		created() {
			this.$store.state.is_bottom=false;//底部栏显隐
			//console.log(this.$store.state.is_bottom,"888888888")
			//this.msgs=this.$store.state.likes;
			////console.log(this.$store.state.discuss,"总评论")
			////console.log(this.$store.state.likes,"总点赞")
			this.request_call_data(); //请求点赞
			this.request_comemt_data(); //请求评论
		}
	}
</script>

<style scoped="scoped">
	.zhe{
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 9994; 
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
	.chat_box {
		width: 100%;
		height: 1.7rem;
		margin-top: 0.02rem;
	}
	
	.test_box {
		width: 7rem;
		height: 2.5rem;
		float: right;
		border-bottom: 0.005rem solid #f1f1f1;
	}
	
	.text_boxs {
		margin-left: 0.95rem;
		font-size: 0.28rem;
		width: 3.4rem;
		display: -webkit-box;
		display: -moz-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		background-color: #fff;
		-webkit-line-clamp: 1;
	}
</style>