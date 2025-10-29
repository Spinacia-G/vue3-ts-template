import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './styles/index.css'
import 'element-plus/es/hooks/use-locale/index'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
