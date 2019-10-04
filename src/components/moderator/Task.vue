<template>
    <div>   <!--TODO Впихнуть таймер-->
<!--        <div v-if="task.status =='STOP' && (task.finish_time <= task.duration)" class="task succeed">{{task.start_time}}Время/Время на задание{{task.duration}}</div>-->
<!--        <div v-if="task.status =='STOP' && (task.finish_time > task.duration)" class="task failed">{{task.start_time}}Время/Время на задание{{task.duration}}</div>-->
<!--        <div v-if="task.status =='SKIP'" class="task skipped">{{task.start_time}}Время/Время на задание{{task.duration}}</div>-->
<!--        <div v-if="task.status =='PLAY'" class="task playing">{{task.start_time}}Время/Время на задание{{task.duration}}</div>-->
<!--        <div v-if="task.status =='PAUSE'" class="task waiting">{{task.start_time}}Время/Время на задание{{task.duration}}</div>-->
        <div class="task waiting">Время/Время на задани</div>
    </div>

</template>

<script>
    export default {
        name: "Task"
    }
</script>

<style scoped>

.task{
    width: 50px;
    height: 50px;
    border-radius: 100%;
}

.succeed{
    background-color: greenyellow;
}
.failed{
    background-color: #ff605a;
}
.skipped{
    background-color: #000058;
}
.playing{
    background-color: #ffed57;
}
.waiting{
    background-color: #918a8b;
}


</style>