import Vue from 'vue'
import axios from "axios";
import App from './App.vue'
import router from './router/index'
import './plugins/element.js'

import Cookies from 'js-cookie'
import '@/assets/css/basic.css'
//import 'normalize.css'

Vue.config.productionTip = false

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
Vue.prototype.$clientHeight = document.documentElement.clientHeight || document.body.clientHeight
Vue.prototype.$axios = axios
Vue.prototype.$link = 'https://www.linkedsign.cn/server/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
	//NProgress.start();
	let user = JSON.parse(sessionStorage.getItem("LQ-UserInfo"));
	//console.log(user,to.path)
	if (!user && to.path != '/login' && to.path != '/regist' && to.path != '/forget' && to.path != '/privacy' && to.path != '/commonPrivacy') {
	    next({ path: '/login' })
	} else {
	    next()
	}
})