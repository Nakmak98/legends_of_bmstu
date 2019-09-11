import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Auth from "./views/Auth";
import Account from "./views/Account.vue";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";;
import CreateTeam from "./views/CreateTeam";
import Join from "./views/JoinToTeam"
Vue.use(Router)

const routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: SignIn
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: SignUp
    },
    {
      path: '/team/create',
      name: 'team_create',
      component: CreateTeam,
    },
    {
      path: '/team/add_member',
      name: 'add_member',
      component: CreateTeam,
    },
    {
      path: '/team/join',
      name: 'join',
      component: Join
    }]
})
export default routes
