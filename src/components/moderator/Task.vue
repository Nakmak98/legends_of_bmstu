<template>
    <div class = "allTasks">
        <div v-for="task in tasks" >   <!--TODO Впихнуть таймер-->
            <div v-if="task.task_status =='STOP' && (task.finish_time <= task.duration)" class="circle succeed">Время</div>
            <div v-if="task.task_status =='STOP' && (task.finish_time > task.duration)" class="circle failed">Время</div>
            <div v-if="task.task_status =='SKIP'" class="circle skipped">Время</div>
            <div v-if="task.task_status =='PLAY'" class="circle playing">Время</div>
            <div v-if="task.task_status =='PAUSE'" class="circle waiting">Время</div>
            <div class="arrow">.</div>
            <p> {{task.task_id}}</p>
            <!--<div class="circle waiting">{{task.task_status}}</div>-->
            <!--<div v-bind:class="circleColor" class="circle">ww</div>-->
        </div>
    </div>


</template>

<script>
    export default {
        name: "Task",
        props: {
            tasks: []
        },
        computed:{
            circleColor:function(){
                let status = this.task_status;
                return{
                    // runnung: this.task_status=='PLAY':0,
                     status
                }
    }
        }
    }
</script>

<style scoped>

    .allTasks{
        display: grid;
        grid-template-columns:repeat(3,1fr 2fr);
        grid-template-rows:3fr 1fr ;
    }
    p{
        grid-row-start: 2;
    }
.circle{
    grid-row-start: 1;
    width: 60px;
    height: 60px;
    border-radius: 100%;

}
.arrow{
    border: 3px 0 solid black;
    grid-template-rows:3fr 1fr ;
    grid-row-start: 1;
}

.succeed{
    background-color: #b9ff6d;
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