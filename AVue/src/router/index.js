import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main.vue'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Form from '@/components/Form.vue'
import Table from '@/components/Table.vue'
import Setting from '@/components/Setting.vue'

Vue.use(Router)   //注册vue-router

export default new Router({
  routes: [
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    {
      path: '/',
      name: 'Main',
      component: Main,
      hidden: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      hidden: true
    },
    {
      path: '/',
      component: Home,
      name: '导航一',
      iconCls: 'el-icon-message',//图标样式class
      children: [
        { path: '/home/form', component: Form, name: '表单' },
        { path: '/home/table', component: Table, name: '表格' },
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航二',
      iconCls: 'el-icon-setting',//图标样式class
      children: [
        { path: '/home/setting', component: Setting, name: '设置' },
      ]
    },
  ]
})
