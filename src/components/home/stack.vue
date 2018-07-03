<template>
	<div  style="width:100%;">
		
	  <div  v-if="home_1==true&&pages.length==0" style="width: 3.4rem;height: 5rem;margin: 0 auto;margin-top:4rem;font-size: 0.3rem;color: #CCCCCC;">
	  	  <img  style="width:3.4rem;" src="../../assets/img/icon_noPaint.png" alt="" />
	  	           <p>作品被你滑完了，请稍后再来</p>
	  </div>
	  
	  <div  v-else-if="home_2==true&&pages.length==0" style="width: 3.4rem;height: 5rem;margin: 0 auto;margin-top:4rem;font-size: 0.3rem;color: #CCCCCC;">
	  	   <img style="width: 3.4rem;" src="../../assets/img/icon_noPaint.png" alt="" />
	  	        <p>搜索不到你想要的作品哦</p>
	  </div>
	  
    <ul   :class="{stack:stack1,stack_1:stack2,stack_2:stack3,stack_3:stack4,stack_4:stack5}"  >
      <li @touchmove.stop class="stack-item" v-for="(item, index) in pages"
      :style="[transformIndex(index),transform(index)]"
      @touchmove.stop="touchmove"
      @touchstart.stop="touchstart"
      @touchend.stop="touchend(index)"
      @touchcancel.stop="touchend"
      @mousedown.stop="touchstart"
      @mouseup.stop="touchend"
      @mousemove.stop="touchmove"
      @mouseout.stop="touchend"
      @webkit.stop="onTransitionEnd(index)"
      @transitionend.stop="onTransitionEnd(index)" >
        <!--<div @click="tiao(item)" style="position:relative;height:90%;width:6.85rem;overflow: hidden;vertical-align:middle;text-align:center;">
          <img  style="min-height:100%;min-width:6.85rem;" :src="item.picUrl"/>-->
          <div @click="tiao(item)" style="position:relative;height:100%;width:6.85rem;overflow: hidden;">
          <img ref="img_boxs"  @load="contentToggle" style="position: absolute;top:40%; left:50%;transform: translate(-50%,-50%);width: 100%;height: 100%;" :src="item.picUrl"/>
       
        <!-- 喜欢按钮 -->
          
          <div :class="{shows:tai.na1,shows_tower:tai.ne1}" style="position: absolute;width: 1.5rem;height: 1.5rem;border-radius: 50%;top: 1rem;left: 1rem;">
          	   <img src="../../assets/img/home/icon_detail_like.png"  style="width: 1.5rem;height: 1.5rem;border-radius:50%;"/>
          </div>
          
        <!-- 不喜欢按钮 -->
           <div :class="{shows:tai.na2,shows_tower:tai.ne2}" style="position: absolute;width: 1.5rem;height: 1.5rem;border-radius: 50%;top: 1rem;right: 1rem;">
          	   <img style="width: 100%;height:100%;border-radius: 50%;" src="../../assets/img/home/icon_detail_dislike.png"/>
          </div>
        <!-- 超级喜欢按钮 -->
          <!--<div :class="{shows:tai.na3,shows_tower:tai.ne3}" style="position: absolute;width: 1.5rem;height: 1.5rem;border-radius: 50%;top: 4rem;right: 2.7rem;">
          	   <img style="width:100%;height:100%;border-radius: 50%;" src="../../assets/img/home/icon_detail_focous.png"/>
          </div>-->
           
        </div>
        <div  class="rgbas" style="width: 100%;height: 2rem;position:fixed;bottom:0;">
           	   <div  style="width:3.5rem;height:100%;float:left;">
           	   	  <p class="p_s" style="font-size:0.36rem;margin-top:0.2rem;-webkit-box-orient:vertical">{{item.artTitle}}</p>
           	   	  
           	   	  <div style="display: inline-block;"> 
           	   	  	<p style="font-size: 0.28rem;color:#B0B0B0;margin-left: 0.31rem;margin-top: -0.04rem;display: inline-block;">{{(item.artType==null)?'':item.artType.substring(0,3)}}{{(item.artType==null)?'':item.artType.substring(3,5)}}</p>
           	   	   
           	   	     <p v-show="item.artType!=null" style="font-size:0.28rem;color:#B0B0B0;display: inline-block;">&nbsp;|&nbsp;</p>
           	   	      
           	   	     <p style="font-size:0.28rem;color:#B0B0B0;display: inline-block;">{{(item.artType==null)?'':item.artType.substring(6,8)}}</p>
           	   	  </div>
           	   	  	<p style="margin-left: 0.31rem;color: #FF9D00;font-size: 0.28rem;margin-top: 0.08rem;">{{item.retailPrice?('￥'+item.retailPrice):item.sellFlag}}</p>
           	   </div>
           	    
           	   <div @click="dashang(item)" style="width: 1.6rem;height:1.6rem;float:right;margin-right:0.15rem;border-radius: 50%;margin-top: 0.2rem;" >
           	    <img  id="urls" style="width:1.3rem;height:1.3rem;" src="../../assets/img/icon_home_tip.png"/>
           	   </div>
           	    
           </div>
      </li>
    </ul>
          <div v-show="xian_s" class="zhe"  @touchmove.prevent>
			<div class="zhe_1" style="position: relative;overflow:hidden;">
				<div style="width:100%;height: 0.07rem;"></div>
				<p style="    font-size: 0.35rem;margin-top: 0.45rem;">你当前是“游客状态”无法操作，是否立即去登录?</p>
				<div  style="width:100%;height:1rem;margin-top: 0.56rem;border-top:0.02rem solid #E0E0E0;line-height: 1rem;">
					<div @click="shan_chu" style="width:50%;height: 100%;border-right: 0.02rem solid #E0E0E0;text-align: center;float:left;font-size:0.38rem;">
						 确定
					</div>
					<div @click="shan_s" style="width:49%;height: 100%;text-align: center;float:left;font-size:0.38rem;">
						 取消
					</div>
				</div>
				
			</div>
		</div>
          
          
    </div>
