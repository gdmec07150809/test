<template>
	<div id="app">
		<div class="back" @click="backTo()">
			<img src="../../assets/img/zuo.png" />
			<p>返回</p>

		</div>

		<div class="title">
			<div class="title_left">
				<p class="title_p">专业领域</p>
				<p class="title_tip">请选择您所在的专业领域，可多选</p>
			</div>
		</div>
		<div class="content">
			<!--<div class="item_content">
				<ul class="item1">
					<li v-for="item in item_content">{{item}}</li>
				</ul>
			</div>-->

			<div class="tab">
				<div class="swiper-container_sss">
					<div class="swiper-wrapper">
						<div class="swiper-slide lis" v-for="(t,index) in title" @click="itemTap(t.dictName,index)" :class="{listo:index==i}">

							<p>{{t.dictName}}</p>
							<div :class="{defultTo:index==i}" class="move"></div>

						</div>
					</div>
				</div>
			</div>
			<div :class="{vanish:act.noa1,select_ul:act.noe1}">
				<ul class="eyes">
					<li v-for="(arr,index) in eye " class="li_defultTo" :class="{li_active:arr.id}" @click="eyes(index)">{{arr.dictName}}
						<!--<img v-show="arr.id" src="../../assets/img/gou.png" />-->
					</li>

				</ul>
			</div>

		</div>

		<div class="sumbit" @click="confirm">
			<p>完成注册</p>
		</div>
	</div>
</template>

<script src="../../../static/js/adaption.js"></script>

