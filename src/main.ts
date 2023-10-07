import { createApp } from 'vue'
import '@/styles/index.scss'
import 'nprogress/nprogress.css'
import App from './App.vue'
import router from '@/router'
import { usePermission } from '@/router/permission.ts'

const app = createApp(App)
app.use(router)
usePermission(router)
app.mount('#app')
