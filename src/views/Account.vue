<template>
    <div v-if="user" class="about">
        <h1>Личный кабинет</h1>
        <ul v-for="item in user">
            <p>{{item}}</p>
        </ul>
        <div>
            <without-team-player v-if="!user.team_id"></without-team-player>
            <with-team-player v-if="user.team_id"></with-team-player>
            <base-button title="Удалить аккаунт" @click="delete_account"></base-button>
            <base-popup :show="show_popup" :message="popup_message" @access="leaveTeam" @cancel="show_popup=false"></base-popup>
            <base-button v-if="user.team_id" title="Выйти из команды" @click="checkLeaveAction"></base-button>
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
                show_popup:false,
                popup_message:''
            }
        },
        computed: {
            user: function () {
                return this.$store.state.user
            },
            team: function () {
                return this.$store.state.team
            }
        },
        mounted() {
            if (!this.user) {
                this.request_user_data();
            }
            if(this.user && !this.team) {
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
                            this.error_message = error.message
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
                                this.error_message = error.message
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
                            this.error_message = error.message
                        }
                    });
            },
            checkLeaveAction() {
                this.show_popup = true;
                this.popup_message = "Вы уверены, что хотите выйти из команды?"
            },
            leaveTeam:function(){
                Axios
                    .delete('/team/leave')
                    .then(response => {
                        console.log(response.status);
                        console.log(response.data);
                        this.$store.commit('deleteTeamData');
                        this.$store.commit('deleteTeamMembers');


                    })
                    .catch(error => {
                        console.log(error.response.status);
                        if (error.response.status === 401) {
                            this.error_message = error.message
                        }
                    })
            },
            show_error(message) {
              this.error_message = message
            }
        }
    }
</script>