<template>
    <div v-if="user.role === 'MODERATOR' || user.role === 'ADMIN'" class="basic-block">
        <p>
            Тип задания
            <select v-model="stage">
                <option :value="null">Любой</option>
                <option :value="stage_enum.PHOTO">Фото</option>
                <option :value="stage_enum.LOGIC">Логика</option>
                <option :value="stage_enum.MAIN">Основные</option>
                <option :value="stage_enum.DRAFT">Черновик</option>
            </select>
        </p>
        <table class="table-xxl">
            <tr>
                <td class="clickable" @click="sort_by_id">
                    Номер задания
                    <i v-if="sort.id" class="fas fa-caret-up"></i>
                    <i v-if="sort.id !== null && sort.id !== true" class="fas fa-caret-down"></i>
                </td>
                <td class="clickable" @click="sort_by_name">
                    Название
                    <i v-if="sort.task_name" class="fas fa-caret-up"></i>
                    <i v-if="sort.task_name !== null && sort.task_name !== true" class="fas fa-caret-down"></i>
                </td>
                <td class="clickable" @click="sort_by_load">
                    Загруженность
                    <i v-if="sort.load" class="fas fa-caret-up"></i>
                    <i v-if="sort.load !== null && sort.load !== true" class="fas fa-caret-down"></i>
                </td>
                <td class="clickable" @click="sort_by_visit">
                    Побывало команд
                    <i v-if="sort.hints" class="fas fa-caret-up"></i>
                    <i v-if="sort.hints !== null && sort.hints !== true" class="fas fa-caret-down"></i>
                </td>
            </tr>
            <tr v-for="task in tasks" class="table-cont">
                <td class="table-block-xxl">{{task.task_id}}</td>
                <td class="table-block-xxl">{{task.task_name}}</td>
                <td class="table-block-xxl">
                 <task-status-bar
                         :capacity="task.capacity"
                         :loaded="task.load">
                 </task-status-bar>
                </td>
                <td class="table-block-xxl">{{task.hints}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import Axios from 'axios';
    import TaskStatusBar from "./TaskStatusBar";
    import {ErrorHandler} from "../../ErrorHandler";
    export default {
        name: "TasksStatus",
        components: {
          TaskStatusBar
        },
        data() {
            return {
                tasks: null,
                stage_enum: {
                    PHOTO: "PHOTO",
                    LOGIC: "LOGIC",
                    MAIN: "MAIN",
                    DRAFT: "DRAFT"
                },
                stage: null,
                sort: {
                    id: null,
                    task_name: null,
                    load: null,
                    hints: null
                }
            }
        },
        computed: {
            user() { return this.$store.state.user }
        },
        methods: {
            sort_by_id() {
                this.sort.id = !this.sort.id;
                this.sort.task_name = this.sort.load = this.sort.hints = null;
                if(this.sort.id){
                    this.tasks.sort((a, b) => a.task_id - b.task_id)
                } else {
                    this.tasks.sort((a, b) => b.task_id - a.task_id)
                }
            },
            sort_by_name() {
                this.sort.task_name = !this.sort.task_name;
                this.sort.id = this.sort.load = this.sort.hints = null;
                if(this.sort.task_name){
                    this.tasks.sort((a, b) => a.task_name.localeCompare(b.task_name, 'ru-RU'))
                } else {
                    this.tasks.sort((a, b) => b.task_name.localeCompare(a.task_name, 'ru-RU'))
                }
            },
            sort_by_load() {
                this.sort.load = !this.sort.load;
                this.sort.id = this.sort.task_name = this.sort.hints = null;
                if(this.sort.load){
                    this.tasks.sort((a, b) => a.load - b.load)
                } else {
                    this.tasks.sort((a, b) => b.load - a.load)
                }
            },
            sort_by_visit() {
                this.sort.hints = !this.sort.hints;
                this.sort.id = this.sort.load = this.sort.task_name = null;
                if(this.sort.hints){
                    this.tasks.sort((a, b) => a.hints - b.hints)
                } else {
                    this.tasks.sort((a, b) => b.hints - a.hints)
                }
            },
            request_tasks_status() {
                Axios
                    .get('/manage/tasks', {
                        params: {
                            task_type:this.stage
                        }
                    }).then(response => {
                        this.tasks = response.data
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
            stage: function () { this.request_tasks_status(); }
        }
    }
</script>

<style scoped>
</style>