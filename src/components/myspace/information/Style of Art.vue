<template>
	<div style="width: 100%;">
		<!--
        	描述：兴趣爱好，选项子页面
       -->
	   <div class="head">
	   		<div style="width: 10%; float: left;">
			<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;"  src="../../../assets/img/zuo.png" @click="hui"/>
			</div>
			<div class="title">
			<p>{{$store.state.table_top}}</p>
			</div>
			<div style="width: 10%;float:right;">
			<p @click="huis" style="font-size: 0.3rem;color:rgb(255, 157, 0);display: block;">保存</p>
			</div>
		</div>
	     <div style="width:95%;height:90%;float:right;margin-top:2rem;margin-bottom: 1.4rem;">
	        <div style="width:95%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #CACACA;position:fixed;top: 1rem;background:white;">
	   	  	  	
	   	  	  	 <input v-model="cz.dictName" class="inpsss" type="text" :placeholder="'请填写'+$store.state.table_top" maxlength="20" />
	   	  	  		<p style="float: right;margin-right: 0.3rem;font-size: 0.3rem;line-height: 1rem;color: #ff9d00;">添加</p>
	             <img @click="Add_to"  style="width:0.3rem;height:0.3rem;float:right;margin-top:0.35rem;margin-right: 0.1rem;" src="../../../assets/img/icon_my_add.png" alt="" />
	             	
	        </div>
	          
	          <div @click="dias(index)" id="mes_id" v-for="(i,index) in r" style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #CACACA;">
	   	  	  	<p style="font-size:0.3rem;color:black;float: left;">{{i.dictName}}</p>
	   	  	  	   <!-- <i v-show="i.id" style="font-size: 0.4rem;float: right;margin: 0.3rem;" class="fa fa-check"></i>-->
	   	  	  	    <img v-show="i.id"  style="float: right;width: 0.4rem;height: 0.4rem;margin-top: 0.3rem;margin-right: 0.2rem;" src="static/img/icon_my_choose.png" />
	   	  	  </div>
	   </div>
	</div>
</template>

<script>
	import store from "../../../vuex/store.js"
	import { Toast } from 'mint-ui';
	import md5 from 'js-md5';
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
			}
		},
		watch:{
			diass:function(index){
				
			},
		},
		methods:{
			hui(){
				this.$router.push({
						path: '../information'
						});
			},
			huis(){
                var hs={};
				hs.hobbyInfo=[]
				let b = {};b.hobbyId = '1';b.hobbyFather='艺术作品';b.hobbyText = this.$store.state.Hobby_box[0].join(',')
				hs.hobbyInfo.push(b)	
				let b1 = {};b1.hobbyId = '2';b1.hobbyFather='书籍';b1.hobbyText = this.$store.state.Hobby_box[1].join(',')
				hs.hobbyInfo.push(b1)	
				let b2 = {};b2.hobbyId = '3';b2.hobbyFather='运动';b2.hobbyText = this.$store.state.Hobby_box[2].join(',')
				hs.hobbyInfo.push(b2)
				let b3 = {};b3.hobbyId = '4';b3.hobbyFather='喜欢的音乐';b3.hobbyText = this.$store.state.Hobby_box[3].join(',')
				hs.hobbyInfo.push(b3)
				let b4 = {};b4.hobbyId = '5';b4.hobbyFather='喜欢的食物';b4.hobbyText = this.$store.state.Hobby_box[4].join(',')
				hs.hobbyInfo.push(b4)
				let b5 = {};b5.hobbyId = '6';b5.hobbyFather='喜欢的电影';b5.hobbyText = this.$store.state.Hobby_box[5].join(',')
				hs.hobbyInfo.push(b5)
				let b6 = {};b6.hobbyId = '7';b6.hobbyFather='喜欢的动漫';b6.hobbyText = this.$store.state.Hobby_box[6].join(',')
				hs.hobbyInfo.push(b6)//兴趣爱好数据处理
				
				var url=this.$store.state.request_url+"/api/map/user/editArtist.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				this.$http({
				url: this.$store.state.request_url+"/api/map/user/editArtist.do?memId="+id+"&ts="+ts,
				headers:{
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				emulateJSON: false,
				method: 'post',
				body:{
					hobby:hs,//兴趣爱好
					opId:this.$store.state.data.memId+'',//作者ID
				}
			}).then(function(response) {
				if(response.body.meta.res == '00000'){
                    Toast({
									message: "保存成功",
									position: 'middle',
									duration: 2000
								});
                this.$store.state.yemians = 0
				this.$router.push({
						path: '../information'
						});
				}else{
					Toast({
									message: response.body.meta.msg,
									position: 'middle',
									duration: 2000
							});
				}
			}).catch(function(err){
			})
			},
			
			Add_to(){//添加新内容函数
				if(this.cz.dictName!==''){
					this.r.unshift(this.cz);
					this.$store.state.Hobby_box[this.$store.state.ba].push(this.cz.dictName);
					this.cz = {};
					this.cz.dictName = '';
					this.cz.id = true;
				}
			},
			dias(index){
				if(this.r[index].id){
					 for(var i=0;i<this.$store.state.Hobby_box[this.$store.state.ba].length;i++){
					  	   if(this.$store.state.Hobby_box[this.$store.state.ba][i]==this.r[index].dictName){
					  	   	       this.$store.state.Hobby_box[this.$store.state.ba].splice(i,1)
					  	     }
					       }
						if(this.r[index].tad)
						{
                            this.r.splice(index,1)
						}else{
							this.r[index].id = false
						}
				}else{
					this.r[index].id = true
					this.$store.state.Hobby_box[this.$store.state.ba].push(this.r[index].dictName)
				}
			}
	   },
		mounted(){
			 	
		},
		computed:{
             r(){
             	 var a= this.$store.state.Add_what_I_like[this.$store.state.ba].dataDictionary.reverse()
             	 var res = [];
                 var json = {};
                 for(var i = 0; i < a.length; i++){//数组去重
                    if(!json[a[i].dictName]){
                       res.push(a[i]);
                          json[a[i].dictName] = 1;
                      }
                   }
                  return res	
             }
		},
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