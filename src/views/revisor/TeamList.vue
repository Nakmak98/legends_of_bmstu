<template>
    <div class="basic-block">
        <table class="table-xxl">
            <tr>
                <td>Номер команды</td>
                <td>Название</td>
                <td>Участники</td>
                <td>Баллы</td>
                <td>Экстра-баллы</td>
                <td>Статус</td>
            </tr>
            <tr class="table-cont" v-for="team in teams">
                <td class="table-block-xxl">{{team.team_id}}</td>
                <td class="table-block-xxl">{{team.team_name}}</td>
                <td class="table-block-xxl">{{team.size}}</td>
                <td class="table-block-xxl">{{team.score}}</td>
                <td class="table-block-xxl">{{team.money}}</td>
                <td class="table-block-xxl">{{team.team_status}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import Axios from 'axios';
    import {ErrorHandler} from "../../ErrorHandler";
    export default {
        name: "TeamList",
        data() {
            return {
                teams: null
            }
        },
        mounted() {
          this.request_teams_info()
        },
        methods: {
            request_teams_info() {
                Axios
                    .get('/manage/teams')
                    .then(response => {
                        this.teams = response.data
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            }
        },
        beforeDestroy() {
            if (this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
    }
</script>

<style scoped>

</style>