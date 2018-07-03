import Vue from 'vue'
import Vuex from 'vuex'

import VueResource from 'vue-resource';
Vue.use(VueResource);

import axios from 'axios'
//Vue.use(axios);
Vue.use(Vuex);

import wx from 'weixin-js-sdk'
import { Toast } from 'mint-ui';

//axios.defaults.withCredentials = true

//没有使用代理的话
//var myAxios = axios.create({
//	baseURL:'http://192.168.1.123:8080/api'
//})
//import md5 from 'md5'
		/**微信登陆初始化*/
//		var auths=null;
//      mui.plusReady(function() {  
//          plus.oauth.getServices(function(services) {
//              auths = services;
//             //mui.toast("获取登录服务列表："+ services[0]);
//          }, function(e) {
//              mui.toast("获取登录服务列表失败：" + e.message + " - " + e.code);
//          });
//      })
//      // 登录操作
//      function authLogin(type) {
//          var s;
//          for (var i = 0; i < auths.length; i++) {
//              if (auths[i].id == type) {
//                  s = auths[i];
//                  break;
//              }
//          }
//          if (!s.authResult) {
//              s.login(function(e) {
//                  mui.toast("登录认证成功！");
//                  authUserInfo(type);
//              }, function(e) {
//                  mui.toast("登录认证失败！");
//              });
//          } else {
//              mui.toast("已经登录认证！");
//          }
//      }
//      //注销
//      function authLogout() {
//          for (var i in auths) {
//              var s = auths[i];
//              if (s.authResult) {
//                  s.logout(function(e) {
//                      console.log("注销登录认证成功！");
//                  }, function(e) {
//                      console.log("注销登录认证失败！");
//                  });
//              }
//          }
//      }
//      // 微信登录获取认证信息
//      function authUserInfo(type) {
//          var s;
//          for (var i = 0; i < auths.length; i++) {
//              if (auths[i].id == type) {
//                  s = auths[i];
//                  break;
//              }
//          }
//          if (!s.authResult) {
//              mui.toast("未授权登录！");
//          } else {
//              s.getUserInfo(function(e) {
//                  var josnStr = JSON.stringify(s.userInfo);
//                  var jsonObj = s.userInfo;
//                 	mui.toast("获取用户信息成功：" + josnStr);
//                  //showData(type,jsonObj);
//                  authLogout();
//              }, function(e) {
//                  alert("获取用户信息失败：" + e.message + " - " + e.code);
//              });
//          }
//      }
//      // 显示用户头像信息
//      function showData(type,data) {
//          switch (type){
//              case 'weixin':
//                  headImage.src = data.headimgurl;
//                  break;
//              case 'qq':
//                  headImage.src = data.figureurl_qq_2;
//                  break;
//              case 'sinaweibo':
//                  headImage.src = data.avatar_large;
//                  break;
//              default:
//                  break;
//          }
//      }

/**分享功能*/
var shares = {}
var shareBts = []
var bStream = navigator.userAgent.indexOf('StreamApp') >= 0;
document.addEventListener("plusready", function() {
	plus.screen.lockOrientation("portrait-primary");
	// 更新分享按钮
	plus.share.getServices(function(s) {
		for(var i in s) {
			shares[s[i].id] = s[i];
		}
		var ss = shares['weixin'];
		ss && ss.nativeClient && (shareBts.push({
				title: '微信朋友圈',
				s: ss,
				num:1,
				x: 'WXSceneTimeline'
			}),
			shareBts.push({
				title: '微信好友',
				s: ss,
				num:2,
				x: 'WXSceneSession'
			}));
		ss = shares['sinaweibo'];
		ss && shareBts.push({
			title: '新浪微博',
			s: ss
		});
		shareBts.push({
			title: '更多'
		});
	}, function(e) {
		console.log('updateShare failed: ' + JSON.stringify(e));
	});

	var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
	offCanvasInner.addEventListener('drag', function(event) {
		event.stopPropagation();
	});
	// 设置窗口优化隐藏
	dragHide();

}, false);

/**朋友圈*/
var shareAction = function(sb) {
	
	if(!sb.s) {
		shareWithSystem();
		return;
	}
	/**判断选择哪种方式分享*/
	if(sb.num == 2) {
		console.log(sb.num);
		var msg = {};
		msg.title = state.share_title;
		msg.href = bStream ? state.share_url : state.share_url;
		msg.content =state.share_content;
		sb.x && (msg.extra = {
			scene: sb.x
		});
		msg.thumbs = msg.pictures = [state.share_img];
		//console.log('share ' + sb.title + ' : ' + JSON.stringify(msg));
		sb.s.authenticated ? shareMessage(sb.s, msg) : sb.s.authorize(function() {
			shareMessage(sb.s, msg);
		}, function(e) {
			plus.nativeUI.toast('取消分享!');
		});
	} else if(sb.num == 1) {
		console.log(sb.num);
		var msg = {};
		msg.title = state.share_new_content;
		msg.href = bStream ? state.share_url : state.share_url;
		msg.content =state.share_new_content;
		sb.x && (msg.extra = {
			scene: sb.x
		});
		msg.thumbs = msg.pictures = [state.share_img];
		//console.log('share ' + sb.title + ' : ' + JSON.stringify(msg));
		sb.s.authenticated ? shareMessage(sb.s, msg) : sb.s.authorize(function() {
			shareMessage(sb.s, msg);
		}, function(e) {
			plus.nativeUI.toast('取消分享!');
		});
	}

}

var shareMessage = function(s, m) {
	s.send(m, function() {
		plus.nativeUI.toast('完成分享!');
		
		if(state.mibi){
			Toast({
						message: state.mibi,
						position: 'middle',
						duration: 2000
				});
				state.mibi=''
		}
		
	}, function(e) {

		plus.nativeUI.toast('取消分享!');
	});
}

/**系统分享*/
var shareWithSystem = function() {

	plus.share.sendWithSystem ? plus.share.sendWithSystem({
		content: state.share_content,
		/**+ (bStream ? state.share_url : state.share_url)*/
		title: "2",
		/**state.share_title*/
		href: bStream ? state.share_url : state.share_url,
		pictures: ('Android' == plus.os.name) ? null : [state.share_img]
	}) : shareWithSystemNativeJS();
}

