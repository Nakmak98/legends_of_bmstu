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
                <td>ID</td>
                <td>Название</td>
                <td>Загруженность</td>
                <td>Побывало команд</td>
            </tr>
            <tr v-for="task in filtered_tasks" class="table-cont">
                <td class="table-block-xxl">{{task.task_id}}</td>
                <td class="table-block-xxl">{{task.task_name}}</td>
                <td class="table-block-xxl">
                 <task-status-bar
                         :all_capacity="task.all_capacity"
                         :loaded="task.act_capacity">
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
                        task_id: 1,
                        task_name: "Нога",
                        all_capacity: 10,
                        act_capacity: 1,
                        visited: 4,
                        stage: "FINAL"
                    },
                    {
                        task_id: 2,
                        task_name: "Красная площадь",
                        all_capacity: 5,
                        act_capacity: 3,
                        visited: 1,
                        stage: "FINAL"
                    },
                    {
                        task_id: 3,
                        task_name: "Ротонда",
                        all_capacity: 6,
                        act_capacity: 5,
                        visited: 10,
                        stage: "PILOT"
                    },
                ],
                stage_enum: {
                    PILOT: "PILOT",
                    FINAL: "FINAL"
                },
                stage: null
            }
        },
        computed: {
            filtered_tasks() {
                if(this.stage === null)
                    return this.tasks;
                return this.tasks.filter(task => task.stage === this.stage)
            }
        }
    }
</script>

<style scoped>
    .table-xxl {
        width: -webkit-fill-available;
    }
    .table-block-xxl{
        height: 50px;
    }
</style>