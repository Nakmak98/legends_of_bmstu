import Vue from 'vue'
import Vue2TouchEvents from "vue2-touch-events";
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from "axios";
import BaseButton from "./components/base/BaseButton";
import BaseInput from "./components/base/BaseInput";
import BaseErrorMessage from "./components/base/BaseErrorMessage";
import BasePopup from "./components/base/BasePopup";

const prod_backend = 'http://legends.bmstu.ru:5050';
const test_backend = 'https://testing.legends.bmstu.ru/backend';

//Axios global config
Axios.defaults.baseURL = test_backend;
Axios.defaults.withCredentials = true;

//global components registration
Vue.component('base-button', BaseButton);
Vue.component('base-input', BaseInput);
Vue.component('base-error-message', BaseErrorMessage);
Vue.component('base-popup', BasePopup);

Vue.config.productionTip = false;
Vue.config.silent = true;

Vue.use(Vue2TouchEvents, {
  touchClass: '',
  tapTolerance: 10,
  swipeTolerance: 30,
  longTapTimeInterval: 400
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
