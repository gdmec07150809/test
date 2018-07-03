import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui';

Vue.use(Element, { size: 'small' });

import slider from '@/components/home/slider.vue'
import pay from '@/components/pay.vue'
import photo_test from '@/components/photo_test.vue'



import square from '@/components/square/square.vue'
import add from '@/components/add/add.vue'
import add_facth from '@/components/add/add_facth.vue'
import Typeofwork from '@/components/add/Type of work.vue'
import Publisharticles from '@/components/add/Publish articles.vue'
import Deeparticle from '@/components/add/Deep article.vue'

import select_block from '@/components/square/select_block.vue'

import select_article_block from '@/components/square/Art information/select_article_block.vue'
import select_depth_article_block from '@/components/square/Art information/select_depth_article_block.vue'
import Conditionscreening from '@/components/home/Condition screening.vue'

import Diaries from '@/components/add/Diaries.vue'
import Diaries_tows from '@/components/add/Diaries_tows.vue'

import Explain from '@/components/add/Explain.vue'

import privacy_setting from '@/components/add/privacy_setting.vue'

import message from '@/components/message/message.vue'
import chat from '@/components/message/chat.vue'
import dynamic from '@/components/message/dynamic(1).vue'

import news from '@/components/message/news.vue'
import myfensi from '@/components/message/news/myfensi(1).vue'
import Ctoncs from '@/components/message/news/Ct on cs(1).vue'
import dashang from '@/components/message/news/dashang(1).vue'


import myspace from '@/components/myspace/myspace.vue'
import My_work from '@/components/myspace/My_work.vue'
import My_leisure from '@/components/myspace/My_leisure.vue'
import My_attention from '@/components/myspace/My_attention.vue'
import My_fans from '@/components/myspace/My_fans.vue'
import My_friend from '@/components/myspace/My_friend.vue'
import mywallet from '@/components/myspace/mywallet.vue'
import Accountdetails from '@/components/myspace/mywallet/Account details.vue'
import Rechargepage from '@/components/myspace/mywallet/Recharge page.vue'
import setfocus from '@/components/myspace/set focus.vue'
import Modifythepassword from '@/components/myspace/setfocus/Modify_the_password.vue'
import Myarticle from '@/components/myspace/My article.vue'


import Mycollection from '@/components/myspace/My collection.vue'
import works from '@/components/myspace/Mycollection/works.vue'
import Leisure from '@/components/myspace/Mycollection/Leisure.vue'
import actives_rower from '@/components/myspace/Mycollection/actives_rower.vue'

import information from '@/components/myspace/information.vue'
import Artchronology from '@/components/myspace/information/Art chronology.vue'
import Newchronology from '@/components/myspace/information/Newchronology.vue'
import select_language from '@/components/myspace/information/select_language.vue'
import StyleofArt from '@/components/myspace/information/Style of Art.vue'
import dentitybackground from '@/components/myspace/information/dentity background.vue'
import Pairing_success from '@/components/home/Pairing_success.vue'
import about_us from '@/components/myspace/about_us.vue'
import Identitybackground2 from '@/components/myspace/information/Identity background 2.vue'


import Art_information from '@/components/square/Art information.vue'
import depth from '@/components/square/Art information/depth.vue'
import square_diaries from '@/components/square/Art information/square_diaries.vue'
import one_minute from '@/components/square/Art information/one_minute.vue'
import The_headlines from '@/components/square/Art information/The headlines.vue'
import Details_of_the_article from '@/components/square/Art information/Details of the article.vue'//艺术咨询--》头条/深度--》文章详情
import Details_of_the_article_s from '@/components/square/Art information/Details of the article(2).vue'

import Popularity_list from '@/components/square/Popularity list.vue'//广场-人气榜

import regiter from '@/components/logins/regiter'
import home from '@/components/logins/home'
import login from '@/components/logins/login'
import bing_phone from '@/components/logins/bing_phone'
import regiter_information from '@/components/logins/regiter_information'
import select_fan from '@/components/logins/select_fan'
import forget from'@/components/logins/forget'

import works_detail from'@/components/Details_of_the_work/works_detail'
import works_detail_s from'@/components/Details_of_the_work/works_detail(2)'

import replydialog from'@/components/Details_of_the_work/replydialog'
import reportdialog from'@/components/Details_of_the_work/reportdialog'

import personal_data from'@/components/personal/personal_data'
import data from'@/components/personal/data'
import works_to from'@/components/personal/works'
import photos from'@/components/personal/photos'
import diary from'@/components/personal/diary'

