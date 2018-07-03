<template>
	<!--
    	作者：672423400@qq.com
    	时间：2018-06-08
    	描述：隐私设置
    -->
	<div id="app" style="overflow: hidden;">
		<div style="width: 100%;height: 1rem;text-align:center;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<span  @click="hui" style="font-size:0.4rem;color: #2E3135;position: absolute;left:0.3rem;top: 0.07rem;">
			<img style="width: 0.3rem;margin-right: 0.1rem;" src="../../assets/img/zuo.png" alt="" /></span>
			
	   		<p style="font-size: 0.38rem;line-height: 1rem;float:left;margin-left: 2.9rem;">隐私设置</p>
	    </div>
		
		
		<div  class="item" @click="friend_tap">
			  <p style="font-size: 0.32rem;line-height: 1.4rem;float:left;margin-left: 0.3rem;color:rgba(46,49,53,1);">仅向好友公开</p>
			  <img  style="float:right;width:0.4rem;margin-top:0.45rem;margin-right: 0.35rem;" :src="friend?'static/img/icon_my_choose.png':''"/>
		</div>
		<div  class="item" @click="vip_tap">
			  <p style="font-size: 0.32rem;line-height: 1.4rem;float:left;margin-left: 0.3rem;color:rgba(46,49,53,1);">仅向好友及VIP级别的陌生人公开</p>
			  <img  style="float:right;width:0.4rem;margin-top:0.45rem;margin-right: 0.35rem;" :src="vip?'static/img/icon_my_choose.png':''"/>
		</div>
		<div class="item" @click="all_tap">
			<div style="float:left;">
				 <p style="font-size: 0.32rem;margin-left: 0.3rem;margin-top: 0.1rem;color:rgba(46,49,53,1);">向所有人公开</p>
				 <p style="margin-left: 0.3rem;color: #CCCCCC;font-size: 0.26rem;margin-top: 0.2rem;">隐私保护级别最低，但能让更多人认识您</p>
			</div>
			 
			  <img  style="float:right;width:0.4rem;margin-top:0.45rem;margin-right: 0.35rem;" :src="all?'static/img/icon_my_choose.png':''"/>
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default {
		store,
		data(){
			return{
				active:[],
				ac_name:'',
				friend:false,
				vip:false,
				all:true
			}
		},
		mounted(){
					/**判断全局数据的选项*/
					localStorage.diaries_privacy=this.$store.state.diaries_privacy
					var str=localStorage.diaries_privacy;
					switch(str){
						case '仅向好友公开':
								this.friend=true;
								this.vip=false;
								this.all=false;
						break;
						
						case '仅向好友及VIP级别的陌生人公开':
								this.friend=false;
								this.vip=true;
								this.all=false;
						break;
						
						case '向所有人公开':
								this.friend=false;
								this.vip=false;
								this.all=true;
						break;
					}
		},
		methods:{
			/**选择好友可见*/
			friend_tap(){
				this.friend=true;
				this.vip=false;
				this.all=false;
				
				localStorage.diaries_privacy="仅向好友公开"
				this.$router.push({
								path: '../Diaries'
							});
			},
			/**选择仅向好友及VIP可见*/
			vip_tap(){
				this.friend=false;
				this.vip=true;
				this.all=false;
				localStorage.diaries_privacy="仅向好友及VIP级别的陌生人公开"
				this.$router.push({
								path: '../Diaries'
							});
			},
			/**选择仅向所有人可见*/
			all_tap(){
				this.friend=false;
				this.vip=false;
				this.all=true;
				localStorage.diaries_privacy="向所有人公开"
				this.$router.push({
								path: '../Diaries'
							});
				
			},
			hui(){
				this.$router.push({
								path: '../Diaries'
							});
			}
			
		},
	}
	
</script>

<style scoped="scoped">
	#app{
		width:100%;
		overflow: hidden;
	}
	.item{
		width: 100%;height: 1.4rem;border-bottom: 0.02rem solid #F8F8F8;
	}
</style>