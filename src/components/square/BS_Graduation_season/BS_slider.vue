<template>
	<div class="mid-center" style="position: relative;width: 100%;height: 13.3rem;background: white;z-index: 500;">
		<dashang @refreshList="dashangs" v-show='$store.state.dashang'></dashang>
		<div style="width: 100%;position: fixed;top: 0;">
			
		 <div style="width: 100%;height: 1rem;position: fixed;top:0;left: 0;z-index: 300;line-height: 1rem;background: white;">
			<img @click="hui" style="width: 0.3rem;height: 0.3rem;float:left;margin:0.35rem 0.3rem;" src="../../../assets/img/zuo.png" alt="" />
	   		<p @click="to_s" style="font-size: 0.36rem;margin-left: 2.8rem;">毕业展投票</p>
		 </div><div style="height: 0.88rem;"></div>
		  
<!------------------------------------------------------------------------------------------------->			  
		<div class="xuan">
			<div class="xuan_x">
				<span v-if="nian_fen==''||nian_fen==null" @click="nians">
					<p style="font-size:0.3rem;float:left;margin-left:0.5rem;">全部年份</p>
					 <img id="s1" style="width:0.2rem;float:left;margin:0.35rem 0 0 0.15rem;transition:0.5s;" src="../../../assets/img/zl/bottom_la.png"/>
				</span>
				<span v-else @click="nians">
					<p style="font-size:0.3rem;float:left;margin-left:0.9rem;">{{nian_fen}}年</p>
					 <!--<img style="width:0.2rem;float:left;margin:0.35rem 0 0 0.15rem;" src="../../../assets/img/zl/bottom_la.png"/>-->
				</span>
				<div class="nian" :class="{nian_s2:acts.noe1}" >
					<div v-show="acts.noe1" v-for="(i,index) in nian" @click="nian_c(i,index)" class="btns">{{i}}</div>
				</div>
			</div>
<!------------------------------------------------------------------------------------------------->		
			<div class="xians"></div>
			<div style="" class="xuan_x">
				<span v-if="yuan_xiao==''||yuan_xiao==null" @click="yuans">
					<p style="font-size:0.3rem;float:left;margin-left:0.5rem;">全部院校</p>
					 <img  id="s2" style="width:0.2rem;float:left;margin:0.35rem 0 0 0.15rem;transition:0.5s;" src="../../../assets/img/zl/bottom_la.png"/>
				</span>
				<span v-else @click="yuans">
					<p style="font-size:0.3rem;">{{yuan_xiao}}</p>
				</span>
				<div class="nian" :class="{nian_s2:acts.noe2}" >
					<div v-show="acts.noe2" v-for="(i,index) in yuan" @click="yuan_c(i,index)" class="btns">{{i.dictName}}</div>
				</div>
			</div>
<!------------------------------------------------------------------------------------------------->				
			<div class="xians"></div>
			<div style="" class="xuan_x">
				<span v-if="lei_xing==''||lei_xing==null" @click="lei_s">
					<p style="font-size:0.3rem;float:left;margin-left:0.6rem;">全部类型</p>
					 <img  id="s3" style="width:0.2rem;float:left;margin:0.35rem 0 0 0.15rem;transition:0.5s;" src="../../../assets/img/zl/bottom_la.png"/>
				</span>
				
				<span v-else @click="lei_s">
					<p style="font-size:0.3rem;">{{lei_xing}}</p>
				</span>
				<div class="nian" :class="{nian_s2:acts.noe3}" >
					<div v-show="acts.noe3" v-for="(i,index) in lei" @click="lei_c(i,index)" class="btns">{{i.dictName}}</div>
				</div>
			</div>
<!------------------------------------------------------------------------------------------------->				
		</div>
			<div class="stack-wrapper">
	<!--
     	作者：2443611475@qq.com
     	时间：2018-03-30
     	描述：:pages="someList"
     -->
     
				<stack ref="stack" :stackinit="stackinit"></stack>
			</div>
		</div>
	</div>
