<template>
	<div style="width: 100%;height: 13.33rem;position: relative;z-index: 300;">
       
       <div style="width: 100%;height: 13.33rem;position:absolute;z-index: 300;">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div style="" class="swiper-slide">
					<img style="width:100%;height:100%;float:left;" src="../../static/img/wx1.jpg" alt="" />
				</div>
				
				<div style="" class="swiper-slide">
					<img style="width:100%;height:100%;float:left;" src="../../static/img/wx2.jpg" alt="" />
				</div>
				
				<div  @touchmove='tiao'  style="" class="swiper-slide">
					<img   style="width:100%;height:100%;float:left;" src="../../static/img/wx3.jpg" alt="" />
				</div>
                         
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>
		</div>
       </div>

	</div>
</template>

<script>
	import store from '../vuex/store.js'
	import Swiper from '../../static/js/swiper.js'
	export default {
		store,
		methods: {
			swipers() {
				new Swiper('.swiper-container', {
//					direction: 'vertical',
					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination',
					},
                 
				})
			},
			
			tiao(event){
				let ev = ev||event
//				//console.log(ev.touches[0].clientX)
				if(ev.touches[0].clientX<650){
					
					//console.log(11111)
//					window.location = '/#/home'
					localStorage.yidao = 1
					
					this.$store.state.yidao = localStorage.yidao
					localStorage.swipers=2
					this.$router.push({
						  path: '../slider'
						});
						
				}
				
			},
	
		},
		mounted() {
//			if(localStorage.memId == undefined || localStorage.memId == "" || localStorage.memId == null){
//				//console.log("----------")
//				this.$router.push({
//					path: '/swiper2'
//				});
//				//this.dal = true
//			}else{
//				this.$router.push({
//					path: '/slider'
//				});
//			}
			
			
            this.swipers()
		},
		created(){
			

		}
	}
</script>

<style scoped="scoped">
	@import url("../assets/css/swiper.css");
	.swiper-slide{
		width: 100%;
		height: 13.34rem;
	}
</style>