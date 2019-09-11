<template>
    <div>
        <h2>Команда № {{team.team_id}}</h2>
        <h2>{{team.team_name}}</h2>
        <h2>{{team.invite_code}}</h2>
        <table>
            <tr>
                <td>Имя</td>
                <td>Фамилия</td>
                <td>VK</td>
                <td v-if="user.role === 'CAPTAIN'">Удалить участника</td>
            </tr>
            <tr v-for="member of team_members">
                <td>{{member.first_name}}</td>
                <td>{{member.last_name}}</td>
                <td>{{member.vk_ref}}</td>
                <td v-if="user.role === 'CAPTAIN'" class="kick-btn" @click="check_delete_action(member)" ><span v-if="member.role === 'PLAYER'">X</span></td>
            </tr>
        </table>
        <base-button title="Старт!"></base-button>
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
                show_popup: false,
                popup_message: ''
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
            console.log("mounted");
            if(!this.team_members){
                this.request_team_members();
            }
        },
        methods: {
            request_team_members() {
                Axios
                    .get('/team/members')
                    .then(response => {
                        console.log(response.data);
                        this.$store.commit('setTeamMembers', response.data);
                    })
                    .catch(error => {
                        if (error.response) {
                            console.log(error.response.status)
                            console.log(error.message)
                            if (error.response.status === 401) {
                                this.$route.push('/auth')
                            } else {
                                this.$emit('error', error.message)
                            }
                        }
                    })
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
                    .then(response => {
                        console.log(response.status);
                        console.log(response.data);
                        this.$store.dispatch('updateTeamMembers')
                    })
                    .catch(error => {
                        console.log(error.response.status);
                        if (error.response.status === 401) {
                            //    TODO: написать запрос на новый base-error
                        }
                    })
            }
        }
    }
</script>

<style>
    table {
        margin: 0 auto;
    }
    .kick-btn {
        color: red;
        cursor: pointer;
    }
</style>