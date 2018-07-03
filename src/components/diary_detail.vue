<template>
	<div id="app">
		<workschild v-bind:m='message'></workschild>
		<div class="head">
			<img class="img1" src="../assets/img/back_gray_icon.png" @touchstart="back" />
			<div class="title">
				<p>闲情详情</p>
			</div>

			<img class="img2" src="../assets/img/warn.png"  @touchstart="reportTap"/>
		</div>
		<div class="athor_content">
			<div class="athor_detail">
				<img src="../assets/img/head_img.png" />
				<p>{{data.opId}}</p>
			</div>
			<p class="diary_date">{{time}}</p>
		</div>
		<div class="works_infor">
			<div class="works">
				<div class="works_img">
					<div class="two" v-if="data.picUrl.picInfo.length==2">
						<div class="big_img_left">
							<img :src="data.picUrl.picInfo[0]?data.picUrl.picInfo[0].picUrl:''" />
						</div>
						<div class="big_img_right">
							<img :src="data.picUrl.picInfo[1]?data.picUrl.picInfo[1].picUrl:''" />
						</div>
					</div>
					
					<div class="three" v-else-if="data.picUrl.picInfo.length==3" >
						<div class="big_img">
							<img :src="data.picUrl.picInfo[0]==null?'':data.picUrl.picInfo[0].picUrl" />
						</div>
						<div class="small_img">
							<div class="small_img_01">
								<img :src="data.picUrl.picInfo[1]==null?'':data.picUrl.picInfo[1].picUrl" />
							</div>
							<div class="small_img_02">
								<img :src="data.picUrl.picInfo[2]==null?'':data.picUrl.picInfo[2].picUrl" />
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="works_content">
				<p class="introduce_content">从2008第一家奢华酒店到87家豪华酒店，“酒店王国” 十载光彩卓然。本次设计采用黑金色调，融合主题和酒 店元素进行创意构思，从创意到落地历时一周。
				</p>
			</div>
			<div class="down"></div>
			<div class="function">
				<div class="function_item_left" @touchstart="goodTap">
					<img :src="call?'../../../static/img/icon_detail_good_active.png':'../../../static/img/icon_detail_good_normal.png'" />
					<p>点赞</p>
				</div>
				<div class="function_item_left" @touchstart="collectTap">
					<img :src="collect?'../../../static/img/icon_detail_collect_active.png':'../../../static/img/icon_detail_collect_normal.png'" />
					<p>收藏</p>
				</div>
				<div class="function_item_left">
					<img src="../assets/img/icon_detail_share.png" />
					<p>转发</p>
				</div>
				<div class="function_item_left" @touchstart="commentTap()">
					<img src="../assets/img/icon_detail_comment.png" />
					<p>评论</p>
				</div>
				<div class="function_item_right">
					<img src="../assets/img/icon_detail_tip.png" />
					<p>打赏</p>
				</div>
			</div>
			<div class="xian"></div>
			<div class="comment_item" @touchstart="shows(index)" v-for="(arr,index) in acst">
				<div class="athor_infor">
					<div class="athor_infor_left">
						<div class="athor_icon">
							<img src="../assets/img/head_img.png" />
						</div>
						<p class="athor_name">{{arr.name}}</p>
						<div class="athor_div">
							<p class="athor_text">作者</p>
						</div>
					</div>
					<div class="athor_infor_right">
						<div class="call">
							<p>32</p>
							<img src="../assets/img/icon_comment_good.png" />
						</div>
						<div class="call_right">
							<img src="../assets/img/icon_comment_translation.png" />
						</div>
					</div>
				</div>
				<div class="athor_infor_content">
					<p class="athor_infor_content_text">本次设计采用黑金色调，融合主题和酒店元素进行创意构思，从创意到落</p>
					<p class="date">3小时前</p>
					<div class="more_content">
						<p>查看全部4条回复</p>
						<img src="../assets/img/come_icon.png" />
					</div>
				</div>
				<div class="down_xian"></div>
			</div>
			<div class="pin">
				<p>已无更多评论</p>
			</div>

		</div>
		<reportdialog v-bind:f='report'></reportdialog>
		<commnetcontent v-show="showCommtent"></commnetcontent>
	</div>
