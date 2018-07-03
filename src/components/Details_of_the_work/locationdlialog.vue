<template>
	<div id="app" v-show="t.is_show" >
		<div  @click="cancel" style="width: 100%;height: 8.3rem;position:fixed;top: 0;left: 0;background:rgba(0,0,0,0.4);z-index: 1000;" >
		
		</div>
		<div class="dia">
		  		<div style="margin-bottom: 1rem;">
		  			<div  class="left">
		  				<div v-for="(item,i) in sheng_array">
		  					<p :class="{report_class1:item==sheng_value}" class="report_class" @click="search_sheng(item,i)">{{item}}</p>
							<div class="xian" ></div>
		  				</div>
		  			</div>
		  				<div class="right">
		  					<div v-for="(item,i) in city_array">
		  						<p :class="{report_class1:item==city_value}" class="report_class" @click="search_city(item,i)">{{item}}</p>
								<div class="xian" ></div>
		  					</div>
		  				</div>
		  			
		  		</div>
		  		
			<div class="cancel">
				<p @click="cancel" style="text-align: center;">取消</p>
			</div>
				
		</div>
		
	</div>
	
</template>

<script>
	import store from '../../vuex/store.js'
	export default {
		
		data() {
			return {
				is_report_stauts:false,
				sheng_array:[],
				city_array:[],
				sheng_value:'',
				city_value:''
			}
		},
        props:['t'],
		methods: {
			cancel(){
				this.t.is_show = false
			},
			reportTap(item){
				this.$store.state.Data_set.nian_dai=item;
				this.t.is_show = false;
				
			},
			
			dateDetail(){
				//console.log(this.$store.state.adr)
				for(var i=0;i<this.$store.state.adr.length;i++){
					this.sheng_array.push(this.$store.state.adr[i].value)
				}
			},
			search_sheng(item,i){
				this.sheng_value=item;
				this.city_array=[];
				for(var j=0;j<this.$store.state.adr[i].children.length;j++){
					this.city_array.push(this.$store.state.adr[i].children[j].value)
				}
			},
			search_city(item,i){
				this.city_value=item
				//console.log(this.sheng_value,"-",item)
				this.$store.state.select_location=this.sheng_value+"-"+item;
				this.t.is_show = false;
				
			}
		},
		created(){
				
				this.dateDetail();//处理时间1990到至今
			
		}
		
	}
</script>
</script>

<style scoped="scoped">
	input,textarea{
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
	.dia{
		position:fixed;
		bottom: 0;
		z-index: 1000;
		height: 5.2rem;
		
		background-color: #fff;
		width: 100%;
	}
	.report_class{
		height: 1rem;
		line-height: 1rem;
		color:rgba(51,51,51,1);
		font-size: 0.32rem;
		text-align: center;
	}
	.report_class1{
		height: 1rem;
		line-height: 1rem;
		color:#ff9d00;
		font-size: 0.32rem;
		text-align: center;
		background-color: #F0F0F0;
	}
	.cancel{
		height: 1.2rem;
		line-height: 1rem;
		color:rgba(51,51,51,1);
		font-size: 0.32rem;
		text-align: center;
		background-color: #fff;
		width: 100%;
		position: fixed;
		border-top:#f1f1f1 0.2rem solid ;
		bottom: 0;
	}
	
	.down{
		width: 100%;
		height: 0.01rem;
		margin-top: 0.2rem;
		background:rgba(247,247,247,1);
	}
	.xian{
		height: 0.02rem;
		width: 100%;
		background:rgba(247,247,247,1);
	}
	.left{
		height: 5.2rem;
		width: 50%;
		float: left;
		position: absolute;
		top:0;
		left: 0;
		overflow-y: scroll;
	}
	.right{
		
		height: 5.2rem;
		width: 50%;
		float: right;
		height: 100%;
		position: absolute;
		top:0;
		right: 0;
		overflow-y: scroll;
	}
</style>