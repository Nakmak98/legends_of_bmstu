<template>
    <div v-if="user" class="about" @popup="this.$emit('popup')">
        <h1>Личный кабинет</h1>
        <ul>
            <p v-for="item in user">{{item}}</p>
        </ul>
        <div>
            <without-team-player v-if="!user.team_id"></without-team-player>
            <with-team-player v-if="user.team_id"></with-team-player>
            <base-button title="Удалить аккаунт" @click="check_delete_account"></base-button>
            <base-button v-if="user.team_id" title="Выйти из команды" @click="check_leave_team"></base-button>
            <base-button title="Выйти" @click="logout"></base-button>
            <base-error-message @error="show_error" :message="error_message"></base-error-message>
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
                    })
                    .catch(error => {
                        console.log(error.response.status);
                        if (error.response.status === 401) {
                            this.error_message = error.response.data.message
                        }
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
                                this.$router.push("/auth")
                            } else {
                                this.error_message = error.response.data.message
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
                    .catch(error => {
                        if (error.response) {
                            this.error_message = error.response.data.message
                        }
                    });
            },
            check_delete_account(){
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
            check_leave_team(){
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
                            this.error_message = error.response.data.message
                        }
                    })
            },
            show_error(message) {
                this.error_message = message
            }
        }
    }
</script>