import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import axios from 'axios'
import Index from '../views/Index.vue'
import { Message } from 'element-ui'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/index',
    name: 'Index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Index.vue')
    },
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    // 使用Element UI的Message组件来显示提示信息
    Message({
      message: '请登录',
      type: 'error',
      duration: 850,
      onClose: () => {
        next('/login')
      }
    })
  } else {
    next()
  }
})

export default router