var shareWithSystemNativeJS = function() {

	var main = plus.android.runtimeMainActivity(),
		Intent = plus.android.importClass('android.content.Intent'),
		File = plus.android.importClass('java.io.File'),
		Uri = plus.android.importClass('android.net.Uri');
	var intent = new Intent(Intent.ACTION_SEND),
		p = plus.io.convertLocalFileSystemURL(state.share_img),
		f = new File(p),
		uri = Uri.fromFile(f);
	if(f.exists() && f.isFile()) {
		intent.setType('image/*');
		intent.putExtra(Intent.EXTRA_STREAM, uri);
	} else {
		intent.setType('text/plain');
	}
	intent.putExtra(Intent.EXTRA_SUBJECT, "3"); /**state.share_content*/

	intent.putExtra(Intent.EXTRA_TEXT, '(' + (bStream ? state.share_url : state.share_url) + ')');
	intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
	main.startActivity(Intent.createChooser(intent, '分享"觅艺"应用'));
}

var dragHide = function() {
	var ws = plus.webview.currentWebview();
	// 窗口隐藏时调整到正确位置（drag操作会修改窗口位置），否则可能导致无法调用show方法显示
	ws.addEventListener('hide', function() {
		ws.setStyle({
			left: '0px'
		});
	}, false);
	// 设置拖动关闭当前窗口
	ws.drag({
		direction: 'right',
		moveMode: 'followFinger'
	}, {
		view: plus.runtime.appid,
		moveMode: 'silent'
	}, function(e) {
		if(e.type == 'end' && e.result) {
			ws.hide();
		}
		console.log('Drag Event: ' + JSON.stringify(e));
	});

}

var share = function() {

	//console.log("999999999999")
	(shareBts.length > 1) || ('Android' !== plus.os.name && shareBts.length > 0) ? plus.nativeUI.actionSheet({
		title: '觅艺app',
		cancel: '取消',
		buttons: shareBts
	}, function(e) {
		(e.index > 0) && shareAction(shareBts[e.index - 1]);
	}): (shareBts.length > 0 ? shareWithSystem() : plus.nativeUI.alert('当前环境无法支持分享操作!'));
}

/**监听返回键*/
var back_jianting = function() {
	/**监听返回事件*/
	document.addEventListener('plusready', function() {

		mui.plusReady(function() {
			//首页返回键处理
			//处理逻辑：1秒内，连续两次按返回键，则退出应用；
			var first = null;
			plus.key.addEventListener('backbutton', function() {

				//首次按键，提示‘再按一次退出应用’
					if(!first) {
						first = new Date().getTime();
						mui.toast('再按一次退出觅艺应用');
						setTimeout(function() {
							first = null;
						}, 1000);
					} else {
						if(new Date().getTime() - first < 1500) {
							plus.runtime.quit();
						}
					}
				

			}, false);
		});

	});
}


var ws=null;
/**websocket代码*/
var ConnectWebsocket = function() {
	ws = new WebSocket("ws://www.meetartapp.com:7777?opId=" + state.data.memId);
	/*判断是否处于连接状态*/
	if(ws.readyState != 1) {
		
		var that = this
		//console.log("连接成功store1", ws.readyState)
		/*连接*/
		ws.onopen = function() {
			
		//	console.log("连接成功store", ws.readyState)
			state.new_ws = ws;
			ws.onmessage = state.tableList.getMessage; /*接受推送信息*/

		}
	}
	/*异常触发*/
	ws.onerror = function(e) {
	//	reconnect();
		setTimeout(function() {
			state.tableList.ConnectWebsocket()
		}, 5000);
		//console.log("异常..." + e.code);
	}
	ws.onclose = function() {
		 //reconnect();
		setTimeout(function() {
			//window.location.reload();
			state.tableList.ConnectWebsocket()
		}, 5000); 
		//reconnect();
		
		//console.log("退出了");
		//state.tableList.ConnectWebsocket()
	}
};

/*接收信息*/
var getMessage = function(evt) {
	
	var received_msg = evt.data;
	
	var json = eval('(' + received_msg + ')');
	console.log(json,json.message)
	if(json.message != "您的好友已下线！") {

		//将json字符串转为json对象
		
		console.log(json,"进来");

		switch(json.msgType) {
			case 'msg': //聊天信息
				//console.log(json,"信息")
				state.is_infro = true;
				state.msgs = json;
				var date_tel = new Date()
				json.date_str = date_tel //date_tel.getHours() + ":" + date_tel.getMinutes();
				//console.log(state.msgs, "接收")
				/**存*/
				var chat_str = "";
				/**判断有无缓存*/
				if(localStorage.chat_str != undefined) {
					//console.log("--------------------有------------------------------------")
					var chat_arr = [];
					var new_chat = [];
					if(localStorage.chat_str.indexOf("$") > -1) {
						chat_arr = localStorage.chat_str.split("$");
						for(var c = 0; c < chat_arr.length; c++) {
							var jon = eval('(' + chat_arr[c] + ')');
							var jon1 = JSON.stringify(jon)
							jon = JSON.parse(jon1)
							//console.log(jon, "--------")
							new_chat.unshift(jon);
						}
						let a = 0;
						for(var i = 0; i < new_chat.length; i++) {
							console.log(new_chat[i].fromOpId == json.fromOpId, "相等不")
							if(new_chat[i].fromOpId == json.fromOpId) {
								a++;
								new_chat.splice(i, 1);
								new_chat.unshift(json)
							}
						}
						if(a == 0) {
							new_chat.unshift(json)
						}

						for(var i = 0; i < new_chat.length; i++) {
							if(i == new_chat.length - 1) {
								chat_str += JSON.stringify(new_chat[i])
							} else {
								chat_str += JSON.stringify(new_chat[i]) + "$";
							}
							//console.log(chat_str, "666666666")
						}

						localStorage.chat_str = chat_str;
						//console.log(localStorage.chat_str, '多缓存')
					} else {
						var jso_str = "";
						var jon = eval('(' + localStorage.chat_str + ')');
						if(jon.fromOpId == json.fromOpId) {
							jso_str = JSON.stringify(json);

						} else {
							jso_str = JSON.stringify(jon) + "$" + JSON.stringify(json);
						}

						localStorage.chat_str = jso_str
						//console.log(localStorage.chat_str, '单缓存')
					}

				} else {
					//console.log(json, "1111111111")
					localStorage.chat_str = "";

					localStorage.chat_str = JSON.stringify(json);
					//console.log(localStorage.chat_str, '无缓存')
				}

				//console.log(state.msgs, "聊天sotre")
				break;

			case 'fans': //粉丝通知
				state.is_infro = true;
				state.fans.push(json.message)
				//console.log(state.fans, "粉丝sotre")
				break;

			case 'friend': //好友通知
				//if(state.is_login) {
				//					state.friends.push(json)
				//				} else {
				state.friends_to = json;
				//}
				//console.log("好友-------------------------------")
				state.is_friendss = true
				break;

			case 'system': //系统通知
				state.systems.push(json.message)
				break;

			case 'like': //点赞通知
				//state.is_infro = true;
				//state.likes.push(json.message)
				//console.log(state.likes, "点赞sotre")
				break;

			case 'discuss': //评论通知
				state.is_infro = true;
				state.discuss.push(json.message)
				//console.log(state.discuss, "评论sotre")
				break;

			case 'reward': //打赏通知
			
				state.is_infro = true;
				state.rewards.push(json.message)
				console.log(state.rewards, "打赏sotre")
				break;

			case 'handselVirtualCurrency': //赠送币
				console.log(json.message,"赠送币");
				state.mibi=json.message;
//				Toast({
//						message: state.mibi,
//						position: 'middle',
//						duration: 2000
//				});
				plus.nativeUI.toast(json.message);
				
				//state.complaintSuggestions.push(json.message)
				break;
				
			case 'complaintSuggestion': //建议通知
				state.complaintSuggestions.push(json.message)
				break;
		}
	} else {

		console.log(received_msg)
	}
}

