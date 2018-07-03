<template>
	<div id="app">
		<!--
        	作者：2443611475@qq.com
        	时间：2018-05-10
        	描述：文章
        -->
		<div class="kong" v-show="!show">
				<img src="../../assets/img/icon_noArticle.png" />
				<p >暂时还未发布文章</p>
			</div>
		
		<div v-show="show" class="works_item" v-for="(arr,index) in data" @click="toArticle(arr)">
			<div class="xian" v-if="(arr.insertDate&&index>0)?true:false"></div>
			<div class="date" >
				<p class="day">{{arr.insertDate.split(' ')[0].split("-")[1]}}日</p>
				<p class="month">{{arr.insertDate.split(' ')[0].split("-")[2]}}月</p>
			</div>
			<div class="works_img">
				
				<div  class="big_img" style="vertical-align:middle;text-align:center;overflow:hidden;">
					<img style="min-height:100%;min-width:100%;max-width:130%;" v-if="arr.picInfo.length>0" :src="arr.picInfo[0].picUrl"/>
				</div>
				
				<div class="small_img">
					<p class="title" style="-webkit-box-orient: vertical;" >{{arr.artTitle}}</p>
					<p class="content" :class="{content1:arr.artTitle.length>13}" style="-webkit-box-orient: vertical;">{{html_detail(arr)}}</p>
					<div class="article_infor">
						<p v-if="arr.artFlag=='4'?true:false" class="shen">深度</p>
						<p v-if="arr.artFlag=='3'?true:false" class="ren">头条</p>
						<p style="text-align: right;" class="commtent">{{arr.readerDiscuss}}评论</p>
					</div>
				</div>
			</div>
			<!--<div class="down"></div>-->
		</div>
		
		
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default {
		//			el:"#app",
		store,
		data() {
			return {
				act: [],
				data: [],
				show: true,
				day: [],
				month: [],
				time:''
			}
		},
		methods: {
//			r() {
//				for(var i = 0; i < this.data.length; i++) {
//					this.month.push(this.data[i].insertDate.split(' ')[0].split("-")[1]);
//					
//				}
//				for(var i = 0; i < this.data.length; i++) {
//					
//					this.day.push(this.data[i].insertDate.split(' ')[0].split("-")[2]);
//				}
//			},
			html_detail(i){
				var str=i.docUrl;
				//console.log(str,"33333333")
				 var dd=str.replace(/<\/?.+?>/g,"")
				 var dds=dd.replace(/ /g,"");
				  var ddss=dds.replace(/[ ]|[&nbsp;]/g,"");
				////console.log(dds,"999999999")
				return ddss;
			},
			toArticle(i){
				
//				this.$store.state.back_id=2
//				this.$store.state.worksId=e
                
//				this.$store.state.worksName="文章"
//               this.$store.state.jie_dian = 2  
                 
//               //console.log(this.$store.state.jie_dian,'22222222')
                 
                 //console.log(i)

            	this.$store.state.tr = 3
                
				this.$store.state.zuopin_x = i
				
				
				this.$router.push({
						path: '../Details_of_the_article_s'
						});
			},
		},
		mounted(){
//			//console.log(this.$store.state.data.memId);
			var url=this.$store.state.request_url+"/api/map/art/selectFlag.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
			//console.log(this.$store.state.worksOpId)
			this.$http({
				url: this.$store.state.request_url+"/api/map/art/selectFlag.do?memId="+id+"&ts="+ts,
				method: 'post',
				headers: {
					"content-type":"application/json;charset=UTF-8",
					'sIgn': sign
				},
				body:{
					opId: this.$store.state.worksOpId,
					typeId: "3",
					page:1,
					rows:10,
					operatorId:this.$store.state.data.memId
				},
				emulateJSON: false,
			}).then(function(response){
				
				if(response.body.meta.res == "00000"){
					this.data = response.body.data.artDocumentsList;
					
					//console.log(this.data,"文章");
					
					if(this.data.length == 0){
						this.show = false
					}else{
						this.show = true
//						this.r();
					}
					
				}
			}).catch(function(err){
				//console.log(err)
				this.show = false
			})
		}
	}
