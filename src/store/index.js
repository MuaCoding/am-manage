import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './mutation-types'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("USER_TOKEN"),
    spinner: '',
    exp: sessionStorage.getItem("TOKEN_EXP")
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      sessionStorage.setItem("USER_TOKEN", data)
      state.token = data;
    },
    [types.EXP]: (state, data) => {
      sessionStorage.setItem("TOKEN_EXP", data)
      state.exp = data;
    },
    [types.LOGOUT]: (state) => {
      sessionStorage.removeItem('USER_TOKEN');
      sessionStorage.removeItem('TOKEN_EXP');
      state.token = null;
    }
  },
})
