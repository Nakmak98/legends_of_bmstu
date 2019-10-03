import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";
import {ErrorHandler} from "./ErrorHandler";

Vue.use(Vuex)

let popup_default_options = {
    message: '',
    placeholder: '',
    input_field: false,
    show: false,
    callback: null,
    args: null
};

let error = {
    header: null,
    message: null
};

export default new Vuex.Store({
    state: {
        user: null,
        team: null,
        team_members: null,
        game: null,
        error: error,
        popup: popup_default_options
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
        setPopupOptions(state, data) {
            state.popup = data
        },
        setPopupInputValue(state, data) {
            state.popup.value = data
        },
        setErrorMessage(state, data) {
            state.error = data
        },
        setTaskStatus(state, data) {
           state.game = data
        },

        deleteTaskStatus(state) {
            state.game = null;
        },
        deleteTeamMembers(state) {
            state.team_members = null;
        },
        deleteTeamData(state) {
            state.team = null;
        },
        deleteUserData(state) {
            state.user = null;
        },
        deletePopupOptions(state) {
            state.popup = popup_default_options
        },
        deleteErrorMessage(state) {
            state.error = error
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
                    context.commit('setUserData', response.data)
                })
        },
        updateTaskStatus(context, data) {
            context.commit('deleteTaskStatus');
            if(data !== undefined) {
                context.commit('setTaskStatus', data);
                return;
            }
            Axios
                .get('/game/info')
                .then(response => {
                    context.commit('deleteErrorMessage');
                    context.commit('setTaskStatus', response.data);
                })
                .catch(error => {
                    if(error.response){
                        new ErrorHandler(error.response, this)
                    } else {
                        this.$router.push("/connection_error");
                    }
                })
        },
        updateTeamMembers(context) {
            Axios
                .get('/team/members')
                .then(response => {
                    context.commit('setTeamMembers', response.data);
                })
        }
    }
})
