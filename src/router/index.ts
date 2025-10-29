import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'home' },
      component: () => import('@/App.vue'),
      children: [
        {
          path: '',
          name: 'home',
          redirect: { name: 'dashboard' },
          component: () => import('@/views/home/HomePage.vue'),
          children: [
            {
              path: 'dashboard',
              name: 'dashboard',
              component: () => import('@/views/home/Dashboard/index.vue'),
            },
            {
              path: 'management',
              name: 'management',
              component: () => import('@/views/home/Management/index.vue'),
            },
            {
              path: 'sample',
              name: 'sample',
              component: () => import('@/views/home/Sample/index.vue'),
            },
          ],
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginPage.vue'),
        },
        {
          path: '404',
          name: 'not-found',
          component: () => import('@/views/auth/NotFound.vue'),
        },
      ],
    },
  ],
})

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/404']

router.beforeEach((to, _, next) => {
  NProgress.start()
  if (!to.matched.length) {
    next({
      name: 'not-found',
    })
  } else if (whiteList.includes(to.path)) {
    next()
  } else {
    const { isLoggedIn } = useAuthStore()
    if (!isLoggedIn) {
      // TODO: refresh token
      ElMessage.warning('登录状态过期，请重新登录!')
      next({
        name: 'login',
      })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
