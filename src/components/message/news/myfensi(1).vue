<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-20
    	描述：新的粉丝
    -->
	<div style="width: 100%;overflow: hidden;position: relative;z-index: 9992;background: white;">
		<div style="width: 100%;height: 1rem;position: fixed;top:0;left: 0;z-index: 9992;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<img @click="hui" style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.35rem;" src="../../../assets/img/zuo.png" alt="" />
			<p style="font-size: 0.35rem;margin-left: 3.1rem;    line-height: 1rem;">新的粉丝</p>
		</div>
		<div style="height: 0.88rem;"></div>
	
		<div style="margin:  3rem 35% 0;width: 30%;text-align: center;" v-if="fensi.length==0">
			<img src="../../../assets/img/xiao_xi/icon_noFriend.png" style="width: 100%" />
			<p style="margin-top: 0.2rem;color: #CCCCCC; font-size: 0.26rem;">暂时没有新的粉丝哦！</p>
		</div>
		<div class="chat_box" v-for="(fen,index) in fensi" @click="to_personal(fen)">
			<img class="imgs" style="" :src="fen.opPic" alt="" />
			<div class="text_box">
				<p style="font-size: 0.38rem;margin-top: 0.35rem;margin-left: 0.2rem;">{{fen.nickname}}</p>
				<p style="font-size: 0.24rem;color: #B1B1B1;margin-left: 0.2rem;">{{fen.signature}}</p>
				<div class="biao" @click.stop="attentionTap(fen,index)">{{fen.attentionText}}</div>
			</div>
		</div>
		
		
		
		
	</div>
</template>

<script>
	import store from '../../../vuex/store'
	import { Toast } from 'mint-ui';
	import md5 from 'js-md5';
	export default {
		store,
		data() {
			return {
				fensi: [],
				attentionText:"+关注"
			}
		},
		methods: {
			hui() {
				this.$store.state.fans=[]
					this.$router.push({
						path: '../message'
						});
				
			},
			request_data() {
				/*处理成后台想要的请求数据*/
				//console.log(this.$store.state.fans)
				if(this.$store.state.fans.length > 0) {
					var str = "";
					if(this.$store.state.fans.length > 1) {
						for(var i = 0; i < this.$store.state.fans.length; i++) {
							if(i == this.$store.state.fans.length - 1) {
								str += this.$store.state.fans[i]
							} else {
								str += this.$store.state.fans[i] + ","
							}

						}
						
					} else {
						str = this.$store.state.fans[0]
					}
					
					//console.log(str)
					/*请求粉丝记录*/
					if(str != "") {
						var url = this.$store.state.request_url + "/api/map/user/artUserMessagePush.do";
						var memId =this.$store.state.data.memId;
						var ts = new Date().getTime();
						var token = this.$store.state.data.tokEn;
						var sign = md5(url + memId + token + ts);
						this.$http({
							url: this.$store.state.request_url + '/api/map/user/artUserMessagePush.do?memId='+memId+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn":sign
							},
							body: {
								fldrId: str,
								type: "fans"
							},
							emulateJSON: false,
						}).then(function(response) {

							if(response.body.meta.res === "00000") {
								//console.log(response.body);
								
								var o_arr = response.body.data;
								
								for(var i=0;i<o_arr.length;i++){
									o_arr[i].attentionText="+关注"
									this.fensi.push(o_arr[i])
								}
								
								//console.log(this.fensi,"0000000000000000000")
							}
						})
					}
					

				}

			},
			/*关注*/
			attentionTap(e,index){
				
				var url = this.$store.state.request_url + "/api/map/art/addAttention.do";
				var memId =this.$store.state.data.memId;
				var ts = new Date().getTime();
				var token = this.$store.state.data.tokEn;
				var sign = md5(url + memId + token + ts);
				var that=this;
				this.$http({
							url: this.$store.state.request_url + '/api/map/art/addAttention.do?memId='+memId+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn":sign
							},
							body: {
								opId: this.$store.state.data.memId,
								attentionOpId: e.opId,
								attentionType:"1"
							},
							emulateJSON: false,
						}).then(function(response) {

							if(response.body.meta.res === "00000"||response.body.meta.res === "99999") {
								//console.log(response.body);
								//console.log(that.fensi,"1111111111")
//								/*删除已关注的*/
//								for(var i=0;i<this.$store.state.fans.length;i++){
//									
//									//console.log(this.$store.state.fans[i].opId==e.opId,"2222222222222")
//									if(this.$store.state.fans[i].opId==e.opId){
//										this.$store.state.fans.splice(i,1)
//									}
//								}
								/*提示语*/
								Toast({
									message: '关注成功',
									position: 'middle',
									duration: 2000
								});
								
								//console.log(that.fensi[index])
								that.fensi[index].attentionText="已关注"
								
								
							}else{
								/*提示语*/
								Toast({
									message: '关注失败，请重新关注',
									position: 'middle',
									duration: 2000
								});
							}
						})
		},
		to_personal(i){
			
				this.$store.state.Author_s_detailed_routing = 9
			   this.$store.state.worksOpId = i.opId
//			   window.location = '#/personal_data'
			    this.$router.push({
						path: '../personal_data'
						});
			
		}
		},
		created() {
			this.$store.state.is_bottom=false;//底部栏显隐
			//console.log(this.$store.state.fans,"粉丝")
			this.$store.state.is_infro=false;
			this.request_data();//处理并请求粉丝数据
		}
	}
</script>

<style scoped="scoped">
	.chat_box {
		width: 100%;
		height: 1.5rem;
		margin-top: 0.02rem;
		background-color: #fff;
	}
	
	.imgs {
		width: 1.1rem;
		height: 1.1rem;
		margin: 0.2rem;
		border-radius: 50%;
	}
	
	.text_box {
		width: 5.78rem;
		height: 1.5rem;
		border-bottom: 0.005rem solid #f1f1f1;
		float: right;
		position: relative;
	}
	
	.biao {
		font-size: 0.26rem;
		width: 1.3rem;
		height: 0.54rem;
		border: 0.01rem solid black;
		text-align: center;
		line-height: 0.54rem;
		float: right;
		position: absolute;
		right: 0.2rem;
		bottom: 0.5rem;
		border-radius: 0.11rem;
	}
</style>