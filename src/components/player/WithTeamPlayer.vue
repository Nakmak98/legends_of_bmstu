<template>
    <div v-if="team">
        <p>Команда № {{team.team_id}}</p>
        <p>{{team.team_name}}</p>
        <p>{{team.search_input_value}}</p>
        <div v-if="team.invite_code">Пригласительный код:
            <p class="cursive-text">(сообщите его членам своей команды)</p>
            <p class="bold-text">{{team.invite_code}}</p></div>
        <table>
            <tr>
                <td>Участник</td>
                <td v-if="user.role === 'CAPTAIN'">Удалить участника</td>
            </tr>
            <tr v-for="member of team_members" class="table-cont">
                <td>
                    <div class="table-block"><a :href="'https://'+member.vk_ref" target="_blank">{{member.first_name}} {{member.last_name}}</a></div>
                </td>
                <td v-if="user.role === 'CAPTAIN'" class="kick-btn">
                    <img src="@/assets/captain.png" v-if="member.role === 'CAPTAIN'">
                    <div class="table-block"><span @click="check_delete_action(member)" v-if="member.role === 'PLAYER'">X</span>
                    </div>
                </td>
            </tr>
        </table>
        <base-button title="Перейти к заданиям" @click="$router.push('/game')"></base-button>
        <base-button title="Выйти из команды" @click="check_leave_team"></base-button>
    </div>
</template>

<script>
    import Axios from 'axios'
    import {ErrorHandler} from "../../ErrorHandler";

    export default {
        name: "WithTeamPlayer",
        data() {
            return {
                request_body: {
                    user_id: ''
                },
                check_join: false,
                popup_message: '',
            }
        },
        computed: {
            team_members() {
                return this.$store.state.team_members
            },
            team() {
                return this.$store.state.team
            },
            user() {
                return this.$store.state.user
            }
        },
        mounted() {
            if (!this.team_members) {
                this.request_team_members();
            }
            if (!this.team) {
                this.request_team_data();
            }
            if (!this.user) {
                this.request_user_data();
            }
        },
        beforeDestroy() {
            if (this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            check_leave_team() {
                let popup_options = {
                    message: 'Вы уверены, что хотите покинуть команду?',
                    placeholder: '',
                    input_field: false,
                    show: true,
                    callback: this.leave_team,
                    args: null
                };
                this.$store.commit('setPopupOptions', popup_options)
            },
            check_delete_action(member) {
                this.request_body.user_id = member.user_id;

                let popup_options = {
                    message: "Вы уверены, что хотите удалить " + member.first_name + "?",
                    placeholder: '',
                    input_field: false,
                    show: true,
                    callback: this.delete_member,
                    args: this.request_body
                };
                this.$store.commit('setPopupOptions', popup_options)
            },
            delete_member(request_body) {
                Axios
                    .delete('/team/kick', {
                        params: request_body
                    })
                    .then(() => {
                        this.$store.dispatch('updateTeamMembers')
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            },
            leave_team: function () {
                Axios
                    .delete('/team/leave')
                    .then(() => {
                        this.$store.commit('deleteTeamData');
                        this.$store.dispatch('updateUserData');
                        this.$store.commit('deleteTeamMembers');
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            },
            request_team_members: function () {
                Axios
                    .get('/team/members')
                    .then(response => {
                        this.$store.commit('setTeamMembers', response.data);
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            },
            request_team_data: function () {
                Axios
                    .get('/team/info')
                    .then(response => {
                        this.$store.commit('setTeamData', response.data);
                        if (!this.user.team_id)
                            this.$store.dispatch('updateUserData');
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            },
            request_user_data: function () {
                Axios
                    .get('/user/info')
                    .then(response => {
                        this.$store.commit('setUserData', response.data);
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    });
            },
        }
    }
</script>

<style>
    td {
        font-size: 16px;
        max-width: 18vw;
        overflow-x: hidden;
    }

    .table-block {
        word-wrap: break-word;
        font-size: 16px;
    }

    .table-block > a {
        font-size: 16px;
    }

    .kick-btn {
        width: 20px;
        color: red;
        cursor: pointer;
    }

    .cursive-text {
        font-style: italic;
        font-size: 17px;
        margin: 7px 0;
    }

    .bold-text {
        font-weight: bold;
    }
</style>