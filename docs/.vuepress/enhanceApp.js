import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import plugins from './plugins'

export default ({ Vue }) => {
  Vue.config.keyCodes.huiche = 13 // 定义了一个别名按键
  Vue.use(ElementUI)
  Vue.use(plugins)
}
