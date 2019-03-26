import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import './assets/css/main.scss';
import 'normalize.css'
import "babel-polyfill"
Vue.config.productionTip = false

import EventBus from './bus'
Vue.prototype.$bus = EventBus

import { getUserInfo } from '@/utils/auth'

//类别
Vue.filter("formatCategory", function(val) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
 if(val == "1"){
    return "风景区";
  }else if(val == "2"){
    return "美食";
  }else if(val == "3"){
    return "购物";
  }else if(val == "4"){
    return "娱乐";
  }
});

//类型
Vue.filter("formatType",function(val){
  if(val == "1"){
    return "基础标签"
  }else if(val == "2"){
    return "个性化标签"
  }
})

//时间戳
Vue.filter("formatDate",function(str){
    // if (str != "") {
    //   var date = new Date(parseInt(str.substring(6, 19)));
    //   return date.toLocaleDateString();
    // }
    if(str != ""){
      var d = eval('new ' + str.substr(1, str.length - 2));
      var ar_date = [d.getFullYear(), d.getMonth() + 1, d.getDate() ];
      //var ar_time = [d.getHours(), d.getMinutes(), d.getSeconds()];
      for (var i = 0; i < ar_date.length; i++) ar_date[i] = dFormat(ar_date[i]);
      //for (var i = 0; i < ar_time.length; i++) ar_time[i] = dFormat(ar_time[i]);
      //return ar_date.join('-')+" "+ar_time.join(':');
      return ar_date.join('-')
    }
    function dFormat(i) { return i < 10 ? "0" + i.toString() : i; }
})

router.beforeEach((to, from, next) => {
  const userInfo = getUserInfo();
   if (!userInfo && to.path !== '/login') { 
     next('/login');
  }else{
       next()
   }
})

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