</template>
<script src="../../static/js/adaption.js"></script>
<script src="../../static/js/swiper.js"></script>
<script>
	import workschild from './Details_of_the_work/works_child.vue'
	import store from '../vuex/store.js'
	import showdialog from './Details_of_the_work/show_dialog.vue'
	import reportdialog from './Details_of_the_work/reportdialog.vue'
	import commnetcontent from './commnet_content.vue'
	import md5 from 'js-md5';
	
	export default {
		//			el:"#app",
		store,
		components: {
			workschild,
			showdialog,
			reportdialog,
			commnetcontent
		},
		data() {
			return {
				acst: [

				],
				message: {
					dad: false,
					name: ''
				},
				call: false,
				collect: false,

				mes: {
					is_show: false
				},
				data:{},
				time:'',
				report:{
					is_report:false
				},
				showCommtent:false,
				diaryComment:{}
			}

		},
		methods: {

			back() {
				this.$router.push({
							path: '../personal_data'
						})
				//window.location = '/#/personal_data'
			},
			shows(arr) {
				this.message.name = this.acst[arr].name
				this.message.dad = true

			},
			goodTap(){
				var url=this.$store.state.request_url+"/api/map/art/artLike.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				
				this.$http({
							url: this.$store.state.request_url+"/api/map/art/artLike.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								artId: this.data.artId,
								likeType:"闲情",
								opId:this.$store.state.data.memId,//测试参数当前用户Id
								likeOpId:this.data.opId
							},
							emulateJSON: false,
						}).then(function(response) {
							//console.log("点赞");
							//console.log(response);
							if(response.body.meta.res == "00000") {
								//this.worksComment = response.body.data;
							}
						}).catch(function(err) {
							//console.log(err)
						})
				this.call = !this.call;
			},
			collectTap() {
				var url=this.$store.state.request_url+"/api/map/art/artCollect.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				
				this.$http({
							url: this.$store.state.request_url+"/api/map/art/artCollect.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								artId: this.data.artId,//作品ID
								collectType:"闲情",//类型
								opId:this.$store.state.data.memId,//测试参数当前用户Id
								collectOpId:this.data.opId//被收藏的Id
							},
							emulateJSON: false,
						}).then(function(response) {
							//console.log(response.body.meta);
							if(response.body.meta.res == "00000") {
								//console.log("收藏");
								//this.worksComment = response.body.data;
							}
						}).catch(function(err) {
							//console.log(err)
						})
						
				this.collect = !this.collect;
			},
			showD() {
				this.mes.is_show = true
			},
			reportTap(){
				this.report.is_report = true
			},
			commentTap(){
				
				this.showCommtent=true;
				this.$store.state.commentWorksdata=this.data;
				this.$store.state.is_comment=true;
			},
		},

		mounted() {
			this.acst = this.$store.state.act;
			this.data=this.$store.state.diaryContent;
			//console.log(this.data.artId);
			if(this.data.insertDate){
				this.time=this.data.insertDate.split(" ")[0];
			}
			
			
			/*查询作品评论,未更新，无法接*/
					if(this.data.artId) {
						var url=this.$store.state.request_url+"/api/map/art/selectArtDis.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
						
						this.$http({
							url: this.$store.state.request_url+"/api/map/art/selectArtDis.do?memId="+id+"&ts="+ts,
							method: 'post',
							headers: {
								"content-type": "application/json;charset=UTF-8",
								'sIgn': sign
							},
							body: {
								artId: this.data.artId,
								parentId:"0"
							},
							emulateJSON: false,
						}).then(function(response) {
							//console.log("闲情评论");
							//console.log(response);
							if(response.body.meta.res == "00000"){
								this.diaryComment = response.body.data;
								//console.log(this.diaryComment);
							}
						}).catch(function(err) {
							//console.log(err)
						})
					}
		}

	}
</script>

