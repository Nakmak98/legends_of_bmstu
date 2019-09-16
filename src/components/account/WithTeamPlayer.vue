<template>
    <div>
        <h2>Команда № {{team.team_id}}</h2>
        <h2>{{team.team_name}}</h2>
        <h2>{{team.search_input_value}}</h2>
        <h2 v-if="team.invite_code">Пригласительный код: <br>{{team.invite_code}}</h2>
        <table>
            <tr>
                <td>Имя</td>
                <td>Фамилия</td>
                <td>VK</td>
                <td v-if="user.role === 'CAPTAIN'">Удалить участника</td>
            </tr>
            <tr v-for="member of team_members" class="table-cont">
                <td>{{member.first_name}}</td>
                <td>{{member.last_name}}</td>
                <td>{{member.vk_ref}}</td>
                <td v-if="user.role === 'CAPTAIN'" class="kick-btn" >
                    <span @click="check_delete_action(member)" v-if="member.role === 'PLAYER'">X</span>
                </td>
            </tr>
        </table>
        <base-button title="Старт!"></base-button>
        <base-button title="Выйти из команды" @click="check_leave_team"></base-button>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        name: "WithTeamPlayer",
        data() {
            return {
                request_body:{
                    user_id:''
                },
                check_join: false,
                popup_message: '',
            }
        },
        computed: {
            team_members() {
                return this.$store.state.team_members
            },
            team() {
                return this.$store.state.team
            },
            user() {
                return this.$store.state.user
            }
        },
        mounted() {
            if(!this.team_members){
                this.request_team_members();
            }
            if(!this.team){
                this.request_team_data();
            }
            if(!this.user){
                this.request_user_data();
            }
        },
        methods: {
            check_leave_team() {
                let popup_options = {
                    message: 'Вы уверены, что хотите покинуть команду?',
                    placeholder: '',
                    input_field: false,
                    show: true,
                    callback: this.leave_team,
                    args: null
                };
                this.$store.commit('setPopupOptions', popup_options)
            },
            check_delete_action(member) {
                this.request_body.user_id = member.user_id;

                let popup_options = {
                    message: "Вы уверены, что хотите удалить " + member.first_name + "?",
                    placeholder: '',
                    input_field: false,
                    show: true,
                    callback: this.delete_member,
                    args: this.request_body
                };
                this.$store.commit('setPopupOptions', popup_options)
            },
            delete_member(request_body) {
                Axios
                    .delete('/team/kick', {
                        params: request_body
                    })
                    .then(() => {
                        this.$store.dispatch('updateTeamMembers')
                    })
                    .catch(error => {
                        console.log(error.response.status);
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
                    })
            },
            leave_team: function () {
                Axios
                    .delete('/team/leave')
                    .then(response => {;
                        this.$store.commit('deleteTeamData');
                        this.$store.dispatch('updateUserData');
                        this.$store.commit('deleteTeamMembers');
                    })
                    .catch(error => {
                        console.log(error.response.status);
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
                    })
            },
            request_team_members: function (){
                Axios
                    .get('/team/members')
                    .then(response => {
                        this.$store.commit('setTeamMembers', response.data);
                    })
                    .catch(error => {
                        if (error.response) {
                            console.log(error.response.status);
                            console.log(error.response.data.message);
                            if (error.response.status === 401) {
                                this.$route.push('/auth');
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка авторизации",
                                    message: error.response.data.message
                                });
                            } else if(error.response.status === 404){
                            } else {
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка",
                                    message: error.response.data.message
                                });
                            }
                        }
                    })
            },
            request_team_data: function(){
                Axios
                    .get('/team/info')
                    .then(response => {
                        this.$store.commit('setTeamData', response.data);
                        if (!this.user.team_id)
                            this.$store.dispatch('updateUserData');
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                this.$router.push('/auth');
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка авторизации",
                                    message: error.response.data.message
                                });
                            } else if(error.response.status === 404){
                                return
                            } else {
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка",
                                    message: error.response.data.message
                                });
                            }
                        }
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

<style>
    .kick-btn {
        color: red;
        cursor: pointer;
    }
</style>