<template>
    <div>
        <base-popup :show="showPopup" :message="popupMessage" @access="deleteMember" @cancel="showPopup=false"></base-popup>
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
            <tr v-for="member of teamMembers">
                <td>{{member.first_name}}</td>
                <td>{{member.last_name}}</td>
                <td>{{member.vk_ref}}</td>
                <td v-if="user.role === 'CAPTAIN'" class="kick-btn" @click="checkDeleteAction">X</td>
            </tr>
        </table>
        <base-button title="Старт!"></base-button>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "withTeamPlayer",
        data() {
            return {
                showPopup: false
            }
        },
        computed: {
            teamMembers() {
                return this.$store.state.teamMembers
            },
            team() {
                return this.$store.state.team
            },
            user() {
                return this.$store.state.user
            }
        },
        mounted() {
            this.requestTeamMembers();
        },
        methods: {
            requestTeamMembers() {
                Axios
                    .get('/team/members')
                    .then(response => {
                        console.log(response.data)
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
            checkDeleteAction() {
                this.showPopup = true;
                this.popupMessage = "Вы уверены, что хотите удалить участника команды?"
            },
            deleteMember() {
            //    TODO: написать запрос
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