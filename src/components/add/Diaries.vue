<template>
	<div style="width: 100%;position: relative;z-index:300;background:white;height: 100%;">
		
		<div style="width: 100%;height: 1rem;position:absolute;top:0;left: 0;z-index: 9992;text-align:center;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<span  @click="hui" style="font-size:0.4rem;color: #2E3135;position: absolute;left:0.3rem;top: 0.07rem;">
			<img style="width: 0.3rem;margin-right: 0.1rem;" src="../../assets/img/zuo.png" alt="" /></span>
			
	   		<p style="font-size: 0.38rem;line-height: 1rem;float:left;margin-left: 2.9rem;">发布闲情</p>
	   		
	   		<p v-show="fabus"  @click="fabu" style="font-size:0.32rem;float:right;margin-right: 0.3rem;line-height: 1rem;color:rgb(255, 157, 0);">发布</p>
		
	    </div><div style="height:0.88rem;"></div>
		
		<div style="width: 90%;position: relative;margin: 0 auto;">
			
			<!--闲情发布 -->

			<!--标题 -->
			<!--<h6 style="font-size: 0.5rem;margin-top: 0.5rem;">
		     	闲情发布</h6>-->
			<!--<p style="font-size: 0.3rem;color: #D0D0D0;margin-top: 0.1rem;">
				上传作品并填写资料</p>-->
			<input type="text" placeholder="输入闲情标题"  style="width:100%;font-size: 0.36rem;height:1rem;text-align:left;border:none;" maxlength="20" v-model="$store.state.diary_title"/>
			<textarea v-show="pon" id="myInput" v-model="$store.state.xq_box.neirong" style="width: 100%;min-height:2rem;font-size: 0.3rem;margin-top: 0.5rem;border:none;" placeholder="说点什么吧..." maxlength="512"></textarea>
		  <div style="margin-top: 0.3rem;">
			<div style="margin-top:0.3rem;overflow: hidden;width: 30%;margin-right: 3%;position: relative;" class="zhu" v-for="(i,index) in $store.state.img_xianqing">
				<img v-if="i.picUrl" src="static/img/xin/icon_announce_delete.png"style="position: absolute;top: 0;right: 0;width: 0.5rem;height: 0.5rem;z-index: 300;" @click="delete_pic(index)" />
				<img id="img" @load="img_cli" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);height:100%;max-width:auto;"  :src="i.picUrl" />
			</div>
			<!--<div style="float:left;margin-top: 0.2rem;">
				<img class="zhu" src="../../assets/img/drawablefffff/icon_announce_lifeImg.png" />
				<input style="opacity:0;margin-left: -2.5rem;" class="zhu" ref="ss" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadpic_tos" />
			</div>-->
			<div style="float:left;margin-top: 0.3rem;width: 30%;height: 30%;position: relative;" v-if="$store.state.img_xianqing.length<9">
				<!--<img v-if="$store.state.img_box.picUrl" src="static/img/xin/icon_announce_delete.png"style="position: absolute;top: 0;right: 0;width: 0.5rem;height: 0.5rem;" />-->
					
					
				<!--
                	描述：上传图片时加载的图标
                -->
				<div v-show="gifts" id="box_gift">
					<img id="gift" src="../../assets/img/20130527034917708.gif" />
				</div>
				<div style="overflow: hidden;" class="zhu" @click="show_camrea">
				    <img style="height:100%;" src="static/img/xin/icon_announce_addImage.png"  />
				</div>
				<!--<input id="xgtx" style="opacity:0;position: absolute;margin-left: -100%;" class="zhu" ref="ss" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadpic_tos" />-->
			</div>
		 </div>	
		 	
		 	<div  style="margin-top: 0.3rem;border-top: 0.01rem solid #F8F8F8;border-bottom: 0.01rem solid #F8F8F8;float: left;" class="boxs" @click="privacy">
				<span><p style="font-size: 0.3rem;float: left;color:#2E3135">隐私设置</p></span>
				
		     	 <img style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0rem;" src="../../assets/img/right_icon.png" alt="" />
		     	 <span ><p style="font-size: 0.3rem;float: right;color:#999999;line-height: 1rem;margin-right: 0.1rem;">{{$store.state.diaries_privacy}}</p></span>
			</div>
		 	
			<div @click="to_Diaries_tows" style="margin-top: 0.3rem;border-top: 0.01rem solid #F8F8F8;border-bottom: 0.01rem solid #F8F8F8;float: left;" class="boxs">
				<span v-if="$store.state.diar_table==''"><p style="font-size: 0.3rem;float: left;color:#2E3135">请选择版块</p></span>
				<span v-else ><p style="font-size: 0.3rem;float: left;color:#2E3135">{{$store.state.diar_table}}</p></span>
		     	 <img style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0rem;" src="../../assets/img/right_icon.png" alt="" />
			</div>

			

		</div>
		<!--<div @click="fabu" style="width:100%;height: 1.3rem;box-shadow:0px 0px  15px 0.1px #CACACA;position:fixed;bottom:0rem;background: white;" v-show="is_btn">
			<button style="width:6.4rem;height:0.9rem; background:rgba(46,49,53,1);border-radius: 0.15rem;color: white;position: absolute;left: 0.5rem;top: 0.2rem;font-size: 0.3rem;">
				确认发布
			</button>
		</div>-->
		<div @touchmove.prevent>
			<mt-actionsheet :actions="action_photo" v-model="photo_sheetVisible"></mt-actionsheet>
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import { Toast } from 'mint-ui';
	import md5 from 'js-md5';
	export default {
		store,
		data() {
			return {
				photo_sheetVisible: false,
				fabus:true,
				pon:false,
				value: '3',
				kj: '朋友圈可见',
				open: false,
				is_btn:true,
				gifts:false,
				supplementary_pic:"cover_pic",
				action_photo: [{
						name: '拍照',
						method: this.camera_func
					},
					{
						name: '相册',
						method: this.photo_func
					}
				],
			}
		},
		mounted(){
			
			if(localStorage.diaries_privacy==null||localStorage.diaries_privacy==''){
				this.$store.state.diaries_privacy="向所有人公开"
			}else{
				this.$store.state.diaries_privacy=localStorage.diaries_privacy;
			}
			//this.yansghi()
			this.change_text()
			var that=this
			$("#myInput").on("focus",function(){
				that.is_btn=false
				//console.log(that.is_btn,"222222222222")
			}).on("blur",function(){
				that.is_btn=true
				//console.log(that.is_btn,"222222222222")
			})
		},
		methods: {
			show_camrea() {
				this.photo_sheetVisible = true
			},
			/**拍照*/
			camera_func() {
				var cmr = plus.camera.getCamera();
				var res = cmr.supportedImageResolutions[0];
				var fmt = cmr.supportedImageFormats[0];
				//alert("Resolution: " + res + ", Format: " + fmt);
				var that = this;
				cmr.captureImage(function(path) {
					
					plus.io.resolveLocalFileSystemURL(path, function(entry) {
						plus.nativeUI.showWaiting('上传中...')
						var pathPhoto = entry.toLocalURL();
						var imgLink = pathPhoto;
						var tempImage = new Image();
						tempImage.src = imgLink;
						tempImage.crossOrigin = "*";
						tempImage.onload = function() {
							var base64 = that.getBase64Image(tempImage);
							var ass=that.convertBase64UrlToBlob(base64)
							that.uploadpic_tos(ass)
						}
					}, function(e) {

					});
				})
			},
			/**选择相册*/
			photo_func() {
				
				var that = this;
				plus.gallery.pick(function(a) {
					
					plus.io.resolveLocalFileSystemURL(a, function(entry) {
						plus.nativeUI.showWaiting('上传中...')
						var pathPhoto = entry.toLocalURL();
						//alert("图片："+pathPhoto)
						var imgLink = pathPhoto;
						var tempImage = new Image();
						tempImage.src = imgLink;
						tempImage.crossOrigin = "*";
						tempImage.onload = function() {
							var base64 = that.getBase64Image(tempImage);
							var ass=that.convertBase64UrlToBlob(base64)
							that.uploadpic_tos(ass)
						}
					}, function(e) {
						console.log("读取拍照文件错误：" + e.message);
					});
				}, function(a) {}, {
					filter: "image"
				})
			},
			convertBase64UrlToBlob(urlData) {
				var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
				//处理异常,将ascii码小于0的转换为大于0
				var ab = new ArrayBuffer(bytes.length);
				var ia = new Uint8Array(ab);
				for(var i = 0; i < bytes.length; i++) {
					ia[i] = bytes.charCodeAt(i);
				}
				return new Blob([ab], {
					type: 'image/*'
				});
			},

			getBase64Image(img) {
				var canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, img.width, img.height);
				var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
				var dataURL = canvas.toDataURL("image/" + ext,0.8);
				return dataURL;
			},
			yansghi(){
			   let du = document.documentElement.clientHeight/document.documentElement.clientWidth;
  	           let myInput = document.getElementById('myInput');
  	            //console.log(du,'屏幕百分比')
  	if(du>=1.7&&du<2.0){
  		myInput.style.height = '6rem'
  	}else if(du<=1.7&&du>1.63){
  		myInput.style.height = '5.2rem'
  	}else if(du<=1.6&&du>1.45){
  		myInput.style.height = '4.4rem'
  	}else if(du>=2.0&&du<2.1){
  		myInput.style.height = '7.7rem'
  	}else if(du>2.1){
  		myInput.style.height = '8.8rem'
  	}else if(du<1.4){
  		myInput.style.height = '2.6rem'
  	}else if(du<1.65&&du>1.6){
  		myInput.style.height = '4.6rem'
  	}  	
			},
			
			to_Diaries_tows(){
		    this.$router.push({
					path: '../Diaries_tows'
				});
			},
			
			change_text(){
				var that = this
				     window.setTimeout(function(){
　                             that.pon = true
                 },100)
			},
			
			open3() {
				this.$notify({
					title: '成功',
					message: '闲情发布成功',
					type: 'success',
		//        duration:0,
				});
			},
			/*删除图片*/
			delete_pic(i){
				this.$store.state.img_xianqing.splice(i, 1);
				this.$refs.ss.value="";
			},
			handleChange(val) {
				this.value = val
				if(this.value == 1) {
					this.$store.state.xq_box.kejian = 'friends'
					this.kj = '朋友圈可见'
				} else if(this.value == 2) {
					this.$store.state.xq_box.kejian = 'all'
					this.kj = '所有人可见'
				}
			},
			toggle() {
				this.open = !this.open
			},
			handleOpen() {
				this.open = true
			},
			handleClose() {
				this.open = false
			},

			hui() {
				this.$store.state.diar_table=''
				this.$store.state.home_tai = 3
				 this.$router.push({
								path: '../add_facth'
							});
				
			},
			uploadpic_tos(e) { //上传图事件
//				if(this.$store.state.img_xianqing.length < 9) {
//					var url=this.$store.state.request_url+"/api/mapManager/uploadPic.do";
//		           var id=this.$store.state.data.memId;
//		           var token=this.$store.state.data.tokEn;
//		           var ts=new Date().getTime();
//		           var sign=md5(url+id+token+ts)
//					var self = this
//					let file = e.target.files[0]
//					/*判断是否超过3M*/
//				if(this.verificationPicFile(file)) {
//					/* eslint-disable no-undef */
//					let param = new FormData() // 创建form对象
//					param.append('file', file) // 通过append向form对象添加数据
//					param.append('plateName', 'leisure') // 添加form表单中其他数据
//					param.append('picType', this.supplementary_pic)
//					//console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
//					
//					if(file) {
//						// 添加请求头
////						this.$axios.post('api/mapManager/uploadPic.do', param, config)
////							.then(response => {
////								if(response.data.meta.res === '00000') {
////									this.$store.state.img_xianqing.push(response.data.data)
////									
////									if(this.$store.state.img_xianqing.length!=0){
////                         	               this.supplementary_pic="supplementary_pic"
////                                  }
////									
////									//console.log(this.$store.state.img_xianqing)
////								}
////							})
//                         this.$http({
//					
//                   url:this.$store.state.request_url+"/api/mapManager/uploadPic.do?memId="+id+"&ts="+ts,
//					method: 'post',
//					headers: {
//						'Content-Type': 'multipart/form-data',
//						'sIgn': sign
//					},
//					body: param,
//					emulateJSON: false,
//				}).then(function(response) {
//					if(response.body.meta.res == "00000") {
//						
//						this.$store.state.img_xianqing.push(response.data.data)
////									
//									if(this.$store.state.img_xianqing.length!=0){
//                         	               this.supplementary_pic="supplementary_pic"
//                                  }
//									
//									//console.log(this.$store.state.img_xianqing)
//						
//					}
//				})
//
//                       
//					}
//				}else{
//					Toast({
//							message: "图片大小不能超过5M",
//							position: 'middle',
//							duration: 2000
//						});
//				}
//					
//				}

	if(this.$store.state.shendu.img_boxs.length<9){
		
             	   var url=this.$store.state.request_url+"/api/mapManager/uploadPic.do";
		           var id=this.$store.state.data.memId;
		           var token=this.$store.state.data.tokEn;
		           var ts=new Date().getTime();
		           var sign=md5(url+id+token+ts)
             		
             	
				var aa = e;
				//console.log(aa);
				if(aa != null && aa != "") {
					if(this.verificationPicFile(aa)) {
						console.log(this.gifts,"111111111")
						this.gifts = true
					console.log(this.gifts,"22222222")
					var form = new FormData();
					form.append("picName", aa,"aa.jpg");
					form.append('plateName', 'leisure') // 添加form表单中其他数据
					form.append('picType', this.supplementary_pic)
					var settings = {
						async: false,
						crossDomain: true,
						url: this.$store.state.request_url + "/api/mapManager/uploadPic.do?memId=" + id + "&ts=" + ts,
						method: "POST",
						headers: {
							'sIgn': sign
						},
						processData: false,
						contentType: false,
						mimeType: "multipart/form-data",
						dataType: "json",
						data: form
					};
					var that = this;
					$.ajax(settings).done(function(abc) {

						if(abc.meta.msg == "ok") {
							plus.nativeUI.closeWaiting()
							that.$store.state.img_xianqing.push(abc.data)
                         
                             if(that.$store.state.img_xianqing.length!=0){
                           	      that.supplementary_pic="supplementary_pic"
                             }
							that.gifts = false
							console.log(that.gifts,"33333333")
							that.$refs.ss.value="";
						}
					});
					}else{
						Toast({
							message: "作品图片大小不能超过5M",
							position: 'middle',
							duration: 2000
						});
					}
				} else {
					Toast({
						message: "请重新选择图片",
						position: 'middle',
					});

				}
             }
			},
			//图片大小验证  不能超过3M
			verificationPicFile(file) {
				var fileSize = 0;
				var fileMaxSize = 5; //3M  
				var filePath = file;
				//console.log("图片路径:" + filePath)
				if(filePath) {
					fileSize = file.size;
					//console.log("图片大小:" + fileSize)
					var size = fileSize / (1024 * 1024*8);
					//console.log("图片:" + size)
					if(size > fileMaxSize) {

						file.value = "";
						return false;
					} else if(size <= 0) {

						file.value = "";
						return false;
					} else {
						file.value = "";
						return true;
					}
				} else {
					return false;
				}
			},
			/*处理图片*/
			img_cli() {
				var img = new Image();
				for(var i=0;i<$("#img").length;i++){
					img.src = $("#img")[i].src;

				if(img.width > img.height) {

					$("#img:eq("+i+")").css("width", "auto");
					$("#img:eq("+i+")").css("height", "100%");
				} else {
					console.log("高")
					$("#img:eq("+i+")").css("height", "auto");
					$("#img:eq("+i+")").css("width", "100%");
				}
				}
				
			},
			/**跳隐私设置*/
			privacy(){
				this.$router.push({
								path: '../privacy_setting'
							});
			},
			fabu(){
				//console.log(this.$store.state.xq_box)
              if(this.$store.state.img_xianqing.length>0){
//            	if(this.$store.state.xq_box.neirong!=null&&this.$store.state.xq_box.neirong!=""){
              		
										plus.nativeUI.showWaiting('闲情发布中,请稍等...')
						this.fabus = false				
										
					/**判断全局数据的选项*/
					var str=localStorage.diaries_privacy;
					var kejian='';
					if(str==""||str==null){
						kejian='all';
					}else{
					switch(str){
						case '仅向好友公开':
								kejian='friends';
						break;
						
						case '仅向好友及VIP级别的陌生人公开':
								kejian='friendAndVipStranger';
								
						break;
						
						case '向所有人公开':
								kejian='all';
						break;
					}
					}		
					var rmark='';
					if(this.$store.state.xq_box.neirong.length>30){
						rmark=this.$store.state.xq_box.neirong.substring(0,30);
					}else{
						rmark=this.$store.state.xq_box.neirong;
					}
                var url=this.$store.state.request_url+"/api/mapManager/saveArticle.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
              	
				this.$http({
					url: this.$store.state.request_url+"/api/mapManager/saveArticle.do?memId="+id+"&ts="+ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId,
						picUrl: this.$store.state.img_xianqing,
						artTitle:this.$store.state.diary_title,
						docUrl: this.$store.state.xq_box.neirong,
						artFlag: '2',
						tags:'',
						visibleRange:kejian,/*默认所有人可见*/
						artType:{
							sectionName:this.$store.state.diar_table
						},
						artRemark:rmark
					}
				}).then(function(response) {
					//console.log(response)
					if(response.body.meta.res == '00000') {
						//console.log(response.body)
						
						this.$store.state.img_xianqing = []
						this.$store.state.xq_box.neirong = ''
						this.$store.state.diar_table=''
						this.$store.state.diary_title=''
						//this.open3()
						plus.nativeUI.closeWaiting()
						Toast({
											message: '发布成功',
											position: 'middle',
											duration: 2000
										});
						this.$router.push({
								path: '../My_leisure'
							});
						
					}
				}).catch(function(err) {
					//console.log(err)
					this.fabu = true
				})
//            	}else{
//            		Toast({
//											message: '请填写生活动态',
//											position: 'middle',
//											duration: 2000
//										});
//            	}
              	
				}else {
					Toast({
											message: '至少需要上传一张配图',
											position: 'middle',
											duration: 2000
										});
				}
			}

		}
	}
