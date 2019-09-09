<template>
    <div>
        <h2>Команда № {{team.team_id}}</h2>
        <h2>{{team.team_name}}</h2>
        <table>
            <tr>
                <td>Имя</td>
                <td>Фамилия</td>
                <td>VK</td>
            </tr>
            <tr v-for="member of teamMembers">
                <td>{{member.first_name}}</td>
                <td>{{member.last_name}}</td>
                <td>{{member.vk_ref}}</td>
            </tr>
        </table>
        <base-button
                title="Добавить участника"
                @click="$router.push('/team/add_member')">
        </base-button>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "withTeamPlayer",
        props: {
            team: Object
        },
        computed: {
            teamMembers() {
                return this.$store.state.teamMembers
            },
            team() {
                return this.$store.state.team
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
            }
        }
    }


</script>

<style>
    table {
        margin: 0 auto;
    }
</style>