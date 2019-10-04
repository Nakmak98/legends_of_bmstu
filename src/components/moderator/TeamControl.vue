<template>
    <div v-if="user.role === 'MODERATOR'">
        <h1>Статус команд</h1>
        <input type="checkbox" id="checkbox" v-model="finished">
        <label for="checkbox">Показать завершенные</label>

        <div v-for="team of request_body.teams" class="about basic-block">
            <div v-if="(team.finish_time !==NULL && this.finished === true) || this.finished === false">
                <p>{{team.team_name}}</p>
                <div v-for="task in team.tasks">
                    <task></task>
                    <p>{{task.task_id}}{{task.task_name}}</p>
                </div>
            </div>
        </div>

        <!--Test-->
        <div >
            <div v-if="this.finished === false" class="about basic-block">
                <p>Имя команды</p>
                <div>
                    <task></task><!--TODO Подключить компонент -->
                    <p>ID таска. Имя таска</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Axios from "axios";
    import {VueEditor} from "vue2-editor";
    import {ErrorHandler} from "../../ErrorHandler";
    import Task from "./Task";

    export default {
        name: 'TaskEditor',
        components: {
            Task,
            VueEditor
        },
        data() {
            return {
                request_body: {
                    teams:[]
                },
                finished:false
            };
        },
        mounted() {
            this.request_teams()
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            request_teams() {
                Axios
                    .get('/game/info', {
                    })
                    .then(response => {
                        this.request_body = response.data;
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('connection_error')
                        }
                    });
            }
        }
    };
</script>

<style>

</style>