<template>
    <div class="basic-block">
        <h1>Ответы на задания</h1>
        <p>
            Номер команды
            <base-input
                    v-model="team_id"
                    text_align="center">
            </base-input>
        </p>
        <br>
        <p>
            <base-button title="Найти" @click="request_answer"></base-button>
        </p>
        <div v-if="task">
            <p><strong>{{task.task_name}}</strong></p>
            <p v-html="task.html"></p>
            <p>Ответы:</p>
            <ol class="revisor_answers">
                <li v-for="answer in task.answers">
                    <i>{{answer}}</i>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import {ErrorHandler} from "../../ErrorHandler";
    export default {
        name: "Answers",
        data() {
            return {
                team_id: null,
                task: null
            }
        },
        methods: {
            request_answer() {
                Axios
                    .get('/manage/quest', {
                        params: {
                            team_id: this.team_id
                        }
                    })
                    .then(response => {
                        this.task = response.data
                    })
                    .catch(error => {
                        if(error.response.status === 404) {
                            console.log('d');
                            this.$store.commit('setErrorMessage', {
                                header: "Ошибка",
                                message: error.response.data.message
                            });
                            console.log('asd');
                            return
                        }
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
    .revisor_answers {
        text-align: left;
        display: inline-block;
    }
</style>