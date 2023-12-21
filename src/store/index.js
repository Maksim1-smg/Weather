import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wither: 'http://api.weatherapi.com/v1/current.json?key=59e9e9a3b58346568b193900231912&q=',
    city: '',

    dogs: 'https://random.dog/woof.json',
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
