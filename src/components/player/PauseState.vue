<template>
    <div>
        <div v-if="game.task !== null">
            <div v-if="game.task.task_status === 'SUCCESS'">
                <h1>Успешно пройдено</h1>
                <div class="ql-editor" v-html="game.task.html"></div>
                <br>
                <p>Баллов получено: <strong>{{game.task.points}}</strong></p>
                <p v-if="wasted_time">Времени потрачено: {{wasted_time}}</p>
                <p>Засчитанный ответ: <strong>{{game.task.answer}}</strong></p>
                <br>
            </div>
            <div v-if="game.task.task_status === 'FAIL'">
                <h1>Задание провалено</h1>
                <div class="ql-editor" v-html="game.task.html"></div>
                <br>
                <p v-if="wasted_time">Времени потрачено: {{wasted_time}}</p>
                <br>
            </div>
            <div v-if="game.task.task_status === 'SKIP'">
                <h1>Задание пропущено</h1>
                <div class="ql-editor" v-html="game.task.html"></div>
                <br>
                <p v-if="wasted_time">Времени потрачено: {{wasted_time}}</p>
                <br>
            </div>
            <p v-if="user.role !== 'CAPTAIN'">
                <i>Капитан команды может взять следующее задание.</i>
            </p>
            <br>
            <base-button v-if="user.role === 'CAPTAIN'"
                         title="Следующее задание"
                         @click="check_next_task">
            </base-button>
        </div>
        <div v-else>
            <p>{{game.text}}</p>
            <br>
            <base-button v-if="user.role === 'CAPTAIN'"
                         title="Взять задание"
                         @click="check_next_task">
            </base-button>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import {ErrorHandler} from "../../ErrorHandler";
    export default {
        name: "PauseState",
        props: {
            status: String
        },
        computed: {
            user() { return this.$store.state.user },
            game() { return this.$store.state.game }
        },
        mounted() {
        },
        methods: {
            check_next_task() {
                if(this.status === 'FINAL') {
                    let popup_options = {
                        message: "Будьте внимательны! Задание на время.",
                        show: true,
                        callback: this.request_next_task,
                        args: null
                    };
                    this.$store.commit('deleteErrorMessage');
                    this.$store.commit('setPopupOptions', popup_options)
                } else {
                    this.request_next_task();
                }
            },
            request_next_task() {
                Axios
                    .get('/game/next')
                    .then(response => {
                        this.$store.dispatch('updateTaskStatus', response.data, this)
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