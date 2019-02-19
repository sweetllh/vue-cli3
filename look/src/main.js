import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import axios from 'axios'   //引入axios
import 'normalize.css'
import Cookies from 'js-cookie'
import VueClipboard from 'vue-clipboard2'    //剪切板

import './plugins/element.js'
import './styles/iconfont.css'
import './styles/main.css';
import {getUserInfo} from './utils/auth'

import EventBus from './bus'
Vue.prototype.$bus = EventBus
Vue.use(VueClipboard)

Vue.config.productionTip = false

//礼品分类
Vue.filter("formatType", function(val) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    if(val == 0){
    	return "服装配饰";
    }else if(val == 1){
    	return "美妆护理";
    }else if(val == 2){
    	return "手机数码";
    }else if(val == 3){
    	return "居家室内";
    }else if(val == 4){
    	return "母婴玩具";
    }else if(val == 5){
    	return "生活电器";
    }else if(val == 6){
    	return "清洁洗护"
    }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  const userInfo = getUserInfo();
   if (!userInfo && to.path !== '/login') { 
     next('/login');
  }else{
       next()
   }
})