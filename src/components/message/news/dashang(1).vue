<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-20
    	描述：打赏记录
    -->
	<div style="width: 100%;overflow:hidden;position: relative;z-index: 9992;background: white;">
		<div style="width: 100%;height: 1rem;text-align:center;position: fixed;top:0;left: 0;z-index: 9992;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<img @click="hui" style="width: 0.3rem;position: absolute;left: 0.3rem;top: 0.35rem;" src="../../../assets/img/zuo.png" alt="" />
			<p style="font-size: 0.35rem;line-height: 1rem;">打赏记录</p>

		</div><div style="height: 0.88rem;"></div>
		

		<!--
        	作者：2443611475@qq.com
        	时间：2018-03-20
        	描述：循环创建
        -->
         <!--<img v-show="msgs.length==0" style="width: 4rem;margin: 23%;" src="../../../assets/img/xiao_xi/icon_noArticle.png"/>-->
        <div style="margin:  3rem 35% 0;width: 30%;text-align: center;" v-if="msgs.length==0">
			<img src="../../../assets/img/xiao_xi/icon_noGift.png" style="width: 100%" />
			<p style="margin-top: 0.2rem;color: #CCCCCC; font-size: 0.26rem;">暂时没有打赏记录！</p>
		</div>
        
		<div class="test_box" v-for="msg in msgs" @click="toWorks_detail(msg)">
			<div style="width: 4.4rem;height: 100%;float: left;position: relative;">
				<div style="width: 100%;height: 0.56rem;margin-top: 0.55rem;line-height: 0.56rem;">
					<img style="width:0.8rem;height:0.8rem;float:left;border-radius:50%;" :src="msg.opPic" />
					<p style="font-size: 0.28rem;float: left;margin-left: 0.2rem;color: #B1B1B1;">{{msg.nickname}}</p>
				</div>

				<span class="ps">
			   	<p>打赏了</p>
			   	<p style="color: #FF9A2B;">{{msg.giftWorth}}个觅币</p>
			   </span>

				<p style="font-size: 0.25rem;color: #B1B1B1;position: absolute;bottom: 0.3rem;left: 0.95rem;">{{msg.insertDate}}</p>
			</div>
			<div  style="width: 1.4rem;height:1.4rem;float: right;margin-top: 0.55rem;margin-right: 0.5rem;overflow: hidden;position: relative;">
				<img ref="pic" @load="detail_img" style="width: 1.4rem;height: 1.4rem;position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" :src="msg.picUrl" />
			</div>
		</div>

	</div>
</template>

<script>
	import store from '../../../vuex/store'
	import md5 from 'js-md5';
	export default {
		store,
		data() {
			return {
				msgs: []
			}
		},
		methods: {
			hui() {
					this.$router.push({
						path: '../message'
						});
				
			},
			request_data() {

				var rewards_arr=[];
				var new_str="";
				//console.log(localStorage.rewards,"22222222")
				if(localStorage.rewards!=undefined){
					
					if(localStorage.rewards.indexOf(",")>-1){
						rewards_arr = localStorage.rewards.split(",");
					}else{
						rewards_arr.push(localStorage.rewards)
					}
				
				}
				
				//console.log(rewards_arr,"111111111111",this.$store.state.rewards)
				/*处理成后台想要的请求数据*/
				if(this.$store.state.rewards.length > 0) {
					if(rewards_arr.length>0){
						var new_arr=this.mergeArray(rewards_arr,this.$store.state.rewards);
						
						for(var i = 0; i < new_arr.length; i++) {

							if(i == new_arr.length - 1) {
								new_str += new_arr[i]
							} else {
								new_str +=new_arr[i] + ","

							}

						}
					}else{
						for(var i = 0; i < this.$store.state.rewards.length; i++) {

							if(i == this.$store.state.rewards.length - 1) {
								new_str += this.$store.state.rewards[i]
							} else {
								new_str +=this.$store.state.rewards[i] + ","

							}

						}
					}
				}else{
					if(rewards_arr.length>0){
						for(var i = 0; i < rewards_arr.length; i++) {

							if(i == rewards_arr.length - 1) {
								new_str += rewards_arr[i]
							} else {
								new_str +=rewards_arr[i] + ","

							}

						}
					}
				}
				//console.log(new_str,"88888888888888")
					////console.log(str,"id")
					if(new_str != "") {

						localStorage.rewards=new_str;
						var url = this.$store.state.request_url + "/api/map/user/artUserMessagePush.do";
						var memId =this.$store.state.data.memId;
						var ts = new Date().getTime();
						var token = this.$store.state.data.tokEn;
						var sign = md5(url + memId + token + ts);
						/*请求打赏记录*/
						this.$http({
							url: this.$store.state.request_url + '/api/map/user/artUserMessagePush.do?memId='+memId+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn":sign
							},
							body: {
								fldrId:new_str,
								type: "reward"
							},
							emulateJSON: false,
						}).then(function(response){
                             //console.log(response.body);
							if(response.body.meta.res === "00000"){
								//console.log(response.body);
								this.msgs = response.body.data;
								
								//console.log(this.msgs,"55555")
								this.$store.state.rewards=[];
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
			/*跳到详情*/
			toWorks_detail(msg){
				
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
			//console.log(this.$store.state.is_bottom,"1111111111111")
			//console.log(this.$store.state.rewards, "打赏Id")
			this.request_data(); //处理并请求打赏数据

			//this.msgs=this.$store.state.rewards;
		}
	}
</script>

<style scoped="scoped">
	.chat_box {
		width: 100%;
		height: 1.7rem;
		margin-top: 0.02rem;
	}
	
	.test_box {
		width: 95%;
		height: 2.5rem;
		float: right;
		border-bottom: 0.005rem solid #f1f1f1;
		background-color: #fff;
	}
	
	.ps {
		font-size: 0.3rem;
		float: left;
		margin-left: 0.2rem;
		margin-top: 0.1rem;
	}
	
	.ps p {
		float: left;
	}
</style>