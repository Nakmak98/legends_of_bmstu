<template>
    <div>
        <base-error-message :message="error_message"></base-error-message>
        <h1>Поиск команды</h1>
        <div>
            <base-input type="text" placeholder="Название команды" v-model="search_input_value"></base-input>
        </div>
        <h1>Название команды</h1>
        <select v-model="request_body.team_id" size="5">
            <option v-for="team of search_team" :value="team.team_id">{{team.team_id}} {{team.team_name}}</option>
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
                search_input_value: '',
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
                let regexp = new RegExp(this.search_input_value, 'i');
                return this.teams.filter(team => team.team_name.match(regexp) || team.team_id.toString().match(regexp))
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
                        this.teams.sort((a,b) => {
                            if(a.team_id > b.team_id) { return 1 }
                            if(a.team_id < b.team_id) { return -1 }
                            return 0
                        });
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