<template>
    <div>
        <base-error-message :message="error_message"></base-error-message>
        <h1>Поиск команды</h1>
        <div>
            <base-input type="text" placeholder="Название команды" v-model="team_name"></base-input>
        </div>
        <h1>Название команды</h1>
        <select v-model="request_body.team_id" size="5">
            <option v-for="team of search_team" v-bind:value="team.team_id">{{team.team_name}}</option>
        </select>
        <base-button title="Вступить в команду" @click="show_popup"></base-button>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        name: "Join",
        data() {
            return {
                request_body: {
                    team_id: 0,
                    invite_code: ''
                },
                team_name: '',
                popup_message: 'Введите пригласительный код',
                error_message: '',
                teams: []
            }
        },
        mounted() {
            this.request_teams();
        },
        computed: {
            search_team() {
                return this.teams.filter(team => team.team_name.includes(this.team_name))
            }
        },
        methods: {
            show_popup(){
                let popup_options = {
                    message: "Введите пригласительный код",
                    placeholder: 'Пригласительный код',
                    input_field: true,
                    show: true,
                    callback: this.join_team,
                    args: this.request_body
                };
                this.$store.commit('setPopupOptions', popup_options)
            },
            request_teams() {
                Axios
                    .get('/team/all')
                    .then(response => {
                        console.log(response.data)
                        this.teams = response.data
                    })
                    .catch(error => {
                        if (error.response) {
                            console.log(error.response.status)
                            console.log(error.message)
                            if (error.response.status === 401) {
                                this.$route.push('/auth')
                            } else if (error.response.status === 403) {
                                this.$emit('error', error.message)
                            } else if (error.response.status === 404) {
                                this.$emit('error', error.message)
                            } else {
                                this.$emit('error', error.message)
                            }
                        }
                    })
            },
            join_team: function (request_body, invite_code) {
                console.log(invite_code);
                request_body.invite_code = invite_code
                Axios
                    .post('/team/join', request_body)
                    .then(response => {
                        console.log(response.data)
                        this.$store.commit('setTeamData', response.data);
                        this.$store.dispatch('updateUserData');
                        this.$router.push("/account");
                    })
                    .catch(error => {
                        if (error.response) {
                            console.log(error.response.status)
                            if (error.response.status === 401) {
                                this.$router.push('/auth')
                            } else if (error.response.status === 400) {
                                this.error_message = error.message
                            } else {
                                this.$emit('error', error.message)
                            }
                        }

                    })
            },
        }

    }
</script>

<style scoped>

</style>