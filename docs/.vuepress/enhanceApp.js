import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import plugins from './plugins'
import pubsub from 'pubsub-js'

export default ({ Vue }) => {
  Vue.config.keyCodes.huiche = 13 // 定义了一个别名按键
  Vue.prototype.pubsub = pubsub
  Vue.use(ElementUI)
  Vue.use(plugins)
}
