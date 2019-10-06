<template>
    <div class="basic-block">
        <p>
            Тип задания
            <select v-model="stage">
                <option :value="null">Любой</option>
                <option :value="stage_enum.PILOT">Разогрев</option>
                <option :value="stage_enum.FINAL">Финал</option>
            </select>
        </p>
        <table class="table-xxl">
            <tr>
                <td class="clickable" @click="sort_by_id">
                    Номер команды
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
                    <i v-if="sort.visited" class="fas fa-caret-up"></i>
                    <i v-if="sort.visited !== null && sort.visited !== true" class="fas fa-caret-down"></i>
                </td>
            </tr>
            <tr v-for="task in filtered_tasks" class="table-cont">
                <td class="table-block-xxl">{{task.task_id}}</td>
                <td class="table-block-xxl">{{task.task_name}}</td>
                <td class="table-block-xxl">
                 <task-status-bar
                         :all_capacity="task.all_capacity"
                         :loaded="task.load">
                 </task-status-bar>
                </td>
                <td class="table-block-xxl">{{task.visited}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import TaskStatusBar from "./TaskStatusBar";
    export default {
        name: "TasksStatus",
        components: {
          TaskStatusBar
        },
        data() {
            return {
                tasks: [
                    {
                        task_id: 2,
                        task_name: "Ротонда",
                        all_capacity: 10,
                        load: 1,
                        visited: 4,
                        stage: "FINAL"
                    },
                    {
                        task_id: 1,
                        task_name: "Красная площадь",
                        all_capacity: 5,
                        load: 3,
                        visited: 1,
                        stage: "FINAL"
                    },
                    {
                        task_id: 3,
                        task_name: "Нога",
                        all_capacity: 6,
                        load: 5,
                        visited: 10,
                        stage: "PILOT"
                    },
                ],
                stage_enum: {
                    PILOT: "PILOT",
                    FINAL: "FINAL"
                },
                stage: null,
                sort: {
                    id: null,
                    task_name: null,
                    load: null,
                    visited: null
                }
            }
        },
        computed: {
            filtered_tasks() {
                if(this.stage === null)
                    return this.tasks;
                return this.tasks.filter(task => task.stage === this.stage)
            }
        },
        methods: {
            sort_by_id() {
                this.sort.id = !this.sort.id;
                this.sort.task_name = this.sort.load = this.sort.visited = null;
                if(this.sort.id){
                    this.tasks.sort((a, b) => a.task_id - b.task_id)
                } else {
                    this.tasks.sort((a, b) => b.task_id - a.task_id)
                }
            },
            sort_by_name() {
                this.sort.task_name = !this.sort.task_name;
                this.sort.id = this.sort.load = this.sort.visited = null;
                if(this.sort.task_name){
                    this.tasks.sort((a, b) => a.task_name.localeCompare(b.task_name, 'ru-RU'))
                } else {
                    this.tasks.sort((a, b) => b.task_name.localeCompare(a.task_name, 'ru-RU'))
                }
            },
            sort_by_load() {
                this.sort.load = !this.sort.load;
                this.sort.id = this.sort.task_name = this.sort.visited = null;
                if(this.sort.load){
                    this.tasks.sort((a, b) => a.load - b.load)
                } else {
                    this.tasks.sort((a, b) => b.load - a.load)
                }
            },
            sort_by_visit() {
                this.sort.visited = !this.sort.visited;
                this.sort.id = this.sort.load = this.sort.task_name = null;
                if(this.sort.visited){
                    this.tasks.sort((a, b) => a.visited - b.visited)
                } else {
                    this.tasks.sort((a, b) => b.visited - a.visited)
                }
            },
        }
    }
</script>

<style scoped>
</style>