import diary_detail from'@/components/diary_detail'
import photos_detail from'@/components/photos_detail'
import article from'@/components/personal/article'
import comment from'@/components/personal/comment'
import commnet_content from'@/components/commnet_content'

import user_guide from'@/components/user_guide/user_guide'
import guide_one from'@/components/user_guide/guide_one'
import guide_two from'@/components/user_guide/guide_two'
import guide_three from'@/components/user_guide/guide_three'
import guide_four from'@/components/user_guide/guide_four'
import guide_five from'@/components/user_guide/guide_five'
import guide_six from'@/components/user_guide/guide_six'

import photos_datu from '@/components/photos_datu.vue'

import chat_to from'@/components/chat(1)'
import chat_to_s from'@/components/chat(2)'

import swiper2 from '@/components/swiper2.vue'


import BS_add from '@/components/add/BS_add.vue'
import BS_add_before from '@/components/add/BS_add_before.vue'
import BS_yuanxiao from '@/components/add/BS_yuanxiao.vue'
import BS_explain from '@/components/add/BS_explain.vue'

import BS_Graduation_season from '@/components/square/BS_Graduation season.vue'
import BS_sx from '@/components/square/BS_Graduation_season/BS_sx.vue'
import BS_remen from '@/components/square/BS_Graduation_season/BS_remen.vue'
import BS_reyi from '@/components/square/BS_Graduation_season/BS_reyi.vue'

import BS_stack from '@/components/square/BS_Graduation_season/BS_slider.vue'
import BS_Claim from '@/components/BS_Claim.vue'


import VueResource from 'vue-resource';
Vue.use(VueResource);


Vue.use(Router)

