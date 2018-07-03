<template>
	<div style="width: 100%;">
		<!--
        	描述：兴趣爱好，选项子页面
        -->
	   <!--<div class="box_top" style="width: 100%;text-align:center;height: 0.88rem;background: white;position:fixed;top:0;left:0;line-height:0.88rem;background:white;">
	   		<img @click="hui" style="width: 0.4rem;height: 0.4rem;margin:0.25rem 0.3rem;position: absolute;left: 0;" src="../../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;">选择语言</p>
	   </div>-->
	   <div class="head">
			<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../../assets/img/zuo.png" @click="hui"/>
			<div class="title">
			<p>选择语言</p>
			</div>
		</div>
	     <div style="width:95%;height:90%;float:right;margin-top:0.9rem;margin-bottom: 1.4rem;">
	        <!--<div style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #CACACA;position:fixed;top: 0.88rem;background:white;">
	   	  	  	
	   	  	  	 <input v-model="cz.dictName" class="inpsss" type="text" :placeholder="'添加'+$store.state.table_top" />
	   	  	  
	             <img @click="Add_to"  style="width:0.44rem;height:0.44rem;float:left;margin-top:0.3rem;" src="../../../assets/img/icon_my_add.png" alt="" />
	             
	        </div>-->
	          
	          <div @click="dias(index)"  v-for="(i,index) in r" style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #CACACA;">
	   	  	  	<p style="font-size:0.3rem;color:black;float: left;">{{i.dictName}}</p>
	   	  	  	    <!--<i  style="font-size: 0.4rem;float: right;margin: 0.3rem;" class="fa fa-check"></i>-->
	   	  	  	    <img v-show="i.id"  style="float: right;width: 0.4rem;height: 0.4rem;margin-top: 0.3rem;margin-right: 0.2rem;" src="static/img/icon_my_choose.png" />
	   	  	  </div>
	     
	   </div>
	 <div class="box_bottom">
	   	   <button @click="huis" class="btns" style="width: 6.4rem;height: 0.9rem;background:#2E3135;">
	   	   	确认选择</button>
	   </div>
	</div>
</template>

<script>
	import store from "../../../vuex/store.js"
	export default{
		store,
		data(){
			return{
			    cz:{
			    	dictName:'',
			    	id:true,
			    	tad:true,
			    },
			    ads:[],
			    	
			    t:'',
			    r:[
			    {dictName:"国语",id:false},{dictName:"英语",id:false},{dictName:"日语",id:false},{dictName:"意大利语",id:false}, {dictName:"西班牙语",id:false},
			    {dictName:"孟加拉语",id:false},{dictName:"阿拉伯语",id:false},{dictName:"葡萄牙语",id:false},{dictName:"俄语",id:false},{dictName:"德语",id:false},
			    {dictName:"法语",id:false},{dictName:"韩语",id:false}],
			    selected:[]
			}
		},
		methods:{
			hui(){
//				window.location = '#/information'
				this.$router.push({
						path: '../information'
						});
			},
			huis(){
				if(this.selected.length>0){
					var level="";
					for(var i=0;i<this.selected.length;i++){
						if(i<this.selected.length-1){
							level+=this.selected[i]+","
						}else{
							level+=this.selected[i]
						}
						
					}
					this.$store.state.detailed_information.languageLevel=level;
				}
				this.$store.state.yemians = '0'
				this.$router.push({
						path: '../information'
				});
			},
			dias(index){
				//console.log(this.r[index])
				if(this.r[index].id){
					//console.log(this.r[index],"22222222222")
					if(this.selected.indexOf(this.r[index].dictName)>-1){
						for(var i=0;i<this.selected.length;i++){
							//console.log(this.selected[i] == this.r[index].dictName)
							if(this.selected[i] == this.r[index].dictName) {
								//console.log(this.selected[i],"----",this.r[index].dictName)
								this.r[index].id=false
									this.selected.splice(i, 1);
								}
						}
					}
					//console.log(this.selected,"已选择")
				}else{
					
					if(this.selected.indexOf(this.r[index].dictName)==-1){
						this.selected.push(this.r[index].dictName);
						this.r[index].id=true
					}
					//console.log(this.selected,"已选择")
				}
			}
	   },
		mounted(){
            
		},
		created(){
			if(this.$store.state.detailed_information.languageLevel.length>0){
				var array=this.$store.state.detailed_information.languageLevel.split(",");
				this.selected=array;
				for(var i=0;i<array.length;i++){
					for(var j=0;j<this.r.length;j++){
						if(this.r[j].dictName==array[i]){
							this.r[j].id=true;
						}
					}
				}
			}
		}

	}
</script>

<style scoped="scoped">
	*{
		outline:none;
	}
	.box_bottom{
		width: 100%;
		height: 1.4rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9992;
		background: white;
		border-top: 0.01rem solid #CACACA;
	}
	.btns{
		border: none;
		border-radius: 0.1rem;
		position: absolute;
		top: 0.25rem;
		left: 8%;
		color: white;
		font-size: 0.3rem;
	}
	.inpsss{
		font-size:0.28rem;height:0.8rem;width:60%;border:none;float:left;margin-top: 0.15rem;
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
		text-align: center;
	}
</style>