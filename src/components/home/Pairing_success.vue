<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-31
    	描述：配对成功
    -->
	<div style="width: 100%;height: 13.3rem;position: fixed;top: 0;left: 0;z-index: 30000;background: rgba(0,0,0,0.6);text-align:center;">
		<img style="width:5.07rem;height:1.07rem;margin-top:2.43rem;" src="../../assets/img/icon_match.png" alt="" />
		
		<p style="font-size:0.3rem;color: white;margin-top: 0.2rem;">{{$store.state.friends_to.message}}</p>
		<!--
          	作者：2443611475@qq.com
          	时间：2018-03-31
          	描述：用户头像
          -->
		<img class="tou" :src="$store.state.friends_to.fromOpPic" alt="" />
		<img class="tou" style="position: absolute;right: 1.35rem;top:4.2rem;" :src="pic" alt="" />

		<!--<img class="tus" src="../../assets/img/fenxiang.png" alt="" />
		<p class="p_s" style="font-size:0.3rem;color: white;">分享这一美好时刻</p>-->

		<button class="btn" @click="to_chat($store.state.friends_to)">发送消息</button>
		<button @click="hui" class="btns">继续使用</button>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	export default {
		data(){
			return{
				pic:''
			}
		},
          methods:{
          	hui(){
          		this.$store.state.is_friendss=false
          		this.$router.push({
						path: '../slider'
						});
          		
          	},
          	
			to_chat(i) {
				this.$store.state.is_friendss=false	
				this.$store.state.chat_tiao = 0
				this.$store.state.chat_item = i
				//console.log(i, 5555555555)

				this.$router.push({
					path: '../chat_to'
				});

			},
          },
          created(){
          	this.pic=localStorage.opPic
          	//console.log(this.$store.state.is_friend,"22222222222222222222222222")
          }
	}
</script>

<style scoped="scoped">
	* {
		outline: none;
	}
	
	.tou {
		width: 2.61rem;
		height: 2.61rem;
		border-radius: 50%;
		float: left;
		margin-top: 0.4rem;
		margin-left: 1.31rem;
		border: 0.05rem solid white;
	}
	
	.tus {
		width: 0.36rem;
		height: 0.36rem;
		position: absolute;
		top: 7.52rem;
		left: 2.42rem;
	}
	
	.p_s {
		position: absolute;
		top: 7.5rem;
		left: 2rem;
	}
	
	.btn {
		width: 5.8rem;
		height: 1rem;
		background: rgba(255, 154, 43, 1);
		border-radius: 0.1rem;
		margin-top: 2rem;
		color: white;
		font-size: 0.3rem;
	}
	
	.btns {
		width: 5.80rem;
		height: 1rem;
		background: none;
		border-radius: 0.1rem;
		border: 0.02rem solid white;
		color: white;
		font-size: 0.3rem;
		margin-top: 0.3rem;
	}
</style>