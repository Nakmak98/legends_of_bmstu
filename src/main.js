import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from "axios";
import BaseButton from "./components/base/BaseButton";

//Axios global config
Axios.defaults.baseURL = 'http://5.23.54.233:5050';
Axios.defaults.withCredentials = true;

//global components registration
Vue.component('base-button', BaseButton);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
