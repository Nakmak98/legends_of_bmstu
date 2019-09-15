<template>
    <div>
        <h3>Основные задания:</h3>
        <div class="task-container">
            <div class="task-card" v-for="task in main_tasks"
                 @click="$router.push({name: 'edit_task', params:{task_id: task.task_id}})">
                <h2>{{task.task_id}}</h2>
                <p>{{task.task_name}}</p>
            </div>
        </div>
        <h3>Фотоквесты:</h3>
        <div class="task-container">
            <div class="task-card" v-for="task in photo_tasks"
                 @click="$router.push({name: 'edit_task', params:{task_id: task.task_id}})">
                <h2>{{task.task_id}}</h2>
                <p>{{task.task_name}}</p>
            </div>
        </div>
        <h3>Логика:</h3>
        <div class="task-container">
            <div class="task-card" v-for="task in logic_tasks"
                 @click="$router.push({name: 'edit_task', params:{task_id: task.task_id}})">
                <h2>{{task.task_id}}</h2>
                <p>{{task.task_name}}</p>
            </div>
        </div>
        <h3>Черновик:</h3>
        <div class="task-container">
            <div class="task-card" v-for="task in draft_tasks"
                 @click="$router.push({name: 'edit_task', params:{task_id: task.task_id}})">
                <h2>{{task.task_id}}</h2>
                <p>{{task.task_name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        name: "AllTasks",
        data() {
            return {
                tasks: []
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            photo_tasks() {
                let photo = this.tasks.filter(task => task.task_type === "PHOTO")
                return photo.sort(compare)
            },
            main_tasks() {
                let main = this.tasks.filter(task => task.task_type === "MAIN")
                return main.sort(compare)
            },
            draft_tasks() {
                let draft = this.tasks.filter(task => task.task_type === "DRAFT")
                return draft.sort(compare)
            },
            logic_tasks() {
                let logic = this.tasks.filter(task => task.task_type === "LOGIC")
                return logic.sort(compare)
            }
        },
        mounted() {
            this.request_all_tasks()
        },
        methods: {
            request_all_tasks() {
                Axios
                    .get('/task/all')
                    .then(response => {
                        this.tasks = response.data
                    })
                    .catch(async error => {
                        // setErrorMessage выполнялся раньше push,
                        // что приводило к некорректной работе при уведомлении сообщений
                        // помог async/await
                        if (error.response) {
                            if (error.response.status === 401) {
                                await this.$router.push('/auth');
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка авторизации",
                                    message: error.response.data.message
                                });
                            } else {
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка",
                                    message: error.response.data.message
                                });
                            }
                        }
                    })
            },
        }
    }

    function compare(a, b) {
        if (a.task_id > b.task_id) {
            return 1;
        }
        if (a.task_id < b.task_id) {
            return -1;
        }
        return 0;
    }
</script>

<style scoped>
    .task-container {
           display: flex;
   align-items: center;
   justify-content: center;
   /* You can set flex-wrap and
      flex-direction individually */
   flex-direction: row;
   flex-wrap: wrap;
   /* Or do it all in one line
     with flex flow */
   flex-flow: row wrap;
   /* tweak where items line
      up on the row
      valid values are: flex-start,
      flex-end, space-between,
      space-around, stretch */
   align-content: flex-end;
    }

    .task-card {
        cursor: pointer;
        min-width: 100px;
        margin: 5px;
        background-color: #fff2e0;
        border-radius: 10px;
    }

</style>