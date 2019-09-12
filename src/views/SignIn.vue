<template>
    <div>
        <base-input type="text" placeholder="Логин" v-model.trim="request_body.login"></base-input>
        <base-input type="password" placeholder="Пароль" v-model.trim="request_body.password"></base-input>
        <base-button title="Войти" @click="sign_in"></base-button>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        name: 'SignIn',
        data: function () {
            return {
                request_body: {
                    login: '',
                    password: ''
                },
                error_header: "Ошибка авторизации"
            }
        },
        methods: {
            sign_in() {
                if (this.valid(this)) {
                    Axios
                        .post('/user/sign_in', this.request_body)
                        .then(response => {
                            console.log(response.data);
                            this.$store.commit('setUserData', response.data);
                            this.$router.push("/account");
                        })
                        .catch(error => {
                            if (error.response) {
                                console.log(error.response.status)
                                if (error.response.status === 400) {
                                    this.$store.commit('setErrorMessage', {
                                        header: this.error_header ,
                                        message: "Неверный логин / пароль"
                                    });
                                }
                            }
                        })
                }
            },
            valid(obj) {
                for (let field in obj.request_body) {
                    if (obj.request_body[field] === '') {
                        this.$store.commit('setErrorMessage', {
                            header: this.error_header ,
                            message: "Заполните все поля формы"
                        });
                        return false
                    }
                }

                if (/[а-я]/g.test(obj.request_body.login)) {
                    this.$store.commit('setErrorMessage', {
                        header: this.error_header ,
                        message: "Поля не должны содержать кириллицу"
                    });
                    return false
                }
                return true
            }
        }
    }
</script>
<style scoped lang="scss"></style>
