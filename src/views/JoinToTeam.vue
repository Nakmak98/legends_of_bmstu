<template>
    <div>
        <h1>Поиск команды</h1>
        <base-input type="text" placeholder="Название / номер команды" v-model="search_input_value"></base-input>
        <h1>Название команды</h1>
        <div class="teams-list">
            <option v-for="team of search_team"
                    :value="team.team_id"
                    @click="select"
                    class="team-option">
                {{team.team_id}} {{team.team_name}}
            </option>
        </div>
        <base-button title="Вступить в команду" @click="check_join"></base-button>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        name: "JoinToTeam",
        data() {
            return {
                request_body: {
                    team_id: 0,
                    invite_code: ''
                },
                search_input_value: '',
                popup_message: 'Введите пригласительный код',
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
            check_join() {
                if(this.request_body.team_id === 0) {
                    this.$store.commit('setErrorMessage', {
                        header: "Ошибка",
                        message: "Необходимо выбрать команду из списка"
                    });
                    return
                }
                let popup_options = {
                    message: "Введите пригласительный код",
                    placeholder: 'Пригласительный код',
                    input_field: true,
                    show: true,
                    callback: this.join_team,
                    args: this.request_body
                };
                this.$store.commit('deleteErrorMessage');
                this.$store.commit('setPopupOptions', popup_options)
            },
            select(event){
                let option = event.target;
                let options = document.getElementsByClassName('team-option');
                for(let item of options){
                    item.style.backgroundColor="";
                }
                option.style.backgroundColor="green";
                this.request_body.team_id = option.value;
            },
            request_teams() {
                Axios
                    .get('/team/all')
                    .then(response => {
                        console.log(response.data)
                        this.teams = response.data.sort((a, b) => {
                            if (a.team_id > b.team_id) {
                                return 1
                            }
                            if (a.team_id < b.team_id) {
                                return -1
                            }
                            return 0
                        });
                    })
            },
            join_team: function (request_body, invite_code) {
                if(invite_code == '') {
                    this.$store.commit('setErrorMessage', {
                        header: "Ошибка",
                        message: "Поле не должно быть пустым"
                    });
                    return
                }
                request_body.invite_code = invite_code;
                Axios
                    .post('/team/join', request_body)
                    .then(response => {
                        this.$store.commit('setTeamData', response.data);
                        this.$store.dispatch('updateUserData');
                        this.$router.push("/account");
                    })
                    .catch(error => {
                        if (error.response) {
                            console.log(error.response.status)
                            if (error.response.status === 401) {
                                this.$router.push('/auth')
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка авторизации",
                                    message: error.response.data.message
                                });
                            } else if(error.response.status > 401) {
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка",
                                    message: error.response.data.message
                                });
                            }
                        }

                    })
            },
        }

    }
</script>

<style lang="scss" scoped>
.selected {
    //Please, style it normal)))
    background-color: cadetblue;
    .team-option {
        //Need to select teams. Don't remove this class in html-tag!
    }
}
</style>