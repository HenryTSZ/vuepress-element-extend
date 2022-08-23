import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import pubsub from 'pubsub-js'
import vueResource from 'vue-resource'
import plugins from './plugins'
import store from './store'
import 'animate.css'

export default ({ Vue, options }) => {
  Vue.config.keyCodes.huiche = 13 // 定义了一个别名按键
  Vue.prototype.pubsub = pubsub
  Vue.use(ElementUI)
  Vue.use(vueResource)
  Vue.use(plugins)

  Object.assign(options, {
    store
  })
}
