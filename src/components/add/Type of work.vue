<template>
	<div style="width: 100%;height: 100%;position:relative;z-index:9992;background:white;top: 0.2rem;" id="">
		<div style="    width: 95%;height: 100%;position: fixed;margin-top: 0.2rem;margin-left: 5%;">
		<span @click="hui" style="font-size: 0.4rem;">
			<img style="width: 0.3rem;margin-right: 0.1rem;" src="../../assets/img/zuo.png" alt="" />返回</span>
			
			<div style="width: 100%;height: 1rem;margin-top: 0.3rem;">
				<div @click="ja1" style="margin: 0;" :class="{h_box:act.noa1,h_box_to:act.noe1}">造型
					<div :class="{move:act.noa1,defultTo:act.noe1}"></div>
				</div>
				<div @click="ja2" :class="{h_box:act.noa2,h_box_to:act.noe2}">文学
				<div :class="{move:act.noa2,defultTo:act.noe2}"></div></div>
				<div @click="ja3" :class="{h_box:act.noa3,h_box_to:act.noe3}">设计
				<div :class="{move:act.noa3,defultTo:act.noe3}"></div></div>
			</div>
		     
		    <div :class="{boss:act.noa1,boss_to:act.noe1}">
		    	
		    	<div v-for="(i,index) in shi" class="boss_child" :class="{boss_child_to:opg == index}" @click="shis(index)" >{{i}}
		    	   <!--<img class="imgs" :class="{imgs_to:opg == index}" style="width: 0.3rem;height: 0.3rem;position: absolute;bottom: 0;right: 0;" src="../../assets/img/xia1.png" alt="" />-->
		    	</div>
		    	
		    </div>
		            
		     <div :class="{boss:act.noa2,boss_to:act.noe2}">
		    	
		    	<div v-for="(i,index) in wen" class="boss_child" :class="{boss_child_to:opg == index}" @click="wens(index)" >{{i}}
		    	   <!--<img class="imgs" :class="{imgs_to:opg == index}" style="width: 0.3rem;height: 0.3rem;position: absolute;bottom: 0;right: 0;" src="../../assets/img/xia1.png" alt="" />-->
		    	</div>
		    	
		    </div>
		     
		     <div :class="{boss:act.noa3,boss_to:act.noe3}">
		    	
		    	<div v-for="(i,index) in she" class="boss_child" :class="{boss_child_to:opg == index}" @click="shes(index)" >{{i}}
		    	   <!--<img class="imgs" :class="{imgs_to:opg == index}" style="width: 0.3rem;height: 0.3rem;position: absolute;bottom: 0;right: 0;" src="../../assets/img/xia1.png" alt="" />-->
		    	</div>
		    	
		    </div>
		   
		    
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default{
		store,
		data(){
			return{
				act:{noa1:true,noe1:false,noa2:true,noe2:false,noa3:true,noe3:false,},
				shi:[],
				wen:[],
				she:[],
				opg:0,
				
			}
		},
		methods:{
			hui(){
				if(this.$store.state.lei_xing_s == 1){
					 this.$router.push({
								path: '../BS_add'
							});
				}else{
					 this.$router.push({
								path: '../add'
							});
				}
				  
				
			},
			
			ja1(){
			   this.act.noa1=false;this.act.noe1=true; 
			   this.act.noa2=true;this.act.noe2=false; 
			   this.act.noa3=true;this.act.noe3=false; 
			   this.$store.state.Data_set.Type_work = this.shi[this.opg]
			   this.$store.state.type_ma = 0
			   //console.log(this.$store.state.Data_set.Type_work)
			   
			   this.$store.state.Data_set.type_fenlei = '';
			   this.$store.state.Data_set.type_fenlei = '造型'
			   this.getZhuanye('1');
			},
		   ja2(){
		   	   this.act.noa1=true;this.act.noe1=false; 
			   this.act.noa2=false;this.act.noe2=true; 
			   this.act.noa3=true;this.act.noe3=false; 
			    this.$store.state.Data_set.Type_work = this.wen[this.opg]
			    this.$store.state.type_ma = 0
			    //console.log(this.$store.state.Data_set.Type_work)
			    
			    this.$store.state.Data_set.type_fenlei = '';
			   this.$store.state.Data_set.type_fenlei = '文学'
			   this.getZhuanye('2');
		   },
			ja3(){
				this.act.noa1=true;this.act.noe1=false;
			   this.act.noa2=true;this.act.noe2=false;
			   this.act.noa3=false;this.act.noe3=true;
			    this.$store.state.Data_set.Type_work = this.she[this.opg]
			    this.$store.state.type_ma = 0
			    //console.log(this.$store.state.Data_set.Type_work)
			    
			    this.$store.state.Data_set.type_fenlei = '';
			   this.$store.state.Data_set.type_fenlei = '设计'
			   this.getZhuanye('3');
			    
			},
			wens(index){
				this.opg = index
				this.$store.state.Data_set.Type_work = this.wen[this.opg]//将选中的选项显示出来
				//console.log(this.$store.state.Data_set.Type_work)
				if(this.$store.state.lei_xing_s == 1){
					 this.$router.push({
								path: '../BS_add'
							});
				}else{
					 this.$router.push({
								path: '../add'
							});
				}
			},
			shis(index){
				this.opg = index
				  if(this.opg==5){
				  	this.$store.state.type_ma = 5
				  }else if(this.opg==14){
				  	this.$store.state.type_ma = 14
				  }else if(this.opg==17){
				  	this.$store.state.type_ma = 17
				  }else if(this.opg==18){
				  	this.$store.state.type_ma = 18
				  }else if(this.opg==21){
				  	this.$store.state.type_ma = 21
				  }else if(this.opg==22){
				  	this.$store.state.type_ma = 22
				  }else{
				  	this.$store.state.type_ma = 0
				  }
				 //console.log(this.$store.state.type_ma)
				 this.$store.state.Data_set.Type_work = this.shi[this.opg]//将选中的选项显示出来
				 //console.log(this.$store.state.Data_set.Type_work)
				 if(this.$store.state.lei_xing_s == 1){
					 this.$router.push({
								path: '../BS_add'
							});
				}else{
					 this.$router.push({
								path: '../add'
							});
				}
			},
			shes(index){
				this.opg = index
				 this.$store.state.Data_set.Type_work = this.she[this.opg]//将选中的选项显示出来
				 //console.log(this.$store.state.Data_set.Type_work)
				 if(this.$store.state.lei_xing_s == 1){
					 this.$router.push({
								path: '../BS_add'
							});
				}else{
					 this.$router.push({
								path: '../add'
							});
				}
			},
			/*获取领域*/
				getZhuanye(e) {
				
					var id=''
					if(e=='1'){
						this.shi=[];
						id='73c8a311e3684687b2092c9407f3ed16';
					}else if(e=='2'){
						this.wen=[];
						id='b0cbeb8c73c84307ad480355d5f0e11f';
					}else if(e=='3'){
						this.she=[];
						id='2842436033344a88aa67d93004e3e89c';
					}
					
				var url = this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do";
				var ids= this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + ids + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do?memId=" + ids + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {

						parentId:id,
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {
						console.log(response.body,"1111111111")
						if(e=='1'){
							for(var i=0;i<response.body.data.length;i++){
								this.shi.push(response.body.data[i].dictName)
							}		
						}else if(e=='2'){
							for(var i=0;i<response.body.data.length;i++){
								this.wen.push(response.body.data[i].dictName)
							}
						}else if(e=='3'){
							for(var i=0;i<response.body.data.length;i++){
								this.she.push(response.body.data[i].dictName)
							}
						}
					}
				}).catch(function(err){
					//console.log(err)
				})
			},
		},
		mounted(){
			this.ja1()
//			this.getZhuanye('1');
			
			
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
	
	
	.h_box{
		width: 1rem;
		height: 0.8rem;
		font-size: 0.36rem;
		text-align: center;
		line-height: 0.8rem;
		float: left;
		margin-left: 0.5rem;
		color: #D0D0D0;
	}
	.h_box_to{
		width: 1rem;
		height: 0.8rem;
		font-size: 0.36rem;
		text-align: center;
		line-height: 0.8rem;
		float: left;
		margin-left: 0.5rem;
		color: black;
		font-weight: bold;
		/*border-bottom: 0.03rem solid black;*/
	}
	.boss{
		width: 100%;
		height: 2rem;
		display: none;
		margin-top: 0.5rem;
	}
	.boss_to{
		width: 100%;
    	height: 10rem;
    	overflow-y: auto;
    	display: block;
    	margin-top: 0.5rem;
	}
	
	
	.boss_child{
		width: 1.5rem;
    float: left;
    text-align: center;
    font-size: 0.28rem;
    height: 0.64rem;
    line-height: 0.64rem;
    margin: 0.2rem 0.25rem 0 0;
    color: #333333;
    border-radius: 0.08rem;
    border: #EAEAEA solid 2px;
	}
	.boss_child_to{
		width: 1.5rem;
    float: left;
    text-align: center;
    font-size: 0.28rem;
    height: 0.64rem;
    margin: 0.2rem 0.25rem 0 0;
    border-radius: 0.08rem;
    line-height: 0.64rem;
    background-color: #FF9d00;
    color: #fff;
    border: #EAEAEA solid 2px;
	}
	.imgs{
		display: none;
	}
	.imgs_to{
		display: block;
	}
	.move {
		width: 70%;
		margin-left: 10%;
		/*margin-top: 0.15rem;*/
		height: 0.05rem;
		border-radius: 0.05rem;
	}
	
	.defultTo {
		width: 60%;
		margin-left: 20%;
		/*margin-top: 0.3rem;*/
		background-color: #ff9d00;
		height: 0.08rem;
		border-radius: 0.05rem;
	}
</style>