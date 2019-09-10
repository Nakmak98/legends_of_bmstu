<template>
    <div id="create-team">
        <div v-if="create_status">
            <p>Команда успешно создана!</p>
            <p>Перейдите в личный кабинет, чтобы просмотерть сведения о команде.</p>
        </div>
        <div v-else>
            <base-error-message :message="error_message"></base-error-message>
            <h1>Создание команды</h1>
            <base-input type="text" placeholder="Название команды" v-model="team_name"></base-input>
            <base-button title="Создать" @click="createTeam"></base-button>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        name: "CreateTeam",
        data() {
            return {
                team_name: '',
                create_status: false,
                error_message: ''
            }
        },
        methods: {
            createTeam: function () {
                if (this.team_name !== '') {
                    this.request();
                } else {
                    this.errorMessage = 'Поле не должно быть пустым'
                }
            },
            request: function () {
                Axios
                    .post('/team/create', {
                        team_name: this.team_name
                    })
                    .then(response => {
                        console.log(response.data)
                        console.log(response.status)
                        this.$store.commit('setTeamData', response.data);
                        this.$store.dispatch('updateUserData');
                        console.log("State.user: " + this.$store.getters.getUserData)
                        this.create_status = true
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                this.$router.push('/auth')
                            } else {
                                this.error_message = error.message
                            }
                        } else {
                            this.$router.push('/error')
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>