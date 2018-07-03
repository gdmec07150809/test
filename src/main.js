// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import App from './App'
import router from './router'
import bottom from './components/home/Bottom.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import 'jquery'
//
//axios.defaults.withCredentials = true
//
//var myAxios = axios.create({
//	baseURL:'http://api.map.baidu.com'
//})
////
//Vue.prototype.$axios = myAxios

Vue.use(ElementUI);

Vue.prototype.HOST = '/api';

//import Vant from 'vant';
//import 'vant/lib/vant-css/index.css';
//Vue.use(Vant);

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//import md5 from 'js-md5';
//Vue.use(md5);

import Mint from 'mint-ui';
import './assets/css/style.css'
Vue.use(Mint);

//import pdSelect from 'pd-select'

//Vue.use(pdSelect)

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

/*引入jquery*/
import $ from 'jquery';
window.jQuery = $;
window.$ = $;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
//components: { App },
//template: '<App/>'
 components:{bottom},
  template: '<bottom/>'
})
