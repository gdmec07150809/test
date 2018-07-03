<template>
	<div class="mid-center" style="position: relative;">
		<!--<Pairingsuccess v-show="$store.state.is_friendss"></Pairingsuccess>-->
		<dashang @refreshList="dashangs" v-show='$store.state.dashang'></dashang>

		<div v-show="$store.state.update_version" class="zhe">
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="height: 1.9rem; line-height: 1.9rem;">
					<p style="font-size:0.32rem;">检测到新版本,是否立即更新?</p>
				</div>

				<div style="width:100%;height:0.96rem;border-top:0.02rem solid #E0E0E0;line-height: 0.96rem;">

					<a :href="$store.state.is_sc.apkurl" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.32rem;display: block;">
						确定
					</a>
					<div @click="cannel" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.32rem;color: #CCCCCC;">
						取消
					</div>
				</div>

			</div>
		</div>
		<div style="width: 100%;position: fixed;top: 0;">
			<img style="position: absolute;width: 2rem;top: 0.3rem;left: 0.33rem;" src="../../assets/img/drawable-xxxhdpi/icon_homeicon.png" />
			<img v-show="$store.state.is_sc.ss" @touchstart="to_Conditionscreening" style="position: absolute;top: 0.46rem;right: 0.33rem;width: 0.4rem;z-index: 300" src="../../assets/img/drawable-xxxhdpi/icon_search.png" alt="" />

			<div class="stack-wrapper">
				<!--
     	作者：2443611475@qq.com
     	时间：2018-03-30
     	描述：:pages="someList"
     -->
				<stack ref="stack" :stackinit="stackinit"></stack>
			</div>
		</div>
		<div v-show="dal" style="width:100%;height: 13.3rem;background: rgba(0,0,0,0.5);position: fixed;top: 0;">
			<div class="da" style="width:4rem;height:25%;background:white;margin: 5rem 1.9rem;overflow:hidden;position: relative;">
				<p class="p_text">当前没有账号登录，是否前往登录？</p>

				<div style="width:100%;height:25%;position: absolute;bottom: 0;left: 0;">

					<button style="background: white;" class="btn">取消</button>

					<button @click="queren" style="background: black;color: white;" class="btn">确认</button>

				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import stack from './stack.vue'
	import dashang from './dashang.vue'
	import store from '../../vuex/store.js'
	import axios from 'axios'
	import md5 from 'js-md5';
	import Pairingsuccess from './Pairing_success.vue'

	export default {
		//el: '#stack',
		axios,
		store,
		data() {
			return {
				someList: [],
				stackinit: {
					visible: 3
				},
				das: {
					da: false
				},
				dal: false,

				url_s: '',

				url_ss: '',

			}
		},

		components: {
			stack,
			dashang,
			Pairingsuccess,
		},
		methods: {
			ca_xun() {

			},

			queren() {
				this.$router.push({
					path: '../home'
				});

			},
			/*取消更新*/
			cannel() {
				this.setCookie("1", 1)
				this.$store.state.update_version = false;
			},
			//  prev () {
			//    this.$refs.stack.$emit('prev')
			//    
			//  },
			//  next () {
			//    this.$refs.stack.$emit('next')
			//  },
			//  tops () {
			//    this.$refs.stack.$emit('tops')
			//  }

			dashangs() {
				this.$refs.stack.$emit('test')

			},

//			shang_c() {
//				var url = this.$store.state.request_url + "/api/map/user/editArtist.do";
//				var id = this.$store.state.data.memId;
//				var token = this.$store.state.data.tokEn;
//				var ts = new Date().getTime();
//				var sign = md5(url + id + token + ts)
//
//				this.$http({
//					url: this.$store.state.request_url + "/api/map/user/editArtist.do?memId=" + id + "&ts=" + ts,
//					headers: {
//						"content-type": "application/json;charset=UTF-8",
//						'sIgn': sign
//					},
//					emulateJSON: false,
//					method: 'post',
//					body: {
//						opId: id,
//						opPic: '../../../static/img/iconheadimg.png', //用户头像
//					}
//				}).then(function(response) {
//					//console.log(response.body.meta, '上传头像数据')
//					if(response.body.meta.res == '00000') {
//						//						this.huoqu_url()
//					}
//				})
//			},

			/*获取用户信息*/
			getUserInfo(id, token) {
				var url = this.$store.state.request_url + "/api/map/user/artUserInfo.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				this.$http({
					url: this.$store.state.request_url + "/api/map/user/artUserInfo.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: id
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						//console.log(response.body.data, '用户信息数据')
                        
                         if(response.body.data.opPic==null||response.body.data.opPic==''){
                         	   this.$router.push({
					                 path: '/regiter_information'
				               });
                         }
                         
                        
                        
						var data = response.body.data

						localStorage.opPic = response.body.data.opPic;
						localStorage.nickname = response.body.data.nickname;
						localStorage.identification = response.body.data.identification;

					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			huoqu() {
				//    	this.$http({
				//				url: "http://www.ding-new.com:8080/a10/api/map/art/getDisplayArtList.do",
				//				headers: {
				//					"content-type": "application/json;charset=UTF-8"
				//				},
				//				emulateJSON: false,
				//				method: 'post',
				//				body: {
				//					opId: '12',
				//					page: '1',
				//					rows: '50'
				//				}
				//			}).then(function(response) {
				//				//console.log(response)
				//				if(response.body.meta.res == '00000') {
				////					//console.log(response.body)
				//					//						let that = this
				//					//  setTimeout(function () {
				//					this.someList = response.body.data
				//
				//					//  }, 1000)
				//				}
				//			}).catch(function(err) {
				//				//console.log(err)
				//			})
			},
			to_Conditionscreening() {
				this.$store.state.sou_home = 0
				this.$router.push({
					path: '../Conditionscreening'
				});
			},

			
			getLocation() {
				if(navigator.geolocation) {
					//console.log("1111111111111111")
					var that = this;
					navigator.geolocation.getCurrentPosition(function(position) {
						var jd = position.coords.latitude; //纬度
						var wd = position.coords.longitude; //经度
						//alert('纬度:' + jd + ',经度:' + wd);

						var map = new BMap.Map("allmap");
						var point = new BMap.Point(wd, jd);
						var gc = new BMap.Geocoder();

						gc.getLocation(point, function(rs) {

							var addComp = rs.addressComponents;

							that.$store.state.dy = addComp.city;

						});
						//console.log("-------------------------", position, position)
					}, function(error) {
						switch(error.code) {
							case error.PERMISSION_DENIED:
								//console.log("33333333333333")
								//alert("定位失败,用户拒绝请求地理定位");
								break;
							case error.POSITION_UNAVAILABLE:
								//console.log("44444444444444")
								//alert("定位失败,位置信息是不可用");
								break;
							case error.TIMEOUT:
								//console.log("55555555555555")
								//alert("定位失败,请求获取用户位置超时");
								break;
							case error.UNKNOWN_ERROR:
								//console.log("6666666666666666")
								//alert("定位失败,定位系统失效");
								break;
						}
					}, { // 附带参数
						enableHighAccuracy: false, // 提高精度(耗费资源)
						timeout: 3000, // 超过timeout则调用失败的回调函数
						maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
					});
				} else {
					//console.log("2222222222222222")
					//alert("浏览器不支持地理定位。");
				}
			},
			//设置cookie
			setCookie(c_name, exdays) {
				var exdate = new Date(); //获取时间
				exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
				//字符串拼接cookie
				window.document.cookie = "update_version" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();

			},
			//读取cookie
			getCookie: function() {
				if(document.cookie.length > 0) {
					var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
					for(var i = 0; i < arr.length; i++) {
						var arr2 = arr[i].split('='); //再次切割
						//判断查找相对应的值
						if(arr2[0] == 'update_version') {
							return true
						}
					}
				}
			},
			//清除cookie
			clearCookie: function() {
				this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
			},
			
			to_swiper(){
//			  if(localStorage.swipers==undefined||localStorage.swipers==null||localStorage.swipers!=2){
//				 
////				  console.log(111)
//				this.$router.push({
//					path: './swiper2'
//				});
//				
//			   }
			},
			

		},
		mounted() {
           this.to_swiper()
           
           
			this.$store.state.is_bottom = true;
			this.$store.state.data.memId = localStorage.memId;
			this.$store.state.data.tokEn = localStorage.tokEn;
			this.$store.state.data.info = localStorage.info;
			//console.log(this.$store.state.data.memId, "121212")

			if(this.$store.state.data.memId == undefined || this.$store.state.data.memId == "" || this.$store.state.data.memId == null) {

				//console.log("----------")
//				this.$router.push({
//					path: '/swiper2'
//				});
//				this.dal = true
				
			} else {
				this.getUserInfo(this.$store.state.data.memId, this.$store.state.data.tokEn);
				if(this.$store.state.new_ws) {
					if(this.$store.state.new_ws.readyState != 1) {
						this.$store.state.tableList.ConnectWebsocket();
					}
				} else {
					this.$store.state.tableList.ConnectWebsocket();
				}
			}
			this.getLocation();
			
		},
        
//      updated(){
//      	console.log(localStorage.swipers,'123')
//      	
//      	
//      },
        
        
		created() {
//			 this.to_swiper()
//			 console.log(localStorage.swipers,'3333')
			 
			if(localStorage.memId == undefined || localStorage.memId.length==0 || localStorage.memId == null) {
                             localStorage.yous = 'true'//判断为游客状态
                             console.log(localStorage.yous)
			         }else{
			 	             localStorage.yous = 'false'//判断为非游客状态
			 }
			
//			 localStorage.login_s = 'l'
//			if(localStorage.wanshan!='true'||localStorage.wanshan==undefined){
//			    this.$store.state.is_bottom = false;
//				this.$router.push({
//					path: '/regiter_information'
//				});
//			}
			
			this.$store.state.tableList.back_jianting(); //监听返回键
			
			/**判断有无新版本*/
			if(apk == "" || apk == null) {
				this.$store.state.is_sc.bb = "1.0.0";
				this.$store.state.is_sc.ss = false;
				this.$store.state.is_sc.sc = false;
				this.$store.state.is_sc.zf = false;
				this.$store.state.is_sc.ds = false;
				this.$store.state.is_sc.hy = false;
				this.$store.state.is_sc.ql = false;
				this.$store.state.is_sc.yy = false;
				this.$store.state.is_sc.jl = false;

				this.$store.state.update_version = false;

			} else {
				//判断一天之内是否已提示了
				if(this.getCookie()) {
					this.$store.state.is_sc = apk;
					this.$store.state.update_version = false;
				} else {

					this.$store.state.is_sc = apk;
					//console.log(this.$store.state.is_sc, "999999999999999999999999999", apk)

					//console.log(parseFloat((this.$store.state.is_sc.bb).substring(2, (this.$store.state.is_sc.bb).length)), "-----------", (this.$store.state.is_sc.bb).substring(2, (this.$store.state.is_sc.bb).length))
					if((this.$store.state.is_sc.bb).substring(2, (this.$store.state.is_sc.bb).length) > (this.$store.state.version).substring(2, (this.$store.state.version).length)) {
						this.$store.state.update_version = true;
						this.setCookie("1", 1); //有更新就储存
					}
				}

			}

		}

	}
</script>
<style scoped="scoped">
	.stack-wrapper {
		/*list-style: none;
		pointer-events: none;*/
		/*position: fixed;top:0;z-index: -1;*/
	}
	
	.da {
		border-radius: 0.2rem;
		padding-top: 0.5rem;
	}
	
	.p_text {
		font-size: 0.4rem;
		width: 90%;
		margin-left: 9%;
	}
	
	.btn {
		width: 50%;
		height: 100%;
		font-size: 0.3rem;
		float: left;
		border: none;
	}
	
	.zhe {
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 9994;
		background: rgba(0, 0, 0, .6);
	}
	
	.zhe_1 {
		width: 80%;
		height: 2.86rem;
		background: white;
		margin: 0 10%;
		border-radius: 0.12rem;
		margin-top: 6rem;
		text-align: center;
	}
</style>