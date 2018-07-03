<template>
	<div style="width: 100%;height: 100%;z-index:400;overflow-y:hidden;background:white;position: fixed;overflow-y: auto;top: 0.2rem;">
		<div style="width: 90%;position:relative;margin: 0 auto;margin-bottom: 0.2rem;">

			<div style="width: 100%;height: 1rem;position:fixed;top:0;left: 0;z-index: 9992;text-align:center;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
				<span v-show="hui_s" @click="hui" style="font-size:0.4rem;color: #2E3135;position: absolute;left:0.3rem;top: 0.07rem;">
			<img style="width: 0.3rem;margin-right: 0.1rem;" src="../../assets/img/zuo.png" alt="" /></span>

				<p style="font-size: 0.38rem;line-height: 1rem;float:left;margin-left: 2.5rem;">发布毕业季作品</p>

				<p v-show="fabu" @click="go_babi" style="font-size:0.32rem;float:right;margin-right: 0.3rem;line-height: 1rem;color:rgb(255, 157, 0);;">{{$store.state.bian_ji_show==2?'保存':'发布'}}</p>

			</div>
			<div style="height:0.88rem;"></div>

			<!--发布作品 -->

			<!--标题 -->
			<!--<h5 style="font-size: 0.5rem;margin-top: 0.3rem;">作品发布</h5>-->

			<!--作者：2443611475@qq.com
            	时间：2018-03-27
            	描述：生活照-->
			<div style="float:left;margin-top: 0.3rem;width: 32%;height: 32%;position: relative;overflow: hidden;">
				<img v-if="$store.state.img_box.picUrl&&$store.state.bian_ji_show!=2" src="static/img/xin/icon_announce_delete.png" style="position: absolute;top: 0;right: 0;width: 0.5rem;height: 0.5rem;z-index: 300;" @click.stop="delete_pic()" />

				<!--
                	描述：上传图片时加载的图标
                -->
				<div v-show="gifts" id="box_gift">
					<img id="gift" src="../../assets/img/20130527034917708.gif" />
				</div>

				<div style="overflow: hidden;" class="zhu">
					<img v-if="$store.state.img_box.picUrl" id="img" @load="img_cli" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);min-height:100%;min-width:100%;max-width: 130%;max-height: 130%;" :src="$store.state.img_box.picUrl" />
					<img v-else style="width: 100%;height: 100%;" src="static/img/xin/icon_announce_addImage.png" alt="" @click="show_camrea"/>
				</div>
				<!--<input v-show="$store.state.bian_ji_show!=2" id="xgtx" style="opacity:0;position: absolute;margin-left: -100%;" class="zhu" ref="ss" name="file" type="file" accept="image/png,image/jpeg" @change="uploadpic" />-->
			</div>

			<!--
            	作者：2443611475@qq.com
            	时间：2018-03-27
            	描述：补充图
            -->

			<!--<img v-for="(i,index) in $store.state.img_box_to" style="margin-right: 0.2rem;margin-top: 0.2rem;" class="zhu" :src="i.picUrl" />
			<div style="float:left;margin-top: 0.2rem;">
				<img class="zhu" src="../../assets/img/drawablefffff/icon_announce_secondImg.png" />
				<input style="opacity:0;margin-left: -2.5rem;" class="zhu" ref="ss" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadpic_to" />
			</div>-->

			<!--<input v-model="$store.state.Data_set.The_name_of_the_work" style="font-size: 0.36rem;height:1rem;border: none;width: 100%;border-bottom: 0.005rem solid #F8F8F8;" type="text" placeholder="请输入作品名称（必填）" />-->
			<div @click="to_Typeofwork" class="boxs" style="margin-top: 2.6rem;">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">类型</p>
		     	   <p style="font-size: 0.3rem;float: left;color: #FF9D00;">&nbsp; *</p></span>
				<!--<i style="float: right;font-size: 0.45rem;line-height: 1rem;margin-right: 0rem;color: #CACACA;" class="fa fa-chevron-right"></i>-->
				<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0rem;" />
				<p style="font-size: 0.3rem;float: right;margin-right: 0.2rem;">{{biao}}</p>
			</div>
			<!--
             	作者：2443611475@qq.com
             	时间：2018-03-23
             	描述：最终板数、当用户选择指定的作品类型时方才显示
             -->
			<div :class="{type:acts.noa,types:acts.noe}" style="width: 80%;height: 1rem;border-bottom: 0.01rem solid #F8F8F8;line-height: 1rem;margin-left: 1.4rem;">
				<p style="font-size: 0.3rem;float: left;">最终板数</p>
				<p style="font-size: 0.3rem;float: right;">版</p>
				<input v-model="$store.state.Data_set.Version_number" style="float: right;font-size: 0.3rem;width: 1rem;border: none;" type="text" placeholder="请输入" />
			</div>

			
			<div class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #333333;">名称</p>
		     	 <p style="font-size: 0.3rem;float: left;color: #FF9D00;">&nbsp; *</p></span>

				<input id="name" v-model="$store.state.Data_set.The_name_of_the_work" style="font-size: 0.3rem;height:100%;text-align:right;float:right;border:none;width: 60%;" type="text" placeholder="请输入" />
			</div>
			

			<div style="height: 0.2rem; width: 100%;background-color: #F8F8F8;"></div>

			<div style="margin-top: 0;" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">版权</p>
		     	  <!--<p style="font-size: 0.3rem;float: left;color: #2E3135;">&nbsp; (必填)</p>-->
		     	  	
		     	  </span>
				<input v-if="act.noe" v-model="$store.state.Data_set.original_author" style="float:left;font-size: 0.3rem;width: 2rem;border:none;line-height: 1rem;height: 1rem;margin-left:0.5rem;" type="text" placeholder="请输入原作者" />
				<button @click="btn1" :class="{btnss:act.noa,btnssto:act.noe}">临摹
				   <!--<img :class="{img_lang:act.noa,img_xiao:act.noe}" src="../../assets/img/xia1.png" alt="" />-->
				</button>
				<button @click="btn2" :class="{btnss:act.noa1,btnssto:act.noe1}">原创
				   <!--<img :class="{img_lang:act.noa1,img_xiao:act.noe1}" src="../../assets/img/xia1.png" alt="" />-->
				</button>
			</div>

			<div style="margin-top: 0;" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">出售</p>
		     	  <!--<p style="font-size: 0.3rem;float: left;color: #2E3135;">&nbsp; (必填)</p>-->
		     	  	
		     	  </span>
				<input v-if="act.noe2" v-model="$store.state.Data_set.money" style="float:left;font-size: 0.3rem;width: 2rem;border:none;line-height: 1rem;height: 1rem;margin-left:0.5rem;" type="number" placeholder="请输入金额" />
				<button @click="btn3" :class="{btnss:act.noa2,btnssto:act.noe2}">可出售
				   <!--<img :class="{img_lang:act.noa,img_xiao:act.noe}" src="../../assets/img/xia1.png" alt="" />-->
				</button>
				<button @click="btn4" :class="{btnss:act.noa3,btnssto:act.noe3}">仅展示
				   <!--<img :class="{img_lang:act.noa1,img_xiao:act.noe1}" src="../../assets/img/xia1.png" alt="" />-->
				</button>
			</div>
			<div class="boxs1" v-if="$store.state.Data_set.type_fenlei=='造型'">
				<span><p style="font-size: 0.3rem;float: left;color: #333333;line-height: 1rem;">尺寸</p>
		     	 <!--<p style="font-size: 0.3rem;float: left;color: #FF9D00;line-height: 1rem;">&nbsp; *</p>-->
				</span>
				<div class="chang">

					<div class="chang_div">
						<p style="float: left;">长</p>
						<input v-model="$store.state.Data_set.chang" maxlength="5" style="font-size: 0.3rem;text-align:right;border:none;width: 60%;float: left;" type="number" placeholder="请输入" />
						<p style="float: right;">cm</p>
					</div>
					<div class="chang_div">
						<p style="float: left;">宽</p>
						<input v-model="$store.state.Data_set.kuan" maxlength="5" style="font-size: 0.3rem;text-align:right;border:none;width: 60%;float: left;" type="number" placeholder="请输入" />
						<p style="float: right;">cm</p>
					</div>
					<div class="chang_div" v-if="biao=='雕塑'||biao=='装置'||biao=='陶艺'">
						<p style="float: left;">高</p>
						<input v-model="$store.state.Data_set.gao" maxlength="5" style="font-size: 0.3rem;text-align:right;border:none;width: 60%;float: left;" type="number" placeholder="请输入" />
						<p style="float: right;">cm</p>
					</div>
				</div>

			</div>
			<div @click="select_year" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">年代</p>
		     	   <!--<p style="font-size: 0.3rem;float: left;color: #FF9D00;">&nbsp; *</p>-->
				</span>
				<!--<i style="float: right;font-size: 0.45rem;line-height: 1rem;margin-right: 0rem;color: #CACACA;" class="fa fa-chevron-right"></i>-->
				<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0rem;" />
				<p style="font-size: 0.3rem;float: right;margin-right: 0.2rem;">{{date_str}}</p>
			</div>
			<div class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #333333;">材质</p>
		     	 <!--<p style="font-size: 0.3rem;float: left;color: #FF9D00;">&nbsp; *</p>--></span>

				<input id="name" v-model="$store.state.Data_set.cai_zhi" style="font-size: 0.3rem;height:100%;text-align:right;float:right;border:none;width: 60%;" type="text" placeholder="请输入" />
			</div>
			<div class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #333333;">题材</p>
		     	 <!--<p style="font-size: 0.3rem;float: left;color: #FF9D00;">&nbsp; *</p>--></span>

				<input id="name" v-model="$store.state.Data_set.ti_cai" style="font-size: 0.3rem;height:100%;text-align:right;float:right;border:none;width: 60%;" type="text" placeholder="请输入" />
			</div>
			<!--<div :class="{type:act.noa,types:act.noe}" style="width: 80%;height: 1rem;border-bottom: 0.01rem solid #F8F8F8;line-height: 1rem;margin-left: 1.4rem;">
				<p style="font-size: 0.3rem;float: left;color: #2E3135;">原作者</p>

				<input v-model="$store.state.Data_set.original_author" style="float:right;font-size: 0.3rem;width: 2rem;border:none;height:0.7rem;margin-top: 0.15rem;" type="text" placeholder="请输入" />
			</div>-->

			<!--<div @click='qi' style="margin-top: 0;margin-bottom: 0.24rem;" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">细节</p>
		     	  <p style="font-size: 0.3rem;float: left;color: #2E3135;">&nbsp; (必填)</p></span>-->
			<!--<i style="float: right;font-size: 0.45rem;line-height: 1rem;margin-right: 0rem;color: #CACACA;" class="fa fa-chevron-right"></i>-->
			<!--<img src="../../assets/img/right_icon.png" style="float: right;height: 0.28rem;margin-top: 0.36rem;margin-right: 0rem;" />
				<p style="float: right;font-size: 0.3rem;color: #2E3135;margin-right: 0.2rem;">{{$store.state.Data_set.nian_dai!=null&&$store.state.Data_set.nian_dai!=''&&$store.state.Data_set.cai_zhi!=null&&$store.state.Data_set.cai_zhi!=''&&$store.state.Data_set.ti_cai!=null&&$store.state.Data_set.ti_cai!=''&&$store.state.Data_set.chang!=null&&$store.state.Data_set.chang!=''&&$store.state.Data_set.kuan!=null&&$store.state.Data_set.kuan!=''?'已填写':'未填写'}}</p>

			</div>-->

			<textarea v-show="pon" id="texta" v-model="$store.state.Data_set.Description_of_creation" style="width: 100%;font-size: 0.3rem;margin-top: 0.26rem;border: none;overflow-y: auto;height: 4rem;" placeholder="填写关于作品的创作说明（选填）...." maxlength="512"></textarea>
			<!--<div style="height: 2rem;width: 100;background-color: #ffffff;"></div>-->

		</div>

		<!--<div  style="width: 100%;height:1.3rem; background:#fff;box-shadow:0px -5px  20px  #F1F1F1;position: fixed;bottom: 0;" v-show="is_btn">
			<button id="btn" @click="go_babi" style="width: 90%;margin-left:5%;height:0.9rem;margin-top:0.2rem;font-size:0.3rem;background:rgba(46,49,53,1);border-radius: 0.15rem;color: white;">
			     {{$store.state.bian_ji_show==2?'确认修改':'确认发布'}}
			</button>
		</div>-->
		<yeardialog v-bind:e='report'></yeardialog>
		<div @touchmove.prevent>
			<mt-actionsheet :actions="action_photo" v-model="photo_sheetVisible"></mt-actionsheet>
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import { Toast } from 'mint-ui';
	import yeardialog from '../Details_of_the_work/yeardialog.vue'
	import md5 from 'js-md5';
	export default {
		components: {
			yeardialog
		},
		store,
		data() {
			return {
				gifts: false,
				fabu: true,
				text_show: true, //控制底部发布按钮显示隐藏
				pon: false,
				act: {
					noa: true,
					noe: false,
					noa1: true,
					noe1: false,
					noa2: true,
					noe2: false,
					noa3: false,
					noe3: true
				},
				acts: {
					noa: true,
					noe: false
				},
				biao: '',
				is_btn: true,
				hui_s: false,
				report: {
					is_reply: false
				},
				date_str: '',
				action_photo: [{
						name: '拍照',
						method: this.camera_func
					},
					{
						name: '相册',
						method: this.photo_func
					}
				],
				photo_sheetVisible: false,
			}
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
							that.uploadpic(ass)
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
							that.uploadpic(ass)
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
			dd() {
				this.date_str = this.$store.state.Data_set.nian_dai
				//return this.$store.state.Data_set.nian_dai
			},
			/*选择年份*/
			select_year() {
				this.report.is_reply = true;
			},
			yansghi() {
				let du = document.documentElement.clientHeight / document.documentElement.clientWidth;
				let myInput = document.getElementById('texta');
				//console.log(du,'屏幕百分比')
				if(du >= 1.7 && du < 2.0) {
					myInput.style.height = 7.7 - 2.7 + 'rem'
				} else if(du <= 1.7 && du > 1.63) {
					myInput.style.height = 6.9 - 2.7 + 'rem'
				} else if(du <= 1.6 && du > 1.45) {
					myInput.style.height = 6.1 - 2.7 + 'rem'
				} else if(du >= 2.0 && du < 2.1) {
					myInput.style.height = 9.3 - 2.7 + 'rem'
				} else if(du > 2.1) {
					myInput.style.height = 10.5 - 2.7 + 'rem'
				} else if(du < 1.4) {
					myInput.style.height = 4.3 - 2.7 + 'rem'
				} else if(du < 1.65 && du > 1.6) {
					myInput.style.height = 6.3 - 2.7 + 'rem'
				}
			},

			open3() {
				this.$notify({
					title: '成功',
					message: '作品发布成功',
					type: 'success',
					//        duration:0,
				});
			},

			hui() {
				this.$store.state.img_box.picUrl = '' //图片
				this.$store.state.Data_set.The_name_of_the_work = '' //标题
				this.$store.state.Data_set.Type_work = '' //类型
				this.$store.state.Data_set.Version_number = '' //版数
				this.$store.state.Data_set.nian_dai = '' //年份
				this.$store.state.Data_set.cai_zhi = '' //材质
				this.$store.state.Data_set.ti_cai = '' //题材
				this.$store.state.Data_set.chang = '' //长
				this.$store.state.Data_set.kuan = '' //宽
				this.$store.state.Data_set.gao = '' //高
				this.$store.state.Data_set.Description_of_creation = '' //作品内容
				if(this.$store.state.bian_ji_show == 2) {
					this.$router.push({
						path: '../My_work'
					});
					this.$store.state.bian_ji_show = 1
				} else {
					this.$router.push({
						path: '../add_facth'
					});
					this.$store.state.img_box = {};
					this.$store.state.img_box_to = [];
				}

			},
			/*删除图片*/
			delete_pic() {
				//console.log("111111111111")
				this.$store.state.img_box = []
				this.$refs.ss.value="";
			},
			qi() {
				if(this.$store.state.Data_set.Type_work != null && this.$store.state.Data_set.Type_work != "") {
					this.$router.push({
						path: '../Explain'
					});
				} else {
					Toast({
						message: '请先选择作品类型',
						position: 'middle',
						duration: 2000
					});
				}

			},
			btn1() {
				this.act.noa = false, this.act.noe = true
				this.act.noa1 = true, this.act.noe1 = false

				this.$store.state.Data_set.Copyright_of_works = '临摹'
			},
			btn2() {
				this.act.noa = true, this.act.noe = false
				this.act.noa1 = false, this.act.noe1 = true

				this.$store.state.Data_set.Copyright_of_works = '原创'
			},

			btn3() {
				this.act.noa2 = false, this.act.noe2 = true
				this.act.noa3 = true, this.act.noe3 = false

				this.$store.state.Data_set.artExpandOne = '可出售'
			},
			btn4() {
				this.act.noa2 = true, this.act.noe2 = false
				this.act.noa3 = false, this.act.noe3 = true

				this.$store.state.Data_set.artExpandOne = '仅展示'
			},

			to_Typeofwork() {
				this.$store.state.lei_xing_s = 1
				this.hui_s = false
				this.$router.push({
					path: '../Typeofwork'
				});

			},
			//上传图片
			uploadpic(e) { //上传主图事件

				var url = this.$store.state.request_url + "/api/mapManager/uploadPic.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				//var aa = document.getElementById("xgtx").files[0];
				var aa=e;
				//console.log(aa);
				if(aa != null && aa != "") {
					if(this.verificationPicFile(aa)) {

						this.gifts = true

						//console.log(aa,"111111111")
						var form = new FormData();
						form.append("picName", aa,"ll.jpg");
						form.append('plateName', 'art') // 添加form表单中其他数据
						form.append('picType', 'cover_pic')
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
								that.$store.state.img_box = abc.data
								that.gifts = false
								that.$refs.ss.value="";
							}
							
						});
					} else {
						Toast({
							message: "作品图片大小不能超过8M",
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

			},
			uploadpic_to(e) { //上传副图事件
				//				if(this.$store.state.img_box_to.length < 8) {
				//					var url="http://www.ding-new.com:8080/a10/api/mapManager/uploadPic.do";
				//		        var id=this.$store.state.data.memId;
				//		        var token=this.$store.state.data.tokEn;
				//		        var ts=new Date().getTime();
				//		        var sign=md5(url+id+token+ts)
				//					
				//					var self = this
				//					let file = e.target.files[0]
				//					/* eslint-disable no-undef */
				//					let param = new FormData() // 创建form对象
				//					param.append('file', file) // 通过append向form对象添加数据
				//					param.append('plateName', 'art') // 添加form表单中其他数据
				//					param.append('picType', 'supplementary_pic')
				//					//console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
				//					let config = {
				//						headers: {
				//							'Content-Type': 'multipart/form-data',
				//							"sIgn":sign
				//						}
				//					}
				//					if(file) {
				//						// 添加请求头
				//						this.$axios.post("api/mapManager/uploadPic.do?memId="+id+"&ts="+ts, param, config)
				//							.then(response => {
				//								if(response.data.meta.res === '00000') {
				//									this.$store.state.img_box_to.push(response.data.data)
				//									//console.log(this.$store.state.img_box_to)
				//								}
				//							})
				//					}
				//				}
			},
			go_babi() { //作品发布
			//	console.log("_____________1_________________________", this.$store.state.Data_set)
				//$("#btn").attr("disabled", true);
				//console.log(this.$store.state.Data_set)
				var url = this.$store.state.request_url + "/api/mapManager/saveArt.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				//console.log("作品图片" + this.$store.state.img_box.picUrl)
				/**判断是否上传图片*/
				if(this.$store.state.img_box.picUrl !== 'static/img/xin/icon_announce_addImage.png' && this.$store.state.img_box.picUrl !== '') {
					//console.log("0000000020001")
					/**判断类型*/
					if(this.$store.state.Data_set.Type_work != "" && this.$store.state.Data_set.Type_work != null) {
						//console.log("000000002000", this.$store.state.type_ma)
						/**判断是否填写版数*/
						if(this.$store.state.type_ma == 5 || this.$store.state.type_ma == 14 || this.$store.state.type_ma == 17 || this.$store.state.type_ma == 18 || this.$store.state.type_ma == 21 || this.$store.state.type_ma == 22) {
							console.log(this.$store.state.Data_set.Version_number)
							if(this.$store.state.Data_set.Version_number == null || this.$store.state.Data_set.Version_number == "") {
								Toast({
									message: '请填写作品版数',
									position: 'middle',
									duration: 2000
								});
							} else {
								//console.log("00000000000")
								/**判断年代*/
//								if(this.$store.state.Data_set.nian_dai != null && this.$store.state.Data_set.nian_dai != "") {
									/**判断名称*/
									if(this.$store.state.Data_set.The_name_of_the_work != "" && this.$store.state.Data_set.The_name_of_the_work != null) {
//										/*判断长度*/
//										if(this.$store.state.Data_set.chang != null && this.$store.state.Data_set.chang != "") {
//											/**判断宽度*/
//											if(this.$store.state.Data_set.kuan != null && this.$store.state.Data_set.kuan != "") {
												console.log("222222ssssssssssss22222222")
												/**判断类型是否是雕塑、陶艺、装置*/
												if(this.$store.state.Data_set.Type_work == "雕塑" || this.$store.state.Data_set.Type_work == "陶艺" || this.$store.state.Data_set.Type_work == "装置") {
													console.log("111111111111111")
													/**判断高度*/
//													if(this.$store.state.Data_set.gao != null && this.$store.state.Data_set.gao != "") {
														/**判断是原创还是临摹*/
														if(this.$store.state.Data_set.Copyright_of_works == "临摹") {
															if(this.$store.state.Data_set.original_author == null || this.$store.state.Data_set.original_author == "") {
																Toast({
																	message: '请填写作品原作者',
																	position: 'middle',
																	duration: 2000
																});
															} else {
																/**判断是仅展示还是可出售*/
																if(this.$store.state.Data_set.artExpandOne == "可出售") {
																	if(this.$store.state.Data_set.money == null || this.$store.state.Data_set.money == "") {
																		Toast({
																			message: '请填写出售金额',
																			position: 'middle',
																			duration: 2000
																		});
																	} else {
																		this.$store.state.img_box_to.push(this.$store.state.img_box)
																		if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																			var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																			var sign = md5(url + id + token + ts)
																			Toast({
																				message: '作品修改中,请稍等...',
																				position: 'middle',
																				duration: 2000
																			});
																			this.fabu = false

																			//console.log(this.$store.state.work_artid,'作品id')
																			this.$http({
																				url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																				headers: {
																					"content-type": "application/json;charset=UTF-8",
																					"sIgn": sign
																				},
																				emulateJSON: false,
																				method: 'post',
																				body: {
																					artId: this.$store.state.work_artid, //作品id
																					artType: {
																						artClassification: this.$store.state.Data_set.artClassification,
																						classificationName: this.$store.state.Data_set.Type_work,
																						printPic: this.$store.state.Data_set.Version_number
																					},
																					artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																					artDecription: { //其他信息
																						createDecade: this.$store.state.Data_set.nian_dai + "",
																						material: this.$store.state.Data_set.cai_zhi,
																						createTheme: this.$store.state.Data_set.ti_cai,
																						artLength: this.$store.state.Data_set.chang,
																						artWidth: this.$store.state.Data_set.kuan,
																						artHeight: this.$store.state.Data_set.gao
																					},
																					artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																					graduatedYear:this.$store.state.nian_ss,
																					schoolName:this.$store.state.yuan_xiao,
																					profession:this.$store.state.z_y,
																					education:this.$store.state.detailed_information.education,
																					artExpandOne: {
																						sellFlag: this.$store.state.Data_set.artExpandOne
																					},
																					artPrice: {
																						retailPrice: this.$store.state.Data_set.money
																					}

																				}
																			}).then(function(response) {
																				//console.log(response)
																				if(response.body.meta.res == '00000') {
																					Toast({
																						message: '修改成功',
																						position: 'middle',
																						duration: 2000
																					});
																					//$("#btn").attr("disabled", false);
																					this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																					this.$router.push({
																						path: '../My_work'
																					});
																					this.$store.state.img_box_to = []
																					this.$store.state.Data_set = {}
																					this.$store.state.img_box.picUrl = '' //图片
																				}
																			}).catch(function(err) { //console.log(err)
																				this.fabu = true
																			})
																		//	console.log("进来")
																		} else {
																		//	console.log("进来")
																			Toast({
																				message: '作品发布中,请稍等...',
																				position: 'middle',
																				duration: 2000
																			});
																			this.fabu = false
																			this.$http({
																				url: this.$store.state.request_url + "/api/mapManager/saveArt.do?memId=" + id + "&ts=" + ts,
																				headers: {
																					"content-type": "application/json;charset=UTF-8",
																					"sIgn": sign
																				},
																				emulateJSON: false,
																				method: 'post',
																				body: {
																					opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																					picUrl: this.$store.state.img_box_to, //作品图片
																					artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																					artType: { //作品类型
																						artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																						classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																						printPic: this.$store.state.Data_set.Version_number //版数
																					},
																					artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																					artDecription: {
																						createDecade: this.$store.state.Data_set.nian_dai + "",
																						material: this.$store.state.Data_set.cai_zhi,
																						createTheme: this.$store.state.Data_set.ti_cai,
																						artLength: this.$store.state.Data_set.chang,
																						artWidth: this.$store.state.Data_set.kuan,
																						artHeight: this.$store.state.Data_set.gao
																					},
																					artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																					artExpandOne: {
																						sellFlag: this.$store.state.Data_set.artExpandOne
																					},
																					artPrice: {
																						retailPrice: this.$store.state.Data_set.money
																					}
																				}
																			}).then(function(response) {
																				//console.log(response)
																				if(response.body.meta.res == '00000') {
																					//this.open3()
																					Toast({
																						message: '发布成功',
																						position: 'middle',
																						duration: 2000
																					});
																					this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																					this.$router.push({
																						path: '../slider'
																					});

																					this.$store.state.img_box_to = []
																					this.$store.state.Data_set = {}
																					this.$store.state.img_box.picUrl = '' //图片

																				}
																			}).catch(function(err) {
																				//console.log(err)
																				this.fabu = true
																			})
																		}
																	}

																} else {

																	this.$store.state.img_box_to.push(this.$store.state.img_box)
																	if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																		var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																		var sign = md5(url + id + token + ts)
																		Toast({
																			message: '作品修改中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false
																		//console.log(this.$store.state.work_artid,'作品id')
																		this.$http({
																			url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				artId: this.$store.state.work_artid, //作品id
																				artType: {
																					artClassification: this.$store.state.Data_set.artClassification,
																					classificationName: this.$store.state.Data_set.Type_work,
																					printPic: this.$store.state.Data_set.Version_number
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																				artDecription: { //其他信息
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																					sellFlag: this.$store.state.Data_set.artExpandOne
																				}

																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				Toast({
																					message: '修改成功',
																					position: 'middle',
																					duration: 2000
																				});
																				//$("#btn").attr("disabled", false);
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../My_work'
																				});
																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片
																			}
																		}).catch(function(err) { //console.log(err)
																			this.fabu = true
																		})
																		//console.log("进来")
																	} else {
																		//console.log("进来")
																		Toast({
																			message: '作品发布中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false
																		this.$http({
																			url: this.$store.state.request_url + "/api/mapManager/saveArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																				picUrl: this.$store.state.img_box_to, //作品图片
																				artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																				artType: { //作品类型
																					artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																					classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																					printPic: this.$store.state.Data_set.Version_number //版数
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																				artDecription: {
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																					sellFlag: this.$store.state.Data_set.artExpandOne
																				}
																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				//this.open3()
																				Toast({
																					message: '发布成功',
																					position: 'middle',
																					duration: 2000
																				});
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../slider'
																				});

																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片

																			}
																		}).catch(function(err) {
																			//console.log(err)
																			this.fabu = true
																		})
																	}

																}
															}

														} else {
															//console.log("进来")
															/**判断是仅展示还是可出售*/
															if(this.$store.state.Data_set.artExpandOne == "可出售") {
																if(this.$store.state.Data_set.money == null || this.$store.state.Data_set.money == "") {
																	Toast({
																		message: '请填写出售金额',
																		position: 'middle',
																		duration: 2000
																	});
																} else {
																	this.$store.state.img_box_to.push(this.$store.state.img_box)
																	if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																		var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																		var sign = md5(url + id + token + ts)
																		Toast({
																			message: '作品修改中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false

																		//console.log(this.$store.state.work_artid,'作品id')
																		this.$http({
																			url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				artId: this.$store.state.work_artid, //作品id
																				artType: {
																					artClassification: this.$store.state.Data_set.artClassification,
																					classificationName: this.$store.state.Data_set.Type_work,
																					printPic: this.$store.state.Data_set.Version_number
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works, //版权
																				artDecription: { //其他信息
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																					sellFlag: this.$store.state.Data_set.artExpandOne
																				},
																				artPrice: {
																					retailPrice: this.$store.state.Data_set.money
																				}

																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				Toast({
																					message: '修改成功',
																					position: 'middle',
																					duration: 2000
																				});
																				//$("#btn").attr("disabled", false);
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../My_work'
																				});
																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片
																			}
																		}).catch(function(err) { //console.log(err)
																			this.fabu = true
																		})

																	} else {

																		Toast({
																			message: '作品发布中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false
																		this.$http({
																			url: this.$store.state.request_url + "/api/mapManager/saveArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																				picUrl: this.$store.state.img_box_to, //作品图片
																				artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																				artType: { //作品类型
																					artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																					classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																					printPic: this.$store.state.Data_set.Version_number //版数
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works, //版权信息
																				artDecription: {
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																					sellFlag: this.$store.state.Data_set.artExpandOne
																				},
																				artPrice: {
																					retailPrice: this.$store.state.Data_set.money
																				}
																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				//this.open3()
																				Toast({
																					message: '发布成功',
																					position: 'middle',
																					duration: 2000
																				});
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../slider'
																				});

																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片

																			}
																		}).catch(function(err) {
																			//console.log(err)
																			this.fabu = true
																		})
																	}
																}
															} else {
																this.$store.state.img_box_to.push(this.$store.state.img_box)
																if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																	var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																	var sign = md5(url + id + token + ts)
																	Toast({
																		message: '作品修改中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false

																	//console.log(this.$store.state.work_artid,'作品id')
																	this.$http({
																		url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			artId: this.$store.state.work_artid, //作品id
																			artType: {
																				artClassification: this.$store.state.Data_set.artClassification,
																				classificationName: this.$store.state.Data_set.Type_work,
																				printPic: this.$store.state.Data_set.Version_number
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works, //版权
																			artDecription: { //其他信息
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			}

																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			Toast({
																				message: '修改成功',
																				position: 'middle',
																				duration: 2000
																			});
																			//$("#btn").attr("disabled", false);
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../My_work'
																			});
																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片
																		}
																	}).catch(function(err) { //console.log(err)
																		this.fabu = true
																	})

																} else {

																	Toast({
																		message: '作品发布中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false
																	this.$http({
																		url: this.$store.state.request_url + "/api/mapManager/saveArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																			picUrl: this.$store.state.img_box_to, //作品图片
																			artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																			artType: { //作品类型
																				artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																				classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																				printPic: this.$store.state.Data_set.Version_number //版数
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works, //版权信息
																			artDecription: {
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			}
																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			//this.open3()
																			Toast({
																				message: '发布成功',
																				position: 'middle',
																				duration: 2000
																			});
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../slider'
																			});

																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片

																		}
																	}).catch(function(err) {
																		//console.log(err)
																		this.fabu = true
																	})
																}
															}
														}
//													} else {
//														Toast({
//															message: '请填写作品的高度',
//															position: 'middle',
//															duration: 2000
//														});
//													}
												} else {

													//console.log("进来2")
													/**判断是原创还是临摹*/
													if(this.$store.state.Data_set.Copyright_of_works == "临摹") {
														if(this.$store.state.Data_set.original_author == null || this.$store.state.Data_set.original_author == "") {
															Toast({
																message: '请填写作品原作者',
																position: 'middle',
																duration: 2000
															});
														} else {
															/**判断是仅展示还是可出售*/
															if(this.$store.state.Data_set.artExpandOne == "可出售") {
																if(this.$store.state.Data_set.money == null || this.$store.state.Data_set.money == "") {
																	Toast({
																		message: '请填写出售金额',
																		position: 'middle',
																		duration: 2000
																	});
																} else {
																	if(this.$store.state.Data_set.Copyright_of_works != null && this.$store.state.Data_set.Copyright_of_works != "") {

																		//									if(this.$store.state.Data_set.Description_of_creation != null && this.$store.state.Data_set.Description_of_creation != "") {
																		this.$store.state.img_box_to.push(this.$store.state.img_box)
																		if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																			//console.log("jinali1bu")
																			var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																			var sign = md5(url + id + token + ts)
																			Toast({
																				message: '作品修改中,请稍等...',
																				position: 'middle',
																				duration: 2000
																			});
																			this.fabu = false

																			//console.log(this.$store.state.work_artid,'作品id')
																			this.$http({
																				url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																				headers: {
																					"content-type": "application/json;charset=UTF-8",
																					"sIgn": sign
																				},
																				emulateJSON: false,
																				method: 'post',
																				body: {
																					artId: this.$store.state.work_artid, //作品id
																					artType: {
																						artClassification: this.$store.state.Data_set.artClassification,
																						classificationName: this.$store.state.Data_set.Type_work,
																						printPic: this.$store.state.Data_set.Version_number
																					},
																					artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																					artDecription: { //其他信息
																						createDecade: this.$store.state.Data_set.nian_dai + "",
																						material: this.$store.state.Data_set.cai_zhi,
																						createTheme: this.$store.state.Data_set.ti_cai,
																						artLength: this.$store.state.Data_set.chang,
																						artWidth: this.$store.state.Data_set.kuan,
																						artHeight: this.$store.state.Data_set.gao
																					},
																					artRemark: this.$store.state.Data_set.Description_of_creation,
																						artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																					artExpandOne: {
																						sellFlag: this.$store.state.Data_set.artExpandOne
																					},
																					artPrice: {
																						retailPrice: this.$store.state.Data_set.money
																					}

																				}
																			}).then(function(response) {
																				//console.log(response)
																				if(response.body.meta.res == '00000') {
																					Toast({
																						message: '修改成功',
																						position: 'middle',
																						duration: 2000
																					});
																					//$("#btn").attr("disabled", false);
																					this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																					this.$router.push({
																						path: '../My_work'
																					});
																					this.$store.state.img_box_to = []
																					this.$store.state.Data_set = {}
																					this.$store.state.img_box.picUrl = '' //图片
																				}
																			}).catch(function(err) { //console.log(err)
																				this.fabu = true
																			})

																		} else {
																		//	console.log("2222222222222222222")
																			Toast({
																				message: '作品发布中,请稍等...',
																				position: 'middle',
																				duration: 2000
																			});
																			this.fabu = false
																			this.$http({
																				url: this.$store.state.request_url + "/api/mapManager/saveArt.do?memId=" + id + "&ts=" + ts,
																				headers: {
																					"content-type": "application/json;charset=UTF-8",
																					"sIgn": sign
																				},
																				emulateJSON: false,
																				method: 'post',
																				body: {
																					opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																					picUrl: this.$store.state.img_box_to, //作品图片
																					artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																					artType: { //作品类型
																						artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																						classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																						printPic: this.$store.state.Data_set.Version_number //版数
																					},
																					artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																					artDecription: {
																						createDecade: this.$store.state.Data_set.nian_dai + "",
																						material: this.$store.state.Data_set.cai_zhi,
																						createTheme: this.$store.state.Data_set.ti_cai,
																						artLength: this.$store.state.Data_set.chang,
																						artWidth: this.$store.state.Data_set.kuan,
																						artHeight: this.$store.state.Data_set.gao
																					},
																					artRemark: this.$store.state.Data_set.Description_of_creation,
																						artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																					artExpandOne: {
																						sellFlag: this.$store.state.Data_set.artExpandOne
																					},
																					artPrice: {
																						retailPrice: this.$store.state.Data_set.money
																					}

																				}
																			}).then(function(response) {
																				//console.log(response)
																				if(response.body.meta.res == '00000') {
																					//this.open3()
																					Toast({
																						message: '发布成功',
																						position: 'middle',
																						duration: 2000
																					});
																					this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																					this.$router.push({
																						path: '../slider'
																					});

																					this.$store.state.img_box_to = []
																					this.$store.state.Data_set = {}
																					this.$store.state.img_box.picUrl = '' //图片

																				}
																			}).catch(function(err) {
																				//console.log(err)
																				this.fabu = true
																			})
																		}

																		//									} else {
																		//										Toast({
																		//											message: '请填写创作说明',
																		//											position: 'middle',
																		//											duration: 2000
																		//										});
																		//									}

																	} else {
																		Toast({
																			message: '请填写作品版权信息',
																			position: 'middle',
																			duration: 2000
																		});
																	}
																}
															} else {
																if(this.$store.state.Data_set.Copyright_of_works != null && this.$store.state.Data_set.Copyright_of_works != "") {

																	//									if(this.$store.state.Data_set.Description_of_creation != null && this.$store.state.Data_set.Description_of_creation != "") {
																	this.$store.state.img_box_to.push(this.$store.state.img_box)
																	if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																		//console.log("jinali1bu")
																		var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																		var sign = md5(url + id + token + ts)
																		Toast({
																			message: '作品修改中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false

																		//console.log(this.$store.state.work_artid,'作品id')
																		this.$http({
																			url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				artId: this.$store.state.work_artid, //作品id
																				artType: {
																					artClassification: this.$store.state.Data_set.artClassification,
																					classificationName: this.$store.state.Data_set.Type_work,
																					printPic: this.$store.state.Data_set.Version_number
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																				artDecription: { //其他信息
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																					sellFlag: this.$store.state.Data_set.artExpandOne
																				}

																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				Toast({
																					message: '修改成功',
																					position: 'middle',
																					duration: 2000
																				});
																				//$("#btn").attr("disabled", false);
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../My_work'
																				});
																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片
																			}
																		}).catch(function(err) { //console.log(err)
																			this.fabu = true
																		})

																	} else {
																		console.log("2222222222222222222")
																		Toast({
																			message: '作品发布中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false
																		this.$http({
																			url: this.$store.state.request_url + "/api/mapManager/saveArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																				picUrl: this.$store.state.img_box_to, //作品图片
																				artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																				artType: { //作品类型
																					artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																					classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																					printPic: this.$store.state.Data_set.Version_number //版数
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																				artDecription: {
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																					sellFlag: this.$store.state.Data_set.artExpandOne
																				},
																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				//this.open3()
																				Toast({
																					message: '发布成功',
																					position: 'middle',
																					duration: 2000
																				});
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../slider'
																				});

																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片

																			}
																		}).catch(function(err) {
																			//console.log(err)
																			this.fabu = true
																		})
																	}

																	//									} else {
																	//										Toast({
																	//											message: '请填写创作说明',
																	//											position: 'middle',
																	//											duration: 2000
																	//										});
																	//									}

																} else {
																	Toast({
																		message: '请填写作品版权信息',
																		position: 'middle',
																		duration: 2000
																	});
																}
															}

														}
													} else {
														/**判断是仅展示还是可出售*/
														if(this.$store.state.Data_set.artExpandOne == "可出售") {
															if(this.$store.state.Data_set.money == null || this.$store.state.Data_set.money == "") {
																Toast({
																	message: '请填写出售金额',
																	position: 'middle',
																	duration: 2000
																});
															} else {
																if(this.$store.state.Data_set.Copyright_of_works != null && this.$store.state.Data_set.Copyright_of_works != "") {

																	//									if(this.$store.state.Data_set.Description_of_creation != null && this.$store.state.Data_set.Description_of_creation != "") {
																	this.$store.state.img_box_to.push(this.$store.state.img_box)
																	if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																		console.log("jinali1bu")
																		var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																		var sign = md5(url + id + token + ts)
																		Toast({
																			message: '作品修改中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false

																		//console.log(this.$store.state.work_artid,'作品id')
																		this.$http({
																			url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				artId: this.$store.state.work_artid, //作品id
																				artType: {
																					artClassification: this.$store.state.Data_set.artClassification,
																					classificationName: this.$store.state.Data_set.Type_work,
																					printPic: this.$store.state.Data_set.Version_number
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works, //版权
																				artDecription: { //其他信息
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																					sellFlag: this.$store.state.Data_set.artExpandOne
																				},
																				artPrice: {
																					retailPrice: this.$store.state.Data_set.money
																				}

																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				Toast({
																					message: '修改成功',
																					position: 'middle',
																					duration: 2000
																				});
																				//$("#btn").attr("disabled", false);
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../My_work'
																				});
																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片
																			}
																		}).catch(function(err) { //console.log(err)
																			this.fabu = true
																		})

																	} else {
																		//	console.log("2222222222222222222")
																		Toast({
																			message: '作品发布中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false
																		this.$http({
																			url: this.$store.state.request_url + "/api/mapManager/saveArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																				picUrl: this.$store.state.img_box_to, //作品图片
																				artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																				artType: { //作品类型
																					artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																					classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																					printPic: this.$store.state.Data_set.Version_number //版数
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works, //版权信息
																				artDecription: {
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																					sellFlag: this.$store.state.Data_set.artExpandOne
																				},
																				artPrice: {
																					retailPrice: this.$store.state.Data_set.money
																				}
																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				//this.open3()
																				Toast({
																					message: '发布成功',
																					position: 'middle',
																					duration: 2000
																				});
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../slider'
																				});

																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片

																			}
																		}).catch(function(err) {
																			//console.log(err)
																			this.fabu = true
																		})
																	}

																	//									} else {
																	//										Toast({
																	//											message: '请填写创作说明',
																	//											position: 'middle',
																	//											duration: 2000
																	//										});
																	//									}

																} else {
																	Toast({
																		message: '请填写作品版权信息',
																		position: 'middle',
																		duration: 2000
																	});
																}
															}
														} else {
															if(this.$store.state.Data_set.Copyright_of_works != null && this.$store.state.Data_set.Copyright_of_works != "") {

																//									if(this.$store.state.Data_set.Description_of_creation != null && this.$store.state.Data_set.Description_of_creation != "") {
																this.$store.state.img_box_to.push(this.$store.state.img_box)
																if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																	console.log("jinali1bu")
																	var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																	var sign = md5(url + id + token + ts)
																	Toast({
																		message: '作品修改中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false

																	//console.log(this.$store.state.work_artid,'作品id')
																	this.$http({
																		url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			artId: this.$store.state.work_artid, //作品id
																			artType: {
																				artClassification: this.$store.state.Data_set.artClassification,
																				classificationName: this.$store.state.Data_set.Type_work,
																				printPic: this.$store.state.Data_set.Version_number
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works, //版权
																			artDecription: { //其他信息
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			}

																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			Toast({
																				message: '修改成功',
																				position: 'middle',
																				duration: 2000
																			});
																			//$("#btn").attr("disabled", false);
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../My_work'
																			});
																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片
																		}
																	}).catch(function(err) { //console.log(err)
																		this.fabu = true
																	})

																} else {
																	//	console.log("2222222222222222222")
																	Toast({
																		message: '作品发布中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false
																	this.$http({
																		url: this.$store.state.request_url + "/api/mapManager/saveArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																			picUrl: this.$store.state.img_box_to, //作品图片
																			artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																			artType: { //作品类型
																				artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																				classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																				printPic: this.$store.state.Data_set.Version_number //版数
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works, //版权信息
																			artDecription: {
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			},

																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			//this.open3()
																			Toast({
																				message: '发布成功',
																				position: 'middle',
																				duration: 2000
																			});
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../slider'
																			});

																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片

																		}
																	}).catch(function(err) {
																		//console.log(err)
																		this.fabu = true
																	})
																}

																//									} else {
																//										Toast({
																//											message: '请填写创作说明',
																//											position: 'middle',
																//											duration: 2000
																//										});
																//									}

															} else {
																Toast({
																	message: '请填写作品版权信息',
																	position: 'middle',
																	duration: 2000
																});
															}
														}
													}
												}
//											} else {
//												Toast({
//													message: '请填写作品的宽度',
//													position: 'middle',
//													duration: 2000
//												});
//											}
//										} else {
//											Toast({
//												message: '请填写作品的长度',
//												position: 'middle',
//												duration: 2000
//											});
//										}

									} else {
										Toast({
											message: '请填写作品名称',
											position: 'middle',
											duration: 2000
										});
									}
