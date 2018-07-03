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
			<div class="all" :class="{all_active:is_all}" @click="all">选择全部</div>

			<div class="item_class" v-for=" (i,index) in data_yuan">
				<p class="item_title">{{i.dictName}}</p>
				<ul class="small_item_content">
					<li class="small_item" :class="{small_item_active:j.id}" v-for=" (j,jndex) in i.dataDictionary" @click="seleced_check(index,jndex,j)">
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
	import store from '../../vuex/store.js'
	import { Toast } from 'mint-ui';

	import md5 from 'js-md5';
	export default {
		store,
		components: {

		},
		data() {
			return {
				data_yuan: [],
				selected_arrs: [], //临时存储选择数据，最多不能超过3个
				is_all: true
			}
		},
		methods: {
			hui() {
				this.$store.state.tr = 0
				this.$router.push({
					path: '../square/Popularity_list'
				})

			},
			confrim(){
				this.$store.state.if_item=this.selected_arrs;
				this.$store.state.tr = 0
				this.$router.push({
					path: '../square/Popularity_list'
				})
			},
			getZhuanye() {
				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do",
					method: 'post',
					headers: {
						"content-type": "application/json;charset=UTF-8",

					},
					body: {

						parentId: "4f5e22db04214b85a627e8bf416a7e66",
					},
					emulateJSON: false,
				}).then(function(response) {

					if(response.body.meta.res == "00000") {

						
						/**处理数据*/
						var array = [];
						for(var i=0;i<3;i++){
							array.push(response.body.data[i]);
						}
						
						for(var j = 0; j < array.length; j++) {
							for(var i = 0; i < array[j].dataDictionary.length; i++) {
								array[j].dataDictionary[i].id = false
							}
						}
						//console.log(response.body.data,"9999999999")
						if(this.$store.state.if_item.length > 0) {
							//console.log(this.$store.state.if_item[0].dictName)
							if(this.$store.state.if_item[0]=="全部"){
								this.is_all=true;
									var all={};
									all.id=true;
									all.dictName="全部";
									this.selected_arrs.push(all.dictName);
								//this.selected_arr.push(array[j].dataDictionary[i]);
								//console.log("111111111111")
							}else{
								for(var j = 0; j < array.length; j++) {
									for(var i = 0; i < array[j].dataDictionary.length; i++) {
										for(var y = 0; y < this.$store.state.if_item.length; y++) {
											//console.log(this.$store.state.if_item[y],"222222222222")
											if(array[j].dataDictionary[i].dictName==this.$store.state.if_item[y]){
												array[j].dataDictionary[i].id = true
												this.selected_arrs.push(array[j].dataDictionary[i].dictName);
												break;
											}else{
												array[j].dataDictionary[i].id = false
											}
										}
									}
								}
								
								
							}
						}

						this.data_yuan = array;
						//console.log(this.data_yuan,"新数据")
						//this.eye=this.title[0].dataDictionary;

					}
				}).catch(function(err) {
					//console.log(err)
				})
			},
			/*选择事件*/
			seleced_check(index, jndex, j) {
				if(this.is_all) {
					this.is_all = !this.is_all
				}else{
					if(this.selected_arrs[0]=="全部"){
						this.selected_arrs.splice(0,1);
					}
				}
				if(this.data_yuan[index].dataDictionary[jndex].id == false) {
//					if(this.selected_arrs.length == 3) {
//						Toast({
//							message: '最多只能选择3个',
//							position: 'middle',
//							duration: 2000
//						});
//					} else {
						if(this.selected_arrs[0]=="全部"){
							this.selected_arrs.splice(0,1);
						}
						this.selected_arrs.push(j.dictName);
						this.data_yuan[index].dataDictionary[jndex].id = !this.data_yuan[index].dataDictionary[jndex].id;
					//}
				} else {
					for(var i = 0; i < this.selected_arrs.length; i++) {
						if(this.selected_arrs[i] == j.dictName) {
							this.selected_arrs.splice(i, 1);
							if(this.selected_arrs.length==0){
								this.is_all=true;
								var all={};
								all.id=true;
								all.dictName="全部";
								this.selected_arrs.push(all.dictName)
							}
						}
					}
					this.data_yuan[index].dataDictionary[jndex].id = !this.data_yuan[index].dataDictionary[jndex].id;
				}
				
				//console.log(this.selected_arrs, "已选择的数组")
			},
			/**选择全部*/
			all() {
				if(this.is_all == false) {
					this.selected_arrs = [];
					var all={};
						all.id=true;
						all.dictName="全部";
						this.selected_arrs.push(all.dictName);
					for(var j = 0; j < this.data_yuan.length; j++) {
						for(var i = 0; i < this.data_yuan[j].dataDictionary.length; i++) {
							this.data_yuan[j].dataDictionary[i].id = false
						}
					}
						this.is_all = true;
				}
				//console.log(this.selected_arrs,"11111111")
			
			}
		},

		mounted() {
			if(this.$store.state.if_item.length > 0) {
				this.is_all=false;
			}else{
				this.is_all=true;
				var all={};
				all.id=true;
				all.dictName="全部";
				this.selected_arrs.push(all.dictName)
			}
			this.getZhuanye(); //获取列表数据
			this.$store.state.is_bottom = false;
		}

	}
</script>

<style scoped="scoped">
	.big_content {
		width: 95%;
		margin: 1.5rem auto 0;
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
		margin: 0.2rem 0.25rem 0 0;
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
		margin: 0.2rem 0.25rem 0 0;
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