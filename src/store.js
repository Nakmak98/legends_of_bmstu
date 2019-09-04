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
    }
  },
  getters: {
    checkUserData: state => {
      return "user_id" in state.user
    }
  },
  actions: {
    setUserData(context){
      context.commit('setUserData', )
    }

  }
})
