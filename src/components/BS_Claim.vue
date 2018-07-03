<template>
	<div style="width: 100%;background:white;position: relative;z-index:500;overflow: hidden;">
		
		<div style="width: 100%;height: 1rem;position:fixed;top:0;left: 0;z-index: 9992;text-align:center;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<span  @click="hui" style="font-size:0.4rem;color: #2E3135;position: absolute;left:0.3rem;top: 0.07rem;">
			<img style="width: 0.3rem;margin-right: 0.1rem;" src="../assets/img/zuo.png" alt="" /></span>
			
	   		<p style="font-size: 0.38rem;line-height: 1rem;float:left;margin-left: 2.9rem;">申请认领</p>
	   		
	   		<p  style="font-size:0.32rem;float:right;margin-right: 0.3rem;line-height: 1rem;color:rgb(255, 157, 0);">提交</p>
		
	   </div><div style="height:1rem;float: right;width:100%;"></div>
	   
		<div style="width: 95%;float: right;">
			<div class="lian">
				<p class="lian_p">联系方式</p>
				<input type="text" v-model="text_p" id="lian_put" placeholder="请输入手机号码" />
			</div>
			
			<textarea v-show="pon" v-model="text_ss"  id="texta"  placeholder="请填写文字说明（必填）..." maxlength="512"></textarea>
			
		</div>
		
		<div style="">
			<div style="margin-top:0.3rem;overflow: hidden;width:28.5%;margin-left: 3%;position: relative;" class="zhu" v-for="(i,index) in $store.state.img_xianqing">
				<img v-if="i.picUrl" src="static/img/xin/icon_announce_delete.png"style="position: absolute;top: 0;right: 0;width: 0.5rem;height: 0.5rem;z-index: 300;" @click="delete_pic(index)" />
				<img id="img" @load="img_cli" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);height:100%;max-width:auto;"  :src="i.picUrl" />
			</div>
			<!--<div style="float:left;margin-top: 0.2rem;">
				<img class="zhu" src="../../assets/img/drawablefffff/icon_announce_lifeImg.png" />
				<input style="opacity:0;margin-left: -2.5rem;" class="zhu" ref="ss" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadpic_tos" />
			</div>-->
			<div style="float:left;margin-top: 0.3rem;width:28.5%;height: 30%;position: relative;" v-if="$store.state.img_xianqing.length<9">
				<!--<img v-if="$store.state.img_box.picUrl" src="static/img/xin/icon_announce_delete.png"style="position: absolute;top: 0;right: 0;width: 0.5rem;height: 0.5rem;" />-->
				
				<div style="overflow: hidden;" class="zhu">
				    <img style="height:100%;" src="static/img/xin/icon_announce_addImage.png" />
				</div>
				<input id="xgtx" style="opacity:0;position: absolute;margin-left: -100%;" class="zhu" ref="ss" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadpic_tos" />
			</div>
		 </div>	
		
		
		
		
		
	</div>
</template>

<script>
	import md5 from 'js-md5';
    import router from '../router/index.js'
	export default {
		router,
		data(){
			return{
			  pon:false,
			  text_ss:'',
			  text_p:'',
			}
		},
		methods:{
			hui(){
				this.text_ss='';
				this.text_p='';
				this.$store.state.img_xianqing = []//单机返回清空图片缓存
				
				this.$store.state.is_bottom=true;//底部栏显隐   
				router.replace({
				 	path:'../BS_stack'
				 })
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
  uploadpic_tos(e) { //上传图事件
	         if(this.$store.state.shendu.img_boxs.length<9){
             	   var url=this.$store.state.request_url+"/api/mapManager/uploadPic.do";
		           var id=this.$store.state.data.memId;
		           var token=this.$store.state.data.tokEn;
		           var ts=new Date().getTime();
		           var sign=md5(url+id+token+ts)
             		
				var aa = document.getElementById("xgtx").files[0];
				if(aa != null && aa != "") {
					if(this.verificationPicFile(aa)) {
					var form = new FormData();
					form.append("picName", aa);
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
							that.$store.state.img_xianqing.push(abc.data)
                             if(that.$store.state.img_xianqing.length!=0){
                           	      that.supplementary_pic="supplementary_pic"
                             }
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
		  /*删除图片*/
			delete_pic(i){
				this.$store.state.img_xianqing.splice(i, 1);
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
					var size = fileSize / (1024 * 1024);
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
		   
		   
		},
		mounted(){
			    var that = this
				window.setTimeout(function(){
　                                  that.pon = true
                 },100);
                 
              this.$store.state.is_bottom=false;//底部栏显隐   
                 
		},
	}
</script>

<style scoped="scoped">
	.lian{
		width: 100%;
		height: 1rem;
		border-bottom: 0.02rem solid #F8F8F8;
		line-height: 1rem;
		
	}
	.lian_p{
		font-size: 0.28rem;
		float: left;
	}
	#lian_put{
		width: 4.5rem;
		height: 100%;
		border: none;
		font-size: 0.28rem;
		margin-left: 0.7rem;
		outline:none;
	}
	#texta{
		width: 100%;
		font-size: 0.28rem;
		margin-top: 0.26rem;
		border: none;
		overflow-y: auto;
		height: 2rem;
		outline:none;
	}
	.zhu {
		width: 100%;
		height: 2rem;
		float: left;
		margin-left:0.3rem;
	}
</style>