<template>
	<div id="app" style="width: 100%;overflow:hidden;padding-bottom:1rem;">
			
			<div class="kong" v-show="!show">
				<img src="../../assets/img/icon_noComment.png" />
				<p>暂时还未评论</p>
			</div>
			<div v-show="show" class="comment_item" v-for="(arr,index) in acst">
				<div class="xian" v-if="(index>0)?true:false"></div>
				<div class="athor_infor">
					<div class="athor_infor_left">
						<div class="athor_icon">
							<img :src="arr.disUserPic" />
						</div>
						<p class="athor_name">{{arr.disUser}}</p>
						
					</div>
					
				</div>
				<div class="athor_infor_content">
					<p class="athor_infor_content_text">{{arr.disContent}}</p>
					<div class="works_name">
						<p class="date">[作品]&nbsp;{{arr.artTitle}}</p>
					</div>
					
					<div class="more_content">
						<div class="more_content_left">
							<p>作品评论</p>
							<div class="yuan"></div>
							  <p>{{arr.disDate.substring(0,10)}}</p>
						</div>
						<p class="more_content_right" v-if="arr.disLike>0">{{arr.disLike?arr.disLike:'0'}}个赞</p>
					</div>
				</div>
			</div>
	</div>
		
	</div>
</template>
<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default {
//			el:"#app",
            store,
			data(){
				return{
					acst:[],
					show:true,
				
				}
				
			},
			methods: {
							
			},
		    mounted(){
		    	var url=this.$store.state.request_url+"/api/map/art/selectOpe.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
//		    	this.acst = this.$store.state.act;
		    	this.$http({
				url: this.$store.state.request_url+"/api/map/art/selectOpe.do?memId="+id+"&ts="+ts,
				method: 'post',
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				body: {
					opId:this.$store.state.worksOpId,//测试ID
					typeId:"1",
					page:1,
					rows:10000000
				},
				emulateJSON: false,
				}).then(function(response) {
					//console.log("评论1111111111111111");
					//console.log(response.body.data);
					
					if(response.body.meta.res=="00000"){
						
						//判断有无数据
					if(response.body.data!=null&&response.body.data!="null"){
						if(response.body.data.artDocumentsList.length>0){
							this.show=true
							this.acst=response.body.data.artDocumentsList;
							
							//console.log(this.acst,'评论数据11111111111111111111111')
						}else{
							this.show=false
						}
						
						}else{
							
							this.show=false
						}
					}else{
						this.show=false
					}
				}).catch(function(err) {
					//console.log(err)
				})
		    }
			

	}
</script>

<style scoped="scoped">
	li {
		list-style-type: none;
	}
	*{
		font-family: "微软雅黑";
	}
	p,
	ul {
		margin: 0;
		padding: 0;
	}
	
	/*评论区*/
	
	.comment_item {
		width: 100%;
		margin-top: 0.35rem;
		overflow: hidden;
	}
	
	.athor_infor {
		width: 100%;
		height: 0.75rem;
	}
	
	.athor_icon {
		width:0.65rem ;
		margin-left: 0.15rem;
		height: 0.65rem;
	}
	
	.athor_icon img {
		width: 0.65rem;
		height: 100%;
		border-radius: 50%;
	}
	
	.athor_name {
		margin-top: 0.25rem;
		float: left;
		font-size: 0.25rem;
		margin-left: 0.1rem;
		color: rgba(177, 177, 177, 1);
		line-height: 0.165rem;
	}
	
	.athor_infor_left {
		width: 40%;
		height: 100%;
		float: left;
	}
	
	.athor_icon {
		float: left;
	}
	
	.kong{
		height: 5rem;
		width: 100%;
		text-align: center;
		
	}
	.kong img{
		width: 3rem;
    height: 2.8rem;
    margin: 15% 30% 0;
	}
	.athor_infor_content{
		margin: 0 0.25rem 0 0.75rem;
		
	}
	.call_right{
		float: right;
		height: 100%;
		margin-right: 0.25rem;
	}
	.call_right img{
		width: 0.5rem;
		height: 0.4rem;
	}
	.athor_infor_content_text{
		font-size:0.305rem;
		color:rgba(51,51,51,1);
		line-height:0.385rem;
			/*p标签自动换行*/
		word-wrap: break-word;
    	word-break: break-all;
    	overflow: hidden;
		
	}
	.date{
		font-size:0.26rem;
		color:#878787;
		
		line-height:0.5rem;
	}
	.more_content{
		width: 100%;
		padding-top: 0.2rem;	
	}
	.more_content_left{
		float: left;
		font-size: 0.25rem;
	}
	.more_content_left p{
		float: left;
		color: #D0D0D0;
	}
	.yuan{
		float: left;
		width: 0.05rem;
		height: 0.05rem;
		border-radius: 50%;
		background-color: #D0D0D0;
		margin:0.15rem;
	}
	.more_content_right{
		float: right;
		color: #D0D0D0;
		font-size: 0.25rem;
	}
	.works_name{
		margin-top: 0.2rem;
		overflow: hidden;
		background:rgba(245,245,245,1);
		border-radius: 0.1rem ; 
	}
	.xian{
		height: 0.2rem;
		width: 100%;
		margin-bottom: 0.2rem;
		background:rgba(247,247,247,1);
	}
	
	.kong p{
		color: #D0D0D0;
		font-size: 0.25rem;
		margin-top: 0.2rem;
	}
</style>