<template>
    <div v-if="user.role === 'MODERATOR'" class="basic-block">
        <h1>Статус команд</h1>
        <input type="checkbox" id="checkbox" v-model="finished">
        <label for="checkbox">Показать завершивших</label>
        <div v-for="trace of teams_traces" v-bind:key="trace" class="about">
            <div>
                <p>Команда №{{trace.team_id}}</p>
                <task v-bind:trace="trace"></task>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from "axios";
    import {ErrorHandler} from "../../ErrorHandler";
    import Task from "./TeamTrace";

    export default {
        name: 'TaskControl',
        components: {
            Task
        },
        data() {
            return {
                traces: null,
                finished:false
            };
        },
        mounted() {
            this.request_traces()
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            teams_traces() {
                if(this.finished){
                    return this.traces.filter(trace => trace.complete === true)
                }
                return this.traces
            }
        },
        methods: {
            request_traces() {
                Axios
                    .get('/moderator/traces', {
                    })
                    .then(response => {
                        this.traces = response.data;
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