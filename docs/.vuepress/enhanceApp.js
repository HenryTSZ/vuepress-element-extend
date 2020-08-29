import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'echarts'
import Echarts from 'vue-echarts'

export default ({ Vue }) => {
  Vue.use(ElementUI)
  Vue.component('chart', Echarts)
}