//								} else {
//									Toast({
//										message: '请选择年代',
//										position: 'middle',
//										duration: 2000
//									});
//								}
							}
						} else {
						//	console.log("1111100000000011111111")
							/**判断年代*/
//							if(this.$store.state.Data_set.nian_dai != null && this.$store.state.Data_set.nian_dai != "") {
								/**判断名称*/
								if(this.$store.state.Data_set.The_name_of_the_work != "" && this.$store.state.Data_set.The_name_of_the_work != null) {
									/*判断长度*/
//									if(this.$store.state.Data_set.chang != null && this.$store.state.Data_set.chang != "") {
//										/**判断宽度*/
//										if(this.$store.state.Data_set.kuan != null && this.$store.state.Data_set.kuan != "") {
											/**判断类型是否是雕塑、陶艺、装置*/
											if(this.$store.state.Data_set.Type_work == "雕塑" || this.$store.state.Data_set.Type_work == "陶艺" || this.$store.state.Data_set.Type_work == "装置") {
												/**判断高度*/
//												if(this.$store.state.Data_set.gao != null && this.$store.state.Data_set.gao != "") {
													/**判断是原创还是临摹*/
													if(this.$store.state.Data_set.Copyright_of_works == "临摹") {
														if(this.$store.state.Data_set.original_author == null || this.$store.state.Data_set.original_author == "") {
															Toast({
																message: '请填写作品原作者',
																position: 'middle',
																duration: 2000
															});
														} else {
															/**判断是仅展示还是可出售*/
															if(this.$store.state.Data_set.artExpandOne == "可出售") {
																if(this.$store.state.Data_set.money == null || this.$store.state.Data_set.money == "") {
																	Toast({
																		message: '请填写出售金额',
																		position: 'middle',
																		duration: 2000
																	});
																} else {
																	//console.log("2222222222222222222")
																	//									if(this.$store.state.Data_set.Description_of_creation != null && this.$store.state.Data_set.Description_of_creation != "") {

																	this.$store.state.img_box_to.push(this.$store.state.img_box)
																	if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																		var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																		var sign = md5(url + id + token + ts)
																		Toast({
																			message: '作品修改中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false

																		//console.log(this.$store.state.work_artid,'作品id')
																		this.$http({
																			url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				artId: this.$store.state.work_artid, //作品id
																				artType: {
																					artClassification: this.$store.state.Data_set.artClassification,
																					classificationName: this.$store.state.Data_set.Type_work,
																					printPic: this.$store.state.Data_set.Version_number
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																				artDecription: { //其他信息
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																					sellFlag: this.$store.state.Data_set.artExpandOne
																				},
																				artPrice: {
																					retailPrice: this.$store.state.Data_set.money
																				}

																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				Toast({
																					message: '修改成功',
																					position: 'middle',
																					duration: 2000
																				});
																				//$("#btn").attr("disabled", false);
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../My_work'
																				});
																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片
																			}
																		}).catch(function(err) { //console.log(err)
																			this.fabu = true
																		})

																	} else {

																		Toast({
																			message: '作品发布中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false
																		this.$http({
																			url: this.$store.state.request_url + "/api/mapManager/saveGradArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																				picUrl: this.$store.state.img_box_to, //作品图片
																				artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																				artType: { //作品类型
																					artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																					classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																					printPic: this.$store.state.Data_set.Version_number //版数
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																				artDecription: {
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																					sellFlag: this.$store.state.Data_set.artExpandOne
																				},
																				artPrice: {
																					retailPrice: this.$store.state.Data_set.money
																				}
																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				//this.open3()
																				Toast({
																					message: '发布成功',
																					position: 'middle',
																					duration: 2000
																				});
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../slider'
																				});

																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片

																			}
																		}).catch(function(err) {
																			//console.log(err)
																			this.fabu = true
																		})
																	}
																}
															} else {
																this.$store.state.img_box_to.push(this.$store.state.img_box)
																if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																	var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																	var sign = md5(url + id + token + ts)
																	Toast({
																		message: '作品修改中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false

																	//console.log(this.$store.state.work_artid,'作品id')
																	this.$http({
																		url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			artId: this.$store.state.work_artid, //作品id
																			artType: {
																				artClassification: this.$store.state.Data_set.artClassification,
																				classificationName: this.$store.state.Data_set.Type_work,
																				printPic: this.$store.state.Data_set.Version_number
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																			artDecription: { //其他信息
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			}

																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			Toast({
																				message: '修改成功',
																				position: 'middle',
																				duration: 2000
																			});
																			//$("#btn").attr("disabled", false);
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../My_work'
																			});
																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片
																		}
																	}).catch(function(err) { //console.log(err)
																		this.fabu = true
																	})

																} else {

																	Toast({
																		message: '作品发布中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false
																	this.$http({
																		url: this.$store.state.request_url + "/api/mapManager/saveGradArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																			picUrl: this.$store.state.img_box_to, //作品图片
																			artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																			artType: { //作品类型
																				artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																				classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																				printPic: this.$store.state.Data_set.Version_number //版数
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																			artDecription: {
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			}

																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			//this.open3()
																			Toast({
																				message: '发布成功',
																				position: 'middle',
																				duration: 2000
																			});
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../slider'
																			});

																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片

																		}
																	}).catch(function(err) {
																		//console.log(err)
																		this.fabu = true
																	})
																}
															}

														}

													} else {

														/**判断是仅展示还是可出售*/
														if(this.$store.state.Data_set.artExpandOne == "可出售") {
															if(this.$store.state.Data_set.money == null || this.$store.state.Data_set.money == "") {
																Toast({
																	message: '请填写出售金额',
																	position: 'middle',
																	duration: 2000
																});
															} else {
																//console.log("2222222222222222222")
																//									if(this.$store.state.Data_set.Description_of_creation != null && this.$store.state.Data_set.Description_of_creation != "") {

																this.$store.state.img_box_to.push(this.$store.state.img_box)
																if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																	var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																	var sign = md5(url + id + token + ts)
																	Toast({
																		message: '作品修改中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false

																	//console.log(this.$store.state.work_artid,'作品id')
																	this.$http({
																		url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			artId: this.$store.state.work_artid, //作品id
																			artType: {
																				artClassification: this.$store.state.Data_set.artClassification,
																				classificationName: this.$store.state.Data_set.Type_work,
																				printPic: this.$store.state.Data_set.Version_number
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																			artDecription: { //其他信息
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			},
																			artPrice: {
																				retailPrice: this.$store.state.Data_set.money
																			}

																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			Toast({
																				message: '修改成功',
																				position: 'middle',
																				duration: 2000
																			});
																			//$("#btn").attr("disabled", false);
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../My_work'
																			});
																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片
																		}
																	}).catch(function(err) { //console.log(err)
																		this.fabu = true
																	})

																} else {

																	Toast({
																		message: '作品发布中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false
																	this.$http({
																		url: this.$store.state.request_url + "/api/mapManager/saveGradArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																			picUrl: this.$store.state.img_box_to, //作品图片
																			artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																			artType: { //作品类型
																				artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																				classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																				printPic: this.$store.state.Data_set.Version_number //版数
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																			artDecription: {
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			},
																			artPrice: {
																				retailPrice: this.$store.state.Data_set.money
																			}
																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			//this.open3()
																			Toast({
																				message: '发布成功',
																				position: 'middle',
																				duration: 2000
																			});
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../slider'
																			});

																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片

																		}
																	}).catch(function(err) {
																		//console.log(err)
																		this.fabu = true
																	})
																}
															}
														} else {
															this.$store.state.img_box_to.push(this.$store.state.img_box)
															if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																var sign = md5(url + id + token + ts)
																Toast({
																	message: '作品修改中,请稍等...',
																	position: 'middle',
																	duration: 2000
																});
																this.fabu = false

																//console.log(this.$store.state.work_artid,'作品id')
																this.$http({
																	url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																	headers: {
																		"content-type": "application/json;charset=UTF-8",
																		"sIgn": sign
																	},
																	emulateJSON: false,
																	method: 'post',
																	body: {
																		artId: this.$store.state.work_artid, //作品id
																		artType: {
																			artClassification: this.$store.state.Data_set.artClassification,
																			classificationName: this.$store.state.Data_set.Type_work,
																			printPic: this.$store.state.Data_set.Version_number
																		},
																		artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																		artDecription: { //其他信息
																			createDecade: this.$store.state.Data_set.nian_dai + "",
																			material: this.$store.state.Data_set.cai_zhi,
																			createTheme: this.$store.state.Data_set.ti_cai,
																			artLength: this.$store.state.Data_set.chang,
																			artWidth: this.$store.state.Data_set.kuan,
																			artHeight: this.$store.state.Data_set.gao
																		},
																		artRemark: this.$store.state.Data_set.Description_of_creation,
																			artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																		artExpandOne: {
																			sellFlag: this.$store.state.Data_set.artExpandOne
																		}

																	}
																}).then(function(response) {
																	//console.log(response)
																	if(response.body.meta.res == '00000') {
																		Toast({
																			message: '修改成功',
																			position: 'middle',
																			duration: 2000
																		});
																		//$("#btn").attr("disabled", false);
																		this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																		this.$router.push({
																			path: '../My_work'
																		});
																		this.$store.state.img_box_to = []
																		this.$store.state.Data_set = {}
																		this.$store.state.img_box.picUrl = '' //图片
																	}
																}).catch(function(err) { //console.log(err)
																	this.fabu = true
																})

															} else {

																Toast({
																	message: '作品发布中,请稍等...',
																	position: 'middle',
																	duration: 2000
																});
																this.fabu = false
																this.$http({
																	url: this.$store.state.request_url + "/api/mapManager/saveGradArt.do?memId=" + id + "&ts=" + ts,
																	headers: {
																		"content-type": "application/json;charset=UTF-8",
																		"sIgn": sign
																	},
																	emulateJSON: false,
																	method: 'post',
																	body: {
																		opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																		picUrl: this.$store.state.img_box_to, //作品图片
																		artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																		artType: { //作品类型
																			artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																			classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																			printPic: this.$store.state.Data_set.Version_number //版数
																		},
																		artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																		artDecription: {
																			createDecade: this.$store.state.Data_set.nian_dai + "",
																			material: this.$store.state.Data_set.cai_zhi,
																			createTheme: this.$store.state.Data_set.ti_cai,
																			artLength: this.$store.state.Data_set.chang,
																			artWidth: this.$store.state.Data_set.kuan,
																			artHeight: this.$store.state.Data_set.gao
																		},
																		artRemark: this.$store.state.Data_set.Description_of_creation,
																			artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																		artExpandOne: {
																			sellFlag: this.$store.state.Data_set.artExpandOne
																		}

																	}
																}).then(function(response) {
																	//console.log(response)
																	if(response.body.meta.res == '00000') {
																		//this.open3()
																		Toast({
																			message: '发布成功',
																			position: 'middle',
																			duration: 2000
																		});
																		this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																		this.$router.push({
																			path: '../slider'
																		});

																		this.$store.state.img_box_to = []
																		this.$store.state.Data_set = {}
																		this.$store.state.img_box.picUrl = '' //图片

																	}
																}).catch(function(err) {
																	//console.log(err)
																	this.fabu = true
																})
															}
														}

													}

