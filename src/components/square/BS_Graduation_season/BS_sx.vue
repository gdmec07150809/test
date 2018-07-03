<template>
	<div id="app">
		<div class="head">
	   		<div style="width: 10%;float: left;">
	   			<img  @click="hui" style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top:0.35rem;"  src="../../../assets/img/zuo.png"/>
	   		</div>
			<div class="title">
			<p>筛选条件</p>
			</div>
			<div style="float: right;">
				<p @click="qing" style="color:#BEBEBE;margin-right: 0.2rem;font-size: 0.27rem;">清空条件</p>
			</div>
		</div><div style="width: 100%;height: 1rem;"></div>
     
     <div style="width: 93%;margin: 0 auto;">
     	<div style="width: 100%;font-size:0.36rem;height:1.18rem;line-height:1.18rem;font-weight:600;">
     		学校院校
     	</div> 
     </div>
       <div style="width: 100%;">
     		<div v-for="(i,index) in xue_act" @click="xue_s(i,index)" :class="{xue_s_to:index==xue_ss,xue_s:index!=xue_ss}">
     			 <img style="width:80%;margin: 9%;" :src="i.dicUrl"/>
     		</div>
     	</div>
     	
     	<div style="width: 93%;margin-left:0.23rem;font-size:0.36rem;height:1rem;line-height:1rem;font-weight:600;float: left;">
     		毕业年份
     	</div> 
        <div>
            <div v-for="(i,index) in div_btl_s" @click="div_c(i,index)" :class="{div_btl:index!=div_ts,div_btls:index==div_ts}">{{i}}</div>
        </div> 
		
		<div style="width: 93%;margin-left:0.23rem;font-size:0.36rem;height:1rem;line-height:1rem;font-weight:600;float: left;">
     		作品分类
     	</div>
		<div>
            <div v-for="(i,index) in zuo_pin" @click="zuo_click(i,index)" :class="{div_btl:i.dicUrl!='true',div_btls:i.dicUrl=='true'}">{{i.dictName}}</div>
        </div> 
		
		<div id="bottom_f">
			<div @click="ques" id="btns">确认筛选</div>
		</div>
		<div style="width: 100%;height: 2rem;float: left;"></div>
		
	</div>
</template>

<script>
	import router from '../../../router/index.js'
	import { Toast } from 'mint-ui';
	
	import md5 from 'js-md5';
	export default{
		router,
		data(){
			return{
				
				xue_ss:'i',
				xue_act:[],
				
				div_btl_s:['全部','2013','2014','2015','2016','2017','2018'],
				div_ts:0,
				
				zuo_pin:[],
				zuo_tabs:0,
				
				xue_xiao:'',
				nian_fen:'',
				zuo_pinss:[]
				
				
				
			}
		},
		
		
		mounted(){
			    localStorage.xuey_sss =  localStorage.xuey_sss==undefined?'': localStorage.xuey_sss
				localStorage.lei_sss = localStorage.lei_sss==undefined?'':localStorage.lei_sss
				localStorage.yer_sss = localStorage.yer_sss==undefined?'':localStorage.yer_sss
			
			
			this.yuan_xiao()
			this.zuo_pins()
			this.zuo_pins1()
			this.zuo_pins2()
			
			
			
			this.nian_fen = localStorage.yer_sss
			for(var i=0;i<this.div_btl_s.length;i++){
				if(this.div_btl_s[i]==this.nian_fen){
					this.div_ts = i
				}
			}
			
			this.qing()
			
		},
		methods:{
			yuan_xiao() { //获取院校数据
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
					   parentId:'b447420f7b344f299329cc0f40bfef4a'	
					},
					emulateJSON: false,
				}).then(function(response) {
					if(response.body.meta.res == "00000") {
						this.xue_act = response.body.data
                        
                 this.xue_xiao =localStorage.xuey_sss==''?[]:localStorage.xuey_sss.split(',')     
                 
			for(var i=0;i<this.xue_act.length;i++){
				if(this.xue_act[i].dictName==this.xue_xiao){
					this.xue_ss = i
				}
			}
                        
                        
					} 
				}).catch(function(err) {
					console.log(err)
				})
			},
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
//						console.log(response.body.data)
//						this.xue_act = response.body.data
                         
                        for(var i=0;i<response.body.data.length;i++){
                        	this.zuo_pin.push(response.body.data[i])
                        }
                      
