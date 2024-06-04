import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: () => import('@/App.vue'),
      children: [
        {
          path: '',
          name: 'home',
          redirect: 'welcome',
          component: () => import('@/layout/HomePage.vue'),
          children: [
            {
              path: 'welcome',
              name: 'welcome',
              meta: {
                title: '欢迎页'
              },
              component: () => import('@/views/WelcomePage.vue')
            }
          ]
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginPage.vue')
        },
        {
          path: '404',
          name: 'error',
          component: () => import('@/views/ErrorPage.vue')
        }
      ]
    }
  ]
})

export default router
