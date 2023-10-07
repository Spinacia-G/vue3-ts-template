import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: () => import('@/App.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/HomePage.vue')
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
