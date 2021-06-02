import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null,
    // url: "/api",
    url: "https://microf.hogi.bi/api",
    // url: "http://127.0.0.1:8000/api",
    personnes:[],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
