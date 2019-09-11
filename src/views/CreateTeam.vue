<template>
    <div id="create-team">
        <div v-if="create_status">
            <p>Команда успешно создана!</p>
            <p>Перейдите в личный кабинет, чтобы просмотерть сведения о команде.</p>
        </div>
        <div v-else>
            <h1>Создание команды</h1>
            <base-input type="text" placeholder="Название команды" v-model="team_name"></base-input>
            <base-button title="Создать" @click="check_create_team"></base-button>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        name: "CreateTeam",
        data() {
            return {
                search_input_value: '',
                create_status: false,
            }
        },
        methods: {
            check_create_team: function () {
                if (this.search_input_value !== '') {
                    this.create_team();
                } else {
                    this.$store.commit('setErrorMessage', {
                        header: "Ошибка",
                        message: "Поле не должно быть пустым"
                    });
                }
            },
            create_team: function () {
                Axios
                    .post('/team/create', {
                        search_input_value: this.search_input_value
                    })
                    .then(response => {
                        this.$store.commit('setTeamData', response.data);
                        this.$store.dispatch('updateUserData');
                        this.create_status = true
                    })
                    .catch(error => {
                        if (error.response) {
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
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>