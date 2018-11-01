import Vue from 'vue'
import Router from 'vue-router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import Layout from 'pages/layout/layout'
import Index from 'pages/index/index'
import Login from 'pages/login/login'
import Appointment from 'pages/appointment/appointment'
import Room from 'pages/room/room'
import Construct from 'pages/construct/construct'
import Product from 'pages/product/product'
import Company from 'pages/company/company'
import Message from 'pages/message/message'
import Banner from 'pages/banner/banner'
import Formula from 'pages/formula/formula'
import Password from 'pages/password/password'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/app/index',
    },
    {
      path: '/app/layout',
      name: 'layout',
      component: Layout,
      meta: {
        requireAuth: true // 表示进入这个路由是需要登录的
      },
      children: [{
          path: '/app/index',
          name: 'index',
          meta: {
            title: '首页',
          },
          component: Index,
        },
        {
          path: '/app/appointment',
          name: 'appointment',
          meta: {
            title: '预约管理'
          },
          component: Appointment,
        },
        {
          path: '/app/room',
          name: 'room',
          meta: {
            title: '房间项管理'
          },
          component: Room,
        },
        {
          path: '/app/construct',
          name: 'construct',
          meta: {
            title: '施工项管理'
          },
          component: Construct,
        },
        {
          path: '/app/product',
          name: 'product',
          meta: {
            title: '产品项管理'
          },
          component: Product,
        },
        {
          path: '/app/company',
          name: 'company',
          meta: {
            title: '公司管理'
          },
          component: Company,
        },
        {
          path: '/app/message',
          name: 'message',
          meta: {
            title: '平台消息'
          },
          component: Message,
        },
        {
          path: '/app/banner',
          name: 'banner',
          meta: {
            title: '轮播管理'
          },
          component: Banner,
        },
        {
          path: '/app/formula',
          name: 'formula',
          meta: {
            title: '公式文档'
          },
          component: Formula,
        },
        {
          path: '/app/password',
          name: 'password',
          meta: {
            title: '密码修改'
          },
          component: Password,
        }
      ]
    },
    {
      path: '/login',
      name: "userLogin",
      meta: {
        title: "用户登录"
      },
      component: Login,
    }
  ]
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  /**
   * 1.判断该路由是否需要登录权限
   * 2.判断登录信息是否过期
   */
  if (to.path !== '/login' && !sessionStorage.token) { // 判断该路由是否需要登录权限
    return next('/login')
  }
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
})

export default router;