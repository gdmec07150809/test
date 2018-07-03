<template>
	<div style="width: 100%;">
		<!--<div  class="chat_box">
			<img class="imgs" style="" src="../../assets/img/xitong/icon_news_gifts.png" alt="" />
			<div @click="tiao" class="text_box">
				<p style="font-size: 0.38rem;margin-top: 0.6rem;margin-left: 0.2rem;">好友通知</p>
					<div class="fri_shu" v-if="$store.state.friends.length>0"></div>
				<i style="font-size: 0.45rem;color:#CACACA;position: absolute;right:0.2rem;top: 0.7rem;"class="fa fa-chevron-right"></i>
			</div>
		</div>
	-->
		<div style="margin:  2rem 30%;width: 40%;text-align: center;" v-if="data.length==0">
			<img src="../../assets/img/icon_noComment.png" style="width: 3rem" />
			<p style="margin-top: 0.2rem;color: #CCCCCC; font-size: 0.26rem;">还没有好友，快去添加吧</p>
		</div>
		<div class="chat_box" v-for="item in data">
			<!--用户头像-->
			<img class="imgs" style="" :src="item.fromOpPic" alt="" />

			<div @click="to_chat(item)" class="text_box">

				<!--用户ID-->
				<p style=" font-size: 0.34rem; margin-top: 0.2rem;font-weight: bold;">{{item.fromNiceName}}</p>
				<!--消息-->
				<p class="text_p" style="-webkit-box-orient: vertical;">{{item.message}}</p>
				<!--时间-->
				<p class="data_p">{{item.date_str}}</p>
			</div>
		</div>

		<div style="width: 100%;height: 1.5rem;">

		</div>

	</div>
</template>

<script>
	import store from '../../vuex/store'
	export default {
		store,
		data() {
			return {
				//				data:''

			}
		},
		methods: {

			tiao() {
				this.$store.state.adcal = 1

				this.$router.push({
					path: '../My_friend'
				});
			},

			to_chat(i) {

				this.$store.state.chat_tiao = 0

				this.$store.state.chat_item = i
				//console.log(i, 5555555555)

				this.$router.push({
					path: '../chat_to'
				});

			},
			jsonSort(array, field, reverse) {
				//var date=new Date(field);
				//数组长度小于2 或 没有指定排序字段 或 不是json格式数据
				if(array.length < 2 || !field || typeof array[0] !== "object") return array;
				//数字类型排序
				if(typeof array[0][field] === "number") {
					array.sort(function(x, y) {
						return x[field] - y[field]
					});
				}
				//字符串类型排序
				if(typeof array[0][field] === "string") {
					array.sort(function(x, y) {
						return x[field].localeCompare(y[field])
					});
				}
				//倒序
				if(reverse) {
					array.reverse();
				}
				return array;
			}
		},
		created() {
			
			this.$store.state.is_bottom = true; //底部栏显隐
			//console.log(this.$store.state.is_bottom, "99999")
			//console.log(this.$store.state.msgs_to, "消息")

			//				this.data = this.$store.state.msgs_to

		},
		computed: {
			//			date() {
			//				var date = new Date();
			//				return date.getHours() + ":" + date.getMinutes();
			//			},

			data() {
				var new_arr2 = [];

				console.log(localStorage.chat_str, "999999999")
				if(localStorage.chat_str != undefined) {
					localStorage.chat_str = localStorage.chat_str.toString()
					if(localStorage.chat_str.indexOf("$") > -1) {
						//console.log("____________" + localStorage.chat_str + "___________you________")
						var new_arr = localStorage.chat_str.split("$");
						//console.log(new_arr, "9999999999999")
						for(var i = 0; i < new_arr.length; i++) {
							if(new_arr[i] != "") {
								var str = new_arr[i].toString();
								var json = eval('(' + str + ')');
								//console.log(typeof(json), "111111111111")

								new_arr2.push(json)
							}

						}

					} else {
						//console.log(localStorage.chat_str.toString(), "WU")
						var str = localStorage.chat_str.toString();
						var json = eval('(' + str + ')');
						//console.log(json.fromOpId, "22222222")

						new_arr2.push(json)

					}
					new_arr2 = this.jsonSort(new_arr2, "date_str", true)
					//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
					var sTime = new Date(); //开始时间
					for(var i = 0; i < new_arr2.length; i++) {
						//console.log(new_arr2[i],"0000000000000000000000000000")
						var endTime = new Date(new_arr2[i].date_str); //结束时间
						//console.log(endTime,"0000000000000")
						var times = parseInt((sTime.getTime() - endTime.getTime()) / (60 * 1000)) //分钟
						//console.log(times,"*****************")

						if(times < 1||times ==1) { //刚刚
							new_arr2[i].date_str="刚刚"
						} else {
							if(times > 1 && times < 60) { //分钟
					
								new_arr2[i].date_str=times + "分钟前";

							} else if(times > 60 && (times / 60) < 24) { //小时
								var hours = parseInt(times / 60);
								
								new_arr2[i].date_str = hours + "小时前";
								

							} else if(times / 60 > 24 && (times / 60) > 24 * 3) {
								var day = parseInt(times / (60 * 60));

								
								new_arr2[i].date_str = day + "天前";
								
							} else {
								var new_t = new Date(new_arr2[i].date_str);
									
								new_arr2[i].date_str  = (new_t.getMonth()+1)+"月"+":"+new_t.getDate()+"日";
								
							}

						}

					}
					
					//console.log(new_arr2, "66666666")
				}

				return new_arr2;
			}
		}
	}
</script>

<style scoped="scoped">
	.chat_box {
		width: 100%;
		height: 1.5rem;
	}
	
	.imgs {
		width: 1.1rem;
		height: 1.1rem;
		margin: 0.2rem;
		border-radius: 50%;
	}
	
	.text_box {
		width: 5.78rem;
		height: 100%;
		border-bottom: 0.005rem solid #f1f1f1;
		float: right;
		position: relative;
	}
	
	.text_p {
		font-size: 0.3rem;
		width: 5rem;
		height: 0.4rem;
		margin-top: 0.05rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #CACACA;
	}
	
	.data_p {
		font-size: 0.28rem;
		position: absolute;
		right: 0.5rem;
		top: 0.3rem;
		color: #CACACA;
	}
	
	.fri_shu {
		padding: .15rem;
		position: fixed;
		left: 3.5rem;
		top: 1.5rem;
		border-radius: 50%;
		background-color: red;
	}
</style>