</template>
<script>
	import stack from './BS_stack.vue'
	import dashang from '../../home/dashang.vue'
	import store from '../../../vuex/store.js'
	import axios from 'axios'
	import md5 from 'js-md5';
    import router from '../../../router/index.js'
	export default {
		axios,
		store,
		router,
		data() {
			return {
				nian:['全部','2013','2014','2015','2016','2017','2018'],
				
				yuan:[],
				
				yuan_a:false,
				
				yuan_xiao:'',
				
				lei:[],
				
				lei_xing:'',
				
				acts:{noa1:true,noe1:false,noa2:true,noe2:false,noa3:true,noe3:false},
				
				someList:[],
				
				stackinit:{
					
					visible:3
					
				},
				
				das: {
					
					da: false
					
				},
				
				dal: false,

				url_s:'',

				url_ss:'',
				
				nian_a:false,
				
                nian_fen:'',
                
                trun_s :0,
                
                trun_s2:0,
                
                trun_s3:0,
                
			}
		},

		components: {
			stack,
			dashang,
		},
		mounted() {
           this.huoqu_yuan_xiao()
           this.zuo_pins()
           this.zuo_pins1()
           this.zuo_pins2()
           
          console.log(localStorage.nian_fen,localStorage.yuan_xiao,localStorage.lei_xing) 
           
          this.nian_fen = (localStorage.nian_fen=='null'||localStorage.nian_fen==null)?'':localStorage.nian_fen
          this.yuan_xiao = localStorage.yuan_xiao=='null'||localStorage.yuan_xiao==null?'':localStorage.yuan_xiao
          this.lei_xing = localStorage.lei_xing=='null'||localStorage.lei_xing==null?'':localStorage.lei_xing
          
		},
		methods: {
			zuo_pins(){ //获取作品分类数据
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
					body:{
					   parentId:'73c8a311e3684687b2092c9407f3ed16'	
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
                        for(var i=0;i<response.body.data.length;i++){
                        	this.lei.push(response.body.data[i])
                        }
                      
//                      this.zuo_pin.unshift({dictName:'全部',dicUrl:''})
                        
//                      this.zuo_pinss = localStorage.lei_sss.split(",") 
                        
//                      for(var j=0;j<this.zuo_pinss.length;j++){
//                      	for(var k=0;k<this.zuo_pin.length;k++){
//                      		if(this.zuo_pin[k].dictName==this.zuo_pinss[j]){
//                      			this.zuo_pin[k].dicUrl='true'
//                      		}
//                      	}
//                      }
//                        
					} 
				}).catch(function(err) {
					console.log(err)
				})
			},
			zuo_pins1(){ //获取作品分类数据
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
					body:{
					   parentId:'b0cbeb8c73c84307ad480355d5f0e11f'	
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
                       for(var i=0;i<response.body.data.length;i++){
                        	this.lei.push(response.body.data[i])
                        }
                        
//                       this.zuo_pinss = localStorage.lei_sss.split(",") 
                        
//                      for(var j=0;j<this.zuo_pinss.length;j++){
//                      	for(var k=0;k<this.zuo_pin.length;k++){
//                      		if(this.zuo_pin[k].dictName==this.zuo_pinss[j]){
//                      			this.zuo_pin[k].dicUrl='true'
//                      		}
//                      	}
//                      }
                        
					} 
				}).catch(function(err) {
					console.log(err)
				})
			},
			zuo_pins2(){ //获取作品分类数据
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
					body:{
					   parentId:'2842436033344a88aa67d93004e3e89c'	
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
                        for(var i=0;i<response.body.data.length;i++){
                        	this.lei.push(response.body.data[i])
                        }
                           this.lei.unshift({dictName:'全部'})
//                      console.log(this.zuo_pin)
                        
//                     this.zuo_pinss = localStorage.lei_sss.split(",") 
                        
//                      for(var j=0;j<this.zuo_pinss.length;j++){
//                      	for(var k=0;k<this.zuo_pin.length;k++){
//                      		if(this.zuo_pin[k].dictName==this.zuo_pinss[j]){
//                      			this.zuo_pin[k].dicUrl='true'
//                      		}
//                      	}
//                      }
                        
					} 
				}).catch(function(err) {
					console.log(err)
				})
			},
			
			
			huoqu_yuan_xiao(){
				//先请求子组件的数据,页面刷新---》获取礼物列表数据
				var url = this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						parentId:'b447420f7b344f299329cc0f40bfef4a'
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						this.yuan = response.body.data
					}
					    this.yuan.unshift({dictName:'全部'})
				})
			},
			
			xuan1(){//年份三角形图标旋转事件
				var current = 0;
				if(this.trun_s==0){
					this.trun_s=-180
				}else{
					this.trun_s=0
				}
				var imgObj= document.getElementById('s1');
			  if(imgObj){
			  	current = (current+this.trun_s)%360;
                imgObj.style.transform = 'rotate('+current+'deg)';
			  }
			},
			xuan2(){//院校三角形图标旋转事件
				var current = 0;
				if(this.trun_s2==0){
					this.trun_s2=-180
				}else{
					this.trun_s2=0
				}
				var imgObj= document.getElementById('s2');
			  if(imgObj){
			  	current = (current+this.trun_s2)%360;
                imgObj.style.transform = 'rotate('+current+'deg)';
			  }
			},
			xuan3(){//类型三角形图标旋转事件
				var current = 0;
				if(this.trun_s3==0){
					this.trun_s3=-180
				}else{
					this.trun_s3=0
				}
				var imgObj= document.getElementById('s3');
			  if(imgObj){
			  	current = (current+this.trun_s3)%360;
                imgObj.style.transform = 'rotate('+current+'deg)';
			  }
			},
			lei_c(i,index){
				this.$store.state.page_ss=1
					
				if(i.dictName=='全部'){
					this.lei_xing =null
					localStorage.lei_xing=null
				}else{
					this.lei_xing=i.dictName;
					localStorage.lei_xing=i.dictName;
				}
			    this.$refs.stack.huoqu(); 
			    this.acts.noe3=false
			},
			lei_s(){
				this.xuan3()
				this.trun_s=-180;
				this.trun_s2=-180;
				this.xuan1()
				this.xuan2()
				 this.acts.noe3=!this.acts.noe3;
                 this.acts.noe1=false;this.acts.noe2=false;
			},
			yuan_c(i,index){
				this.$store.state.page_ss=1
					
				if(i.dictName=='全部'){
					this.yuan_xiao=null
					localStorage.yuan_xiao=null
				}else{
					this.yuan_xiao = i.dictName;
					localStorage.yuan_xiao=i.dictName;
				}
				 this.$refs.stack.huoqu(); 
                  this.acts.noe2=false
			},
			yuans(){
				this.xuan2()
				this.trun_s=-180;
				this.trun_s3=-180;
				this.xuan1()
				this.xuan3()
				 this.acts.noe2=!this.acts.noe2;
                 this.acts.noe1=false;this.acts.noe3=false;
			},
			nian_c(i,index){
				this.$store.state.page_ss=1
				
				 this.acts.noe1=false;
				 if(i=='全部'){
				 	this.nian_fen = null
				 	localStorage.nian_fen = null
				 }else{
				 	this.nian_fen = i
				 	localStorage.nian_fen = i
				 }
				 this.$refs.stack.huoqu(); 
			},
			nians(){
				this.xuan1()
				this.trun_s3=-180;
				this.trun_s2=-180;
				this.xuan3()
				this.xuan2()
                 this.acts.noe1=!this.acts.noe1;
                 this.acts.noe2=false;this.acts.noe3=false;
			},
			
			to_s(){
				 router.replace({
				 	path:'../BS_Claim_s'
				 })
			},
			hui(){
				this.$store.state.tr = 5
				 router.replace({
				 	path:'../square/BS_Graduation_season'
				 })
			},
			queren(){
				this.$router.push({
					path: '../home'
				});
			},
			/*取消更新*/
			cannel() {
				this.setCookie("1", 1)
				this.$store.state.update_version = false;
			},
			dashangs(){
				this.$refs.stack.$emit('test')
			},
        
		},
		

	}