</template>
<script>
import detectPrefixes from './utils/detect-prefixes.js'
  import store from '../../vuex/store.js'
  import md5 from 'js-md5';
  import $ from 'jquery'
   import dashang from './dashang.vue'
export default {
	components:{
		
	},
	store,
props: {
    stackinit: {
      type: Object,
      default: []
    },

},
  data () {
    return {
    	page_s:1,
    	xian_s:false,
    	home_1:false,
    	home_2:false,
    	
    	stack1:true,
    	stack2:false,
    	stack3:false,
    	stack4:false,
    	stack5:false,
    	    pages:[],
//    type: Array,
//    default: {}
    
//  	pages:[],
    	tai:{
    		na1:true,ne1:false,
    		na2:true,ne2:false,
    		na3:true,ne3:false
    	   },
    	   
    	das:{da:true},
    	
      basicdata: {
        start: {},
        end: {}
      },
      temporaryData: {
        prefixes: detectPrefixes(),
        offsetY: '',
        poswidth: 0,
        posheight: 0,
        lastPosWidth: '',
        lastPosHeight: '',
        lastZindex: '',
        rotate: 0,
        lastRotate: 0,
        visible: this.stackinit.visible || 3,
        tracking: false,
        animation: false,
        currentPage: this.stackinit.currentPage || 0,
        opacity: 1,
        lastOpacity: 0,
        swipe: false,
        zIndex: 10
      },
      
    }
  },
  computed: {
    // 划出面积比例
    offsetRatio () {
      let width = this.$el.offsetWidth
      let height = this.$el.offsetHeight
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      let offsetHeight = height - Math.abs(this.temporaryData.posheight)
      let ratio = 1 - (offsetWidth * offsetHeight) / (width * height) || 0
      return ratio > 1 ? 1 : ratio
    },
    // 划出宽度比例
    offsetWidthRatio () {
      let width = this.$el.offsetWidth
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      let ratio = 1 - offsetWidth / width || 0
      return ratio
    },
    
    dingshi(){//喜欢时调用
    	var that = this
    	window.setTimeout(function(){
　                  that.next()
       
        for(var i=0;i<this.pages.length;i++){
  			if(this.pages[i].artId == this.$store.state.home_box.artId){
  				this.pages.splice(i,1)
  			}
  		}
  		 
//       that.pages.splice(0,1)    
           
        },700)
    },
    
    dingshi_1(){
      var that = this
    	window.setTimeout(function(){
　                  that.prev()
           for(var i=0;i<this.pages.length;i++){
  			if(this.pages[i].artId == this.$store.state.home_box.artId){
  			   this.pages.splice(i,1)
  			 }
  		   }
           
        },700)
     }
    
  },
  mounted () {
  	
  	this.$store.state.is_bottom=true;//底部栏显隐
//	//console.log(document.getElementsByTagName('li')[0].offsetHeight,'高度1111111111111111111111111111111111111111111111111')
  	var du = ''
  	
  	 du = document.documentElement.clientHeight/document.documentElement.clientWidth
  	//console.log(du,'屏幕百分比')
  	
  	if(du>=1.7&&du<2.0){
  		localStorage.du = du
  		//console.log('stack','当前屏幕样式')
  		this.stack1=true
    	this.stack2=false
    	this.stack3=false
    	this.stack4=false
    	this.stack5=false
  	}else if(du<=1.7&&du>1.6){
  		localStorage.du = du
  		//console.log('stack_1','当前屏幕样式')
  		this.stack1=false
    	this.stack2=true
    	this.stack3=false
    	this.stack4=false
    	this.stack5=false
  	}else if(du<=1.6){
  		localStorage.du = du
  		//console.log('stack_2','当前屏幕样式')
  		this.stack1=false
    	this.stack2=false
    	this.stack3=true
    	this.stack4=false
    	this.stack5=false
  	}else if(du>=2.0&&du<2.1){
  		localStorage.du = du
  		//console.log('stack_4','当前屏幕样式')
  		this.stack1=false
    	this.stack2=false
    	this.stack3=false
    	this.stack4=false
    	this.stack5=true
  	}else if(du>2.1){
  		localStorage.du = du
  		//console.log('stack_3','当前屏幕样式')
  		this.stack1=false
    	this.stack2=false
    	this.stack3=false
    	this.stack4=true
    	this.stack5=false
  	}
  	
    // 绑定事件
//  this.$on('next', () => {
//    this.next()
//  })
//  this.$on('prev', () => {
//    this.prev()
//  })
//   this.$on('tops', () => {
//    this.tops()
//  })
//  this.$on('native', () => {
//    this.liwu()
//  })
//  this.$on('test', function () {
//		this.huoqu()
//	});
  	
  	
  	if(this.$store.state.home_ts == 0){
  		if(localStorage.yous=='true'){
  	   	   	  this.huoqu_s()

  	   	   }{
  	   	   	  this.huoqu()
  	   	   }//调用获取首页信息事件
  	}else if(this.$store.state.home_ts == 'like'){
  		
		this.pages = this.$store.state.Display_storage
		
  		this.dingshi
  		
  		//console.log(this.pages,'所有数据')
  		
  	}else if(this.$store.state.home_ts == 'no_like'){
  		
  		this.pages = this.$store.state.Display_storage
		
  		this.dingshi_1
  		
  	}
  
  },
  methods: {
  	shan_chu(){
//		    this.$store.state.is_bottom = false;
		    this.$router.push({
						path: '/home'
				}); 
  	},
  	shan_s(){
		this.xian_s = false
  	},
  	
 	/*处理图片显示*/
     contentToggle(){
     	//console.log(this.$refs.img_boxs+"*******************")
     	if(this.$refs.img_boxs){
     		
     		for(var i=0;i<this.$refs.img_boxs.length;i++){
     		//this.$refs.img_boxs[i]
     		var img=new Image();
     		img.src=this.$refs.img_boxs[i].src;
     		
     		
     		/*对比原始比例*/
     		if((img.width/img.height)<(685/900)){
     			this.$refs.img_boxs[i].style.width="6.85rem";
     			this.$refs.img_boxs[i].style.height="auto";
     				
     		}
     		else if((img.width/img.height)>(685/900)){
     			this.$refs.img_boxs[i].style.height="9rem";
     			this.$refs.img_boxs[i].style.width="auto";
     			
     		}
     		else{
     			this.$refs.img_boxs[i].style.width="6.85rem";
     			this.$refs.img_boxs[i].style.height="9rem";
     		}
     		
     	 }
       }
     },
  	tiao(i){
  		
  		if(localStorage.yous=='true'){
					this.xian_s=true
				}else{
		this.$store.state.home_box = i;
  		
  		this.$store.state.worksId = i.artId;
  		
  		this.$store.state.worksName="作品";
  		
  		this.$store.state.back_id = 1;
  		
  		this.$store.state.home_x = 1
  		
  		this.$store.state.Author_s_detailed_routing = 1
  		
  		this.$router.push({path:'../works_detail'});
				}
  		
  		
  		
						
  	},
  	
  	huoqu_s(){//获取后台数据方法
  		//console.log('游客状态11111111111111111')
  		
		 if(localStorage.gander_s){
		    this.$store.state.area =localStorage.area_s
			this.$store.state.gander=localStorage.gander_s
			this.$store.state.typesOf=localStorage.typesOf_s.split(",")
		  }
		  if(localStorage.max_s){
			  this.$store.state.max=localStorage.max_s
			  this.$store.state.min=localStorage.min_s
			}
  		
      	this.$http({
				url:this.$store.state.request_url+"/api/mapFreeVerification/touristsGetDisplayArtList.do",
				headers: {
					"content-type": "application/json;charset=UTF-8",
				},
				emulateJSON: false,
				method: 'post',
				body: {
					opId:localStorage.memId,
					page:this.page_s,
					rows:10,
					max:(this.$store.state.max=='')?null:this.$store.state.max,
					min:this.$store.state.min==''?null:this.$store.state.min,
					gander:this.$store.state.gander==''?null:this.$store.state.gander,
					typesOf:(this.$store.state.typesOf.length==0)?null:this.$store.state.typesOf
//					area:this.$store.state.area,
				}
			}).then(function(response){
				
				//console.log(response.body.meta,'1232123132132')
				
				if(response.body.meta.res == '00000'){
                    
                 //   console.log(response.body.data,'数据8888888888888888888')
                    
                    for(var i=0;i<response.body.data.artHone.length;i++){
                    	
                    	this.$store.state.Display_storage.push(response.body.data.artHone[i])
                    }
                     this.pages = this.$store.state.Display_storage
                    
                    if(this.$store.state.sou_home == 1&&response.body.data.artHone.length==0){
                    	
                    	 this.home_2 = true
                    	 
                    }else if(response.body.data.artHone.length==0&&this.$store.state.sou_home != 1){
                    	  
                    	 // console.log(55555)
                    	  
                    	 this.home_1 = true
                    }
				}
			}).catch(function(err){console.log(err)})
    },
  	
  	huoqu(){//获取后台数据方法
		 if(localStorage.gander_s){
		    this.$store.state.area =localStorage.area_s
			this.$store.state.gander=localStorage.gander_s
			this.$store.state.typesOf=(localStorage.typesOf_s==null||localStorage.typesOf_s==undefined)?[]:localStorage.typesOf_s.split(",")
		  }
		  if(localStorage.max_s){
			  this.$store.state.max=localStorage.max_s
			  this.$store.state.min=localStorage.min_s
			}
  		
    		//console.log(this.$store.state.min+'','-----最小年龄')
    		//console.log(this.$store.state.max+'','-----最大年龄')
    		//console.log(this.$store.state.gander,'-----性别选择')
  		 //  console.log(this.$store.state.typesOf,'-----类型',)
  		//console.log(this.page_s,'-----页数')
  		
		this.$store.state.Display_storage=[];
		var url=this.$store.state.request_url+"/api/map/art/getDisplayArtList.do";
		var id=localStorage.memId;
		var token=localStorage.tokEn;
		var ts=new Date().getTime();
		var sign=md5(url+id+token+ts)
		
      	this.$http({
				url: this.$store.state.request_url+"/api/map/art/getDisplayArtList.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					"sIgn":sign
				},
				emulateJSON: false,
				method: 'post',
				body: {
					opId:localStorage.memId,
					page:this.page_s,
					rows:10,
					max:(this.$store.state.max=='')?null:this.$store.state.max,
					min:this.$store.state.min==''?null:this.$store.state.min,
					gander:this.$store.state.gander==''?null:this.$store.state.gander,
//					typesOf:(this.$store.state.typesOf.length==0||this.$store.state.typesOf==null)?null:this.$store.state.typesOf
                    typesOf:(this.$store.state.typesOf==null)?this.$store.state.typesOf:(this.$store.state.typesOf.length==0)?null:this.$store.state.typesOf
					//area:this.$store.state.area
				}
			}).then(function(response){
				 // console.log(response.body.data,"数据")
				if(response.body.meta.res == '00000'){
                    
                    //console.log(response.body.data.artHone,'数据')
                    
                    for(var i=0;i<response.body.data.artHone.length;i++){
                    	
                    	this.$store.state.Display_storage.push(response.body.data.artHone[i])
                    }
                     this.pages = this.$store.state.Display_storage
                    
                    if(this.$store.state.sou_home == 1&&response.body.data.artHone.length==0){
                    	
                    	 this.home_2 = true
                    	 
                    }else if(response.body.data.artHone.length==0&&this.$store.state.sou_home != 1){
                    	
                    	 this.home_1 = true
                    }
                    	
				}
			}).catch(function(err){console.log(err)})
    },
    
  	jsq(){//判断用户滑动到第7张图片的时候--》调用获取首页数据函数--》计数器清零
  	   if(this.$store.state.Counter == 7){
  	   	   this.page_s+=1
  	   	   
  	   	   if(localStorage.yous=='true'){
  	   	   	  this.huoqu_s()
  	   	   }{
  	   	   	  this.huoqu()
  	   	   }
  	   	     
  	   	   this.$store.state.Counter = 0
  	   }else{
  	   	  this.$store.state.Counter+=1
  	   }
  	},
  	
  	dashang(i){
  		
  		  if(localStorage.yous=='true'){
					this.xian_s=true
				}else{
					//先请求子组件的数据,页面刷新---》获取礼物列表数据
				var url=this.$store.state.request_url+"/api/map/art/artRewardGift.do";
		        var id=this.$store.state.data.memId;
		        var token=this.$store.state.data.tokEn;
		        var ts=new Date().getTime();
		        var sign = md5(url+id+token+ts)
				
			     this.$http({
					url: this.$store.state.request_url+"/api/map/art/artRewardGift.do?memId="+id+"&ts="+ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId:this.$store.state.data.memId,
						page:'1',
						rows:'1008'
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						
						this.$store.state.gift_data = response.body.data
						this.$store.state.dashang = true
		
						this.$store.state.A_reward = i
						this.$store.state.is_comment_dashang=false;//恢复打赏作品
						this.$store.state.Return_to_return = 1 
						//console.log(this.$store.state.gift_data,'礼物列表数据,包含，当前用户余额，所有数据，礼物列表数据在  artGift 里面')
					}
				}).catch(function(err) {
					//console.log(err)
				})
			}
  		
  				
		   
        //console.log(this.$store.state.A_reward,'—————————添加打赏当前作品数据————————')
  	},
    touchstart (e) {
      if (this.temporaryData.tracking) {
        return
      }
      // 是否为touch
      if (e.type === 'touchstart') {
        if (e.touches.length > 1) {
          this.temporaryData.tracking = false
          return
        } else {
          // 记录起始位置
          this.basicdata.start.t = new Date().getTime()
          this.basicdata.start.x = e.targetTouches[0].clientX
          this.basicdata.start.y = e.targetTouches[0].clientY
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
          // offsetY在touch事件中没有，只能自己计算
          this.temporaryData.offsetY = e.targetTouches[0].pageY - this.$el.offsetParent.offsetTop
        }
      // pc操作
      } else {
        this.basicdata.start.t = new Date().getTime()
        this.basicdata.start.x = e.clientX
        this.basicdata.start.y = e.clientY
        this.basicdata.end.x = e.clientX
        this.basicdata.end.y = e.clientY
        this.temporaryData.offsetY = e.offsetY
        
      }
      this.temporaryData.tracking = true
      this.temporaryData.animation = false
      
    },
    like(e){//滑动为喜欢后向后台发送数据
    	//this.$store.state.is_login=false;
    	var url=this.$store.state.request_url+"/api/map/art/artLike.do";
		var id=this.$store.state.data.memId;
		var token=this.$store.state.data.tokEn;
		var ts=new Date().getTime();
		var sign=md5(url+id+token+ts)
    	this.$http({
				url: this.$store.state.request_url+"/api/map/art/artLike.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					"sIgn":sign
				},
				emulateJSON: false,
				method: 'post',
				body: {
					artId:this.pages[e].artId,
					likeType:'1',
					opId:this.pages[e].opId,
					likeOpId:this.$store.state.data.memId
				}
			}).then(function(response){
				 if(this.pages.length<=0){
				 	if(localStorage.yous=='true'){
  	   	   	                this.huoqu_s()
  	   	             }{
  	   	   	                this.huoqu()
  	   	             }
				 }
				  
				/*弹出好友框*/
				if(this.$store.state.friends_to){
				}
				
			}).catch(function(err){})
			
   },
    no_like(e){//滑动为不喜欢后向后台发送数据
    	var url=this.$store.state.request_url+"/api/map/art/artDeny.do";
		var id=this.$store.state.data.memId;
		var token=this.$store.state.data.tokEn;
		var ts=new Date().getTime();
		var sign=md5(url+id+token+ts)
    	this.$http({
				url: this.$store.state.request_url+"/api/map/art/artDeny.do?memId="+id+"&ts="+ts,
				headers: {
					"content-type": "application/json;charset=UTF-8",
					"sIgn":sign
				},
				emulateJSON: false,
				method: 'post',
				body: {
					artId:this.pages[e].artId,
					likeType:'1',
					opId:this.pages[e].opId,
					likeOpId:this.$store.state.data.memId
				}
			}).then(function(response){
				    //console.log(response.body.meta,this.pages[e],'no_like')
				 if(this.pages.length<=0){
				 	 if(localStorage.yous=='true'){
  	   	   	             this.huoqu_s()
  	   	              }{
  	   	   	             this.huoqu()
  	   	               }
				 }
			}).catch(function(err){
				    //console.log(err)
			})
   },
   
    touchmove (e) {
      // 记录滑动位置
      if (this.temporaryData.tracking && !this.temporaryData.animation) {
        if (e.type === 'touchmove') {
          e.preventDefault()
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        } else {
          e.preventDefault()
          this.basicdata.end.x = e.clientX
          this.basicdata.end.y = e.clientY
        }
        // 计算滑动值
        this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
        
         if(this.temporaryData.poswidth>200){//判断向左滑动
         	this.tai.na1=false;this.tai.ne1=true
        	this.tai.na2=true;this.tai.ne2=false
        	this.tai.na3=true;this.tai.ne3=false
         }else if(this.temporaryData.poswidth<-200){//判断向右滑动
         	this.tai.na1=true;this.tai.ne1=false
        	this.tai.na2=false;this.tai.ne2=true
        	this.tai.na3=true;this.tai.ne3=false
         }
        
        this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
//        if(this.temporaryData.posheight<-200){//判断向上滑动
//        	this.tai.na1=true;this.tai.ne1=false
//      	this.tai.na2=true;this.tai.ne2=false
//      	this.tai.na3=false;this.tai.ne3=true
//        }
          
        let rotateDirection = this.rotateDirection()
        let angleRatio = this.angleRatio()
        this.temporaryData.rotate = rotateDirection * this.offsetWidthRatio * 15 * angleRatio
      }
    },
    touchend (e) {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 滑动结束，触发判断
      // 判断划出面积是否大于0.4
      if (this.offsetRatio >= 0.4) {
        // 计算划出后最终位置
        let ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
        this.temporaryData.poswidth = this.temporaryData.poswidth >= 0 ? this.temporaryData.poswidth + 200 : this.temporaryData.poswidth - 200
        //判断组件左右滑动
        if(this.temporaryData.poswidth>0){
        	this.tai.na1=true;this.tai.ne1=false
        	this.tai.na2=true;this.tai.ne2=false
        	this.tai.na3=true;this.tai.ne3=false
        	
          if(localStorage.yous=='true'){
          	 this.xian_s = true
          }else{
          	 this.like(e)
		     this.jsq()
          }
          
        }else{
        	this.tai.na1=true;this.tai.ne1=false
        	this.tai.na2=true;this.tai.ne2=false
        	this.tai.na3=true;this.tai.ne3=false
        if(localStorage.yous=='false'){	
        	this.no_like(e)
            this.jsq()
           }
        }
        
        this.temporaryData.posheight = this.temporaryData.posheight >= 0 ? Math.abs(this.temporaryData.poswidth * ratio) : -Math.abs(this.temporaryData.poswidth * ratio)
            //console.log(this.temporaryData.posheight)
//     if(this.temporaryData.posheight<-400){
       //判断组件向上滑动
//          this.tai.na1=true;this.tai.ne1=false
//      	this.tai.na2=true;this.tai.ne2=false
//      	this.tai.na3=true;this.tai.ne3=false
//      	//console.log(this.pages[e],'LIKE,这个为超级喜欢，其他信息无视')
//      	//console.log(e)
//      }
        
        this.temporaryData.opacity = 0
        this.temporaryData.swipe = true
        this.nextTick()
        
      // 不满足条件则滑入
      } else {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.swipe = false
        this.temporaryData.rotate = 0
        
            this.tai.na1=true;this.tai.ne1=false
        	this.tai.na2=true;this.tai.ne2=false
        	this.tai.na3=true;this.tai.ne3=false
      }
      
    },
    nextTick (){
      // 记录最终滑动距离
      this.temporaryData.lastPosWidth = this.temporaryData.poswidth
      this.temporaryData.lastPosHeight = this.temporaryData.posheight
      this.temporaryData.lastRotate = this.temporaryData.rotate
      this.temporaryData.lastZindex = 20
      // 循环currentPage
      this.temporaryData.currentPage =  this.temporaryData.currentPage === this.pages.length - 1 ? 0 : this.temporaryData.currentPage +1
      // currentPage切换，整体dom进行变化，把第一层滑动置最低
      this.$nextTick(() => {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.opacity = 1
        this.temporaryData.rotate = 0
      })
    },
    
     onTransitionEnd (index) {
      let lastPage = this.temporaryData.currentPage === 0 ? this.pages.length - 1 : this.temporaryData.currentPage - 1
      // dom发生变化正在执行的动画滑动序列已经变为上一层
      if (this.temporaryData.swipe && index === lastPage) {
        this.temporaryData.animation = true
        this.temporaryData.lastPosWidth = 0
        this.temporaryData.lastPosHeight = 0
        this.temporaryData.lastOpacity = 0
        this.temporaryData.lastRotate = 0
        this.temporaryData.swipe = false
        this.temporaryData.lastZindex = -1
      }
    },
    
    prev () {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 计算划出后最终位置
      let width = this.$el.offsetWidth
      this.temporaryData.poswidth = -width
      this.temporaryData.posheight = 0
      this.temporaryData.opacity = 0
      this.temporaryData.rotate = '-5'
      this.temporaryData.swipe = true
      this.nextTick()
      var index = this.temporaryData.currentPage//当前滑块的下标
      //console.log(this.pages[index],'不喜欢')
      this.$store.state.home_ts = 0 
    },
    next(){
//  	this.pages.splice(1,1)
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 计算划出后最终位置
      let width = this.$el.offsetWidth
      this.temporaryData.poswidth = width
      this.temporaryData.posheight = 0
      this.temporaryData.opacity = 0
      this.temporaryData.rotate = '-5'
      this.temporaryData.swipe = true
      this.nextTick()
      var index = this.temporaryData.currentPage//当前滑块的下标
      this.$store.state.home_ts = 0 
    },
