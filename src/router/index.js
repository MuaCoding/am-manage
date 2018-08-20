import Vue from 'vue'
import Router from 'vue-router'

import Index from 'pages/index/index'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/app/index',
    },
    {
      path: '/app/index',
      name: 'app',
      component: Index,
    }
  ]
})
