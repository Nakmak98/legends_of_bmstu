<template>
    <div v-if="user.role === 'ADMIN'" class="basic-block">
        <p>Смена этапа</p>
        <p>
            <select v-model="status" size="4">
                <option :value="status_enum.REGISTRATION">Регистрация</option>
                <option :value="status_enum.PILOT">Разогрев</option>
                <option :value="status_enum.FINAL">Финал</option>
                <option :value="status_enum.FINISH">Финиш</option>
            </select>
        </p>
        <p><base-button title="Сменить этап" @click="check_change_stage"></base-button></p>
    </div>

</template>

<script>
    import {ErrorHandler} from "../../ErrorHandler";
    import Axios from 'axios';
    export default {
        name: "AdminPanel",
        data() {
            return {
                status: null,
                status_enum: {
                    REGISTRATION: "REGISTRATION",
                    PILOT: "PILOT",
                    FINAL: "FINAL",
                    FINISH: "FINISH"
                }
            }
        },
        computed: {
          user() { return this.$store.state.user }
        },
        mounted() {
          this.get_actual_stage()
        },
        beforeDestroy() {
            if(this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            get_actual_stage(){
                Axios
                    .get('/game/status')
                    .then(response => {
                        this.status = response.data
                    })
                    .catch(error => {
                        if (error.response){
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            },
            check_change_stage() {
                let popup_options = {
                    message: 'Подтвердите действие',
                    show: true,
                    placeholder: "",
                    input_field: true,
                    callback: this.change_stage,
                    args: this.status
                };
                this.$store.commit('setPopupOptions', popup_options)
            },
            change_stage(args, input_value) {
                Axios
                    .post('/manage/stage', {
                        status: args,
                        secret: input_value
                    })
                    .then(response => {
                        alert("Успешно")
                    })
                    .catch(error => {
                        if (error.response){
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>