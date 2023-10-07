import { Router } from 'vue-router'
import NProgress from 'nprogress'
import { useAuthStore } from '@/store'
import { ElMessage } from 'element-plus'

export const usePermission = (router: Router) => {
  const whiteList = ['/login', '/404']

  NProgress.configure({ showSpinner: false })

  router.beforeEach((to, _, next) => {
    NProgress.start()
    if (!to.matched.length) {
      next({
        name: 'error'
      })
    } else if (whiteList.includes(to.path)) {
      next()
    } else {
      const { hasToken } = useAuthStore()
      if (!hasToken) {
        ElMessage.warning('Unauthorized! Please sign in!')
        next({
          name: 'login'
        })
      } else {
        next()
      }
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
