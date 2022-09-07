//该文件用于创建 Vuex 中最为核心的 store
import Vue from 'vue'
//引入 Vuex
import Vuex from 'vuex'
import countOptions from './count'
import personOptions from './person'
//应用 Vuex 插件
Vue.use(Vuex)

//创建并暴露 store
export default new Vuex.Store({
	modules:{
		countAbout:countOptions,
		personAbout:personOptions
	}
})
