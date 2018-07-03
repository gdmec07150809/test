<template>
	<div style="width: 100%; ">

		<!--<div class="box_top" style="width: 100%;height: 0.88rem;background: white;position: fixed;top: 0;left: 0;z-index:99;line-height: 0.88rem;">
	   		<img @click="hui" style="width: 0.3rem;height: 0.3rem;float: left;margin:0.25rem 0.3rem;" src="../../assets/img/zuo.png" alt="" />
	   		<p style="font-size: 0.36rem;margin-left: 3.1rem;color: #333333;">完善资料</p>
	   	</div>-->
		<div class="head">
			<div style="width: 10%;float: left;">
				<img style="width: 0.3rem;margin-left: 0.3rem;float: left;margin-top: 0.1rem;" src="../../assets/img/zuo.png" @click="hui" />
			</div>

			<div class="title">
				<p>完善资料</p>
			</div>
			<div style="width: 10%;float: right;">
				<p @click="GO" style="font-size: 0.3rem;color:rgb(255, 157, 0);">保存</p>
			</div>
		</div>

		<div class="box_to" style="width:95%;">
			<!--
           	作者：2443611475@qq.com
           	时间：2018-03-17
           	描述：头像上传
           -->
			<div style="margin-top:0.8rem;position: relative;" @click="show_camrea">

				<div class="img_s" style="overflow: hidden;position: relative;z-index: 500;">
					<img id="tou" :src="$store.state.detailed_information.opPic" class="img_class" />

				</div>
				<!--<img src="../../assets/img/20130527034917708.gif"  style="width: 1.5rem;height: 1.5rem;position: absolute;top: 0;left: 2.7rem;z-index: 600;" v-show="is_tou"/>-->
				<!--<input id="xgtx" style="opacity:0;position:absolute;right: 2.5rem;top: 0rem;z-index: 550;" class="zhu" ref="ss" name="file" type="file" accept="image/*" @change="uploadpic"   />-->
			</div>
			<p style="font-size:0.28rem;text-align:center;color: #CACACA;margin-top:0.5rem;" @click="show_camrea">头像上传</p>

			<div style="margin-top: 0.5rem;border-bottom: 0.005rem solid #f1f1f1;overflow: hidden;">
				<p style="font-size: 0.36rem;font-weight: 600;">昵称</p>

				<input @click="input_none" id="nink" class="inps" style="width:70%;font-size: 0.3rem;float:left;height: 1rem;color: #CCCCCC;" type="text" v-model="$store.state.detailed_information.nickname" maxlength="8" placeholder="请输入您的昵称" />

				<p style="float: right;margin-right:5%;line-height: 1rem;color: #FF9D00;font-size: 0.26rem;position: relative;z-index:300;" @click="input_show">修改昵称</p>
				<!--<textarea style="font-size: 0.3rem;float:left;height: 1rem;color: #4A90FE;width: 95%;" type="text" v-model="$store.state.detailed_information.signature" placeholder="请编辑您的独特个性签名(不超过50个字)"/>-->
			</div>

			<div style="margin-top: 0.2rem;overflow: hidden;">
				<p style="font-size: 0.36rem;font-weight: 600;">个人签名</p>
				<input class="inps" id="inps" style="font-size: 0.3rem;float:left;height: 1rem;color: #CCCCCC;border-bottom: 0.005rem solid #f1f1f1;" type="text" v-model="$store.state.detailed_information.signature" maxlength="20" placeholder="请编辑您的独特个性签名(不超过20个字)" />

				<!--<textarea style="font-size: 0.3rem;float:left;height: 1rem;color: #4A90FE;width: 95%;" type="text" v-model="$store.state.detailed_information.signature" placeholder="请编辑您的独特个性签名(不超过50个字)"/>-->
			</div>

			<div class="boxsta">
				<p style="font-size: 0.36rem;font-weight: 600;margin-top: 0.3rem;">基本信息</p>

				<div style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #f1f1f1;">
					<p style="font-size:0.3rem;color:#CACACA;float: left;">性别</p>

					<p style="margin-left: 2rem;" class="inpsss">{{$store.state.detailed_information.opSex}}</p>

				</div>

				<div @click="sr" style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #f1f1f1;">

					<p style="font-size:0.3rem;color:#CACACA;float: left;">生日</p>
					<p style="font-size:0.3rem;float: left;margin-left: 1.3rem;">{{$store.state.detailed_information.opBirthday}}</p>
					<!--<i style="font-size: 0.5rem;float: right;margin: 0.25rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.36rem;" />
				</div>

				<div style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #f1f1f1;">
					<p style="font-size:0.3rem;color:#CACACA;float: left;">星座</p>
					<input type="text" class="inpsss" readonly="true" v-model="$store.state.detailed_information.opConstellation"></input>
				</div>

				<!--<div  style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #666666;position: relative;">
	   	  	  	<p style="font-size:0.3rem;color:#CACACA;float: left;">所在地区</p>
	   	  	  	  
	   	  	  	    <div style="width:6rem;position: absolute;top: 0;left: 2rem;top: -0.2rem;">
	   	  	  	     <Cascader  :placeholder="pv+'/'+ct" :data="$store.state.adr" @on-change="changeAdress" ></Cascader>
	   	  	  	    </div>
	   	  	  	    
	   	  	  	    <i style="font-size: 0.5rem;float: right;margin: 0.25rem;" class="fa fa-angle-right"></i>
	   	  	  </div>-->

			</div>

			<div class="boxsta">
				<p style="font-size: 0.36rem;font-weight: 600;margin-top: 0.3rem;">教育背景</p>

				<div @click="xls" style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #f1f1f1;">
					<p style="font-size:0.3rem;color:#CACACA;float: left;">学历</p>
					<p style="font-size:0.3rem;float: left;margin-left: 1.3rem;">{{$store.state.detailed_information.education}}</p>
					<!--<i style="font-size: 0.5rem;float: right;margin: 0.25rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.36rem;" />
				</div>

				<div style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #f1f1f1;">
					<p style="font-size:0.3rem;color:#CACACA;float: left;">专业</p>
					<!--<p style="font-size:0.3rem;float: left;margin-left: 1.3rem;">请填写个人专业</p>-->
					<input style="margin-left: 1.34rem;" id="zhuan" class="inpsss" v-model="$store.state.detailed_information.profession" placeholder="请填写" maxlength="20"></input>

				</div>

				<div style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #f1f1f1;">
					<p style="font-size:0.3rem;color:#CACACA;float: left;">毕业院校</p>
					<!--<p style="font-size:0.3rem;float: left;margin-left: 0.7rem;">请填写毕业院校</p>-->
					<input style="margin-left: 0.72rem;" type="text" class="inpsss" v-model="$store.state.detailed_information.schoolName" placeholder="请填写" maxlength="20"></input>
				</div>
				<div @click="yy" style="width:100%;height:1rem;line-height:1rem;border-bottom: 0.005rem solid #f1f1f1;">
					<p style="font-size:0.3rem;color:#CACACA;float: left;">语言能力</p>
					<p style="width:4rem;font-size:0.3rem;float:left;margin-left: 0.7rem;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{$store.state.detailed_information.languageLevel}}</p>
					<!--<i style="font-size: 0.5rem;float: right;margin: 0.25rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.36rem;" />
				</div>

			</div>

			<div @click="dentitybackground" style="width: 100%;clear: both;">
				<p style="font-size: 0.36rem;font-weight: 600;margin-top: 0.3rem ;clear: both;">身份背景</p>

				<div style="line-height:1rem;width:100%;border-bottom: 0.005rem solid #f1f1f1;position:relative;;height:1.3rem;">

					<p v-show="$store.state.box_table.length==0" style="font-size:0.28rem;position:absolute;top: 0.1rem;color: #4A90FE;">请添加你的身份背景</p>

					<p v-show="$store.state.box_table.length!=0" style="font-size: 0.32rem;float: left;color: #CACACA;">{{$store.state.top_table}}</p>
					<p class="box_tabs" style="-webkit-box-orient: vertical;">{{wenxue_chuli}}</p>
					<!--<button v-show="i" class="brn" v-for="(i,index) in $store.state.box_table" style="">{{i}}</button>-->

					<!--<div style="width: 100%;border-bottom:0.01rem solid black;"></div>-->

				</div>
			</div>

			<div class="boxsta">
				<!--<p style="font-size: 0.36rem;font-weight: 600;margin-top: 0.5rem;">兴趣爱好</p>-->

				<div @click="xq1" style="width:100%;height:1.5rem;margin-top: 0.1rem;border-bottom: 0.005rem solid #f1f1f1;position: relative;">
					<p style="font-size: 0.36rem;font-weight: 600;color:#000; position: absolute;top: 0.1rem;">喜欢的艺术作品（{{$store.state.Hobby_box[0].length}}）</p>
					<!--<p  v-show="$store.state.Hobby_box[0]==[]" style="font-size:0.28rem;position:absolute;top: 0.44rem;color: #4A90FE;">请添加喜欢的风格</p>-->

					<div v-if="$store.state.Hobby_box[0].length>0" class="box_f" style="-webkit-box-orient: vertical;">
						{{works_chuli}}
						<!--<div v-for="(i,index) in $store.state.Hobby_box[0]"  class="btns_to">{{i}}</div>-->
					</div>
					<p v-else class="box_f">未选择</p>
					<!--<i style="font-size: 0.5rem;float: right;margin-top: 0.5rem;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.61rem 0.36rem;" />
				</div>

				<div @click="xq2" style="width:100%;height:1.5rem;margin-top: 0.1rem;border-bottom: 0.005rem solid #f1f1f1;position: relative;">
					<p style="font-size: 0.36rem;font-weight: 600;color:#000; position: absolute;top: 0.1rem;">喜欢的艺术书籍（{{$store.state.Hobby_box[1].length}}）</p>
					<!--<p  v-if="$store.state.Hobby_box[1].length==0" style="font-size:0.28rem;position: absolute;top: 0.54rem;color: #4A90FE;">请添加喜欢的书籍</p>-->

					<div v-if="$store.state.Hobby_box[1].length>0" class="box_f" style="-webkit-box-orient: vertical;">
						{{book_chuli}}
						<!--  <div v-for="(i,index) in $store.state.Hobby_box[1]"  class="btns_to">{{i}}</div>-->
					</div>
					<p v-else class="box_f">未选择</p>
					<!--<i style="font-size: 0.5rem;float: right;margin-top: 0.5rem;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.61rem 0.36rem;" />
				</div>

				<div @click="xq3" style="width:100%;height:1.5rem;margin-top: 0.1rem;border-bottom: 0.005rem solid #f1f1f1;position: relative;">
					<p style="font-size: 0.36rem;font-weight: 600;color:#000; position: absolute;top: 0.1rem;">喜欢的运动（{{$store.state.Hobby_box[2].length}}）</p>
					<!--<p  v-if="$store.state.Hobby_box[2].length==0" style="font-size:0.28rem;position: absolute;top: 0.54rem;color: #4A90FE;">请添加喜欢的运动</p>-->

					<div v-if="$store.state.Hobby_box[2].length>0" class="box_f" style="-webkit-box-orient: vertical;">
						{{run_chuli}}
						<!--<div v-for="(i,index) in $store.state.Hobby_box[2]"  class="btns_to">{{i}}</div>-->
					</div>
					<p v-else class="box_f">未选择</p>
					<!--<i style="font-size: 0.5rem;float: right;margin-top: 0.5rem;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.61rem 0.36rem;" />
				</div>

				<div @click="xq4" style="width:100%;height:1.5rem;margin-top: 0.1rem;border-bottom: 0.005rem solid #f1f1f1;position: relative;">
					<p style="font-size: 0.36rem;font-weight: 600;color:#000; position: absolute;top: 0.1rem;">喜欢的音乐（{{$store.state.Hobby_box[3].length}}）</p>
					<!--<p  v-if="$store.state.Hobby_box[3].length==0" style="font-size:0.28rem;position: absolute;top: 0.54rem;color: #4A90FE;">喜欢的艺术音乐</p>-->
					<div v-if="$store.state.Hobby_box[3].length>0" class="box_f" style="-webkit-box-orient: vertical;">
						<!-- <div v-for="(i,index) in $store.state.Hobby_box[3]"  class="btns_to">{{i}}</div>-->
						{{music_chuli}}
					</div>
					<p v-else class="box_f">未选择</p>
					<!--<i style="font-size: 0.5rem;float: right;margin-top: 0.5rem;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.61rem 0.36rem;" />
				</div>

				<div @click="xq5" style="width:100%;height:1.5rem;margin-top: 0.1rem;border-bottom: 0.005rem solid #f1f1f1;position: relative;">
					<p style="font-size: 0.36rem;font-weight: 600;color:#000; position: absolute;top: 0.1rem;">喜欢的食物（{{$store.state.Hobby_box[4].length}}）</p>
					<!--<p  v-if="$store.state.Hobby_box[4].length==0" style="font-size:0.28rem;position: absolute;top: 0.54rem;color: #4A90FE;">请添加喜欢的食物</p>-->
					<div v-if="$store.state.Hobby_box[4].length>0" class="box_f" style="-webkit-box-orient: vertical;">
						{{food_chuli}}
						<!--<div v-for="(i,index) in $store.state.Hobby_box[4]"  class="btns_to">{{i}}</div>-->
					</div>
					<p v-else class="box_f">未选择</p>
					<!--<i style="font-size: 0.5rem;float: right;margin-top: 0.5rem;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.61rem 0.36rem;" />
				</div>

				<div @click="xq6" style="width:100%;height:1.5rem;margin-top: 0.1rem;border-bottom: 0.005rem solid #f1f1f1;position: relative;">
					<p style="font-size: 0.36rem;font-weight: 600;color:#000; position: absolute;top: 0.1rem;">喜欢的电影（{{$store.state.Hobby_box[5].length}}）</p>
					<!--<p  v-if="$store.state.Hobby_box[5].length==0" style="font-size:0.28rem;position: absolute;top: 0.54rem;color: #4A90FE;">请添加喜欢的电影</p>-->
					<div v-if="$store.state.Hobby_box[5].length>0" class="box_f" style="-webkit-box-orient: vertical;">
						<!--<div v-for="(i,index) in $store.state.Hobby_box[5]" class="btns_to">{{i}}</div>-->
						{{movie_chuli}}
					</div>
					<p v-else class="box_f">未选择</p>
					<!--<i style="font-size: 0.5rem;float: right;margin-top: 0.5rem;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.61rem 0.36rem;" />
				</div>

				<div @click="xq7" style="width:100%;height:1.5rem;margin-top: 0.1rem;border-bottom: 0.005rem solid #f1f1f1;position: relative;">
					<p style="font-size: 0.36rem;font-weight: 600;color:#000; position: absolute;top: 0.1rem;">喜欢的动漫（{{$store.state.Hobby_box[6].length}}）</p>
					<!--<p  v-if="$store.state.Hobby_box[6].length==0" style="font-size:0.28rem;position: absolute;top: 0.54rem;color: #4A90FE;">请添加喜欢的动漫</p>-->
					<div v-if="$store.state.Hobby_box[6].length>0" class="box_f" style="-webkit-box-orient: vertical;">
						{{animation_chuli}}
						<!--<div v-for="(i,index) in $store.state.Hobby_box[6]" class="btns_to">{{i}}</div>-->
					</div>
					<p v-else class="box_f">未选择</p>
					<!--<i style="font-size: 0.5rem;float: right;margin-top: 0.5rem;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.61rem 0.36rem;" />
				</div>

				<div style="width:100%;height:2rem;border-bottom: 0.005rem solid #f1f1f1;position: relative;">
					<p style="font-size: 0.36rem;font-weight:600;margin-top: 0.3rem;">个人简介</p>
					<textarea id="jian" style="font-size:0.28rem;position:absolute;top:0.6rem;color:#CCCCCC;width:7rem;height:1.3rem;border:none;" type="text" v-model="$store.state.detailed_information.introduction" maxlength="200" placeholder="请添加你的个人简介(不超过200个字)" />
					<!--<i style="font-size: 0.5rem;float:right;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
				</div>

				<!--
                  	作者：2443611475@qq.com
                  	时间：2018-03-19
                  	描述：当艺术年表中没有内容的时候显示一下；列表
                  -->
				<div @click="to_Artchronology" :class="{yisto:tai.noe,yis:tai.noa}" style="width:100%;height:2rem;border-bottom: 0.005rem solid #f1f1f1;position: relative;">
					<p style="font-size: 0.36rem;font-weight:600;margin-top: 0.3rem;">艺术年表</p>
					<p style="font-size:0.28rem;position:absolute;top:1rem;color:#CCCCCC;">请添加艺术年表事件</p>
					<!--<i style="font-size: 0.5rem;float:right;margin-right: 0.3rem;" class="fa fa-angle-right"></i>-->
					<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.61rem 0.36rem;" />
				</div>
				<!--
                  	作者：2443611475@qq.com
                  	时间：2018-03-19
                  	描述：当艺术年表中有内容的时候显示一下；列表
                  -->
				<div @click="to_Artchronology" :class="{yosto:tai.noe1,yos:tai.noa1}" style="width:100%;border-bottom: 0.005rem solid #f1f1f1;position: relative;">
					<div style="width: 100%;height: 1rem;line-height: 1rem;">
						<p style="font-size:0.36rem;font-weight:600;float: left;">艺术年表</p>
						<!--<i style="font-size:0.5rem;float:right;margin-right:0.3rem;margin-top:0.13rem;" class="fa fa-angle-right"></i>-->
						<img src="../../assets/img/right_icon.png" style="float: right; height: 0.28rem;margin: 0.61rem 0.36rem;" />
						<!--<p  style="font-size:0.28rem;color:#4A90FE;float:right;margin-right: 0.1rem;">添加修改</p>-->
					</div>

					<div v-for="(i,index) in $store.state.nian_biao" style="width:100%;height:1rem;line-height:1rem;">
						<p style="font-size:0.34rem;color:black;float:left;width: 25%;">{{i.artYear}}</p>
						<div style="width: 60%;height: 100%;border-bottom:0.005rem solid #f1f1f1;    float: left;line-height:1rem;">
							<p style="font-size:0.28rem;color:black;float:left;" class="text">{{i.artEvent}}</p>
						</div>
					</div>
				</div>

				<!--<div style="width:100%;height:1.41rem;line-height:1rem;border-bottom: 0.005rem solid #666666;position: relative;"></div>-->
			</div>

		</div>

		<!--
        	作者：2443611475@qq.com
        	时间：2018-04-08
        	描述：生日选择器
        -->
		<div @touchmove.prevent v-show="show_d" style="position: fixed;z-index: 999;width: 100%;top: 0;">
			<div @click="xiao_si" style="width: 100%;height: 11rem;background: rgba(0,0,0,.5);" @touchmove.prevent></div>

			<mt-datetime-picker v-show="show_d" :startDate="startDate" :endDate="endDate" @cancel="handleCancel" @confirm="handleConfirm" type="date" date-format="{value}日" year-format="{value} 年" month-format="{value} 月">
			</mt-datetime-picker>
		</div>
		<!--
        	作者：672423400@qq.com
        	时间：2018-05-09
        	描述：性别
        -->

		<!--<div  v-show="sex" style="width:13.3rem;position:fixed;top:0;z-index:999;">
        	<div @click="yin" style="width:100%;height:8rem;background:rgba(0,0,0,.5);"></div>
        	
	        <mt-actionsheet  v-show="xl" :actions="sex_value" ></mt-actionsheet>
	        <div style="width: 100%;height: 0.8rem;background: white;position: fixed;bottom:0rem;z-index: 9991;" @click="canncel">
	        	<p style="text-align: center;font-size: 0.38rem;line-height: 0.8rem;color: #2d8cf0;">取消</p>
	        </div>
	    </div>-->
		<div @touchmove.prevent>
			<mt-actionsheet :actions="action_values" v-model="sheetVisible"></mt-actionsheet>
		</div>

		<div @touchmove.prevent>
			<mt-actionsheet :actions="action_photo" v-model="photo_sheetVisible"></mt-actionsheet>
		</div>
		<!--
       	作者：2443611475@qq.com
       	时间：2018-04-08
       	描述：学历
       -->
		<div @touchmove.prevent v-show="xl" style="width:13.3rem;position:fixed;top:0;z-index:999;">
			<div @click="yin" style="width:100%;height:8rem;background:rgba(0,0,0,.5);" @touchmove.prevent></div>

			<mt-actionsheet v-show="xl" :actions="action_value"></mt-actionsheet>

			<div style="width: 100%;height: 0.8rem;background: white;position: fixed;bottom:0rem;z-index: 9991;" @click="canncel">
				<p style="text-align: center;font-size: 0.38rem;line-height: 0.8rem;color: #2d8cf0;">取消</p>
			</div>
		</div>
		<!--
       	作者：2443611475@qq.com
       	时间：2018-04-08
       	描述：语言能力
       -->
		<div @touchmove.prevent v-show="yu" style="width:13.3rem;position:fixed;top:0;z-index:999;">
			<div @touchmove.prevent @click="yin" style="width:100%;height:8rem;background:rgba(0,0,0,.5);"></div>
			<mt-actionsheet :actions="yuyan" v-show="yu"></mt-actionsheet>
			<div style="width: 100%;height: 0.8rem;background: white;position: fixed;bottom:0rem;z-index: 9991;" @click="canncel1">
				<p style="text-align: center;font-size: 0.38rem;line-height: 0.8rem;color: #2d8cf0;">取消</p>
			</div>
		</div>

		<!--<div class="box_bottom" v-show="is_btn">
	   	   <button @click="GO" class="btns" style="width: 6.4rem;height: 0.9rem;background:#2E3135;">
	   	   	确认保存</button>
	   </div>-->

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
				sheetVisible: false,
				photo_sheetVisible: false,
				startDate: new Date('1980/01/01'),
				endDate: new Date(),

				nianbiao: [
					//				  {data:2017},{data:2014},{data:2018},{data:2019},
				],

				tai: {
					noa: true,
					noe: false,
					noa1: true,
					noe1: false
				},

				tos: true,
				bos: true,
				tos1: true,
				bos1: false,
				tos2: true,
				bos2: false,
				tos3: true,
				bos3: false,
				tos4: true,
				bos4: false,
				tos5: true,
				bos5: false,
				tos6: true,
				bos6: false,
				tos7: true,
				bos7: false,

				show_d: false,
				xl: false,
				sex: false,
				is_btn: true,
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
				yu: false,
				yuyan: [{
						name: '中文',
						method: this.y1
					}, {
						name: '英语',
						method: this.y2
					}, {
						name: '俄语',
						method: this.y3
					},
					{
						name: '德语',
						method: this.y4
					}, {
						name: '韩语',
						method: this.y5
					}, {
						name: '日语',
						method: this.y6
					},
				],
				action_values: [{
						name: '男',
						method: this.getnan
					},
					{
						name: '女',
						method: this.getnv
					}
				],
				action_photo: [{
						name: '拍照',
						method: this.camera_func
					},
					{
						name: '相册',
						method: this.photo_func
					}
				],
				is_nink: false, //是否修改昵称
				file_pic: [],
		
			}
		},
		methods: {
			input_none() {
				//console.log(11111)
				var myInput = document.getElementById('nink');
				myInput.blur(); //input主动失去焦点事件
				this.is_nink = false
			},
			input_show() {
				//console.log(11111)
				var myInput = document.getElementById('nink').focus(); //获取焦点事件
				this.is_nink = true
				//				
				//				 if (myInput == document.activeElement) {
				//                      //console.log('获取焦点');
				//                } 

			},
			show_camrea() {
				this.photo_sheetVisible = true
			},
			/**拍照*/
			camera_func() {
//				Toast({
//								message: "图片上传中，请稍等...",
//								position: 'middle',
//								duration: 6000
//							});
//							
				var cmr = plus.camera.getCamera();
				var res = cmr.supportedImageResolutions[0];
				var fmt = cmr.supportedImageFormats[0];
				//alert("Resolution: " + res + ", Format: " + fmt);
				var that = this;
				cmr.captureImage(function(path) {
					plus.io.resolveLocalFileSystemURL(path, function(entry) {
						var pathPhoto = entry.toLocalURL();
						that.$store.state.detailed_information.opPic=pathPhoto
						var imgLink = pathPhoto;
						var tempImage = new Image();
						tempImage.src = imgLink;
						tempImage.crossOrigin = "*";
						tempImage.onload = function() {
							plus.nativeUI.showWaiting('上传中...')
							var base64 = that.getBase64Image(tempImage);
							var ass=that.convertBase64UrlToBlob(base64)
							that.uploadpic(ass)
						}
					}, function(e) {

					});
				})
			},
			/**选择相册*/
			photo_func() {
//				Toast({
//								message: "图片上传中，请稍等...",
//								position: 'middle',
//								duration: 6000
//							});
					
				var that = this;
				plus.gallery.pick(function(a) {
					plus.io.resolveLocalFileSystemURL(a, function(entry) {
						var pathPhoto = entry.toLocalURL();
						that.$store.state.detailed_information.opPic=pathPhoto
						var imgLink = pathPhoto;
						var tempImage = new Image();
						tempImage.src = imgLink;
						tempImage.crossOrigin = "*";
						tempImage.onload = function() {
							plus.nativeUI.showWaiting('上传中...')
							var base64 = that.getBase64Image(tempImage);
							var ass=that.convertBase64UrlToBlob(base64)
							that.uploadpic(ass)
						}
					}, function(e) {
						console.log("读取拍照文件错误：" + e.message);
					});
				}, function(a) {}, {
					filter: "image"
				})
			},
			convertBase64UrlToBlob(urlData) {
				var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
				//处理异常,将ascii码小于0的转换为大于0
				var ab = new ArrayBuffer(bytes.length);
				var ia = new Uint8Array(ab);
				for(var i = 0; i < bytes.length; i++) {
					ia[i] = bytes.charCodeAt(i);
				}
				return new Blob([ab], {
					type: 'image/*'
				});
			},

			getBase64Image(img) {
				var canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, img.width, img.height);
				var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
				var dataURL = canvas.toDataURL("image/" + ext,0.8);
				return dataURL;
			},
			getnan() {
				this.$store.state.detailed_information.opSex = "男"
			},
			getnv() {
				this.$store.state.detailed_information.opSex = "女"
			},
			show_sexs() {
				this.sheetVisible = true

			},
			setNink() {

				this.is_nink = true;
				document.getElementById("nink").readOnly = false;

			},

			canncel1() {
				this.yu = false
			},
			/*取消学历*/
			canncel() {
				this.xl = false
			},
			xiao_si() {
				this.show_d = false
			},
			uploadpic(f) { //上传头像事件
				
				var url = this.$store.state.request_url + "/api/map/user/uploadOpPic.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)
				//var aa = document.getElementById("xgtx").files[0];
				//alert("进来："+aa.name)
				var aa = f;
				//alert(aa.value + "size:" + aa.size + "name:" + aa.name)
				if(aa != null && aa != "") {
					if(this.verificationPicFile(aa)) {
						var form = new FormData();

						form.append("picName", aa, "test.jpg");
						var settings = {
							async: false,
							crossDomain: true,
							url: this.$store.state.request_url + "/api/map/user/uploadOpPic.do?memId=" + id + "&ts=" + ts,
							method: "POST",
							processData: false,
							contentType: false,
							mimeType: "multipart/form-data",
							dataType: "json",
							headers: {
								'sIgn': sign
							},
							data: form
						};
						var that = this;
						$.ajax(settings).done(function(abc) {

							if(abc.meta.msg == "ok") {
								plus.nativeUI.closeWaiting()
								//console.log(abc.data.sourcePicUrl)
								//alert("上传文件：" + abc.meta.msg + "---" + abc.data.sourcePicUrl)
								//图片上传成功后 显示到预览 删除input 按钮变为保存修改)
								that.$store.state.detailed_information.opPic = abc.data.sourcePicUrl
								
								var img = new Image();
								img.src = $("#tou")[0].src;
								//alert(img.width+":"+img.height)
								if(img.width < img.height) {
									$("#tou").css("width", "100%");
									$("#tou").css("height", "auto");
								} else {
									$("#tou").css("width", "auto");
									$("#tou").css("height", "100%");
								}
							} else {
								//alert("失败上传路径：" + abc.meta.msg);
							}
						});
					} else {
						
						Toast({
							message: "头像大小不能超过5M",
							position: 'middle',
							duration: 2000
						});
					}
				} else {
					
					Toast({
						message: "请重新选择图片",
						position: 'middle',
					});
				}

			},
			//图片大小验证  不能超过3M
			verificationPicFile(file) {
				var fileSize = 0;
				var fileMaxSize = 5; //3M  
				var filePath = file;
				//console.log("图片路径:" + filePath)
				if(filePath) {
					fileSize = file.size;
					//alert("图片大小:" + fileSize)
					var size = fileSize / (1024 * 1024*8);
					//alert("图片:" + size)
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

			yy() {
				//this.yu = true
				this.$router.push({
					path: '../select_language'
				});
			},
			y1() {
				this.$store.state.detailed_information.languageLevel = '中文';
				this.yu = false
			},
			y2() {
				this.$store.state.detailed_information.languageLevel = '英语';
				this.yu = false
			},
			y3() {
				this.$store.state.detailed_information.languageLevel = '俄语';
				this.yu = false
			},
			y4() {
				this.$store.state.detailed_information.languageLevel = '德语';
				this.yu = false
			},
			y5() {
				this.$store.state.detailed_information.languageLevel = '韩语';
				this.yu = false
			},
			y6() {
				this.$store.state.detailed_information.languageLevel = '日语';
				this.yu = false
			},

			sr() { //生日按钮被点击，弹出选项
				this.show_d = true
			},

			handleCancel() {
				this.show_d = false
			},
			handleConfirm(e) { //选择生日
				var d = new Date(e);
				var youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
				this.getAstro((d.getMonth() + 1), d.getDate())
				this.$store.state.detailed_information.opBirthday = youWant;

				this.show_d = false;
			},

			changeAdress(e) { //地区选择器
				this.$store.state.detailed_information.opAddress = e[0] + " " + e[1];
				////console.log(e);
			},

			// 根据生日的月份和日期，计算星座。
			getAstro(m, d) {
				this.$store.state.detailed_information.opConstellation = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(m * 2 - (d < "102223444433".charAt(m - 1) - -19) * 2, 2) + "座";
			},

			hui() {
				//				window.location = '#/myspace'
				this.$router.push({
					path: '../myspace'
				});
			},
			dbpd() { //判断艺术年表两个样式的切换
				if(this.$store.state.nian_biao != null) {
					if(this.$store.state.nian_biao.length == 0) {
						this.tai.noa = true;
						this.tai.noe = false
						this.tai.noa1 = false;
						this.tai.noe1 = true
					} else {
						this.tai.noa = false;
						this.tai.noe = true
						this.tai.noa1 = true;
						this.tai.noe1 = false
					}
				} else if(this.$store.state.nian_biao == null) {
					this.tai.noa = true;
					this.tai.noe = false
					this.tai.noa1 = false;
					this.tai.noe1 = true
				}
			},
			to_Artchronology() {
				//				window.location = '#/Artchronology'
				this.$router.push({
					path: '../Artchronology'
				});
			},

			dentitybackground() { //获取身份背景-选项-数据
				var url = this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						parentId: '4f5e22db04214b85a627e8bf416a7e66' //身份背景---》固定值
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {
						//                 //console.log(response.body.data,'身份背景')

						for(var i = 0; i < response.body.data.length; i++) { //id=false,放入数据选项中
							for(var j = 0; j < response.body.data[i].dataDictionary.length; j++) {
								response.body.data[i].dataDictionary[j].id = false

							}
						}
						for(var i = 0; i < response.body.data.length; i++) { //id=false,放入数据选项中
							for(var j = 0; j < response.body.data[i].dataDictionary.length; j++) {
								for(var k = 0; k < this.$store.state.box_table.length; k++) {
									if(response.body.data[i].dataDictionary[j].dictName == this.$store.state.box_table[k]) {
										response.body.data[i].dataDictionary[j].id = true
									}
								}
							}
						}

						this.$store.state.Identity_background = response.body.data

						//console.log( this.$store.state.Identity_background,'身份背景选项数据')

						//                 window.location = '#/dentitybackground'
						this.$router.push({
							path: '../dentitybackground'
						});

					}
				}).catch(function(err) {
					//console.log(err)
				})

			},

			Hobbys() { //获取兴趣爱好-选项-数据
				var url = this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				this.$http({
					url: this.$store.state.request_url + "/api/mapPlazaManager/dataDictionary.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						parentId: '4f72e4c8cf0c4e8ba186e6d482c59fbf' //兴趣爱好---》固定值
					}
				}).then(function(response) {
					if(response.body.meta.res == '00000') {

						for(var i = 0; i < response.body.data.length; i++) {
							for(var j = 0; j < response.body.data[i].dataDictionary.length; j++) {
								response.body.data[i].dataDictionary[j].id = false
							}
						}
						for(var i = 0; i < response.body.data.length; i++) {
							for(var j = 0; j < response.body.data[i].dataDictionary.length; j++) {
								for(var k = 0; k < this.$store.state.Hobby_box.length; k++) {
									for(var l = 0; l < this.$store.state.Hobby_box[k].length; l++) {
										if(response.body.data[i].dataDictionary[j].dictName == this.$store.state.Hobby_box[k][l]) {
											response.body.data[i].dataDictionary[j].id = true
										}
									}
								}
							}
						}
						this.$store.state.Add_what_I_like = response.body.data

						for(var i = 0; i < this.$store.state.Hobby_box[0].length; i++) {
							let a = {}
							a.dictName = this.$store.state.Hobby_box[0][i]
							a.id = true
							this.$store.state.Add_what_I_like[0].dataDictionary.push(a)
						}
						for(var i = 0; i < this.$store.state.Hobby_box[1].length; i++) {
							let a = {}
							a.dictName = this.$store.state.Hobby_box[1][i]
							a.id = true
							this.$store.state.Add_what_I_like[1].dataDictionary.push(a)
						}
						for(var i = 0; i < this.$store.state.Hobby_box[2].length; i++) {
							let a = {}
							a.dictName = this.$store.state.Hobby_box[2][i]
							a.id = true
							this.$store.state.Add_what_I_like[2].dataDictionary.push(a)
						}
						for(var i = 0; i < this.$store.state.Hobby_box[3].length; i++) {
							let a = {}
							a.dictName = this.$store.state.Hobby_box[3][i]
							a.id = true
							this.$store.state.Add_what_I_like[3].dataDictionary.push(a)
						}
						for(var i = 0; i < this.$store.state.Hobby_box[4].length; i++) {
							let a = {}
							a.dictName = this.$store.state.Hobby_box[4][i]
							a.id = true
							this.$store.state.Add_what_I_like[4].dataDictionary.push(a)
						}
						for(var i = 0; i < this.$store.state.Hobby_box[5].length; i++) {
							let a = {}
							a.dictName = this.$store.state.Hobby_box[5][i]
							a.id = true
							this.$store.state.Add_what_I_like[5].dataDictionary.push(a)
						}
						for(var i = 0; i < this.$store.state.Hobby_box[6].length; i++) {
							let a = {}
							a.dictName = this.$store.state.Hobby_box[6][i]
							a.id = true
							this.$store.state.Add_what_I_like[6].dataDictionary.push(a)
						}

						//console.log(this.$store.state.Add_what_I_like,'获取兴趣爱好-选项-数据')
						this.$router.push({
							path: '../StyleofArt'
						});

					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			xq1() { //跳转到添加艺术风格页面
				this.$store.state.ba = 0;

				this.$store.state.table_top = '喜欢的艺术作品'

				this.Hobbys()

				//console.log(this.$store.state.Add_what_I_like[0].dataDictionary,'111111')

				//				window.location = '/#/StyleofArt'

			},
			xq2() { //跳转到添加艺术风格页面
				this.$store.state.ba = 1;
				this.$store.state.table_top = '喜欢的艺术作品'
				this.Hobbys()

				//				window.location = '/#/StyleofArt'
				//				this.$router.push({
				//						path: '../StyleofArt'
				//						});
			},
			xq3() { //跳转到添加艺术风格页面
				this.$store.state.ba = 2;
				this.$store.state.table_top = '喜欢的运动'
				this.Hobbys()

				//				window.location = '/#/StyleofArt'
				//			this.$router.push({
				//						path: '../StyleofArt'
				//						});
			},
			xq4() { //跳转到添加艺术风格页面
				this.$store.state.ba = 3;
				this.$store.state.table_top = '喜欢的音乐'
				this.Hobbys()

				//				window.location = '/#/StyleofArt'
				//              this.$router.push({
				//						path: '../StyleofArt'
				//						});
			},
			xq5() { //跳转到添加艺术风格页面
				this.$store.state.ba = 4;
				this.$store.state.table_top = '喜欢的食物'
				this.Hobbys()

				//				window.location = '/#/StyleofArt'
				//			   this.$router.push({
				//						path: '../StyleofArt'
				//						});
			},
			xq6() { //跳转到添加艺术风格页面
				this.$store.state.ba = 5;
				this.$store.state.table_top = '喜欢的电影'
				this.Hobbys()

				//				window.location = '/#/StyleofArt'
				//                this.$router.push({
				//						path: '../StyleofArt'
				//						});
			},
			xq7() { //跳转到添加艺术风格页面
				this.$store.state.ba = 6;
				this.$store.state.table_top = '喜欢的动漫'
				this.Hobbys()

				//				window.location = '/#/StyleofArt'
				//			 this.$router.push({
				//						path: '../StyleofArt'
				//						});
			},

			GO() {
				//console.log(this.$store.state.detailed_information.opBirthday,'出生年月日')
				let a = {};
				a.artCategoryName = this.$store.state.top_table;
				a.artCategorySubclass = this.$store.state.box_table.join(',') //身份背景数据处理
				//				//console.log(a,'身份背景数据处理')
				var hs = {};
				hs.hobbyInfo = []
				let b = {};
				b.hobbyId = '1';
				b.hobbyFather = '艺术作品';
				b.hobbyText = this.$store.state.Hobby_box[0].join(',')
				hs.hobbyInfo.push(b)
				let b1 = {};
				b1.hobbyId = '2';
				b1.hobbyFather = '书籍';
				b1.hobbyText = this.$store.state.Hobby_box[1].join(',')
				hs.hobbyInfo.push(b1)
				let b2 = {};
				b2.hobbyId = '3';
				b2.hobbyFather = '运动';
				b2.hobbyText = this.$store.state.Hobby_box[2].join(',')
				hs.hobbyInfo.push(b2)
				let b3 = {};
				b3.hobbyId = '4';
				b3.hobbyFather = '喜欢的音乐';
				b3.hobbyText = this.$store.state.Hobby_box[3].join(',')
				hs.hobbyInfo.push(b3)
				let b4 = {};
				b4.hobbyId = '5';
				b4.hobbyFather = '喜欢的食物';
				b4.hobbyText = this.$store.state.Hobby_box[4].join(',')
				hs.hobbyInfo.push(b4)
				let b5 = {};
				b5.hobbyId = '6';
				b5.hobbyFather = '喜欢的电影';
				b5.hobbyText = this.$store.state.Hobby_box[5].join(',')
				hs.hobbyInfo.push(b5)
				let b6 = {};
				b6.hobbyId = '7';
				b6.hobbyFather = '喜欢的动漫';
				b6.hobbyText = this.$store.state.Hobby_box[6].join(',')
				hs.hobbyInfo.push(b6) //兴趣爱好数据处理

				//				//console.log(hobbyInfo,'兴趣爱好数据处理')
				let ops = {}
				ops.artHistory = this.$store.state.nian_biao //艺术年表处理

				//console.log(ops,'艺术年表处理')

				//console.log(this.$store.state.detailed_information.opAddress,"222222222222222222")
				let x = {}
				x.na = '中国';
				x.ar = '';
				x.pc = '';
				x.dt = '';
				x.da = '';
				x.fa = '';
				x.lo = '';
				x.la = '';
				x.ct = (this.$store.state.detailed_information.opAddress == null) ? '' : ((this.$store.state.detailed_information.opAddress.ct || this.$store.state.detailed_information.opAddress.ct == '' || this.$store.state.detailed_information.opAddress.ct == null) ? this.$store.state.detailed_information.opAddress.ct : this.$store.state.detailed_information.opAddress.substring(3, 6));
				x.pv = (this.$store.state.detailed_information.opAddress == null) ? '' : ((this.$store.state.detailed_information.opAddress.pv || this.$store.state.detailed_information.opAddress.pv == '') ? this.$store.state.detailed_information.opAddress.pv : this.$store.state.detailed_information.opAddress.substring(0, 2));

				//				//console.log(x,'会员地址')

				var url = this.$store.state.request_url + "/api/map/user/editArtist.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				let body = {};

				if(this.is_nink) {
					body = {
						opId: this.$store.state.data.memId + '', //作者ID
						phone: this.$store.state.detailed_information.phone + '', //会员手机号
						//nickname:"神仙",//this.$store.state.detailed_information.nickname+'',//会员昵称
						opSex: this.$store.state.detailed_information.opSex + '', //会员性别  男或女
						opBirthday: this.$store.state.detailed_information.opBirthday, //会员出生年月
						specialization: a, //会员的身份背景
						opConstellation: this.$store.state.detailed_information.opConstellation + '', //会员所属星座
						opAddress: x, //会员地址
						marriageStatus: this.$store.state.detailed_information.marriageStatus, //会员婚否
						education: this.$store.state.detailed_information.education + '', //会员学历
						profession: this.$store.state.detailed_information.profession + '', //会员专业
						schoolName: this.$store.state.detailed_information.schoolName + '', //毕业院校的名称
						languageLevel: this.$store.state.detailed_information.languageLevel + '', //语言能力
						hobby: hs, //兴趣爱好
						opArtHistory: ops, //艺术年表
						opPic: this.$store.state.detailed_information.opPic, //头像url
						certified: this.$store.state.detailed_information.certified, //认证标识
						signature: this.$store.state.detailed_information.signature + '', //个性化签名
						introduction: this.$store.state.detailed_information.introduction + '', //作者简介
						nickname: this.$store.state.detailed_information.nickname //用户昵称

					}
				} else {
					body = {
						opId: this.$store.state.data.memId + '', //作者ID
						phone: this.$store.state.detailed_information.phone + '', //会员手机号
						//nickname:"神仙",//this.$store.state.detailed_information.nickname+'',//会员昵称
						opSex: this.$store.state.detailed_information.opSex + '', //会员性别  男或女
						opBirthday: this.$store.state.detailed_information.opBirthday, //会员出生年月
						specialization: a, //会员的身份背景
						opConstellation: this.$store.state.detailed_information.opConstellation + '', //会员所属星座
						opAddress: x, //会员地址
						marriageStatus: this.$store.state.detailed_information.marriageStatus, //会员婚否
						education: this.$store.state.detailed_information.education + '', //会员学历
						profession: this.$store.state.detailed_information.profession + '', //会员专业
						schoolName: this.$store.state.detailed_information.schoolName + '', //毕业院校的名称
						languageLevel: this.$store.state.detailed_information.languageLevel + '', //语言能力
						hobby: hs, //兴趣爱好
						opArtHistory: ops, //艺术年表
						opPic: this.$store.state.detailed_information.opPic, //头像url
						certified: this.$store.state.detailed_information.certified, //认证标识
						signature: this.$store.state.detailed_information.signature + '', //个性化签名
						introduction: this.$store.state.detailed_information.introduction + '' //作者简介

					}
				}
				this.$http({
					url: this.$store.state.request_url + "/api/map/user/editArtist.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: body
				}).then(function(response) {

					if(response.body.meta.res == '00000') {
						Toast({
							message: "修改成功",
							position: 'middle',
							duration: 2000
						});
						//                  window.location = '/#/myspace'
						this.$router.push({
							path: '../myspace'
						});
					} else {
						Toast({
							message: response.body.meta.msg,
							position: 'middle',
							duration: 2000
						});

					}
				}).catch(function(err) {

					//console.log(err)

				})

			},
			zhuang() {
				//				if(this.$store.state.Hobby_box.length>0){
				//			
				//				if(this.$store.state.Hobby_box[0].length!==0){
				//					this.tos = false
				//				}
				//				if(this.$store.state.Hobby_box[1].length!==0){
				//					this.tos1 = false
				//				}
				//				if(this.$store.state.Hobby_box[2].length!==0){
				//					this.tos2 = false
				//				}
				//				if(this.$store.state.Hobby_box[3].length!==0){
				//					this.tos3 = false
				//				}
				//				if(this.$store.state.Hobby_box[4].length!==0){
				//					this.tos4 = false
				//				}
				//				if(this.$store.state.Hobby_box[5].length!==0){
				//					this.tos5 = false
				//				}
				//				if(this.$store.state.Hobby_box[6].length!==0){
				//					this.tos6 = false
				//				}
				//				if(this.$store.state.Hobby_box[7].length!==0){
				//					this.tos7 = false
				//				}
				//				if(this.$store.state.top_table!==''){
				//					this.bos = false
				//				}
				//				}
			},
			shenfen_beijing() { //获取用户身份背景数据
				var url = this.$store.state.request_url + "/api/map/user/artCount.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				this.$http({
					url: this.$store.state.request_url + "/api/map/user/artCount.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId
					}
				}).then(function(response) {
					//				//console.log(response.body.data,'身份背景')
					if(response.body.meta.res == '00000') {

						this.$store.state.box_table = response.body.data.specialization.artCategorySubclass.split(",")

						this.$store.state.bs = []

						for(var i = 0; i < this.$store.state.box_table.length; i++) {
							if(this.$store.state.box_table[i] == '') {
								this.$store.state.box_table.splice(i, 1)
							}
						}
						this.$store.state.top_table = (this.$store.state.box_table.length == 0) ? "" : response.body.data.specialization.artCategoryName

						//console.log(this.$store.state.top_table,'---55555555555555---',this.$store.state.box_table)

						for(var i = 0; i < this.$store.state.box_table.length; i++) {
							if(this.$store.state.top_table == '视觉艺术') {
								this.$store.state.bs.push(0)
							} else if(this.$store.state.top_table == '文学艺术') {
								this.$store.state.bs.push(1)
							} else if(this.$store.state.top_table == '设计艺术') {
								this.$store.state.bs.push(2)
							} else if(this.$store.state.top_table == '表演艺术') {
								this.$store.state.bs.push(3)
							} else if(this.$store.state.top_table == '艺术从业者') {
								this.$store.state.bs.push(4)
							} else if(this.$store.state.top_table == '艺术爱好者') {
								this.$store.state.bs.push(5)
							}
						}

						//console.log(this.$store.state.bs,'yemian')
						//console.log(this.$store.state.box_table,'yemian')

					}
				}).catch(function(err) {
					//console.log(err)
				})
			},

			xingqu_aihao() { //获取用户兴趣爱好数据
				var url = this.$store.state.request_url + "/api/map/user/artUserInfo.do";
				var id = this.$store.state.data.memId;
				var token = this.$store.state.data.tokEn;
				var ts = new Date().getTime();
				var sign = md5(url + id + token + ts)

				this.$http({
					url: this.$store.state.request_url + "/api/map/user/artUserInfo.do?memId=" + id + "&ts=" + ts,
					headers: {
						"content-type": "application/json;charset=UTF-8",
						'sIgn': sign
					},
					emulateJSON: false,
					method: 'post',
					body: {
						opId: this.$store.state.data.memId
					}
				}).then(function(response) {

					if(response.body.meta.res == '00000') {

						//                  this.$store.state.Hobby_box[0] = (response.body.data.hobby.hobbyInfo[0]==null)?[]:response.body.data.hobby.hobbyInfo[0].hobbyText.split(",")
						//                  this.$store.state.Hobby_box[1] = (response.body.data.hobby.hobbyInfo[1]==null)?[]:response.body.data.hobby.hobbyInfo[1].hobbyText.split(",")
						//                  this.$store.state.Hobby_box[2] = (response.body.data.hobby.hobbyInfo[2]==null)?[]:response.body.data.hobby.hobbyInfo[2].hobbyText.split(",")
						//                  this.$store.state.Hobby_box[3] = (response.body.data.hobby.hobbyInfo[3]==null)?[]:response.body.data.hobby.hobbyInfo[3].hobbyText.split(",")
						//                  this.$store.state.Hobby_box[4] = (response.body.data.hobby.hobbyInfo[4]==null)?[]:response.body.data.hobby.hobbyInfo[4].hobbyText.split(",")
						//                  this.$store.state.Hobby_box[5] = (response.body.data.hobby.hobbyInfo[5]==null)?[]:response.body.data.hobby.hobbyInfo[5].hobbyText.split(",")
						//                  this.$store.state.Hobby_box[6] = (response.body.data.hobby.hobbyInfo[6]==null)?[]:response.body.data.hobby.hobbyInfo[6].hobbyText.split(",")
						//                  this.$store.state.Hobby_box[7] = (response.body.data.hobby.hobbyInfo[7]==null)?[]:response.body.data.hobby.hobbyInfo[7].hobbyText.split(",")

						//                  //console.log(this.$store.state.Hobby_box,'兴趣爱好')
					}
				}).catch(function(err) {

					//console.log(err)

				})
			},

		},
		mounted() {
			this.$store.state.is_bottom = false; //底部栏显隐
			this.dbpd()
			this.zhuang()

			if(this.$store.state.yemian != 0) {
				this.shenfen_beijing()
				this.$store.state.yemian = 1
			}
			if(this.$store.state.yemians != 0) {
				this.xingqu_aihao()
			}
			var img = new Image();
			img.src = $("#tou")[0].src;
			if(img.width < img.height) {
				$("#tou").css("width", "1.5rem");
				$("#tou").css("height", "auto");
			} else {
				$("#tou").css("width", "auto");
				$("#tou").css("height", "1.5rem");
			}
			if(this.$store.state.detailed_information.opBirthday != null && this.$store.state.detailed_information.opBirthday != "") {
				var arr = this.$store.state.detailed_information.opBirthday.split("-");
				this.getAstro(arr[1], arr[2])
			}

		},
		computed: {
			pv() {
				return this.$store.state.detailed_information.opAddress.pv
			},
			works_chuli() {
				var str = '';
				for(var i = 0; i < this.$store.state.Hobby_box[0].length; i++) {
					if(i < this.$store.state.Hobby_box[0].length - 1) {
						str += this.$store.state.Hobby_box[0][i] + ",";
					} else {
						str += this.$store.state.Hobby_box[0][i]
					}
				}
				return str;

			},
			book_chuli() {
				var str = '';
				for(var i = 0; i < this.$store.state.Hobby_box[1].length; i++) {
					if(i < this.$store.state.Hobby_box[1].length - 1) {
						str += this.$store.state.Hobby_box[1][i] + ",";
					} else {
						str += this.$store.state.Hobby_box[1][i]
					}
				}
				return str;

			},
			run_chuli() {
				var str = '';
				for(var i = 0; i < this.$store.state.Hobby_box[2].length; i++) {
					if(i < this.$store.state.Hobby_box[2].length - 1) {
						str += this.$store.state.Hobby_box[2][i] + ",";
					} else {
						str += this.$store.state.Hobby_box[2][i]
					}
				}
				return str;

			},
			music_chuli() {
				var str = '';
				for(var i = 0; i < this.$store.state.Hobby_box[3].length; i++) {
					if(i < this.$store.state.Hobby_box[3].length - 1) {
						str += this.$store.state.Hobby_box[3][i] + ",";
					} else {
						str += this.$store.state.Hobby_box[3][i]
					}
				}
				return str;

			},
			food_chuli() {
				var str = '';
				for(var i = 0; i < this.$store.state.Hobby_box[4].length; i++) {
					if(i < this.$store.state.Hobby_box[4].length - 1) {
						str += this.$store.state.Hobby_box[4][i] + ",";
					} else {
						str += this.$store.state.Hobby_box[4][i]
					}
				}
				return str;

			},
			movie_chuli() {
				var str = '';
				for(var i = 0; i < this.$store.state.Hobby_box[5].length; i++) {
					if(i < this.$store.state.Hobby_box[5].length - 1) {
						str += this.$store.state.Hobby_box[5][i] + ",";
					} else {
						str += this.$store.state.Hobby_box[5][i]
					}
				}
				return str;

			},
			animation_chuli() {
				var str = '';
				for(var i = 0; i < this.$store.state.Hobby_box[6].length; i++) {
					if(i < this.$store.state.Hobby_box[6].length - 1) {
						str += this.$store.state.Hobby_box[6][i] + ",";
					} else {
						str += this.$store.state.Hobby_box[6][i]
					}
				}
				return str;

			},
			wenxue_chuli() {
				var str = '';
				for(var i = 0; i < this.$store.state.box_table.length; i++) {
					if(i < this.$store.state.box_table.length - 1) {
						str += this.$store.state.box_table[i] + ",";
					} else {
						str += this.$store.state.box_table[i]
					}
				}
				return str;
			},
			ct() {
				return this.$store.state.detailed_information.opAddress.ct
			}
		}
	}
