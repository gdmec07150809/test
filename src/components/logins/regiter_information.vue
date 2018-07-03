<template>
	<div id="app">
		<div class="back" >
			<!--<img src="../../assets/img/zuo.png" />-->
			<!--<p class="hui" @click="backTo()">返回</p>-->
			<!--<p style="float: right;font-size: 0.32rem;line-height: 1rem;margin-right: 2%;color: #ff9d00;" @click.stop="tiao">跳过此步</p>-->
		</div>
		<div class="title">
			<div class="title_left">
				<p class="title_p">基本资料</p>
				<p class="title_tip">因交友板块功能所需，性别及生日必填！</p>
			</div>
			<div class="title_right">
				<input class="file" id="xgtx" style="height: 100%; z-index: 100;position: absolute;top: 0; opacity: 0;" name="file" type="file" accept="image/png,image/jpeg" @change="update"/>
					<img v-if="imageUrl" :src="regiter_data.img" class="avatar" style="position: absolute;top: 0;">
			</div>
		</div>
		<div class="nink">
			<p>昵称</p>
			 <img class="you" src="../../assets/img/right_icon.png" />
			<input v-model="regiter_data.nink" type="text" :placeholder='iphone' maxlength="12"/>
           
		</div>
		<div class="phone" @click="show_sex">
			<p>性别</p> <p class="xin">*</p>
			<img src="../../assets/img/right_icon.png" />
			<input v-model="regiter_data.sex" type="tel" readonly="readonly" placeholder="只能修改一次"  />
			
		</div>
		<div class="password" @click="show_date_in">
			<p>生日</p><p class="xin" style="font-size: 0.4rem;margin-left: 0.08rem;">*</p>
			<img src="../../assets/img/right_icon.png" />
			<input v-model="regiter_data.both" type="text" readonly="readonly" placeholder="未选择"  />
			
		</div>
		<div class="loation" @click="selectLocation">
			<p>地区</p>
			<img src="../../assets/img/right_icon.png" />
			<input type="text" readonly="readonly" placeholder="未选择" :value="$store.state.select_location" />
			
		</div>
		<div class="xieyi">完成注册表示您同意
			<a href="javascript:void(0)">《觅艺使用协议》</a>
		</div>
		<div class="sumbit" @click="finish">
			<p>下一步</p>
		</div>
        
        
        <!--<div style="position: relative;z-index: 9000;">-->
		   <mt-datetime-picker :startDate="startDate" :endDate="endDate" v-show="show_date" @cancel="handleCancel" @confirm="handleConfirm" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
		   </mt-datetime-picker>
		 <!--</div>-->
		
		 <!--<div style="position: relative;z-index: 9000;">-->
		    <mt-actionsheet :actions="action_value" v-model="sheetVisible"></mt-actionsheet>
		 <!--</div>-->
		 <!--<div style="position: relative;z-index: 9000;">-->
		    <locationdialog  v-bind:t='is_location'></locationdialog>
		<!--</div>-->
		
		
		
	</div>
</template>
<script src="../../../static/js/adaption.js"></script>
<script src="../../../static/js/swiper.js"></script>

