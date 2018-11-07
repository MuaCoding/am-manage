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
import store from '@/store';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/app/index',
    },
    {
      path: '/login',
      name: "userLogin",
      meta: {
        title: "用户登录"
      },
      component: Login,
    },
    {
      path: '/app',
      name: 'app',
      component: Layout,
      meta: {
        requireAuth: true // 表示进入这个路由是需要登录的
      },
      children: [{
          path: 'index',
          name: 'index',
          meta: {
            title: '首页',
          },
          component: Index,
        },
        {
          path: 'appointment',
          name: 'appointment',
          meta: {
            title: '预约管理'
          },
          component: Appointment,
        },
        {
          path: 'room',
          name: 'room',
          meta: {
            title: '房间项管理'
          },
          component: Room,
        },
        {
          path: 'construct',
          name: 'construct',
          meta: {
            title: '施工项管理'
          },
          component: Construct,
        },
        {
          path: 'product',
          name: 'product',
          meta: {
            title: '产品项管理'
          },
          component: Product,
        },
        {
          path: 'company',
          name: 'company',
          meta: {
            title: '公司管理'
          },
          component: Company,
        },
        {
          path: 'message',
          name: 'message',
          meta: {
            title: '平台消息'
          },
          component: Message,
        },
        {
          path: 'banner',
          name: 'banner',
          meta: {
            title: '轮播管理'
          },
          component: Banner,
        },
        {
          path: 'formula',
          name: 'formula',
          meta: {
            title: '公式文档'
          },
          component: Formula,
        },
        {
          path: 'password',
          name: 'password',
          meta: {
            title: '密码修改'
          },
          component: Password,
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  /**
   * 1.判断该路由是否需要登录权限
   * 2.判断登录信息是否过期
   */
  document.title = to.meta.title + '-后台管理平台';
  var flag;
  var a = store.state.user.token;
  console.log(store)
  // try {
  //   var a = store.state.user.token.split(".")[1],
  //     s = e(142).Base64,
  //     h = new Date(1e3 * JSON.parse(s.decode(a)).exp);
     
  //   flag = h > new Date
  // } catch (t) {
  //   flag = !1
  // }


  if (to.path !== '/login') { // 判断该路由是否需要登录权限
    // return next('/login')
  }
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
})

export default router;