<script>
	import { Toast } from 'mint-ui';
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	//import swiper from '../../../static/js/swiper.js'
	export default {
		//			el:"#app",
		store,
		data() {
			return {
				is_if: false,

				act: {
					noa1: false,
					noe1: true,
					noa2: true,
					noe2: false,
					noa3: true,
					noe3: false,
					noa4: true,
					noe4: false
				},
				title: [],
				eye: [],
				letter: [

				],
				design: [],
				i: '',
				item_content: [], //选择的子项数组
				item_title: '造型' //默认选择的标题
			}

		},
		methods: {
			backTo() {
				//				window.location = '/#/regiter_information'
				this.$router.push({
					path: '../regiter_information'
				})
			},
			itemTap(t, index) {

				this.item_title = t;
				this.item_content = [];
				this.i = index;
				this.eye = this.title[index].dataDictionary
			},
			confirm() {

				/*处理选择后的子项数组，格式跟后台保持一致*/
				
					//console.log(this.item_title, "--", this.item_content)
					var str = ""
					if(this.item_content.length > 1) {
						for(var i = 0; i < this.item_content.length; i++) {
							if(i == this.item_content.length - 1) {
								str += this.item_content[i]
							} else {
								str += this.item_content[i] + ","
							}

						}

					} else {
						str = this.item_content[0]
					}

					/*上传信息*/
					//if(str != "") {
					//console.log(this.item_title,"------",str, "领域", this.$store.state.regiter_data, )

					var url = this.$store.state.request_url + "/api/map/user/editArtist.do";
					var memId = localStorage.memId;
					var ts = new Date().getTime();
					var token = localStorage.tokEn;
					var sign = md5(url + memId + token + ts);
					this.$http({
						url: this.$store.state.request_url + '/api/map/user/editArtist.do?memId=' + memId + "&ts=" + ts,
						method: 'post',
						headers: {
							"content-type": "application/json;charset=UTF-8",
							"sIgn": sign
						},
						body: {
							opId: localStorage.memId, //用户Id
							nickname: this.$store.state.regiter_data.nink, //昵称
							opSex: this.$store.state.regiter_data.sex, //性别
							opBirthday: this.$store.state.regiter_data.both, //生日
							opAddress: { //地址
								na: "",
								ar: "",
								pc: "",
								pv: this.$store.state.regiter_data.location.split("-")[0],
								ct: this.$store.state.regiter_data.location.split("-")[1],
								dt: "",
								da: this.$store.state.regiter_data.location,
								fa: "",
								lo: "",
								la: ""
							},
							specialization: { //专业领域
								artCategoryName: this.item_title,
								artCategorySubclass: str
							},
							opPic: this.$store.state.regiter_data.img //头像路径
						},
						emulateJSON: false,
					}).then(function(response) {
						if(response.body.meta.res === "00000") {
							//console.log("成功")

							localStorage.opPic = this.$store.state.regiter_data.img;
							localStorage.nickname = this.$store.state.regiter_data.nink;

							localStorage.wanshan = 'true'

							/*提示语*/
							Toast({
								message: "注册成功",
								position: 'middle',
								duration: 2000
							});

							/*成功后跳转*/
							//								window.location="/#/slider"
							this.$router.push({
								path: '../slider'
							})

						} else {

							//console.log(response.body.meta.msg)
							/*提示语*/
							Toast({
								message: response.body.meta.msg,
								position: 'middle',
								duration: 2000
							});
						}
					})

				

				//				} else {
				//					/*提示语*/
				//					Toast({
				//						message: "请选择专业领域",
				//						position: 'middle',
				//						duration: 2000
				//					});
				//				}

			},

			/*视觉*/
			eyes(index) {
				for(var k = 0; k < this.title.length; k++) {
					//console.log(this.title[k].dictName,this.item_title,"111111111")
					if(this.title[k].dictName != this.item_title) {
						console.log(this.title[k].dictName, this.item_title, "00000000000")
						for(var l = 0; l < this.title[k].dataDictionary.length; l++) {
							this.title[k].dataDictionary[l].id = false

						}
						////console.log(this.title[k].dataDictionary)
					}
				}

				this.eye[index].id = !this.eye[index].id;
				//console.log(this.eye[index].id )
				if(this.eye[index].id == true) {
					if(this.item_content.indexOf(this.eye[index].dictName) == -1) {
						if(this.item_content.length == 5) {
							this.eye[index].id = false
							/*提示语*/
							Toast({
								message: "最多只能选择五个",
								position: 'middle',
								duration: 2000
							});

						} else {
							this.item_content.push(this.eye[index].dictName);
						}

					}

				}

				if(this.eye[index].id == false) {

					for(var i = 0; i < this.eye.length; i++) {

						if(this.item_content.indexOf(this.eye[index].dictName) > -1) {
							for(var j = 0; j < this.item_content.length; j++) {
								if(this.item_content[j] == this.eye[index].dictName) {
									//console.log(this.item_content[j]);
									this.item_content.splice(j, 1);
								}
							}

						}
					}

				}
				console.log(this.item_title, "-", this.item_content)
			},
			getZhuanye() {
				var url = this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {

						parentId: "4f5e22db04214b85a627e8bf416a7e66",
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {
						console.log(response.body.data, "000000000")
						var array = [];
						array = response.body.data;
						for(var j = 0; j < array.length; j++) {
							for(var i = 0; i < array[j].dataDictionary.length; i++) {
								array[j].dataDictionary[i].id = false
							}
						}

						this.title = array;

						this.eye = this.title[0].dataDictionary;

						//								setTimeout(()=>{
						//									this.swipers();
						//								},50)
					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			/**顶部条件栏*/
			//			swipers() {
			//				new swiper('.swiper-container_sss', {
			//					slidesPerView: 4.5,
			//					centeredSlides: 0,
			//					observer: true, //修改swiper自己或子元素时，自动初始化swiper 
			//					observeParents: true, //修改swiper的父元素时，自动初始化swiper 
			//				})
			//			},
		},
		created() {

			this.$store.state.is_bottom = false; //底部栏显隐
			this.getZhuanye();
		},
		mounted() {
			//this.swipers();
		}

	}
</script>

<style scoped="scoped">
	@import url("../../assets/css/swiper.css");
	li {
		list-style-type: none;
	}
	
	p,
	ul {
		margin: 0;
		padding: 0;
	}
	
	#app {
		width: 100%;
		overflow: hidden;
		margin: 0px auto;
	}
	/*返回*/
	
	.back {
		width: 1.8rem;
		height: 1.1rem;
		margin-left: 0.25rem;
	}
	
	.back img {
		width: 0.4rem;
		height: 0.4rem;
		float: left;
		margin-top: 0.35rem;
	}
	
	.back p {
		font-size: 0.4rem;
		margin-left: 0.1rem;
		float: left;
		line-height: 1.1rem;
	}
	/*标题*/
	
	.title {
		width: 100%;
		height: 1.5rem;
		margin-top: 0.25rem;
		margin-left: 0.25rem;
	}
	
	.title_p {
		font-size: 0.6rem;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		font-family: castellar;
	}
	
	.title_tip {
		font-size: 0.32rem;
		color: #D0D0D0;
	}
	/*tab菜单*/
	
	.tab {
		width: 90%;
		height: 1rem;
		overflow-x: auto;
		margin: 0.25rem 5% 0;
	}
	
	.tab ul {
		width: 100%;
		height: 100%;
	}
	/*.tab ul li{
		float: left;
		font-size: 0.8rem;
		color: #D0D0D0;
		width: 15%;
		margin-right: 0.5rem;
	}*/
	
	.lis {
		float: left;
		width: auto;
		font-size: 0.38rem;
		color: #D0D0D0;
		margin-right: 0.25rem;
	}
	
	.listo {
		font-size: 0.38rem;
		color: #000000;
		margin-right: 0.25rem;
		font-weight: 600;
	}
	
	.move {
		width: 100%;
		margin-top: 0.1rem;
		height: 0.05rem;
	}
	
	.defultTo {
		width: 100%;
		margin-top: 0.1rem;
		background-color: #ff9d00;
		height: 0.05rem;
	}
	
	.sumbit {
		width: 80%;
		height: 0.9rem;
		border-radius: 0.1rem;
		background-color: #000000;
		position: fixed;
		bottom: 0.5rem;
		margin: 0 10%;
	}
	/*流式布局*/
	
	.select_ul {
		width: 90%;
		margin: 0 3%;
		display: block;
		overflow: hidden;
	}
	
	.select_ul ul {
		width: 100%;
		overflow: hidden;
	}
	
	.li_defultTo {
		font-size: 0.3rem;
		font-family: SimHei;
		color: rgba(46, 49, 53, 1);
		text-align: center;
		float: left;
		line-height: 0.5rem;
		border-radius: 0.05rem;
		background-color: #F5F4F7;
		margin: 0.25rem 0.1rem;
		padding: 0 0.2rem;
	}
	
	.li_active {
		font-size: 0.3rem;
		font-family: SimHei;
		color: #ffffff;
		text-align: center;
		float: left;
		border-radius: 0.05rem;
		line-height: 0.5rem;
		background-color: #FF9A2B;
		margin: 0.25rem 0.1rem;
		padding: 0 0.2rem;
	}
	
	.vanish {
		width: 90%;
		margin: 0 3%;
		display: none;
	}
	
	.sumbit p {
		text-align: center;
		color: #fff;
		font-size: 0.36rem;
		line-height: 0.9rem;
	}
	
	.eyes li,
	.letters li,
	.designs li {
		position: relative;
	}
	
	.eyes li img,
	.letters li img,
	.designs li img {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 0.28rem;
		height: 0.28rem;
	}
	
	.item_content {
		width: 100%;
	}
	
	.item1 {
		width: 100%;
		overflow: hidden;
	}
	
	.item1 li {
		font-size: 0.3rem;
		font-family: SimHei;
		color: rgba(46, 49, 53, 1);
		text-align: center;
		float: left;
		border-radius: 0.15rem;
		border: #000 solid 1px;
		margin: 0.1rem 0.1rem;
		padding: 0 0.1rem;
		line-height: 0.5rem;
	}
	
	.content {
		width: 100%;
		height: 8rem;
		overflow-x: hidden;
		overflow-y: scroll;
	}
</style>