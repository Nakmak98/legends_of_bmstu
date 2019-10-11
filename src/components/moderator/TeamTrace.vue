<template>
    <div v-bind:style="get_route_style" class="route_container">
        <div v-for="(circle, index) in circles" v-bind:key="circle" class="route_item_container">
            <div class="task_status_text">{{circle.task_status}}</div>
            <div></div>
            <div class="circle" v-bind:class="[circle.task_status.toLowerCase()]">
                <div v-if="circle.duration && !circle.finish_time">
                    <timer :duration="circle.duration" :start_time="circle.start_time"></timer>
                    / {{circle_duration(circle)}}
                </div>
                <div v-if="circle.duration && circle.finish_time">
                    {{circle_finish_time(circle)}}
                </div>
                <div v-if="!circle.duration && circle.finish_time">
                    {{circle_wasted_time(circle)}}
                </div>
            </div>
            <div class="task_id">{{circle.task_id}}. {{circle.task_name}}</div>
            <div class="arrow" v-bind:class="[circle.task_status.toLowerCase(), is_last_task(index)]"></div>
            <br>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import Timer from "../player/Timer";
    export default {
        name: "Task",
        components: {
            Timer
        },
        props: {
            trace: Object
        },
        computed: {
            get_route_style() {
                return {
                    gridTemplateColumns: `repeat(5, 150px)`
                }
            },
            circles() {
                return this.trace.circles.sort((a,b) => a.start_time - b.start_time)
            }
        },
        methods: {
            circle_duration(task) {
                return moment.unix(task.duration).format('mm:ss')
            },
            circle_wasted_time(task) {
                return moment.unix(task.finish_time - task.start_time).format('mm:ss')
            },
            circle_finish_time(task) {
                let nom = moment.unix(task.finish_time - task.start_time).utc();
                let denom = moment.unix(task.duration).utc()
                return `${nom.format('mm:ss')} / ${denom.format('mm:ss')}`
            },
            is_last_task(task_index){
                if(task_index === this.trace.circles.length-1 && this.trace.complete){
                    return 'finished'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .route_container {
        display: grid;
        grid-auto-flow: dense;
    }

    .route_item_container {
        display: grid;
        grid-template-columns: 100px minmax(20px,1fr);
        grid-template-rows: 23px 100px 50px;
        align-items: center;
        justify-content: center;
    }
    .task_status_text{
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }
    .task_id {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
    }
    .circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        &.running {
            background-color: #ffed57;
        }
        &.success {
            background-color: #b9ff6d;
        }
        &.fail {
            background-color: #ff605a;
        }
        &.skip {
            background-color: #8484f3;
        }
        &.waiting {
            background-color: #918a8b;
        }
    }

    .arrow {
        width: 100%;
        position: relative;;
        &.running {
            width: 30%;
            border-bottom: 1px dashed black;
        }
        &.success {
            border-bottom: 1px solid black;
        }
        &.fail {
            border-bottom: 1px solid black;
        }
        &.skip {
            border-bottom: 1px solid black;
        }
        &.waiting {
            border-bottom: 1px solid black;
        }
        &.finished {
            display: none;
        }
    }


</style>