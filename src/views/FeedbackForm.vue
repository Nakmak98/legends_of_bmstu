<template>
    <div class="basic-block">
        <div v-if="!posted">
            <h1>Обратная связь</h1>
            <p style="text-align: justify">Нам очень важно твое мнение! Пожалуйста, удели 3 минуты своего времени, чтобы заполнить форму обратной связи. С помощью твоего отзыва мы сможем сделать Легенды лучше. Заранее спасибо!</p>
            <range-input
                    title="Общая оценка Легенд"
                    v-model="request_body.legends_mark">
            </range-input>
            <range-input
                    title="Разогревочный этап"
                    v-model="request_body.pilot_mark">
            </range-input>
            <range-input
                    title="Финальный этап"
                    v-model="request_body.final_mark">
            </range-input>
            <range-input
                    title="Качество заданий"
                    v-model="request_body.task_mark">
            </range-input>
            <range-input
                    title="Сайт"
                    v-model="request_body.site_mark">
            </range-input>
            <range-input
                    title="Квест с призраками"
                    v-model="request_body.ghost_mark">
            </range-input>
            <br>
            <h2>Лучшее задание на твой взгляд</h2>
            <base-input type="text"  v-model="request_body.best_task"></base-input>
            <h2>Худшее задание на твой взгляд</h2>
            <base-input type="text" v-model="request_body.worst_task"></base-input>
            <h2>Откуда ты узнал про нас?</h2>
            <p>
                <select v-model="request_body.from">
                    <option value="Не выбрано">Не выбрано</option>
                    <option value="ВКонтакте">ВКонтакте</option>
                    <option value="Из афиш">Из афиш</option>
                    <option value="От друзей">От друзей</option>
                    <option value="Другое">Другое</option>
                </select>
            </p>
            <p><textarea placeholder="Общие впечателния" v-model="request_body.message"></textarea></p>
            <base-button title="Отправить" @click="send_feedback"></base-button>
        </div>
        <div v-if="posted === null">
            <p>Загрузка...</p>
        </div>
        <div v-if="posted">
            <p>Cпасибо за отзыв!</p>
        </div>
    </div>
</template>

<script>
    import RangeInput from "../components/player/RangeInput";
    import Axios from 'axios'
    import {ErrorHandler} from "../ErrorHandler";

    export default {
        name: "FeedbackForm",
        components: {
           RangeInput
        },
        data() {
            return {
                posted: null,
                request_body: {
                  pilot_mark: 5,
                  final_mark: 5,
                  legends_mark: 5,
                  site_mark: 5,
                  task_mark: 5,
                  ghost_mark: 5,
                  best_task: null,
                  worst_task: null,
                  from: "Не выбрано",
                  message: null,
              }
            }
        },
        beforeMount() {
          this.request_is_user_post_feedback()
        },
        methods: {
            request_is_user_post_feedback(){
                Axios
                    .get('/feedback')
                    .then(response => {
                        this.posted = response.data
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            },
            send_feedback() {
                Axios
                    .post('/feedback', this.request_body)
                    .then(() => {
                        this.posted = true
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
    textarea {
        resize: none;
        min-width: 200px;
        width: 75%;
        height: 70px;
        margin-top: 5px;
        padding-left: 10px;
    }
</style>