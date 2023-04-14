import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/iconfont/iconfont.css'
import './assets/css/reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import codehight from './utils/codeHight.js'
import 'prismjs/themes/prism.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, { size: 'small' })

// 自定义指令，添加代码行数
app.directive('codehight', codehight)

// 全部变量
app.config.globalProperties.$filter = <T>(str:T):T => {
  return str
}

type Filter = <T>(str:T)=>T
declare module 'vue' {
  export interface ComponentCustomProperties{
    $filter: Filter,
  }
}

app.use(router).mount('#app')
