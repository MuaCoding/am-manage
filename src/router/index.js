import Vue from 'vue'
import Router from 'vue-router'

import iView from 'iview';
import {
  Base64
} from 'js-base64';
import store from '@/store';
import {set_title} from "common/js/filters";

const Layout = r => require.ensure([], () => r(require('pages/layout/layout')), 'layout')
const Index = r => require.ensure([], () => r(require('pages/index/index')), 'index')
const Login = r => require.ensure([], () => r(require('pages/login/login')), 'login')
const Logout = r => require.ensure([], () => r(require('pages/logout/logout')), 'logout')
const Appointment = r => require.ensure([], () => r(require('pages/appointment/appointment')), 'appointment')
const Room = r => require.ensure([], () => r(require('pages/room/room')), 'room')
const Construct = r => require.ensure([], () => r(require('pages/construct/construct')), 'construct')
const Product = r => require.ensure([], () => r(require('pages/product/product')), 'product')
const ProductEdit = r => require.ensure([], () => r(require('pages/product-edit/product-edit')), 'productEdit')
const ProductCreate = r => require.ensure([], () => r(require('pages/product-create/product-create')), 'productCreate')
const Company = r => require.ensure([], () => r(require('pages/company/company')), 'company')
const Message = r => require.ensure([], () => r(require('pages/message/message')), 'message')
const Banner = r => require.ensure([], () => r(require('pages/banner/banner')), 'banner')
const Formula = r => require.ensure([], () => r(require('pages/formula/formula')), 'formula')
const Password = r => require.ensure([], () => r(require('pages/password/password')), 'password')
const Avatar = r => require.ensure([], () => r(require('pages/avatar/avatar')), 'avatar')


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/app/index',
  },
    {
      path: '/login',
      name: "login",
      meta: {
        title: "用户登录"
      },
      component: Login,
    },
    {
      path: '/logout',
      name: "logout",
      meta: {
        title: "用户注销"
      },
      component: Logout,
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
            title: '预约估价列表'
          },
          component: Appointment,
        },
        {
          path: 'room',
          name: 'room',
          meta: {
            title: '房间项列表'
          },
          component: Room,
        },
        {
          path: 'construct',
          name: 'construct',
          meta: {
            title: '施工项列表'
          },
          component: Construct,
        },
        {
          path: 'product',
          name: 'product',
          meta: {
            title: '产品项列表'
          },
          component: Product,
        },
        {
          path: "product/create",
          name: "productCreate",
          meta: {
            title: "新增产品项"
          },
          component: ProductCreate,
        },
        {
          path: 'product/edit/:id',
          name: 'productEdit',
          meta: {
            title: '修改产品项'
          },
          component: ProductEdit,
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
            title: '消息管理'
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
        },
        {
          path: 'avatar',
          name: "avatar",
          meta: {
            title: "修改头像"
          },
          component: Avatar,
        },
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
  set_title(to.meta.title); //设置窗口页标题

  let flag;
  try {
    var a = store.state.token.split(".")[1],
      h = new Date(1e3 * JSON.parse(Base64.decode(a)).exp);
    flag = h > new Date
  } catch (t) {
    flag = !1
  }

  if (!flag && to.path !== '/login' && "/logout" !== to.path) { // 判断该路由是否需要登录权限
    iView.LoadingBar.finish();
    iView.Modal.error({
      title: "错误信息",
      content: "您的用户状态已失效，请前往登录页面重新登录",
      onOk: function () {
        router.push({
          path: "/login"
        });
      }
    });
    // -1 === to.path.indexOf(i) && -1 === to.path.indexOf(from.path) && this.$store.commit("CLEAR_LIST_STATUS");
  }
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
})

export default router;
