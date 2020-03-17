import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapResult: []
  },
  mutations: {
    SET_MAP_RESULT(state, payload) {
      state.mapResult = payload;
    }
  },
  getters: {
    GET_INFO: state => {
      return state.mapResult;
    }
  },
  actions: {
  },
  modules: {
  }
})
