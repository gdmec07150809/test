<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-03-21
    	描述：点击发布
    -->
	<div class="das" style="width: 100%;z-index:900;overflow: hidden;">
		
		<div style="width: 80%;height: 2rem;margin: 1rem 0  0 0.5rem;">
			<p style="font-size: 0.9rem;float:left;">{{ri}}</p>
			<div style="margin-top: 0.25rem;margin-left:0.5rem;float:left;">
				<p style="font-size: 0.3rem;">{{xing}}</p>
				<p style="font-size: 0.3rem;">{{yue}}/{{nian}}</p>
			</div><br />
			<p style="font-size:0.32rem;position: absolute;bottom: 0.3rem;left: 0.3rem;">请选择你需要发布的类型</p>
		</div>
		<div style="width: 100%;overflow: hidden;position: fixed;bottom:1rem;">
			<div id="add_s" style="width: 100%;position:relative;">

				<div id="s1" @click="to_add" class="anniu"><img class="imgs2" src="../../assets/img/icon_announce_art.png" alt="" />
					<p class="p_sx" style="font-size: 0.3rem;">作品</p>
				</div>

				<div id="s2" @click="toDiaries" class="anniu"><img class="imgs2" src="../../assets/img/icon_announce_daily.png" alt="" />
					<p class="p_sx" style="font-size: 0.3rem;">闲情</p>
				</div>

				<div id="s3" @click="to_Publisharticles" class="anniu"><img class="imgs2" src="../../assets/img/icon_announce_article.png" alt="" />
					<p class="p_sx" style="font-size: 0.3rem;">文章</p>
				</div>

				<!--<div id="s4" @click="to_Deeparticle" class="anniu"><img class="imgs2" src="../../assets/img/icon_announce_article.png" alt="" />
					<p class="p_sx" style="font-size: 0.3rem;">深度</p>
				</div>-->
                
                <div @click="to_BS_add" class="anniu" style="">
                	<img class="imgs2" src="../../assets/img/icon_announce_graduate.png" alt="" />
                	 <p class="p_sx" style="font-size: 0.3rem;">毕业季</p>
                </div>   
			</div>

			<div style="width: 100%;overflow: hidden;background:white;margin-top: 0.5rem;">
				<img @click="hui" style="width: 0.5rem;height: 0.5rem;margin-left: 45%;margin-top: 0.3rem;" src="../../assets/img/drawablefffff/icon_announce_delete.png" />
			</div>
		</div>

		<!--<div v-show="xian_s" class="zhe" @touchmove.prevent>
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="width:100%;height: 0.07rem;"></div>
				<p style="    font-size: 0.35rem;margin-top: 0.45rem;">你还没有完善资料，是否立即去完善资料?</p>
				<div style="width:100%;height:1rem;margin-top: 0.56rem;border-top:0.02rem solid #E0E0E0;line-height: 1rem;">
					<div @click="shan_chu" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.38rem;">
						确定
					</div>
					<div @click="shan_s" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.38rem;">
						取消
					</div>
				</div>

			</div>
		</div>-->

        <div v-show="shan" style="width: 100%;height:100%;position:absolute;top: 0;left: 0;z-index:1000;">
        	 <img @click="no_shan" style="width: 0.5rem;position: absolute;left: 0.4rem;top: 0.4rem;z-index: 10;" src="../../assets/img/icon_detail_back.png"/>
        	<img style="width:100%;height:auto;position: fixed;bottom: 0;" src="../../assets/img/wenzhang_s.jpg"/>
        </div>

	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	export default {
		store,
		//		props:['m'],

		data() {
			return {
//				xian_s: false,
				shan:false,
			}
		},
		methods: {
			no_shan(){
				this.shan = false
			},
			shan_chu() {
//				this.$store.state.is_bottom = false;
//				this.$router.push({
//					path: '/regiter_information'
//				});
			},
			shan_s(){
//				this.xian_s = false
			},

			hui() {
				if(this.$store.state.home_tai == 1) {

					this.$router.push({
						path: '../slider'
					});
				} else if(this.$store.state.home_tai == 2) {
					this.$router.push({
						path: '../square'
					});

				} else if(this.$store.state.home_tai == 3) {
					this.$router.push({
						path: '../message'
					});

				} else if(this.$store.state.home_tai == 4) {
					this.$router.push({
						path: '../myspace'
					});
				}

			},
			to_BS_add(){
				        this.$store.state.img_box.picUrl = '';//图片
						this.$store.state.Data_set.The_name_of_the_work = '';//标题
						this.$store.state.Data_set.Type_work = '';//类型
						this.$store.state.Data_set.Version_number = '';//版数
						this.$store.state.Data_set.nian_dai = '';//年份
						this.$store.state.Data_set.cai_zhi = '';//材质
						this.$store.state.Data_set.ti_cai = '';//题材
						this.$store.state.Data_set.chang = '';//长
						this.$store.state.Data_set.kuan = '';//宽
						this.$store.state.Data_set.gao = '';//高
						this.$store.state.Data_set.Description_of_creation = '';//作品内容
						this.$store.state.nian_ss = '';//毕业年
						this.$store.state.yuan_xiao ='';//院校
						this.$store.state.detailed_information.education='';//学历
						this.$store.state.z_y = '';//专业
						
				        this.$router.push({
						    path: '../BS_add_before'
					    });
			},
			to_add() {
//				if(localStorage.pan_duan_s != 2){
					this.$router.push({
						path: '../add'
					});
//				} else {
//					this.xian_s = true
//				}
			},
			
			toDiaries() {
				this.$router.push({
					path: '../Diaries'
				});

			},
			to_Publisharticles() {
				this.shan = true
			},
			to_Deeparticle() {
				this.$router.push({
					path: '../Deeparticle'
				});

			},
			gonghua() {
				let a = document.getElementById('add_s')
				let du = document.documentElement.clientHeight / document.documentElement.clientWidth

				if(du >= 1.7 && du < 2.0) {
					a.style.marginTop = '7rem'
				} else if(du <= 1.7 && du > 1.6) {
					a.style.marginTop = '5.7rem'
				} else if(du <= 1.6 && du > 1.5) {
					a.style.marginTop = '5.5rem'
				} else if(du >= 2.0 && du < 2.1) {
					a.style.marginTop = '8.5rem'
				} else if(du > 2.1) {
					a.style.marginTop = '10rem'
				} else if(du < 1.4) {
					a.style.marginTop = '3.5rem'
				}
			},
			dan_ru(){
				
				
			},
			
		},
		mounted() {
               this.dan_ru()
			if(this.$store.state.data.memId == undefined || this.$store.state.data.memId == "" || this.$store.state.data.memId == null) {

				this.$router.push({
					path: '/swiper2'
				});
			}
			this.$store.state.is_bottom = false;
		},
		computed: {
			nian(){
				return new Date().getFullYear();
			},
			yue() {
				return new Date().getMonth() + 1
			},
			ri() {
				return new Date().getDate()
			},
			xing() {
				return(new Date().getDay() == 1) ? '星期一' : ((new Date().getDay() == 2) ? '星期二' : ((new Date().getDay() == 3) ? '星期三' : ((new Date().getDay() == 4) ? '星期四' : (new Date().getDay() == 5) ? "星期五" : ((new Date().getDay() == 6) ? '星期六' : ((new Date().getDay() == 7) ? '星期天' : '')))))
			}
		}
	}
</script>

<style scoped="scoped">
	.p_sx{
		margin-top: 1.3rem;
	}
	.anniu_s{
		width: 1.2rem;
		height: 2rem;
		background: red;
		text-align: center;
	}
	
	.anniu {
		width: 1.2rem;
		height: 2rem;
		/*background: #333333;*/
		/*border-radius: 50%;*/
		float: left;
		margin-left: 0.53rem;
		/*display: none;*/
		transition: 1.5s;
		position: relative;
		text-align: center;
	}
	
	.das {
		background: rgba(255, 255, 255, 0.95)
	}
	
	.imgs2 {
		width:100%;
		
		transition: 1.5s;
		position: absolute;
		/*left: 0.05rem;*/
		left: 0;
	    /*top:3.5rem;*/
	    z-index: 500;
	}
	
	.zhe {
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 9994;
		background: rgba(0, 0, 0, .6);
	}
	
	.zhe_1 {
		width: 5rem;
		height: 3.2rem;
		background: white;
		margin: 0 auto;
		border-radius: 0.2rem;
		margin-top: 6rem;
		text-align: center;
	}
</style>