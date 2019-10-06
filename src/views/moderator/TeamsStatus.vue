<template>
    <div v-if="user.role === 'MODERATOR' || user.role === 'ADMIN'" class="basic-block">
        <h1>Статус команд</h1>
        <input type="checkbox" id="checkbox" v-model="complete">
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
    import Task from "../../components/moderator/TeamTrace";

    export default {
        name: 'TaskControl',
        components: {
            Task
        },
        data() {
            return {
                traces: null,
                complete: false
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
                    .get('/manage/traces', {
                        params: this.complete
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
        },
        beforeDestroy() {
            if (this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        watch: {
            complete: function () { this.request_traces(); }
        }
    };
</script>

<style>

</style>