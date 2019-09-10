import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        user: null,
        team: null,
        team_members: null
    },
    mutations: {
        setUserData(state, data) {
            state.user = data;
        },
        setTeamData(state, data) {
            state.team = data
        },
        setTeamMembers(state, data) {
            state.team_members = data
        },

        deleteTeamMembers(state) {
            state.team_members = null;
        },
        deleteTeamData(state) {
            state.team = null;
        },
        deleteUserData(state) {
            state.user = null;
        }
    },
    getters: {
        getUserData: state => state.user,
        getTeamData: state => state.team
    },
    actions: {
        updateUserData(context) {
            Axios
                .get('/user/info')
                .then(response => {
                    console.log(response)
                    context.commit('setUserData', response.data)
                }).catch(error => {
                console.log("NOT RESPONSE: " + error)
                console.log(error.response.status)
                console.log(error.response.data)
            })
        },
    }
})
