import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['./views/login/index.vue'],resolve);
const Layout = resolve => require(['./views/layout/Layout.vue'],resolve);
const Dashboard = resolve => require(['./views/dashboard/index.vue'],resolve);

const PointList = resolve => require(['./views/pointManage/pointList.vue'],resolve);
const EditPoint = resolve => require(['./views/pointManage/editPoint/index.vue'],resolve);

const TagList = resolve => require(['./views/tagManage/tagList.vue'],resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: { path: '/login' },
      hidden: true
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
          { path: '/dashboard', component: Dashboard, name: '首页'},
      ]
    },
    {
      path     : '/',
      component: Layout,
      redirect : '/pointList',
      name     : '打卡点管理',
      leaf     : false,                 //只有一个节点
      iconCls  : 'el-icon-document',   //图标样式class
      children : [
          { path: '/pointList', component: PointList, name: '打卡点列表'},
          { path: '/editPoint', component: EditPoint, name: '添加/修改打卡点'},
         
      ]
    },
    {
      path     : '/',
      component: Layout,
      redirect : '/tagList',
      name     : '标签库管理',
      leaf     : false,                 //只有一个节点
      iconCls  : 'el-icon-document',   //图标样式class
      children : [
          { path: '/tagList', component: TagList, name: '标签列表'},
      ]
    }
  ]
})