//												} else {
//													Toast({
//														message: '请填写作品的高度',
//														position: 'middle',
//														duration: 2000
//													});
//												}
											} else {
												/**判断是原创还是临摹*/
												if(this.$store.state.Data_set.Copyright_of_works == "临摹") {

													if(this.$store.state.Data_set.original_author == null || this.$store.state.Data_set.original_author == "") {
														Toast({
															message: '请填写作品原作者',
															position: 'middle',
															duration: 2000
														});
													} else {

														/**判断是仅展示还是可出售*/
														if(this.$store.state.Data_set.artExpandOne == "可出售") {
															if(this.$store.state.Data_set.money == null || this.$store.state.Data_set.money == "") {
																Toast({
																	message: '请填写出售金额',
																	position: 'middle',
																	duration: 2000
																});
															} else {

																if(this.$store.state.Data_set.Copyright_of_works != null && this.$store.state.Data_set.Copyright_of_works != "") {

																	//									if(this.$store.state.Data_set.Description_of_creation != null && this.$store.state.Data_set.Description_of_creation != "") {
																	this.$store.state.img_box_to.push(this.$store.state.img_box)
																	if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																		var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																		var sign = md5(url + id + token + ts)
																		Toast({
																			message: '作品修改中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false

																		//console.log(this.$store.state.work_artid,'作品id')
																		this.$http({
																			url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				artId: this.$store.state.work_artid, //作品id
																				artType: {
																					artClassification: this.$store.state.Data_set.artClassification,
																					classificationName: this.$store.state.Data_set.Type_work,
																					printPic: this.$store.state.Data_set.Version_number
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																				artDecription: { //其他信息
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			},
																			artPrice: {
																				retailPrice: this.$store.state.Data_set.money
																			}

																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				Toast({
																					message: '修改成功',
																					position: 'middle',
																					duration: 2000
																				});
																				//$("#btn").attr("disabled", false);
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../My_work'
																				});
																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片
																			}
																		}).catch(function(err) { //console.log(err)
																			this.fabu = true
																		})

																	} else {

																		Toast({
																			message: '作品发布中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false
																		this.$http({
																			url: this.$store.state.request_url + "/api/mapManager/saveGradArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																				picUrl: this.$store.state.img_box_to, //作品图片
																				artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																				artType: { //作品类型
																					artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																					classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																					printPic: this.$store.state.Data_set.Version_number //版数
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																				artDecription: {
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			},
																			artPrice: {
																				retailPrice: this.$store.state.Data_set.money
																			}
																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				//this.open3()
																				Toast({
																					message: '发布成功',
																					position: 'middle',
																					duration: 2000
																				});
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../slider'
																				});

																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片

																			}
																		}).catch(function(err) {
																			//console.log(err)
																			this.fabu = true
																		})
																	}

																	//									} else {
																	//										Toast({
																	//											message: '请填写创作说明',
																	//											position: 'middle',
																	//											duration: 2000
																	//										});
																	//									}

																} else {
																	Toast({
																		message: '请填写作品版权信息',
																		position: 'middle',
																		duration: 2000
																	});
																}

															}
														} else {

															if(this.$store.state.Data_set.Copyright_of_works != null && this.$store.state.Data_set.Copyright_of_works != "") {

																//									if(this.$store.state.Data_set.Description_of_creation != null && this.$store.state.Data_set.Description_of_creation != "") {
																this.$store.state.img_box_to.push(this.$store.state.img_box)
																if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																	var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																	var sign = md5(url + id + token + ts)
																	Toast({
																		message: '作品修改中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false

																	//console.log(this.$store.state.work_artid,'作品id')
																	this.$http({
																		url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			artId: this.$store.state.work_artid, //作品id
																			artType: {
																				artClassification: this.$store.state.Data_set.artClassification,
																				classificationName: this.$store.state.Data_set.Type_work,
																				printPic: this.$store.state.Data_set.Version_number
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																			artDecription: { //其他信息
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			}

																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			Toast({
																				message: '修改成功',
																				position: 'middle',
																				duration: 2000
																			});
																			//$("#btn").attr("disabled", false);
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../My_work'
																			});
																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片
																		}
																	}).catch(function(err) { //console.log(err)
																		this.fabu = true
																	})

																} else {

																	Toast({
																		message: '作品发布中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false
																	this.$http({
																		url: this.$store.state.request_url + "/api/mapManager/saveGradArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																			picUrl: this.$store.state.img_box_to, //作品图片
																			artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																			artType: { //作品类型
																				artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																				classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																				printPic: this.$store.state.Data_set.Version_number //版数
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																			artDecription: {
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			}
																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			//this.open3()
																			Toast({
																				message: '发布成功',
																				position: 'middle',
																				duration: 2000
																			});
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../slider'
																			});

																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片

																		}
																	}).catch(function(err) {
																		//console.log(err)
																		this.fabu = true
																	})
																}

																//									} else {
																//										Toast({
																//											message: '请填写创作说明',
																//											position: 'middle',
																//											duration: 2000
																//										});
																//									}

															} else {
																Toast({
																	message: '请填写作品版权信息',
																	position: 'middle',
																	duration: 2000
																});
															}
														}
													}
												} else {
													
													
													/**判断是仅展示还是可出售*/
														if(this.$store.state.Data_set.artExpandOne == "可出售") {
															if(this.$store.state.Data_set.money == null || this.$store.state.Data_set.money == "") {
																Toast({
																	message: '请填写出售金额',
																	position: 'middle',
																	duration: 2000
																});
															} else {

																if(this.$store.state.Data_set.Copyright_of_works != null && this.$store.state.Data_set.Copyright_of_works != "") {

																	//									if(this.$store.state.Data_set.Description_of_creation != null && this.$store.state.Data_set.Description_of_creation != "") {
																	this.$store.state.img_box_to.push(this.$store.state.img_box)
																	if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																		var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																		var sign = md5(url + id + token + ts)
																		Toast({
																			message: '作品修改中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false

																		//console.log(this.$store.state.work_artid,'作品id')
																		this.$http({
																			url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				artId: this.$store.state.work_artid, //作品id
																				artType: {
																					artClassification: this.$store.state.Data_set.artClassification,
																					classificationName: this.$store.state.Data_set.Type_work,
																					printPic: this.$store.state.Data_set.Version_number
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																				artDecription: { //其他信息
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			},
																			artPrice: {
																				retailPrice: this.$store.state.Data_set.money
																			}

																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				Toast({
																					message: '修改成功',
																					position: 'middle',
																					duration: 2000
																				});
																				//$("#btn").attr("disabled", false);
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../My_work'
																				});
																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片
																			}
																		}).catch(function(err) { //console.log(err)
																			this.fabu = true
																		})

																	} else {

																		Toast({
																			message: '作品发布中,请稍等...',
																			position: 'middle',
																			duration: 2000
																		});
																		this.fabu = false
																		this.$http({
																			url: this.$store.state.request_url + "/api/mapManager/saveGradArt.do?memId=" + id + "&ts=" + ts,
																			headers: {
																				"content-type": "application/json;charset=UTF-8",
																				"sIgn": sign
																			},
																			emulateJSON: false,
																			method: 'post',
																			body: {
																				opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																				picUrl: this.$store.state.img_box_to, //作品图片
																				artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																				artType: { //作品类型
																					artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																					classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																					printPic: this.$store.state.Data_set.Version_number //版数
																				},
																				artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																				artDecription: {
																					createDecade: this.$store.state.Data_set.nian_dai + "",
																					material: this.$store.state.Data_set.cai_zhi,
																					createTheme: this.$store.state.Data_set.ti_cai,
																					artLength: this.$store.state.Data_set.chang,
																					artWidth: this.$store.state.Data_set.kuan,
																					artHeight: this.$store.state.Data_set.gao
																				},
																				artRemark: this.$store.state.Data_set.Description_of_creation,
																					artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																				artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			},
																			artPrice: {
																				retailPrice: this.$store.state.Data_set.money
																			}
																			}
																		}).then(function(response) {
																			//console.log(response)
																			if(response.body.meta.res == '00000') {
																				//this.open3()
																				Toast({
																					message: '发布成功',
																					position: 'middle',
																					duration: 2000
																				});
																				this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																				this.$router.push({
																					path: '../slider'
																				});

																				this.$store.state.img_box_to = []
																				this.$store.state.Data_set = {}
																				this.$store.state.img_box.picUrl = '' //图片

																			}
																		}).catch(function(err) {
																			//console.log(err)
																			this.fabu = true
																		})
																	}

																	//									} else {
																	//										Toast({
																	//											message: '请填写创作说明',
																	//											position: 'middle',
																	//											duration: 2000
																	//										});
																	//									}

																} else {
																	Toast({
																		message: '请填写作品版权信息',
																		position: 'middle',
																		duration: 2000
																	});
																}

															}
														} else {

															if(this.$store.state.Data_set.Copyright_of_works != null && this.$store.state.Data_set.Copyright_of_works != "") {

																//									if(this.$store.state.Data_set.Description_of_creation != null && this.$store.state.Data_set.Description_of_creation != "") {
																this.$store.state.img_box_to.push(this.$store.state.img_box)
																if(this.$store.state.bian_ji_show == 2) { //执行编辑功能
																	var url = this.$store.state.request_url + "/api/map/art/updateGraduationArt.do";
																	var sign = md5(url + id + token + ts)
																	Toast({
																		message: '作品修改中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false

																	//console.log(this.$store.state.work_artid,'作品id')
																	this.$http({
																		url: this.$store.state.request_url + "/api/map/art/updateGraduationArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			artId: this.$store.state.work_artid, //作品id
																			artType: {
																				artClassification: this.$store.state.Data_set.artClassification,
																				classificationName: this.$store.state.Data_set.Type_work,
																				printPic: this.$store.state.Data_set.Version_number
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权
																			artDecription: { //其他信息
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																				artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			}

																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			Toast({
																				message: '修改成功',
																				position: 'middle',
																				duration: 2000
																			});
																			//$("#btn").attr("disabled", false);
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../My_work'
																			});
																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片
																		}
																	}).catch(function(err) { //console.log(err)
																		this.fabu = true
																	})

																} else {

																	Toast({
																		message: '作品发布中,请稍等...',
																		position: 'middle',
																		duration: 2000
																	});
																	this.fabu = false
																	this.$http({
																		url: this.$store.state.request_url + "/api/mapManager/saveGradArt.do?memId=" + id + "&ts=" + ts,
																		headers: {
																			"content-type": "application/json;charset=UTF-8",
																			"sIgn": sign
																		},
																		emulateJSON: false,
																		method: 'post',
																		body: {
																			opId: this.$store.state.data.memId, //用户登录成功后的信息ID-到时候动态获取
																			picUrl: this.$store.state.img_box_to, //作品图片
																			artTitle: this.$store.state.Data_set.The_name_of_the_work, //作品标题
																			artType: { //作品类型
																				artClassification: this.$store.state.Data_set.type_fenlei, //一级分类 如视觉
																				classificationName: this.$store.state.Data_set.Type_work, //二级分类 如油画
																				printPic: this.$store.state.Data_set.Version_number //版数
																			},
																			artCopyright: this.$store.state.Data_set.Copyright_of_works + ',' + this.$store.state.Data_set.original_author, //版权信息
																			artDecription: {
																				createDecade: this.$store.state.Data_set.nian_dai + "",
																				material: this.$store.state.Data_set.cai_zhi,
																				createTheme: this.$store.state.Data_set.ti_cai,
																				artLength: this.$store.state.Data_set.chang,
																				artWidth: this.$store.state.Data_set.kuan,
																				artHeight: this.$store.state.Data_set.gao
																			},
																			artRemark: this.$store.state.Data_set.Description_of_creation,
																						artFlag:'5',
																	graduatedYear:this.$store.state.nian_ss,
																	schoolName:this.$store.state.yuan_xiao,
																	profession:this.$store.state.z_y,
																	education:this.$store.state.detailed_information.education,
																			artExpandOne: {
																				sellFlag: this.$store.state.Data_set.artExpandOne
																			}
																		}
																	}).then(function(response) {
																		//console.log(response)
																		if(response.body.meta.res == '00000') {
																			//this.open3()
																			Toast({
																				message: '发布成功',
																				position: 'middle',
																				duration: 2000
																			});
																			this.$store.state.bian_ji_show = 1 //控制编辑功能还原
																			this.$router.push({
																				path: '../slider'
																			});

																			this.$store.state.img_box_to = []
																			this.$store.state.Data_set = {}
																			this.$store.state.img_box.picUrl = '' //图片

																		}
																	}).catch(function(err) {
																		//console.log(err)
																		this.fabu = true
																	})
																}

																//									} else {
																//										Toast({
																//											message: '请填写创作说明',
																//											position: 'middle',
																//											duration: 2000
																//										});
																//									}

															} else {
																Toast({
																	message: '请填写作品版权信息',
																	position: 'middle',
																	duration: 2000
																});
															}
														}
													}
												
											}
