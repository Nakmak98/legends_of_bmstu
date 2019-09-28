<template>
    <div class="basic-block auth">
        <img src="../assets/orn_top.png" id="ornament-top">
        <h1>Регистрация</h1>
        <base-input type="text" placeholder="Имя" v-model="request_body.first_name"></base-input>
        <base-input type="text" placeholder="Фамилия" v-model="request_body.last_name"></base-input>
        <base-input type="text" placeholder="Группа" v-model="request_body.group"></base-input>
        <base-input type="text" placeholder="Логин" v-model="request_body.login"></base-input>
        <base-input type="text" placeholder="vk.сom/id" v-model="request_body.vk_ref"></base-input>
        <base-input type="password" placeholder="Пароль (более 3 символов)" v-model="request_body.password"></base-input>
        <base-input type="password" placeholder="Подтверждение пароля" v-model="confirm_password"></base-input>
        <br>
        <base-button class="sign-up-btn" title="Зарегистрироваться" @click="sign_up"></base-button>
        <img src="../assets/orn_bot.png" id="ornament-bottom">
    </div>
</template>

<script>
    import Axios from 'axios'
    import {ErrorHandler} from "../ErrorHandler";
    export default {
        name: "signUp",
        data: function () {
            return {
                request_body: {
                    first_name: '',
                    last_name: '',
                    login: '',
                    password: '',
                    group: '',
                    vk_ref: 'vk.com/',
                },

                confirm_password: '',
                error_header: 'Ошибка регистрации'
            }
        },
        beforeDestroy() {
            if(this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            sign_up() {
                if (this.valid()) {
                    Axios
                        .post('/user/sign_up', this.request_body)
                        .then(response => {
                            this.$store.commit('setUserData', response.data);
                            this.$router.push("/rules")
                        })
                        .catch(error => {
                            if(error.response){
                                new ErrorHandler(error.response, this)
                            } else {
                                this.$router.push("/connection_error");
                            }
                        })
                }
            },
            valid() {
                for (let field in this.request_body) {
                    if (this.request_body[field] === '') {
                        this.$store.commit('setErrorMessage', {
                            header: this.error_header,
                            message: "Заполните все поля формы."
                        });
                        return false
                    }
                }
                if ((/[0-9]/g.test(this.request_body.first_name)) || (/[0-9]/g.test(this.request_body.last_name))) {
                    this.$store.commit('setErrorMessage', {
                        header: this.error_header,
                        message: "Имя или фамилия не должны содержать цифр."
                    });
                    return false
                }

                if (/[а-я]/g.test(this.request_body.login)) {
                    this.$store.commit('setErrorMessage', {
                        header: this.error_header,
                        message: "Логин не должен содержать кириллицу."
                    });
                    return false
                }

                if (this.request_body.password !== this.confirm_password) {
                    this.$store.commit('setErrorMessage', {
                        header: this.error_header,
                        message: "Пароли не совпадают."
                    });
                    return false
                }
                return true
            }
        }
    }
</script>
<style>
    .sign-up-btn > button{
        background-color: #e1bf92;
    }
</style>