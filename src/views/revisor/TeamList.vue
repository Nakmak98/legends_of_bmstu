<template>
    <div class="basic-block">
        <table class="table-xxl">
            <tr>
                <td>Номер команды</td>
                <td>Название</td>
                <td>Участники</td>
                <td>Баллы</td>
                <td>Статус</td>
            </tr>
            <tr class="table-cont">
                <td class="table-block-xxl">Номер команды</td>
                <td class="table-block-xxl">Название</td>
                <td class="table-block-xxl">Участники</td>
                <td class="table-block-xxl">Баллы</td>
                <td class="table-block-xxl">Статус</td>
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
        methods: {
            request_teams_info() {
                Axios
                    .get('')
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
        }
    }
</script>

<style scoped>

</style>