//										} else {
//											Toast({
//												message: '请填写作品的宽度',
//												position: 'middle',
//												duration: 2000
//											});
//										}
//									} else {
//										Toast({
//											message: '请填写作品的长度',
//											position: 'middle',
//											duration: 2000
//										});
//									}

								} else {
									Toast({
										message: '请填写作品名称',
										position: 'middle',
										duration: 2000
									});
								}
//							} else {
//								Toast({
//									message: '请选择年代',
//									position: 'middle',
//									duration: 2000
//								});
//							}
						}

					} else {
						Toast({
							message: '请填写作品类型',
							position: 'middle',
							duration: 2000
						});
					}
				} else {
					Toast({
						message: '必须上传主图',
						position: 'middle',
						duration: 2000
					});
				}
			},
			//图片大小验证  不能超过3M
			verificationPicFile(file) {
				var fileSize = 0;
				var fileMaxSize = 8; //3M  
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
			/*文本框高度自适应*/
			readyNumber() {
				$('textarea').each(function() {
					this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;width:100%;border:none;font-size: 0.3rem;');
				}).on('input', function() {
					this.style.height = 'auto';
					this.style.height = (this.scrollHeight) + 'px';
				})
			},

			input_panduan() {
				//console.log(111111)

			},
			/*处理图片*/
			img_cli() {
				var img = new Image();

				img.src = $("#img")[0].src;

				if(img.width > img.height) {

					$("#img").css("width", "auto");
					$("#img").css("height", "100%");
				} else {
					console.log("高")
					$("#img").css("height", "auto");
					$("#img").css("width", "100%");
				}
			},
			change_text() {

				var that = this
				window.setTimeout(function() {　
					that.pon = true
				}, 100)

			},

			click_text() {
				this.text_show = false
			},

		},

		mounted() {
			this.yansghi()

			setTimeout(() => {
				this.hui_s = true;
			}, 300)

			if(this.$store.state.bian_ji_show == 2) { //动态控制标题框为只读状态
				//console.log(2121212)
				document.getElementById("name").disabled = true;
			} else {
				document.getElementById("name").disabled = false;
			}

			this.change_text()

			var that = this
			$("#name").on("focus", function() {
				that.is_btn = false
				//console.log(that.is_btn,"222222222222")
			}).on("blur", function() {
				that.is_btn = true
				//console.log(that.is_btn,"222222222222")

			})

			$("#texta").on("focus", function() {
				that.is_btn = false
				//console.log(that.is_btn,"222222222222")
			}).on("blur", function() {
				that.is_btn = true
				//console.log(that.is_btn,"222222222222")

			})

			this.biao = this.$store.state.Data_set.Type_work
			this.date_str = this.$store.state.Data_set.nian_dai
			//console.log(this.$store.state.Data_set.original_author,"22222222222")

			if(this.$store.state.Data_set.original_author != null && this.$store.state.Data_set.original_author != "" && this.$store.state.Data_set.original_author != 'undefined') {
				this.btn1();
			} else {
				this.btn2();
			}
			if(this.$store.state.Data_set.money != null && this.$store.state.Data_set.money != "" && this.$store.state.Data_set.money != 'undefined') {
				this.btn3();
			} else {
				this.btn4();
			}

			var type_ma = this.$store.state.type_ma
			if(type_ma == 5 || type_ma == 14 || type_ma == 17 || type_ma == 18 || type_ma == 21 || type_ma == 22) {
				this.acts.noa = false;
				this.acts.noe = true
			} else if(type_ma == 0) {
				this.acts.noa = true;
				this.acts.noe = false
			}

			//this.readyNumber(); //textarea自适应高度

		}
	}