//                      this.zuo_pin = response.body.data
                        
                         
                        
                        this.zuo_pin.unshift({dictName:'全部',dicUrl:''})
                        
                        this.zuo_pinss = localStorage.lei_sss.split(",") 
                        
                        this.zuo_pinss = this.zuo_pinss[0]==''?[]: this.zuo_pinss
                        
                        for(var j=0;j<this.zuo_pinss.length;j++){
                        	for(var k=0;k<this.zuo_pin.length;k++){
                        		if(this.zuo_pin[k].dictName==this.zuo_pinss[j]){
                        			this.zuo_pin[k].dicUrl='true'
                        		}
                        	}
                        }
                        
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
//						console.log(response.body.data)
//						this.xue_act = response.body.data
                       for(var i=0;i<response.body.data.length;i++){
                        	this.zuo_pin.push(response.body.data[i])
                        }
                        
                        this.zuo_pinss = localStorage.lei_sss.split(",") 
                        
                        this.zuo_pinss = this.zuo_pinss[0]==''?[]: this.zuo_pinss
                        
                        
                        for(var j=0;j<this.zuo_pinss.length;j++){
                        	for(var k=0;k<this.zuo_pin.length;k++){
                        		if(this.zuo_pin[k].dictName==this.zuo_pinss[j]){
                        			this.zuo_pin[k].dicUrl='true'
                        		}
                        	}
                        }
                        
//                      this.zuo_pin.unshift({dictName:'全部'})
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
//						console.log(response.body.data)
//						this.xue_act = response.body.data
                        for(var i=0;i<response.body.data.length;i++){
                        	this.zuo_pin.push(response.body.data[i])
                        }
                        
                        
                        console.log(this.zuo_pin)
                        
                       this.zuo_pinss = localStorage.lei_sss.split(",") 
                        
                       this.zuo_pinss = this.zuo_pinss[0]==''?[]: this.zuo_pinss
                        
                        for(var j=0;j<this.zuo_pinss.length;j++){
                        	for(var k=0;k<this.zuo_pin.length;k++){
                        		if(this.zuo_pin[k].dictName==this.zuo_pinss[j]){
                        			this.zuo_pin[k].dicUrl='true'
                        		}
                        	}
                        }
                        
					} 
				}).catch(function(err) {
					console.log(err)
				})
			},
			
			
			qing(){//清空条件
				this.xue_ss='i';
				this.div_ts=0;
				this.zuo_tabs=0;
				
				
				 for(var i=0;i<this.zuo_pin.length;i++){
			  	  	 this.zuo_pin[i].dicUrl = ''
			  	  }
			  	  this.zuo_pinss=[]
			  	  this.zuo_pin[0].dicUrl = 'true'
			  	  this.zuo_pinss.push('全部') 
				  
				
				this.nian_fen = ''
				this.xue_xiao = []
			},
			
			zuo_click(i,index){//作品分类被点击
			  
			  if(i.dictName == '全部'){
			  	  for(var i=0;i<this.zuo_pin.length;i++){
			  	  	 this.zuo_pin[i].dicUrl = ''
			  	  }
			  	  this.zuo_pinss=[]
			  	  this.zuo_pin[index].dicUrl = 'true'
			  	  this.zuo_pinss.push('全部') 
			  }else{
			  	 
			  	 if(this.zuo_pinss[0]=='全部'){
			  	 	 this.zuo_pinss.splice(this.zuo_pinss.indexOf('全部'),1)  
			  	    for(var i=0;i<this.zuo_pin.length;i++){
			  	  	   this.zuo_pin[i].dicUrl = ''
			  	     }
			  	  }
			  	 
			  	if(this.zuo_pin[index].dicUrl!='true'){
			   	   if(this.zuo_pinss.length<3){
			   	   	 
               	      this.zuo_pin[index].dicUrl = 'true'
				      this.zuo_pinss.push(this.zuo_pin[index].dictName) 
                   }else{
               	       Toast({
							message: '最多选择三个',
							position: 'middle',
							duration: 2000
						});
                  }
			   	
			   }else{
			   	  this.zuo_pin[index].dicUrl = 'i'
                  this.zuo_pinss.splice(this.zuo_pinss.indexOf(i.dictName),1)
			   }
			   
			   
			  }
			  
			  console.log( this.zuo_pinss)	
			},
			
			
			
			
			
			div_c(i,index){//毕业年份被点击
				this.div_ts=index
				this.nian_fen = i
			},
			
			hui(){//返回被点击
//				localStorage.xuey_sss = this.xue_xiao
//				localStorage.lei_sss = this.zuo_pin
//				localStorage.yer_sss = this.nian_fen
//				
				this.$store.state.tr = 5
				 router.replace({
				 	path:'../square/BS_Graduation_season'
				 })
			},
			ques(){
				localStorage.xuey_sss = this.xue_xiao
				localStorage.lei_sss = this.zuo_pinss.join()
				localStorage.yer_sss = this.nian_fen
				
				this.$store.state.tr = 5
				 router.replace({
				 	path:'../square/BS_Graduation_season'
				 })
			},
			xue_s(i,index){//点击院校
				this.xue_ss = index
				this.xue_xiao = i.dictName
//				localStorage.xuey_sss = i.dictName
				
			},
			
			
		},
	}