<script>
	import { Toast } from 'mint-ui';
	import store from '../../vuex/store.js'
	import locationdialog from '../Details_of_the_work/locationdlialog.vue'
	import md5 from 'js-md5';
	export default {
		components: {
			locationdialog
		},
		store,
		data() {
			return {
				startDate: new Date('1980/01/01'),
				endDate: new Date(),
				pickerVisible: true,
				sex: '',
				date_str: '',
				is_show: false,
				show_date: false,
				imageUrl: 'static/img/headimg.png',
				img:'',//临时图片路径,用来储存上传来返回的路径
				sheetVisible: false,
				action_value: [{
						name: '男',
						method: this.getnan
					},
					{
						name: '女',
						method: this.getnv
					}
				],
				adr: [],
				location: '',
				/*注册信息对象，待用*/
				regiter_data:{
					nink:'',
					sex:'',
					both:'',
					location:'',
					img:'static/img/headimg.png'
				},
				is_location:{
					is_show:false
				},
				
				iphone:'',
				iphone_s:''
			}
		},
		methods: {
			tiao(){
//				        localStorage.pan_duan_s = 2
//						var url = this.$store.state.request_url + "/api/map/user/editArtist.do";
//						var memId = localStorage.memId;
//						var ts = new Date().getTime();
//						var token = localStorage.tokEn;
//						var sign = md5(url + memId + token + ts);
//						this.$http({
//							url: this.$store.state.request_url+'/api/map/user/editArtist.do?memId='+memId+"&ts="+ts,
//							method: 'post',
//							headers: {
//								"content-type": "application/json;charset=UTF-8",
//								"sIgn":sign
//							},
//							body: {
//								opId: localStorage.memId, //用户Id
////								nickname: localStorage.phone, //昵称
//								opPic:'../../../static/img/iconheadimg.png'
//							},
//							emulateJSON: false,
//						}).then(function(response) {
//							
//							console.log(response.body.meta)
//							
//							if(response.body.meta.res == "00000") {
//								  
//								  localStorage.login_s = 1
//								  
//								/*成功后跳转*/
//								   this.$router.push({path: '../slider'})
//								   
//							}else{
//								
//								/*提示语*/
////								Toast({
////									essage: response.body.meta.msg,
////									position: 'middle',
////									duration: 2000
////									});
//							}
//						})
			},
	       huoqus(){//获取用户信息 
	       	            var url = this.$store.state.request_url + "/api/map/user/artUserInfo.do";
						var memId = localStorage.memId;
						var ts = new Date().getTime();
						var token = localStorage.tokEn;
						var sign = md5(url + memId + token + ts);
						this.$http({
							url: this.$store.state.request_url+'/api/map/user/artUserInfo.do?memId='+memId+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								"sIgn":sign
							},
							body: {
								opId: localStorage.memId, //用户Id
							},
							emulateJSON: false,
						}).then(function(response) {
							if(response.body.meta.res == "00000") {
						          this.iphone = response.body.data.phone.substring(0,3)+'****'+response.body.data.phone.substring(7,11)
								  this.iphone_s = response.body.data.phone
								  
							}
						})
	           },
			
			backTo() {
                this.$router.push({path: '../regiter'})
			},
			finish(){
//				if(nink != null && nink != "") {
					if(this.regiter_data.sex != null && this.regiter_data.sex != "") {
						if(this.regiter_data.both != null && this.regiter_data.both != "") {
//							if(this.$store.state.select_location != null && this.$store.state.select_location != "") {
//								if(this.img!=''){
									this.regiter_data.location = this.$store.state.select_location;
									
									this.$store.state.regiter_data=this.regiter_data;
									
									this.$store.state.regiter_data.nink=(this.$store.state.regiter_data.nink=='')?this.iphone_s:this.$store.state.regiter_data.nink
									
									this.$router.push({path: '../select_fan'})
//								}else{
//									/*提示语*/
//									Toast({
//										message: "请上传头像",
//										position: 'middle',
//										duration: 2000
//									});
//								}
//							} else {
//								/*提示语*/
//								Toast({
//									message: "请选择地区",
//									position: 'middle',
//									duration: 2000
//								});
//							}
						} else {
							/*提示语*/
							Toast({
								message: "请选择生日",
								position: 'middle',
								duration: 2000
							});
						}
					} else {
						/*提示语*/
						Toast({
							message: "请选择性别",
							position: 'middle',
							duration: 2000
						});
					}
//				} else {
//					/*提示语*/
//					Toast({
//						message: "请填写昵称",
//						position: 'middle',
//						duration: 2000
//					});
//				}
			},
			/*选择地区*/
			selectLocation(){
				this.is_location.is_show=true;
			},
			show_sex() {
				this.sheetVisible = true
			},
			getnan() {
				this.regiter_data.sex = "男"
			},
			getnv() {
				this.regiter_data.sex = "女"
			},
			/*选择生日*/
			handleConfirm(e) {
				var d = new Date(e);
				var youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
				this.regiter_data.both = youWant;
				this.show_date = false;
			},
			show_date_in() {
				this.show_date = true;
			},
			handleCancel() {
				this.show_date = false;
			},
			//上传头像
	update(e) {

 		var aa =document.getElementById("xgtx").files[0];
        if(aa!=null&&aa!=""){
        	var form = new FormData();
       
        form.append("file", aa);
        var settings = {
          async: false,
          crossDomain: true,
          url: this.$store.state.request_url+"/api/map/user/uploadOpPic.do",
          method: "POST",
          processData: false,
          contentType: false,
          mimeType: "multipart/form-data",
          dataType: "json",
          data: form
        };
        var that=this;
        $.ajax(settings).done(function (abc) {
       
          if (abc.meta.msg == "ok") {
 			that.regiter_data.img = abc.data.sourcePicUrl; //用来传递并显示
          }
        });
        }else{
        	Toast({
				message: "请重新选择图片",
				position: 'middle',
			});
        }
	  }		

	},
		mounted() {
			this.$store.state.is_bottom = false; //底部栏显隐
			localStorage.login_s = 'y'
			this.adr = this.$store.state.adr
			
			this.huoqus()
			
			
//			console.log(this.$store.state.regiter_data,'7777777777777')
			
//			console.log(this.$store.state.regiter_data.nink,'123132')
			
			this.regiter_data.nink=(this.$store.state.regiter_data.nink==undefined)?'':this.$store.state.regiter_data.nink;
			this.regiter_data.sex=(this.$store.state.regiter_data.sex==undefined)?'':this.$store.state.regiter_data.sex;
			this.regiter_data.both=(this.$store.state.regiter_data.both==undefined)?'':this.$store.state.regiter_data.both;
			this.regiter_data.location=(this.$store.state.select_location==undefined)?'':this.$store.state.select_location;
			this.regiter_data.img=(this.$store.state.regiter_data.img==undefined)?'static/img/headimg.png':this.$store.state.regiter_data.img
									
			
		}

	}