</script>

<style scoped="scoped">
	#app {
		overflow-x: hidden;
		/*padding-bottom: 0.5rem;*/
	}
	
	li {
		list-style-type: none;
	}
	
	* {
		font-family: "微软雅黑";
	}
	
	p,
	ul {
		margin: 0;
		padding: 0;
	}
	
	.works_item {
		width: 100%;
		margin: 0.3rem 0 0;
		overflow: hidden;
	}
	
	.date {
		width: 100%;
		height: 0.6rem;
		margin: 0.5rem 0.25rem 0;
	}
	
	.day {
		float: left;
		font-size: 0.45rem;
		font-weight: bold;
	}
	
	.month {
		float: left;
		font-size: 0.3rem;
		color: #000;
		font-weight: bold;
		margin-left: 0.1rem;
		line-height: 0.95rem;
	}
	
	.works_img {
		width: 100%;
		height: 2.2rem;
		margin-left: 0.2rem;
		margin-top: 0.3rem;
    	margin-bottom: 0.2rem;
	}
	
	.works_img img {
		/*width: 100%;
		height: 100%;*/
	}
	
	.small_img {
		float: left;
		width: 54%;
		height: 100%;
		margin-right: 0.3rem;
		margin-left: 1.5%;
	}
	
	.big_img {
		float: left;
		width: 40%;
		height: 100%;
		clear: both;
		background-color: #007AFF;
	}
	
	.title {
		font-size: 0.35rem;
		width:4rem;
		overflow: hidden;
         display: -webkit-box;
    	display: -moz-box;
    	overflow: hidden;
    	text-overflow: ellipsis;
    	word-break: break-all;
    	-webkit-box-orient: vertical;
    	-webkit-line-clamp: 2;
		/*height: 0.4rem;*/
		
	}
	
	.content {
		margin-top: 0.25rem;
		margin-right: 1.5%;
		font-size: 0.25rem;
    	display: -webkit-box;
    	display: -moz-box;
    	overflow: hidden;
    	text-overflow: ellipsis;
    	word-break: break-all;
    	-webkit-box-orient: vertical;
    	-webkit-line-clamp: 2;
	}
	
		.content1 {
		margin-top: 0.25rem;
		margin-right: 1.5%;
		font-size: 0.25rem;
    	display: -webkit-box;
    	display: -moz-box;
    	overflow: hidden;
    	text-overflow: ellipsis;
    	word-break: break-all;
    	-webkit-box-orient: vertical;
    	-webkit-line-clamp: 1;
	}
	
	.article_infor {
		margin-top: 0.25rem;
		width: 100%;
	}
	
	.shen {
		font-size: 0.25rem;
		color: #2AA4F2;
		float: left;
		padding: 0.01rem 0.07rem;
		border: #2AA4F2 0.02rem solid;
		border-radius: 0.08rem;
	}
	
	.ren {
		font-size: 0.25rem;
		color: #FD5858;
		float: left;
		padding: 0.005rem 0.07rem;
		border: #FD5858 0.02rem solid;
		border-radius: 0.08rem;
	}
	
	.commtent {
		font-size: 0.25rem;
		width: 45%;
		margin-right: 5%;
		color: #D0D0D0;
		float: right;
	}
	
	.xian {
		height: 0.2rem;
		width: 100%;
		background: rgba(247, 247, 247, 1);
	}
	
	.down {
		width: 100%;
		height: 0.01rem;
		background: rgba(247, 247, 247, 1);
	}
	
	.kong {
		height: 5rem;
		width: 100%;
		text-align: center;
	}
	
	.kong img {
		width: 3rem;
		height: 2.8rem;
		margin: 15% 30% 0;
	}
	.kong p{
		color: #D0D0D0;
		font-size: 0.25rem;
		margin-top: 0.2rem;
	}
</style>