<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-21
    	描述：我的收藏
    -->
	<div class="gong_class">
		<div style="width: 100%;height: 1rem;position: fixed;text-align:center;top:0;left: 0;z-index: 9992;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<img @click="hui" style="width: 0.3rem;height: 0.3rem;position: absolute;left: 0.3rem;top: 0.35rem;" src="../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;line-height: 1rem;">我的收藏</p>
		</div>
		
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-21
    	描述：采用div替换a标签的方法
    -->
		<div style="width: 100%;height: 1.5rem;position: fixed;top: 0.88rem;background: white;z-index:1000;">
			<div @click="to_works" :class="{boxs:act.noa1,boxsto:act.noe1}" style="margin-left: 0.3rem;">作品 <div :class="{xian1:act.noa1,xian:act.noe1}"></div></div>
			<div @click="to_Leisure" :class="{boxs:act.noa2,boxsto:act.noe2}" style="margin-left: 0.6rem;">闲情 <div :class="{xian1:act.noa2,xian:act.noe2}"></div></div>
			<div @click="to_Article" :class="{boxs:act.noa3,boxsto:act.noe3}" style="margin-left: 0.6rem;">文章 <div :class="{xian1:act.noa3,xian:act.noe3}"></div></div>
		</div>
		    <div style="height:2.38rem;"></div>
			<div style="width: 100%;">
				<router-view></router-view>
			</div>
			
			
	</div>
</template>

<script>
	import router from '../../router/index.js'
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default{
		store,
		data(){
			return{
				act:{
					noa1:true,noe1:false,
					noa2:true,noe2:false,
					noa3:true,noe3:false,
				},
			}
		},
		methods:{
			hui(){
				this.$router.push({
						path: '../myspace'
						});
			},
			to_works(){
				this.act.noa1=false;this.act.noe1=true;
				this.act.noa2=true;this.act.noe2=false;
				this.act.noa3=true;this.act.noe3=false;
				router.replace({path:'/Mycollection/works'})
			},
			to_Leisure(){
				this.act.noa1=true;this.act.noe1=false;
				this.act.noa2=false;this.act.noe2=true;
				this.act.noa3=true;this.act.noe3=false;
				router.replace({path:'/Mycollection/Leisure'})
			},
			to_Article(){
				this.act.noa1=true;this.act.noe1=false;
				this.act.noa2=true;this.act.noe2=false;
				this.act.noa3=false;this.act.noe3=true;
				router.replace({path:'/Mycollection/actives_rower'})
			},
			huoqus(){
				/*清空数据*/
				this.$store.state.my_works=[];
				this.$store.state.my_leisure=[];
				this.$store.state.my_artTle=[];
				var url=this.$store.state.request_url+"/api/map/art/selectOpe.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				this.$http({
				url: this.$store.state.request_url+"/api/map/art/selectOpe.do?memId="+id+"&ts="+ts,
				method: 'post',
				headers: {
					"content-type":"application/json;charset=UTF-8",
					'sIgn': sign
				},
				body:{
					opId:this.$store.state.data.memId,
					typeId:'4'
				},
				emulateJSON: false,
			}).then(function(response){
				  console.log(response.body,'我的收藏临时存储')
				if(response.body.meta.res == "00000"){
					
					this.$store.state.shou_cang =response.body.data.artDocumentsList 
					
					if(response.body.data){
					for(var i=0;i<response.body.data.artDocumentsList.length;i++){
						console.log(response.body.data.artDocumentsList[i].dataArt)
						for(var j=0;j<response.body.data.artDocumentsList[i].dataArt.length;j++){
							this.$store.state.my_works.push(response.body.data.artDocumentsList[i].dataArt[j])
						}
						for(var j=0;j<response.body.data.artDocumentsList[i].dataLeisure.length;j++){
							this.$store.state.my_leisure.push(response.body.data.artDocumentsList[i].dataLeisure[j])
						}
						for(var j=0;j<response.body.data.artDocumentsList[i].dataArticle.length;j++){
							this.$store.state.my_artTle.push(response.body.data.artDocumentsList[i].dataArticle[j])
						}
					}
					}
					
					/**判断返回页*/
					if(this.$store.state.back_id==91){
						this.to_works()
					}else if(this.$store.state.back_id==92){
						this.to_Leisure()
					}else if(this.$store.state.back_id==93){
						this.to_Article()
					}
					
					console.log(this.$store.state.shou_cang,'我的收藏临时存储')
				}
			}).catch(function(err){
				//console.log(err)
				
			})
			}
			
			
		},
		mounted(){
			this.$store.state.is_bottom=false;
			this.to_works()
			this.huoqus()
		},
	}
</script>

<style scoped="scoped">
	.boxs{
		width: 1rem;
		height: 0.7rem;
		font-size: 0.4rem;
		float: left;
		
		margin-top: 0.5rem;
		color: #D0D0D0;
	}
	.boxsto{
		width: 1rem;
		height: 1rem;
		font-size: 0.4rem;
		float: left;
		margin-top: 0.5rem;
		
		color: black;
		font-weight: bold;
		
	}
	.xian{
		width: 0.5rem;
		height: 0.08rem;
		margin-top: 0.1rem;
		margin-left: 0.15rem;
		border-radius: 0.2rem;
		background-color:#ff9d00;	
	}
	.xian1{
		width: 0.5rem;
		height: 0.08rem;
		margin-top: 0.1rem;
		margin-left: 0.15rem;
		border-radius: 0.2rem;
		background-color:#fff;	
	}
		.gong_class{
		width: 100%;
    	overflow: hidden;
    	margin: 0px auto;
	}
	
	
</style>