<style scoped="scoped">
	#app {
		overflow-x: hidden;
		position: relative;
		z-index: 300;
		width: 100%;
		background: white;
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
	
	.athor_content {
		width: 100%;
		height: 1rem;
		margin-top: 1.2rem;
	}
	
	.athor_detail {
		float: left;
		margin-left: 0.1rem;
	}
	
	.athor_detail img {
		width: 1.05rem;
		height: 1rem;
		float: left;
		border-radius: 50%;
	}
	
	.athor_detail p {
		float: left;
		margin-left: 0.15rem;
		line-height: 1rem;
		font-size: 0.35rem;
	}
	
	.diary_date {
		float: right;
		font-size: 0.25rem;
		line-height: 1.25rem;
		color: #D0D0D0;
		margin-right: 0.25rem;
	}
	
	.works_img {
		width: 100%;
		height: 4rem;
	}
	
	.works_img img {
		width: 100%;
		height: 100%;
	}
	
	.small_img {
		float: left;
		width: 39.5%;
		height: 100%;
		margin-left: 0.5%;
	}
	
	.big_img {
		float: left;
		width: 60%;
		height: 100%;
		clear: both;
		background-color: #007AFF;
	}
	
	.small_img_01 {
		width: 100%;
		height: 49.5%;
		background-color: #D0D0D0;
	}
	
	.small_img_02 {
		width: 100%;
		height: 49.5%;
		margin-top: 1%;
		background-color: #2C3E50;
	}
	/*标题栏*/
	
	.head {
		width: 100%;
		padding: 0.2rem 0;
		height: 1rem;
		position: fixed;
		top: 0;
		background-color: white;
		margin-bottom: 0.25rem;
	}
	
	.img1 {
		margin-top: 0.1rem;
		width: 0.6rem;
		height: 0.5rem;
		float: left;
	}
	
	.img2 {
		margin-top: 0.1rem;
		width: 0.65rem;
		height: 0.5rem;
		margin-right: 0.2rem;
		float: right;
	}
	
	.title {
		width: 80%;
		height: 100%;
		float: left;
		font-size: 0.45rem;
		text-align: center;
	}
	/*作品*/
	
	.works {
		margin-top: 0.15rem;
		width: 100%;
		overflow: hidden;
	}
	
	.works img {
		width: 100%;
		height: 100%;
	}
	
	.works_content {
		margin-top: 0.1rem;
		width: 100%;
		overflow: hidden;
		margin-left: 0.1rem;
	}
	
	.introduce_content {
		margin-top: 0.25rem;
		font-size: 0.25rem;
		margin-right: 0.25rem;
		color: rgba(153, 153, 153, 1);
		line-height: 0.335rem;
	}
	
	.function {
		margin-top: 0.25rem;
		width: 100%;
		height: 1.1rem;
	}
	
	.function_item_left {
		float: left;
		width: 15%;
		text-align: center;
		height: 100%;
	}
	
	.function_item_left img,
	.function_item_right img {
		width: 50%;
		height: 0.5rem;
	}
	
	.function_item_left p,
	.function_item_right p {
		font-size: 0.215rem;
		color: rgba(153, 153, 153, 1);
		line-height: 0.55rem;
	}
	
	.function_item_right {
		float: right;
		width: 15%;
		text-align: center;
		height: 100%;
	}
	/*评论区*/
	
	.comment_item {
		width: 100%;
		margin-top: 0.2rem;
		overflow: hidden;
	}
	
	.athor_infor {
		width: 100%;
		height: 0.6rem;
	}
	
	.athor_icon {
		width: ;
		margin-left: 0.15rem;
		height: 0.6rem;
	}
	
	.athor_icon img {
		width: 0.6rem;
		height: 100%;
		border-radius: 50%;
	}
	
	.athor_name {
		margin-top: 0.25rem;
		float: left;
		font-size: 0.25rem;
		margin-left: 0.1rem;
		color: rgba(177, 177, 177, 1);
		line-height: 0.165rem;
	}
	
	.athor_div {
		margin-top: 0.25rem;
		float: left;
		margin-left: 0.1rem;
		width: 20%;
		height: 0.25rem;
		text-align: center;
		background-color: #000000;
		border-radius: 0.05rem;
	}
	
	.athor_text {
		padding: 0.05rem;
		font-size: 0.185rem;
		color: rgba(255, 255, 255, 1);
		line-height: 0.125rem;
	}
	
	.athor_infor_left {
		width: 40%;
		height: 100%;
		float: left;
	}
	
	.athor_icon {
		float: left;
	}
	
	.athor_infor_right {
		width: 30%;
		height: 100%;
		float: right;
	}
	
	.call {
		margin: 8%;
		width: 38%;
		float: left;
	}
	
	.call p {
		font-size: 0.3rem;
		color: #D0D0D0;
		float: left;
	}
	
	.call img {
		float: right;
		width: 0.4rem;
		height: 0.4rem;
	}
	
	.athor_infor_content {
		padding-top: 0.25rem;
		margin: 0 0.25rem 0 0.75rem;
	}
	
	.call_right {
		float: right;
		height: 100%;
		margin-right: 0.25rem;
	}
	
	.call_right img {
		width: 0.6rem;
		height: 0.4rem;
		margin: 30% 0;
	}
	
	.athor_infor_content_text {
		font-size: 0.255rem;
		color: rgba(51, 51, 51, 1);
		line-height: 0.335rem;
	}
	
	.date {
		padding-top: 0.1rem;
		font-size: 0.26rem;
		color: rgba(198, 198, 198, 1);
		line-height: 0.335rem;
	}
	
	.more_content {
		width: 100%;
		padding-top: 0.1rem;
	}
	
	.more_content p {
		float: left;
		font-size: 0.25rem;
		color: rgba(198, 198, 198, 1);
		line-height: 0.335rem;
	}
	
	.more_content img {
		float: left;
		margin-top: 0.05rem;
		height: 100%;
		width: 0.2rem;
	}
	
	.pin {
		width: 100%;
		height: 0.75rem;
		text-align: center;
	}
	
	.pin p {
		color: #D0D0D0;
		text-align: center;
		line-height: 0.75rem;
		font-size: 0.25rem;
	}
	
	.down {
		width: 100%;
		height: 0.01rem;
		margin-top: 0.2rem;
		background: rgba(247, 247, 247, 1);
	}
	
	.xian {
		height: 0.2rem;
		width: 100%;
		background: rgba(247, 247, 247, 1);
	}
	
	.down_xian {
		width: 100%;
		height: 0.01rem;
		background: rgba(247, 247, 247, 1);
		margin: 0.6rem 0 0.2rem;
		margin-left: 0.75rem;
	}
	.three{
		height: 100%;
		width: 100%;
	}
	.three img{
		width: 100%;
		height: 100%;
	}
	.two{
		height: 100%;
		width: 100%;
	}
	.two img{
		width: 100%;
		height: 100%;
	}
	.big_img_left{
		float: left;
		width: 49.5%;
	}
	.big_img_right{
		float: right;
		width: 49.5%;
	}
</style>