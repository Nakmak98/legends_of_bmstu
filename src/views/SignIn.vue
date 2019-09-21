<template>
    <div class="basic-block auth">
        <img src="../assets/orn_top.png" id="ornament-top">
        <h1>Авторизация</h1>
        <base-input type="text" placeholder="Логин" v-model.trim="request_body.login"></base-input>
        <base-input type="password" placeholder="Пароль" v-model.trim="request_body.password"></base-input>
        <base-button title="Войти" @click="sign_in"></base-button>
        <base-button @click="$router.push('/sign_up')" title="Зарегистрироваться"></base-button>
        <img src="../assets/orn_bot.png" id="ornament-bottom">
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        name: 'SignIn',
        data() {
            return {
                request_body: {
                    login: '',
                    password: ''
                },
                error_header: "Ошибка авторизации"
            }
        },
        beforeDestroy() {
            if(this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            sign_in() {
                if (this.valid()) {
                    Axios
                        .post('/user/sign_in', this.request_body)
                        .then(response => {
                            this.$store.commit('setUserData', response.data);
                            this.redirect(response.data.role);
                        })
                        .catch(error => {
                            if (error.response.status === 400) {
                                this.$store.commit('setErrorMessage', {
                                    header: this.error_header,
                                    message: "Неверный логин / пароль."
                                });
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

                if (/[а-я]/g.test(this.request_body.login)) {
                    this.$store.commit('setErrorMessage', {
                        header: this.error_header,
                        message: "Поля не должны содержать кириллицу."
                    });
                    return false
                }
                return true
            },
            redirect(user_role) {
                if (user_role === 'PLAYER' || user_role === 'CAPTAIN' || user_role === 'TESTER') {
                    this.$router.push("/team")
                }
                if (user_role === 'MODERATOR') {
                    this.$router.push("/moderator")
                }
            }
        }

    }
</script>
