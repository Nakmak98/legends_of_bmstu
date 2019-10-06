<template>
    <div v-if="user" class="about basic-block">
        <h1>Личный кабинет</h1>
        <p>{{user.first_name}} {{user.last_name}}</p>
        <p>{{user.login}}</p>
        <p>id: {{user.user_id}}</p>
        <base-button v-if="this.user.role == 'PLAYER' || this.user.role == 'CAPTAIN'"
                     @click="$router.push('/team')"
                     title="Кабинет команды">
        </base-button>
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
            if (!this.user) {
                this.request_user_data();
            }
        },
        beforeDestroy() {
            if(this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
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