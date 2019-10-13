<template>
    <div class="basic-block">
        <div v-if="request_body">
            <h1>Обратная связь</h1>
            <p>Нам очень важно твое мнение! Пожалуйста, удели 3 минуты своего времени, чтобы заполнить форму обратной связи. С помощью твоего отзыва мы сможем сделать Легенды лучше. Заранее спасибо!</p>
            <range-input
                    title="Разогревочный этап"
                    v-model="request_body.pilot_mark">
            </range-input>
            <range-input
                    title="Разогревочный этап"
                    v-model="request_body.final_mark">
            </range-input>
            <range-input
                    title="Разогревочный этап"
                    v-model="request_body.legends_mark">
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
                    title="Квест с призраком"
                    v-model="request_body.ghost_mark">
            </range-input>
            <br>
            <base-input type="text" placeholder="Лучшее задание" v-model="request_body.best_task"></base-input>
            <base-input type="text" placeholder="Худшее задание" v-model="request_body.worst_task"></base-input>
            <h2>Откуда ты узнал про нас?</h2>
            <p>
                <select v-model="request_body.from">
                    <option value="Не выбрано">Не выбрано</option>
                    <option value="Вконтакте">Вконтакте</option>
                    <option value="Афиша">Афиша</option>
                    <option value="От друзей">От друзей</option>
                    <option value="Другое">Другое</option>
                </select>
            </p>
            <p><textarea placeholder="Комментарий" v-model="request_body.message"></textarea></p>
            <base-button title="Отправить" @click="send_feedback"></base-button>
        </div>
        <div v-else>
            <p>Cпасибо за отзыв!</p>
        </div>
    </div>
</template>

<script>
    import RangeInput from "../components/player/RangeInput";
    export default {
        name: "FeedbackForm",
        components: {
           RangeInput
        },
        data() {
            return {
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
        methods: {
            send_feedback() {
                this.request_body = null
            }
        }
    }
</script>

<style scoped>
    textarea {
        width: 200px;
        margin-top: 5px;
        padding-left: 10px;
    }
</style>