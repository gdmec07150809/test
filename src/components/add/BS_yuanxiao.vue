<template>
	<div id="app">
		<div style="width: 100%;height: 1rem;position:fixed;top:0;left: 0;z-index: 9992;text-align:center;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<span  @click="hui" style="font-size:0.4rem;color: #2E3135;position: absolute;left:0.3rem;top: 0.07rem;">
			<img style="width: 0.3rem;margin-right: 0.1rem;" src="../../assets/img/zuo.png" alt="" /></span>
			
	   		<p style="font-size: 0.38rem;line-height: 1rem;float:left;margin-left: 2.9rem;">选择院校</p>
	   		
	   		<p @click="baocun" style="font-size:0.32rem;float:right;margin-right: 0.3rem;line-height: 1rem;color:rgb(255, 157, 0);">保存</p>
		
	    </div><div style="height:0.88rem;"></div>
		<div @click="click_name(i,index)" v-for="(i,index) in active" style="width: 100%;height: 1rem;border-bottom: 0.01rem solid #E0E0E0;">
			  <p style="font-size: 0.3rem;line-height: 1rem;float:left;margin-left: 0.3rem;">{{i.dictName}}</p>
			  <img v-show="i.dictName==ac_name" style="float:right;width:0.4rem;margin-top:0.27rem;margin-right: 0.35rem;" src="static/img/icon_my_choose.png"/>
		</div>
		
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default{
		store,
		data(){
			return{
				active:[],
				ac_name:'',
			}
		},
		mounted(){
			this.ac_name = this.$store.state.yuan_xiao 
			this.huoqu()
		},
		methods:{
			baocun(){//点击保存
				this.$store.state.yuan_xiao = this.ac_name;
				this.$router.push({
								path: '../BS_add_before'
							});
			},
			click_name(i,index){
				this.ac_name = i.dictName;
			},
			hui(){//点击返回
				 this.$router.push({
								path: '../BS_add_before'
							});
			},
			huoqu(){//获取标签数据
				var url = this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do?memId=" + id + "&ts=" + ts,
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",
						"sIgn": sign
					},
					body: {
						parentId:'b447420f7b344f299329cc0f40bfef4a'
					},
					emulateJSON: false,
				}).then(function(response){
					if(response.body.meta.res == "00000"){
						 this.active = response.body.data
					} 
				}).catch(function(err){
					console.log(err)
				})
			},
		},
	}
	
</script>

<style scoped="scoped">
	#app{
		width:100%;
		overflow: hidden;
	}
</style>