</script>

<style scoped="scoped">
	#app {
		width: 100%;
    	/*overflow: hidden;*/
    	height: 13.3rem;
    	margin: 0px auto;
		position: relative;
		z-index: 500;
		overflow: hidden;
		background: white;
	}
	.xin{
		font-size: 0.32rem;
		float: left;
		color:#FF9D00;
		margin-left: 0.1rem;
	}
	
	.you{
		height: 0.28rem;
       margin-top: 0.36rem;
        float: right;
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
	
	input,
	textarea {
		outline: none;
	}
	/*返回*/
	.back {
		width: 95%;
		height: 1.1rem;
		margin-left: 3%;
	}
	
	.back img {
		width: 0.4rem;
    height: 0.4rem;
    float: left;
    margin-top: 0.35rem;

	}
	
	.hui {
		font-size: 0.4rem;
		margin-left: 0.1rem;
		float: left;
		line-height: 1.1rem;
	}
	/*标题*/
	
	.title {
		margin-top: 0.2rem;
		width: 95%;
		height: 1.8rem;
		margin-left: 0.4rem;
	}
	
	.title_p {
		font-size: 0.7rem;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		font-family: castellar;
	}
	
	.title_tip {
		font-size: 0.25rem;
		color: #D0D0D0;
	}
	
	.title_left {
		float: left;
	}
	
	.title_right {
		height: 1.6rem;
		width: 22%;
		margin-right: 0.5rem;
		float: right;
		position: relative;
		    margin-top: -0.25rem;
	}
	
	.title_right img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		border-radius: 50%;
	}
	
	.nink {
		
		width: 90%;
		margin-left: 5%;
		height: 1rem;
		border-bottom: #E0E0E0 solid 1px;
	}
	
	.nink p {
		width: 25%;
		font-size: 0.32rem;
		float: left;
		line-height: 1rem;
		color: rgba(51, 51, 51, 1);
	}
	
	.nink input {
		width: 60%;
    height: 95%;
    border: 0;
    line-height: 1rem;
    text-align: right;
    float: right;
    /* line-height: 1rem; */
    outline: none;
    font-size: 0.32rem;
    margin-right: 0.3rem;
	}
	
	.phone {
		margin-left: 5%;
		width: 90%;
		
		height: 1rem;
		border-bottom: #E0E0E0 solid 1px;
	}
	
	.phone p {
		/*width: 25%;*/
		float: left;
		font-size: 0.32rem;
		line-height: 1rem;
		font-family: SimHei;
		/*color: rgba(51, 51, 51, 1);*/
	}
	
	.phone input {
		width: 60%;
		height: 95%;
		border: 0;
		line-height: 1rem;
			text-align: right;
		float: right;
		/*line-height: 1rem;*/
		outline: none;
		/*去除默认颜色边框*/
		font-size: 0.32rem;
		margin-right: 0.3rem;
	}
	
	.phone img {
		height: 0.28rem;
		
		margin-top: 0.36rem;
		float: right;
	}
	
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #D0D0D0;
		font-size: 0.32rem;
		line-height: 1rem;
	}
	
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #D0D0D0;
		font-size: 0.32rem;
		line-height: 1rem;
	}
	
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #D0D0D0;
		font-size: 0.32rem;
		line-height: 1rem;
	}
	
	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #D0D0D0;
		font-size: 0.32rem;
		line-height: 1rem;
	}
	
	.password {
		margin-left: 5%;
		width: 90%;
		
		height: 1rem;
		border-bottom: #E0E0E0 solid 1px;
	}
	
	.password p {
		/*width: 25%;*/
		float: left;
		line-height: 1rem;
		font-size: 0.32rem;
		/*color: rgba(51, 51, 51, 1);*/
	}
	
	.password input {
		width: 60%;
		height: 95%;
		border: 0;
		line-height: 1rem;
			text-align: right;
		float: right;
		/*line-height: 1rem;*/
		outline: none;
		/*去除默认颜色边框*/
		font-size: 0.32rem;
		margin-right: 0.3rem;
	}
	
	.password img {
		
		height: 0.28rem;
		margin-top: 0.36rem;
		float: right;
	}
	
	.loation {
		margin-left: 5%;
		width: 90%;
		
		height: 1rem;
		border-bottom: solid 1px #E0E0E0;
	}
	
	.loation p {
		width: 25%;
		float: left;
		font-size: 0.32rem;
		line-height: 1rem;
		color: rgba(51, 51, 51, 1);
	}
	
	.loation input {
		width: 60%;
		height: 95%;
		border: 0;
		line-height: 1rem;
			text-align: right;
		float: right;
		/*line-height: 1rem;*/
		outline: none;
		/*去除默认颜色边框*/
		font-size: 0.32rem;
		margin-right: 0.3rem;
	}
	
	.loation img {
		height: 0.28rem;
		margin-top: 0.36rem;
		float: right;
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
	
	.sumbit p {
		text-align: center;
		color: #fff;
		line-height: 0.9rem;
		font-size: 0.36rem;
	}
	
	.xieyi {
		width: 80%;
		height: 0.25rem;
		font-size: 0.25rem;
		position:fixed;
		text-align: center;
		bottom: 1.8rem;
		margin: 0 10%;
		color: #D0D0D0;
	}
	
	.xieyi a {
		color:black;
		/*text-decoration:blink;*/
	}
	/*上传头像*/
	
	.avatar-uploader {
		width: 100%;
		height: 100%;
		
	}
	
	.avatar-uploader img {
		padding: 0.05rem;
		width: 1.7rem;
		height: 1.6rem;
	}
	
	.avatar-uploader .el-upload {
		border: 1px dashed #D0D0D0;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 0.5rem;
		color: red;
		width: 1rem;
		height: 1rem;
		line-height: 1.25rem;
		border: 1px solid #D0D0D0;
		text-align: center;
	}
	
	.avatar {
		width: 1rem;
		height: 1rem;
		display: block;
	}
	
	.avatar-uploader i {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>