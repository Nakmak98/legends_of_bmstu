<template>
    <div>
        <base-popup :show="show_popup" :message="popup_message" @access="deleteMember" @cancel="show_popup=false"></base-popup>
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
                <td v-if="user.role === 'CAPTAIN'" class="kick-btn" @click="checkDeleteAction(member)" >X</td>
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
                    kick_id:''
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
            checkDeleteAction(member) {
                this.show_popup = true;
                this.popup_message = "Вы уверены, что хотите удалить "+ member.user_id + " ?";
                console.log(member);
                this.request_body.kick_id = member.user_id
            },
            deleteMember() {
                Axios
                    .delete('/team/kick',this.request_body)
                    .then(response => {
                        console.log(response.status);
                        console.log(response.data);
                        this.$store.commit('updateUserData');
                    })
                    .catch(error => {
                        console.log(error.response.status);
                        console.log(this.request_body.kick_id);
                        if (error.response.status === 401) {
                            this.error_message = error.message
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