</script>

<style scoped="scoped">
	#btns{
		width:6.4rem;
        height:0.9rem;
        background:rgba(46,49,53,1);
        font-size:0.38rem;
font-family:SimHei;
color:rgba(255,255,255,1);
       line-height: 0.9rem;
       text-align: center;
       margin: 3.5% auto;
       border-radius: 0.1rem;
	}
	#bottom_f{
		width:7.5rem;
        height:1.4rem;
        background:rgba(255,255,255,1);
        /*box-shadow:5rem 0rem 16rem rgba(68,68,68,0.14);*/
        position:fixed;
        bottom: 0;
        /*background: red;*/
       -moz-box-shadow:0em -1em 2em #A6A7A8; -webkit-box-shadow:0em -1em 2em #A6A7A8; box-shadow:0em -0.05em 1em #A6A7A8;
	}
	
	.div_btl{
	   width:1.57rem;
       height:0.64rem;
       border: 0.01rem solid #BEBEBE;
       float: left;
       margin-left: 0.25rem;
       margin-bottom:0.2rem;
       font-size: 0.28rem;
       line-height: 0.64rem;
       text-align: center;
       border-radius: 0.07rem;
	}
	.div_btls{
	   width:1.57rem;
       height:0.64rem;
       border: 0.01rem solid #BEBEBE;
       float: left;
       margin-left: 0.25rem;
       margin-bottom:0.2rem;
       font-size: 0.28rem;
       line-height: 0.64rem;
       text-align: center;
       border-radius: 0.07rem;
       background: #FF9D00;
       color: rgba(255,255,255,1);
	}
	.xue_s{
		width:2.2rem;
        height:2.2rem;
        /*border: 0.01rem solid red);*/
        float: left;
        margin-left:0.23rem;
        /*background:yellow;*/
        border: 0.01rem solid #BEBEBE;
        margin-bottom: 0.2rem;
	}
	.xue_s_to{
		width:2.2rem;
        height:2.2rem;
        float: left;
        margin-left:0.23rem;
        border: 0.01rem solid rgb(255, 157, 0);
        margin-bottom: 0.2rem;
	}
	
	#app{
		width: 100%;
		/*height: 13.3rem;*/
		position: relative;
		z-index:300;
		background: white;
		/*padding-bottom: 4rem;*/
	}
	.head {
		width: 100%;
		height: 1rem;
		position: fixed;
		top: 0;
		background: white;
		box-sizing: border-box;
		/*padding-top: 0.3rem;*/
		border-bottom: 1px solid #f1f1f1;
		z-index: 9999;
		line-height: 1rem;
	}
	
	.title {
		height: 100%;
		float: left;
		font-size: 0.38rem;
		margin-left:2.2rem;
		/*text-align: center;*/
	}
</style>