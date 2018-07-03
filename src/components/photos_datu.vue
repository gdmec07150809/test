<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-05-11
    	描述：图片详情
    -->
	<div id="app">
		<div class="img_s_box" style="">
			<img class="box_img" src="../assets/img/icon_left_white.png" @click="back" />
		</div>
		<div class="big_img">

			<img id="img_s" @load="tupian_zuijia" :src="$store.state.picurl_ss" />

		</div>

		<!--<div class="footer">-->

		<!--</div>-->
		<!--<a :href="$store.state.picurl_ss" style="color: white;font-size: 0.3rem;">下载图片</a>-->
		<!--<p id="pic1" >点击下载</p>-->
		<!--<div>-->
		<!-- 声明一个按钮  用来触发下载图片到本地-->
		<!--<div style="height: 1rem;width: 0.5rem;background-color: #C0CCDA;" @click="savePicture()" >-->
			<p class="save" @click="savePicture">保存到相册</p>
		<!--</div>-->
		<!--创建一个cavas  用来存放图片-->
		<!--<div style="display: none;">-->
		<!--<canvas  id="cavasimg" width="607" height="367" ></canvas>-->
		<!--</div>-->
		<!--</div>-->

	</div>
</template>

<script>
	import store from '../vuex/store.js'
	import { Toast } from 'mint-ui';
	export default {
		//			el:"#app",
		store,
		data() {
			return {

			}
		},
		methods: {
			/**保存到本地相册*/
			savePicture() {
				//mui.toast(this.$store.state.picurl_ss+"图片路径")
				 plus.nativeUI.showWaiting('加载中...')
				// 创建下载任务
				var picurl = this.$store.state.picurl_ss;
				//图片保存到手机后的路径
				var picname = "_downloads/erwei.png";
				var dtask = plus.downloader.createDownload(picurl, {}, function(d, status) {
					// 下载完成
					if(status == 200) {
						//	alert( "Download success: " + d.filename );
						
//              		var sd_path = plus.io.convertLocalFileSystemURL(picname);
//              		mui.toast(sd_path);
                		
						plus.gallery.save(d.filename, function() { //保存到相册方法
							 plus.nativeUI.closeWaiting()
							mui.toast('已保存到手机相册');
						}, function(e) {
							plus.nativeUI.closeWaiting()
							mui.toast('保存失败，请重试！');
						});
					} else {
						mui.toast('保存失败，请重试！');
					}
				});
				//dtask.addEventListener( "statechanged", onStateChanged, false );
				dtask.start(); //开始下载
			},
			Download() {
				//cavas 保存图片到本地  js 实现
				//------------------------------------------------------------------------
				//1.确定图片的类型  获取到的图片格式 data:image/Png;base64,......
				var type = 'jpg'; //你想要什么图片格式 就选什么吧
				var d = document.getElementById("cavasimg");
				var imgdata = d.toDataURL(type);
				//2.0 将mime-type改为image/octet-stream,强制让浏览器下载
				var fixtype = function(type) {
					type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
					var r = type.match(/png|jpeg|bmp|gif/)[0];
					return 'image/' + r;
				};
				imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
				//3.0 将图片保存到本地
				var savaFile = function(data, filename) {
					var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
					save_link.href = data;
					save_link.download = filename;
					var event = document.createEvent('MouseEvents');
					event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					save_link.dispatchEvent(event);
				};
				var filename = '' + new Date().getSeconds() + '.' + type;
				//我想用当前秒是可以解决重名的问题了 不行你就换成毫秒
				savaFile(imgdata, filename);
			},

			back() {
				this.$router.push({
					path: '../works_detail'
				})
			},
			tupian_zuijia() {
				var img = document.getElementById('img_s')
				var bodys = document.getElementById('app')
				let height_s = (bodys.offsetHeight - img.offsetHeight) / 2
				img.style.marginTop = height_s + 'px'

			},

			downloadIamge(selector, name) {
				var image = new Image()
				// 解决跨域 Canvas 污染问题
				image.setAttribute('crossOrigin', 'anonymous')
				image.onload = function() {
					var canvas = document.createElement('canvas')
					canvas.width = image.width
					canvas.height = image.height

					var context = canvas.getContext('2d')
					context.drawImage(image, 0, 0, image.width, image.height)
					var url = canvas.toDataURL('image/png')

					// 生成一个a元素
					var a = document.createElement('a')
					// 创建一个单击事件
					var event = new MouseEvent('click')

					// 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
					a.download = name || '下载图片名称'
					// 将生成的URL设置为a.href属性
					a.href = url

					// 触发a的单击事件
					a.dispatchEvent(event)
				}
				image.src = document.querySelector(selector).src
			},

		},
		mounted() {
			//				this.tupian_zuijia()
			//              $loading.hide()

			//canvas 绘制图片    支持手机端
			//            var canvas = document.getElementById('cavasimg');
			//            var ctx = canvas.getContext('2d');
			//            ctx.fillRect(0, 0, canvas.width, canvas.height);
			//            ctx.fillStyle = "red";
			//            ctx.font = 'italic bold 30px Helvetica ';
			//            ctx.fillText('楷体', 50, 50); 
			// canvas 插入图片   手机端点击没反应
			//获取canvas元素
//			var cvs = document.getElementById("cavasimg");
//			//创建image对象
//			var imgObj = new Image();
//			imgObj.src = this.$store.state.picurl_ss;
//			imgObj.setAttribute("crossOrigin", 'Anonymous')
//			//待图片加载完后，将其显示在canvas上
//			imgObj.onload = function() {
//				var ctx = cvs.getContext('2d');
//				ctx.drawImage(this, 0, 0); //this即是imgObj,保持图片的原始大小：470*480
//				//ctx.drawImage(this, 0, 0,1024,768);//改变图片的大小到1024*768
//			}

		},

		computed: {

		}

	}
</script>

<style scoped="scoped">
	#pic1 {
		cursor: hand;
		color: white;
		font-size: 0.3rem;
	}
	
	.img_s_box {
		width: 0.6rem;
		height: 0.6rem;
		background: rgba(0, 0, 0, .5);
		position: fixed;
		top: 0.3rem;
		left: 0.3rem;
		padding-left: 0.05rem;
		border-radius: 50%;
	}
	
	#app {
		background-color: #000000;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 300;
		height: 13.3rem;
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
	
	.box_img {
		width: 0.22rem;
		margin: 0.1rem;
	}
	
	.big_img {
		width: 100%;
	}
	
	.big_img img {
		width: 100%;
		max-height: auto;
	}
	.save{
		line-height: 0.6rem;
		text-align: center;
		border-radius:0.05rem;
		left: 0.2rem;
		font-size: 0.3rem;
		padding: 0rem 0.1rem; 
		 color: #fff;
		 background-color: #707070;
		 display: inline-block;
		 position: fixed;
		 bottom: 0.5rem;
	}
</style>