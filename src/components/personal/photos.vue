<template>
	<!--
    	作者：2443611475@qq.com
    	时间：2018-05-11
    	描述：相册
    -->
	<div id="app">
		<div class="kong" v-show="!show">
				<img src="../../assets/img/icon_noImage.png" />
				<p style="text-align: center;">暂时还没有图片哦</p>
		</div>
		<div v-show="show" class="photo_list">
			<ul>
				<li v-for="arr in act" style="overflow: hidden;" @click="toPhotosDetailto(arr)">
					<img style="min-height:100%;min-width:100%;max-width: 130%;max-height: 130%;" :src="arr.picInfo[0].picUrl">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	import md5 from 'js-md5';
	export default {
		//			el:"#app",
		store,
		data() {
			return {
				act: [],
				show:true

			}

		},
		methods: {
			toPhotosDetailto(e) {
				//console.log(e,'图片详情');
				
				this.$store.state.photoUrl = e;
				
				
					this.$router.push({
						path: '../photos_detail'
						});
				
			}
		},
		mounted() {
			
			var url=this.$store.state.request_url+"/api/map/art/selectPic.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
			
			this.$http({
				url: this.$store.state.request_url+"/api/map/art/selectPic.do?memId="+id+"&ts="+ts,
				method: 'post',
				headers: {
					"content-type": "application/json;charset=UTF-8",
					'sIgn': sign
				},
				body: {
					opId:this.$store.state.worksOpId
				},
				emulateJSON: false,
			}).then(function(response) {
					if(response.body.meta.res=="00000"){
						this.act=response.body.data.artResponseList;
						//console.log("相册");
						//console.log(response.body.data);
						////console.log(response.body.data[0].picUrl.picInfo[0].picUrl)
						if(response.body.data.artResponseList.length>0){
							this.show=true
						}else{
							this.show=false
						}
						////console.log(this.act)
					}
			}).catch(function(err) {
				//console.log(err)
			})
		}

	}
</script>

<style scoped="scoped">
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
	
	.photo_list {
		width: 100%;
		overflow: hidden;
	}
	
	.photo_list ul li {
		
		width: 32%;
		height: 2.3rem;
		margin-left: 0.9%;
		margin-top: 0.05rem;
		float: left;
		/*background-color: #A9A9A9;*/
		 vertical-align: middle;
          text-align: center;
		
	}
	
	.photo_list ul li img {
		
	}
	.kong{
		height: 5rem;
		width: 100%;
		
	}
	.kong img{
		width: 3rem;
		height:2.8rem;
		margin: 16.5% 26%;
	}
</style>