//人员管理相关的配置
import { nanoid } from 'nanoid'
export default {
  namespaced: true,
  actions: {
    addPersonWang(context, value) {
      if (value.name.indexOf('王') === 0) {
        context.commit('ADD_PERSON', value)
      } else {
        alert('添加的人必须姓王！')
      }
    },
    addPersonServer(context) {
      // Vuepress 使用 axios 报错，故使用 fetch 代替
      fetch('https://api.uixsj.cn/hitokoto/get?type=social').then(
        response => {
          response.text().then(data => {
            context.commit('ADD_PERSON', { id: nanoid(), name: data })
          })
        },
        error => {
          alert(error.message)
        }
      )
    }
  },
  mutations: {
    ADD_PERSON(state, value) {
      console.log('mutations 中的 ADD_PERSON 被调用了')
      state.personList.unshift(value)
    }
  },
  state: {
    personList: [{ id: '001', name: '张三' }]
  },
  getters: {
    firstPersonName(state) {
      return state.personList[0].name
    }
  }
}