</script>

<style scoped="scoped">
	* {
		outline: none;
	}
	
	.box_top {
		border-bottom: 0.005rem solid #f1f1f1;
	}
	
	.box_to {
		margin-left: 0.3rem;
		margin-top: 1.5rem;
		margin-bottom: 2rem;
	}
	
	.inps {
		border: none;
		width: 100%;
		outline: none;
	}
	
	.boxsta {
		width: 100%;
		/*height: 5.5rem;*/
		/*float: left;*/
	}
	
	.box_bottom {
		width: 100%;
		height: 1.4rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 300;
		background: white;
		/*border-top: 0.01rem solid #CACACA;*/
		-moz-box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
		/* 老的 Firefox */
		box-shadow: 0 0 0.3rem rgba(247, 247, 247, 1);
	}
	
	.btns {
		border: none;
		border-radius: 0.1rem;
		position: absolute;
		top: 0.25rem;
		left: 8%;
		color: white;
		font-size: 0.3rem;
	}
	
	.yis {
		display: block;
	}
	
	.yisto {
		display: none;
	}
	
	.yos {
		display: block;
	}
	
	.yosto {
		display: none;
	}
	
	.inpsss {
		border: none;
		font-size: 0.3rem;
		height: 1rem;
		/* margin-top: 0.15rem; */
		line-height: 1rem;
		margin-left: 1.4rem;
	}
	
	.brn {
		height: 0.5rem;
		float: left;
		font-size: 0.3rem;
		margin-top: 0.3rem;
		border: none;
		border: 0.01rem solid black;
		background: white;
		border-radius: 0.1rem;
		line-height: 0.5rem;
		padding: 0 0.08rem;
		margin-left: 0.3rem;
	}
	
	.zhu {
		width: 2.5rem;
		height: 2.5rem;
		/*float: left;*/
		background: red;
	}
	
	.btns_to {
		height: 0.5rem;
		float: left;
		font-size: 0.3rem;
		margin-top: 0.45rem;
		border: none;
		background: white;
		border-radius: 0.1rem;
		color: #CACACA;
		line-height: 0.5rem;
	}
	
	.box_f {
		width: 80%;
		position: absolute;
		bottom: 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #999999;
		font-size: 0.3rem;
	}
	
	.img_s {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		margin: 0 auto;
	}
	
	textarea::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #CCCCCC;
	}
	
	textarea:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #CCCCCC;
	}
	
	textarea::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #CCCCCC;
		;
	}
	
	textarea:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #CCCCCC;
	}
	
	.head {
		width: 100%;
		height: 1rem;
		position: fixed;
		top: 0;
		background: white;
		box-sizing: border-box;
		padding-top: 0.3rem;
		border-bottom: 1px solid #f1f1f1;
		z-index: 9999;
	}
	
	.title {
		width: 80%;
		height: 100%;
		float: left;
		font-size: 0.38rem;
		text-align: center;
	}
	
	.text {
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.img_class {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.box_tabs {
		font-size: 0.3rem;
		margin-left: 1.9rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>