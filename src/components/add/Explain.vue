<template>

	<div style="width: 100%;height: 100%;position: relative;z-index:9992;background: white;" id="">

		<div style="width: 95%;margin-left:5%;margin-top: 0.2rem;">
			<!--<span @click="back" style="font-size: 0.4rem;color: #2E3135;">
			<img style="width: 0.3rem;margin-right: 0.1rem;" src="../../assets/img/zuo.png" alt="" />返回</span>-->
	   <div style="width: 100%;height: 1rem;position:fixed;top:0;left: 0;z-index: 9992;text-align:center;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
			<span @click="back" style="font-size:0.4rem;color: #2E3135;position: absolute;left:0.3rem;top: 0.07rem;">
			<img style="width: 0.3rem;margin-right: 0.1rem;" src="../../assets/img/zuo.png" alt="" /></span>
			
	   		<p style="font-size: 0.38rem;line-height: 1rem;float:left;margin-left: 2.9rem;">确认填写</p>
	   		
	   		<p  @click="hui" style="font-size:0.32rem;float:right;margin-right: 0.3rem;line-height: 1rem;color:rgb(255, 157, 0);">保存</p>
		
	    </div><div style="height:0.88rem;"></div>
			
			

			<div style="margin-top: 0.3rem;border-bottom: 0.005rem solid #F8F8F8;position: relative;" class="boxs" @click="select_year">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">创作年份(必选)</p>
		     	  </span>
				<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0.3rem;" />
				<p style="font-size: 0.3rem;float: right;margin-right: 0.3rem;">{{date_str}}</p>
			</div>

			<div style="margin-top: 0;border-bottom: 0.005rem solid #F8F8F8;" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">使用材质(必填)</p>
		     	  </span>
				<!--使用材质 -->
				<input v-model="$store.state.Data_set.cai_zhi" class="input_class" type="text" placeholder="请输入" />

			</div>

			<div style="margin-top: 0;border-bottom: 0.005rem solid #F8F8F8" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">创作题材(必填)</p>
		     	  </span>
				<!--创作题材 -->
				<input v-model="$store.state.Data_set.ti_cai" class="input_class" type="text" placeholder="请输入" />

			</div>

			<div style="" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">作品尺寸</p>
		     	  </span>
			</div>

			<div style="margin-top: 0;border-bottom: 0.005rem solid #F8F8F8" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">长 (必填)</p>
		     	  </span>
				<span>
		     	  	<p style="float: right;font-size: 0.3rem;margin-right: 0.2rem;color: #2E3135;">cm</p>
		     	  <!--长 -->
		     	  	<input v-model="$store.state.Data_set.chang" class="input_class" type="number" placeholder="请输入" />
		     	    
		     	  </span>
			</div>

			<div style="margin-top: 0;border-bottom: 0.005rem solid #F8F8F8" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">宽(必填)</p>
		     	  </span>
				<span>
		     	  	<p style="float: right;font-size: 0.3rem;margin-right: 0.2rem;color: #2E3135;">cm</p>
		     	  	<!--宽 -->
		     	  	<input v-model="$store.state.Data_set.kuan" class="input_class" type="number" placeholder="请输入" />
		     	    
		     	  </span>
			</div>

			<div style="margin-top: 0;border-bottom: 0.005rem solid #F8F8F8" class="boxs" v-show="is_show">
				<span><p style="font-size: 0.3rem;float: left;">高(必填)</p>
		     	  </span>
				<span>
		     	  	<p style="float: right;font-size: 0.3rem;margin-right: 0.2rem;color: #2E3135;">cm</p>
		     	  	<!--高-->
		     	  	<input v-model="$store.state.Data_set.gao" class="input_class" type="number" placeholder="请输入" />
		     	    
		     	  </span>
			</div>

		</div>

		<!--<div style="width: 100%;height: 1.3rem;box-shadow:0px 0px  15px 0.1px #CACACA;position:fixed;bottom:0rem;background: white;z-index: 20;">
			<button @click="hui" style="width:90%;height:0.9rem; background:rgba(46,49,53,1);border-radius: 0.15rem;color: white;position: absolute;left: 5%;top: 0.2rem;font-size: 0.3rem;">
				确认填写
			</button>

		</div>-->
		<!--
            	作者：2443611475@qq.com
            	时间：2018-03-27
            	描述：年代选择器
            -->
		<!--<div style="width: 100%;height: 5rem;background: greenyellow;position: absolute;bottom: 0;left: 0;z-index: 9994;">
		      
		    
		      
		   </div>-->
		   <yeardialog  v-bind:e='report'></yeardialog>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import yeardialog from '../Details_of_the_work/yeardialog.vue'
	import { Toast } from 'mint-ui';
	export default {
		components: {
			yeardialog
		},
		store,
		data() {
			return {
				value1: '',
				model1: '',
				is_show: true,
				report:{
					is_reply:false
				},
				date_str:''
			}
		},
		methods: {
			back(){
				this.$router.push({
						path: '../add'
				});
			},
			hui() {

				if(this.$store.state.Data_set.Type_work == "雕塑" || this.$store.state.Data_set.Type_work == "装置" || this.$store.state.Data_set.Type_work == "陶艺") {
					if(this.$store.state.Data_set.nian_dai != null && this.$store.state.Data_set.nian_dai != '') {
						if(this.$store.state.Data_set.cai_zhi != null && this.$store.state.Data_set.cai_zhi != '') {
							if(this.$store.state.Data_set.ti_cai != null && this.$store.state.Data_set.ti_cai != '') {
								if(this.$store.state.Data_set.ti_cai != null && this.$store.state.Data_set.ti_cai != '') {
									if(this.$store.state.Data_set.chang != null && this.$store.state.Data_set.chang != '') {
										if(this.$store.state.Data_set.gao != null && this.$store.state.Data_set.gao != '') {
											if(this.$store.state.Data_set.kuan != null && this.$store.state.Data_set.kuan != '') {
												this.$router.push({
													path: '../add'
												});

											} else {
												Toast({
													message: '请填写宽度',
													position: 'middle',
													duration: 2000
												});
											}
										} else {
											Toast({
												message: '请填写高度',
												position: 'middle',
												duration: 2000
											});
										}
									} else {
										Toast({
											message: '请填写长度',
											position: 'middle',
											duration: 2000
										});
									}
								} else {
									Toast({
										message: '请填写题材',
										position: 'middle',
										duration: 2000
									});
								}
							} else {
								Toast({
									message: '请填写题材',
									position: 'middle',
									duration: 2000
								});
							}
						} else {
							Toast({
								message: '请填写材质',
								position: 'middle',
								duration: 2000
							});
						}
					} else {
						Toast({
							message: '请选择年份',
							position: 'middle',
							duration: 2000
						});
					}
				} else {
					if(this.$store.state.Data_set.nian_dai != null && this.$store.state.Data_set.nian_dai != '') {
						if(this.$store.state.Data_set.cai_zhi != null && this.$store.state.Data_set.cai_zhi != '') {
							if(this.$store.state.Data_set.ti_cai != null && this.$store.state.Data_set.ti_cai != '') {
								if(this.$store.state.Data_set.ti_cai != null && this.$store.state.Data_set.ti_cai != '') {
									if(this.$store.state.Data_set.chang != null && this.$store.state.Data_set.chang != '') {

										if(this.$store.state.Data_set.kuan != null && this.$store.state.Data_set.kuan != '') {
											this.$router.push({
												path: '../add'
											});

										} else {
											Toast({
												message: '请填写宽度',
												position: 'middle',
												duration: 2000
											});
										}

									} else {
										Toast({
											message: '请填写长度',
											position: 'middle',
											duration: 2000
										});
									}
								} else {
									Toast({
										message: '请填写题材',
										position: 'middle',
										duration: 2000
									});
								}
							} else {
								Toast({
									message: '请填写题材',
									position: 'middle',
									duration: 2000
								});
							}
						} else {
							Toast({
								message: '请填写材质',
								position: 'middle',
								duration: 2000
							});
						}
					} else {
						Toast({
							message: '请选择年份',
							position: 'middle',
							duration: 2000
						});
					}
				}

			},
			shu(a) {

				this.$store.state.Data_set.nian_dai = a
				//			//console.log(this.$store.state.Data_set.nian_dai)
			},
			/*选择年份*/
			select_year(){
				this.report.is_reply=true;
			},
			dd(){	
				this.date_str=this.$store.state.Data_set.nian_dai
				//return this.$store.state.Data_set.nian_dai
			}
		},
		created() {
			if(this.$store.state.Data_set.Type_work == "雕塑" || this.$store.state.Data_set.Type_work == "装置" || this.$store.state.Data_set.Type_work == "陶艺") {
				//console.log("不显示")
				this.is_show = true
			} else {
				this.is_show = false
			}
			this.date_str=this.$store.state.Data_set.nian_dai
		},
		
	}
</script>

<style scoped="scoped">
	* {
		outline: none;
	}
	
	.boxs {
		width: 100%;
		height: 1rem;
		/*margin-top: 1.2rem;*/
		line-height: 1rem;
	}
	
	.sele {
		font-size: 0.3rem;
	}
	
	.sele option {
		width: 2rem;
		height: 0.5rem;
	}
	
	.input_class {
		text-align: right;
		width: 60%;
		height: 90%;
		font-size: 0.3rem;
		float: right;
		border: none;
		margin-top: 0.05rem;
		margin-right: 0.2rem;
	}
	
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #C6C6C6;
		/*font-size: 0.32rem;*/
	}
	
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #C6C6C6;
		/*font-size: 0.32rem;*/
	}
	
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #C6C6C6;
		/*font-size: 0.32rem;*/
	}
	
	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #C6C6C6;
		/*font-size: 0.32rem;*/
	}
</style>