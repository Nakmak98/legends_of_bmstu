import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUserData(state, data){
      state.user = data;
    },
    deleteUserData(state){
      state.user = {};
    }
  },
  getters: {
    checkUserData: state => {
      return "user_id" in state.user
    },
    getUserData: state => {
      return state.user
    }
  },
  actions: {
    setUserData(context){
      context.commit('setUserData')
    }
  }
})
