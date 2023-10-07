import { createApp } from 'vue'
import '@/styles/index.scss'
import 'nprogress/nprogress.css'
import 'element-plus/es/components/message/style/css'
import App from './App.vue'
import router from '@/router'
import { usePermission } from '@/router/permission.ts'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
usePermission(router)
app.use(createPinia())
app.mount('#app')
