<template>
    <div v-bind:style="get_route_style" class="route_container">
        <div v-for="task in tasks" class="route_item_container">
            <div class="circle"
                 v-bind:class="[task.task_status.toLowerCase()]">
            </div>
            <div class="arrow"></div>
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
            get_status_style(){
                let status = this.task_status;
                return{
                    // runnung: this.task_status=='PLAY':0,
                     status
                }
            },
            get_route_style() {
                return {
                    gridTemplateColumns: `repeat(${this.tasks.length}, 20%)`
                }
            }
        },
    }
</script>

<style scoped>

    .route_container{
        display: grid;
    }
    .route_item_container{
        display: inline-flex;
    }
    p{
        grid-row-start: 2;
    }
.circle{
    width: 60px;
    height: 60px;
    border-radius: 100%;

}
.arrow{
    width: 68%;
    border-bottom: 1px solid;
    position: relative;
    bottom: 27px
}

.success{
    background-color: #b9ff6d;
}
.fail{
    background-color: #ff605a;
}
.skip{
    background-color: #000058;
}
.running{
    background-color: #ffed57;
}
.waiting{
    background-color: #918a8b;
}


</style>