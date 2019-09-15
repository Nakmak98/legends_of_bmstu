<template>
    <div v-if="user" class="about basic-block">
        <h1>Личный кабинет</h1>
        <h2>{{user.first_name}} {{user.last_name}}</h2>
        <h2>{{user.login}}</h2>
        <h2>id: {{user.user_id}}</h2>
        <div>
            <base-button title="Кабинет команды" @click="$router.push('/team')"></base-button>
            <base-button title="Удалить аккаунт" @click="check_delete_account"></base-button>
            <base-button title="Выйти" @click="check_logout"></base-button>
        </div>
    </div>
</template>
<script>
    import Axios from 'axios'
    import WithoutTeamPlayer from "../components/account/WithoutTeamPlayer";
    import WithTeamPlayer from "../components/account/WithTeamPlayer";

    export default {
        name: "account",
        data() {
            return {
                error_message: '',
                popup_message: ''
            }
        },
        computed: {
            user: function () {
                return this.$store.state.user
            },
        },
        mounted() {
            if (!this.user) {
                this.request_user_data();
            }
        },
        methods: {
            check_delete_account() {
                let popup_options = {
                    message: 'Вы уверены, что хотите удалить аккаунт?',
                    placeholder: '',
                    input_field: false,
                    show: true,
                    callback: this.delete_account,
                    args: null
                };
                this.$store.commit('setPopupOptions', popup_options)
            },
            check_logout() {
                let popup_options = {
                    message: 'Вы уверены, что хотите выйти из аккаунта?',
                    placeholder: '',
                    input_field: false,
                    show: true,
                    callback: this.logout,
                    args: null
                };
                this.$store.commit('setPopupOptions', popup_options)
            },

            delete_account: function () {
                Axios
                    .delete('/user/delete')
                    .then(response => {
                        console.log(response.status);
                        console.log(response.data);
                        this.$store.commit('deleteUserData');
                        this.$store.commit('deleteTeamData');
                        this.$store.commit('deleteTeamMembers');
                        this.$router.push('/auth')
                    }).catch(error => {
                    this.$store.commit('setErrorMessage', {
                        header: "Ошибка",
                        message: error.response.data.message
                    });
                })
            },
            logout: function () {
                Axios
                    .get('/user/logout')
                    .then(response => {
                        console.log(response.status);
                        this.$store.commit('deleteUserData');
                        this.$store.commit('deleteTeamData');
                        this.$store.commit('deleteTeamMembers');
                        this.$router.push('/auth')
                    })
            },
            request_user_data: function () {
                Axios
                    .get('/user/info')
                    .then(response => {
                        this.$store.commit('setUserData', response.data);
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                this.$router.push("/auth");
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка авторизации",
                                    message: error.response.data.message
                                });
                            }
                        }
                    });
            },
        }
    }
</script>