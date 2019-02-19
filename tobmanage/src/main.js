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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
