import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './mutation-types'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      token: null,
    },
    title: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.user.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('USER_TOKEN');
      state.user.token = null;
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    }
  }
})
