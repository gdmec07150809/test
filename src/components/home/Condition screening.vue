<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-21
    	描述：条件筛选
    -->
	<div style="width: 100%;">
		
		  <div class="head">
		<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../assets/img/zuo.png" @click="hui"/>
		<div class="title">
		<p>条件筛选</p>
		</div>
		</div>
		<div style="width: 100%;height: 0.88rem;"></div>

		<div style="width: 100%;">
			<div style="width:97%;height:1.6rem;line-height:1rem;border-bottom: 0.005rem solid #f1f1f1;position: relative;margin-left: 3%;">
				<p style="font-size:0.34rem;color:black; position: absolute;top: 0.1rem;">当前位置</p>
				<p style="font-size:0.3rem;position: absolute;top: 0.7rem;color: #CACACA;">{{$store.state.dy}}</p>
			<!--	<i style="font-size: 0.5rem;float: right;margin-top: 0.8rem;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
			<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.66rem;margin-right: 0.3rem;"/>
			</div>

           <div class="boxs" style="height: 1.8rem;width:97%;position: relative;margin-left: 3%;">
           	    <div style="width: 100%;height: 0.8rem;line-height: 0.8rem;">
           	   	  <p style="font-size: 0.34rem;float: left;">搜索范围</p>
           	   	  <p style="font-size: 0.3rem;float: right;color: #C5C5C5;margin-right: 0.3rem; ">{{value2}}KM</p>
           	    </div>
           	    
           	  <img class="biao" src="../../assets/img/tioajian/icon_search_rangeStart.png"/>
           	  
			 <div style="float:left;" class="block">
                   <el-slider lable  v-model="value2"></el-slider>
               </div>
               
              <img class="biao" src="../../assets/img/tioajian/icon_search_rangeEnd.png"/>
           </div>

            <div class="boxs" style="width:97%;position: relative;margin-left: 3%;">
           	    <div style="width: 100%;height: 0.8rem;line-height: 0.8rem;float: left;">
           	   	  <p style="font-size: 0.34rem;float: left;">年龄</p>
           	   	  <p style="font-size: 0.3rem;float: right;color: #C5C5C5;margin-right: 0.3rem;">{{value3[0]}}-{{value3[1]}}岁</p>
           	    </div>
           	    
           	  <img class="biao" src="../../assets/img/tioajian/icon_search_ageStart.png"/>
			 <div style="float:left;" class="block">
				<el-slider  v-model="value3" range show-stops :max='80' :min='16'></el-slider>
				
			 </div>
              <img class="biao" src="../../assets/img/tioajian/icon_search_ageEnd.png"/>
              
            </div>

			<div @click="show_sexs"  style="width:97%;margin-left: 3%;height:0.8rem;line-height:0.8rem;position: relative;float: left; ">
				<p style="font-size:0.34rem;color:black;float: left;">性别</p>
				<!--<i style="font-size: 0.5rem;float: right;margin-top: 0.48rem;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
				<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.26rem;margin-right: 0.3rem;"/>
				<p style="font-size: 0.32rem;float: right;color: #C5C5C5;margin-right: 0.3rem;">{{(sex=='')?sex_2:sex}}</p>
			</div>
			<dt style="width:97%;margin-left: 3%;height: 1px;background-color: #eeeeee;margin-top: 1.3rem;"></dt>
             
             
			<div style="width:97%;height:2rem;position:relative;margin-top:0.3rem;margin-left: 3%;">
				   <p  style="font-size:0.34rem;color:black;">作品类型</p>
				<div style="width: 100%;height: 1rem;margin-top: 0.4rem;">

					<div @touchstart="js1"  :class="{btnsos:act.noe1,btnso:act.noa1}">造型
						<!--<img :class="{imgsto:act.noe1,imgs:act.noa1}" src="../../assets/img/xia1.png" />-->
					</div>

					<div @touchstart="js2" :class="{btnsos:act.noe2,btnso:act.noa2}">文学
						<!--<img :class="{imgsto:act.noe2,imgs:act.noa2}" src="../../assets/img/xia1.png" />-->
					</div>

					<div @touchstart="js3" :class="{btnsos:act.noe3,btnso:act.noa3}">设计
						<!--<img :class="{imgsto:act.noe3,imgs:act.noa3}" src="../../assets/img/xia1.png" />-->
					</div>

					<div @touchstart="js4" :class="{btnsos:act.noe4,btnso:act.noa4}">表演
						<!--<img :class="{imgsto:act.noe4,imgs:act.noa4}" src="../../assets/img/xia1.png" />-->
					</div>
				</div>
			</div>
                
		</div>
		
		  <div style="position:relative;z-index:99999;">
		    <mt-actionsheet :actions="action_values" v-model="sheetVisible"></mt-actionsheet>  
		  </div>
		  
		<div class="box_bottom">
			
	   	   	<mu-raised-button @click='dal' label="确认筛选" class="demo-raised-button" primary/>
	   	   	
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	export default {
        store,
		data() {
			return {
				act: {
					noa1: true,
					noe1: false,
					noa2: true,
					noe2: false,
					noa3: true,
					noe3: false,
					noa4: true,
					noe4: false,
				},
				acts: {
					noa1: true,
					noe1: false,
					noa2: true,
					noe2: false,
					noa3: true,
					noe3: false,
					noa4: true,
					noe4: false,
				},
				value2:20,
				value3:[],
				sheetVisible:false,
				action_values:[
				{
						name: '全部',
						method: this.getall
				},
				{
						name: '男',
						method: this.getnan
					},
					{
						name: '女',
						method: this.getnv
					}
				], 
				sex_2:'全部',
				sex:'全部',
				lei_xin:[],
			}
		},
		beforeMount(){
			if(localStorage.max_s!=undefined){
			  this.$store.state.max=localStorage.max_s
			  this.$store.state.min=localStorage.min_s
			   
			}
			  this.value3[1]=this.$store.state.max
			  this.value3[0]=this.$store.state.min
			 
		},
		mounted(){
		 if(localStorage.gander_s!=undefined){
			this.$store.state.gander=localStorage.gander_s
			console.log(localStorage.typesOf_s,"211111111111111")
			var a=localStorage.typesOf_s.split(",");
			for(var i=0;i<a.length;i++){
				if(a[i]==""){
					a.splice(i,1)
				}
			}
			this.$store.state.typesOf=a;
			this.$store.state.area =localStorage.area_s
		  }
		    this.value2 = Number(this.$store.state.area)
			this.sex = this.$store.state.gander
			this.lei_xin=this.$store.state.typesOf//类型（）
			this.jilu()
			 //console.log(this.$store.state.area,'区域数据111111111111111')
		},
		
		methods:{
			jilu(){
			var a = this.$store.state.typesOf
			for(var i=0;i<a.length;i++){
					if(a[i]=='造型'){this.act.noa1 = false;this.act.noe1 = true};
					if(a[i]=='文学'){this.act.noa2 = false;this.act.noe2 = true};
					if(a[i]=='设计'){this.act.noa3 = false;this.act.noe3 = true};
					if(a[i]=='表演'){this.act.noa4 = false;this.act.noe4 = true};
				}
			},
			getnan(){
				this.sex = "男"
			},
			getnv() {
				this.sex = "女"
			},
			getall() {
				this.sex = ""
			},
			show_sexs(){
				this.sheetVisible = true
			},
			hui(){
				this.$store.state.home_tai = 1
				this.$router.push({
						path: '../slider'
					});
			},
			js1(){
				if(this.act.noe1==false){
					let a = '造型'
					this.lei_xin.push(a)
					//console.log(this.lei_xin)
					this.act.noa1 = false;
					this.act.noe1 = true;
				}else{
					for(var i=0;i<this.lei_xin.length;i++){
						if(this.lei_xin[i]=="造型"){
							this.lei_xin.splice(i,1)
						}
					}
					this.act.noa1 = true;
					this.act.noe1 = false;
				}
			},
			js2(){
				if(this.act.noe2==false){
					this.lei_xin.push('文学')
					this.act.noa2 = false;
					this.act.noe2 = true;
				}else{
					for(var i=0;i<this.lei_xin.length;i++){
						if(this.lei_xin[i]=="文学"){
							this.lei_xin.splice(i,1)
						}
					}
					this.act.noa2 = true;
					this.act.noe2 = false;
				}
			},
			js3() {
					if(this.act.noe3==false){
					this.lei_xin.push('设计')
					this.act.noa3 = false;
					this.act.noe3 = true;

				}else{
					for(var i=0;i<this.lei_xin.length;i++){
						if(this.lei_xin[i]=="设计"){
							this.lei_xin.splice(i,1)
						}
					}
					
					this.act.noa3 = true;
					this.act.noe3 = false;
					
				}
			},
			js4() {
					if(this.act.noe4==false){
					this.lei_xin.push('表演')
					//console.log(this.lei_xin)

					this.act.noa4 = false;
					this.act.noe4 = true;

				}else{
					for(var i=0;i<this.lei_xin.length;i++){
						if(this.lei_xin[i]=="表演"){
							this.lei_xin.splice(i,1)
						}
					}
					
					//console.log(this.lei_xin)
		
					this.act.noa4 = true;
					this.act.noe4 = false;
					
				}
			},
			formatTooltip(val) {
				return val / 100;
			},
            dal(){
            	this.$store.state.sou_home = 1
            	//console.log(this.value2,'区域',this.value3,'最大最小年龄',this.sex,'性别',this.lei_xin,'类型')
            	    this.$store.state.max = this.value3[1];
					this.$store.state.min =this.value3[0];
					this.$store.state.gander =this.sex;
					if(this.lei_xin.length==0){
						this.$store.state.typesOf=null
					}else{
						this.$store.state.typesOf =this.lei_xin;//类型（）
					}
					
//					this.$store.state.area = this.value2;
            	
            	    localStorage.max_s = this.value3[1];
					localStorage.min_s =this.value3[0];
					localStorage.gander_s =this.sex;
					localStorage.typesOf_s =this.lei_xin.join();//类型（）
					localStorage.area_s =this.value2;
            	
            	this.$router.push({path:'../slider'});
            },
		}
	}
</script>

<style scoped="scoped">
	@import url("../../assets/css/Condition screening.css");
	
	.container{
    display: flex;
    flex-wrap: wrap;
  }
  .demo-raised-button {
    width: 3rem;
    font-size: 0.3rem;
    width: 6.4rem;height: 0.9rem;background:#2E3135;
    border-radius: 0.1rem;
    margin-top: 0.25rem;
    margin-left: 0.5rem;
  }
  	.head {
		width: 100%;
		height: 1rem;
		position: fixed;
		top: 0;
		background: white;
		box-sizing: border-box;
		padding-top: 0.3rem;
		border-bottom: 1px solid #f1f1f1;
		z-index: 300;
	}
	.title {
		width: 80%;
		height: 100%;
		float: left;
		font-size: 0.38rem;
		color: #333333;
		text-align: center;
	}
	
</style>