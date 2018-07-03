<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    // 监听 $route 变化调用分享链接
    "$route"(to, from) {
      let currentRouter = this.$router.currentRoute.fullPath;  
      if(currentRouter.indexOf('userShare') == -1){   
     //如果不是userShare分享页面,则分享另外一个接口
        this.shareOut();
      }else{
        this.shareOutTwo();  
     //当前页面是userShare页面时分享调用另外一个接口   
      }
    }
  },	
  mounted(){
  	 
  	   
    
    
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
