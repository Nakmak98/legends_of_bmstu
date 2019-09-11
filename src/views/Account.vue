<template>
    <div v-if="user" class="about">
        <h1>Личный кабинет</h1>
        <h2>{{user.first_name}} {{user.last_name}}</h2>
        <h2>{{user.login}}</h2>
        <h2>id: {{user.user_id}}</h2>
        <div>
            <without-team-player v-if="!user.team_id"></without-team-player>
            <with-team-player v-if="user.team_id"></with-team-player>
            <base-button title="Удалить аккаунт" @click="check_delete_account"></base-button>
            <base-button v-if="user.team_id" title="Выйти из команды" @click="check_leave_team"></base-button>
            <base-button title="Выйти" @click="check_logout"></base-button>
        </div>
    </div>
</template>
<script>
    import Axios from 'axios'
    import WithoutTeamPlayer from "../components/account/WithoutTeamPlayer";
    import WithTeamPlayer from "../components/account/WithTeamPlayer";

    export default {
        name: "account",
        components: {
            WithoutTeamPlayer,
            WithTeamPlayer,
        },
        data() {
            return {
                error_message: '',
                popup_message: ''
            }
        },
        computed: {
            user: function () {
                return this.$store.state.user
            },
            team: function () {
                return this.$store.state.team
            },
            team_members: function () {
                return this.$store.state.team_members
            }
        },
        mounted() {
            if (!this.user) {
                this.request_user_data();
            }
            if (this.user && !this.team) {
                this.request_team_data()
            }
        },
        methods: {
            check_delete_account() {
                let popup_options = {
                    message: 'Вы уверены, что хотите удалить аккаунт?',
                    placeholder: '',
                    input_field: false,
                    show: true,
                    callback: this.delete_account,
                    args: null
                };
                this.$store.commit('setPopupOptions', popup_options)
            },
            check_logout() {
                let popup_options = {
                    message: 'Вы уверены, что хотите выйти из аккаунта?',
                    placeholder: '',
                    input_field: false,
                    show: true,
                    callback: this.logout,
                    args: null
                };
                this.$store.commit('setPopupOptions', popup_options)
            },
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
            delete_account: function () {
                Axios
                    .delete('/user/delete')
                    .then(response => {
                        console.log(response.status);
                        console.log(response.data);
                        this.$store.commit('deleteUserData');
                        this.$store.commit('deleteTeamData');
                        this.$store.commit('deleteTeamMembers');
                        this.$router.push('/auth')
                    }).catch(error => {
                    this.$store.commit('setErrorMessage', {
                        header: "Ошибка",
                        message: error.response.data.message
                    });
                })
            },
            logout: function () {
                Axios
                    .get('/user/logout')
                    .then(response => {
                        console.log(response.status);
                        this.$store.commit('deleteUserData');
                        this.$store.commit('deleteTeamData');
                        this.$store.commit('deleteTeamMembers');
                        this.$router.push('/auth')
                    })
            },
            request_user_data: function () {
                Axios
                    .get('/user/info')
                    .then(response => {
                        console.log(response.status);
                        console.log(response.data);
                        this.$store.commit('setUserData', response.data);
                        this.request_team_data();
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                this.$router.push("/auth");
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка авторизации",
                                    message: error.response.data.message
                                });
                            }
                        }
                    });
            },
            request_team_data: function () {
                Axios
                    .get('/team/info')
                    .then(response => {
                        console.log(response.status);
                        console.log(response.data);
                        this.$store.commit('setTeamData', response.data);
                    })
            },
            leave_team: function () {
                Axios
                    .delete('/team/leave')
                    .then(response => {
                        console.log(response.status);
                        console.log(response.data);
                        this.$store.commit('deleteTeamData');
                        this.$store.dispatch('updateUserData');
                        this.$store.commit('deleteTeamMembers');
                    })
                    .catch(error => {
                        console.log(error.response.status);
                        if (error.response.status === 401) {
                            this.$router.push('/auth');
                            this.$store.commit('setErrorMessage', {
                                header: "Ошибка авторизации",
                                message: error.response.data.message
                            });
                        } else {
                            this.$store.commit('setErrorMessage', {
                                header: "Ошибка",
                                message: error.response.data.message
                            });
                        }
                    })
            },
        }
    }
</script>