export default new Router({
	
  routes: [
  
    {path:'/BS_stack',component:BS_stack},//跳投票页
  
	{path:'/swiper2',component:swiper2},//引导页
    {path:'/slider',component:slider},
   	{path:'/pay',component:pay},//测试支付
   	{path:'/photo_test',component:photo_test},//测试裁剪
   	
    
     {path:'/square',component:square,
        children:[
              {path:'/square/depth',component:depth},//艺术资讯-深度
              {path:'/square/The_headlines',component:The_headlines},//艺术资讯-头条
              {path:'/square/Popularity_list',component:Popularity_list},//人气榜
              {path:'/square/dynamic',component:dynamic},//朋友圈
               {path:'/square/square_diaries',component:square_diaries},//闲情
                {path:'/square/one_minute',component:one_minute},//一分钟
               
              {path:'/square/',component:Popularity_list}
        ]
     },
     {path:'/select_block',component:select_block},
     {path:'/select_article_block',component:select_article_block},//头条板块选择
      {path:'/select_depth_article_block',component:select_depth_article_block},//深度板块选择
      
     {path:'/add',component:add},
     {path:'/add_facth',component:add_facth},
     {path:'/photos_datu',component:photos_datu},
     {path:'/privacy_setting',component:privacy_setting},
     
     
     {path:'/message',component:message,
      children:[
        
        {path:'/message/news',component:chat},
        {path:'/message/chat',component:news},
//      {path:'/message/dynamic',component:dynamic},
        {path:'/message/',component:news},//跳转聊天页面   默认显示 ，消息， 子路由
      ]
     },
     
     {path:'/myspace',component:myspace},
     {path:'/Diaries',component:Diaries},
     {path:'/Diaries_tows',component:Diaries_tows},
     
      {path:'/Explain',component:Explain},
     
     {path:'/information',component:information},
     {path:'/Artchronology',component:Artchronology},
     {path:'/Newchronology',component:Newchronology},
      {path:'/select_language',component:select_language},
    
     {path:'/StyleofArt',component:StyleofArt},
     {path:'/My_work',component:My_work},
     {path:'/My_leisure',component:My_leisure},
     {path:'/My_attention',component:My_attention},
     {path:'/My_fans',component:My_fans},
     {path:'/My_friend',component:My_friend},
     {path:'/dentitybackground',component:dentitybackground},
     {path:'/mywallet',component:mywallet},
     {path:'/Accountdetails',component:Accountdetails},
     {path:'/Rechargepage',component:Rechargepage},
     
     {path:'/Mycollection',component:Mycollection,
       children:[
           {path:'/Mycollection/works',component:works},
           {path:'/Mycollection/Leisure',component:Leisure},
           {path:'/Mycollection/actives_rower',component:actives_rower},
           
           {path:'/Mycollection',component:works},
        ],
     },
     
     {path:'/setfocus',component:setfocus},
     {path:'/about_us',component:about_us},
     {path:'/Modifythepassword',component:Modifythepassword},
     
     {path:'/myfensi',component:myfensi},
     {path:'/Ctoncs',component:Ctoncs},
     {path:'/dashang',component:dashang},
     
     {path:'/Conditionscreening',component:Conditionscreening},
     
     {path:'/Typeofwork',component:Typeofwork},
     {path:'/Publisharticles',component:Publisharticles},
      {path:'/Deeparticle',component:Deeparticle},
       
      {path:'/Myarticle',component:Myarticle},
       {path:'/Pairing_success',component:Pairing_success},
       
       
       {path:'/Art_information',component:Art_information,//广场-艺术资讯
          children:[
              {path:'/Art_information/depth',component:depth},//艺术资讯-深度
              {path:'/Art_information/The_headlines',component:The_headlines},//艺术资讯-头条
              {path:'/Art_information/',component:The_headlines},
          ]
       },
       
       {path:'/Popularity_list',component:Popularity_list},//广场-人气榜
       
       {path:'/Details_of_the_article',component:Details_of_the_article},//艺术资讯-头条||深度-文章详情
        {path:'/Details_of_the_article_s',component:Details_of_the_article_s},
        {path:'/Identitybackground2',component:Identitybackground2},
        
        {path:'/BS_Claim_s',component:BS_Claim},//跳认领页
        
        
        ///登录注册
        
        
        {path:'/regiter',component:regiter},/*注册*/
    {path:'/home',component:home},  /*登录首页*/
//  {path:'/#/',component:home},
    
    {path:'/login',component:login}, /*登录*/
   
    {path:'/bing_phone',component:bing_phone}, /*绑定手机*/
    {path:'/regiter_information',component:regiter_information}, /*注册基本信息*/
     {path:'/select_fan',component:select_fan}, /*注册选择领域*/
    	{path:'/forget',component:forget},/*忘记密码*/
    	
    		{path:'/works_detail',component:works_detail},/*作品详情*/
    		{path:'/works_detail_s',component:works_detail_s},
			{path:'/replydialog',component:replydialog},/*评论作品*/
			{path:'/reportdialog',component:reportdialog},/*举报弹窗*/
    	
    	{path:'/personal_data',component:personal_data},/*个人资料*/
    {path:'/data',component:data}, /*基本信息*/
    {path:'/works_to',component:works_to},/*作品*/
    {path:'/photos',component:photos},/*相册*/
    {path:'/diary',component:diary},/*闲情*/
    {path:'/diary_detail',component:diary_detail},/*闲情详情*/
    {path:'/photos_detail',component:photos_detail},/*相册详情*/
    {path:'/article',component:article},/*文章*/
    {path:'/comment',component:comment},/*评论*/
   	{path:'/commnet_content',component:commnet_content},/*评论弹窗*/
    	
    	{path:'/chat_to',component:chat_to},/*聊天*/
    	{path:'/chat_to_s',component:chat_to_s},
    	
    	{path:'/user_guide',component:user_guide},/*新手指南*/
		{path:'/guide_one',component:guide_one},/*问题一*/
		{path:'/guide_two',component:guide_two},/*问题二*/
		{path:'/guide_three',component:guide_three},/*问题三*/
		{path:'/guide_four',component:guide_four},/*问题四*/
		{path:'/guide_five',component:guide_five},/*问题五*/
		{path:'/guide_six',component:guide_six},/*问题六*/
		{path:'/BS_add',component:BS_add},
		{path:'/BS_add_before',component:BS_add_before},//毕业季发布前
		
        {path:'/BS_yuanxiao',component:BS_yuanxiao},
        {path:'/BS_explain',component:BS_explain},
        {path:'/BS_sx',component:BS_sx},
  
        {path:'/square',component:square,
        children:[{path:'/square/depth',component:depth},//艺术资讯-深度
              
              {path:'/square/The_headlines',component:The_headlines},//艺术资讯-头条
              {path:'/square/Popularity_list',component:Popularity_list},//人气榜
              {path:'/square/dynamic',component:dynamic},//朋友圈
              
               {path:'/square/BS_Graduation_season',component:BS_Graduation_season,
               children:[
                  {path:'/BS_Graduation_season/BS_remen',component:BS_remen},//热门榜 
                   {path:'/BS_Graduation_season/BS_reyi',component:BS_reyi},
               ]
               },//毕业季
//            {path:'/square/',component:Popularity_list}
              
        ]
     },
		
    	
    	
//  	if()
    	  
    	 {path:'/*',component:slider},
    	// {path:'/*',component:home},
    	
  ]
})
