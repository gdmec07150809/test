<template>
	<div class="home" style="position: relative;">
		<!--<addfacth v-bind:m='me'></addfacth>-->

		<!--</div>-->
		<!--<div style="position:absolute;top: 0;width: 100%;">-->
			<!--
            	作者：672423400@qq.com
            	时间：2018-05-29
            	描述：$store.state.is_friend
            -->
		<Pairingsuccess v-show="$store.state.is_friendss"></Pairingsuccess>
		<router-view ></router-view>
		<!--</div>-->
		
		<div ref='mybox' class="bottom_div" v-show="$store.state.is_bottom">
			<div :class="{spans:zuan.noe,spanstower:zuan.noa}" style="font-size: 0.6rem;" @touchstart="one">

				<div style="width: 40%;margin-left: 30%; margin-right: 30%;">
					<img class="imgs" :src="ims.img1"></img>
				</div>

			</div>
			
			
			
			<div :class="{spans:zuan.noe2,spanstower:zuan.noa2}" style="font-size: 0.6rem;" @touchstart="tower">
				<div style="width: 40%;margin-left: 30%; margin-right: 30%;">
					<img class="imgs" :src="ims.img2"></img>
				</div>
			</div>
			
			
			<!--<p style="font-size:0.26rem;margin-top: -0.12rem;">广场</p>-->
			<div class='spanstower' style="font-size: 0.6rem;width:28%" >
				<div style="width: 50%;margin-left: 25%; margin-right: 25%;position: relative;">
					<img @click="therr" style="width: 100%;height: 0.6rem;margin-top: 0.25rem;position: absolute;" class="imgs" :src="ims.img3"></img>
				</div>
				<!--<img style="width: 0.9rem;height: 0.6rem;margin-left:-0.1rem;margin-top: 0.25rem;" class="imgs" :src="ims.img3"></img>-->
			</div>
             
             
             
             
			<div :class="{spans:zuan.noe4,spanstower:zuan.noa4}" style="font-size: 0.6rem;position: relative;" @touchstart="four">

				<div class="shu" v-show="$store.state.is_infro"></div>

				<div style="width: 40%;margin-left: 30%; margin-right: 30%;">
					<img class="imgs" :src="ims.img4"></img>
				</div>

			</div>




			<div :class="{spans:zuan.noe5,spanstower:zuan.noa5}" style="font-size: 0.6rem;" @touchstart="five">
				<div style="width: 40%;margin-left: 30%; margin-right: 30%;">
					<img class="imgs" :src="ims.img5"></img>
				</div>
				<!--<img  class="imgs" :src="ims.img5"></img>-->

			</div>
			<!--<p style="font-size: 0.26rem;margin-top: -0.12rem">我的</p>-->
		</div>
		
		<div v-show="$store.state.is_pay" class="zhe" @click="cannel">
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 0.6rem;">
					<p style="font-size:0.32rem;padding-top: 0.4rem;">由于您余额不足，是否跳转至支付界面进行充值?</p>
				</div>

				<div style="width:100%;height:0.96rem;border-top:0.02rem solid #E0E0E0;line-height: 0.96rem;">
					<div   style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.32rem;" @click.stop="confirm">
						确定
					</div>
					<div style="width:49%;height: 100%;text-align: center;float:left;font-size:0.32rem;color: #CCCCCC;"  @click.stop="cannel">
						取消
					</div>
				</div>
			</div>
		</div>
		
		<div v-show="xian_s" class="zhe"  @touchmove.prevent>
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="width:100%;height: 0.07rem;"></div>
				<p style="    font-size: 0.35rem;margin-top: 0.45rem;">你当前是“游客状态”无法操作，是否立即去登录?</p>
				<div  style="width:100%;height:1rem;margin-top: 0.56rem;border-top:0.02rem solid #E0E0E0;line-height: 1rem;">
					<div @click="shan_chu" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.38rem;">
						 确定
					</div>
					<div @click="shan_s" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.38rem;">
						 取消
					</div>
				</div>
			</div>
		</div>  
		  
		
	</div>
