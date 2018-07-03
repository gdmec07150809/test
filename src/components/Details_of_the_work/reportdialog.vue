<template>
	<div id="app" v-show="f.is_report" @touchmove.prevent>
		<div  @click="cancel" style="width: 100%;height: 18.7rem;position:fixed;top: 0;left: 0;background:rgba(0,0,0,0.4);z-index: 10;" >
		
		</div>
		<div class="dia">
		  
			<p class="report_class" @click="reportTap">举报</p>
			<div class="xian" ></div>
			<p @click="cancel" class="cancel">取消</p>
		</div>
		<div class="dia2" v-show="is_report_stauts">
			<p class="report_class" @click="x1('1')">发布不良信息</p>
			<div style="width: 100%;height: 2px;background:rgba(247,247,247,1);" ></div>
		 	 <p class="report_class" @click="x1('2')">存在侵权行为</p>
		 	 <div style="width: 100%;height: 2px;background:rgba(247,247,247,1);"></div>
			<p class="report_class" @click="x1('3')">存在欺诈行为</p>
			<div class="xian" ></div>
			<p @click="cancel_show" class="cancel">取消</p>
		</div>
	</div>
	
</template>

<script>
	import store from '../../vuex/store.js'
	import { Toast } from 'mint-ui'
	import md5 from 'js-md5';
	export default {
		
		data() {
			return {
				is_report_stauts:false,
				report_content:['发布不良信息','存在侵权行为','存在欺诈行为']

			}
		},
        props:['f'],
		methods: {
			cancel(){
				this.f.is_report = false
			},
			cancel_show(){
				this.is_report_stauts=false;
			},
			reportTap(){
			
				//this.f.is_report = false;
				this.is_report_stauts=true;
				
			},
			x1(e){
				var value='';
				
				switch(e){
					case '1':
					
						value="发布不良信息"
					break;
					case '2':
					
						value="存在侵权行为"
					break;
					case '3':
					
						value="存在欺诈行为"
					break;
				}
				
				var url=this.$store.state.request_url+"/api/mapPlazaManager/addReportAnAbuse.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign=md5(url+id+token+ts)
		        var that=this;
				this.$http({
					url: this.$store.state.request_url+"/api/mapPlazaManager/addReportAnAbuse.do?memId="+id+"&ts="+ts,
					method: 'post',
					headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
					},
					body: {
						artId: this.$store.state.report_works.artId,
						informerId:id,
						content:value
					},
					emulateJSON: false,
					}).then(function(response) {
						
						
						
						if(response.data.meta.res=="00000"){
							Toast({
											message: '举报成功',
											position: 'middle',
											duration: 2000
										});
				
							//console.log("举报内容:"+value)
							that.is_report_stauts=false;
							that.f.is_report = false
						}else{
							Toast({
											message: response.data.meta.msg,
											position: 'middle',
											duration: 2000
										});
				
							//console.log("举报内容:"+value)
							that.is_report_stauts=false;
							that.f.is_report = false
						}
						
					}).catch(function(err) {
							//console.log(err)
						
					})
				
				
				
				
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
		height: 2.2rem;
		background-color: #fff;
		width: 100%;
	}
	.dia2{
		position:fixed;
		bottom: 0;
		z-index: 10;
		height: 4.2rem;
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