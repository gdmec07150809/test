<template>
	<div @touchstart='tiao_s' @touchmove='tiao' style="width:100%;position: fixed;top:2rem;">
		<!--
        	作者：2443611475@qq.com
        	时间：2018-06-08
        	描述：毕业季，三级父组件
        -->
		<div style="width: 100%;float: left;padding-bottom: 0.1rem;">
			<div style="width: 100%;height:1rem;line-height: 1rem;">
				<span @click="js1" :class="{spans:act.noa1,spans_to:act.noe1}" style="">热门榜</span>
			    <span @click="js2" :class="{spans:act.noa2,spans_to:act.noe2}" style="margin-left: 0.5rem;">热议榜</span>
			    
			    <p v-show='dads!=true' @click="to_bx" class="p_x">设置筛选</p>
			</div>
			<div @click="to_bx" v-show="dads" class="img_bottom" style="width:90%;height: 0.6rem;float: left;">
				 <div class="btn_s">{{(yer=='')?'全部年份':yer}}</div>
				<div class="btn_s">{{(xuey=='')?'全部院校':xuey}}</div>	
				<div class="btn_s">{{(lei==''||lei=='全部')?'全部类型':lei}}</div>
			</div>
			<img @click="to_bx" v-show="dads" class="img_bottom" src="../../assets/img/icon_addtitle.png" alt="" />
			
		</div>
		   <img @click="to_tou" class="img_posi" src="../../assets/img/zl/assets-img-zl.png" alt="" />
		<!--<div style="width:100%;background:white;padding-bottom: 1.1rem;">-->
				<router-view></router-view>
		<!--</div>-->
		
	</div>
</template>

<script>
	import router from '../../router/index.js'
	export default{
		router,
		data(){
			return{
				dads:true,
				act:{noa1:true,noe1:false,noa2:true,noe2:false}
			}
		},
		mounted(){
			this.$store.state.rq_box = []
			if(this.$store.state.BS_gs==0){
				this.js1()
			}else if(this.$store.state.BS_gs==1){
				this.js2()
			}
			
			if(localStorage.yer_sss==undefined){
				this.dads=false
			}
			
		},
		beforeCreated(){
			
		},
		
		computed:{
			yer(){
				return localStorage.yer_sss
			},
			xuey(){
				return localStorage.xuey_sss
			},
			lei(){
				return localStorage.lei_sss
			}
			
		},
		
		methods:{
			tiao_s() {
				let ev = ev || event
				this.diyix = ev.touches[0].clientX;
				this.diyiy = ev.touches[0].clientY;
			},
			tiao(event) {
				let ev = ev || event
				let dierx = ev.touches[0].clientX;
				let diery = ev.touches[0].clientY;
				var cdx = dierx - this.diyix
				var cdy = diery - this.diyiy
				let box_to = document.getElementsByClassName('box')
				if(Math.abs(cdx) < Math.abs(cdy) && cdy < 0) {
				  if(localStorage.yer_sss!=undefined){
				  	$(".img_bottom").css("display", "none");
				   }
				} else {
				  if(localStorage.yer_sss!=undefined){
				  	$(".img_bottom").css("display", "block");
				  }
				}
			},
			
			to_tou(){//跳转投票页
				router.replace({path:'/BS_stack'})
			},
			
			to_bx(){
				router.replace({path:'/BS_sx'})
			},
			js1(){
				this.$store.state.BS_gs=0
				this.act.noa1=false;this.act.noe1=true; this.act.noa2=true;this.act.noe2=false;
				 router.replace({path:'../BS_Graduation_season/BS_remen'})
			},
			js2(){
				this.$store.state.BS_gs=1
				this.act.noa2=false;this.act.noe2=true; this.act.noa1=true;this.act.noe1=false;
			    router.replace({path:'../BS_Graduation_season/BS_reyi'})
			},
		}
	}
</script>

<style scoped="scoped">
	.img_posi{
		width: 1.5rem;
		/*height: 1.3rem;*/
		position: fixed;
		right: 0rem;
		bottom: 2rem;
		z-index:200;
		/*border: 0.01rem solid white;*/
	}
	.img_bottom{
		width: 0.7rem;
    float: right;
     margin-right: 0rem; 
    margin-top: 0.15rem;
	}
	.btn_s{
		padding: 0.03rem 0.15rem;
		background: #F5F4F7;
		border-radius: 0.07rem;
		float: left;
		margin-left: 0.25rem;
		font-size: 0.24rem;
		margin-top: 0.07rem;
	}
	.p_x{
		font-size: 0.27rem;
		line-height: 1rem;
		float: right;
		margin-right: 0.19rem;
		color: #CCCCCC;
	}
	.spans{
		font-size: 0.4rem;
		float: left;
		font-weight: 600;
		margin-left: 0.25rem;
		color: #333333;
	}
	.spans_to{
		font-size: 0.4rem;
		float: left;
		font-weight: 600;
		margin-left: 0.25rem;
		color:#FF9A2B;
	}
	/*.router-link-active{color:#333333;font-weight:600;}*/
</style>