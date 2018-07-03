<template>
	<!--
        	作者：672423400@qq.com
        	时间：2018-06-7
        	描述：广场---选择版块
        -->
	<div>
		<div style="width: 100%;height: 1rem;z-index: 9992;text-align:center;position:fixed;top:0;left:0;line-height: 1rem;border-bottom: 0.02rem solid #f1f1f1;background: white;">

			<p style="font-size: 0.38rem;line-height: 1rem;float:left;margin-left: 2.9rem;color: #333333;">请选择版块</p>

			<p style="font-size:0.32rem;float:right;margin-right: 0.3rem;line-height: 1rem;color:#CCCCCC;" @click="hui">取消</p>

		</div>

		<div class="big_content">
			<div style="height: 1rem;">
				<div style="line-height:1rem;font-size:0.36rem;font-weight: bold;float: left;">版块选择</div>
				<div style="line-height:1rem;font-size:0.3rem;color: #999999;float: left;">（最多选择3个）</div>
			</div>
			<div class="item_class" >	
				<ul class="small_item_content">
					<li class="small_item" :class="{small_item_active:j.id}" v-for=" (j,jndex) in data_yuan" @click="seleced_check(jndex,j)">
						{{j.dictName}}
					</li>
				</ul>
			</div>
		</div>

		<div class="sumbit" @click="confrim">

			<div class="sub">
				<p>确认选择</p>
			</div>

		</div>

	</div>
</template>

