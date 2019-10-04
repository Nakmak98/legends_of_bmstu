<template>
    <div class="basic-block">
        <p>
            <base-input
                    placeholder="Номер команды"
                    v-model="team_id"
                    text_align="center">
            </base-input>
        </p>
        <p>
            <base-button title="Найти" @click="request_answer"></base-button>
        </p>
        <div v-if="task">
            <div>Задание</div>
            <div>Ответ</div>
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
                    .get('')
                    .then(response => {
                        this.task = response.data
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