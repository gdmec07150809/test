<template>
	<div style="width: 100%;height: 100%;z-index:400;overflow-y:hidden;background:white;position: fixed;overflow-y: auto;top: 0.2rem;">
		<div style="width: 90%;position:relative;margin: 0 auto;margin-bottom: 0.2rem;">

			<div style="width: 100%;height: 1rem;position:fixed;top:0;left: 0;z-index: 9992;text-align:center;line-height: 0.88rem;border-bottom: 0.005rem solid #f1f1f1;background: white;">
				<span v-show="hui_s" @click="hui" style="font-size:0.4rem;color: #2E3135;position: absolute;left:0.3rem;top: 0.07rem;">
			<img  style="width: 0.3rem;margin-right: 0.1rem;" src="../../assets/img/zuo.png" alt="" /></span>

				<p style="font-size: 0.38rem;line-height: 1rem;float:left;margin-left: 2.7rem;">发布作品</p>

				<!--<p  @click="go_babi" style="font-size:0.32rem;float:right;margin-right: 0.3rem;line-height: 1rem;color:rgb(255, 157, 0);;">发布</p>-->
				<p v-show="fabu" @click="go_babi" style="font-size:0.32rem;float:right;margin-right: 0.3rem;line-height: 1rem;color:rgb(255, 157, 0);;">下一步</p>

			</div>
			<div style="height:0.88rem;"></div>

			<div @click="select_year" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">毕业年</p>
		     	  <p style="font-size: 0.3rem;float: left;color: #FF9D00;">&nbsp; *</p></span>
				<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0rem;" />
				<p style="font-size: 0.3rem;float: right;margin-right: 0.2rem;">{{$store.state.nian_ss}}</p>
			</div>

			<div @click="to_yx" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">院校</p>
		     	  <p style="font-size: 0.3rem;float: left;color: #FF9D00;">&nbsp; *</p></span>
				<!--<i style="float: right;font-size: 0.45rem;line-height: 1rem;margin-right: 0rem;color: #CACACA;" class="fa fa-chevron-right"></i>-->
				<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0rem;" />
				<p style="font-size: 0.3rem;float: right;margin-right: 0.2rem;">{{$store.state.yuan_xiao}}</p>
			</div>

			<div class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">专业</p>
		     	   <p style="font-size: 0.3rem;float: left;color: #FF9D00;">&nbsp; *</p></span>

				<input v-model="$store.state.z_y" id="text_inp" type="text" placeholder="请输入" />

			</div>

			<div @click="xls" class="boxs">
				<span><p style="font-size: 0.3rem;float: left;color: #2E3135;">学历</p>
		     	   <p style="font-size: 0.3rem;float: left;color: #FF9D00;">&nbsp; *</p></span>
				<img src="../../assets/img/right_icon.png" style="float: right;    height: 0.28rem;margin-top: 0.36rem;margin-right: 0rem;" />
				<p style="font-size: 0.3rem;float: right;margin-right: 0.2rem;">{{$store.state.detailed_information.education}}</p>
			</div>

		</div>

		<!--
    	作者：2443611475@qq.com
    	时间：2018-06-07
    	描述：毕业年选择器
    -->
		<div v-show="is_reply_s">
			<div @click="cancel" style="width: 100%;height: 8.3rem;position:fixed;top: 0;left: 0;background:rgba(0,0,0,0.4);z-index: 1000;">

			</div>

			<div class="dia">
				<div style="margin-bottom: 1rem;">
					<div v-for="item in year_array">
						<p class="report_class" @click="reportTap(item)">{{item}}</p>
						<div class="xian"></div>
					</div>
				</div>
			</div>

			<div class="cancels">
				<p @click="cancel" style="text-align: center;">取消</p>
			</div>

		</div>
		<!--
    	作者：2443611475@qq.com
    	时间：2018-06-07
    	描述：学历选择器
    -->
		<div v-show="xl" style="width:13.3rem;position:fixed;top:0;z-index:999;">
			<div @click="yin" style="width:100%;height:8rem;background:rgba(0,0,0,.5);"></div>
			<mt-actionsheet v-show="xl" :actions="action_value"></mt-actionsheet>
			<div style="width: 100%;height: 0.8rem;background: white;position: fixed;bottom:0rem;z-index: 9991;" @click="canncel">
				<p style="text-align: center;font-size: 0.38rem;line-height: 0.8rem;color: #2d8cf0;">取消</p>
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

		data() {
			return {
				gifts: false,
				fabu: true,
				text_show: true, //控制底部发布按钮显示隐藏
				pon: false,
				act: {
					noa: true,
					noe: false,
					noa1: true,
					noe1: false
				},
				acts: {
					noa: true,
					noe: false
				},
				biao: '',
				is_btn: true,
				hui_s: false,

				is_reply_s: false,
				is_report_stauts: false,
				year_array: [],
				date_str: '',

				xl: false,
				action_value: [{
						name: '博士后 ',
						method: this.x1
					},
					{
						name: '博士',
						method: this.x2
					},
					{
						name: '硕士',
						method: this.x3
					},
					{
						name: '本科',
						method: this.x4
					},
					{
						name: '大专',
						method: this.x5
					},
					{
						name: '中专',
						method: this.x6
					},
					{
						name: '高中',
						method: this.x7
					},
					{
						name: '初中',
						method: this.x8
					},
				],
			}
		},
		created() {
			this.dateDetail(); //处理时间1990到至今

		},
		methods: {
			canncel() {
				this.xl = false
			},
			yin() {
				this.xl = false
				this.yu = false
			},
			xls() {
				this.xl = true
			},
			x1() {
				this.$store.state.detailed_information.education = '博士后';
				this.xl = false
			},
			x2() {
				this.$store.state.detailed_information.education = '博士';
				this.xl = false
			},
			x3() {
				this.$store.state.detailed_information.education = '硕士';
				this.xl = false
			},
			x4() {
				this.$store.state.detailed_information.education = '本科';
				this.xl = false
			},
			x5() {
				this.$store.state.detailed_information.education = '大专';
				this.xl = false
			},
			x6() {
				this.$store.state.detailed_information.education = '中专';
				this.xl = false
			},
			x7() {
				this.$store.state.detailed_information.education = '高中';
				this.xl = false
			},
			x8() {
				this.$store.state.detailed_information.education = '初中';
				this.xl = false
			},

			to_yx() {
				this.$router.push({
					path: '../BS_yuanxiao'
				});
			},

			dateDetail() {
				var startTime = (new Date("1960-01-01")).getFullYear();
				var endTime = (new Date()).getFullYear();
				for(var i = endTime; i >= startTime; i--) {
					this.year_array.push(i);
				}
			},

			reportTap(item) {
				this.$store.state.nian_ss = item;
				this.is_reply_s = false;
				//				this.$parent.dd();
			},

			cancel() {
				this.is_reply_s = false
			},
			select_year() {
				this.is_reply_s = true;
			},
			hui() {
				this.$store.state.img_box.picUrl = '' //图片
				this.$store.state.Data_set.The_name_of_the_work = '' //标题
				this.$store.state.Data_set.Type_work = '' //类型
				this.$store.state.Data_set.Version_number = '' //版数
				this.$store.state.Data_set.nian_dai = '' //年份
				this.$store.state.Data_set.cai_zhi = '' //材质
				this.$store.state.Data_set.ti_cai = '' //题材
				this.$store.state.Data_set.chang = '' //长
				this.$store.state.Data_set.kuan = '' //宽
				this.$store.state.Data_set.gao = '' //高
				this.$store.state.Data_set.Description_of_creation = '' //作品内容

				this.$store.state.nian_ss = ''; //毕业年
				this.$store.state.yuan_xiao = ''; //院校
				this.$store.state.detailed_information.education = ''; //学历
				this.$store.state.z_y = '' //专业

				if(this.$store.state.bian_ji_show == 2) {
					this.$router.push({
						path: '../My_work'
					});
					this.$store.state.bian_ji_show = 1
				} else {
					this.$router.push({
						path: '../add_facth'
					});
					this.$store.state.img_box = {};
					this.$store.state.img_box_to = [];
				}
			},
			to_Typeofwork() {
				this.$store.state.lei_xing_s = 1
				this.hui_s = false
				this.$router.push({
					path: '../Typeofwork'
				});

			},
			go_babi() { //作品发布
				if(this.$store.state.nian_ss != null && this.$store.state.nian_ss != "") {
					if(this.$store.state.yuan_xiao != null && this.$store.state.yuan_xiao != "") {
						if(this.$store.state.z_y != null && this.$store.state.z_y != "") {
							if(this.$store.state.detailed_information.education != null && this.$store.state.detailed_information.education != "") {
									this.$router.push({
										path: '../BS_add'
									});		
							} else {
								Toast({
									message: '请选择学历',
									position: 'middle',
									duration: 2000
								});
							}
						} else {
							Toast({
								message: '请填写专业',
								position: 'middle',
								duration: 2000
							});
						}
					} else {
						Toast({
							message: '请选择院校',
							position: 'middle',
							duration: 2000
						});
					}
				} else {
					Toast({
						message: '请选择毕业年',
						position: 'middle',
						duration: 2000
					});
				}

			},
			//图片大小验证  不能超过3M
			verificationPicFile(file) {
				var fileSize = 0;
				var fileMaxSize = 5; //3M  
				var filePath = file;
				if(filePath) {
					fileSize = file.size;
					var size = fileSize / (1024 * 1024);
					if(size > fileMaxSize) {
						file.value = "";
						return false;
					} else if(size <= 0) {

						file.value = "";
						return false;
					} else {
						file.value = "";
						return true;
					}
				} else {
					return false;
				}
			},
			change_text() {

				var that = this
				window.setTimeout(function() {　
					that.pon = true
				}, 100)

			},

			click_text() {
				this.text_show = false
			},
		},
		mounted() {

			
			setTimeout(() => {
				this.hui_s = true;
			}, 300)
		}
	}