</script>
<style scoped="scoped">
	.btns{
		width: 100%;
		height: 0.7rem;
		line-height: 0.7rem;
		text-align: center;
		font-size: 0.25rem;
	}
	.xians{
		height: 0.28rem;
		border-left: 0.025rem solid #E5E5E5;
		float: left;
		margin-top: 0.3rem;
	}
	.xuan_x{
		width: 2.48rem;
		height: 100%;
		line-height: 0.9rem;
		float: left;
		text-align: center;
		position: relative;
	}
	
	.xuan{
		width: 100%;
		height: 0.9rem;
		border-top: 0.02rem solid #F1F1F1;
		border-bottom: 0.02rem solid #F1F1F1;
		margin-top: 0.15rem;
		position: relative;
		z-index:1200;
		background: white;
	}

	.stack-wrapper {
		position: relative;
		z-index: 1000;
	}
	
	.da {
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
		width:100%;
		height: 2.86rem;
		background: white;
		margin: 0 10%;
		margin-top: 6rem;
		text-align: center;
	}
	.nian{
		width:100%;
		height: 0;
		position: absolute;
		top: 0.9rem;
		transition:0.5s;
	}
	
	.nian_s2{
		width:100%;
		height:3rem;
	    transition: 0.5s; 
		z-index: 1200;
	    background:rgba(255,255,255,0.9);
		overflow:scroll;
	    border-radius:0 0 0.1rem 0.1rem;
	}
</style>