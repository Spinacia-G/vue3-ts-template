import { createApp } from 'vue'
import '@/styles/index.scss'
import 'nprogress/nprogress.css'
import 'element-plus/es/components/message/style/css'
import App from './App.vue'
import router from '@/router'
import { usePermission } from '@/router/permission.ts'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
usePermission(router)
app.use(createPinia())
app.mount('#app')