/**消息发送*/
var setSend = function() {
	console.log(state.tableList.mes,"发送信息")
	state.new_ws.send(state.tableList.mes)
}
//设置静态存储资源
const state = {
	
	page_ss:1,
	
	rows_ss:10,
	
	dashangtype:'1',//打赏类型存储
	
	
	mibi:'',
	////////////////闲情发布-标签存储、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
	diar_table: [],

	/////////////////作品编辑/////////////////////////////////////
	bian_ji_show: 1, //控制add页面是否为编辑页面，如果=2控制add返回至--》我的作品页面

	work_artid: '', //临时储存作品id

	////////////////、、、、、、、作品图片详情	
	picurl_ss: '', //图片详情临时存储

	////////////////微信转发功能/////////////////////////
	sign:'',
	share_url:'', //转发链接
	share_img: '', //转发图片
	share_title: '', //转发好友标题
	share_content: '', //转发好友内容
	share_new_title: '', //转发朋友圈标题
	share_new_content: '', //转发朋友圈内容
	tableList: {
		ConnectWebsocket: ConnectWebsocket, //连接webSocket
		getMessage: getMessage, //接受信息
		setSend: setSend, //发送信息
		mes: '', //需要发送的消息
		share: share, //分享
		back_jianting: back_jianting, //监听返回键
		//authLogin:authLogin//微信登陆
	},

	//////////////作品筛选///////////////////////////
	max: '',
	min: '',
	gander: '',
	typesOf:[],
	area: '',

	sou_home: 0, //搜索返回判断，数据为空，弹出提示
	//////////相册详情、、、、、、、、、、、、、、、、、、、
	xc: 0, //相册详情返回判断

	xlss: 0, //返回入用户详情主要显示比如（信息，作品，闲情，文章，，，，）判断
	///////////////首页、、、、、、、、、、、、
	home_ts: 0,
	//作品详情页返回首页时、
	//控制首页不让其加载新数据
	//为like时不加载新数据，页面显示调用向右滑动事件
	//为no_like时不加载新数据，页面显示调用向左滑动事件
	home_box: '',
	//存放作品详情信息

	//地理位置信息、、、、、、、、、、、、、、、、、、、、、
	dy: '',
	////////作品详情页、、、、、、、、、、、、、、、、、、、、、、
	home_x: 0,

	xcs: 0, //相册跳转至作品详情页，控制评论框（1），打赏框（2）是否弹出
	/////////////作品详情判断跳转///////////////
	zhuopin: 1, //默认1（从首页跳转，返回时判断是否=1），2（从用户详情页跳转，返回时判断是否=2）

	/////////////用户详情页判断跳转///////////////////
	yonghu: 1, //默认1（从作品详情页跳转）返回时判断是否=1,  2（从好友列表跳转，返回时判断是否等于2）

	type_ma: '',

	home_tai: 1,
	/////////打赏临时存储数据///////////////////////////////////////////////////////////////////////////////////////////////////////////	   

	dashang: false,

	A_reward: '', //用户点击礼物图片时-传入当前作品信息集合

	Return_to_return: 'b',
	//当打赏礼物时  账户余额不足 跳转至充值页面，用户点击返回按钮 时的返回控制
	//首页点击传入1，作品详情传入2，个人资料传入3
	//广场人气榜传入4，艺术咨询-头条/深度/-作品详情传入5
	//我的钱包-我要充值传入6

	//	   Gift_information:{
	//	   	    gift:'',//打赏的礼物
	//	   	    Number:'1'//个数
	//	   },
	//	   
	/////////////我的钱包临时存储、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、	   

	opGift: '', //虚拟币数量

	opRemaining: '', //会员当前剩余总金额，单位为分

	//////////作品发布界面临时存储数据///////////////////////////////////////////////////////////////////////////////////////////////////////////

	img_box: {
		picUrl: ''
	}, //主图存储

	img_box_to: [], //副图片存储

	Data_set: { //发布界面数据

		The_name_of_the_work: '', //作品名称

		artClassification: '', //作品类型一级分类

		Type_work: '', //作品类型   //临时存储--作品发布--> 作品类型

		type_fenlei: '', //存储作品类型分类

		Version_number: '', //版数

		Copyright_of_works: '原创', //作品版权,默认原创

		original_author: '', //原作者

		nian_dai: "", //年代

		cai_zhi: '', //材质

		ti_cai: '', //题材

		chang: '', //长

		kuan: '', //宽

		gao: '', //高
		money:'',//价钱
		artExpandOne:'仅展示',//展示、可出售

		Description_of_creation: '' //创作说明

	},
	/////////////闲情发布临时存储///////////////////////////////////////////////////////////////////////////////////////////
	img_xianqing: [], //图片存储容器

	xq_box: {

		kejian: 'friends', //可见范围

		neirong: '', //生活动态内容

	},
	/////////////发布文章临时存储///////////////////////////////////////////////////////////////////////////////////////////
	wenzhang: {

		img_boxs: [], //图片存储容器

		Label: [], //标签

		Title: '', //标题

		Text_content: '' //正文内容

	},
	/////////////深度文章临时存储///////////////////////////////////////////////////////////////////////////////////////////
	shendu: {

		img_boxs: [], //图片存储容器

		Label: [], //标签

		Title: '', //标题

		Text_content: '' //正文内容

	},
	/////////////首页临时存储数据///////////////////////////////////////////////////////////////////////////////////////////
	Display_storage: [], //首页滑动数据存储容器

	Counter: 0, //记录首页滑动卡片数量容器

	/////////////广场存储///////////////////////////////////////////////////////////////////////////////////////////       

	rq_box: [], //广场-人气榜存储

	zuopin_x: '', //广场-艺术资讯-作品详情--信息存储

	zuopin_l: '', //作品类型

	tr: 0, //头条、热点跳回控制

	//////////////我的收藏临时存储/////////////////////////////////////////////////////////////////////////////       

	shou_cang: '', //我的收藏临时存储

	/////////////我的临时存储数据///////////////////////////////////////////////////////////////////////////////////////////
	detailed_information: {}, //详细信息容器

	////////////我的作品、我的闲情，///////////////////////////////
	actives_zp: [], //我的作品数据

	actives_xq: [], //我的闲情数据

	Identity_background: [], //选择身份背景容器

	biao: 0, //点击任意一项传入下标

	top_table: '', //显示头部标题

	box_table: [], //最终存储标签容器

	bs: [], //控制大选项

	yemian: 'i',

	yemians: 'i',

	top_s: '', //一级标签临时存储

	///////////兴趣爱好////////////////////////////////////////////////////////////////////  

	Add_what_I_like: [
		[{
			name: '前卫风格',
			id: false
		}, {
			name: '时尚风格',
			id: false
		}, ], //喜欢的艺术风格

		[{
			name: '蒙娜丽莎的微笑',
			id: false
		}, {
			name: '星空',
			id: false
		}, ], //喜欢的艺术作品

		[{
			name: '齐白石',
			id: false
		}, {
			name: '梵高',
			id: false
		}, ], //喜欢的艺术大师

		[{
			name: '西游记',
			id: false
		}, {
			name: '红楼梦',
			id: false
		}, {
			name: '朝花夕拾',
			id: false
		}, {
			name: '起源',
			id: false
		}, ], //喜欢的艺术书籍

		[{
			name: '游泳',
			id: false
		}, {
			name: '高尔夫',
			id: false
		}, {
			name: '骑马',
			id: false
		}, {
			name: '足球',
			id: false
		}, {
			name: '篮球',
			id: false
		}, ], //喜欢的运动

		[{
			name: '欧式餐点',
			id: false
		}, {
			name: '华夏传统美食',
			id: false
		}, ], //喜欢的食物

		[{
			name: '肖申克的救赎',
			id: false
		}, {
			name: '当幸福来敲门',
			id: false
		}, {
			name: '大鱼',
			id: false
		}, ], //喜欢的电影

		[{
			name: '千与千寻',
			id: false
		}, {
			name: '你的名字',
			id: false
		}, ], //喜欢的动漫
	],

	ba: 0, //兴趣爱好选择页下标

	table_top: '', //兴趣爱好选择页头部标题

	Hobby_box: [
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	],
	//存储所有用户选择的--》兴趣爱好选项——》通过下标区分

	////////////////////艺术年表存储//////////////////////////////////////////////

	nian_biao: [], //存储用户，年表信息

	//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、

	/*储存webSocket推送信息，用于各页面显示*/
	msgs: {}, //聊天数组

	msgs_to: [],

	fans: [], //粉丝数组
	friends: [], //好友数组
	friends_to: {},
	systems: [], //系统数组
	likes: [], //点赞、评论数组
	discuss: [], //评论数组
	rewards: [], //打赏数组
	complaintSuggestions: [], //建议数组
	is_infro: false, //是否有新消息
	new_ws: '', //全局websocket
	is_login: true,

	chatContent: [], //聊天框，聊天记录

	adcal: 'p',

	chat_item: {}, //聊天列表被点击传递信息临时存储

	chat_tiao: 0, //聊天框跳转控制

	yidao: '',

	Home: {
		das: false
	},
	is_comment: false, //评论输入框
	commentWorksdata: {},
	photoUrl: '', //相册详情，图片地址,

	personal_c: {},
	my_works:[],//收藏作品
	my_leisure:[],//收藏闲情
	my_artTle:[],//收藏文章

	worksId: '', //作品Id

	works_ads: [], //作品信息-作品详细信息页面

	worksCommentContent: "", //父评论内容
	worksName: '', //跳转的目的名称
	diaryContent: {}, //临时储存单个闲情内容，闲情详情有用

	Author_s_detailed_routing: 1,
	//作者详情单独路由控制
	//首页点击传入   1
	//人气榜-作品详情传入   2
	//朋友圈传入    3

	act: [{
			name: '李易峰',
			athor: '楼主'
		},
		{
			name: '杨幂',
			athor: ''
		},
		{
			name: '赵丽颖',
			athor: '楼主'
		},
		{
			name: '张一山',
			athor: '作者'
		},
	],

	actss: '',
	regiter_data:{},
	data: {
		memId: '',
		token: '',
		info: ''
	}, //用户的memId,token
	adr: [{
			//'北京': ['北京'],
			value: '北京',
			label: '北京',
			children: [{
				value: '北京',
				label: '北京'
			}]
		}, {
			//		'广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
			value: '广东',
			label: '广东',
			children: [{
					value: '广州',
					label: '广州'
				}, {
					value: '深圳',
					label: '深圳'
				}, {
					value: '珠海',
					label: '珠海'
				}, {
					value: '汕头',
					label: '汕头'
				}, {
					value: '韶关',
					label: '韶关'
				}, {
					value: '佛山',
					label: '佛山'
				}, {
					value: '江门',
					label: '江门'
				}, {
					value: '湛江',
					label: '湛江'
				},
				{
					value: '茂名',
					label: '茂名'
				}, {
					value: '肇庆',
					label: '肇庆'
				}, {
					value: '惠州',
					label: '惠州'
				}, {
					value: '梅州',
					label: '梅州'
				}, {
					value: '汕尾',
					label: '汕尾'
				}, {
					value: '河源',
					label: '河源'
				}, {
					value: '阳江',
					label: '阳江'
				}, {
					value: '清远',
					label: '清远'
				},
				{
					value: '东莞',
					label: '东莞'
				}, {
					value: '中山',
					label: '中山'
				}, {
					value: '潮州',
					label: '潮州'
				}, {
					value: '揭阳',
					label: '揭阳'
				}, {
					value: '云浮',
					label: '云浮'
				}
			]
		}, {
			//		'上海': ['上海'],
			value: '上海',
			label: '上海',
			children: [{
				value: '上海',
				label: '上海'
			}]
		}, {
			//		'天津': ['天津'],
			value: '天津',
			label: '天津',
			children: [{
				value: '天津',
				label: '天津'
			}]
		}, {
			//		'重庆': ['重庆'],
			value: '重庆',
			label: '重庆',
			children: [{
				value: '重庆',
				label: '重庆'
			}]
		}, {
			//		'辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
			value: '辽宁',
			label: '辽宁',
			children: [{
					value: '沈阳',
					label: '沈阳'
				}, {
					value: '大连',
					label: '大连'
				}, {
					value: '鞍山',
					label: '鞍山'
				}, {
					value: '抚顺',
					label: '抚顺'
				}, {
					value: '本溪',
					label: '本溪'
				}, {
					value: '丹东',
					label: '丹东'
				}, {
					value: '锦州',
					label: '锦州'
				}, {
					value: '营口',
					label: '营口'
				},
				{
					value: '阜新',
					label: '阜新'
				}, {
					value: '辽阳',
					label: '辽阳'
				}, {
					value: '盘锦',
					label: '盘锦'
				}, {
					value: '铁岭',
					label: '铁岭'
				}, {
					value: '朝阳',
					label: '朝阳'
				}, {
					value: '葫芦岛',
					label: '葫芦岛'
				}
			]
		}, {
			//		'江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
			value: '江苏',
			label: '江苏',
			children: [{
					value: '南京',
					label: '南京'
				}, {
					value: '苏州',
					label: '苏州'
				}, {
					value: '无锡',
					label: '无锡'
				}, {
					value: '常州',
					label: '常州'
				}, {
					value: '镇江',
					label: '镇江'
				}, {
					value: '南通',
					label: '南通'
				}, {
					value: '泰州',
					label: '泰州'
				}, {
					value: '扬州',
					label: '扬州'
				},
				{
					value: '盐城',
					label: '盐城'
				}, {
					value: '连云港',
					label: '连云港'
				}, {
					value: '徐州',
					label: '徐州'
				}, {
					value: '淮安',
					label: '淮安'
				}, {
					value: '宿迁',
					label: '宿迁'
				}
			]
		}, {
			//		'湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
			value: '湖北',
			label: '湖北',
			children: [{
					value: '武汉',
					label: '武汉'
				}, {
					value: '黄石',
					label: '黄石'
				}, {
					value: '十堰',
					label: '十堰'
				}, {
					value: '荆州',
					label: '荆州'
				}, {
					value: '宜昌',
					label: '宜昌'
				}, {
					value: '襄樊',
					label: '襄樊'
				}, {
					value: '鄂州',
					label: '鄂州'
				}, {
					value: '荆门',
					label: '荆门'
				},
				{
					value: '孝感',
					label: '孝感'
				}, {
					value: '黄冈',
					label: '黄冈'
				}, {
					value: '咸宁',
					label: '咸宁'
				}, {
					value: '随州',
					label: '随州'
				}, {
					value: '苗族自治州',
					label: '苗族自治州'
				}, {
					value: '仙桃',
					label: '仙桃'
				}, {
					value: '天门',
					label: '天门'
				}, {
					value: '潜江',
					label: '潜江'
				}, {
					value: '神农架林区',
					label: '神农架林区'
				}
			]
		}, {
			//		'四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
			value: '四川',
			label: '四川',
			children: [{
					value: '成都',
					label: '成都'
				}, {
					value: '自贡',
					label: '自贡'
				}, {
					value: '攀枝花',
					label: '攀枝花'
				}, {
					value: '德阳',
					label: '德阳'
				}, {
					value: '广元',
					label: '广元'
				}, {
					value: '广元',
					label: '遂宁'
				}, {
					value: '内江',
					label: '内江'
				}, {
					value: '乐山',
					label: '乐山'
				},
				{
					value: '南充',
					label: '南充'
				}, {
					value: '眉山',
					label: '眉山'
				}, {
					value: '宜宾',
					label: '宜宾'
				}, {
					value: '广安',
					label: '广安'
				}, {
					value: '达州',
					label: '达州'
				}, {
					value: '雅安',
					label: '雅安'
				}, {
					value: '巴中',
					label: '巴中'
				}, {
					value: '资阳',
					label: '资阳'
				}, {
					value: '阿坝藏族羌族自治州',
					label: '阿坝藏族羌族自治州'
				}, {
					value: '甘孜藏族自治州',
					label: '甘孜藏族自治州'
				}, {
					value: '凉山彝族自治州',
					label: '凉山彝族自治州'
				}
			]
		}, {
			//		'陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
			value: '陕西',
			label: '陕西',
			children: [{
					value: '西安',
					label: '西安'
				}, {
					value: '铜川',
					label: '铜川'
				}, {
					value: '宝鸡',
					label: '宝鸡'
				}, {
					value: '咸阳',
					label: '咸阳'
				}, {
					value: '渭南',
					label: '渭南'
				}, {
					value: '延安',
					label: '延安'
				}, {
					value: '汉中',
					label: '汉中'
				}, {
					value: '榆林',
					label: '榆林'
				},
				{
					value: '安康',
					label: '安康'

				}, {
					value: '商洛',
					label: '商洛'
				}
			]
		}, {
			//		'河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
			value: '河北',
			label: '河北',
			children: [{
					value: '石家庄',
					label: '石家庄'
				}, {
					value: '唐山',
					label: '唐山'
				}, {
					value: '秦皇岛',
					label: '秦皇岛'
				}, {
					value: '邯郸',
					label: '邯郸'
				}, {
					value: '邢台',
					label: '邢台'
				}, {
					value: '保定',
					label: '保定'
				}, {
					value: '张家口',
					label: '张家口'
				}, {
					value: '承德',
					label: '承德'
				},
				{
					value: '沧州',
					label: '沧州'
				}, {
					value: '廊坊',
					label: '廊坊'
				}, {
					value: '衡水',
					label: '衡水'
				}
			]
		}, {
			//		'山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
			value: '山西',
			label: '山西',
			children: [{
					value: '太原',
					label: '太原'
				}, {
					value: '大同',
					label: '大同'
				}, {
					value: '晋城',
					label: '晋城'
				}, {
					value: '晋中',
					label: '晋中'
				}, {
					value: '运城',
					label: '运城'
				}, {
					value: '忻州',
					label: '忻州'
				}, {
					value: '临汾',
					label: '临汾'
				}, {
					value: '吕梁',
					label: '吕梁'
				},
				{
					value: '阳泉',
					label: '阳泉'
				}, {
					value: '长治',
					label: '长治'
				}, {
					value: '朔州',
					label: '朔州'
				}
			]
		}, {
			//		'河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
			value: '河南',
			label: '河南',
			children: [{
					value: '郑州',
					label: '郑州'
				}, {
					value: '洛阳',
					label: '洛阳'
				}, {
					value: '安阳',
					label: '安阳'
				}, {
					value: '新乡',
					label: '新乡'
				}, {
					value: '焦作',
					label: '焦作'
				}, {
					value: '濮阳',
					label: '濮阳'
				}, {
					value: '许昌',
					label: '许昌'
				}, {
					value: '漯河',
					label: '漯河'
				},
				{
					value: '开封',
					label: '开封'
				}, {
					value: '平顶山',
					label: '平顶山'
				}, {
					value: '安阳',
					label: '鹤壁'
				}, {
					value: '三门峡',
					label: '三门峡'
				}, {
					value: '南阳',
					label: '南阳'
				}, {
					value: '商丘',
					label: '商丘'
				}, {
					value: '周口',
					label: '周口'
				}, {
					value: '驻马店',
					label: '驻马店'
				}
			]
		}, {
			//		'吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],	
			value: '吉林',
			label: '吉林',
			children: [{
					value: '长春',
					label: '长春'
				}, {
					value: '吉林',
					label: '吉林'
				}, {
					value: '通化',
					label: '通化'
				}, {
					value: '松原',
					label: '松原'
				}, {
					value: '延边朝鲜族自治州',
					label: '延边朝鲜族自治州'
				},
				{
					value: '四平',
					label: '四平'
				}, {
					value: '辽源',
					label: '辽源'
				}, {
					value: '白山',
					label: '白山'
				}, {
					value: '白城',
					label: '白城'
				}
			]
		}, {
			//		'黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
			value: '黑龙江',
			label: '黑龙江',
			children: [{
					value: '哈尔滨',
					label: '哈尔滨'
				}, {
					value: '齐齐哈尔',
					label: '齐齐哈尔'
				}, {
					value: '鹤岗',
					label: '鹤岗'
				}, {
					value: '鸡西',
					label: '双鸭山'
				}, {
					value: '鸡西',
					label: '鸡西'
				},
				{
					value: '大庆',
					label: '大庆'
				}, {
					value: '伊春',
					label: '伊春'
				}, {
					value: '牡丹江',
					label: '牡丹江'
				}, {
					value: '佳木斯',
					label: '佳木斯'
				}, {
					value: '七台河',
					label: '七台河'
				}, {
					value: '黑河',
					label: '黑河'
				}, {
					value: '绥化',
					label: '绥化'
				}, {
					value: '大兴安岭地区',
					label: '大兴安岭地区'
				}
			]
		}, {
			//		'山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
			value: '山东',
			label: '山东',
			children: [{
					value: '济南',
					label: '济南'
				}, {
					value: '淄博',
					label: '淄博'
				}, {
					value: '东营',
					label: '东营'
				}, {
					value: '潍坊',
					label: '潍坊'
				}, {
					value: '泰安',
					label: '泰安'
				},
				{
					value: '青岛',
					label: '青岛'
				}, {
					value: '枣庄',
					label: '枣庄'
				}, {
					value: '烟台',
					label: '烟台'
				}, {
					value: '济宁',
					label: '济宁'
				}, {
					value: '威海',
					label: '威海'
				},
				{
					value: '日照',
					label: '日照'
				}, {
					value: '莱芜',
					label: '莱芜'
				}, {
					value: '临沂',
					label: '临沂'
				}, {
					value: '德州',
					label: '德州'
				}, {
					value: '聊城',
					label: '聊城'
				}, {
					value: '滨州',
					label: '滨州'
				}, {
					value: '菏泽',
					label: '菏泽'
				}
			]
		},
		{
			//		'安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
			value: '安徽',
			label: '安徽',
			children: [{
					value: '合肥',
					label: '合肥'
				}, {
					value: '淮南',
					label: '淮南'
				}, {
					value: '铜陵',
					label: '铜陵'
				}, {
					value: '滁州',
					label: '滁州'
				}, {
					value: '巢湖',
					label: '巢湖'
				},
				{
					value: '芜湖',
					label: '芜湖'
				}, {
					value: '马鞍山',
					label: '马鞍山'
				}, {
					value: '安庆',
					label: '安庆'
				}, {
					value: '阜阳',
					label: '阜阳'
				}, {
					value: '六安',
					label: '六安'
				},
				{
					value: '蚌埠',
					label: '蚌埠'
				}, {
					value: '淮北',
					label: '淮北'
				}, {
					value: '黄山',
					label: '黄山'
				}, {
					value: '宿州',
					label: '宿州'
				}, {
					value: '亳州',
					label: '亳州'
				}, {
					value: '池州',
					label: '池州'
				}, {
					value: '宣城',
					label: '宣城'
				}
			]
		},
		{
			//		'浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
			value: '浙江',
			label: '浙江',
			children: [{
					value: '杭州',
					label: '杭州'
				}, {
					value: '嘉兴',
					label: '嘉兴'
				}, {
					value: '金华',
					label: '金华'
				}, {
					value: '台州',
					label: '台州'
				}, {
					value: '丽水',
					label: '丽水'
				},
				{
					value: '宁波',
					label: '宁波'
				}, {
					value: '湖州',
					label: '湖州'
				}, {
					value: '衢州',
					label: '衢州'
				},
				{
					value: '温州',
					label: '温州'
				}, {
					value: '绍兴',
					label: '绍兴'
				}, {
					value: '舟山',
					label: '舟山'
				}
			]
		},
		{
			//		'福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
			value: '福建',
			label: '福建',
			children: [{
					value: '福州',
					label: '福州'
				}, {
					value: '三明',
					label: '三明'
				}, {
					value: '南平',
					label: '南平'
				},
				{
					value: '厦门',
					label: '厦门'
				}, {
					value: '泉州',
					label: '泉州'
				}, {
					value: '龙岩',
					label: '龙岩'
				},
				{
					value: '莆田',
					label: '莆田'
				}, {
					value: '漳州',
					label: '漳州'
				}, {
					value: '宁德',
					label: '宁德'
				}
			]
		},
		{
			//		'湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
			value: '湖南',
			label: '湖南',
			children: [{
					value: '长沙',
					label: '长沙'
				}, {
					value: '衡阳',
					label: '衡阳'
				}, {
					value: '常德',
					label: '常德'
				},
				{
					value: '株洲',
					label: '株洲'
				}, {
					value: '邵阳',
					label: '邵阳'
				}, {
					value: '张家界',
					label: '张家界'
				},
				{
					value: '湘潭',
					label: '湘潭'
				}, {
					value: '岳阳',
					label: '岳阳'
				}, {
					value: '益阳',
					label: '益阳'
				},
				{
					value: '郴州',
					label: '郴州'
				}, {
					value: '永州',
					label: '永州'
				}, {
					value: '怀化',
					label: '怀化'
				},
				{
					value: '娄底',
					label: '娄底'
				}, {
					value: '湘西土家族苗族自治州',
					label: '湘西土家族苗族自治州'
				}
			]
		},
		{
			//		'广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
			value: '广西',
			label: '广西',
			children: [{
					value: '南宁',
					label: '南宁'
				}, {
					value: '防城港',
					label: '防城港'
				}, {
					value: '贺州',
					label: '贺州'
				},
				{
					value: '柳州',
					label: '柳州'
				}, {
					value: '钦州',
					label: '钦州'
				}, {
					value: '河池',
					label: '河池'
				},
				{
					value: '桂林',
					label: '桂林'
				}, {
					value: '贵港',
					label: '贵港'
				}, {
					value: '来宾',
					label: '来宾'
				},
				{
					value: '梧州',
					label: '梧州'
				}, {
					value: '玉林',
					label: '玉林'
				}, {
					value: '崇左',
					label: '崇左'
				},
				{
					value: '北海',
					label: '北海'
				}, {
					value: '百色',
					label: '百色'
				}
			]
		},
		{
			//		'江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
			value: '江西',
			label: '江西',
			children: [{
					value: '南昌',
					label: '南昌'
				}, {
					value: '鹰潭',
					label: '鹰潭'
				}, {
					value: '上饶',
					label: '上饶'
				},
				{
					value: '景德镇',
					label: '景德镇'
				}, {
					value: '赣州',
					label: '赣州'
				},
				{
					value: '萍乡',
					label: '萍乡'
				}, {
					value: '吉安',
					label: '吉安'
				},
				{
					value: '九江',
					label: '九江'
				}, {
					value: '宜春',
					label: '宜春'
				},
				{
					value: '新余',
					label: '新余'
				}, {
					value: '抚州',
					label: '抚州'
				}
			]
		},
		{
			//		'贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
			value: '贵州',
			label: '贵州',
			children: [{
					value: '贵阳',
					label: '贵阳'
				}, {
					value: '毕节地区',
					label: '毕节地区'
				}, {
					value: '黔南布依族苗族自治州',
					label: '黔南布依族苗族自治州'
				},
				{
					value: '六盘水',
					label: '六盘水'
				}, {
					value: '黔西南布依族苗族自治州',
					label: '黔西南布依族苗族自治州'
				},
				{
					value: '遵义',
					label: '遵义'
				}, {
					value: '黔东南苗族侗族自治州',
					label: '黔东南苗族侗族自治州'
				},
				{
					value: '安顺',
					label: '安顺'
				},
				{
					value: '铜仁地区',
					label: '铜仁地区'
				}
			]
		},
		{
			//		'云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
			value: '云南',
			label: '云南',
			children: [{
					value: '昆明',
					label: '昆明'
				}, {
					value: '丽江',
					label: '丽江'
				}, {
					value: '德宏傣族景颇族自治州',
					label: '德宏傣族景颇族自治州'
				},
				{
					value: '曲靖',
					label: '曲靖'
				}, {
					value: '普洱',
					label: '普洱'
				}, {
					value: '怒江傈僳族自治州',
					label: '怒江傈僳族自治州'
				},
				{
					value: '玉溪',
					label: '玉溪'
				}, {
					value: '临沧',
					label: '临沧'
				}, {
					value: '迪庆藏族自治州',
					label: '迪庆藏族自治州'
				},
				{
					value: '保山',
					label: '保山'
				}, {
					value: '大理白族自治州',
					label: '大理白族自治州'
				}, {
					value: '楚雄彝族自治州',
					label: '楚雄彝族自治州'
				},
				{
					value: '昭通',
					label: '昭通'
				}, {
					value: '红河哈尼族彝族自治州',
					label: '红河哈尼族彝族自治州'
				}, {
					value: '文山壮族苗族自治州',
					label: '文山壮族苗族自治州'
				}, {
					value: '西双版纳傣族自治州',
					label: '西双版纳傣族自治州'
				}
			]
		},
		{
			//		'西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
			value: '西藏',
			label: '西藏',
			children: [{
					value: '拉萨',
					label: '拉萨'
				}, {
					value: '昌都地区',
					label: '昌都地区'
				}, {
					value: '林芝地区',
					label: '林芝地区'
				},
				{
					value: '那曲地区',
					label: '那曲地区'
				}, {
					value: '山南地区',
					label: '山南地区'
				}, {
					value: '日喀则地区',
					label: '日喀则地区'
				},
				{
					value: '阿里地区',
					label: '阿里地区'
				}
			]
		},
		{
			//		'海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
			value: '海南',
			label: '海南',
			children: [{
					value: '海口',
					label: '海口'
				}, {
					value: '五指山',
					label: '五指山'
				}, {
					value: '儋州',
					label: '儋州'
				},
				{
					value: '三亚',
					label: '三亚'
				}, {
					value: '琼海',
					label: '琼海'
				}, {
					value: '文昌',
					label: '文昌'
				},
				{
					value: '万宁',
					label: '万宁'
				}, {
					value: '东方',
					label: '东方'
				}, {
					value: '澄迈县',
					label: '澄迈县'
				},
				{
					value: '定安县',
					label: '定安县'
				}, {
					value: '屯昌县',
					label: '屯昌县'
				}, {
					value: '临高县',
					label: '临高县'
				},
				{
					value: '白沙黎族自治县',
					label: '白沙黎族自治县'
				}, {
					value: '昌江黎族自治县',
					label: '昌江黎族自治县'
				}, {
					value: '乐东黎族自治县',
					label: '乐东黎族自治县'
				},
				{
					value: '琼中黎族苗族自治县',
					label: '琼中黎族苗族自治县'
				}, {
					value: '保亭黎族苗族自治县',
					label: '保亭黎族苗族自治县'
				}, {
					value: '陵水黎族自治县',
					label: '陵水黎族自治县'
				},
			]
		},
		{
			//		'甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
			value: '甘肃',
			label: '甘肃',
			children: [{
					value: '兰州',
					label: '兰州'
				}, {
					value: '酒泉',
					label: '酒泉'
				}, {
					value: '临夏回族自治州',
					label: '临夏回族自治州'
				},
				{
					value: '嘉峪关',
					label: '嘉峪关'
				}, {
					value: '张掖',
					label: '张掖'
				}, {
					value: '甘南藏族自治州',
					label: '甘南藏族自治州'
				},
				{
					value: '金昌',
					label: '金昌'
				}, {
					value: '庆阳',
					label: '庆阳'
				},
				{
					value: '白银',
					label: '白银'
				}, {
					value: '平凉',
					label: '平凉'
				},
				{
					value: '天水',
					label: '天水'
				}, {
					value: '定西',
					label: '定西'
				},
				{
					value: '武威',
					label: '武威'
				}, {
					value: '陇南',
					label: '陇南'
				}
			]
		},
		{
			//		'宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
			value: '宁夏',
			label: '宁夏',
			children: [{
					value: '银川',
					label: '银川'
				}, {
					value: '石嘴山',
					label: '石嘴山'
				}, {
					value: '吴忠',
					label: '吴忠'
				},
				{
					value: '固原',
					label: '固原'
				}, {
					value: '中卫',
					label: '中卫'
				}
			]
		},
		{
			//		'青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
			value: '青海',
			label: '青海',
			children: [{
					value: '西宁',
					label: '西宁'
				}, {
					value: '海北藏族自治州',
					label: '海北藏族自治州'
				}, {
					value: '黄南藏族自治州',
					label: '黄南藏族自治州'
				},
				{
					value: '海东地区',
					label: '海东地区'
				}, {
					value: '海南藏族自治州',
					label: '海南藏族自治州'
				}, {
					value: '果洛藏族自治州',
					label: '果洛藏族自治州'
				},
				{
					value: '玉树藏族自治州',
					label: '玉树藏族自治州'
				}, {
					value: '海西蒙古族藏族自治州',
					label: '海西蒙古族藏族自治州'
				}
			]
		},
		{
			//		'新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
			value: '新疆',
			label: '新疆',
			children: [{
					value: '乌鲁木齐',
					label: '乌鲁木齐'
				}, {
					value: '哈密地区',
					label: '哈密地区'
				}, {
					value: '喀什地区',
					label: '喀什地区'
				},
				{
					value: '克拉玛依',
					label: '克拉玛依'
				}, {
					value: '和田地区',
					label: '和田地区'
				}, {
					value: '克孜勒苏柯尔克孜自治州',
					label: '克孜勒苏柯尔克孜自治州'
				},
				{
					value: '吐鲁番地区',
					label: '吐鲁番地区'
				}, {
					value: '阿克苏地区',
					label: '阿克苏地区'
				}, {
					value: '巴音郭楞蒙古自治州',
					label: '巴音郭楞蒙古自治州'
				},
				{
					value: '五家渠',
					label: '五家渠'
				}, {
					value: '阿拉尔',
					label: '阿拉尔'
				}, {
					value: '昌吉回族自治州',
					label: '昌吉回族自治州'
				},
				{
					value: '图木舒克',
					label: '图木舒克'
				}, {
					value: '石河子',
					label: '石河子'
				}, {
					value: '博尔塔拉蒙古自治州',
					label: '博尔塔拉蒙古自治州'
				}, {
					value: '伊犁哈萨克自治州',
					label: '伊犁哈萨克自治州'
				}
			]
		},
		{
			//		'香港': ['香港'],
			value: '香港',
			label: '香港',
			children: [{
				value: '香港',
				label: '香港'
			}]
		},
		{
			//		'澳门': ['澳门'],
			value: '澳门',
			label: '澳门',
			children: [{
				value: '澳门',
				label: '澳门'
			}]
		},
		{
			//		'台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
			value: '台湾',
			label: '台湾',
			children: [{
					value: '台北市',
					label: '台北市'
				}, {
					value: '苗栗县',
					label: '苗栗县'
				}, {
					value: '嘉义县',
					label: '嘉义县'
				},
				{
					value: '高雄市',
					label: '高雄市'
				}, {
					value: '台中县',
					label: '台中县'
				}, {
					value: '台南县',
					label: '台南县'
				},
				{
					value: '台北县',
					label: '台北县'
				}, {
					value: '彰化县',
					label: '彰化县'
				}, {
					value: '高雄县',
					label: '高雄县'
				},
				{
					value: '桃园县',
					label: '桃园县'
				}, {
					value: '南投县',
					label: '南投县'
				}, {
					value: '屏东县',
					label: '屏东县'
				},
				{
					value: '新竹县',
					label: '新竹县'
				}, {
					value: '云林县',
					label: '云林县'
				}, {
					value: '宜兰县',
					label: '宜兰县'
				}, {
					value: '花莲县',
					label: '花莲县'
				},
				{
					value: '新竹市',
					label: '新竹市'
				}, {
					value: '基隆市',
					label: '基隆市'
				}, {
					value: '澎湖县',
					label: '澎湖县'
				}, {
					value: '台东县',
					label: '台东县'
				},
				{
					value: '台南市',
					label: '台南市'
				}, {
					value: '嘉义市',
					label: '嘉义市'
				}, {
					value: '台中市',
					label: '台中市'
				}
			]
		},
	],

	back_id: 1,
	worksOpId: '', //作者的memId
	input_x: {}, //评论信息

	pinlun_child: [],

	/*2018/5/8*/
	is_report: false, //举报
	is_tan: false, //我的作品点击评论进入作品详情，弹出评论
	select_location: '', //选择的地区
	is_bottom: false,

	opstion_s: {}, //微信转发临时存储
	guanzhu: true, //个人资料页，关注栏的显隐
	gift_data: '',
	pan_duan_s: 1,
	is_friendss: false, //匹配弹出框
	update_version: false, //新版本更新弹窗
	version: "1.0.2", //当前版本号
	is_sc: '', //隐藏功能
	is_headline: false, //用来头条、深度评论打赏时，回调页面
	is_comment_dashang: false, //是否评论打赏
	is_pay: false, //是否余额不足
	top:0,//记录滑动的位置
	///////////////毕业季发布作品临时存储+判断、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
	 lei_xing_s:0,//进入类型判断
	 
	 nian_ss:'',//毕业年
	 
	 yuan_xiao:'',//院校选择
	 diaries_privacy:'',//闲情的隐私设置选择
	report_works:'',//举报作品的数据
	////////////////毕业季展开-热门榜||热议榜-判断//////////////////////////////////////////////////////////
	BS_gs:0,//0跳转热门榜，1跳转热议榜
	 report_data:'',//举报评论的数据
	 if_item:'',//用来储存人气榜选择的条件,筛选页用
	 if_articleItem:'',//用来储存头条选择的条件,筛选页用
	 if_depth_articleItem:'',//用来储存深度选择的条件,筛选页用
	//request_url:"http://192.168.1.102:8080",//全局请求头
	request_url: "http://www.meetartapp.com:8080/a10", //全局请求头
	san_s:'i',
	is_detail:'1',//是否刷新父评论,1是父评论,2是子评论
	web_s:'',//作品详情返回页面临时存储

};

//修改状态
const mutations = {};

export default new Vuex.Store({
	state,
	mutations
})