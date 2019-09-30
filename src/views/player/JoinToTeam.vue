<template>
    <div class="basic-block">
        <div v-if="teams.length">
            <h1>Поиск команды</h1>
            <base-input type="text" placeholder="Название / номер команды" v-model="search_input_value"></base-input>
            <h1>Выберите команду</h1>
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
        <div v-if="teams == 1">
            Загрузка...
        </div>
        <div v-if="teams == 0">
            <p>Ни одной команды ещё ни создано.</p>
            <base-button title="Создать команду" @click="$router.push('/team/create')"></base-button>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import {ErrorHandler} from "../../ErrorHandler";

    export default {
        name: "JoinToTeam",
        data() {
            return {
                request_body: {
                    team_id: 0,
                    invite_code: ''
                },
                search_input_value: '',
                teams: 1
            }
        },
        computed: {
            search_team() {
                this.request_body.team_id = 0; // if team was selected, discard
                let regexp = new RegExp(this.search_input_value, 'i');
                return this.teams.filter(team => team.team_name.match(regexp) || team.team_id.toString().match(regexp))
            }
        },
        mounted() {
            this.request_teams();
        },
        beforeDestroy() {
            if (this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            check_join() {
                if (!this.request_body.team_id) {
                    this.$store.commit('setErrorMessage', {
                        header: "Ошибка",
                        message: "Необходимо выбрать команду из списка.",
                    });
                    return
                }
                let selected_team = this.teams.find(item => item.team_id == this.request_body.team_id);
                let popup_options = {
                    message: "Введите пригласительный код для команды " + "\"" + selected_team.team_name + "\"",
                    placeholder: 'Пригласительный код',
                    input_field: true,
                    show: true,
                    callback: this.join_team,
                    args: this.request_body
                };
                this.$store.commit('deleteErrorMessage');
                this.$store.commit('setPopupOptions', popup_options)
            },
            select(event) {
                let option = event.target;
                let options = document.getElementsByClassName('team-option');
                for (let item of options) {
                    item.style.backgroundColor = "";
                    item.style.border = "1px solid #e1bf92";
                }
                option.style.backgroundColor = "#FFF5E7";
                option.style.border = "1px solid #e1bf92";
                this.request_body.team_id = option.value;
            },
             request_teams() {
               Axios
                    .get('/team/all')
                    .then(response => {
                        if(response.data.length === 0){
                            this.teams = 0;
                            return;
                        }
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
                    .catch(error => {
                        if (!error.response) {
                            this.$router.push("/connection_error");
                        }
                    });
            },
            join_team: function (request_body, invite_code) {
                if (!invite_code) {
                    this.$store.commit('setErrorMessage', {
                        header: "Ошибка",
                        message: "Поле не должно быть пустым."
                    });
                    return
                }
                request_body.invite_code = invite_code;
                Axios
                    .post('/team/join', request_body)
                    .then(response => {
                        this.$store.commit('setTeamData', response.data);
                        this.$store.dispatch('updateUserData');
                        this.$router.push("/team");
                    })
                    .catch(error => {
                        if (error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push("/connection_error");
                        }
                    })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .teams-list {
        max-height: 300px;
        overflow-y: scroll;
        margin-bottom: 15px;

        option {
            height: 30px;
            border: 1px solid #e1bf92;
            padding-top: 10px;
        }
    }

    .selected {
        background-color: #E8D8C1;
    }
</style>