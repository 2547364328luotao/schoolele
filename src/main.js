import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'
import { createPinia } from 'pinia'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'

// Create vue app
const app = createApp(App)
const pinia = createPinia()


app.use(pinia)

// Register plugins
registerPlugins(app)

// 创建一个响应式全局对象
const globals = reactive({
    ROOMID: "南1-548", // 初始值
  });
// 将全局变量挂载到 Vue 的全局配置中
app.config.globalProperties.$globals = globals;

// Mount vue app
app.mount('#app')
