<template>
    <div class="basic-block">
        <h1>Моя команда</h1>
        <with-team-player></with-team-player>
        <without-team-player v-if="!user.team_id"></without-team-player>
    </div>
</template>

<script>
    import WithoutTeamPlayer from "../../components/player/WithoutTeamPlayer";
    import WithTeamPlayer from "../../components/player/WithTeamPlayer";
    import Axios from 'axios'
    import {ErrorHandler} from "../../ErrorHandler";

    export default {
        name: "Team",
        components: {
            WithTeamPlayer,
            WithoutTeamPlayer,
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
        },
        beforeDestroy() {
            if (this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            request_team_members: function () {
                Axios
                    .get('/team/members')
                    .then(response => {
                        this.$store.commit('setTeamMembers', response.data);
                    })
                    .catch(error => {
                        if(error.response){
                            new ErrorHandler(error.response, this)
                            // if (error.response.status === 401) {
                            //     this.$route.push('/auth');
                            //     this.$store.commit('setErrorMessage', {
                            //         header: "Ошибка авторизации",
                            //         message: error.response.data.message
                            //     });
                            // }
                            // if (error.response.status > 404 && error.response.status < 500 ){
                            //     this.$store.commit('setErrorMessage', {
                            //         header: "Ошибка",
                            //         message: error.response.data.message
                            //     });
                            // }
                            // if (error.response.status >= 500){
                            //     this.$store.commit('setErrorMessage', {
                            //         header: "Ошибка",
                            //         message: "Что-то пошло не так"
                            //     });
                            // }
                        } else {
                            this.$router.push("/connection_error");
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
                        new ErrorHandler(error.response, this)
                    })
            },
        }
    }
</script>