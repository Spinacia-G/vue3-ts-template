import { createApp } from 'vue'
import '@/styles/index.scss'
import 'nprogress/nprogress.css'
import 'element-plus/es/components/message/style/css'
import App from './App.vue'
import router from '@/router'
import { usePermission } from '@/router/permission.ts'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { sm2Decrypt, sm2Encrypt, sm4Decrypt, sm4Encrypt } from '@/utils/sm.ts'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

/* el-input 自动聚焦 */
app.directive('input-focus', {
  mounted: (el, binding) => {
    if (binding.value == true || binding.value == undefined) {
      el.getElementsByTagName('input')[0].focus()
    }
  }
})

app.use(ElementPlus, {
  locale: zhCn
})

app.use(router)
usePermission(router)
app.use(createPinia())
app.mount('#app')

window.sm2Decrypt = sm2Decrypt
window.sm2Encrypt = sm2Encrypt
window.sm4Decrypt = sm4Decrypt
window.sm4Encrypt = sm4Encrypt

// 禁用右键
// document.oncontextmenu = () => {
//   return false
// }