</template>
<script>
	import router from '../../router/index.js'
	import addfacth from '../add/add_facth.vue'
	import store from '../../vuex/store.js'
	import Pairingsuccess from './Pairing_success.vue'
	
	export default {
		store,
		components: {
			Pairingsuccess,
		},
		data() {
			return {
				xian_s:false,
				zuan: {
					noa: false,
					noe: true,
					noa2: false,
					noe2: true,
					noa3: false,
					noe3: true,
					noa4: false,
					noe4: true,
					noa5: false,
					noe5: true,
				},
				friend_mes: {
					friend: false,
				},
				ims: {
					img1: 'static/img/xin/icon_home_normal.png',
					img1s: 'static/img/xin/icon_home_active.png',
					img2: 'static/img/xin/icon_ground_normal.png',
					img2s: 'static/img/xin/icon_ground_active.png',
					img3: 'static/img/xin/icon_announce.png',
					img3s: 'static/img/xin/icon_announce_add.png',
					img4: 'static/img/xin/icon_news_normal.png',
					img4s: 'static/img/xin/icon_news_active.png',
					img5: 'static/img/xin/icon_my_normal.png',
					img5s: 'static/img/xin/icon_my_active.png',
				},
				is_show: true

			}
		},
		methods: {
			shan_chu(){
				 this.$router.push({
						path: '/home'
				 }); 
			},
			
			shan_s(){
		        this.xian_s = false
  	        },
			one(){
				router.push({
					path: '../slider'
				})
				this.zuan.noa = true;
				this.zuan.noe = false;
				this.zuan.noe2 = true;
				this.zuan.noe3 = true;
				this.zuan.noe4 = true;
				this.zuan.noe5 = true;
				this.zuan.noa2 = false;
				this.zuan.noa3 = false;
				this.zuan.noa4 = false;
				this.zuan.noa5 = false;
				this.$store.state.tr = 0
				this.$store.state.home_tai = 1

				this.ims.img1 = 'static/img/xin/icon_home_active.png'
				this.ims.img2 = 'static/img/xin/icon_ground_normal.png'
				this.ims.img3 = 'static/img/xin/icon_announce.png'
				this.ims.img4 = 'static/img/xin/icon_news_normal.png'
				this.ims.img5 = 'static/img/xin/icon_my_normal.png'

			},
			tower() {
				router.push({
					path: '../square'
				})
				this.zuan.noa = false;
				this.zuan.noe = true;
				this.zuan.noe2 = false;
				this.zuan.noa2 = true;
				this.zuan.noe3 = true;
				this.zuan.noe4 = true;
				this.zuan.noe5 = true;
				this.zuan.noa5 = false;
				this.zuan.noa3 = false;
				this.zuan.noa4 = false;
				this.$store.state.tr = 0
				this.$store.state.home_tai = 2

				this.ims.img1 = 'static/img/xin/icon_home_normal.png'
				this.ims.img2 = 'static/img/xin/icon_ground_active.png'
				this.ims.img3 = 'static/img/xin/icon_announce.png'
				this.ims.img4 = 'static/img/xin/icon_news_normal.png'
				this.ims.img5 = 'static/img/xin/icon_my_normal.png'

			},
			therr() {
				if(localStorage.yous=='true'){
					this.xian_s = true
				}else{
					router.push({
					path: '../add_facth'
				   })
				}
				
			},
			four() {
				
			
				this.$store.state.is_infro = false;
				router.push({
					path: '../message/chat'
				})
				this.zuan.noa = false;
				this.zuan.noe = true;
				this.zuan.noe2 = true;
				this.zuan.noe3 = true;
				this.zuan.noe4 = false;
				this.zuan.noe5 = true;
				this.zuan.noa2 = false;
				this.zuan.noa3 = false;
				this.zuan.noa4 = true;
				this.zuan.noa5 = false;
				this.$store.state.tr = 0
				this.$store.state.home_tai = 3

				this.ims.img1 = 'static/img/xin/icon_home_normal.png'
				this.ims.img2 = 'static/img/xin/icon_ground_normal.png'
				this.ims.img3 = 'static/img/xin/icon_announce.png'
				this.ims.img4 = 'static/img/xin/icon_news_active.png'
				this.ims.img5 = 'static/img/xin/icon_my_normal.png'

			},
			five() {
				router.push({
					path: '../myspace'
				})
				this.zuan.noa = false;
				this.zuan.noe = true;
				this.zuan.noe2 = true;
				this.zuan.noe3 = true;
				this.zuan.noe4 = true;
				this.zuan.noe5 = false;
				this.zuan.noa2 = false;
				this.zuan.noa3 = false;
				this.zuan.noa4 = false;
				this.zuan.noa5 = true;
				this.$store.state.tr = 0
				this.$store.state.home_tai = 4

				this.ims.img1 = 'static/img/xin/icon_home_normal.png'
				this.ims.img2 = 'static/img/xin/icon_ground_normal.png'
				this.ims.img3 = 'static/img/xin/icon_announce.png'
				this.ims.img4 = 'static/img/xin/icon_news_normal.png'
				this.ims.img5 = 'static/img/xin/icon_my_active.png'

			},
/*报错*/
//      pushHistory () {
//        var state = {
//       url: '/*' //  当前页面的地址
//      }
//         window.history.pushState(state, 'title', '/*')   //  当前页面的地址
//      },
		/*跳到充值页面*/
        confirm(){
        	 	this.$store.state.is_pay=false
			 	this.$router.push({
						path: '../Rechargepage'
						});
			 
        },//取消
        cannel(){
        	this.$store.state.is_pay=false
        }
        
		},
		mounted() {
			  
//			console.log('0000000000000000000000000000000000000')
			
			 
			
              window.addEventListener('popstate', function (e){
               //window.location.href = "/slider"  //  要返回的页面地址
                 
			   	router.push({
					path: '../swiper2'
				})
			  
          }, false) 
          
             if(localStorage.swipers==undefined||localStorage.swipers==null||localStorage.swipers!=2){
				 
				this.$router.push({
					path: './swiper2'
				});
				
			   }else{
			   	this.one()
			   }
            
			

		}
	}
</script>

<style scoped="scoped">
	* {
		margin: 0;
		padding: 0;
	}
	
	.bottom_div {
		width: 100%;
		height: 1.1rem;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 15px 0.1px #CACACA;
		position: fixed;
		bottom: 0rem;
		left: 0;
	}
	
	.spans {
		color: #CACACA;
		position: relative;
		transition: 1s;
		width: 18%;
		height: 100%;
		float: left;
	}
	
	.spanstower {
		color: black;
		position: relative;
		transition: 0.5s;
		width: 18%;
		height: 100%;
		float: left;
	}
	
	.imgs {
		width: 0.5rem;
		height: 0.5rem;
		margin-top: 0.3rem;
	}
	
	.shu {
		padding: 0.1rem;
		position: absolute;
		top: 0.1rem;
		right: 0.2rem;
		background-color: red;
		border-radius: 50%;
	}
	
	.home {
		width: 100%;
		position: relative;
	}
	
	.zhe {
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 3000;
		background: rgba(0, 0, 0, .6);
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
	.zhe{
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 9994; 
		background: rgba(0,0,0,.6);
	}
	.zhe_1{
		width: 5rem;
		height: 3.2rem;
		background: white;
		margin: 0 auto;
		border-radius: 0.2rem;
		margin-top: 6rem;
		text-align: center;
	}
</style>