</script>

<style scoped="scoped">
	* {
		outline: none;
	}
	
	.boxs {
		width: 100%;
		height: 1rem;
		margin-top: 1.2rem;
		line-height: 1rem;
		position: relative;
	}
	
	.zhu {
		width: 100%;
		height: 2rem;
		float: left;
	}
	
	.kejian {
		width: 2rem;
		height: 0.8rem;
		font-size: 0.3rem;
		margin-top: 0.1rem;
		float: left;
	}
	
	.menu {
		width: 3rem;
		height: 1rem;
		font-size: 0.3rem;
	}
	textarea::-webkit-input-placeholder{
		/* Internet Explorer 10+ */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #B4B4B4;
		font-size: 0.36rem;
	}
	
	textarea:-moz-placeholder{
		/* Internet Explorer 10+ */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #B4B4B4;
		font-size: 0.36rem;
	}
	
	textarea::-moz-placeholder{
		/* Internet Explorer 10+ */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #B4B4B4;
		font-size: 0.36rem;
	}
	
	textarea:-ms-input-placeholder{
		/* Internet Explorer 10+ */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #B4B4B4;
		font-size: 0.36rem;
	}
		#box_gift {
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.5);
		position: absolute;
		top: 25%;
		left: 25%;
		z-index: 1000;
	}
	#box_gift img{
		width: 1rem;
	}
</style>