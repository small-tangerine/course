import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import { getUserInfo } from 'utils/cache'
Vue.use(Router)

const Home = () => import('../pages/home/index') // 首页路由
const CourseIndex = () => import('../pages/course/index') // 免费课程路由
const CourseDetail = () => import('../pages/course-detail/index') // 免费课程详情路由
const LessonIndex = () => import('../pages/lesson/index') // 实战课程路由
const LessonDetail = () => import('../pages/lesson-detail/index') // 实战课程详情路由
const UserCenter = () => import('../pages/user/index') // 个人中心路由
const UserCourse = () => import('../pages/user-course/index') // 我的课程路由
const OrderIndex = () => import('../pages/order/index') // 订单中心路由
const CartIndex = () => import('../pages/cart/cart') // 购物车路由
const CartConfirm = () => import('../pages/cart/confirm') // 购物车确认路由
const CartPay = () => import('../pages/cart/pay') // 购物车支付路由

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component:Home
  },
  {
    path: '/user',
    name: 'UserCenter',
    component:UserCenter,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/course',
    name: 'UserCourse',
    component: UserCourse,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/order',
    name: 'OrderIndex',
    component:OrderIndex,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/course',
    name: 'CourseIndex',
    component: CourseIndex,
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: CourseDetail
  },
  {
    path: '/lesson',
    name: 'LessonIndex',
    component:LessonIndex
  },
  {
    path: '/lesson/:id',
    name: 'LessonDetail',
    component: LessonDetail
  },
  {
    path: '/cart',
    name: 'CartIndex',
    component:CartIndex,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/cart/confirm',
    name: 'CartConfirm',
    component:CartConfirm,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/cart/pay/:code',
    name: 'CartPay',
    component:CartPay,
    meta: {
      requireAuth: true
    }
  }
]
const router = new Router({
  routes: routes,
  mode: 'history',
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})

// 路由拦截
router.beforeEach((to, from, next) => {
  let userinfo = getUserInfo()
  if (to.meta.requireAuth) {
    if (userinfo.id) {
      next()
    } else{
      store.commit('login/SET_LOGIN_ACTION', 'login')
      store.commit('login/SET_SHOW_LOGIN', true)
      next('/home')
    }
  } else {
    next()
  }
})


export default router
