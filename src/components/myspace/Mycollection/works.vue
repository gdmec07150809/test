<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-21
    	描述：我的收藏（作品）
    -->
	<div style="width: 100%;background:white;overflow: hidden;">
	 <!--<div  v-for="(j,index) in $store.state.shou_cang" style="width:100%;background:white;margin-top: 0.2rem;">-->
	  	<!--<div v-show="j.dataArt.length!=0" style="width:100%;height:0.4rem;">
	  		<p style="font-size:0.25rem;color:#A9A9A9;float:left;margin-left: 0.3rem;margin-right: 0.3rem;">
			{{j.sortDate.substring(0,4)}}年
			{{j.sortDate.substring(6,7)}}月
			{{j.sortDate.substring(8,10)}}日
		</p>
		     <p style="font-size:0.25rem;color:#A9A9A9;float: left;">{{j.dataArt.length}}件</p>
	  	</div>
		<div style="width: 7.5rem;height:0.4rem;"></div>
		
	<div style="width: 100%;overflow: hidden;">
			<div v-for="(i,index) in j.dataArt" @click="tiao(i)" class="boxss" style="float:left;">
				<div class="imgss" style="overflow:hidden;">
					  <img style="min-height:100%;min-width:100%;max-height:150%;max-width:150%;" :src="i.coverPicUrl">
				</div>
		  <div style="width: 0.59rem;height: 0.34rem;background: rgba(0,0,0,0.2);position: absolute;top:0.2rem;left: 1.7rem;">
		  	   <p style="font-size:0.25rem;float:left;color:white;margin-left:0.07rem;">{{i.totalPic}}张</p>
			</div>
		</div>
	</div>-->
	 <div class="box" v-for="(i,index) in $store.state.my_works"  @click="tiao(i)">
	  	  <div class="box_s">
	  	  	  <div class="box_img" style="position: relative;">
	  	  	  	  <div class="box_ss">{{i.totalPic}}张</div>
	  	  	  	 <img ref="img1" @load="img1_chuli()" style="position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);" :src="i.coverPicUrl" alt="" />
	  	  	  </div>
	  	  	  
	  	  	  <div style="width:65%;height:100%;float:right;position: relative;">
	  	  	  	  <p class="p_s1" style="-webkit-box-orient: vertical;">{{i.artTitle}}</p>
	  	  	  	  <div class="p_s2" style="-webkit-box-orient: vertical;">
	  	  	  	  	{{html_detail(i)}}
	  	  	  	  </div>
	  	  	  	  <div style="width: 100%;position: absolute;bottom: 0;right: 0;overflow: hidden;">
	  	  	  	  	 <p style="font-size: 0.26rem;color:#CCCCCC;float: left;">{{i.nickname}}</p>
	  	  	  	  	  <p style="font-size: 0.26rem;color:#CCCCCC;float:right;margin-right: 0.2rem;">收藏于{{i.insertDate.substr(8,2)}}/{{i.insertDate.substr(5,2)}}/{{i.insertDate.substr(0,4)}}</p>
	  	  	  	  </div>
	  	  	  </div>
	  	  </div>
	  	  <div class="box_h"></div>
	  </div>
	 <!--</div>-->
	  <div style="width: 100%;height: 0.2rem;"></div>
	  
	  <div class="no_article" v-if="$store.state.my_works.length==0">
	  				
				<img src="../../../assets/img/icon_noPaint.png" style="width: 100%;height: 100%;" />
				<p>您还未收藏过作品哦</p>
		</div>
	</div>
</template>