<script>
	import store from '../../../vuex/store.js'
	import { Toast } from 'mint-ui';

	import md5 from 'js-md5';
	export default {
		store,
		components: {

		},
		data() {
			return {
				data_yuan: [],
				selected_arr: [], //临时存储选择数据，最多不能超过3个
				is_all: true
			}
		},
		methods: {
			hui() {
//				this.$store.state.tr = 2;
				
				this.$router.push({
						path: '../square'
					})
				
//				if(this.$store.state.tr==2){
////					this.$store.state.tr = 2;
//					this.$router.push({
//						path: '../square/depth'
//					})
//				}else if(this.$store.state.tr==1){
////					this.$store.state.tr = 1;
//					this.$router.push({
//						path: '../square/The_headlines'
//					})
//				}
				

			},
			confrim(){
//				this.$store.state.tr = 2;
					this.$store.state.if_depth_articleItem=this.selected_arr;
					
					this.$router.push({
						path: '../square'
					})
					
					//console.log(this.$store.state.if_articleItem,"已选择")
//					if(this.$store.state.tr==2){
////					this.$store.state.tr = 2;
//					this.$router.push({
//						path: '../square/depth'
//					})
//				}else if(this.$store.state.tr==1){
////					this.$store.state.tr = 1;
//					this.$router.push({
//						path: '../square/The_headlines'
//					})
//				}
			},
			getZhuanye() {
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do",
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",

					},
					body: {

						parentId: "81fadca55fd54a3fa8ad76e4ae797cbc",
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {

						
						/**处理数据*/
						var array = [];
							var all={};
								all.id=true;
								all.dictName="全部";
								array.push(all)
								
						var n_arr= response.body.data;
						for(var j = 0; j < n_arr.length; j++) {
								n_arr[j].id=false;
								array.push(n_arr[j])
							
						}
						
						if(this.$store.state.if_depth_articleItem.length>0){
							array[0].id=false;
							this.selected_arr=this.$store.state.if_depth_articleItem;
							for(var i=0;i<this.$store.state.if_depth_articleItem.length;i++){
								
								for(var j=0;j<array.length;j++){
									if(this.$store.state.if_depth_articleItem[i]==array[j].dictName){
										array[j].id=true
									}
								}
							}
						}
						//console.log(response.body.data,"1119999999999")	
						this.data_yuan = array;
						//console.log(this.data_yuan,"新数据")
						//this.eye=this.title[0].dataDictionary;

					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			/*选择事件*/
			seleced_check(jndex, j) {
				
					if(j.dictName == "全部") {
					if(j.id) {
						if(this.selected_arr.indexOf(j.dictName) ==-1) {
							this.selected_arr.push(j.dictName);
						}
					} else {
						this.selected_arr = [];
						this.selected_arr.push(j.dictName);
						this.data_yuan[jndex].id = true;
						for(var i = 1; i < this.data_yuan.length; i++) {
							this.data_yuan[i].id = false;
						}
					}

				} else {
					if(this.data_yuan[0].id) {
						if(this.selected_arr.indexOf(this.data_yuan[0].dictName) > -1) {
							this.selected_arr = [];
						}
						this.data_yuan[0].id = false;
						this.data_yuan[jndex].id = !this.data_yuan[jndex].id;
						this.selected_arr.push(j.dictName);
					} else {
						
						if(this.data_yuan[jndex].id == false) {
//							if(this.selected_arr.length == 3) {
//								Toast({
//									message: '最多只能选择3个',
//									position: 'middle',
//									duration: 2000
//								});
//							} else {

								this.selected_arr.push(j.dictName);
								this.data_yuan[jndex].id = !this.data_yuan[jndex].id;
							//}
						} else {
							for(var i = 0; i < this.selected_arr.length; i++) {
								if(this.selected_arr[i] == j.dictName) {
									this.selected_arr.splice(i, 1);
									if(this.selected_arr.length==0){
										this.data_yuan[0].id=true;
										this.selected_arr.push(this.data_yuan[0].dictName);
									}
								}
							}
							this.data_yuan[jndex].id = !this.data_yuan[jndex].id;
						}

					}
				}

				//console.log(this.selected_arr, "选择")
			},
			/**选择全部*/
			all() {
				if(this.is_all == false) {
					this.selected_arr = [];
					var all={};
						all.id=true;
						all.dictName="全部";
						this.selected_arr.push(all.dictName);
					for(var j = 0; j < this.data_yuan.length; j++) {
						this.data_yuan[j].id = false
					}
						this.is_all = true;
				}
				//console.log(this.selected_arr,"11111111")
			
			}
		},

		mounted() {
			//console.log(this.$store.state.if_depth_articleItem,"深32133333333333333度")
			if(this.$store.state.if_depth_articleItem.length > 0) {
				this.is_all=false;
			}else{
				this.is_all=true;
				var all={};
				all.id=true;
				all.dictName="全部";
				this.selected_arr.push(all.dictName)
			}
			this.getZhuanye(); //获取列表数据
			this.$store.state.is_bottom = false;
		},
		created(){
			console.log("进来")
		}

	}
</script>

<style scoped="scoped">
	.big_content {
		width: 95%;
		margin: 1.4rem auto 0;
		padding-bottom: 1.2rem;
	}
	
	.all_active {
		width: 1.5rem;
		height: 0.64rem;
		background-color: #FF9d00;
		color: #fff;
		font-size: 0.28rem;
		text-align: center;
		border-radius: 0.08rem;
		line-height: 0.64rem;
	}
	
	.all {
		width: 1.5rem;
		height: 0.64rem;
		font-size: 0.28rem;
		text-align: center;
		border-radius: 0.08rem;
		line-height: 0.64rem;
		border: #EAEAEA solid 2px;
	}
	
	.item_class {
		width: 100%;
		overflow: hidden;
		margin-top: 0.3rem;
	}
	
	.item_title {
		font-size: 0.34rem;
		font-weight: bold;
	}
	
	.small_item_content {
		width: 100%;
		overflow: hidden;
	}
	
	.small_item {
		width: 1.5rem;
		float: left;
		text-align: center;
		font-size: 0.28rem;
		height: 0.64rem;
		line-height: 0.64rem;
		margin: 0 0.25rem 0.4rem 0;
		color: #333333;
		border-radius: 0.08rem;
		border: #EAEAEA solid 2px;
	}
	
	.small_item_active {
		width: 1.5rem;
		float: left;
		text-align: center;
		font-size: 0.28rem;
		height: 0.64rem;
		margin: 0 0.25rem 0.4rem 0;
		border-radius: 0.08rem;
		line-height: 0.64rem;
		background-color: #FF9d00;
		color: #fff; 
		border: #EAEAEA solid 2px;
	}
	
	ul {
		list-style: none;
	}
	
	.sumbit {
		width: 100%;
		height: 1rem;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
	}
	
	.sub {
		width: 80%;
		margin-left: 10%;
		border-radius: 0.1rem;
		background-color: #000000;
	}
	
	.sumbit p {
		text-align: center;
		color: #fff;
		font-size: 0.36rem;
		line-height: 0.9rem;
	}
</style>