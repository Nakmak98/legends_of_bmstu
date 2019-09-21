<template>
    <div class="basic-block">
        <h1>Моя команда</h1>
        <with-team-player v-if="user.team_id"></with-team-player>
        <without-team-player v-if="!user.team_id"></without-team-player>
    </div>
</template>

<script>
    import WithoutTeamPlayer from "../../components/account/WithoutTeamPlayer";
    import WithTeamPlayer from "../../components/account/WithTeamPlayer";
    import Axios from 'axios'

    export default {
        name: "Team",
        components: {
            WithTeamPlayer,
            WithoutTeamPlayer
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            team() {
                return this.$store.state.team
            },
            team_members() {
                return this.$store.state.team_members
            },
        },
        mounted() {
            if (!this.team_members) {
                this.request_team_members();
            }
            if (!this.team) {
                this.request_team_data();
            }
            // if (!this.user) {
            //     this.request_user_data();
            // }
        },
        beforeDestroy() {
            if (this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            request_user_data: function () {
                Axios
                    .get('/user/info')
                    .then(response => {
                        this.$store.commit('setUserData', response.data);
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            // this.$router.push("/auth");
                            this.$store.commit('setErrorMessage', {
                                header: "Ошибка авторизации",
                                message: error.response.data.message
                            });
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
                        if (error.response.status === 401) {
                            // this.$route.push('/auth');
                            this.$store.commit('setErrorMessage', {
                                header: "Ошибка авторизации",
                                message: error.response.data.message
                            });
                        } else if (error.response.status === 404) {
                        } else {
                            this.$store.commit('setErrorMessage', {
                                header: "Ошибка",
                                message: error.response.data.message
                            });
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
                        if (error.response.status === 401) {
                            // this.$router.push('/auth');
                            this.$store.commit('setErrorMessage', {
                                header: "Ошибка авторизации",
                                message: error.response.data.message
                            });
                        } else if (error.response.status === 404) {
                            return
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