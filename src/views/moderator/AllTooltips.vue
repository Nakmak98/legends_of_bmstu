<template>
    <div v-if="user.role === 'MODERATOR' || user.role === 'ADMIN'" class="basic-block">
        <h3>Подсказки</h3>
        <div v-if="tasks">
            <div v-for="task in tasks">
                <h3>Задание № {{task.task_id}}</h3>
                <div class="task-container">
                    <div class="task-card"
                         v-for="hint in sorted_hints(task.hints)"
                         @click="$router.push({name: 'edit_tooltip', params:{
                                task_id: task.task_id,
                                hint_id: hint.hint_id,
                                html: hint.html,
                                cost: hint.cost
                                }})">
                        {{hint.cost}}
                    </div>
                </div>
            </div>
        </div>
        <br>
        <base-button title="Создать подсказку" @click="$router.push('/moderator/edit_tooltip/')"></base-button>
    </div>
</template>

<script>
    import Axios from 'axios'
    import {ErrorHandler} from "../../ErrorHandler";
    export default {
        name: "AllTooltips",
        data() {
            return {
                tasks: null
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        created() {
           alert('created tasks: ' + this.tasks)
        },
        mounted() {
            this.request_hints()
            alert('mounted tasks: ' + this.tasks)
        },
        methods: {
            request_hints() {
                Axios
                    .get('/hint/all')
                    .then(response => {
                        alert(response)
                        this.tasks = response.data
                    })
                    .catch(error => {
                        alert(error)
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('connection_error')
                        }
                    })
            },
            sorted_hints(hints) {
                return hints.sort((a,b) => a.cost - b.cost)
            }
        }
    }
</script>

<style scoped>

</style>