</script>

<style scoped="scoped">
	#box_gift {
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.5);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
	}
	
	#gift {
		width: 50%;
		margin: 21% 23%;
	}
	
	* {
		outline: none;
		margin: 0;
		padding: 0;
	}
	
	.boxs {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		border-bottom: 0.01rem solid #F8F8F8;
	}
	
	.boxs1 {
		width: 100%;
		overflow: hidden;
		border-bottom: 0.01rem solid #F8F8F8;
	}
	
	.btnss {
		width: 1.3rem;
		height: 0.5rem;
		float: right;
		border: none;
		border: 0.02rem solid #D2D2D2;
		border-radius: 0.08rem;
		font-size: 0.3rem;
		margin-top: 0.25rem;
		margin-left: 0.2rem;
		background: white;
		line-height: 0.5rem;
		color: #A9A9A9;
		position: relative;
	}
	
	.btnssto {
		width: 1.3rem;
		height: 0.5rem;
		float: right;
		border: none;
		border-radius: 0.08rem;
		font-size: 0.3rem;
		margin-top: 0.25rem;
		margin-left: 0.2rem;
		color: #FFFFFF;
		line-height: 0.5rem;
		background: #FF9D00;
		position: relative;
	}
	
	.img_xiao {
		width: 0.3rem;
		height: 0.3rem;
		position: absolute;
		bottom: 0;
		right: 0;
		display: block;
	}
	
	.img_lang {
		display: none;
	}
	
	.type {
		display: none;
	}
	
	.types {
		display: block;
	}
	
	.zhu {
		width: 100%;
		height: 2rem;
		float: left;
	}
	
	textarea::-webkit-input-placeholder,
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	
	textarea:-moz-placeholder,
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	
	textarea::-moz-placeholder,
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	
	textarea:-ms-input-placeholder,
	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	
	.chang {
		width: 2.2rem;
		float: right;
		overflow: hidden;
	}
	
	.chang_div {
		height: 1rem;
		line-height: 1rem;
		font-size: 0.3rem;
	}
</style>