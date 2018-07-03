<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-21
    	描述：广场页面
    -->
	<div>
		<div style="width: 100%;">
			<div class="box_top">

				<div class="swiper-container">
					<div class="swiper-wrapper">
						
						<div v-for="(i,index) in top_img"  class="swiper-slide">
							<img style="width:100%;height:100%;" :src="i.picUrl" alt="" />
						</div>
						
					</div>
					<!-- 如果需要分页器 -->
					<div class="swiper-pagination"></div>
				</div>
			</div>
			
			<div style="margin-top: 0.35rem;" class="fen">
				<img class="img_b" src="../../assets/img/drawable-xxxhdpi/bg_ground_top.png"/>
				
				<div style="position:absolute;top:0;">
				<div class="boxs">
					<img :src="renqi[0].picUrl" alt="" />
					<img :src="renqi[1].picUrl" alt="" />
					<img :src="renqi[2].picUrl"alt="" />
				</div>
				<div @click="to_Popularity_list" style="width: 94.5%;height: 1.1rem;margin: 0 auto;">
					<p style="font-size: 0.45rem;color: white;">人气榜</p>
					<p style="font-size: 0.27rem;color: white;">最热的作品都在这里</p>
					<i style="font-size: 0.6rem;color: white;float: right;margin-top:-0.85rem;" class="fa fa-angle-right"></i>
				</div>
			    </div>
			    
			</div>
			
			<div @click="to_Art_information" class="fen">
				<img class="img_b" src="../../assets/img/drawable-xxxhdpi/bg_ground_news.png"/>
				
				<div style="position:absolute;top:0;">
				<div class="boxs">
					<img :src="yisu[0].picUrl" alt="" />
					<img :src="yisu[1].picUrl" alt="" />
					<img :src="yisu[2].picUrl" alt="" />
				</div>
				<div style="width: 94.5%;height: 1.1rem;margin: 0 auto;">
					<p style="font-size: 0.45rem;color: white;">艺术资讯</p>
					<p style="font-size: 0.27rem;color: white;">艺术界新闻资讯聚焦</p>
					<i style="font-size: 0.6rem;color: white;float: right;margin-top:-0.85rem;" class="fa fa-angle-right"></i>
				</div>
			</div>
			</div>
			
			
		</div>
	</div>
</template>

<script>
	import Swiper from '../../../static/js/swiper.js'
	export default {
		data(){
			return{
				top_img:'',
				renqi:[{picUrl:''},{picUrl:''},{picUrl:''},],
				yisu:[{picUrl:''},{picUrl:''},{picUrl:''},],
				
			}
		},
		methods:{
			top_swip(){//广场首页顶部广告轮播
				this.$http({
				url: this.$store.state.request_url+"/api/advertisingApi/rotateAds.do",
				headers: {
					"content-type": "application/json;charset=UTF-8"
				},
				emulateJSON: false,
				method: 'post',
				body:{
					memId:'6c6abbefa7da4a5cbe5168a73f376d5a',
					parentId:'684589bb5b0e40059ceb41d71be23d8d',
				}
			}).then(function(response) {
				   
				if(response.body.meta.res == '00000'){
                    //console.log(response.body.data)
                    
                    this.top_img = response.body.data
                     
                    
				}
			}).catch(function(err){
				//console.log(err)
			 })
			
			
			
			this.$http({
				url: this.$store.state.request_url+"/api/mapPlazaManager/popularityAdvisory.do",
				headers: {
					"content-type": "application/json;charset=UTF-8"
				},
				emulateJSON: false,
				method: 'post',
				body:{
					artFlag:'1'
				}
			}).then(function(response){
				if(response.body.meta.res == '00000'){
                    this.renqi = response.body.data
                    //console.log(this.renqi,'人气')
				}
			}).catch(function(err){
				//console.log(err)
			 })
			
			
			
			this.$http({
				url: this.$store.state.request_url+"/api/mapPlazaManager/popularityAdvisory.do",
				headers: {
					"content-type": "application/json;charset=UTF-8"
				},
				emulateJSON: false,
				method: 'post',
				body:{
					artFlag:'2'
				}
			}).then(function(response){
				if(response.body.meta.res == '00000'){
                    this.yisu = response.body.data
                    //console.log(this.yisu,'艺术')
				}
			}).catch(function(err){
				//console.log(err)
			 })
			
			
			
		 },
		 
		 
		 
		 
		 
		to_Art_information(){//跳转艺术资讯
			
				this.$router.push({
						path: '../Art_information'
						});
			
		},
		to_Popularity_list(){
			this.$router.push({
						path: '../Popularity_list'
						});
			
			this.$store.state.Return_to_return=4
			
		},
		 
		top_swipers(){
			
		},
		 
		},
		mounted() {
			
		 this.top_swip()
		 
		  new Swiper('.swiper-container', { //轮播图事件
//			 	     initialSlide :0,
//                   loop:true,
			 	    autoplay:2000,
				    slidesPerView : 1.4,
                    centeredSlides : true,
                    spaceBetween : 130,                
                    preventLinksPropagation : true,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper 
observeParents:false,//修改swiper的父元素时，自动初始化swiper 
onSlideChangeEnd: function(swiper){ 
　　　swiper.update();  
　　　mySwiper.startAutoplay();
　　   mySwiper.reLoop();  
}
                     

			})
		 
		 
		 
//		 this.top_swipers()
		
		},
		computed:{
			top_im(){
			     return this.top_img
			}
		}
	}
</script>

<style scoped="scoped">
	@import url("../../assets/css/swiper.css");
	.box_top {
		width: 100%;
		height: 3.9rem;
		font-size: 0.3rem;
		/*margin-top: 0.1rem;*/
		margin-top: 0.2rem;
	}
	
	.swiper-container {
		width: 100%;
		height: 100%;
		
	}
	.swiper-slide {
		width: 5rem;
		/*margin-right: 0.5rem;*/
		height: 3.6rem;
		/*text-align: center;*/
		/*line-height: 3.6rem;*/
		border-radius: 0.1rem;
		overflow: hidden;
		-moz-box-shadow:0em 0.3rem 0.3rem #C4C4C4; -webkit-box-shadow:0em 0.3rem 0.3rem #C4C4C4; box-shadow:0em 0.1rem 0.4rem #C4C4C4;
		
	}
	.swiper-pagination {
	     color: white;
	}
	.fen{
		width:7.10rem;
        height:3.40rem; 
        background: lightskyblue;
        margin: 0 auto;
		margin-bottom: 0.35rem;
		border-radius: 0.2rem;
		-moz-box-shadow:0em 0.3rem 0.3rem #C4C4C4; -webkit-box-shadow:0em 0.3rem 0.3rem #C4C4C4; box-shadow:0em 0.1rem 0.4rem #C4C4C4;
		position: relative;
		overflow: hidden;
	}
	.boxs{
		width: 100%;
		height: 1.6rem;
		margin-bottom: 0.4rem;
	}
	.boxs img{
		width: 2.16rem;
		height: 100%;
		float: left;
		margin-left: 0.15rem;
		margin-top: 0.22rem;
		border-radius: 0.2rem;
	}
	.img_b{
		width: 100%;
		height: 100%;
	}
</style>