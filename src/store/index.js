import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './mutation-types'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("USER_TOKEN"),
    spinner: '',
    title: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      sessionStorage.setItem("USER_TOKEN", data)
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      sessionStorage.removeItem('USER_TOKEN');
      state.token = null;
    }
  }
})
