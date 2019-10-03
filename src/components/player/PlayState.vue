<template>
   <div>
      <p class="ql-editor" v-html="game.task.html"></p>
      <timer :start_time="game.task.start_time"
             :duration="game.task.duration"
             v-if="game.task.duration">
      </timer>
      <p>Баллов за задание: {{game.task.points}}</p>
      <p><base-input placeholder="Ответ" v-model="answer"></base-input></p>
      <p><base-button title="Отправить" @click="send_answer"></base-button></p>
      <p><base-button v-if="game.task.skip" title="Пропустить" @click="check_skip"></base-button></p>
   </div>
</template>

<script>
    import Timer from "./Timer";
    import {ErrorHandler} from "../../ErrorHandler";
    import Axios from 'axios';
    export default {
        name: "PlayState",
        components: {Timer},
        data() {
            return {
                timer: null
            }
        },
        computed: {
           user() { return this.$store.state.user },
           game() { return this.$store.state.game }
        },
        methods: {
            check_skip() {
               let popup_options = {
                  message: "Вы уверены, что хотите пропустить задание? Вернуться к нему будет невозможно.",
                  show: true,
                  callback: this.skip_task,
                  args: null
               };
               this.$store.commit('deleteErrorMessage');
               this.$store.commit('setPopupOptions', popup_options)
            },
            skip_task() {
               Axios
                       .get('/game/skip')
                       .then(() => {
                          this.$store.dispatch('updateTaskStatus')
                       })
                       .catch(error => {
                          if(error.response) {
                             new ErrorHandler(error.response, this)
                          } else {
                             this.$router.push('/connection_error')
                          }
                       })
            },
            send_answer() {
               if(this.answer === ''){
                  this.$store.commit('setErrorMessage', {
                     message: "Нельзя отослать пустой ответ"
                  })
               }
               Axios
                       .post('/game/answer', {
                          team_id: this.user.team_id,
                          task_id: this.game.task.task_id,
                          answer: this.answer
                       })
                       .then(response => {
                          this.$store.dispatch('updateTaskStatus')
                       })
                       .catch(error => {
                          if(error.response.status === 400) {
                             let popup_options = {
                                header: false,
                                message: error.response.data,
                                show: true,
                                callback: null,
                                args: null
                             };
                             this.$store.commit('deleteErrorMessage');
                             this.$store.commit('setPopupOptions', popup_options);
                             return;
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

</style>