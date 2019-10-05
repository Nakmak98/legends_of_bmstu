<template>
    <div v-if="user.role === 'MODERATOR'" class="basic-block">

        <h1>Статус команд</h1>
        <input type="checkbox" id="checkbox" v-model="finished">
        <label for="checkbox">Показать завершенные</label>

        <div v-for="team of request_body.teams" class="about">
<!--            <div v-if="(team.finish_time !== NULL && finished === true) || finished === false">-->
            <div>
                <p>{{team.team_name}}</p>
                <task v-bind:tasks="team.tasks"></task>
            </div>
        </div>

        <!--Test-->
        <div >
            <div v-if="finished === false" class="about basic-block">
                <p>Имя команды</p>
                <div>
                    <task></task>
                    <p>ID таска. Имя таска</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Axios from "axios";
    import {ErrorHandler} from "../../ErrorHandler";
    import Task from "./Task";

    export default {
        name: 'TaskControl',
        components: {
            Task
        },
        data() {
            return {
                request_body: {
                    teams:[
                        {
                            team_name:"VOLVOGA",
                            finish_time:1,
                            tasks: [
                                {
                                    task_id: 50,
                                    duration: 50,
                                    start_time: 1568889832,
                                    task_status: "SUCCESS",
                                },
                                {
                                    task_id: 10,
                                    duration: 30,
                                    start_time: 1568889832,
                                    task_status: "FAIL",
                                    finish_time: 22
                                },
                                {
                                    task_id: 22,
                                    duration: 10,
                                    start_time: 1568889832,
                                    task_status: "RUNNING"
                                }
                            ]
                        },
                        {
                            team_name:"AGOVLOV",
                            finish_time:'',
                            tasks: [
                                {
                                    task_id: 130,
                                    duration: 20,
                                    start_time: 1568889832,
                                    task_status: "SUCCESS"
                                },
                                {
                                    task_id: 60,
                                    duration: 30,
                                    start_time: 1568889832,
                                    task_status: "SKIP",
                                    finish_time: 40
                                },
                                {
                                    task_id: 22,
                                    duration: 10,
                                    start_time: 1568889832,
                                    task_status: "FAIL"
                                }
                            ]
                        }
                        ]
                },

                finished:false
            };
        },/*,
        mounted() {
            this.request_teams()
        },*/
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
                            this.$router.push('/connection_error')
                        }
                    });
            }
        }
    };
</script>

<style>

</style>