//  tops () {//点击向上滑动事件
//    this.temporaryData.tracking = false
//    this.temporaryData.animation = true
//    // 计算划出后最终位置
//    let height = this.$el.offsetHeight
//    this.temporaryData.poswidth = 0
//    this.temporaryData.posheight = -height
//    this.temporaryData.opacity = 0
//    this.temporaryData.rotate = '-3'
//    this.temporaryData.swipe = true
//    this.nextTick()
//    var index = this.temporaryData.currentPage//当前滑块的下标
//    //console.log(index)
//     //console.log(this.pages[index],'LIKE，这是超级喜欢，请无视其他提示')
//     
//  },
    
    rotateDirection () {
      if (this.temporaryData.poswidth <= 0) {
        return -1
      } else {
        return 1
      }
    },
    angleRatio () {
      let height = this.$el.offsetHeight
      let offsetY = this.temporaryData.offsetY
      let ratio = -1 * (2 * offsetY / height - 1)
      return ratio || 0
    },
    inStack (index, currentPage) {
      let stack = []
      let visible = this.temporaryData.visible
      let length = this.pages.length
      for (let i = 0; i < visible; i++){
        if (currentPage + i < length){
          stack.push(currentPage + i)
        } else {
          stack.push(currentPage + i - length)
        }
      }
      return stack.indexOf(index) >= 0
    },
    // 非首页样式切换
    transform (index) {
      let currentPage = this.temporaryData.currentPage
      let length = this.pages.length
      let lastPage = currentPage === 0 ? this.pages.length - 1 : currentPage - 1
      let style = {}
      let visible = this.temporaryData.visible
      if (index === this.temporaryData.currentPage) {
        return
      }
      if (this.inStack(index, currentPage)) {
        let perIndex = index - currentPage > 0 ? index - currentPage : index - currentPage + length
        style['opacity'] = '1'
        style['transform'] = 'translate3D(0,0,' + -1 * 60 * (perIndex - this.offsetRatio) + 'px' + ')'
        style['zIndex'] = visible - perIndex
        if (!this.temporaryData.tracking) {
          style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.temporaryData.prefixes.transition + 'Duration'] = 700 + 'ms'
        }
      } else if (index === lastPage) {
        style['transform'] = 'translate3D(' + this.temporaryData.lastPosWidth + 'px' + ',' + this.temporaryData.lastPosHeight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.lastRotate + 'deg)'
        style['opacity'] = this.temporaryData.lastOpacity
        style['zIndex'] = this.temporaryData.lastZindex
        style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
        style[this.temporaryData.prefixes.transition + 'Duration'] = 400 + 'ms'
      } else {
        style['zIndex'] = '-1'
        style['transform'] = 'translate3D(0,0,' + -1 * visible * 60 + 'px' + ')'
        
      }
      return style
    },
   
    // 首页样式切换
    transformIndex (index) {
      if (index === this.temporaryData.currentPage) {
        let style = {}
        style['transform'] = 'translate3D(' + this.temporaryData.poswidth + 'px' + ',' + this.temporaryData.posheight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.rotate + 'deg)'
        style['opacity'] = this.temporaryData.opacity
        style['zIndex'] = 10
        if (this.temporaryData.animation) {
          style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.temporaryData.prefixes.transition + 'Duration'] = (this.temporaryData.animation ? 300 : 0) + 'ms'
        }
        return style
      }
    },
    
    
  }
}
</script>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	.p_s{
		/*background: red;*/
		width: 4.5rem;
		height: 0.6rem;
		margin-left: 0.31rem;
		 display: -webkit-box;  
                        display: -moz-box;  
                        overflow: hidden;  
                        text-overflow: ellipsis;  
                        word-break: break-all;  
                        -webkit-box-orient: vertical;  
                        -webkit-line-clamp:1;
	}
  .stack{
    width: 100%;
    height:10.2rem;
    position: relative;
    perspective: 1000px;
    perspective-origin: 50% 150%;
    -webkit-perspective: 2000px;
    -webkit-perspective-origin: 50% 150%;
    margin-top:0rem;
  }
  .stack_1{
    width: 100%;
    height:8.9rem;
    position: relative;
    perspective: 1000px;
    perspective-origin: 50% 150%;
    -webkit-perspective: 2000px;
    -webkit-perspective-origin: 50% 150%;
    margin-top:0rem;
  }
  .stack_2{
    width: 100%;
    height:8.7rem;
    position: relative;
    perspective: 1000px;
    perspective-origin: 50% 150%;
    -webkit-perspective: 2000px;
    -webkit-perspective-origin: 50% 150%;
    margin-top:0rem;
  }
  .stack_3{/*iphone-x 专属适配*/
    width: 100%;
    height:13.2rem;
    position: relative;
    perspective: 1000px;
    perspective-origin: 50% 150%;
    -webkit-perspective: 2000px;
    -webkit-perspective-origin: 50% 150%;
    margin-top:0rem;
  }
  .stack_4{/*其他全面屏手机-专属适配*/
    width: 100%;
    height:12.1rem;
    position: relative;
    perspective: 1000px;
    perspective-origin: 50% 150%;
    -webkit-perspective: 2000px;
    -webkit-perspective-origin: 50% 150%;
    margin-top:0rem;
  }
  .stack-item{
    ackground: #fff;
    /*box-shadow: #666 0px 0px 30px;*/
   -moz-box-shadow:0em 1em 1em #f1f1f1; -webkit-box-shadow:0em 1em 1em #f1f1f1; box-shadow:0em 1em 1em #f1f1f1;
    height: 91%;
    width: 91%;
    /*border-radius: 0.1rem;*/
    /*text-align: center;*/
    overflow: hidden;
    position: absolute;
    opacity: 0;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: auto;
     /*border-radius: 0.3rem;*/
     background: #EEEEEE;
     margin-left: 0.35rem;
     margin-top:1.3rem;
     
     
  }
  .stack-item img {
    /*width: 100%;
    height: 100%;*/
    /*border-radius: 0.3rem;*/
    display: block;
    pointer-events: none;
    height: 90%;
  }
  .stack-container li.move-back {
    /* http://matthewlein.com/ceaser/ */
    -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.470, 1); /* older webkit */
    -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.470, 1.515);
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.470, 1.515);
  }
  
 .shows{
 	transition:1s;
 	display: none;
 	
 	
 } 
 .shows_tower{
 	transition:1s;
 	display: block;
 } 
 
 .rgbas{
 	background:white;
 }
 .zhe{
		width: 100%;
		height: 13.3rem;
		position: fixed;
		top: 0;
		z-index: 9994; 
		background: rgba(0,0,0,.6);
	}
	.zhe_1{
		width: 5rem;
		height: 3.2rem;
		background: white;
		margin: 0 auto;
		border-radius: 0.2rem;
		margin-top: 6rem;
		text-align: center;
	}
</style>