</script>

<style scoped="scoped">
	#box_gift {
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.5);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
	}
	
	#gift {
		width: 50%;
		margin: 21% 23%;
	}
	
	* {
		outline: none;
		margin: 0;
		padding: 0;
	}
	
	#text_inp {
		width: 5rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.3rem;
		border: none;
		outline: none;
		float: right;
		/*text-align: center;*/
		text-align: right;
	}
	
	.boxs {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		border-bottom: 0.01rem solid #F8F8F8;
	}
	
	.btnss {
		width: 1.3rem;
		height: 0.5rem;
		float: right;
		border: none;
		border: 0.02rem solid #D2D2D2;
		border-radius: 0.08rem;
		font-size: 0.3rem;
		margin-top: 0.25rem;
		margin-left: 0.2rem;
		background: white;
		line-height: 0.5rem;
		color: #2E3135;
		position: relative;
	}
	
	.btnssto {
		width: 1.3rem;
		height: 0.5rem;
		float: right;
		border: none;
		border: 0.02rem solid #2C3E50;
		border-radius: 0.08rem;
		font-size: 0.3rem;
		margin-top: 0.25rem;
		margin-left: 0.2rem;
		color: #2E3135;
		line-height: 0.5rem;
		background: white;
		position: relative;
	}
	
	.img_xiao {
		width: 0.3rem;
		height: 0.3rem;
		position: absolute;
		bottom: 0;
		right: 0;
		display: block;
	}
	
	.img_lang {
		display: none;
	}
	
	.type {
		display: none;
	}
	
	.types {
		display: block;
	}
	
	.zhu {
		width: 100%;
		height: 2rem;
		float: left;
	}
	
	textarea::-webkit-input-placeholder,
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	
	textarea:-moz-placeholder,
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	
	textarea::-moz-placeholder,
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	
	textarea:-ms-input-placeholder,
	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #B4B4B4;
		font-size: 0.3rem;
	}
	
	input,
	textarea {
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
	
	.dia {
		position: fixed;
		bottom: 1.2rem;
		z-index: 1000;
		height: 5.2rem;
		overflow-y: auto;
		background-color: #fff;
		width: 100%;
	}
	
	.report_class {
		height: 1rem;
		line-height: 1rem;
		color: rgba(51, 51, 51, 1);
		font-size: 0.32rem;
		text-align: center;
	}
	
	.cancels {
		height: 1.2rem;
		line-height: 1rem;
		color: rgba(51, 51, 51, 1);
		font-size: 0.32rem;
		text-align: center;
		background-color: #fff;
		width: 100%;
		position: fixed;
		border-top: #f1f1f1 0.2rem solid;
		bottom: 0;
		z-index: 1000;
	}
	
	.down {
		width: 100%;
		height: 0.01rem;
		margin-top: 0.2rem;
		background: rgba(247, 247, 247, 1);
	}
	
	.xian {
		height: 0.02rem;
		width: 100%;
		background: rgba(247, 247, 247, 1);
	}
</style>