<template>
	<div style="width: 100%;position: relative;z-index:300;background:white;" id="">
		<!--<div style="width: 100%;height: 1rem;background: white;position:fixed;top: 0;left: 0;z-index: 999;border-bottom: 0.005rem solid #F1F1F1;">
	   	<span @click="hui" style="font-size:0.4rem;position: fixed;top: -0.1rem;left: 0.3rem;">
			<img style="width:0.3rem;margin-right: 0.1rem;margin-top: 0.4rem;" src="../../assets/img/zuo.png" alt="" />返回</span>
	   </div>
	   <div style="width: 100%;height:1rem;"></div>-->
	   <div style="width: 100%;height: 1rem;position:fixed;top:0;left: 0;z-index: 9992;text-align:center;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<span  @click="hui" style="font-size:0.4rem;color: #2E3135;position: absolute;left:0.3rem;top: 0.07rem;">
			<img style="width: 0.3rem;margin-right: 0.1rem;" src="../../assets/img/zuo.png" alt="" /></span>
			
	   		<p style="font-size: 0.38rem;line-height: 1rem;float:left;margin-left: 2.9rem;">发布深度</p>
	   		
	   		<p  @click="Publish_articles" style="font-size:0.32rem;float:right;margin-right: 0.3rem;line-height: 1rem;color:rgb(255, 157, 0);;">发布</p>
		
	    </div><div style="height:0.9rem"></div>
	   
	   
	   
		<div style="width: 90%;position: relative;margin: 0 auto;margin-top: 0.3rem;">
	   
		
			<!--深度文章 -->
		    
		     <!--标题 -->
		     <!--<h6 style="font-size: 0.5rem;margin-top: 0.3rem;">
		     	深度文章</h6>-->
		     <!--<p style="font-size: 0.3rem;color: #D0D0D0;margin-top: 0.1rem;">
		     	上传作品并填写资料</p>-->
		     <!--
             	作者：2443611475@qq.com
             	时间：2018-03-29
             	描述：上传图片
            -->
            <div style="margin-top: 0.3rem;overflow: hidden;width: 30%;margin-right: 3%;position: relative;" class="zhu" v-for="(i,index) in $store.state.shendu.img_boxs">
				<img v-if="i.picUrl" src="static/img/xin/icon_announce_delete.png" style="position: absolute;top: 0;right: 0;width: 0.5rem;height: 0.5rem;z-index: 300;" @click="delete_pic(index)" />
				<img id="img" @load="img_cli" style="height:100%;max-width:auto;position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" :src="i.picUrl" />
			</div>
		     <!--<img v-for="(i,index) in $store.state.shendu.img_boxs" style="margin-right: 0.2rem;margin-top: 0.2rem;" class="zhu" :src="i.picUrl"/>-->
			<!--<div style="float:left;margin-top: 0.2rem;">
               <img  class="zhu" src="../../assets/img/drawablefffff/icon_announce_lifeImg.png"/>
                <input style="opacity:0;margin-left: -2.5rem;" class="zhu" ref="ss"  name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadpic_tos"/>
             </div>-->
		     <div style="float:left;margin-top: 0.3rem;width: 30%;height: 30%;position: relative;" v-if="$store.state.shendu.img_boxs.length==1?false:true">
				<!--<img v-if="$store.state.img_box.picUrl" src="static/img/xin/icon_announce_delete.png"style="position: absolute;top: 0;right: 0;width: 0.5rem;height: 0.5rem;" />-->

				<div style="overflow: hidden;" class="zhu">
					<img style="height:100%;max-width:auto;" src="static/img/xin/icon_announce_addImage.png" />
				</div>
				<input id="xgtx" style="opacity:0;position: absolute;margin-left: -100%;" class="zhu" ref="ss" name="file" type="file" accept="image/png,image/jpeg" @change="uploadpic_tos" />
			</div>

		        
		      <div @click="Addlabels" style="margin-top: 0.4rem;border-top: 0.01rem solid #F1F1F1;border-bottom: 0.01rem solid #F1F1F1;float: left;" class="boxs">
		      	<!--
                  	作者：2443611475@qq.com
                  	时间：2018-03-24
                  	描述：显示提示语，当用户创建了标签后——》消失-else-》出现/默认出现
                  -->
		     	 <p  :class="{jis:act.noa1,ji:act.noe1}" style="font-size: 0.28rem;float: left;">添加文章标签（最多3个）</p>
		     	<!--
                 	作者：2443611475@qq.com
                 	时间：2018-03-24
                 	描述：显示用户设定的标签容器，当用户没有设定标签时，是消失的/默认消失
                 --> 
		     	 <p v-for="(i,index) in $store.state.shendu.Label" style="font-size: 0.28rem;float: left;"@click.stop="delete_label(index)">{{i}}&nbsp;&nbsp;&nbsp;</p>
		     	 
		     	 
		     	 <i style="font-size: 0.44rem; float: right;margin-top: 0.3rem;" class="fa fa-plus-square"></i>
		     </div>
		     <!--
             	作者：2443611475@qq.com
             	时间：2018-03-24
             	描述：点击 ——》添加标签——》出现的临时输入框
             -->
              <div style="position:relative;height:1rem;float:left;" :class="{ji:act.noa,jis:act.noe}">
		        <input v-model="text_inp" style="width:70%;height:0.7rem;font-size:0.3rem;border:none;position: absolute;top: 0.2rem;"type="text"placeholder="请输入不超过8个字的标签" maxlength="8"/>
		        <button @click="tijiao" style="width: 1rem;height: 0.6rem;font-size:0.3rem;float:left;margin-left:5rem;background:rgba(46,49,53,1);border: none;color:white;border-radius:0.1rem;margin-top: 0.2rem;">确定</button>
		     </div>
		     
		     <div style="margin-top: 0;border-top: 0.01rem solid #F1F1F1;border-bottom: 0.01rem solid #F1F1F1;float: left;" class="boxs">
		     	 <input v-model="$store.state.shendu.Title" style="width: 100%;height: 1rem;font-size: 0.45rem;border:none;float: left;font-weight: 600;" type="text"  placeholder="文章标题" />
		     </div>
		     <textarea v-show="pon" id="myInput" v-model="$store.state.shendu.Text_content" style="width: 100%;height:6.7rem;font-size: 0.3rem;margin-top: 0.4rem;border: none;" placeholder="正文内容" maxlength="512"></textarea>
		</div>
		<!--<div style="width: 100%;height: 1.3rem;box-shadow:0px 0px  15px 0.1px #CACACA;position: fixed;bottom: 0;background: white;" v-show="is_btn">
			<button @click="Publish_articles" style="width:6.4rem;height:0.9rem; background:rgba(46,49,53,1);border-radius: 0.15rem;color: white;position: absolute;left: 0.5rem;top: 0.2rem;font-size: 0.3rem;">
				确认发布
			</button>
			 
		</div>-->
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default{
		store,
		data(){
			return{
			    pon:false,
				act:{noa:true,noe:false,noa1:true,noe1:false,},
				is_btn:true,
				text_inp:'',
				supplementary_pic:'cover_pic'
			}
		},
		mounted(){
			this.yansghi()
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
		
		methods:{
			yansghi(){
			   let du = document.documentElement.clientHeight/document.documentElement.clientWidth;
  	           let myInput = document.getElementById('myInput');
  	            //console.log(du,'屏幕百分比')
  	if(du>=1.7&&du<2.0){
  		myInput.style.height = 7.7-1.14+'rem'
  	}else if(du<=1.7&&du>1.63){
  		myInput.style.height = 6.9-1.14+'rem'
  	}else if(du<=1.6&&du>1.45){
  		myInput.style.height = 6.1-1.14+'rem'
  	}else if(du>=2.0&&du<2.1){
  		myInput.style.height = 9.3-1.14+'rem'
  	}else if(du>2.1){
  		myInput.style.height = 10.5-1.14+'rem'
  	}else if(du<1.4){
  		myInput.style.height = 4.3-1.14+'rem'
  	}else if(du<1.65&&du>1.6){
  		myInput.style.height = 6.3-1.14+'rem'
  	}  	
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
					message: '深度文章发布成功',
					type: 'success',
		//        duration:0,
				});
			},
			hui(){
				this.$store.state.shendu.img_boxs = []
				this.$router.push({
						path: '../add_facth'
						});
				
			},
			Addlabels(){//点击添加标签
				if(this.$store.state.shendu.Label.length==3){
					Toast({
							message: "文章标签只能添加3个",
							position: 'middle',
							duration: 2000
						});
				}else{
					this.act.noa = false;
					this.act.noe = true
				}
			},
				/*删除标签*/
			delete_label(i){
			
				this.$store.state.shendu.Label.splice(i, 1);
				if(this.$store.state.shendu.Label.length==0){
					this.act.noa1 = true;
					this.act.noe1 = false;
				}
			},
			/*删除图片*/
			delete_pic(i){
				this.$store.state.shendu.img_boxs.splice(i, 1);
			},
			tijiao(){
//				//console.log(this.$store.state.wenzhang.Label)
				if(this.$store.state.shendu.Label !==''){
					if(this.$store.state.shendu.Label.length!==3){
					 this.act.noa1 = false;this.act.noe1 = true
					 this.$store.state.shendu.Label.push("#"+this.text_inp+'#')
					 this.text_inp=''
					 this.act.noa = true;this.act.noe =false 
				  }else{
				  	 this.text_inp='文章标签最多3个'
				  }
				}
			},
			uploadpic_tos(e){//上传图片
             	if(this.$store.state.shendu.img_boxs.length<9){
             	   var url=this.$store.state.request_url+"/api/mapManager/uploadPic.do";
		           var id=this.$store.state.data.memId;
		           var token=this.$store.state.data.tokEn;
		           var ts=new Date().getTime();
		           var sign=md5(url+id+token+ts)
             		
             		
//                var self = this
//                let file = e.target.files[0]
//                /* eslint-disable no-undef */
//                let param = new FormData()  // 创建form对象
//                param.append('file', file)  // 通过append向form对象添加数据
//                param.append('plateName', 'depth') // 添加form表单中其他数据
//                 param.append('picType', this.supplementary_pic)
//                //console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
//               
//             if(file){
//               // 添加请求头
////              this.$axios.post('api/mapManager/uploadPic.do', param, config)
////                  .then(response => {
////                    if (response.data.meta.res === '00000'){
////                         this.$store.state.shendu.img_boxs.push(response.data.data)
////                         
////                           if(this.$store.state.shendu.img_boxs.length!=0){
////                         	      this.supplementary_pic="supplementary_pic"
////                           }
////                         
////                         //console.log(this.$store.state.shendu.img_boxs)
////                       }
////                    })
//                     this.$http({
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
//						this.$store.state.shendu.img_boxs.push(response.data.data)
////                         
//                           if(this.$store.state.shendu.img_boxs.length!=0){
//                         	      this.supplementary_pic="supplementary_pic"
//                           }
//                         
//                         //console.log(this.$store.state.shendu.img_boxs)
//						
//					}
//				})
//                     
//            }
				var aa = document.getElementById("xgtx").files[0];
				//console.log(aa);
				if(aa != null && aa != "") {
					if(this.verificationPicFile(aa)) {
					//console.log(aa,"111111111")
					var form = new FormData();
					form.append("picName", aa);
					form.append('plateName', 'depth') // 添加form表单中其他数据
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
							that.$store.state.shendu.img_boxs.push(abc.data)
                         
                             if(that.$store.state.shendu.img_boxs.length!=0){
                           	      that.supplementary_pic="supplementary_pic"
                             }
//							//console.log(abc.data.picUrl)
//							that.$store.state.img_box = abc.data
//							//图片上传成功后 显示到预览 删除input 按钮变为保存修改)
//							that.imageUrl = abc.data.sourcePicUrl; //用来显示
//							that.img = abc.data.sourcePicUrl; //用来传递
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
			Publish_articles(){//发布文章
				var url=this.$store.state.request_url+"/api/mapManager/saveArticle.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				
				if(this.$store.state.shendu.img_boxs.length>0){
				   if(this.$store.state.shendu.Label.length>0){
				   	Toast({
											message: '作品发布中,请稍等...',
											position: 'middle',
											duration: 2000
										});
				this.$http({
             		url:this.$store.state.request_url+"/api/mapManager/saveArticle.do?memId="+id+"&ts="+ts,
             		headers: {"content-type":"application/json;charset=UTF-8",'sIgn': sign},
					emulateJSON: false,
             		method:'post',
             		body:{
             			opId:this.$store.state.data.memId,
             			picUrl:this.$store.state.shendu.img_boxs,
             			artTitle:this.$store.state.shendu.Title,
             			docUrl:this.$store.state.shendu.Text_content,
             			artFlag:'4',
             			tags:this.$store.state.shendu.Label.toString(),
             			visibleRange:'friends'
             		}
             }).then(function(response){
             			//console.log(response)
             	        if(response.body.meta.res == '00000'){
             	        	//console.log(this.$store.state.shendu.img_boxs,'图片路径')
             	        	//console.log(response.body)
                            this.$store.state.shendu.img_boxs=[]
                            this.$store.state.shendu.Title=''
                            this.$store.state.shendu.Text_content=''
                            this.$store.state.shendu.Label=[]
                            this.act.noa1 = true;this.act.noe1 = false
                             this.$router.push({
								path: '../slider'
							});
				            
						  
             	        }
             	}).catch(function(err){
             		    //console.log(err)
              })
             	
             }else{
             	Toast({
						message: '至少需要添加一个标签',
						position: 'middle',
						uration: 2000
				});
             }
             	
             }else{
             	Toast({
						message: '至少需要添加一张图片',
						position: 'middle',
						duration: 2000
				});
             }
			},
			
			
		}
	}
</script>

<style scoped="scoped">
	*{
		outline: none;
		
	}
	.boxs{
		width: 100%;
		height: 1rem;
		margin-top: 1.2rem;
		line-height: 1rem;
	}
	.ji{
		display: none;
	}
	.jis{
		display: block;
	}
	.zhu{
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
</style>