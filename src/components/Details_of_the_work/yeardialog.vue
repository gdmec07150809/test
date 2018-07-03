<template>
	<div id="app" v-show="e.is_reply" >
		<div  @click="cancel" style="width: 100%;height: 8.3rem;position:fixed;top: 0;left: 0;background:rgba(0,0,0,0.4);z-index: 1000;" >
		
		</div>
		<div class="dia">
		  		<div style="margin-bottom:1rem;">
		  			<div v-for="item in year_array" >
		  				<p class="report_class" @click="reportTap(item)">{{item}}</p>
						<div class="xian" ></div>
		  			</div>
		  		</div>
		  		
		</div>
		
		 <div class="cancel">
				<p @click="cancel" style="text-align: center;">取消</p>
			</div>
	</div>
	
</template>

<script>
	import store from '../../vuex/store.js'
	export default {
		data() {
			return {
				is_report_stauts:false,
				year_array:[]
			}
		},
        props:['e'],
		methods: {
			cancel(){
				this.e.is_reply = false
			},
			reportTap(item){
				this.$store.state.Data_set.nian_dai=item;
				this.e.is_reply = false;
				this.$parent.dd();
			},
			dateDetail(){
				var startTime=(new Date("1960-01-01")).getFullYear();
				var endTime=(new Date()).getFullYear();
				for(var i=endTime;i>=startTime;i--){
					this.year_array.push(i);
				}
			}
		},
		created(){
				this.dateDetail();//处理时间1990到至今
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
		bottom: 1.2rem;
		z-index: 1000;
		height: 5.2rem;
		overflow-y: auto;
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
		height: 1.2rem;
		line-height: 1rem;
		color:rgba(51,51,51,1);
		font-size: 0.32rem;
		text-align: center;
		background-color: #fff;
		width: 100%;
		position: fixed;
		border-top:#f1f1f1 0.2rem solid ;
		bottom: 0;
		z-index: 1000;
	}
	
	.down{
		width: 100%;
		height: 0.01rem;
		margin-top: 0.2rem;
		background:rgba(247,247,247,1);
	}
	.xian{
		height: 0.02rem;
		width: 100%;
		background:rgba(247,247,247,1);
	}
</style>