import Vue from 'vue'
import Router from 'vue-router'
import Auth from "./views/account/Auth";
import Account from "./views/account/Account.vue";
import SignIn from "./views/account/SignIn";
import SignUp from "./views/account/SignUp";
import CreateTeam from "./views/player/CreateTeam";
import Join from "./views/player/JoinToTeam"
import Team from "./views/player/Team";
import ModeratorView from "./views/moderator/TaskConstructor";
import TaskEditor from "./components/moderator/TaskEditor";
import TeamStatus from "./views/moderator/TeamsStatus";
import Error from "./views/Error";
import StaticText from "./views/StaticText";
import Game from "./views/player/Game";
import AdminPanel from "./views/admin/AdminPanel";
import TasksStatus from "./views/moderator/TasksStatus";
import Answers from "./views/revisor/Answers";
import TeamList from "./views/revisor/TeamList";
import KeysGenerator from "./views/revisor/KeysGenerator";

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
            path: '/admin',
            name: 'admin',
            component: AdminPanel
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
            path: '/game',
            component: Game,
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
            path: '/moderator/tasks_status',
            name: 'tasks_status',
            component: TasksStatus
        },
        {
            path: '/moderator/teams_status',
            name: 'teams_status',
            component: TeamStatus
        },
        {
            path: '/moderator/edit_task/:task_id',
            name: 'edit_task',
            component: TaskEditor
        },
        {
            path: '/revisor/answers',
            component: Answers
        },
        {
            path: '/revisor/team_list',
            component: TeamList
        },
        {
            path: '/revisor/keys_generator',
            component: KeysGenerator
        },
        {
            path: '/connection_error',
            name: 'error',
            component: Error
        }
    ]
});
export default routes
