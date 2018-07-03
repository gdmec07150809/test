<template>
	<div id="app" v-show="e.is_report" @touchmove.prevent>
		<div  @click="cancel" style="width: 100%;height: 18.7rem;position:fixed;top: 0;left: 0;background:rgba(0,0,0,0.4);z-index: 10;" >
		
		</div>
		<div class="dia">
		  
			<p class="report_class" @click="reportTap">举报</p>
			<div class="xian" ></div>
			<p @click="cancel" class="cancel">取消</p>
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	export default {
		
		data() {
			return {
				 xl:false,
				 
				 action_value: [{
						name: '发布不良信息',
						method: this.x1
					},
					{name: '存在侵权行为',
					method: this.x2},
					{
						name: '存在欺诈行为',
						method: this.x3
					}]
				
			}
		},
        props:['f'],
		methods: {
			cancel(){
				this.f.is_report = false
			},
			reportTap(){
				this.xl=true;
				this.f.is_report = false
				
			},
			x1(){
				var value="发布不良信息"
				//console.log("举报内容:"+value)
				this.xl=false;
				this.f.is_report = false
			},
			x2(){
				var value="存在侵权行为"
				//console.log("举报内容:"+value)
				this.xl=false;
				this.f.is_report = false
			},
			x3(){
				var value="存在欺诈行为"
				//console.log("举报内容:"+value)
				this.xl=false;
				this.f.is_report = false
				},
			
		}
	}
</script>
</script>

<style scoped="scoped">
	input,textarea{
		outline: none;
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
	.dia{
		position:fixed;
		bottom: 0;
		z-index: 10;
		height: 2rem;
		background-color: #fff;
		width: 100%;
	}
	.report_class{
		height: 1rem;
		line-height: 1rem;
		color:rgba(51,51,51,1);
		font-size: 0.32rem;
		text-align: center;
	}
	.cancel{
		height: 1rem;
		line-height: 1rem;
		color:rgba(51,51,51,1);
		font-size: 0.32rem;
		text-align: center;
	}
	
	.down{
		width: 100%;
		height: 0.01rem;
		margin-top: 0.2rem;
		background:rgba(247,247,247,1);
	}
	.xian{
		height: 0.2rem;
		width: 100%;
		background:rgba(247,247,247,1);
	}
</style>