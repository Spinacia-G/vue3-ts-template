import { Router } from 'vue-router'
import NProgress from 'nprogress'

export const usePermission = (router: Router) => {
  NProgress.configure({ showSpinner: false })

  router.beforeEach((to, _, next) => {
    NProgress.start()
    if (!to.matched.length) {
      next({
        name: 'error'
      })
    } else {
      next()
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