<script>
	import store from '../../../vuex/store.js'
	import md5 from 'js-md5';
	export default{
		store,
		data(){
			return{
				date_str:'',
			}
		},
		methods:{
				img1_chuli(){
				if(this.$refs.img1.length>0){
					for(var i=0;i<this.$refs.img1.length;i++){
						var img=new Image();
						img.src=this.$refs.img1[i].currentSrc;
						if(img.width>img.height){
							this.$refs.img1[i].style.width="auto"
							this.$refs.img1[i].style.height="100%"
						}else{
							this.$refs.img1[i].style.width="100%"
							this.$refs.img1[i].style.height="auto"
						}
					}
				}
			},
//			date_dateil(a){
				
//				console.log(a)
//				var str = a.replace(/-/g,'/')
//				var t=new Date(str);
//				return t.getDate()+"/"+(t.getMonth()+1)+"/"+t.getFullYear();
//			},
			tiao(i){
				this.$store.state.back_id=91
				this.$store.state.worksId = i.artId
				this.$store.state.worksName="作品"
				this.$router.push({
						path: '../works_detail'
						});
			},
			/*处理标签*/
			html_detail(i) {
				if(i.artRemark){
				var str = i.artRemark;
				var dd = str.replace(/<\/?.+?>/g, "")
				var dds = dd.replace(/ /g, "");
				var ddss = dds.replace(/[ ]|[&nbsp;]/g, "");
				return ddss;
				}
			},
//			huoqus(){
//				var url=this.$store.state.request_url+"/api/map/art/selectOpe.do";
//		        var id=this.$store.state.data.memId;
//		        var token=this.$store.state.data.tokEn;
//		        var ts=new Date().getTime();
//		        var sign = md5(url+id+token+ts)
//				this.$http({
//				url: this.$store.state.request_url+"/api/map/art/selectOpe.do?memId="+id+"&ts="+ts,
//				method: 'post',
//				headers: {
//					"content-type":"application/json;charset=UTF-8",
//					'sIgn': sign
//				},
//				body:{
//					opId:this.$store.state.data.memId,
//					typeId:'4'
//				},
//				emulateJSON: false,
//			}).then(function(response){
//				if(response.body.meta.res == "00000"){
//					this.$store.state.shou_cang =response.body.data.artDocumentsList 
//				}
//			  }).catch(function(err){console.log(err)})
//			},
		},
		mounted(){
//			this.huoqus()
             
		},
		computed:{
			data(){
				
			},
		}
	}
</script>

<style scoped="scoped">
	.box_h{
		width: 100%;
		height: 0.2rem;
		background: #F7F7F7;
		float: left;
		margin-top: 0.2rem;
	}
	.p_ids(){
		font-size:0.28rem;
		color:#CCCCCC;
		float: left;
	}
	
	.p_s2{
		font-size:0.23rem;
	    width: 95%;
	    height: 0.7rem;
	    display: -webkit-box;  
		display: -moz-box;  
		overflow: hidden;  
		text-overflow: ellipsis;  
		word-break: break-all;  
		-webkit-box-orient: vertical;  
		-webkit-line-clamp:2;
		color: #333333;
		margin-top: 0.1rem;
	}
	
	.p_s1{
		font-size:0.32rem;
	    font-weight: 600;
	    width: 95%;
	    height: 0.4rem;
	    display: -webkit-box;  
		display: -moz-box;  
		overflow: hidden;  
		text-overflow: ellipsis;  
		word-break: break-all;  
		-webkit-box-orient: vertical;  
		-webkit-line-clamp:1;
	
	}
	
	.box_ss{
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0.15rem;
        left:0.15rem;
        color: white;
        font-size:0.22rem;
        padding: 0.05rem 0.05rem;
	}
	.box_img{
		    width: 2.3rem;
            height: 1.7rem;
            overflow: hidden;
            float: left;
            position: relative;
	}
	
	.box_s{
		width: 96%;
		height:1.7rem;
		float: right;
		padding-top: 0.1rem;
	}
	.box{
		width: 100%;
		overflow: hidden;
		float: left;
		background: white;
		position: relative;
		z-index: 500;
	}
	
	.imgss{
		width: 2.4rem;
		height: 2.4rem;
		vertical-align: middle;
        text-align: center;
		
	}
	.boxss{
		width: 2.4rem;position: relative;float: left;height:2.49rem;margin-left: 0.1rem;
		margin-top: 0.05rem;
		
	}
	.no_article {
		width: 30%;
		margin-left: 35%;
		margin-top: 4rem;
		text-align: center;
	}
	
	.no_article p {
		color: #D0D0D0;
		font-size: 0.25rem;
		margin-top: 0.2rem;
	}
	
</style>