import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapResult: [],
    mapPin: [],
    weatherWidget: true,
    userData: {},
  },
  mutations: {
    SET_MAP_RESULT(state, payload) {
      state.mapResult = payload;
    },
    SET_MAP_PIN(state, payload) {
      state.mapPin = payload;
    },
    SET_WIDGET(state, payload) {
      if (state.mapResult.length == 0){
        state.weatherWidget = true;
      } else {
        state.weatherWidget = payload;
      }
    },
    SET_DATA(state, payload) {
      state.userData = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
