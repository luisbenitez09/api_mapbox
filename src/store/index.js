import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapResult: [],
    mapPin: []
  },
  mutations: {
    SET_MAP_RESULT(state, payload) {
      state.mapResult = payload;
    },
    SET_MAP_PIN(state, payload) {
      state.mapPin = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
