import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    serUserData(state, data){
      state.user = data;
    }
  },
  actions: {
    setUserData(context){
      context.commit('setUserData', )
    }

  }
})
