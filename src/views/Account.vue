<template>
    <div v-if="user" class="about">
        <h1>Личный кабинет</h1>
        <ul v-for="item in user">
            <p>{{item}}</p>
        </ul>
        <div>
            <base-error-message :message="errorMessage"></base-error-message>
            <without-team-player v-if="!user.team_id"></without-team-player>
            <with-team-player v-if="user.team_id"></with-team-player>
            <base-button title="Удалить аккаунт" @click="deleteAccount"></base-button>
            <base-button title="Выйти" @click="logout"></base-button>
        </div>
    </div>
</template>
<script>
    import Axios from 'axios'
    import withoutTeamPlayer from "../components/account/WithoutTeamPlayer";
    import withTeamPlayer from "../components/account/withTeamPlayer";

    export default {
        name: "account",
        components: {
            withoutTeamPlayer,
            withTeamPlayer,
        },
        data() {
            return {
                errorMessage: ''
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
            console.log("USER: " + this.user)
            console.log("TEAM: " + this.team)
            if (!this.user) {
                this.requestUserData();
            }
            if(this.user && !this.team) {
                this.requestTeamData()
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
                        this.$router.push('/auth')
                    })
            },
            deleteAccount: function () {
                Axios
                    .delete('/user/delete')
                    .then(response => {
                        console.log(response.status)
                        console.log(response.data)
                        this.$store.commit('deleteUserData')
                        this.$router.push('/auth')
                    })
                    .catch(error => {
                        console.log(error.response.status)
                        if (error.response.status === 401) {
                            error.message
                        }
                    })
            },
            requestUserData: function () {
                Axios
                    .get('/user/info')
                    .then(response => {
                        console.log(response.status);
                        console.log(response.data);
                        this.$store.commit('setUserData', response.data);
                        this.requestTeamData();
                    })
                    .catch(error => {
                        if (error.response) {
                            error.response.status === 401 ? this.$router.push("/auth") : this.$router.push("/error")
                        }
                    });
            },
            requestTeamData: function () {
                Axios
                    .get('/team/info')
                    .then(response => {
                        console.log(response.status);
                        console.log(response.data);
                        this.$store.commit('setTeamData', response.data);
                    })
                    .catch(error => {
                        if (error.response) {
                            this.errorMessage = error.message
                        }
                    });
            },
        }
    }
</script>