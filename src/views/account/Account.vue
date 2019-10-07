<template>
    <div v-if="user" class="about basic-block">
        <h1>Личный кабинет</h1>
        <p><strong>{{user.first_name}} {{user.last_name}}</strong></p>
        <br>
        <p>Логин: <i>{{user.login}}</i></p>
        <p>ВК: <i>{{user.vk_ref}}</i></p>
        <p>Номер участника: <i>{{user.user_id}}</i></p>
        <br>
        <base-button v-if="this.user.role == 'PLAYER' || this.user.role == 'CAPTAIN'"
                     @click="$router.push('/team')"
                     title="Кабинет команды">
        </base-button>
        <base-button @click="check_change_vk" title="Изменить VK"></base-button>
        <base-button title="Выйти" @click="check_logout"></base-button>
        <base-button title="Удалить аккаунт" @click="check_delete_account" class="red-button-parent"></base-button>
    </div>
</template>
<script>
    import Axios from 'axios'
    import {ErrorHandler} from "../../ErrorHandler";
    export default {
        name: "account",
        computed: {
            user: function () {
                return this.$store.state.user
            },
        },
        mounted() {
            if(!this.user){
                this.$router.push('/auth')
            }
        },
        beforeDestroy() {
            if(this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            check_change_vk() {
                this.$store.commit('setPopupOptions', {
                    message: 'Введите новую ссылку',
                    input_field: true,
                    input_value: this.user.vk_ref,
                    show: true,
                    callback: this.change_vk,
                    args: null
                })
            },
            check_delete_account() {
                this.$store.commit('setPopupOptions', {
                    message: 'Вы уверены, что хотите удалить аккаунт?',
                    placeholder: '',
                    input_field: false,
                    show: true,
                    callback: this.delete_account,
                    args: null
                })
            },
            check_logout() {
                this.$store.commit('setPopupOptions', {
                    message: 'Вы уверены, что хотите выйти из аккаунта?',
                    placeholder: '',
                    input_field: false,
                    show: true,
                    callback: this.logout,
                    args: null
                })
            },
            change_vk(args, input_field) {
                Axios
                    .post('/user/update', {
                        vk_ref: input_field
                    })
                    .then(response => {
                        this.$store.commit('setUserData', response.data)
                    })
                    .catch(error => {
                        if(error.response){
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push("/connection_error");
                        }
                    })
            },
            delete_account() {
                Axios
                    .delete('/user/delete')
                    .then(() => {
                        this.$store.commit('deleteUserData');
                        this.$store.commit('deleteTeamData');
                        this.$store.commit('deleteTeamMembers');
                        this.$router.push('/auth')
                    }).catch(error => {
                    if(error.response){
                        new ErrorHandler(error.response, this)
                    } else {
                        this.$router.push("/connection_error");
                    }
                })
            },
            logout() {
                Axios
                    .get('/user/logout')
                    .then(() => {
                        this.$store.commit('deleteUserData');
                        this.$store.commit('deleteTeamData');
                        this.$store.commit('deleteTeamMembers');
                        this.$router.push('/auth')
                    }).catch(error => {
                    if (error.response) {
                        new ErrorHandler(error.response, this)
                    } else {
                        this.$router.push("/connection_error");
                    }
                })
            },
            request_user_data() {
                alert('Запрос из ЛК')
                Axios
                    .get('/user/info')
                    .then(response => {
                        this.$store.commit('setUserData', response.data);
                    })
                    .catch(error => {
                        if(error.response){
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push("/connection_error");
                        }
                    });
            },
        }
    }
</script>

<style>
    .red-button, .red-button-parent >button{
        background-color: #d66363;
        color: white;
    }
</style>