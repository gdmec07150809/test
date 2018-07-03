<template>
	<div id="app">
		<div class="base_data">
			<div class="base">
				<p class="title">基本信息</p>
				<div class="base_data_content">
				<div class="base_item">
					<p class="base_item_left">性别</p>
					<p class="base_item_right">{{data.opSex}}</p>
				</div>
				<div  class="base_item">
					<p class="base_item_left">生日</p>
					<p  class="base_item_right">{{data.opBirthday}}</p>
				</div>
				<div v-show="data.opConstellation!=''" class="base_item">
					<p class="base_item_left">星座</p>
					<p  class="base_item_right">{{data.opConstellation}}</p>
				</div>
				<div class="base_item" v-if="data.opAddress">
					<p class="base_item_left">所在地区</p>
					<p class="base_item_right">{{pv}}-{{ct}}</p>
				</div>
				<div  v-show="data.marriageStatus!=''&&data.marriageStatus!=null" class="base_item">
					<p class="base_item_left">婚姻状态</p>
					<p class="base_item_right">{{data.marriageStatus}}</p>
				</div>
				
			</div>
			</div>
			
			<div v-show="!(data.education==''&&data.profession==''&&data.schoolName==''&&data.languageLevel=='')" class="xian"></div>
			
			<div v-show="!(data.education==''&&data.profession==''&&data.schoolName==''&&data.languageLevel=='')" class="base">
				<p class="title">教育背景</p>
			<div class="base_data_content">
				<div v-show="data.education!=''" class="base_item">
					<p class="base_item_left">学历</p>
					<p class="base_item_right">{{data.education}}</p>
				</div>
				<div  v-show="data.profession!=''&&data.profession!='null'" class="base_item">
					<p class="base_item_left">专业</p>
					<p class="base_item_right">{{data.profession}}</p>
				</div>
				<div v-show="data.schoolName!=''&&data.schoolName!='null'" class="base_item">
					<p class="base_item_left">毕业院校</p>
					<p class="base_item_right">{{data.schoolName}}</p>
				</div>
				<div v-show="data.languageLevel!=''" class="base_item">
					<p class="base_item_left">语言能力</p>
					<p class="base_item_right">{{data.languageLevel}}</p>
				</div>
			</div>
			</div>
			
			<div class="xian"></div>
			<div class="base" v-if="data.specialization">
				<div class="fan">
				<p class="fan_title">专业领域</p>
				<p class="fan_title_right">{{data.specialization.artCategoryName}}-{{data.specialization.artCategorySubclass}}</p>
			</div>
			</div>
			
			
			<div  v-show="hobbys" class="xian"></div>
			<div v-show="hobbys" class="base">
				<p class="title">兴趣爱好</p>
			<div class="love_content"  v-if="data.hobby!=null">
				<div v-show="item.hobbyText.length!=0" class="love_item" v-for="item in data.hobby.hobbyInfo">
					<p class="love_item_left">{{item.hobbyFather}}</p>
					<div class="love_item_right">
						<ul>
							<li  v-for="i in item.hobbyText.split(',')">{{i}}</li>
							
						</ul>
					</div>
				</div>	
			</div>
			</div>
			
			
			<div v-show="data.opArtHistory!=null&&data.opArtHistory.artHistory.length != 0" class="xian"></div>
			<div v-show="data.opArtHistory!=null&&data.opArtHistory.artHistory.length != 0" class="base">
				<p class="title">艺术年表</p>
			<div v-if='data.opArtHistory!=null' class="love_content">
				<div class="love_item" v-for="item in data.opArtHistory.artHistory">
					<p class="art_item_left">{{item.artYear}}</p>
					<div class="art_item_right">
						<ul>
							<li>{{item.artEvent}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
			
			
			
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default {
		store,
		data() {
			return {
				data:{},
				
				
				year:''
			}
		},
		methods: {

		},
		computed:{
			hobbys(){
			 if(this.data.hobby!=null){
				
			 let a = 7
			for(var i=0;i<this.data.hobby.hobbyInfo.length;i++){
				if(this.data.hobby.hobbyInfo[i].hobbyText.length == 0){
					a-=1
				}
			};
			if(a<=0){
				return false
			 }
			}else{
				return false
			}
			
		  },
		  
		  pv(){
		  	   let a = '';
		  	   if(this.data.opAddress.pv){a=this.data.opAddress.pv}
		  	   return a
		  },
		  ct(){
		  	return this.data.opAddress.ct
		  },
		  
		},
		mounted() {
			var url=this.$store.state.request_url+"/api/map/user/artUserInfo.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
			this.$http({
				url: this.$store.state.request_url+"/api/map/user/artUserInfo.do?memId="+id+"&ts="+ts,
				method: 'post',
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				body: {
					opId:this.$store.state.worksOpId	
				},
				emulateJSON: false,
				}).then(function(response) {
					
					if(response.body.meta.res=="00000"){
							
// response.body.data.education=(tresponse.body.data.education==null)?'':response.body.data.education
   response.body.data.opSex=(response.body.data.opSex==null)?'':response.body.data.opSex                 
   response.body.data.signature=(response.body.data.signature==null)?'':response.body.data.signature
   response.body.data.opBirthDay=(response.body.data.opBirthDay==null)?'':response.body.data.opBirthDay
   response.body.data.opConstellation=(response.body.data.opConstellation==null)?'':response.body.data.opConstellation
   response.body.data.education=(response.body.data.education==null)?'':response.body.data.education
   response.body.data.profession=(response.body.data.profession==null)?'':response.body.data.profession
   response.body.data.schoolName=(response.body.data.schoolName==null)?'':response.body.data.schoolName
   response.body.data.languageLevel=(response.body.data.languageLevel==null)?'':response.body.data.languageLevel
   response.body.data.introduction=(response.body.data.introduction==null)?'':response.body.data.introduction	    
					    
					    
					    
						
						this.data=response.body.data;
						
					
						
//						if(this.data.opArtHistory.artHistory){
////							
//							//console.log(45)
//						}else{
//							//console.log(12)
//						}
						
						//console.log(this.data,"____________资料________________")
						
						
//						//console.log(this.data.specialization.artCategoryName)					
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
	.base_data{
		margin-top: 0.25rem;
		width: 100%;
		overflow: hidden;
		
	}
	.base{
		margin-left: 0.3rem;
		    /*padding-bottom: 0.3rem;*/
	}
	.title{
		font-size: 0.4rem;
		color: #000000;
		margin-top: 0.3rem;
		font-weight: bold;
	}
	.base_item{
		width: 100%;
		height: 0.5rem;
		margin-top: 0.25rem;
	}
	.base_data_content{
		width: 100%;
		margin-top: 0.25rem;
		padding-bottom: 0.25rem;
	}
	.base_item_left{
		width: 35%;
		height: 100%;
		float: left;
		font-size: 0.3rem;
		color: #D0D0D0;
	}
	.base_item_right{
		width: 60%;
		height: 100%;
		float: left;
		color: #333333;
		font-size: 0.3rem;
	}
	.fan{
		/*margin-top: 0.4rem;*/
		width: 100%;
		/*height: 1rem;*/
		overflow: hidden;
		padding-top: 0.1rem;
    padding-bottom: 0.1rem;
		
	}
	.fan_title{
		width: 35%;
		height: 100%;
		font-size: 0.4rem;
		color: #000000;
		float: left;
		font-weight: bold;
		line-height:1rem;
	}
	.fan_title_right{
		width: 60%;
		height: 100%;
		float: left;
		color: #333333;
		font-size: 0.3rem;
		line-height:1rem;
	}
	.love_content{
		width: 100%;
	}
	.love_item{
		width: 100%;
		overflow:hidden;
		margin-top: 0.25rem;
		margin-bottom: 0rem;
	}
	.love_item_left{
		width: 32%;
		float: left;
		margin-top: 0.1rem;
		font-size: 0.3rem;
		color: #D0D0D0;
	}
	.love_item_right{
		width: 62%;
		float: left;
		margin-right: 2%;
		text-align: center;
	}
	.love_item_right ul li{
		
		float: left;
		border: solid 1px #D0D0D0;
		border-radius: 0.05rem;
		font-size: 0.3rem;
		padding: 0 0.1rem;
		margin-top: 0.1rem;
		margin-left: 0.1rem;
		color: #D0D0D0;
	}
	
	.art_item_left{
		width: 30%;
		float: left;
		font-size: 0.3rem;
		color: #333333;
		font-weight: bold;
	}
	.art_item_right{
		width: 64%;
		float: right;
		text-align: left;
	}
	.art_item_right ul li{
		width: 100%;
		float: right;
		font-size: 0.25rem;
		line-height: 0.6rem;
    	border-bottom: 1px #D0D0D0 SOLID;
		margin-left: 0.1rem;
		
		color: #000000;
		padding-bottom: 0.2rem;
	}
	.xian{
		height: 0.2rem;
		width: 150%;
		/*margin-top: 0.2rem;*/
		background:rgba(247,247,247,1);
	}
</style>