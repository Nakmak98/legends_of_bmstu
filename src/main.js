import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from "axios";

Axios.defaults.baseURL = 'http://5.23.54.233:5050';
Axios.defaults.withCredentials = true
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
