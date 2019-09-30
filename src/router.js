import Vue from 'vue'
import Router from 'vue-router'
import Auth from "./views/Auth";
import Account from "./views/Account.vue";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import CreateTeam from "./views/player/CreateTeam";
import Join from "./views/player/JoinToTeam"
import Team from "./views/player/Team";
import ModeratorView from "./views/moderator/ModeratorView";
import TaskEditor from "./components/moderator/TaskEditor";
import Error from "./views/Error";
import StaticText from "./views/StaticText";
Vue.use(Router)

const routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: Account
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/info',
      name: 'info',
      component: StaticText
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
      path: '/team',
      component: Team,
    },
    {
      path: '/team/create',
      name: 'team_create',
      component: CreateTeam,
    },
    {
      path: '/team/join',
      name: 'join',
      component: Join
    },
    {
      path: '/moderator',
      name: 'moderator',
      component: ModeratorView
    },
    {
      path: '/moderator/create_task',
      name: 'create_task',
      component: TaskEditor
    },
    {
      path: '/moderator/edit_task/:task_id',
      name: 'edit_task',
      component: TaskEditor
    },
      {
          path: '/connection_error',
          name: 'error',
          component: Error
      }
    ]
});
export default routes
