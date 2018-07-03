<template>
	<div>
		<button style="margin: 2rem 10%;width: 80%;height: 1rem; border-radius: 0.1rem;font-size: 0.3rem;color: #fff;" @click="pay_money">支付</button>
		<p>第一步：{{msg}}</p>
		<p>第二步：{{msg2}}</p>
		
		<a ></a>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import store from '../vuex/store.js'
	import md5 from 'js-md5';
	import axios from 'axios'
	export default {
		store,
		data() {
			return {
				msg: '',
				msg2: ''
			}
		},
		methods: {

			pay_money() { //页面刷新获取数据
				var url = this.$store.state.request_url + "/api/map/user/weixinPayment.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				//console.log(id, "  ", sign)

				//console.log(this.$store.state.data.memId,"1111111111111")

				this.$http({
					url: this.$store.state.request_url + "/api/map/user/weixinPayment.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						memId: this.$store.state.data.memId,
						totalFee: 1,
						spbillCreateIp: '127.0.0.1',
						tradeType: 'MWEB'
					}
				}).then(function(response) {
					//console.log(response.body)
					if(response.body.meta.res == '00000') {
						if(response.body.meta.msg != "") {
							this.msg = response.body.meta.msg;
							//this.requst(response.body.meta.msg);
							//console.log(response.body.meta.msg);
							
							window.location.href=response.body.meta.msg;
						}

					}

				}).catch(function(err) {
					//console.log(err)
				})

			},
			
		},
		mounted() {

		}
	}
</script>

<style>

</style>