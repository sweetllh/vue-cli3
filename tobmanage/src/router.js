import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['./views/login/index.vue'],resolve);
const Layout = resolve => require(['./views/layout/Layout.vue'],resolve);
const Dashboard = resolve => require(['./views/dashboard/index.vue'],resolve);
const Detail = resolve => require(['./views/detail/index.vue'],resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      hidden: true,
      redirect: { path: '/login' }
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
      hidden: true
    },
    {
      path     : '/',
      component: Layout,
      redirect : '/dashboard',
      name     : '',
      leaf     : true,                 //只有一个节点
      iconCls  : 'el-icon-document',   //图标样式class
      children : [
          { path: '/dashboard', component: Dashboard, name: '主页'},
      ]
    },
    {
      path     : '/',
      component: Layout,
      redirect : '/detali',
      name     : '',
      leaf     : true,                 //只有一个节点
      iconCls  : 'el-icon-document',   //图标样式class
      children : [
          { path: '/detail', component: Detail, name: '详情'},
      ]
    }
  ]
})
