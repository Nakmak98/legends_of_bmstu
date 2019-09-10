<template>
    <div id="create-team">
        <div v-if="createStatus">
            <p>Команда успешно создана!</p>
            <p>Перейдите в личный кабинет, чтобы просмотерть сведения о команде.</p>
        </div>
        <div v-else>
            <base-error-message :message="errorMessage"></base-error-message>
            <h1>Создание команды</h1>
            <base-input type="text" placeholder="Название команды" v-model="teamName"></base-input>
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
                createStatus: false,
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
                        this.createStatus = true
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                this.$router.push('/auth')
                            } else {
                                this.errorMessage = error.message
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